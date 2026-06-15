import { TipoReacao, TipoRecurso } from "../enumeration/enumeration";

export interface ReacaoSaveRequest {
  token: string;
  nomeTipoReacao: TipoReacao;
  idRecurso: number;
  tipoRecurso: TipoRecurso;
}
