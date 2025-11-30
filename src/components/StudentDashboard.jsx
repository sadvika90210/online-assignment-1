import { useState } from "react";
import AssignmentTable from "./AssignmentTable";
import StudentGraph from "./StudentGraph";

export default function StudentDashboard({
  currentUser,
  assignments,
  addAssignment,
}) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  function submit(e) {
    e.preventDefault();
    if (!title || !file) return alert("Enter title and file");

    const a = {
      student: currentUser.id,
      title,
      file: file.name,
      grade: "-",
      feedback: "-",
      status: "Submitted",
    };

    addAssignment(a);
    setTitle("");
    setFile(null);
  }

  const myAssignments = assignments.filter(
    (a) => a.student === currentUser.id
  );

  return (
    <div>
      <div className="card p-4 mb-4">
        <h3>👤 Student Dashboard</h3>

        <form onSubmit={submit}>
          <label className="form-label">Assignment Title</label>
          <input
            className="form-control mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="form-label">Upload File</label>
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className="card p-4 mb-4">
        <h4>Your Submissions</h4>
        <AssignmentTable assignments={myAssignments} />
      </div>

      {/* Student Performance Graph */}
      <StudentGraph assignments={myAssignments} />
    </div>
  );
}
