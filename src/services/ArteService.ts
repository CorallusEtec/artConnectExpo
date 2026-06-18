import { ArtePageParams } from "@/models/request/pageable/ArtePageParams";
import { ArteResponse } from "@/models/response/ArteResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

export function useArteList(params?: ArtePageParams) {
  const query = useQuery({
    queryKey: ["arteList"],
    queryFn: () => ArteService.getTiposArte(params),
  });
  return {
    ...query,
    tiposArte: query.data,
  };
}

class ArteService {
  static async getTiposArte(params?: ArtePageParams) {
    const response = await config.axiosClient.get<PagedResponse<ArteResponse>>(
      `${config.apiUrl}/arte/findAll`,
      {
        params: { size: 20, ...params },
      },
    );

    return response;
  }
}
