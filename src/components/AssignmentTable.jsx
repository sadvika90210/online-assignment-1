export default function AssignmentTable({ assignments }) {
  return (
    <table className="table table-bordered mt-3">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Score</th>
          <th>Grade</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((a, i) => (
          <tr key={i}>
            <td>{a.title}</td>
            <td>{a.status}</td>
            <td>{a.score ?? "-"}</td>
            <td>{a.grade}</td>
            <td>{a.feedback}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
