import { useAuth } from "@/contexts/AuthContext";
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
export function useComentarioQuery(id: number, buscar: boolean = false) {
  const query = useQuery({
    queryKey: ["post", id, "comments"],
    enabled: buscar,
    queryFn: () => ComentarioService.findByPostId(id),
  });

  return query;
}

class ComentarioService {
  static async findByPostId(postId: number) {
    const { getValidateToken } = useAuth();
    return await config.axiosClient.get<PagedResponse<ComentarioResponse>>(
      `${config.apiUrl}/comentario/findByPost/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${getValidateToken()}`,
        },
      },
    );
  }
}
