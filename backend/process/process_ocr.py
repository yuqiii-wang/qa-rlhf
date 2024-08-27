from paddleocr import PaddleOCR, draw_ocr
import cv2
import os
from matplotlib import pyplot as plt


# Initialize the PaddleOCR model with English model
ocr = PaddleOCR(use_angle_cls=True, lang='en') 

# Path to your image file
image_path = '150.png'

# Run OCR on the image
result = ocr.ocr(image_path, cls=True)

# Load the image
image = cv2.imread(image_path)

# Extract results
for idx in range(len(result)):
    res = result[idx]
    for line in res:
        print(f"Detected text: {line[1][0]}")

# Visualization of the results
boxes = [line[0] for res in result for line in res]  # Bounding boxes
txts = [line[1][0] for res in result for line in res]  # Recognized texts
scores = [line[1][1] for res in result for line in res]  # Confidence scores

# Draw the results on the image
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
im_show = draw_ocr(image, boxes, txts, scores, font_path='arial.pil',
                   )

# Display the image with OCR results
plt.figure(figsize=(10,10))
plt.imshow(im_show)
plt.axis('off')
plt.show()
