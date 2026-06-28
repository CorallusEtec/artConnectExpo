import { View, Text, TextInput, TextInputProps } from "react-native";
import { useTheme } from "react-native-paper";
import { style } from "./edit";

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  multiline?: boolean;
}

export function FormField({ 
  label, 
  error, 
  multiline, 
  style: customStyle, 
  ...props 
}: FormFieldProps) {
  const theme = useTheme();

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[style.label, { color: theme.colors.onSurface }]}>
        {label}
      </Text>
      <TextInput
        style={[
          style.input,
          multiline && style.textarea,
          error && { borderColor: theme.colors.error, borderWidth: 1 },
          customStyle,
        ]}
        multiline={multiline}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        {...props}
      />
      {error && (
        <Text style={{ color: theme.colors.error, fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}