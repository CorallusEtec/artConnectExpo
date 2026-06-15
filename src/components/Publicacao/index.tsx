import { usePublicacao } from "@/contexts/PublicacaoContext";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";
import { PublicacaoActions } from "./PublicacaoActions";
import { PublicacaoContent } from "./PublicacaoContent";
import { PublicacaoHeader } from "./PublicacaoHeader";

export function Publicacao() {
  const { idPublicacao } = usePublicacao();
  const { isLoading } = usePublicacaoQuery(idPublicacao);

  if (isLoading) return <ActivityIndicator />;

  return (
    <Card>
      {/* HEADER */}
      <PublicacaoHeader />
      {/* CONTENT */}
      <PublicacaoContent />
      {/* ACTIONS */}
      <PublicacaoActions />
    </Card>
  );
}
