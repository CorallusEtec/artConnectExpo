import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import { ErroValidacao } from "./ErroValidacao";
import config from "./config";
import { useQuery } from "@/hooks/useQuery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";

interface CriarPublicacaoDTO {
  legenda: string;
  file: any;
  autorId: number;
}

export default class PublicacoesService {
  
  static async save({
    legenda,
    file,
    autorId,
  }: CriarPublicacaoDTO) {
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

        formData.append(
          "file",
          blob,
          `image-${Date.now()}.jpg`
        );
      }
      
      
      const tk = await AsyncStorage.getItem("@artconnect:token");

      if(!tk) {
        return;
      }
      const tokenParse: AuthLoginResponse = JSON.parse(tk);
      const response = await fetch(`${config.apiUrl}/publicacao/save?autorId=${autorId}`, {
        headers: {
          "Authorization": `Bearer ${tokenParse.token}`
        },
        body:formData,
        method:"POST"
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text);
      }

      return "Publicação cadastrada com sucesso";
    } catch (error) {
      console.error(
        "Erro ao salvar publicação:",
        error
      );

      throw error;
    }
  }

  static async listar(
    params?: any
  ): Promise<PublicacaoResponse[]> {
    try {
      const queryParams =
        new URLSearchParams();

      if (params?.legenda) {
        queryParams.append(
          "legenda",
          params.legenda
        );
      }

      if (params?.nomeAutor) {
        queryParams.append(
          "nomeAutor",
          params.nomeAutor
        );
      }

      if (params?.dataInicio) {
        queryParams.append(
          "dataInicio",
          params.dataInicio
        );
      }

      if (params?.dataFim) {
        queryParams.append(
          "dataFim",
          params.dataFim
        );
      }

      const url = `${
        config.apiUrl
      }/publicacao/findAll?${queryParams.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Erro ao buscar publicações"
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(
        "Erro ao listar publicações",
        error
      );

      throw error;
    }
  }

  static validarCriacao(
    dados: any
  ): ErroValidacao {
    const erro = new ErroValidacao();

    if (!dados.legenda && !dados.file) {
      return erro.invalido(
        "Ao menos uma legenda ou uma mídia deve ser fornecida"
      );
    }

    return erro;
  }
}