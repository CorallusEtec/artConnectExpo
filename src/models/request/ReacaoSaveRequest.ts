import { TipoReacao, TipoRecurso } from "../enumeration/enumeration";

export interface ReacaoSaveRequest {
  nomeTipoReacao: TipoReacao;
  idRecurso: number;
  tipoRecurso: TipoRecurso;
}
