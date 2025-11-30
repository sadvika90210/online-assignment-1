export default function Sidebar({ view, setView }) {
  return (
    <div>
      <h4 className="text-center">Dashboard</h4>
      <hr />

      <button
        className={`btn w-100 mb-2 ${
          view === "student" ? "btn-warning" : "btn-outline-light"
        }`}
        onClick={() => setView("student")}
      >
        Student Dashboard
      </button>

      <button
        className={`btn w-100 ${
          view === "teacher" ? "btn-warning" : "btn-outline-light"
        }`}
        onClick={() => setView("teacher")}
      >
        Teacher Dashboard
      </button>
    </div>
  );
}
