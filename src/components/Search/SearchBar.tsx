import { gStyles } from "@/style/gStyle";
import { Feather } from "@expo/vector-icons";
import { Searchbar, IconButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";

interface SearchBarProps {
  value: string;
  escopo: "artista" | "publicacao";
  onChangeText: (text: string) => void;
  onFiltroPress: () => void;
}

export default function SearchBar({
  value,
  escopo,
  onChangeText,
  onFiltroPress,
}: SearchBarProps) {
  return (
    <View style={styles.row}>
      <Searchbar
        style={styles.input}
        inputStyle={styles.inputText}
        placeholder={escopo === "artista" ? "Buscar usuário..." : "Buscar publicação..."}
        value={value}
        onChangeText={onChangeText}
        icon="magnify"
        clearIcon="close"
      />
      <IconButton
        icon="tune-variant"
        size={22}
        style={styles.botaoFiltro}
        onPress={onFiltroPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    elevation: 0,
  },
  inputText: {
    fontSize: 14,
  },
  botaoFiltro: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    margin: 0,
  },
});