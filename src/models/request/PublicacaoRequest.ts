import { TipoMidia } from "../enumeration/enumeration";

export interface PublicacaoRequest {
  legenda?: string;
  file: any;
  tipoMidia: TipoMidia | null;
}
