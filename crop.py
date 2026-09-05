import cv2

# Open the original image
image = cv2.imread("product.png")

# Crop the right-side information panel
cropped = image[80:290, 330:475]

# Make the cropped area bigger
cropped = cv2.resize(
    cropped,
    None,
    fx=3,
    fy=3,
    interpolation=cv2.INTER_CUBIC
)

# Save the cropped image
cv2.imwrite("label_crop.png", cropped)

print("Crop created successfully!")