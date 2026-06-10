import PublicacaoService from "@/services/PublicacaoService";
import { useQuery } from "@tanstack/react-query";

export function usePublicacaoQuery() {
  const query = useQuery({
    queryKey: ["feed"],
    queryFn: () => PublicacaoService.listar(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
  });
  return {
    ...query,
    data: query.data,
  };
}
