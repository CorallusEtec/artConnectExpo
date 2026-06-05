import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { style } from "./card.style";

interface UserCardProps {
  nome: string;
  localizacao: string;
  descricao: string;
  tipo: string;
}

export default function UserCard({ nome, localizacao, descricao, tipo }: UserCardProps) {
  return (
    <Card style={style.card} elevation={0}>
      <Card.Content style={style.content}>
        {/* Ícone de Avatar Redondo padrão */}
        <Avatar.Icon size={48} icon="account" style={style.avatar} color="#666" />
        
        <View style={style.infoContainer}>
          <Text variant="titleMedium" style={style.nome}>{nome}</Text>
          <Text variant="bodySmall" style={style.sub}>{localizacao}</Text>
          <Text variant="bodyMedium" style={style.sub}>{descricao}</Text>
          <Text variant="labelLarge" style={style.tag}>{tipo.toUpperCase()}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
