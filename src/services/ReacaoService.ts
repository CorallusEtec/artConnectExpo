import { ReacaoSaveRequest } from "@/models/request/ReacaoSaveRequest";
import { PublicacaoResponse } from "@/models/response/Publicacao/PublicacaoResponse";
import config from "@/services/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useReagir() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (request: ReacaoSaveRequest) => ReacaoService.reagir(request),

    /** Roda antes da requisição para salvar o estado anterior das reações */
    onMutate: async ({ idRecurso, nomeTipoReacao }) => {
      await queryClient.cancelQueries({ queryKey: [idRecurso, "publicacao"] });

      const previousState: AxiosResponse<PublicacaoResponse> | undefined =
        queryClient.getQueryData([idRecurso, "publicacao"]);

      queryClient.setQueryData([idRecurso, "publicacao"], () => {
        if (previousState) {
          switch (nomeTipoReacao) {
            case "LIKE":
              if (previousState.data.reacaoUsuario == "LIKE") {
                return {
                  ...previousState,
                  data: {
                    ...previousState.data,
                    likes: previousState.data.likes - 1,
                    reacaoUsuario: null,
                  },
                };
              } else if (previousState.data.reacaoUsuario == "DISLIKE") {
                return {
                  ...previousState,
                  data: {
                    ...previousState.data,
                    dislikes: previousState.data.dislikes - 1,
                    likes: previousState.data.likes + 1,
                    reacaoUsuario: nomeTipoReacao,
                  },
                };
              } else {
                return {
                  ...previousState,
                  data: {
                    ...previousState.data,
                    likes: previousState.data.likes + 1,
                    reacaoUsuario: nomeTipoReacao,
                  },
                };
              }
            case "DISLIKE":
              if (previousState.data.reacaoUsuario == "DISLIKE") {
                return {
                  ...previousState,
                  data: {
                    ...previousState.data,
                    dislikes: previousState.data.dislikes - 1,
                    reacaoUsuario: null,
                  },
                };
              } else if (previousState.data.reacaoUsuario == "LIKE") {
                return {
                  ...previousState,
                  data: {
                    ...previousState.data,
                    dislikes: previousState.data.dislikes + 1,
                    likes: previousState.data.likes - 1,
                    reacaoUsuario: nomeTipoReacao,
                  },
                };
              } else {
                return {
                  ...previousState,
                  data: {
                    ...previousState.data,
                    dislikes: previousState.data.dislikes + 1,
                    reacaoUsuario: nomeTipoReacao,
                  },
                };
              }
          }
        } else {
          return;
        }
      });

      return { previousState };
    },

    /** Se der erro, faz um rollback para o estado anterior */
    onError: (err, variables, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(
          [variables.idRecurso, "publicacao"],
          context.previousState,
        );
      }
    },

    /** Sempre roda dando erro ou não. Sincroniza os dados do cache com o servidor */
    onSettled: (data, err, variables) => {
      queryClient.invalidateQueries({
        queryKey: [variables.idRecurso, "publicacoes"],
      });
    },
  });

  return mutate;
}

class ReacaoService {
  static async reagir(request: ReacaoSaveRequest) {
    const response = await config.axiosClient.post<ReacaoSaveRequest>(
      `${config.apiUrl}/reacao/reagir`,
      request,
      { headers: { Authorization: `Bearer ${request.token}` } },
    );

    return response;
  }
}
