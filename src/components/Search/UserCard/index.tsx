import { gStyles } from "@/style/gStyle";
import React from "react";
import { View } from "react-native";
import { Avatar, Badge, Card, Text } from "react-native-paper";
import { style } from "./style";

interface UserCardProps {
  nome: string;
  localizacao: string;
  textoBio: string;
  tipo: string;
  fotoPerfilUrl: string;
}

export default function UserCard({
  nome,
  localizacao,
  textoBio,
  tipo,
  fotoPerfilUrl,
}: UserCardProps) {
  const avatar = fotoPerfilUrl ? (
    <Avatar.Image size={48} source={{ uri: fotoPerfilUrl }} style={style.avatar} />
  ) : (
    <Avatar.Icon
      size={48}
      icon="account"
      style={style.avatar}
      color="#666"
    />
  );

  const corBadge = 
    tipo === "ARTISTA" ? gStyles.azul[400] :
    tipo === "CONTRATANTE" ? gStyles.vermelho[400] :
    "#888888";

  return (
    <Card style={style.card} elevation={0}>
      <Card.Content style={style.content}>
        {avatar}

        <View style={style.infoContainer}>
          {/* Nome e badge na mesma linha */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text variant="titleMedium" style={style.nome}>
              {nome}
            </Text>
            <Badge style={[style.badge, { backgroundColor: corBadge }]}>
              {tipo || "ARTISTA"} 
            </Badge>
          </View>

          <Text variant="bodySmall" style={style.sub}>
            {localizacao}
          </Text>
          <Text variant="bodyMedium" style={style.sub}>
            {textoBio}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}