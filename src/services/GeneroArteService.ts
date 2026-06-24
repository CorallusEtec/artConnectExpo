import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

export function useGeneroArteByArte(idArte?: number) {
  const query = useQuery({
    queryFn: () => GeneroArteService.findByArteId(idArte as number),
    queryKey: ["generoArte", idArte],
    enabled: !!idArte,
  });
  return {
    ...query,
    generosArte: query.data?.data ?? [],
  };
}

class GeneroArteService {
  static async findByArteId(idArte: number) {
    const response = await config.axiosClient.get<GeneroArteResponse[]>(
      `${config.apiUrl}/generoArte/findByArte/${idArte}`,
    );
    return response;
  }
}