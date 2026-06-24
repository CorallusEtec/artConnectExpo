import { Header } from "@/components";
import {
  HeaderPerfil,
  PainelUsuarioPerfil,
  PublicacoesUsuarioPerfil,
} from "@/components/Perfil";
import { PerfilProvider } from "@/contexts";
import { useIsFollowingQuery, useSeguidaMutation } from "@/services/SeguidaService";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { style } from "@/style/pages/profile";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";

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
    <>
      <Header />
      <ScrollView style={style.container}>
        <PerfilProvider key={usuarioId} dataInicial={data?.data}>
          <HeaderPerfil />
          <PainelUsuarioPerfil />

          <View style={style.botaoEditContainer}>
            <Button
              mode="contained"
              onPress={handleSeguir}
              loading={seguirMutation.isPending}
              disabled={seguirMutation.isPending}
              buttonColor={seguindo ? "#555" : undefined}
              style={style.paperButton}
              labelStyle={style.paperButtonLabel}
            >
              {seguindo ? "Deixar de seguir" : "Seguir"}
            </Button>
          </View>

          <PublicacoesUsuarioPerfil />
        </PerfilProvider>
      </ScrollView>
    </>
  );
}