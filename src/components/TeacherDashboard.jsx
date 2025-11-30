import { useState } from "react";
import Recorder from "./Recorder";

export default function TeacherDashboard({ assignments, updateAssignment }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [voiceBlob, setVoiceBlob] = useState(null);

  function startGrade(index) {
    setCurrentIndex(index);
    setVoiceBlob(null);
  }

  function calculateGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  }

  function saveGrade() {
    const score = parseInt(document.getElementById("scoreInput").value);
    const feedback = document.getElementById("feedbackInput").value;

    if (isNaN(score) || score < 0 || score > 100) {
      return alert("Enter a valid score between 0 and 100!");
    }

    const grade = calculateGrade(score);

    updateAssignment(currentIndex, {
      score,
      grade,
      feedback: feedback || "-",
      voice: voiceBlob ? URL.createObjectURL(voiceBlob) : null,
      status: "Graded",
    });

    setCurrentIndex(null);
    setVoiceBlob(null);
  }

  return (
    <div className="card p-4">
      <h3>Teacher Dashboard</h3>

      <table className="table table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Student</th>
            <th>Title</th>
            <th>File</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Voice</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((a, i) => (
            <tr key={i}>
              <td>{a.student}</td>
              <td>{a.title}</td>
              <td>{a.file}</td>
              <td>{a.score ?? "-"}</td>
              <td>{a.grade}</td>
              <td>
                {a.voice ? <audio controls src={a.voice}></audio> : "No Voice"}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => startGrade(i)}
                >
                  Grade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentIndex !== null && (
        <div className="card p-4 shadow mt-4">
          <h5>Grade Assignment</h5>

          <label className="form-label mt-3">Enter Score (0–100)</label>
          <input id="scoreInput" className="form-control" type="number" />

          <label className="form-label mt-3">Enter Feedback</label>
          <textarea id="feedbackInput" className="form-control"></textarea>

          <label className="form-label mt-3">Voice Feedback</label>
          <Recorder onRecorded={(blob) => setVoiceBlob(blob)} />

          {voiceBlob && (
            <div className="mt-3">
              <p><b>Preview:</b></p>
              <audio controls src={URL.createObjectURL(voiceBlob)}></audio>
            </div>
          )}

          <button className="btn btn-success mt-3" onClick={saveGrade}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}
