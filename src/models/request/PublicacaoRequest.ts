import { TipoMidia } from "@/components/PostCreate/types";

export interface PublicacaoRequest {
  legenda: string;
  file: any;
  tipoMidia: TipoMidia | null;
}
