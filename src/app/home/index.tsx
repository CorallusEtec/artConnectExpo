import { Post } from "@/components/Post";
import { Action } from "@/components/Post/Action";
import { TextButton } from "@/components/TextButton";
import PublicacaoService from "@/services/PublicacaoService";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Modal } from "react-native";
import { style } from "./style";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(true);
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState<any>(null);

  const [load, setLoad] = useState(false);
  const [publicacoes, setPublicacoes] = useState([]);

  useEffect(() => {
    async function carregar() {
    try {
      const data = await PublicacaoService.listar();
      setPublicacoes(data);
    } catch (err) {
      console.log(err);
    }
  }
    setLoad(false);
    carregar();
  }, []);

  if (load) return <ActivityIndicator size={"large"} />;

  async function escolherImagem() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 0.6,
  });

  if (!result.canceled) {
    setMidia(result.assets[0]);
  }
}

  return (
    <>
      <View style={style.navbar}>
        <Image
          style={style.banner}
          source={require("@/assets/img/banner.png")}
        />
        <TouchableOpacity>
          <AntDesign name="message" color={gStyles.cinza[600]} size={22} />
        </TouchableOpacity>
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
