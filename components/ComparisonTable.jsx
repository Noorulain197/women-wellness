export default function ComparisonTable({ rows = [] }) {
  if (!rows?.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Treatment</th>
            <th>Cost</th>
            <th>Timeframe</th>
            <th>Short‑Term</th>
            <th>Long‑Term</th>
            <th>Side‑Effects</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="font-medium">{r.name}</td>
              <td>{r.cost}</td>
              <td>{r.timeframe}</td>
              <td>{r.shortTerm}</td>
              <td>{r.longTerm}</td>
              <td>{r.sideEffects}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
