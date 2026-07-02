import { AvatarRender } from "@/components/AvatarRender";
import { useAuth } from "@/contexts";
import { ArteResponse } from "@/models/response/ArteResponse";
import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { gStyles } from "@/style/gStyle";
import { navegarParaPerfil } from "@/utils/NavigationUtils";
import React from "react";
import { Pressable, View } from "react-native";
import { Avatar, Badge, Card, Chip, Text } from "react-native-paper";
import { style } from "./style";

interface UserCardProps {
  id: number;
  nome: string;
  localizacao: string;
  textoBio: string;
  tipo: string;
  fotoPerfilUrl: string;
  arte?: ArteResponse;
  generosArte?: GeneroArteResponse[];
}

export default function UserCard({
  id,
  nome,
  localizacao,
  textoBio,
  tipo,
  fotoPerfilUrl,
  arte,
  generosArte = [],
}: UserCardProps) {
  const generosArray = Array.isArray(generosArte) ? generosArte : [];
  const { getValidateId } = useAuth();
  const avatar = fotoPerfilUrl ? (
    <Avatar.Image
      size={48}
      source={{ uri: fotoPerfilUrl }}
      style={style.avatar}
    />
  ) : (
    <Avatar.Icon size={48} icon="account" style={style.avatar} color="#666" />
  );

  const corBadge =
    tipo === "ARTISTA"
      ? gStyles.azul[400]
      : tipo === "CONTRATANTE"
        ? gStyles.vermelho[400]
        : "#888888";

  return (
    <Pressable onPress={() => navegarParaPerfil(getValidateId(), id)}>
      <Card style={style.card} elevation={0}>
        <Card.Content style={style.content}>
          <AvatarRender nome={nome} size={48} uri={fotoPerfilUrl} />

          <View style={style.infoContainer}>
            {/* Nome e badge na mesma linha */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Text variant="titleMedium" style={style.nome}>
                {nome}
              </Text>
              <Badge
                style={[
                  style.badge,
                  { backgroundColor: corBadge, flexShrink: 0 },
                ]}
              >
                {tipo || "ARTISTA"}
              </Badge>
            </View>

            <Text variant="bodySmall" style={style.sub}>
              {localizacao}
            </Text>
            <Text variant="bodyMedium" style={style.sub}>
              {textoBio}
            </Text>
            {(arte || generosArray.length > 0) && (
              <View style={style.artInfoContainer}>
                {arte && (
                  <Chip
                    style={style.artChip}
                    textStyle={style.artChipText}
                    compact
                  >
                    {arte.nomeArte}
                  </Chip>
                )}
                {generosArray.map((genero, index) => (
                  <Chip
                    key={genero.id ?? index}
                    style={style.artChip}
                    textStyle={style.artChipText}
                    compact
                  >
                    {genero.nomeGeneroArte}
                  </Chip>
                ))}
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}
