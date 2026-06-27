import { FontAwesome6 } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";

import { useArteGenero } from "./useArteGenero";
import { useContatos } from "./useContatos";
import { useFotoPerfil } from "./useFotoPerfil";
import { usePerfilData } from "./usePerfilData";
import { useSalvarPerfil } from "./useSalvarPerfil";
import { PerfilFormData, perfilSchema } from "./validation";

import { AlertMessage } from "@/components/AlertMessage";
import { useAuth } from "@/contexts";
import { TipoContato } from "@/models/enumeration/TipoContato";
import { ArteGeneroFields } from "../ArteField";
import { AvatarEditor } from "../AvatarEditor";
import ContatoInput from "../ContatoInput";
import { style } from "../edit";
import { EnderecoFields } from "../EnderecoFields";
import { FormField } from "../FormField";

export function EditPerfilForm() {
  const theme = useTheme();
  const { getValidateId } = useAuth();

  const { loading, user, tipoUsuario, obterToken } = usePerfilData();

  const { control, handleSubmit, formState: { isDirty } } = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    values: {
      nome: user?.nome || "",
      textoBio: user?.textoBio || "",
      nomeLog: user?.nomeLog || "",
      numLog: user?.numLog ? String(user.numLog) : "",
      cep: user?.cep || "",
      bairro: user?.bairro || "",
      complemento: user?.complemento || "",
      cidade: user?.cidade || "",
      uf: user?.uf || "",
      razaoSocial: (user as any)?.razaoSocial || "",
    },
  });

  const foto = useFotoPerfil(user?.fotoPerfilUrl ?? null);

  const contatosIniciais = useMemo(() => user?.contatos || [], [user]);
  const contatos = useContatos(contatosIniciais);

  const arteId = useMemo(() => (user as any)?.arte?.id ?? null, [user]);
  const generosIds = useMemo(
    () => (user as any)?.generosArte?.map((g: any) => g.id) ?? [],
    [user]
  );
  const arteGenero = useArteGenero(arteId, generosIds);

  const salvar = useSalvarPerfil(tipoUsuario, obterToken, getValidateId);

  const todosContatos = [
    ...contatos.contatosTelefone,
    ...contatos.contatosInstagram,
    ...contatos.contatosTelegram,
    ...contatos.contatosEmail,
  ];

  const onSubmit = (data: PerfilFormData) => {
    salvar.handleSalvar(
      data,
      todosContatos,
      arteGenero.arteSelecionada,
      arteGenero.generosSelecionados
    );
  };

  function handleConfirmarDialog() {
    salvar.fecharDialog();
    router.navigate("/perfil");
  }

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <>
      <ScrollView>
        <TouchableOpacity onPress={() => router.navigate("/perfil")}>
          <FontAwesome6
            name="circle-arrow-left"
            size={35}
            color={theme.colors.primary}
          />
        </TouchableOpacity>

        <Text style={[style.title, { color: theme.colors.primary }]}>
          Editar perfil
        </Text>

        <AvatarEditor
          nome={user?.nome || ""}
          fotoUri={foto.fotoUri}
          uploading={foto.uploading}
          onAlterar={foto.handleAlterarFoto}
        />

        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormField
              label="Nome"
              placeholder="Nome completo"
              value={value}
              onChangeText={onChange}
              error={error?.message}
            />
          )}
        />

        {tipoUsuario === "contratante" && (
          <Controller
            control={control}
            name="razaoSocial"
            render={({ field: { onChange, value } }) => (
              <FormField
                label="Razão Social"
                placeholder="Razão social"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        )}

        <Controller
          control={control}
          name="textoBio"
          render={({ field: { onChange, value } }) => (
            <FormField
              label="Biografia"
              placeholder="Fale sobre você"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {tipoUsuario === "artista" && (
          <ArteGeneroFields
            tiposArte={arteGenero.tiposArte}
            arteSelecionada={arteGenero.arteSelecionada}
            onSelecionarArte={arteGenero.handleSelecionarArte}
            generosArte={arteGenero.generosArte}
            carregandoGeneros={arteGenero.carregandoGeneros}
            generosSelecionados={arteGenero.generosSelecionados}
            onToggleGenero={arteGenero.handleToggleGenero}
          />
        )}

        <ContatoInput
          titulo="Email"
          valorInicial={contatos.contatosEmail}
          tipo={TipoContato.EMAIL}
          placeholder="seuemail@exemplo.com"
          onRemover={() => {}}
        />

        <ContatoInput
          titulo="Telegram"
          valorInicial={contatos.contatosTelegram}
          tipo={TipoContato.TELEGRAM}
          placeholder="Digite seu usuário do Telegram"
          onRemover={() => {}}
        />

        <ContatoInput
          titulo="Instagram"
          valorInicial={contatos.contatosInstagram}
          tipo={TipoContato.INSTAGRAM}
          placeholder="Digite seu instagram"
          onRemover={() => {}}
        />

        <ContatoInput
          titulo="Telefone"
          valorInicial={contatos.contatosTelefone}
          tipo={TipoContato.TELEFONE}
          placeholder="(00) 00000-0000"
          onRemover={() => {}}
        />

        <EnderecoFields control={control} />

        <TouchableOpacity
          style={[style.botaoSalvar, { backgroundColor: theme.colors.primary }]}
          onPress={handleSubmit(onSubmit)}
          disabled={salvar.saving || !isDirty}
        >
          {salvar.saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={style.textoSalvar}>Salvar alterações</Text>
          )}
        </TouchableOpacity>

        {foto.error && <AlertMessage visible text={foto.error} onDismiss={() => {}} />}
        {salvar.error && <AlertMessage visible text={salvar.error} onDismiss={() => {}} />}
      </ScrollView>

      <Portal>
        <Dialog visible={salvar.dialog} onDismiss={handleConfirmarDialog}>
          <Dialog.Title>Perfil atualizado</Dialog.Title>
          <Dialog.Content>
            <Text>Suas alterações foram salvas com sucesso!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirmarDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}