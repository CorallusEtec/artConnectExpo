import { useAuth } from "@/contexts";
import { ChatMessageResponse } from "@/models/response/ChatMessageResponse";
import { AppUtils } from "@/utils/AppUtils";
import { StyleSheet, View } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { style } from "./style";

type ChatMessageProps = {
  mensagem: ChatMessageResponse;
};

export function ChatMessage({ mensagem }: ChatMessageProps) {
  const { getValidateId } = useAuth();
  const theme = useTheme();
  const getStyle = style(theme);

  const styleMode =
    mensagem.sender.id === getValidateId()
      ? senderStyle(theme)
      : recipientStyle(theme);
  return (
    <View style={styleMode.row}>
      <View style={[getStyle.container, styleMode.container]}>
        <Text style={[getStyle.text, styleMode.text]}>{mensagem.mensagem}</Text>
        <Text variant="bodySmall" style={[getStyle.text, styleMode.text]}>
          {AppUtils.dataMessageFormat(mensagem.dataEnvio)}
        </Text>
      </View>
    </View>
  );
}

const senderStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    row: {
      alignItems: "flex-end",
    },

    container: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.onPrimary,
    },
  });

const recipientStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    row: {
      alignItems: "flex-start",
    },
    container: {
      backgroundColor: theme.colors.onTertiary,
    },
    text: {
      color: theme.colors.tertiary,
    },
  });
