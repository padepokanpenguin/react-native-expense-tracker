import {KeyboardTypeOptions, Text, TextInput, View} from 'react-native';

interface InputProps {
  label: string;
  keyboardType: KeyboardTypeOptions | undefined;
  maxLength: number;
  onChange: () => void;
  placeholder?: string;
  multiline?: boolean;
}

export default function Input({
  label,
  keyboardType,
  maxLength,
  onChange,
  placeholder,
  multiline,
}: InputProps) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        multiline={multiline}
      />
    </View>
  );
}
