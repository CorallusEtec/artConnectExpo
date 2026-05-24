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

interface Contato {
  id?: number;
  valor: string;
  tipo: number;
}

function mapearContatos(contatos: any[], tipo: number) {
  if (!contatos) return [];

  return contatos
    .filter((c: any) => c.tipoContato?.idTipoContato === tipo)
    .map((c: any) => ({
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

  function adicionarContato(setLista: any, tipo: number) {
    setLista((prev: Contato[]) => [...prev, { valor: "", tipo }]);
  }

  function atualizarContato(lista: Contato[], setLista: any, index: number, valor: string) {
    setLista(lista.map((c, i) => i === index ? { ...c, valor } : c));
  }

  function removerContato(lista: Contato[], setLista: any, index: number) {
    const contato = lista[index];

    if (contato.id) {
      ContatoService.delete(contato.id).catch(console.log);
    }

    setLista(lista.filter((_, i) => i !== index));
  }

  async function handleSalvar() {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("@artconnect:token");

      if (!token) return router.navigate("/login");

      const userId = parseInt(token);

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

      const contatos = [...contatosWhatsapp, ...contatosInstagram].filter(c => c.valor.trim());

      for (const contato of contatos) {
        if (contato.id) {
          const editPayload: ContatoEditDTO = { valorContato: contato.valor };
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function renderContatos(titulo: string, lista: Contato[], setLista: any, tipo: number, texto: string) {
    return (
    <View style={{ marginTop: 16 }}>
      <Text style={style.label}>{titulo}</Text>

      {lista.map((contato, index) => (
        <View key={index} style={style.contatoRow}>
          <TextInput
            style={[style.input, style.contatoInput]}
            placeholder={texto}
            placeholderTextColor={placeholder}
            value={contato.valor}
            onChangeText={text =>
              atualizarContato(lista, setLista, index, text)
            }
          />

          <TouchableOpacity onPress={() =>removerContato(lista, setLista, index)}>
            <Feather name="trash-2" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[style.input,style.botaoAdicionarContato]}
        onPress={() =>adicionarContato(setLista, tipo)}>
        <Text style={style.textoAdicionarContato}> + Adicionar </Text>
      </TouchableOpacity>
    </View>
  );
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

      {renderContatos("WhatsApp", contatosWhatsapp, setContatosWhatsapp, 1, "Digite seu WhatsApp")}
      {renderContatos("Instagram", contatosInstagram, setContatosInstagram, 2, "Digite seu instagram")}

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