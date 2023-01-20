import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/expenses-output';

export default function RecentExpenses() {
  return <ExpensesOutput expensesPeriod="Last 7 days" />;
}
