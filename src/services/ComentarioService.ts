import { useAuth } from "@/contexts/AuthContext";
import { ComentarioCommentRequest } from "@/models/request/ComentarioCommentRequest";
import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";

/** Requisição da lista de comentários
 *
 * @param idPublicacao Id da publicação
 * @param token token do usuário autenticado
 * @returns Response da requisição dos comentarios do post com o id.
 */
export function useComentarioListQuery(
  idPublicacao: number,
  buscar: boolean = false,
) {
  const { getValidateToken } = useAuth();
  const query = useQuery({
    queryKey: ["post", idPublicacao, "comments"],
    enabled: buscar,
    queryFn: () =>
      ComentarioService.findByPostId(idPublicacao, getValidateToken()),
  });

  return {
    ...query,
    data: query.data,
  };
}

/** Busca dados de um comentário específico pelo Id.
 *
 * @param comentarioId
 */
export function useComentarioQuery(comentarioId: number) {
  const { getValidateToken } = useAuth();
  const query = useQuery({
    queryKey: [comentarioId, "comentario"],
    queryFn: () => ComentarioService.findById(comentarioId, getValidateToken()),
  });
  return {
    ...query,
    data: query.data,
  };
}

/** Publica o comentário
 *
 * @returns useMutation para a publicação do comentário
 */
export function useComentarioMutation() {
  const { getValidateToken } = useAuth();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (request: ComentarioCommentRequest) =>
      ComentarioService.comment(request, getValidateToken()),

    onMutate: async ({ idPublicacao }) => {
      await queryClient.invalidateQueries({
        queryKey: ["post", idPublicacao, "comments"],
      });

      const previusCommentList = queryClient.getQueryData([
        "post",
        idPublicacao,
        "comments",
      ]);

      return { previusCommentList };
    },

    onError: (a, { idPublicacao }, context) => {
      if (context?.previusCommentList) {
        queryClient.setQueryData(
          ["post", idPublicacao, "comments"],
          context.previusCommentList,
        );
      }
    },
    onSettled: (a, erro, variables) => {
      queryClient.refetchQueries({
        queryKey: ["post", variables.idPublicacao, "comments"],
      });

      queryClient.refetchQueries({
        queryKey: [variables.idPublicacao, "publicacao"],
      });
    },
  });

  return mutate;
}

class ComentarioService {
  /** Busca uma lista de comentários pelo id da publicação
   *
   * @param postId Id ad publicação
   * @param token Token do usuario autenticado.
   * @returns Lista de comentarios do post correspondente ao Id
   */
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

  /** Busca um comentario pelo id do comentario
   *
   * @param comentarioId Id do comentarios
   * @param token Token de autenticação do usuario
   * @returns Retorna o comentário correspondente do Id
   */
  static async findById(comentarioId: number, token: string) {
    const response = await config.axiosClient.get<ComentarioResponse>(
      `${config.apiUrl}/comentario/${comentarioId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response;
  }

  static async comment(request: ComentarioCommentRequest, token: string) {
    const response = await config.axiosClient.post<ComentarioCommentRequest>(
      `${config.apiUrl}/comentario/comment`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }
}
