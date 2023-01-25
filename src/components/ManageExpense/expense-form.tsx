import {useCallback, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import getFormattedDate from '../../utils/date';
import {ExpenseItemProps} from '../ExpensesOutput/expense-item';
import Button from '../UI/button';
import Input from './input';

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expense: ExpenseItemProps) => void;
  submitButtonLabel: string;
  defaultValue: ExpenseItemProps;
}

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue,
}: ExpenseFormProps) {
  const [input, setInput] = useState<any>({
    amount: defaultValue ? defaultValue.amount.toString() : '',
    date: defaultValue ? getFormattedDate(defaultValue.date) : '',
    description: defaultValue ? defaultValue.description : '',
  });

  function inputChangeHandler(
    identifier: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setInput((curInput: ExpenseItemProps) => {
      return {
        ...curInput,
        [identifier]: e.nativeEvent.text,
      };
    });
  }

  const submitHandler = useCallback(() => {
    const expenseData = {
      amount: +input.amount,
      date: new Date(input.date),
      description: input.description,
    };

    if (!expenseData) {
      console.info('Expense was empty');
    }

    onSubmit(expenseData);
  }, []);

  console.info(input);
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            maxLength: 10,
            keyboardType: 'decimal-pad',
            onChange: e => inputChangeHandler('amount', e),
            value: input.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            maxLength: 10,
            keyboardType: 'default',
            placeholder: 'YYYY-MM-DD',
            value: input.date,
            // onChange: inputChangeHandler.bind(this, 'date'),
            onChange: e => inputChangeHandler('date', e),
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          maxLength: 15,
          keyboardType: 'default',
          multiline: true,
          value: input.description,
          // onChange: inputChangeHandler.bind(this, 'description'),
          onChange: e => inputChangeHandler('description', e),
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
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
});
