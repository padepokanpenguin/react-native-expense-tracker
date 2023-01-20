import {StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../../utils/color';
import ExpensesList from './expenses-list';
import ExpensesSummary from './expenses-summary';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of Shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of Trousers',
    amount: 89.99,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some Bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 49.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'Another Book',
    description: 'A pair of Shoes',
    amount: 19.99,
    date: new Date('2022-01-18'),
  },
  {
    id: 'e12',
    description: 'A pair of Shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e11',
    description: 'A pair of Trousers',
    amount: 89.99,
    date: new Date('2022-01-05'),
  },
  {
    id: '141',
    description: 'Some Bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: '131',
    description: 'A book',
    amount: 49.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'Anoher Book',
    description: 'A pair of Shoes',
    amount: 19.99,
    date: new Date('2022-01-18'),
  },
];

interface ExpensesOutputProps {
  expensesPeriod: string;
}

export default function ExpensesOutput({expensesPeriod}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
