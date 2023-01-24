import {View} from 'react-native';
import Input from './input';

export default function ExpenseForm() {
  return (
    <View>
      <Input label="Amount" maxLength={10} keyboardType="number-pad" />
      <Input label="Date" maxLength={10} keyboardType="numeric" />
      <Input label="Description" maxLength={15} keyboardType="default" />
    </View>
  );
}
