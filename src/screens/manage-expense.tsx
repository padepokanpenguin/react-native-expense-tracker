import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useContext, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/UI/button';
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
  const {addExpense, deleteExpense, updateExpense} =
    useContext(ExpensesContext);

  const editExpenseId = route.params?.expenseId;

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

  function confirmHandler() {
    if (isEditing) {
      updateExpense(editExpenseId, {
        description: 'Test',
        amount: 19,
        date: new Date(),
      });
    } else {
      addExpense({description: 'Test', amount: 19, date: new Date()});
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    backgroundColor: GlobalStyles.colors.primary700,
    alignItems: 'center',
  },
});
