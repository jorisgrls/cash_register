try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
from pytesseract import Output
import cv2
import numpy as np
from matplotlib import pyplot as plt
import os
import json
import re
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
def remove_noise(image):
    return cv2.medianBlur(image,1)
    
def thresholding(image):
    return cv2.threshold(image, 200, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

def getText(image,x,y,w,h):
    plt.imshow(cv2.rectangle(image, (x, y), (w, h), (0, 255, 0), 2))
    region = image[y:h, x:w]
    plt.imshow(region)
    #plt.show()

    return pytesseract.image_to_string(region,config ="--psm 6 --oem 3 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ,.")


 
@app.route('/scan', methods =['POST'])
def scan():
    url = request.json['url']
    imagePath = os.path.expanduser('~/Documents/cash-register/python/'+url)
    dirCascadeFiles = os.path.expanduser('~/Documents/cash-register/python/haarcascades_cuda/')
    image = cv2.imread(imagePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cascadefile = dirCascadeFiles + "haarcascade_frontalface_alt.xml"
    classCascade = cv2.CascadeClassifier(cascadefile)
    faces = classCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags = cv2.CASCADE_SCALE_IMAGE
    )

    for (x, y, w, h) in faces:
        crop_img = image[y:y+h, x:x+w]
        break
    
    plt.imshow(crop_img)
    
    finalimage = remove_noise(thresholding(grayscale(image)))
    plt.imshow(finalimage)

    nom = getText(finalimage,1200,400,2024,590)
    nom = re.sub("\n","",nom)
    prenom = getText(finalimage,1385,713,2364,886)
    prenom = re.sub("\n","",prenom)
    birthday = getText(finalimage,2540,1070,3161,1199)
    birthday = re.sub("\n","",birthday)

    liste = {"nom":nom,"prenom":prenom,"birthday":birthday}
    
    return jsonify(liste)
 
if __name__ == '__main__':
    app.run(debug = True)



