import {useContext} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/expenses-output';
import {ExpensesContext} from '../store/expenses-context';

export default function AllExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenseCtx.expenses}
      fallbackText="No expenses registered now"
    />
  );
}
