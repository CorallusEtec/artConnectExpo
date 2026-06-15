import { useAuth } from "@/contexts/AuthContext";
import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

/** Requisição da lista de comentários
 *
 * @param idPublicacao Id da publicação
 * @param token token do usuário autenticado
 * @returns Response da requisição dos comentarios do post com o id.
 */
export function useComentarioListQuery(idPublicacao: number, buscar: boolean = false) {
  const { getValidateToken } = useAuth()
  const query = useQuery({
    queryKey: ["post", idPublicacao, "comments"],
    enabled: buscar,
    queryFn: () => ComentarioService.findByPostId(idPublicacao, getValidateToken()),
  });

  return {
    ...query,
    data: query.data
  };
}

/** Busca dados de um comentário específico pelo Id.
 * 
 * @param comentarioId 
 */
export function useComentarioQuery(comentarioId: number) {
  const { getValidateToken } = useAuth()
  const query = useQuery({
    queryKey: [comentarioId, "comentario"],
    queryFn: () => ComentarioService.findById(comentarioId, getValidateToken()),
  });
  return {
    ...query,
    data: query.data
  }
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


  static async findById(comentarioId: number, token: string) {
    const response = await config.axiosClient.get<ComentarioResponse>(`${config.apiUrl}/comentario/${comentarioId}`,{
      headers: {Authorization: `Bearer ${token}`}
    });

    return response;
  }
}
