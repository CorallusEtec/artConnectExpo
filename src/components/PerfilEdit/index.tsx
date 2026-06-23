import { style } from "./edit";
import { useDynamicThemeStyles } from "@/style/useDynamicThemeStyles";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { AlertMessage } from "@/components/AlertMessage";
import { AvatarEditor } from "./AvatarEditor";
import { EnderecoFields } from "./EnderecoFields";
import { FormField } from "./FormField";
import { useEditPerfil } from "./useEditPerfil";
import ContatoInput from "./ContatoInput";
import { TipoContato } from "@/models/enumeration/TipoContato";
import { ArteGeneroFields } from "./ArteField";

export default function EditPerfil() {
  const theme = useTheme();
  const dynamic = useDynamicThemeStyles();
  const {
    loading,
    saving,
    tipoUsuario,
    fotoUri,
    uploadingFoto,
    form,
    alterarCampo,
    handleAlterarFoto,
    handleSalvar,
    //-----
    tiposArte,
    arteSelecionada,
    handleSelecionarArte,
    generosArte,
    carregandoGeneros,
    generosSelecionados,
    handleToggleGenero,
    //-----
    contatosEmail,
    setContatosEmail,
    contatosTelegram,
    setContatosTelegram,
    contatosInstagram,
    setContatosInstagram,
    contatosTelefone,
    setContatosTelefone,
    //--------
    handleRemoverContatoTelefone,
    handleRemoverContatoInstagram,
    handleRemoverContatoEmail,
    handleRemoverContatoTelegram,
    //---------
    alert,
    dialog,
  } = useEditPerfil();

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={style.container}>
      <Portal>
        <Dialog visible={dialog.visible}>
          <Dialog.Title>Perfil</Dialog.Title>
          <Dialog.Content>
            <Text>{dialog.text}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dialog.onConfirm}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome6 name="circle-arrow-left" size={35} color={theme.colors.primary} />
      </TouchableOpacity>

      <Text style={[style.title, dynamic.textPrimary]}>Editar perfil</Text>

      <AvatarEditor fotoUri={fotoUri} uploading={uploadingFoto} onAlterar={handleAlterarFoto} />

      <FormField
        label="Nome"
        placeholder="Nome completo"
        value={form.nome}
        onChangeText={(text) => alterarCampo("nome", text)}
      />

      {tipoUsuario === "contratante" && (
        <FormField
          label="Razão Social"
          placeholder="Razão social"
          value={form.razaoSocial}
          onChangeText={(text) => alterarCampo("razaoSocial", text)}
        />
      )}

      <FormField
        label="Biografia"
        placeholder="Fale sobre você"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={form.textoBio}
        onChangeText={(text) => alterarCampo("textoBio", text)}
      />

      {tipoUsuario === "artista" && (
        <ArteGeneroFields
          tiposArte={tiposArte}
          arteSelecionada={arteSelecionada}
          onSelecionarArte={handleSelecionarArte}
          generosArte={generosArte}
          carregandoGeneros={carregandoGeneros}
          generosSelecionados={generosSelecionados}
          onToggleGenero={handleToggleGenero}
        />
      )}

      <ContatoInput
        titulo="Email"
        valorInicial={contatosEmail}
        tipo={TipoContato.EMAIL}
        placeholder="seuemail@exemplo.com"
        onChange={setContatosEmail}
        onRemover={handleRemoverContatoEmail}
      />

      <ContatoInput
        titulo="Telegram"
        valorInicial={contatosTelegram}
        tipo={TipoContato.TELEGRAM}
        placeholder="Digite seu usuário do Telegram"
        onChange={setContatosTelegram}
        onRemover={handleRemoverContatoTelegram}
      />

      <ContatoInput
        titulo="Instagram"
        valorInicial={contatosInstagram}
        tipo={TipoContato.INSTAGRAM}
        placeholder="Digite seu instagram"
        onChange={setContatosInstagram}
        onRemover={handleRemoverContatoInstagram}
      />

      <ContatoInput
        titulo="Telefone"
        valorInicial={contatosTelefone}
        tipo={TipoContato.TELEFONE}
        placeholder="(00) 00000-0000"
        onChange={setContatosTelefone}
        onRemover={handleRemoverContatoTelefone}
     />

      <EnderecoFields form={form} onChange={alterarCampo} />

      <TouchableOpacity style={[style.botaoSalvar, dynamic.bgPrimary]} onPress={handleSalvar} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={style.textoSalvar}>Salvar alterações</Text>}
      </TouchableOpacity>

      <AlertMessage {...alert} />
    </ScrollView>
  );
}