import { TipoMidia, TipoReacao } from "../enumeration/enumeration";
import { AutorResponse } from "./AutorResponse";

/** Dados das reações nas publicações */
export interface ReacaoDetails {
  tipoReacao: TipoReacao;
  total: number;
}

/** Dados relacionados da publicação */
export interface PublicacaoDetails {
  publicacao: PublicacaoResponse;
  /** Dados das reações da publicação */
  reacoes: ReacaoDetails[];
  /**  Reação do usuário autenticado. Se não estiver autenticado ou não tiver reagido o valor é `null` */
  reacaoUsuario: null | TipoReacao;
  totalComentarios: number;
}
/** Metadados da publicação em si */
export interface PublicacaoResponse {
  id: number;
  legenda: string;
  urlMidia: null | string;
  tipoMidia: null | TipoMidia;
  dataPublicacao: string;
  autor: AutorResponse;
}

/** Carrega o conteúdo das publicações e da paginação */
