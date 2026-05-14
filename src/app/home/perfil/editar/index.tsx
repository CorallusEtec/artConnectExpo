import ArtistaService, { ArtistaEditDTO } from '@/services/ArtistaService';
import { useAuthStore } from '@/store';
import { gStyles } from '@/style/gStyle';
import { FontAwesome6 } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style } from "./style";

export default function EditPerfil() {
  const usuario = useAuthStore((s) => s.usuario);
  const setUsuario = useAuthStore((s) => s.setUsuario);

  const [nome, setNome] = useState('');
  const [textoBio, setTextoBio] = useState('');
  const [contatosText, setContatosText] = useState('');

  const [nomeLog, setNomeLog] = useState('');
  const [numLog, setNumLog] = useState<string>('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!usuario) return;

    setNome(usuario.nome ?? '');
    setTextoBio(usuario.textoBio ?? '');
    setContatosText((usuario.contatos ?? []).map((c: any) => c?.valor ?? c).join(', '));

    setNomeLog(usuario.nomeLog ?? '');
    setNumLog(usuario.numLog ? String(usuario.numLog) : '');
    setCep(usuario.cep ?? '');
    setBairro(usuario.bairro ?? '');
    setComplemento(usuario.complemento ?? '');
    setCidade(usuario.cidade ?? '');
    setUf(usuario.uf ?? '');
  }, [usuario]);

  async function handleSalvar() {
    if (!usuario) {
      router.navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const contatos = contatosText
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map((v) => ({ valor: v }));

      const payload: ArtistaEditDTO = {
        nome: nome,
        textoBio: textoBio,
        contatos: contatos,

        arte: (usuario as any).arte ?? undefined,
        nomeArtistico: (usuario as any).nomeArtistico ?? undefined,
        dataNasc: (usuario as any).dataNasc ?? undefined,
        nomeLog: nomeLog,
        numLog: numLog ? Number(numLog) : undefined,
        cep: cep,
        bairro: bairro,
        complemento: complemento,
        cidade: cidade,
        uf: uf,
      };

      await ArtistaService.edit((usuario as any).id, payload);

      const novoUsuario = { ...(usuario as any), ...payload };
      setUsuario(novoUsuario);

    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
      router.navigate("/home/perfil")
    }
  }

  return (
    <ScrollView style={style.container}>
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => router.navigate('/home')}>
          <FontAwesome6 name="circle-arrow-left" size={35} color={gStyles.azul[200]} />
        </Pressable>
      </View>

      <Text style={style.title}>Editar perfil</Text>

      <View style={style.linhaAvatar}>
        <View style={style.avatarContainer}>
          <Text style={style.iniciaisAvatar}>A</Text>
        </View>
        <TouchableOpacity style={style.editarAvatar}>
          <Feather name="edit-3" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={style.label}>Nome</Text>
      <TextInput style={style.input} placeholder="Nome completo" placeholderTextColor={gStyles.cinza[500]} value={nome} onChangeText={setNome} />

      <Text style={style.label}>Biografia</Text>
      <TextInput style={[style.input, style.textarea]} placeholder="Fale sobre você" placeholderTextColor={gStyles.cinza[500]} multiline value={textoBio} onChangeText={setTextoBio} />

      <Text style={style.label}>Contatos</Text>
      <TextInput style={style.input} placeholder="Telefone, e-mail ou redes" placeholderTextColor={gStyles.cinza[500]} value={contatosText} onChangeText={setContatosText} />

      <Text style={style.label}>Logradouro</Text>
      <TextInput style={style.input} placeholder="Nome do logradouro" placeholderTextColor={gStyles.cinza[500]} value={nomeLog} onChangeText={setNomeLog} />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Text style={style.label}>Número</Text>
          <TextInput style={style.input} placeholder="Número" placeholderTextColor={gStyles.cinza[500]} keyboardType="numeric" value={numLog} onChangeText={setNumLog} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={style.label}>CEP</Text>
          <TextInput style={style.input} placeholder="CEP" placeholderTextColor={gStyles.cinza[500]} keyboardType="numeric" value={cep} onChangeText={setCep} />
        </View>
      </View>

      <Text style={style.label}>Bairro</Text>
      <TextInput style={style.input} placeholder="Bairro" placeholderTextColor={gStyles.cinza[500]} value={bairro} onChangeText={setBairro} />

      <Text style={style.label}>Complemento</Text>
      <TextInput style={style.input} placeholder="Complemento" placeholderTextColor={gStyles.cinza[500]} value={complemento} onChangeText={setComplemento} />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Text style={style.label}>Cidade</Text>
          <TextInput style={style.input} placeholder="Cidade" placeholderTextColor={gStyles.cinza[500]} value={cidade} onChangeText={setCidade} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={style.label}>UF</Text>
          <TextInput style={style.input} placeholder="UF" placeholderTextColor={gStyles.cinza[500]} value={uf} onChangeText={setUf} />
        </View>
      </View>

      <Pressable style={style.botaoSalvar} onPress={handleSalvar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={style.textoSalvar}>Salvar alterações</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
