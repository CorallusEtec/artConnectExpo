import { CommentSection } from "@/components/CommentSection";
import { Post } from "@/components/Post";
import { Reacao } from "@/components/Reacao";
import { TextButton } from "@/components/TextButton";
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import PublicacoesService from "@/services/PublicacoesService";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./style";
import { useAuthStore } from "@/store";
import ReacaoService from "@/services/ReacaoService";

export default function Home() {
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState([]);
  const usuario = useAuthStore((s) => s.usuario);
  const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);
  const [load, setLoad] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [postId, setPostId] = useState<number>();
  const [minhasReacoes, setMinhasReacoes] = useState<Record<number, string | null>>({});

async function reagir(postId: number) {
  if (!usuario) return;

  const jaReagiu = minhasReacoes[postId] === "LIKE";

  setMinhasReacoes(prev => ({
    ...prev,
    [postId]: jaReagiu ? null : "LIKE"
  }));

  setPublicacoes(prev =>
    prev.map(p =>
      p.id !== postId ? p : {
        ...p,
        reacoes: p.reacoes?.map(r =>
          r.tipoReacao.nomeTipo !== "LIKE" ? r : {
            ...r,
            totalReacoes: r.totalReacoes + (jaReagiu ? -1 : 1)
          }
        )
      }
    )
  );

  try {
    await ReacaoService.reagirPost(postId, usuario.id, "LIKE");
  } catch (e) {
    console.log(e);
    const data = await PublicacoesService.listar();
    setPublicacoes(data);
  }
}

useEffect(() => {
  async function carregar() {
    try {
      const data = await PublicacoesService.listar();
      setPublicacoes(data);

      if (!usuario) return;

      const reacoes = await Promise.all(
        data.map(p => ReacaoService.getReacaoPost(p.id as number, usuario.id))
      );

      const mapa: Record<number, string | null> = {};
      reacoes.forEach((r, i) => {
        mapa[data[i].id as number] = r.empty ? null : r.tipoReacao.nomeTipo;
      });
      setMinhasReacoes(mapa);
    } catch (e) {
      console.error(e);
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
                <Reacao
                  insight={
                    item.reacoes?.find(r => r.tipoReacao.nomeTipo === "LIKE")?.totalReacoes ?? 0
                  }
                  onPress={() => reagir(item.id as number)}>
                  <MaterialCommunityIcons
                    name={minhasReacoes[item.id as number] === "LIKE" ? "thumb-up" : "thumb-up-outline"}
                    size={24}
                    color={minhasReacoes[item.id as number] === "LIKE" ? gStyles.azul[500] : gStyles.cinza[600]}
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