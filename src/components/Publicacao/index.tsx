import { usePublicacao } from "@/contexts/PublicacaoContext";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { PublicacaoActions } from "./PublicacaoActions";
import { PublicacaoContent } from "./PublicacaoContent";
import { PublicacaoHeader } from "./PublicacaoHeader";

export function Publicacao() {
  const { idPublicacao } = usePublicacao();
  const { isLoading } = usePublicacaoQuery(idPublicacao);

  if (isLoading) return <></>;

  return (
    <>
      {/* HEADER */}
      <PublicacaoHeader />
      {/* CONTENT */}
      <PublicacaoContent />
      {/* ACTIONS */}
      <PublicacaoActions />
    </>
  );
}
