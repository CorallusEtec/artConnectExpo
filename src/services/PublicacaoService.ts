import { PublicacaoRequest } from "@/models/request/PublicacaoRequest";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import {
  PublicacaoPagedResponse,
  PublicacaoResponse,
} from "@/models/response/PublicacaoResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { ErroValidacao } from "./ErroValidacao";
import config from "./config";

/**
 * Hook que dá acesso aos estados da requisição e ações encapsuladas com o react query
 *
 * @returns Objeto `useQuery` que gerencia o comportamento e ações da request
 */
export function usePublicacaoQuery() {
  const query = useQuery({
    queryKey: ["feed"],
    queryFn: () => PublicacaoService.listar(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
  });
  return {
    ...query,
    data: query.data,
  };
}

/**
 * Classe que agrega as consultas diretas à API
 */
class PublicacaoService {
  /**
   * Faz a requisição das publicações no sistema, com parâmetros de busca
   * @see http://localhost:8080/swagger-ui/index.html Documentação da API
   *
   * @returns Promise de uma lista paginada com as publicações
   *
   */
  static async listar() {
    return await config.axiosClient.get<PublicacaoPagedResponse>(
      `${config.apiUrl}/publicacao/findAll`,
    );
  }
  /**
   * requisição de salvamento de imagem
   *
   * @deprecated
   *
   * @param param0 Request params para a requisição
   * @returns Status da requisição
   */
  static async save({ legenda, file, autorId }: PublicacaoRequest) {
    try {
      const formData = new FormData();

      formData.append("legenda", legenda);

      if (file?.uri) {
        let blob: Blob;

        try {
          const fileResponse = await fetch(file.uri);

          blob = await fileResponse.blob();
        } catch (blobErr) {
          throw blobErr;
        }

        formData.append("file", blob, `image-${Date.now()}.jpg`);
      }

      const tk = await AsyncStorage.getItem("@artconnect:token");

      if (!tk) {
        return;
      }
      const tokenParse: AuthLoginResponse = JSON.parse(tk);
      const response = await fetch(
        `${config.apiUrl}/publicacao/save?autorId=${autorId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse.token}`,
          },
          body: formData,
          method: "POST",
        },
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text);
      }

      return "Publicação cadastrada com sucesso";
    } catch (error) {
      console.error("Erro ao salvar publicação:", error);

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
