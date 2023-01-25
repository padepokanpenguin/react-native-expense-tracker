import {useState} from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {GlobalStyles} from '../../utils/color';
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

type InputState = Record<string, {value: string; isValid: boolean}>;

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue,
}: ExpenseFormProps) {
  const [inputs, setInput] = useState<InputState>({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });

  function inputChangeHandler(
    identifier: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setInput((curInput: ExpenseItemProps) => {
      return {
        ...curInput,
        [identifier]: {value: e.nativeEvent.text, isValid: true},
      };
    });
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid Input', 'Please check your input values');
      setInput((curInputs: any) => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            maxLength: 10,
            keyboardType: 'decimal-pad',
            onChange: e => inputChangeHandler('amount', e),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            maxLength: 10,
            keyboardType: 'default',
            placeholder: 'YYYY-MM-DD',
            value: inputs.date.value,
            // onChange: inputChangeHandler.bind(this, 'date'),
            onChange: e => inputChangeHandler('date', e),
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          maxLength: 15,
          keyboardType: 'default',
          multiline: true,
          value: inputs.description.value,
          // onChange: inputChangeHandler.bind(this, 'description'),
          onChange: e => inputChangeHandler('description', e),
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
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
