import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

export function useComentarioQuery(id: number, token: string) {
  const query = useQuery({
    queryKey: ["comments"],
    queryFn: () => ComentarioService.findByPostId(id, token),
  });

  return query;
}

class ComentarioService {
  static async findByPostId(postId: number, token: string) {
    return await config.axiosClient.get<PagedResponse<ComentarioResponse>>(
      `${config.apiUrl}/comentario/findByPost/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
