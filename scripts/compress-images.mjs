import sharp from "sharp"
import { readdir, stat } from "fs/promises"
import { join, extname } from "path"

const PUBLIC_DIR = "./public"
const MAX_WIDTH = 1920
const QUALITY = 80

async function getImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getImageFiles(fullPath)))
    } else {
      const ext = extname(entry.name).toLowerCase()
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        files.push(fullPath)
      }
    }
  }
  return files
}

async function compressImage(filePath) {
  const before = (await stat(filePath)).size
  const ext = extname(filePath).toLowerCase()

  try {
    const image = sharp(filePath)
    const meta = await image.metadata()

    // Skip if already small enough
    if (meta.width <= MAX_WIDTH && before < 300_000) {
      return { skipped: true, filePath }
    }

    const pipeline = image.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    })

    let buffer
    if (ext === ".png") {
      buffer = await pipeline.png({ quality: QUALITY }).toBuffer()
    } else {
      buffer = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer()
    }

    // Only overwrite if we actually saved space
    if (buffer.length < before) {
      const { writeFile } = await import("fs/promises")
      await writeFile(filePath, buffer)
      const saved = ((before - buffer.length) / before * 100).toFixed(0)
      return { skipped: false, filePath, before, after: buffer.length, saved }
    } else {
      return { skipped: true, filePath }
    }
  } catch (err) {
    return { error: true, filePath, message: err.message }
  }
}

async function main() {
  console.log("Buscando imágenes en", PUBLIC_DIR, "...\n")
  const files = await getImageFiles(PUBLIC_DIR)
  console.log(`Encontradas ${files.length} imágenes\n`)

  let totalBefore = 0
  let totalAfter = 0
  let compressed = 0
  let skipped = 0
  let errors = 0

  for (const file of files) {
    const result = await compressImage(file)
    if (result.error) {
      console.error(`  ERROR: ${file} — ${result.message}`)
      errors++
    } else if (result.skipped) {
      skipped++
    } else {
      const beforeKB = (result.before / 1024).toFixed(0)
      const afterKB = (result.after / 1024).toFixed(0)
      console.log(`  ✓ ${file.replace(PUBLIC_DIR + "/", "")} ${beforeKB}KB → ${afterKB}KB (-${result.saved}%)`)
      totalBefore += result.before
      totalAfter += result.after
      compressed++
    }
  }

  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)
  console.log(`\nResumen:`)
  console.log(`  Comprimidas: ${compressed}`)
  console.log(`  Omitidas (ya pequeñas): ${skipped}`)
  console.log(`  Errores: ${errors}`)
  console.log(`  Espacio ahorrado: ${savedMB} MB`)
}

main()
