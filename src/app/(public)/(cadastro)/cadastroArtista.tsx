import { useArteList } from "@/services/ArteService";
import { style } from "@/style/pages/cadastroArtista";
import { useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { List, Searchbar, Text } from "react-native-paper";

export default function CadastroArtista() {
  const [buscaArte, setBuscaArte] = useState("");
  const { data, isLoading, refetch } = useArteList({ nomeArte: buscaArte });
  return (
    <>
      <StatusBar hidden />
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text variant="headlineSmall">Qual o seu tipo de arte?</Text>
          <Text variant="bodyMedium">
            Selecione o tipo de arte que você trabalha.
          </Text>
        </View>
        <Searchbar
          value={buscaArte}
          onChangeText={setBuscaArte}
          elevation={1}
          onIconPress={() => refetch()}
          placeholder="Pesquisar tipo de arte"
          style={{ marginVertical: 20 }}
        />
        <View>
          {isLoading ? (
            <Text>Carregando...</Text>
          ) : (
            <List.Section>
              <FlatList
                data={data?.data.content || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <List.Item title={item.nomeArte} />}
              />
            </List.Section>
          )}
        </View>
      </View>
    </>
  );
}
