import ArtistaService, { ArtistaEditDTO } from "@/services/ArtistaService";
import ContatoService, { ContatoEditDTO, ContatoSaveDTO } from "@/services/ContatoService";
import UsuarioService from "@/services/UsuarioService";
import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import { FontAwesome6 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import masks from "@/services/masks";
import ContatoInput from "@/components/ContatoInput";
import { Contato } from "@/components/ContatoInput/types";

function mapearContatos(contatos: any[], tipo: number) {
  if (!contatos) return [];

  return contatos
    .filter((c: any) => c.tipoContato?.idTipoContato === tipo)
    .map((c): Contato => ({
      id: c.idContato,
      valor: c.valorContato || "",
      tipo,
    }));
}

export default function EditPerfil() {
  const usuario = useAuthStore(state => state.usuario);
  const setUsuario = useAuthStore(state => state.setUsuario);

  const user = usuario as any;
  const placeholder = gStyles.cinza[500];

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: user?.nome || "",
    textoBio: user?.textoBio || "",
    nomeLog: user?.nomeLog || "",
    numLog: user?.numLog ? String(user.numLog) : "",
    cep: user?.cep || "",
    bairro: user?.bairro || "",
    complemento: user?.complemento || "",
    cidade: user?.cidade || "",
    uf: user?.uf || "",
  });

  const [contatosWhatsapp, setContatosWhatsapp] = useState(mapearContatos(user?.contatos, 1));
  const [contatosInstagram, setContatosInstagram] = useState(mapearContatos(user?.contatos, 2));
  
  useEffect(() => {
    if (!usuario) return;

    async function carregarDados() {
      try {
        if(!usuario) {
          return;
        }
        const dados = await UsuarioService.getById(usuario.id);

        setForm({
          nome: dados.nome || "",
          textoBio: dados.textoBio || "",
          nomeLog: dados.nomeLog || "",
          numLog: dados.numLog ? String(dados.numLog) : "",
          cep: dados.cep || "",
          bairro: dados.bairro || "",
          complemento: dados.complemento || "",
          cidade: dados.cidade || "",
          uf: dados.uf || "",
        });

        setContatosWhatsapp(mapearContatos(dados.contatos, 1));
        setContatosInstagram(mapearContatos(dados.contatos, 2));
      } catch (error) {
        console.log(error);
      }
    }

    carregarDados();
  }, [usuario]);

  function alterarCampo(campo: string, valor: string) {
    setForm(prev => ({ ...prev, [campo]: valor }));
  }

  async function handleSalvar() {
  try {
    setLoading(true);

    const tokenData = await AsyncStorage.getItem("@artconnect:token");

    if (!tokenData) {
      return router.navigate("/login");
    }

    const parsed = JSON.parse(tokenData);

    const userId = parsed?.id;

    if (!userId || isNaN(userId)) {
      console.log("ID inválido no token:", parsed);
      return router.navigate("/login");
    }

    const payload: ArtistaEditDTO = {
      nome: form.nome,
      textoBio: form.textoBio,
      arte: user.arte,
      nomeArtistico: user.nomeArtistico,
      dataNasc: user.dataNasc,
      nomeLog: form.nomeLog,
      numLog: form.numLog ? Number(form.numLog) : undefined,
      cep: form.cep,
      bairro: form.bairro,
      complemento: form.complemento,
      cidade: form.cidade,
      uf: form.uf,
    };

    await ArtistaService.edit(userId, payload);

    const contatos = [...contatosWhatsapp, ...contatosInstagram]
      .filter(c => c.valor.trim());

    for (const contato of contatos) {
      if (contato.id) {
        const editPayload: ContatoEditDTO = {
          valorContato: contato.valor,
        };
        await ContatoService.edit(contato.id, editPayload);
      } else {
        const savePayload: ContatoSaveDTO = {
          valorContato: contato.valor,
          idUsuario: userId,
          idTipoContato: contato.tipo,
        };

        await ContatoService.save(savePayload);
      }
    }

    const dados = await UsuarioService.getById(userId);

    setUsuario({
      ...user,
      nome: dados.nome,
      textoBio: dados.textoBio,
      nomeLog: dados.nomeLog,
      numLog: dados.numLog,
      cep: dados.cep,
      bairro: dados.bairro,
      complemento: dados.complemento,
      cidade: dados.cidade,
      uf: dados.uf,
      contatos: dados.contatos || [],
    });

    router.navigate("/home/perfil");
  } catch (error) {
    console.log("Erro ao salvar perfil:", error);
  } finally {
    setLoading(false);
  }
}
  return (
    <ScrollView style={style.container}>
      <TouchableOpacity onPress={() => router.navigate("/home")}>
        <FontAwesome6 name="circle-arrow-left" size={35} color={gStyles.azul[200]} />
      </TouchableOpacity>

      <Text style={style.title}>Editar perfil</Text>

      <View style={style.linhaAvatar}>
        <View style={style.avatarContainer}>
          <Image source={require("@/assets/template/avatar.png")} style={style.headerProfile} />
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
        onChangeText={text => alterarCampo("nome", text)}
      />

      <Text style={style.label}>Biografia</Text>
      <TextInput
        style={[style.input, style.textarea]}
        placeholder="Fale sobre você"
        placeholderTextColor={placeholder}
        multiline
        value={form.textoBio}
        onChangeText={text => alterarCampo("textoBio", text)}
      />

<ContatoInput
  titulo="WhatsApp"
  lista={contatosWhatsapp}
  setLista={setContatosWhatsapp}
  tipo={1}
  placeholder="(00) 00000-0000"
  maskFn={masks.telefone}
  onMaskChange={masks.handleTelefone}/>  
    
<ContatoInput
  titulo="Instagram"
  lista={contatosInstagram}
  setLista={setContatosInstagram}
  tipo={2}
  placeholder="Digite seu instagram"/>
      <Text style={style.label}>Logradouro</Text>
      <TextInput
        style={style.input}
        placeholder="Nome do logradouro"
        placeholderTextColor={placeholder}
        value={form.nomeLog}
        onChangeText={text => alterarCampo("nomeLog", text)}
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
            onChangeText={text => alterarCampo("numLog", text)}
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
            onChangeText={text => alterarCampo("cep", text)}
          />
        </View>
      </View>

      <Text style={style.label}>Bairro</Text>
      <TextInput
        style={style.input}
        placeholder="Bairro"
        placeholderTextColor={placeholder}
        value={form.bairro}
        onChangeText={text => alterarCampo("bairro", text)}
      />

      <Text style={style.label}>Complemento</Text>
      <TextInput
        style={style.input}
        placeholder="Complemento"
        placeholderTextColor={placeholder}
        value={form.complemento}
        onChangeText={text => alterarCampo("complemento", text)}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Text style={style.label}>Cidade</Text>

          <TextInput
            style={style.input}
            placeholder="Cidade"
            placeholderTextColor={placeholder}
            value={form.cidade}
            onChangeText={text => alterarCampo("cidade", text)}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={style.label}>UF</Text>

          <TextInput
            style={style.input}
            placeholder="UF"
            placeholderTextColor={placeholder}
            value={form.uf}
            onChangeText={text => alterarCampo("uf", text)}
          />
        </View>
      </View>

      <TouchableOpacity style={style.botaoSalvar} onPress={handleSalvar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={style.textoSalvar}>Salvar alterações</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}