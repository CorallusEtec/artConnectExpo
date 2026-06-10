import { ReactNode } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
export type RetryFetchProps = {
  children?: ReactNode;
  onRetry?: () => void;
};

export function RetryFetch({ children = <></>, ...props }: RetryFetchProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ alignItems: "center", gap: 10 }}>
        {children}
        <Button onPress={props.onRetry} mode="outlined">
          Tentar novamente
        </Button>
      </View>
    </View>
  );
}
