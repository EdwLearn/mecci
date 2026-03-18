from PIL import Image
import numpy as np
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
img = Image.open(os.path.join(project_root, "public", "logo-meci.gif")).convert("RGBA")
data = np.array(img)

# The dark blue background is approximately #102540 / RGB(16, 37, 64)
# Remove pixels that are close to this dark blue color
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Create mask for dark blue-ish pixels (generous threshold)
is_dark_blue = (r < 50) & (g < 70) & (b < 100) & (b > g)

# Make those pixels transparent
data[is_dark_blue] = [0, 0, 0, 0]

result = Image.fromarray(data)
result.save(os.path.join(project_root, "public", "logo-meci.png"), "PNG")
print("Done! Saved transparent logo as logo-meci.png")
