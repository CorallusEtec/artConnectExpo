import { TipoMidia } from "@/models/enumeration/enumeration";
import { AutorResponse } from "../AutorResponse";

/** Detalhes da publicação */
export interface PublicacaoDetailsResponse {
  id: number;
  legenda: string;
  urlMidia: null | string;
  tipoMidia: null | TipoMidia;
  dataPublicacao: string;
  autor: AutorResponse;
}
