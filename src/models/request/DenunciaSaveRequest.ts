import { TipoDenuncia } from "../enumeration/enumeration";

export interface DenunciaSaveRequest {
  titulo: string;
  tipoDenuncia: TipoDenuncia;
  idRecurso: number;
}
