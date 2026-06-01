import { Post } from "@/components/Post";
import { TextButton } from "@/components/TextButton";
import PublicacoesService from "@/services/PublicacoesService";
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
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import { Reacao } from "@/components/Reacao";
import UsuarioService from "@/services/UsuarioService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";

export default function Perfil() {
  const [usuario, setUsuario] = useState<UsuarioResponse>();
  const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function carregar() {
      try {
        let us: UsuarioResponse = {} as UsuarioResponse;
        
        const tk = await AsyncStorage.getItem("@artconnect:token");
        
        // SE ESTIVER COM TOKEN
        if(tk) {
          const tokenParse: AuthLoginResponse = JSON.parse(tk);
          
          us = await UsuarioService.findById(tokenParse.id);
          console.log(us)
          setUsuario(us)
        }
  
        if (us.id) {
          const data = await PublicacoesService.listar();
          const meus = (data ?? []).filter(
            (p: PublicacaoResponse) => p.autor.id == us?.id,
          );
          setPublicacoes(meus);
        } else {
          setPublicacoes([]);
        }
        
        
        
      } catch (err) {
        console.error(err);
      } finally {
      }
      setLoading(false);   
    }
    carregar();
  
  }, []);
  if(loading) return <ActivityIndicator />

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
                    <Reacao insight={0}>
                      <FontAwesome
                        name="heart-o"
                        size={24}
                        color={gStyles.vermelho[400]}
                      />
                    </Reacao>

                    <Reacao insight={0}>
                      <Feather
                        name="message-circle"
                        size={24}
                        color={gStyles.cinza[600]}
                      />
                    </Reacao>
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
