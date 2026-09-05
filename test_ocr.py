import easyocr

reader = easyocr.Reader(['en'])

result = reader.readtext('product2.png')

for detection in result:
    text = detection[1]
    print(text)