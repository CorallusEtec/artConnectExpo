import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

/** Requisição da lista de comentários
 *
 * @param id Id da publicação
 * @param token token do usuário autenticado
 * @returns Response da requisição dos comentarios do post com o id.
 */
export function useComentarioQuery(id: number, token: string) {
  const query = useQuery({
    queryKey: ["post", id, "comments"],
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
