import { useState } from "react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [server, setServer] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!role || !id || !server)
      return alert("Please select role, server and enter ID");

    onLogin({ role, id, server });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={submit}>
          {/* Server Selection */}
          <label className="form-label">Select Server</label>
          <select
            className="form-select mb-3"
            onChange={(e) => setServer(e.target.value)}
          >
            <option value="">-- Choose Server --</option>
            <option value="Server A">Server A</option>
            <option value="Server B">Server B</option>
            <option value="Server C">Server C</option>
          </select>

          {/* Role */}
          <label className="form-label">Select Role</label>
          <select
            className="form-select mb-3"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Choose Role --</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {/* ID */}
          <label className="form-label">Enter ID</label>
          <input
            className="form-control mb-3"
            onChange={(e) => setId(e.target.value)}
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
