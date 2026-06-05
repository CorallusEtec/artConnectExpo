
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";

interface UserCardProps {
  nome: string;
  localizacao: string;
  descricao: string;
  tipo: string;
}

export default function UserCard({ nome, localizacao, descricao, tipo }: UserCardProps) {
  return (
    <Card style={styles.card} elevation={0}>
      <Card.Content style={styles.content}>
        {/* Ícone de Avatar Redondo padrão */}
        <Avatar.Icon size={48} icon="account" style={styles.avatar} color="#666" />
        
        <View style={styles.infoContainer}>
          <Text variant="titleMedium" style={styles.nome}>{nome}</Text>
          <Text variant="bodySmall" style={styles.sub}>{localizacao}</Text>
          <Text variant="bodyMedium" style={styles.sub}>{descricao}</Text>
          <Text variant="labelLarge" style={styles.tag}>{tipo.toUpperCase()}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C4C4C4",
    borderRadius: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    marginRight: 16,
    backgroundColor:"#E0E0E0" 
  },
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  nome: {
    fontWeight: "bold",
    color: "#333",
  },
  sub: {
    color: "#444",
  },
  tag: {
    color: "#0B31A3", // Azul padrão do seu botão
    fontWeight: "bold",
    marginTop: 4,
  },
  
});