function Summary({ transactions }) {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <section className="summary">
      <div className="balance-hero">
        <p className="balance-amount">${balance.toLocaleString()}</p>
        <p className="balance-label">current balance</p>
      </div>
      <dl className="summary-stats">
        <div className="summary-stat">
          <dt>Income</dt>
          <dd className="income-amount">${totalIncome.toLocaleString()}</dd>
        </div>
        <div className="summary-stat">
          <dt>Expenses</dt>
          <dd className="expense-amount">${totalExpenses.toLocaleString()}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary;
