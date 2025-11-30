export default function Navbar({ onLogout, user }) {
  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <span className="navbar-brand mb-0 h1">📚 Assignment System</span>

      <div className="text-white">
        <strong>{user.server}</strong> | {user.role.toUpperCase()} ({user.id})
        <button className="btn btn-light btn-sm ms-3" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
