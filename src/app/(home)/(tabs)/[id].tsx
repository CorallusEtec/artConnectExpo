import { Header } from "@/components";
import {
  HeaderPerfil,
  PainelUsuarioPerfil,
  PublicacoesUsuarioPerfil,
} from "@/components/Perfil";
import { PerfilProvider } from "@/contexts";
import {
  useIsFollowingQuery,
  useSeguidaMutation,
} from "@/services/SeguidaService";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { style } from "@/style/pages/profile";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilUsuario() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const usuarioId = Number(id);

  const { data, isLoading } = useUsuarioByIdQuery(usuarioId);
  const { data: isFollowing } = useIsFollowingQuery(usuarioId);
  const seguirMutation = useSeguidaMutation(usuarioId);

  if (isLoading) return <ActivityIndicator />;

  const seguindo = isFollowing ?? false;

  async function handleSeguir() {
    await seguirMutation.mutateAsync();
  }

  return (
    <SafeAreaView style={style.container}>
      <Header />
      <ScrollView >
        <PerfilProvider key={usuarioId} dataInicial={data?.data}>
          <HeaderPerfil />
          <PainelUsuarioPerfil
            acaoBotao={{
              label: seguindo ? "Deixar de seguir" : "Seguir",
              onPress: handleSeguir,
              loading: seguirMutation.isPending,
              buttonColor: seguindo ? "#555" : undefined,
            }}
          />
          <PublicacoesUsuarioPerfil />
        </PerfilProvider>
      </ScrollView>
      </SafeAreaView>
  );
}