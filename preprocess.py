import cv2

# Load the image
image = cv2.imread("product.png")

# Make the image 2 times bigger
bigger = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

# Save the enlarged image
cv2.imwrite("product_big.png", bigger)

print("Image enlarged successfully!")