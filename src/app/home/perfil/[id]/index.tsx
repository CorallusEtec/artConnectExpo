import { Post } from '@/components/Post';
import { Action } from '@/components/Post/Action';
import { TextButton } from "@/components/TextButton";
import PublicacoesService from '@/services/PublicacoesService';
import UsuarioService from '@/services/UsuarioService';
import { gStyles } from "@/style/gStyle";
import { Feather, FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";

interface Contato {
  idContato: number;
  valorContato: string;
  tipoContato: {
    idTipoContato: number;
  };
}
interface Usuario {
  nome: string;
  contatos?: Contato[];
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [publicacoes, setPublicacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const {id} = useLocalSearchParams();

  function mapearContatos(contatos: Contato[] = [], tipo: number) {
    return contatos.filter(
      contato => contato.tipoContato?.idTipoContato === tipo
    );
  }

const contatosWhatsapp = mapearContatos(usuario?.contatos, 1);
const contatosInstagram = mapearContatos(usuario?.contatos, 2);

  useEffect(() => {
    async function preencherCampos()  {
      const dados = await UsuarioService.getById(Number(id));
      setUsuario(dados);
    }

    async function carregar() {
      try {
        const data = await PublicacoesService.listar();
          const meus = (data ?? []).filter((p: any) => p.autor?.id === Number(id));
          setPublicacoes(meus);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    preencherCampos();
    carregar();
    },[id]);

  return (
    <>
      <View style={style.navbarMom}>
        <View style={style.navbarSon1}>
          <TouchableOpacity onPress={router.back}>
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

          <View style={style.contatoContainer}>

            {contatosWhatsapp.length > 0 && (
              <View style={style.contatoWrapper}>
                <FontAwesome name="whatsapp" size={26} color="white" />

                {contatosWhatsapp.map((contato: any) => (
                  <Text style={style.contatoText} key={contato.idContato}>
                    {contato.valorContato}
                  </Text>
                ))}
              </View>
            )}

            {contatosInstagram.length > 0 && (
              <View style={style.contatoWrapper}>
                <FontAwesome name="instagram" size={26} color="white" />

                {contatosInstagram.map((contato: any) => (
                  <Text style={style.contatoText} key={contato.idContato}>
                    {contato.valorContato}
                  </Text>
                ))}
              </View>
            )}
          </View>
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
                    nomePerfil={item.autor?.nome ?? 'Usuário'}
                    data={new Date(item.dataPublicacao)}
                  >
                    <Post.headerActions>
                      <TextButton title="Seguir" theme="secondary" />
                    </Post.headerActions>
                  </Post.header>

                  <Post.legend data={item.legenda} />
                  {item.urlMidia && <Post.image url={item.urlMidia} />}

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
          )} 
        </View>
      </View>
    </>
  );
}
