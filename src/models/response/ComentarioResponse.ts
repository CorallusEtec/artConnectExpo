import { AutorResponse } from "./AutorResponse";
import { PublicacaoResponse } from "./PublicacaoResponse";

export interface ComentarioResponse {
  id: number;
  status: {
    id: number;
    tipoStatus: string;
    descricao: string | null;
    dataModificacao: string;
  };
  dataComentario: string;
  mensagem: string;
  usuario: AutorResponse;
  publicacao: PublicacaoResponse;
}
