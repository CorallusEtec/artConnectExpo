import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import ArtistaService, { ArtistaEditDTO } from "@/services/ArtistaService";
import UsuarioService from "@/services/UsuarioService";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/(home)/(private)/edit";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const placeholder = "#888";

export default function EditPerfil() {
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
  });

  useEffect(() => {
    async function carregar() {
      try {
        const tk = await AsyncStorage.getItem("@artconnect:token");
        if (!tk) return router.navigate("/login");

        const tokenParse: AuthLoginResponse = JSON.parse(tk);
        const model: UsuarioResponse = await UsuarioService.findById(
          tokenParse.id,
          tokenParse.token
        );
        setUser(model);

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
        });
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  function alterarCampo(campo: keyof typeof form, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSalvar() {
    if (!user) return;

    try {
      setSaving(true);

      const tokenData = await AsyncStorage.getItem("@artconnect:token");
      if (!tokenData) return router.navigate("/login");

      const tokenParse: AuthLoginResponse = JSON.parse(tokenData);

      // Monta o payload APENAS com os campos que foram preenchidos
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

      // Remove campos undefined para não enviar dados vazios
      Object.keys(payload).forEach(key => {
        if (payload[key as keyof ArtistaEditDTO] === undefined) {
          delete payload[key as keyof ArtistaEditDTO];
        }
      });

      await ArtistaService.edit(tokenParse.token, payload);
      
      router.navigate("/profile");
    } catch (error: any) {
      console.error("Erro detalhado ao salvar:", error);
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
          <Image
            source={require("@/assets/template/avatar.png")}
            style={style.headerProfile}
          />
        </View>
        <TouchableOpacity style={style.editarAvatar}>
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