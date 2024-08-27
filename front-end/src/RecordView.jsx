import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

const RecordView = () => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (mediaBlobUrl) => {
    console.log(mediaBlobUrl);

    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "voice.wav", {
      type: "audio/wav",
    });

    const formData = new FormData(); // preparing to send to the server

    formData.append("audio", audioFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict_gender",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ mediaRecorderOptions: { mimeType: "audio/wav" } });

  return (
    <div>
      <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <audio src={mediaBlobUrl} controls autoPlay loop />
        <button
          onClick={() => handleFileUpload(mediaBlobUrl)}
          className="file-upload-button"
        >
          Submit File
        </button>
      </div>
    </div>
  );
};
export default RecordView;
