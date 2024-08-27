import { useState, useRef } from "react";
import fileUpload from "./assets/fileUpload.png";
import fileUploaded from "./assets/fileUploaded.png";
import axios from "axios";
import "./App.css";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const App = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleStartButton = () => {
    fileInputRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const openFileInput = () => {
    fileInputRef.current.click();
  };
  const handleFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict_gender",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGender(response.data.gender);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileCancel = () => {
    setGender("")
    setFile(null);
  };
  return (
    <>
      <div className="gradient-background">
        <div className="background-fixed-text">
          <h2>DSP</h2>
          <h1>Gender Classification</h1>
          <p className="p-under-text">
          This project utilizes machine learning mainly Support Vector Machine (SVM) to distinguish between male and female voices using MFCC-based feature extraction.
          </p>
          <button className="start-now-button" onClick={handleStartButton}>
            Start Now
          </button>
        </div>
        <div className="display-group">
          <div className="file-section">
            <div>
              {file === null ? (
                <div className="file-upload-section">
                  <label onClick={openFileInput} className="img-upload-src">
                    <img src={fileUpload} width={300} height={300} />
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="input-data-file"
                  />
                </div>
              ) : (
                <div className="file-upload-section">
                  <img
                    src={fileUploaded}
                    width={260}
                    height={280}
                    className="file-image-uploaded"
                  />
                  <p>{file.name}</p>
                  <button
                    disabled={loading}
                    className="cancel-upload-button"
                    onClick={handleFileCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              <button
                disabled={!file}
                onClick={handleFileUpload}
                className="file-upload-button"
              >
                {!file ? "Select File" : "Upload File"}
              </button>
            )}
          </div>
          <div className="file-section-label-response">
            <h2>Gender Result</h2>
            <p>
              The Predicted Gender is{" "}
              {gender ? <span className="result-span">{gender}</span> : null}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
