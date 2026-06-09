import PublicacaoService from "@/services/PublicacaoService";
import { useQuery } from "@tanstack/react-query";

export function useListarPublicacao() {
  const qury = useQuery({
    queryKey: ["feed"],
    queryFn: () => PublicacaoService.listar(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
  });
  return {
    ...qury,
  };
}
