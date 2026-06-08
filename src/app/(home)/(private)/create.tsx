import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import PublicacaoService from "@/services/PublicacoesService";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/(home)/(private)/create";
import { FontAwesome6 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Create() {
  const [erro, setErro] = useState("");
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState<any>(null);

  async function escolherImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setMidia(asset);
    }
  }

  async function handlePublicar() {
    const token = await AsyncStorage.getItem("@artconnect:token");
    if (!token) {
      router.navigate("/login");
      return;
    }

    const tokenParse: AuthLoginResponse = JSON.parse(token);

    const res = {
      legenda: legenda,
      file: midia,
      autorId: tokenParse.id,
    };

    const validacao = PublicacaoService.validarCriacao(res);
    if (!validacao.valido) {
      setErro(validacao.mensagem);
      return;
    }

    try {
      if (!legenda && !midia) {
        return;
      }

      await PublicacaoService.save(res);

      router.navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Erro ao publicar");
    }
  }

  return (
    <View style={style.container}>
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => router.navigate("/home")}>
          <FontAwesome6
            name="circle-arrow-left"
            size={35}
            color={gStyles.azul[200]}
          />
        </Pressable>
      </View>

      <Text style={style.title}>Criar publicação</Text>
      {erro ? (
        <Text style={{ color: "red", textAlign: "center" }}>{erro}</Text>
      ) : null}

      <TextInput
        placeholder="Texto do post..."
        value={legenda}
        onChangeText={setLegenda}
        style={style.input}
        multiline
      />

      <TouchableOpacity onPress={escolherImagem} style={style.attach}>
        <Feather name="paperclip" size={24} color="black" />
        <Text style={style.attachText}>Anexo</Text>
      </TouchableOpacity>

      {midia && (
        <View style={style.preview}>
          <Image source={{ uri: midia.uri }} style={style.image} />
        </View>
      )}

      <Pressable style={style.postar} onPress={handlePublicar}>
        <Text style={style.postarText}>Publicar</Text>
      </Pressable>
    </View>
  );
}
