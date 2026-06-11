import { Card } from "react-native-paper";
import { PublicacaoActions } from "./PublicacaoActions";
import { PublicacaoContent } from "./PublicacaoContent";
import { PublicacaoHeader } from "./PublicacaoHeader";

export function Publicacao() {
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
