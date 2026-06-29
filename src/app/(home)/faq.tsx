import { FaqAccordion } from "@/components/FAQ";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "@/style/pages/faq"

export default function Faq() {
  const theme = useTheme();

  return (
    <View style={style.container}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primary }}
      >
        <Appbar.Action
          icon="arrow-left"
          size={26}
          onPress={router.back}
          color={theme.colors.onPrimary}
        />
        <Appbar.Content
          title={
            <Text
              style={{ color: theme.colors.onPrimary, fontWeight: "600" }}
              variant="titleMedium"
            >
              Perguntas Frequentes
            </Text>
          }
        />
      </Appbar.Header>

      <View style={[style.subtitleContainer, { backgroundColor: theme.colors.primaryContainer }]}>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onPrimaryContainer, textAlign: "center" }}
        >
          Não encontrou sua resposta? Entre em contato pelo e-mail{" "}
          <Text style={{ fontWeight: "700" }}>suporte@artconnect.com.br</Text>
        </Text>
      </View>

      <ScrollView contentContainerStyle={style.scrollContent}>
        <FaqAccordion />
      </ScrollView>
    </View>
  );
}

