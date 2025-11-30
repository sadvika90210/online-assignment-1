import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import {
  loadAssignmentsFromStorage,
  saveAssignmentsToStorage,
} from "./api/LocalStorageAPI";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [assignments, setAssignments] = useState(loadAssignmentsFromStorage());
  const [view, setView] = useState("student");

  function handleLogin(user) {
    setCurrentUser(user);
    setView(user.role === "student" ? "student" : "teacher");
  }

  function logout() {
    setCurrentUser(null);
  }

  function addAssignment(a) {
    const updated = [...assignments, a];
    setAssignments(updated);
    saveAssignmentsToStorage(updated);
  }

  function updateAssignment(index, patch) {
    const updated = assignments.map((item, i) =>
      i === index ? { ...item, ...patch } : item
    );
    setAssignments(updated);
    saveAssignmentsToStorage(updated);
  }

  if (!currentUser) return <Login onLogin={handleLogin} />;

  return (
    <div className="container-fluid p-0">
      <Navbar onLogout={logout} user={currentUser} />

      <div className="row">
        <aside className="col-md-3 col-lg-2 sidebar p-3">
          <Sidebar view={view} setView={setView} />
        </aside>

        <main className="col-md-9 col-lg-10 p-4">
          {view === "student" && (
            <StudentDashboard
              currentUser={currentUser}
              assignments={assignments}
              addAssignment={addAssignment}
            />
          )}

          {view === "teacher" && (
            <TeacherDashboard
              assignments={assignments}
              updateAssignment={updateAssignment}
            />
          )}
        </main>
      </div>
    </div>
  );
}
