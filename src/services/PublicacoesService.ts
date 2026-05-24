import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import { ErroValidacao } from "./ErroValidacao";
import config from "./config";

interface CriarPublicacaoDTO {
    legenda: string;
    file: any;
    autorId: number;
}

export default class PublicacoesService {
    static async save({legenda, file, autorId}: CriarPublicacaoDTO) {
        try {
            const formData = new FormData();
            formData.append("legenda", legenda ?? "");

            if(file?.uri) {
                let blob:Blob;
                try {
                    const fileResponse = await fetch(file.uri);
                    blob = await fileResponse.blob();
                } catch (blobErr) {
                    throw blobErr;
                }
                formData.append("file", blob, `image-${Date.now()}.jpg`);
            }
            const response = await fetch(`${config.apiUrl}/publicacao/save?autorId=${autorId}`,
                {method: 'POST', body: formData}
            );
            const text = await response.text();
            if (!response.ok) throw new Error(text);
            return text;
        } catch (error) {
            console.error("Erro ao salvar publicação:", error);
            throw error;
        }
    }

    static async listar(): Promise<PublicacaoResponse[]> {
    try {
      const response = await fetch(`${config.apiUrl}/publicacao/findAll`);

      if (!response.ok) {
        throw new Error("Erro ao buscar publicações");
      }

      return await response.json();

    } catch (error) {
      console.error("Erro ao listar publicações", error);
      throw error;
    }
  }

  static validarCriacao(dados: any): ErroValidacao {
    const erro = new ErroValidacao();

    if (!dados.legenda && !dados.file) {
        return erro.invalido(
        "Ao menos uma legenda ou uma mídia deve ser fornecida"
        );
    }
    return erro;
}
}