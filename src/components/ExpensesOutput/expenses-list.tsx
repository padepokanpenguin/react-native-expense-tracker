import {FlatList, Text} from 'react-native';
import ExpenseItem from './expense-item';

interface ExpensesListProps {
  expenses: any;
}

function renderExpenseItem(itemData: any) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({expenses}: ExpensesListProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
}
