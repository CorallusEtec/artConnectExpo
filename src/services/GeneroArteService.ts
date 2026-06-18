import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

export function useGeneroArteByArte(id: number) {
  const query = useQuery({
    queryFn: () => GeneroArteService.findByArteId(id),
    queryKey: ["generoArte"],
    enabled: false,
  });
  return {
    ...query,
    data: query.data,
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
