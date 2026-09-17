import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { categoryColor } from "./categoryColors";

function CategoryChart({ transactions }) {
  const totalsByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      return totals;
    }, {});

  const data = Object.entries(totalsByCategory).map(([category, amount]) => ({
    category,
    amount,
  }));

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <XAxis
            dataKey="category"
            tick={{ fill: "var(--paper-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
            axisLine={{ stroke: "var(--paper-line)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--paper-text-muted)", fontSize: 12, fontFamily: "var(--font-body)" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, "Spent"]}
            cursor={{ fill: "var(--paper-line)", opacity: 0.35 }}
            contentStyle={{
              background: "var(--paper)",
              border: "1px solid var(--paper-line)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
            }}
            labelStyle={{ color: "var(--paper-text)", fontWeight: 600, textTransform: "capitalize" }}
          />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={56}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={categoryColor(entry.category)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
