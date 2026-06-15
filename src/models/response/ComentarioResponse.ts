import { TipoReacao } from "../enumeration/enumeration";
import { AutorResponse } from "./AutorResponse";
import { PublicacaoDetailsResponse } from "./Publicacao/PublicacaoDetailsResponse";
import { Status } from "./Status";

export interface ComentarioResponse {
  id: number;

  /** Status do comentário */
  status: Status;

  /** Data de publicação do comentário */
  dataComentario: string;

  /** Mensagem do comentário */
  mensagem: string;

  /** Autor do comentário */
  usuario: AutorResponse;

  /** Quantidade de likes do comentário */
  likes: number;

  /** Reação do usuário autenticado */
  recaoUsuario: TipoReacao | null;

  /** Detalhes da publicação desse comentário */
  publicacao: PublicacaoDetailsResponse;
}
