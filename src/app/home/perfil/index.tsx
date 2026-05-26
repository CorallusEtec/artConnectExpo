import { Post } from "@/components/Post";
import { Reacao as Action } from "@/components/Reacao";
import { TextButton } from "@/components/TextButton";
import PublicacoesService from "@/services/PublicacoesService";
import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import { Feather, FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { style } from "./style";

export default function Perfil() {
  const usuario = useAuthStore((s) => s.usuario);
  const [publicacoes, setPublicacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await PublicacoesService.listar();
        if (usuario) {
          const meus = (data ?? []).filter(
            (p: any) => p.autor?.id === (usuario as any).id,
          );
          setPublicacoes(meus);
        } else {
          setPublicacoes([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [usuario]);
  return (
    <>
      <View style={style.navbarMom}>
        <View style={style.navbarSon1}>
          <TouchableOpacity>
            <FontAwesome5
              name="arrow-left"
              color={gStyles.cinza[100]}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={style.navbarSon2}>
          <TouchableOpacity>
            <Feather name="send" color={gStyles.cinza[100]} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="menu" color={gStyles.cinza[100]} size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.container}>
        <View style={style.fundo}>
          <View style={style.profile}>
            <Pressable>
              <Image
                style={style.headerProfile}
                source={require("@/assets/template/avatar.png")}
              />
            </Pressable>
            <Text style={style.nomeProfile}>{usuario?.nome}</Text>
          </View>
          <View style={style.infosProfile}>
            <View style={style.infoDuo}>
              <Text style={style.info}>Posts</Text>
              <Text style={style.info}>{publicacoes.length}</Text>
            </View>
            <Pressable>
              <View style={style.infoDuo}>
                <Text style={style.info}>Seguidores</Text>
                <Text style={style.info}>0</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={style.infoDuo}>
                <Text style={style.info}>Seguindo</Text>
                <Text style={style.info}>0</Text>
              </View>
            </Pressable>
          </View>

          <View style={style.bioContainer}>
            <Text style={style.bioText}>
              {usuario?.textoBio ?? "Sem biografia."}
            </Text>
          </View>
        </View>

        <View style={style.botaoEdit}>
          <TextButton
            onPress={() => router.navigate("/home/perfil/editar")}
            style={{
              width: "30%",
              backgroundColor: gStyles.azul[500],
              borderWidth: 3,
              borderColor: "white",
            }}
            title="Editar perfil"
          />
        </View>

        <View style={style.icons}>
          <Pressable>
            <Feather name="camera" color={gStyles.cinza[600]} size={32.5} />
          </Pressable>
          <Pressable>
            <Feather name="bookmark" color={gStyles.cinza[600]} size={35} />
          </Pressable>
        </View>

        <View style={style.posts}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={publicacoes}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Post.root>
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
                    <Action insight={0}>
                      <FontAwesome
                        name="heart-o"
                        size={24}
                        color={gStyles.vermelho[400]}
                      />
                    </Action>

                    <Action insight={0}>
                      <Feather
                        name="message-circle"
                        size={24}
                        color={gStyles.cinza[600]}
                      />
                    </Action>
                  </Post.actions>
                </Post.root>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
}
