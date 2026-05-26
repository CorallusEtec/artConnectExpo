import { CommentSection } from "@/components/CommentSection";
import { Post } from "@/components/Post";
import { Reacao } from "@/components/Reacao";
import { TextButton } from "@/components/TextButton";
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import PublicacoesService from "@/services/PublicacoesService";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator, ScrollView, Image, TouchableOpacity, View } from "react-native";
import { style } from "./style";

export default function Home() {
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState([]);
  const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);
  const [load, setLoad] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [postId, setPostId] = useState<number>();

 useEffect(() => {
    async function carregar() {
      try {
        const data = await PublicacoesService.listar();
        setPublicacoes(data);
      } catch (Erro) {
        console.error(Erro); 
      } finally {
        setLoad(false); 
      }
    }

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
          <TouchableOpacity>
            <AntDesign name="message" color={gStyles.cinza[600]} size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          {publicacoes.map((item) => (
            <Post.root key={item.id}>
              <Post.header
                nomePerfil={item.autor?.nome ?? "Usuário"}
                dataPublicacao={new Date(item.dataPublicacao)}
              >
                <Post.headerActions>
                  <TextButton title="Seguir" theme="secondary" />
                </Post.headerActions>
              </Post.header>

              <Post.legend data={item.legenda} />
              {item.urlMidia && <Post.image url={item.urlMidia} />}

              <Post.actions>
                <Reacao insight={0}>
                  <MaterialCommunityIcons
                    name="thumb-up-outline"
                    size={24}
                    color={gStyles.cinza[600]}
                  />
                </Reacao>

                <Reacao
                  insight={item.totalComentarios}
                  onPress={() => {
                    setModalStatus(true);
                    setPostId(item.id as number);
                  }}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color={gStyles.cinza[600]}
                  />
                </Reacao>
              </Post.actions>
            </Post.root>
          ))}

          <CommentSection
            setModalStatus={setModalStatus}
            postId={postId}
            visible={modalStatus}
          />
        </ScrollView>
      </View>
    </>
  );
}
