import { Header } from "@/components";
import {
  HeaderPerfil,
  PainelUsuarioPerfil,
  PublicacoesUsuarioPerfil,
} from "@/components/Perfil";
import { PerfilProvider, useAuth } from "@/contexts";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { style } from "@/style/pages/profile";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Perfil() {
  const { getValidateId } = useAuth();
  const { data, isLoading } = useUsuarioByIdQuery(getValidateId());

  if (isLoading) return <ActivityIndicator />;

  return (
    <>
    <SafeAreaView style={style.container}>
      <Header/>
      <ScrollView>
        <PerfilProvider
          key={data?.data?.fotoPerfilUrl}
          dataInicial={data?.data}
        >
          <HeaderPerfil />
          <PainelUsuarioPerfil
            acaoBotao={{
              label: "Editar perfil",
              onPress: () => router.navigate("/edit"),
            }}
          />
          <PublicacoesUsuarioPerfil />
        </PerfilProvider>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}