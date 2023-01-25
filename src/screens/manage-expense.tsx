import type {RouteProp} from '@react-navigation/native';
import {useContext, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ExpenseItemProps} from '../components/ExpensesOutput/expense-item';
import ExpenseForm from '../components/ManageExpense/expense-form';
import IconButton from '../components/UI/icon-button';
import {ExpensesContext} from '../store/expenses-context';
import {GlobalStyles} from '../utils/color';

type RootStackParamList = {
  ManageExpense: {expenseId: string};
};
interface ManageExpenseProps {
  route: RouteProp<RootStackParamList, 'ManageExpense'> | any;
  navigation: any;
}

export default function ManageExpense({route, navigation}: ManageExpenseProps) {
  const {expenses, addExpense, deleteExpense, updateExpense} =
    useContext(ExpensesContext);

  const editExpenseId = route.params?.expenseId;

  const selectedExpense = expenses.find(
    (expense: ExpenseItemProps) => expense.id === editExpenseId,
  );

  const isEditing = !!editExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add expense',
    });
  }, [navigation, isEditing]);

  function deleteFunctionHandler() {
    deleteExpense(editExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expense: ExpenseItemProps) {
    if (isEditing) {
      updateExpense(editExpenseId, expense);
    } else {
      addExpense(expense);
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Editing' : 'Add'}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash-2"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteFunctionHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    backgroundColor: GlobalStyles.colors.primary700,
    alignItems: 'center',
  },
});
