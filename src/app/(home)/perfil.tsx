import { ModalSettings } from "@/components/ModalSettings";
import { HeaderPerfil, PainelUsuarioPerfil, PublicacoesUsuarioPerfil } from "@/components/Perfil";
import { PerfilProvider, useAuth } from "@/contexts";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/(home)/(private)/profile";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";

export default function Perfil() {
  const { getValidateId } = useAuth();
  const { data, isLoading } = useUsuarioByIdQuery(getValidateId());

  if (isLoading) return <ActivityIndicator />;

  return (
    <ScrollView style={style.container}>
      <PerfilProvider key={getValidateId()} dataInicial={data?.data}>
        {/* Modal de configurações do aplicativo */}
        <ModalSettings />

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
            <Feather name="camera" color={gStyles.cinza[600]} size={32.5} />
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <Feather name="bookmark" color={gStyles.cinza[600]} size={35} />
          </TouchableRipple>
        </View>

        {/* Feed */}
        <PublicacoesUsuarioPerfil />
      </PerfilProvider>
    </ScrollView>
  );
}
