import { PublicacaoRequest } from "@/models/request/PublicacaoRequest";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { getExtensaoPorMimeType } from "@/utils/Extensoes";

import { useAuth } from "@/contexts/AuthContext";
import { PublicacaoPageParams } from "@/models/request/pageable/PublicacaoPageParams";
import { PublicacaoResponse } from "@/models/response/Publicacao/PublicacaoResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { router } from "expo-router";
import { Platform } from "react-native";
import { ErroValidacao } from "./ErroValidacao";
import config from "./config";

export function useFeedQuery(
  params: PublicacaoPageParams = { tipoStatus: "ATIVO" },
  page: "feed" | "perfil",
) {
  const query = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: [page, params],
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last
        ? undefined
        : lastPage.data.pageable.pageNumber + 1;
    },
    queryFn: () => PublicacaoService.listar(params),
  });
  return query;
}

export function usePerfilPublicacaoQuery(usuarioId: number) {
  const query = useQuery({
    queryKey: [usuarioId, "publicacaoPerfil"],
    queryFn: () => PublicacaoService.listar({ idUsuario: usuarioId }),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function usePublicar() {
  const queryClient = useQueryClient();
  const { getValidateToken, getValidateId } = useAuth();
  const mutate = useMutation({
    mutationFn: (request: PublicacaoRequest) =>
      PublicacaoService.newSave(request, getValidateToken()),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed", {}] });
      queryClient.invalidateQueries({
        queryKey: [getValidateId(), "publicacaoPerfil"],
      });
    },
    onSuccess: () => {
      router.navigate("/home");
    },
  });

  return mutate;
}

export function usePublicacaoQuery(idPublicacao: number) {
  const { getValidateToken } = useAuth();
  const query = useQuery({
    queryKey: [idPublicacao, "publicacao"],
    queryFn: () =>
      PublicacaoService.findById({ idPublicacao, token: getValidateToken() }),
  });

  return {
    ...query,
    data: query.data,
  };
}

/**
 * Classe que agrega as consultas diretas à API
 */
export class PublicacaoService {
  /**
   * Faz a requisição das publicações no sistema, com parâmetros de busca
   * @see http://localhost:8080/swagger-ui/index.html Documentação da API
   *
   * @returns Promise de uma lista paginada com as publicações
   *
   */
  static async listar(params: PublicacaoPageParams = {}) {
    const filtrosLimpos = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== "" && value != null,
      ),
    );

    return await config.axiosClient.get<PagedResponse<PublicacaoResponse>>(
      `${config.apiUrl}/publicacao/findAll`,
      { params: filtrosLimpos },
    );
  }

  /** Busca uma publicacao pelo ID
   *
   * @param param0 Request da requisição.
   * @returns Publicação do Id correnspondente.
   */
  static async findById({
    idPublicacao,
    token,
  }: {
    idPublicacao: number;
    token: string;
  }) {
    const response = await config.axiosClient.get<PublicacaoResponse>(
      `${config.apiUrl}/publicacao/${idPublicacao}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response;
  }

  /** requisição de salvamento de imagem
   *
   *
   * @param param0 Request params para a requisição
   * @returns Status da requisição
   */
  static async newSave(
    { legenda, file, tipoMidia }: PublicacaoRequest,
    token: string,
  ) {
    const formData = new FormData();

    if (legenda) formData.append("legenda", legenda);
    if (file) {
      formData.append("arquivo", {
        uri: file.url,
        name: `upload-${Date.now()}.${file.name.split(".").pop() || "bin"}`,
        type: file.mimeType || "video/mp4",
      } as any);
    }
    if (tipoMidia) formData.append("tipoMidia", tipoMidia);

    return await config.axiosClient.post(
      `${config.apiUrl}/publicacao/save`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }

  static async save({ legenda, file, tipoMidia }: PublicacaoRequest) {
    try {
      const formData = new FormData();

      if (legenda) formData.append("legenda", legenda);
      if (file?.uri) {
        if (Platform.OS === "web") {
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const extensao =
            getExtensaoPorMimeType(blob.type) ||
            file.uri.split(".").pop() ||
            "bin";
          formData.append("arquivo", blob, `upload-${Date.now()}.png`);
        } else {
          const extensao = file.uri.split(".").pop() || "bin";
          formData.append("arquivo", {
            uri: file.uri,
            name: file.name || `upload-${Date.now()}.${extensao}`,
            type: file.mimeType || "video/mp4",
          } as any);
        }
      }

      if (tipoMidia) formData.append("tipoMidia", tipoMidia);
      const tk = await AsyncStorage.getItem("@artconnect:token");
      if (!tk) {
        return;
      }
      const tokenParse: AuthLoginResponse = JSON.parse(tk);

      return await config.axiosClient.post(
        `${config.apiUrl}/publicacao/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokenParse.token}`,
          },
        },
      );
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Função anterior de listar
   * @deprecated Use {@link listar()} como alternativa
   *
   * @param params Request Params da url
   * @returns Lista de publicações
   */
  static async listarAntigo(params?: any): Promise<PublicacaoResponse[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.legenda) {
        queryParams.append("legenda", params.legenda);
      }

      if (params?.nomeAutor) {
        queryParams.append("nomeAutor", params.nomeAutor);
      }

      if (params?.dataInicio) {
        queryParams.append("dataInicio", params.dataInicio);
      }

      if (params?.dataFim) {
        queryParams.append("dataFim", params.dataFim);
      }

      const url = `${
        config.apiUrl
      }/publicacao/findAll?${queryParams.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao buscar publicações");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Erro ao listar publicações", error);

      throw error;
    }
  }

  static validarCriacao(dados: any): ErroValidacao {
    const erro = new ErroValidacao();

    if (!dados.legenda && !dados.file) {
      return erro.invalido(
        "Ao menos uma legenda ou uma mídia deve ser fornecida",
      );
    }

    return erro;
  }
}
