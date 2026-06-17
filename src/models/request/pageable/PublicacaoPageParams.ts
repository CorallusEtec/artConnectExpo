import { TipoStatus } from "@/models/enumeration/enumeration";

export interface PublicacaoPageParams {
  legenda?: string;
  dataInicio?: string;
  dataFim?: string;
  nomeAutor?: string;
  tipoStatus?: TipoStatus;
  idUsuario?: number;
}    
