import { ModalSettings } from "@/components/ModalSettings";
import { Publicacao } from "@/components/Publicacao";
import { useAuth } from "@/contexts/AuthContext";
import { PublicacaoPerfilProvider } from "@/contexts/PublicacaoPerfilContext";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/(home)/(private)/profile";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Text,
  TouchableRipple,
} from "react-native-paper";

export default function Perfil() {
  //const { usuario, publicacoes, loading } = usePerfil();
  const { isAuth, token } = useAuth();
  const [modal, setModal] = useState(false);
  let id!: number;
  if (token) {
    id = token.id;
  }

  const { data, isPending } = useUsuarioByIdQuery(id);

  if (isPending) return <ActivityIndicator />;

  console.log(data?.data);
  return (
    <View style={style.container}>
      {/* Modal de configurações do aplicativo */}
      <ModalSettings modal={modal} setModal={setModal} />

      {/* Navbar */}

      <Appbar.Header style={style.navbar} statusBarHeight={0}>
        <Appbar.Action
          icon="arrow-left"
          size={34}
          onPress={router.back}
          color="white"
        />
        <Appbar.Content titleStyle={{ color: "white" }} title="Seu Perfil" />
        <Appbar.Action
          onPress={() => setModal(true)}
          icon="cog"
          color="white"
          size={30}
        />
      </Appbar.Header>

      {/* painel de Informações do usuário */}
      <View style={style.fundo}>
        <View style={style.headerRow}>
          <View style={style.profile}>
            <Avatar.Image
              size={92}
              source={require("@/assets/template/avatar.png")}
            />
            <Text style={style.infoLabel}>{data?.data.nome}</Text>
          </View>
          <View style={style.infosProfile}>
            <View style={style.infoDuo}>
              <Text variant="bodyLarge" style={style.infoLabel}>
                Posts
              </Text>
              <Text variant="titleMedium" style={style.infoValue}>
                {data?.data.publicacaoes != undefined
                  ? data.data.publicacaoes.length
                  : "0"}
              </Text>
            </View>

            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(255, 255, 255, .2)"
            >
              <View style={style.infoDuo}>
                <Text variant="bodyLarge" style={style.infoLabel}>
                  Seguidores
                </Text>
                <Text variant="titleMedium" style={style.infoValue}>
                  0
                </Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(255, 255, 255, .2)"
            >
              <View style={style.infoDuo}>
                <Text variant="bodyLarge" style={style.infoLabel}>
                  Seguindo
                </Text>
                <Text variant="titleMedium" style={style.infoValue}>
                  0
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </View>

        <View style={style.bioContainer}>
          <Text variant="bodyMedium" style={style.bioText}>
            {data?.data.textoBio || "Sem biografia"}
          </Text>
        </View>
      </View>

      {/* Botão de Ação */}
      <View style={style.botaoEdit}>
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
      <View style={style.posts}>
        <FlatList
          data={data?.data.publicacaoes}
          renderItem={({ item }) => (
            <PublicacaoPerfilProvider dadosPubli={item}>
              <Publicacao />
            </PublicacaoPerfilProvider>
          )}
        />
      </View>
    </View>
  );
}
