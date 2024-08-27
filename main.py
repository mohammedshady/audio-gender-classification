import joblib
import librosa
from python_speech_features import mfcc
from python_speech_features import delta
from hmmlearn import hmm
from sklearn import preprocessing
import numpy as np


clf = joblib.load('svm_model.joblib')

def getSignalnRate(file_path):
    signal, sample_rate = librosa.load(file_path, sr=None)
    return sample_rate,signal

def extract_features(audio_path):
    rate, audio  = getSignalnRate(audio_path)
    mfcc_feature = mfcc(audio,rate,winlen=0.05, winstep=0.01,numcep= 13,nfilt= 30,nfft= 1024,appendEnergy = True)
    mfcc_feature  = preprocessing.scale(mfcc_feature)
    deltas        = delta(mfcc_feature, 2)
    double_deltas = delta(deltas, 2)
    combined      = np.hstack((mfcc_feature, deltas, double_deltas))
    return combined

def Infer(path_to_custom_file):
    try:
        vector = extract_features(path_to_custom_file)
        spk_gmm = hmm.GaussianHMM(n_components=16)      
        spk_gmm.fit(vector)

        spk_vec = spk_gmm.means_
        prediction = clf.predict(spk_vec)

        if sum(prediction) > 0:
            gender = "male"
        else:
            gender = "female"

        return(gender)

    except Exception as e:
        return(f"Error: {str(e)}")