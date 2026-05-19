import ArtistaService, { ArtistaEditDTO } from "@/services/ArtistaService";
import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";

import { style } from "./style";

export default function EditPerfil() {
  const usuario = useAuthStore((state) => state.usuario);
  const setUsuario = useAuthStore((state) => state.setUsuario);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    textoBio: "",
    contatos: "",

    nomeLog: "",
    numLog: "",
    cep: "",
    bairro: "",
    complemento: "",
    cidade: "",
    uf: "",
  });

  useEffect(() => {
    if (!usuario) return;

    setForm({
      nome: usuario.nome || "",
      textoBio: usuario.textoBio || "",
      contatos: (usuario.contatos || [])
        .map((c: any) => c.valor || c)
        .join(", "),

      nomeLog: usuario.nomeLog || "",
      numLog: usuario.numLog ? String(usuario.numLog) : "",
      cep: usuario.cep || "",
      bairro: usuario.bairro || "",
      complemento: usuario.complemento || "",
      cidade: usuario.cidade || "",
      uf: usuario.uf || "",
    });
  }, [usuario]);

  function alterarCampo(campo: string, valor: string) {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  async function handleSalvar() {
    if (!usuario) {
      router.navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const payload: ArtistaEditDTO = {
        nome: form.nome,
        textoBio: form.textoBio,

        contatos: form.contatos
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
          .map((valor) => ({ valor })),

        arte: (usuario as any).arte,
        nomeArtistico: (usuario as any).nomeArtistico,
        dataNasc: (usuario as any).dataNasc,

        nomeLog: form.nomeLog,
        numLog: form.numLog ? Number(form.numLog) : undefined,
        cep: form.cep,
        bairro: form.bairro,
        complemento: form.complemento,
        cidade: form.cidade,
        uf: form.uf,
      };

      await ArtistaService.edit((usuario as any).id, payload);

      setUsuario({
        ...(usuario as any),
        ...payload,
      });

      router.navigate("/home/perfil");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={style.container}>
      <Pressable onPress={() => router.navigate("/home")}>
        <FontAwesome6
          name="circle-arrow-left"
          size={35}
          color={gStyles.azul[200]}
        />
      </Pressable>

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
        placeholderTextColor={gStyles.cinza[500]}
        value={form.nome}
        onChangeText={(text) => alterarCampo("nome", text)}
      />

      <Text style={style.label}>Biografia</Text>
      <TextInput
        style={[style.input, style.textarea]}
        placeholder="Fale sobre você"
        placeholderTextColor={gStyles.cinza[500]}
        multiline
        value={form.textoBio}
        onChangeText={(text) => alterarCampo("textoBio", text)}
      />

      <Text style={style.label}>Contatos</Text>
      <TextInput
        style={style.input}
        placeholder="Telefone, email ou redes"
        placeholderTextColor={gStyles.cinza[500]}
        value={form.contatos}
        onChangeText={(text) => alterarCampo("contatos", text)}
      />

      <Text style={style.label}>Logradouro</Text>
      <TextInput
        style={style.input}
        placeholder="Nome do logradouro"
        placeholderTextColor={gStyles.cinza[500]}
        value={form.nomeLog}
        onChangeText={(text) => alterarCampo("nomeLog", text)}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Text style={style.label}>Número</Text>

          <TextInput
            style={style.input}
            placeholder="Número"
            placeholderTextColor={gStyles.cinza[500]}
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
            placeholderTextColor={gStyles.cinza[500]}
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
        placeholderTextColor={gStyles.cinza[500]}
        value={form.bairro}
        onChangeText={(text) => alterarCampo("bairro", text)}
      />

      <Text style={style.label}>Complemento</Text>

      <TextInput
        style={style.input}
        placeholder="Complemento"
        placeholderTextColor={gStyles.cinza[500]}
        value={form.complemento}
        onChangeText={(text) => alterarCampo("complemento", text)}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Text style={style.label}>Cidade</Text>

          <TextInput
            style={style.input}
            placeholder="Cidade"
            placeholderTextColor={gStyles.cinza[500]}
            value={form.cidade}
            onChangeText={(text) => alterarCampo("cidade", text)}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={style.label}>UF</Text>

          <TextInput
            style={style.input}
            placeholder="UF"
            placeholderTextColor={gStyles.cinza[500]}
            value={form.uf}
            onChangeText={(text) => alterarCampo("uf", text)}
          />
        </View>
      </View>

      <Pressable
        style={style.botaoSalvar}
        onPress={handleSalvar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={style.textoSalvar}>Salvar alterações</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}