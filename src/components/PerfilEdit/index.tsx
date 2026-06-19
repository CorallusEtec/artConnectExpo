import { gStyles } from "@/style/gStyle";
import { style } from "./edit";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { AlertMessage } from "@/components/AlertMessage";
import { AvatarEditor } from "./AvatarEditor";
import { EnderecoFields } from "./EnderecoFields";
import { FormField } from "./FormField";
import { useEditPerfil } from "./useEditPerfil";
import ContatoInput from "./ContatoInput";

export default function EditPerfil() {
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
    contatosWhatsapp,
    setContatosWhatsapp,
    contatosInstagram,
    setContatosInstagram,
    handleRemoverContatoWhatsapp,
    handleRemoverContatoInstagram,
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
        <FontAwesome6 name="circle-arrow-left" size={35} color={gStyles.azul[200]} />
      </TouchableOpacity>

      <Text style={style.title}>Editar perfil</Text>

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

      <ContatoInput
        titulo="WhatsApp"
        valorInicial={contatosWhatsapp}
        tipo={1}
        placeholder="(00) 00000-0000"
        onChange={setContatosWhatsapp}
        onRemover={handleRemoverContatoWhatsapp}
      />

      <ContatoInput
        titulo="Instagram"
        valorInicial={contatosInstagram}
        tipo={2}
        placeholder="Digite seu instagram"
        onChange={setContatosInstagram}
        onRemover={handleRemoverContatoInstagram}
      />

      <EnderecoFields form={form} onChange={alterarCampo} />

      <TouchableOpacity style={style.botaoSalvar} onPress={handleSalvar} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={style.textoSalvar}>Salvar alterações</Text>}
      </TouchableOpacity>

      <AlertMessage {...alert} />
    </ScrollView>
  );
}