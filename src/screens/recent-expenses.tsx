import {useContext} from 'react';
import {ExpenseItemProps} from '../components/ExpensesOutput/expense-item';
import ExpensesOutput from '../components/ExpensesOutput/expenses-output';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinusDays} from '../utils/date';

export default function RecentExpenses() {
  const {expenses} = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense: ExpenseItemProps) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date < today;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}
