import { useState } from "react";

export default function Recorder({ onRecorded }) {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setChunks([]);

      recorder.ondataavailable = (e) => {
        setChunks((prev) => [...prev, e.data]);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        onRecorded(blob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      alert("Microphone access needed!");
    }
  }

  function stopRecording() {
    mediaRecorder.stop();
    setIsRecording(false);
  }

  return (
    <div>
      {!isRecording ? (
        <button className="btn btn-primary" onClick={startRecording}>
          🎙 Start Recording
        </button>
      ) : (
        <button className="btn btn-danger" onClick={stopRecording}>
          ⏹ Stop Recording
        </button>
      )}
    </div>
  );
}
