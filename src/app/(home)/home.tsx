import { Publicacao } from "@/components/Publicacao";
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { style } from "./style";

export default function Home() {
  const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);
  const [load, setLoad] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [postId, setPostId] = useState<number>();

  const publi = [
    {id: 1, titulo: "Olá Mundo"},
    {id: 3, titulo: "Olá Mundo dois"},
    {id: 4, titulo: "Olá Mundo dois"},
    {id: 5, titulo: "Olá Mundo dois"},
    {id: 6, titulo: "Olá Mundo dois"},
    {id: 7, titulo: "Olá Mundo dois"},
    {id: 8, titulo: "Olá Mundo dois"},

  ]

  return (
    <View style={style.container}>
      <FlatList
      contentContainerStyle={style.listaContainer}
      data={publi}
      keyExtractor={(publi)=>publi.id.toString()}
      renderItem={({item})=>(
        <Publicacao />
      )}
      />
    </View>
  );
}
