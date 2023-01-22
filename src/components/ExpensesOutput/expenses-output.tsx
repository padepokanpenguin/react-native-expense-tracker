import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../utils/color';
import ExpensesList from './expenses-list';
import ExpensesSummary from './expenses-summary';

interface ExpensesOutputProps {
  expensesPeriod: string;
  expenses: any;
  fallbackText: string;
}

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}: ExpensesOutputProps) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />

      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
