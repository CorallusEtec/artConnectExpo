import { usePublicacao } from "@/contexts/PublicacaoContext";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { style } from "./style";

export function ComentarioSectionHeader() {
  const { setComentarioSection } = usePublicacao();

  return (
    <View style={style.headerContainer}>
      <Text variant="headlineSmall" style={style.headerTitle}>
        Comentários
      </Text>
      <IconButton icon="close" onPress={() => setComentarioSection(false)} />
    </View>
  );
}
