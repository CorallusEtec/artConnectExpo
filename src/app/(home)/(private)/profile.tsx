import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Appbar, Avatar, Button, Text, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";

import { Post } from "@/components/Post";
import { Reacao } from "@/components/Reacao";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/(home)/(private)/profile";
import { usePerfil } from "../../../hooks/userPerfil";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function Perfil() {
  const { usuario, publicacoes, loading } = usePerfil();

  if (loading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={gStyles.azul[500]} />
      </View>
    );
  }

  return (
    <View style={style.container}>
      {/* Navbar */}
      <Appbar.Header style={style.navbarMom} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" color="white" size={30} onPress={() => router.back()} />
        <Appbar.Content title="" />
        <Appbar.Action icon="send" color="white" size={25} onPress={() => {}} />
        <Appbar.Action icon="menu" color="white" size={30} onPress={() => {}} />
      </Appbar.Header>

      {/* Painel de Informações do Usuário */}
      <View style={style.fundo}>
        <View style={style.headerRow}>
          <View style={style.profile}>
            <Avatar.Image size={92} source={require("@/assets/template/avatar.png")} />
          </View>

          <View style={style.infosProfile}>
            <View style={style.infoDuo}>
              <Text variant="bodyLarge" style={style.infoLabel}>Posts</Text>
              <Text variant="titleMedium" style={style.infoValue}>{publicacoes.length}</Text>
            </View>
          
            <TouchableRipple onPress={() => {}} rippleColor="rgba(255, 255, 255, .2)">
              <View style={style.infoDuo}>
                <Text variant="bodyLarge" style={style.infoLabel}>Seguidores</Text>
                <Text variant="titleMedium" style={style.infoValue}>0</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple onPress={() => {}} rippleColor="rgba(255, 255, 255, .2)">
              <View style={style.infoDuo}>
                <Text variant="bodyLarge" style={style.infoLabel}>Seguindo</Text>
                <Text variant="titleMedium" style={style.infoValue}>0</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>

        <View style={style.bioContainer}>
          <Text variant="bodyMedium" style={style.bioText}>
            {usuario?.textoBio ?? "Sem biografia."}
          </Text>
        </View>
      </View>

      {/* Botão de Ação */}
      <View style={style.botaoEdit}>
        <Button
          mode="contained"
          onPress={() => router.navigate("/home/perfil/editar")}
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
      <View style={style.posts}>
        <FlatList
          data={publicacoes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Post.root>
              <Post.header
                nomePerfil={item.autor?.nome ?? "Usuário"}
                dataPublicacao={new Date(item.dataPublicacao)}
              >
                <Post.headerActions>
                  <Button mode="text" compact>Seguir</Button>
                </Post.headerActions>
              </Post.header>

              <Post.legend data={item.legenda} />
              {item.urlMidia && <Post.image url={item.urlMidia} />}

              <Post.actions>
                <Reacao insight={0}>
                  <FontAwesome name="heart-o" size={24} color={gStyles.vermelho[400]} />
                </Reacao>
                <Reacao insight={0}>
                  <Feather name="message-circle" size={24} color={gStyles.cinza[600]} />
                </Reacao>
              </Post.actions>
            </Post.root>
          )}
        />
      </View>
    </View>
  );
}