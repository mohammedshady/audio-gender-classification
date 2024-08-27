# Important Notes

- you must install ffmpeg first before running the project for audio processing here is a link on how to install https://phoenixnap.com/kb/ffmpeg-windows
- there is a rare error that happens in frontend where after pressing the upload button the progress bar shows then dissapears without a result just press the upload button again and it should work
  we are looking to fix this problem

# Files Description

## 1-DATASET

stores the original `dataset` and `data` folder

- dataset original files
- data contains the files after splitting

## 2-Model

- ### genderClassification.ipynb

  Containes the entire code as a notebook with descriptions for each block explaining its function so you only need this file and the dataset voxCeleb to run the model
  (you can run this if you `dont have the model (svm_model.joblib)already saved` but you must have the dataset run from top to bottom blcok by block)
  (otherwise you can just run the block of `library imports` and the block of `featureExtraction` then test the saved model using the last block `inference` by using the already existing file or your custom file)

- ### svm_model.joblib

  the pretrained and tested model saved from the notebook

- ### custom-audio

  folder to store the audios you can test in in the last block of code `inference` in the notebook

## 3-BACKEND

- ### server.py
  Backend file that hosts the model to the front-end
  (you can start by running the file and the server should be ready listening for requests)
- ### main.py
  As i already trained the model and saved it so in this file we just load the saved model and define some functions to be used in our `server.py`
- ### uploads
  folder used to help the backend save the files coming from the front end

## 4-FRONTEND

GUI for the project we can upload any file and it identifies if its a male or a female based on our saved model
(you can start by running `npm run dev` in the front-end folder and the gui should be available on `http://localhost:(port)/` port is available in terminal)
(you must start the server.py in the backend so you can use the model)
