import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StudentGraph({ assignments }) {
  const data = assignments.map((a, i) => ({
    name: `Assignment ${i + 1}`,
    score: a.score ?? 0
  }));

  return (
    <div style={{ width: "100%", height: 350 }}>
      <h4 className="mb-3">📈 Performance Graph</h4>

      {assignments.length === 0 ? (
        <p>No graded assignments yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#28a745"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
