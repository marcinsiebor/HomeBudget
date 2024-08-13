import ExpenseItem from "./ExpenseItem";

// Component for rendering a table of expenses
const Table = ({ expenses, budgets, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {/* Render table headers dynamically */}
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (header, index) => (
                <th key={index}>{header}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {/* Render expense items */}
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} budgets={budgets} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;