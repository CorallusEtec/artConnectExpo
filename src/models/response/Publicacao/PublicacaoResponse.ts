import { TipoReacao } from "@/models/enumeration/enumeration";
import { PublicacaoDetailsResponse } from "./PublicacaoDetailsResponse";

/** Metadados da publicação */
export interface PublicacaoResponse {
  publicacao: PublicacaoDetailsResponse;

  /** Quantidade de likes da publicação */
  likes: number;

  /** Quantidade de dislikes da publicação */
  dislikes: number;

  /**  Reação do usuário autenticado. Se não estiver autenticado ou não tiver reagido o valor é `null` */
  reacaoUsuario: null | TipoReacao;

  totalComentarios: number;
}
