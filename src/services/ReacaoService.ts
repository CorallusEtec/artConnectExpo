import { usePublicacao } from "@/contexts/PublicacaoContext";
import { ReacaoSaveRequest } from "@/models/request/ReacaoSaveRequest";
import { PagedResponse } from "@/models/response/PagedResponse";
import { PublicacaoResponse } from "@/models/response/Publicacao/PublicacaoResponse";
import config from "@/services/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useReagir() {
  const queryClient = useQueryClient();
  const { setData, data: previousContextFeed } = usePublicacao();
  const mutate = useMutation({
    mutationFn: (request: ReacaoSaveRequest) => ReacaoService.reagir(request),

    /** Roda antes da requisição para salvar o estado anterior das reações */
    onMutate: async ({ idRecurso, nomeTipoReacao }) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      const previousFeed:
        | AxiosResponse<PagedResponse<PublicacaoResponse>>
        | undefined = queryClient.getQueryData(["feed"]);

      const publicacaoAtual = previousFeed?.data.content.find(
        (p) => p.publicacao.id === idRecurso,
      );

      /** Atualiza o cache */
      queryClient.setQueryData(
        ["feed"],
        (antigo: AxiosResponse<PagedResponse<PublicacaoResponse>>) => {
          if (!antigo) return;
          return {
            ...antigo,
            data: {
              ...antigo.data,
              content: antigo.data.content.map((pub) => {
                if (pub.publicacao.id === idRecurso) {
                  /** Logica das reações e retorna atualizado */
                  let novaPublicacao!: PublicacaoResponse;
                  switch (nomeTipoReacao) {
                    /** Se ja tiver um like e quiser dar um like, remove a reação e decrementa,
                     *  se for outra reação, tira do like e põe na outra reação,
                     * se não tiver reação só incrementa */
                    case "LIKE":
                      if (publicacaoAtual?.reacaoUsuario == "LIKE") {
                        novaPublicacao = {
                          ...pub,
                          likes: pub.likes - 1,
                          reacaoUsuario: null,
                        };
                      } else if (publicacaoAtual?.reacaoUsuario == "DISLIKE") {
                        novaPublicacao = {
                          ...pub,
                          dislikes: pub.dislikes - 1,
                          likes: pub.likes + 1,
                          reacaoUsuario: "LIKE",
                        };
                      } else {
                        novaPublicacao = {
                          ...pub,
                          likes: pub.likes + 1,
                          reacaoUsuario: "LIKE",
                        };
                      }
                    /** Se ja tiver um dislike e quiser dar um dislike, remove a reação e decrementa,
                     *  se for outra reação, tira do dislike e põe na outra reação,
                     * se não tiver reação só incrementa */
                    case "DISLIKE":
                      if (publicacaoAtual?.reacaoUsuario == "DISLIKE") {
                        novaPublicacao = {
                          ...pub,
                          dislikes: pub.dislikes - 1,
                          reacaoUsuario: null,
                        };
                      } else if (publicacaoAtual?.reacaoUsuario == "LIKE") {
                        novaPublicacao = {
                          ...pub,
                          dislikes: pub.dislikes + 1,
                        };
                      } else {
                        novaPublicacao = {
                          ...pub,
                          dislikes: pub.dislikes + 1,
                          reacaoUsuario: "DISLIKE",
                        };
                      }
                  }

                  /** Atualiza o contexto */
                  if (idRecurso === publicacaoAtual?.publicacao.id) {
                    setData(novaPublicacao);
                  }
                  return novaPublicacao;
                } else return pub;
              }),
            },
          };
        },
      );
      console.log("Cache pos requisição:", queryClient.getQueryData(["feed"]));
      return { previousFeed, previousContextFeed };
    },

    /** Se der erro, faz um rollback para o estado anterior */
    onError: (err, variables, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(["feed"], context.previousFeed);
      }

      if (context?.previousContextFeed) {
        setData(context.previousContextFeed);
      }
    },

    /** Sempre roda dando erro ou não. Sincroniza os dados do cache com o servidor */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
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
