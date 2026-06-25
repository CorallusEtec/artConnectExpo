import { Header } from "@/components";
import {
  HeaderPerfil,
  PainelUsuarioPerfil,
  PublicacoesUsuarioPerfil,
} from "@/components/Perfil";
import { PerfilProvider, useAuth } from "@/contexts";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button, TouchableRipple, useTheme } from "react-native-paper";

export default function Perfil() {
  const { getValidateId } = useAuth();
  const { data, isLoading } = useUsuarioByIdQuery(getValidateId());
  const theme = useTheme();
  if (isLoading) return <ActivityIndicator />;

  return (
    <>
      <Header />
      <ScrollView style={style.container}>
        <PerfilProvider
          key={data?.data?.fotoPerfilUrl}
          dataInicial={data?.data}
        >
          {/* Navbar */}
          <HeaderPerfil />

          {/* painel de Informações do usuário */}
          <PainelUsuarioPerfil />

          {/* Botão de Ação */}
          <View style={style.botaoEditContainer}>
            <Button
              mode="contained"
              onPress={() => router.navigate("/edit")}
              style={style.paperButton}
              labelStyle={style.paperButtonLabel}
            >
              Editar ...
            </Button>
          </View>

          {/* Abas/Ícones de Navegação Interna */}
          <View style={style.icons}>
            <TouchableRipple onPress={() => {}}>
              <Ionicons
                name="grid-outline"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <Feather name="bookmark" color={gStyles.cinza[600]} size={24} />
            </TouchableRipple>
          </View>

          {/* Feed */}
          <PublicacoesUsuarioPerfil />
        </PerfilProvider>
      </ScrollView>
    </>
  );
}
