import { ReactNode } from "react";
import { HelperText, HelperTextProps } from "react-native-paper";

type FormHelperTextProps = Omit<HelperTextProps, "type" | "chidren"> & {
  type?: "error" | "info";
  children?: ReactNode;
};

export function FormHelperText({
  children = "",
  type = "error",
  padding = "none",
  ...props
}: FormHelperTextProps) {
  return (
    <HelperText padding={padding} type={type} {...props}>
      {children}
    </HelperText>
  );
}
