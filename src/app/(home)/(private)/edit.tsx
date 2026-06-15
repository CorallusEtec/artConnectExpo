// ------------SE VER ESSE CODIGO, SEI QUE TA GRANDE, PRETENDO SEPARAR EM UM COMPONENTE PRA FICAR MELHOR-----------------

import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import ArtistaService, { ArtistaEditDTO } from "@/services/ArtistaService";
import ContratanteService, { ContratanteEditDTO } from "@/services/ContratanteService";
import UsuarioService from "@/services/UsuarioService";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/(home)/(private)/edit";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const placeholder = gStyles.cinza[500];

export default function EditPerfil() {
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<"artista" | "contratante" | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    textoBio: "",
    nomeLog: "",
    numLog: "",
    cep: "",
    bairro: "",
    complemento: "",
    cidade: "",
    uf: "",
    razaoSocial: "",
  });

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  async function carregarDadosIniciais() {
    try {
      const tokenData = await AsyncStorage.getItem("@artconnect:token");
      if (!tokenData) return router.navigate("/login");

      const tokenParse: AuthLoginResponse = JSON.parse(tokenData);
      const model: UsuarioResponse = await UsuarioService.findById(
        tokenParse.id,
        tokenParse.token
      );

      setUser(model);
      setFotoUri(model.fotoPerfilUrl ?? null);
      setTipoUsuario(model.tipoConta === "CONTRATANTE" ? "contratante" : "artista");
      preencherFormulario(model);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
    } finally {
      setLoading(false);
    }
  }

  function preencherFormulario(model: UsuarioResponse) {
    setForm({
      nome: model.nome ?? "",
      textoBio: model.textoBio ?? "",
      nomeLog: model.nomeLog ?? "",
      numLog: model.numLog ? String(model.numLog) : "",
      cep: model.cep ?? "",
      bairro: model.bairro ?? "",
      complemento: model.complemento ?? "",
      cidade: model.cidade ?? "",
      uf: model.uf ?? "",
      razaoSocial: (model as any).razaoSocial ?? "",
    });
  }

  function alterarCampo(campo: keyof typeof form, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function solicitarPermissaoGaleria(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à sua galeria para alterar a foto de perfil."
      );
      return false;
    }
    return true;
  }

  async function selecionarImagemGaleria() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (resultado.canceled) return null;
    return resultado.assets[0];
  }

  async function handleAlterarFoto() {
    const temPermissao = await solicitarPermissaoGaleria();
    if (!temPermissao) return;

    const imagemSelecionada = await selecionarImagemGaleria();
    if (!imagemSelecionada) return;

    try {
      setUploadingFoto(true);

      const arquivo = {
        uri: imagemSelecionada.uri,
        name: imagemSelecionada.fileName || `foto-perfil-${Date.now()}.jpg`,
        type: imagemSelecionada.mimeType || 'image/jpeg',
      };

      const mensagem = await UsuarioService.updateFotoPerfil(arquivo);

      setFotoUri(imagemSelecionada.uri);

      const usuarioAtualizado = await UsuarioService.getCurrentUser();
      setFotoUri(usuarioAtualizado.fotoPerfilUrl || imagemSelecionada.uri);

      Alert.alert("Sucesso", mensagem);
    } catch (error: any) {
      console.error("Erro ao alterar foto:", error);
      Alert.alert("Erro", error.message || "Não foi possível atualizar a foto de perfil");
    } finally {
      setUploadingFoto(false);
    }
  }

  function prepararPayloadArtista(): ArtistaEditDTO {
    const payload: ArtistaEditDTO = {
      nome: form.nome || undefined,
      textoBio: form.textoBio || undefined,
      nomeLog: form.nomeLog || undefined,
      numLog: form.numLog ? Number(form.numLog) : undefined,
      cep: form.cep || undefined,
      bairro: form.bairro || undefined,
      complemento: form.complemento || undefined,
      cidade: form.cidade || undefined,
      uf: form.uf || undefined,
    };

    Object.keys(payload).forEach((key) => {
      if (payload[key as keyof ArtistaEditDTO] === undefined) {
        delete payload[key as keyof ArtistaEditDTO];
      }
    });

    return payload;
  }

  function prepararPayloadContratante(): ContratanteEditDTO {
    const payload: ContratanteEditDTO = {
      nome: form.nome || undefined,
      textoBio: form.textoBio || undefined,
      nomeLog: form.nomeLog || undefined,
      numLog: form.numLog ? Number(form.numLog) : undefined,
      cep: form.cep || undefined,
      bairro: form.bairro || undefined,
      complemento: form.complemento || undefined,
      cidade: form.cidade || undefined,
      uf: form.uf || undefined,
      razaoSocial: form.razaoSocial || undefined,
    };

    Object.keys(payload).forEach((key) => {
      if (payload[key as keyof ContratanteEditDTO] === undefined) {
        delete payload[key as keyof ContratanteEditDTO];
      }
    });

    return payload;
  }

  async function handleSalvar() {
    if (!user || !tipoUsuario) return;

    try {
      setSaving(true);

      const tokenData = await AsyncStorage.getItem("@artconnect:token");
      if (!tokenData) return router.navigate("/login");

      const tokenParse: AuthLoginResponse = JSON.parse(tokenData);

      if (tipoUsuario === "artista") {
        const payload = prepararPayloadArtista();
        await ArtistaService.edit(tokenParse.token, payload);
      } else {
        const payload = prepararPayloadContratante();
        await ContratanteService.edit(tokenParse.token, payload);
      }

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      router.navigate("/perfil");
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", error.message || "Não foi possível salvar as alterações");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={style.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome6
          name="circle-arrow-left"
          size={35}
          color={gStyles.azul[200]}
        />
      </TouchableOpacity>

      <Text style={style.title}>Editar perfil</Text>

      <View style={style.linhaAvatar}>
        <View style={style.avatarContainer}>
          {uploadingFoto ? (
            <ActivityIndicator
              size="large"
              color={gStyles.azul[200]}
              style={style.headerProfile}
            />
          ) : (
            <Image
              source={
                fotoUri
                  ? { uri: fotoUri }
                  : require("@/assets/template/avatar.png")
              }
              style={style.headerProfile}
            />
          )}
        </View>
        <TouchableOpacity
          style={style.editarAvatar}
          onPress={handleAlterarFoto}
          disabled={uploadingFoto}
        >
          <Feather name="edit-3" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={style.label}>Nome</Text>
      <TextInput
        style={style.input}
        placeholder="Nome completo"
        placeholderTextColor={placeholder}
        value={form.nome}
        onChangeText={(text) => alterarCampo("nome", text)}
      />

      {tipoUsuario === "contratante" && (
        <>
          <Text style={style.label}>Razão Social</Text>
          <TextInput
            style={style.input}
            placeholder="Razão social"
            placeholderTextColor={placeholder}
            value={form.razaoSocial}
            onChangeText={(text) => alterarCampo("razaoSocial", text)}
          />
        </>
      )}

      <Text style={style.label}>Biografia</Text>
      <TextInput
        style={[style.input, style.textarea]}
        placeholder="Fale sobre você"
        placeholderTextColor={placeholder}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={form.textoBio}
        onChangeText={(text) => alterarCampo("textoBio", text)}
      />

      <Text style={style.label}>Logradouro</Text>
      <TextInput
        style={style.input}
        placeholder="Nome do logradouro"
        placeholderTextColor={placeholder}
        value={form.nomeLog}
        onChangeText={(text) => alterarCampo("nomeLog", text)}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Text style={style.label}>Número</Text>
          <TextInput
            style={style.input}
            placeholder="Número"
            placeholderTextColor={placeholder}
            keyboardType="numeric"
            value={form.numLog}
            onChangeText={(text) => alterarCampo("numLog", text)}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={style.label}>CEP</Text>
          <TextInput
            style={style.input}
            placeholder="CEP"
            placeholderTextColor={placeholder}
            keyboardType="numeric"
            value={form.cep}
            onChangeText={(text) => alterarCampo("cep", text)}
          />
        </View>
      </View>

      <Text style={style.label}>Bairro</Text>
      <TextInput
        style={style.input}
        placeholder="Bairro"
        placeholderTextColor={placeholder}
        value={form.bairro}
        onChangeText={(text) => alterarCampo("bairro", text)}
      />

      <Text style={style.label}>Complemento</Text>
      <TextInput
        style={style.input}
        placeholder="Complemento"
        placeholderTextColor={placeholder}
        value={form.complemento}
        onChangeText={(text) => alterarCampo("complemento", text)}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Text style={style.label}>Cidade</Text>
          <TextInput
            style={style.input}
            placeholder="Cidade"
            placeholderTextColor={placeholder}
            value={form.cidade}
            onChangeText={(text) => alterarCampo("cidade", text)}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={style.label}>UF</Text>
          <TextInput
            style={style.input}
            placeholder="UF"
            placeholderTextColor={placeholder}
            value={form.uf}
            onChangeText={(text) => alterarCampo("uf", text)}
          />
        </View>
      </View>

      <TouchableOpacity
        style={style.botaoSalvar}
        onPress={handleSalvar}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={style.textoSalvar}>Salvar alterações</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}