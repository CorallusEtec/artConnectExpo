import { Post } from "@/components/Post";
import { Action } from "@/components/Post/Action";
import { TextButton } from "@/components/TextButton";
import PublicacoesService from "@/services/PublicacoesService";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { router } from "expo-router";
export default function Home() {
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState([]);

  const [publicacoes, setPublicacoes] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function carregar() {
      try{
        const data = await PublicacoesService.listar();
        setPublicacoes(data);
      } catch (Erro) {
        console.log(Erro);
      }
    }
    setLoad(false);
    carregar();
  }, []);

  if (load) return <ActivityIndicator size={"large"} />;

  return (
    <>
      <View style={style.navbar}>
        <Image
          style={style.banner}
          source={require("@/assets/img/banner.png")}
        />
        <View style={{ flexDirection: "row", gap: 16 }}>
  <TouchableOpacity onPress={() => router.push("./search")}>
    <Feather name="search" color={gStyles.cinza[600]} size={22} />
  </TouchableOpacity>

  <TouchableOpacity>
    <AntDesign name="message" color={gStyles.cinza[600]} size={22} />
  </TouchableOpacity>
</View>
      </View>
      <View style={style.container}>

        <FlatList
          data={publicacoes}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }) => (
          <Post.root>
            <Post.header
              nomePerfil={item.autor?.nome ?? "Usuário"}
              data={new Date(item.dataPublicacao)}
            >
              <Post.headerActions>
                <TextButton title="Seguir" theme="secondary" />
              </Post.headerActions>
            </Post.header>

            <Post.legend data={item.legenda} />
            {item.urlMidia && (
              <Post.image url={item.urlMidia} />
            )}
            
            <Post.actions>
              <Action insight={0}>
                <FontAwesome name="heart-o" size={24} color={gStyles.vermelho[400]} />
              </Action>

              <Action insight={0}>
                <Feather name="message-circle" size={24} color={gStyles.cinza[600]} />
              </Action>
            </Post.actions>
          </Post.root>
        )}
        />
        
      </View>
    </>
  );
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
