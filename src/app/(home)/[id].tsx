import { Header } from "@/components";
import {
  HeaderPerfil,
  PainelUsuarioPerfil,
  PublicacoesUsuarioPerfil,
} from "@/components/Perfil";
import { PerfilProvider } from "@/contexts";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { style } from "@/style/pages/profile";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";

export default function PerfilUsuario() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const usuarioId = Number(id);

  const { data, isLoading } = useUsuarioByIdQuery(usuarioId);

  const [seguindo, setSeguindo] = useState(false);

  if (isLoading) return <ActivityIndicator />;

  return (
    <>
      <Header />
      <ScrollView style={style.container}>
        <PerfilProvider key={usuarioId} dataInicial={data?.data}>
          {/* Navbar */}
          <HeaderPerfil />

          {/* painel de Informações do usuário */}
          <PainelUsuarioPerfil />

          {/* Botão de Ação */}
          <View style={style.botaoEditContainer}>
            <Button
              mode={seguindo ? "outlined" : "contained"}
              onPress={() => setSeguindo((prev) => !prev)}
              style={style.paperButton}
              labelStyle={style.paperButtonLabel}
            >
              {seguindo ? "Deixar de seguir" : "Seguir"}
            </Button>
          </View>

          {/* Feed */}
          <PublicacoesUsuarioPerfil />
        </PerfilProvider>
      </ScrollView>
    </>
  );
}