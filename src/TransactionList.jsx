import { useState } from "react";
import { categoryColor } from "./categoryColors";
import { CATEGORIES } from "./categories";

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const filtered = transactions
    .filter((t) => filterType === "all" || t.type === filterType)
    .filter((t) => filterCategory === "all" || t.category === filterCategory);

  const confirmDelete = (id) => {
    onDelete(id);
    setPendingDeleteId(null);
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} aria-label="Filter by type">
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No transactions match these filters yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="col-amount">Amount</th>
              <th className="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td className="col-date">{t.date}</td>
                <td>{t.description}</td>
                <td>
                  <span className="category-tag">
                    <span className="category-dot" style={{ backgroundColor: categoryColor(t.category) }} />
                    {t.category}
                  </span>
                </td>
                <td className={`col-amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                  {t.type === "income" ? "+" : "−"}${t.amount.toLocaleString()}
                </td>
                <td className="col-actions">
                  {pendingDeleteId === t.id ? (
                    <>
                      <button className="delete-btn delete-btn--confirm" onClick={() => confirmDelete(t.id)}>
                        Confirm
                      </button>
                      <button className="delete-btn" onClick={() => setPendingDeleteId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="delete-btn"
                      onClick={() => setPendingDeleteId(t.id)}
                      aria-label={`Delete ${t.description}`}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;
