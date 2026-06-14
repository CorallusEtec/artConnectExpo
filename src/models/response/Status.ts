import { TipoStatus } from "../enumeration/enumeration";

// 3. Interface para o objeto interno de Status
export interface Status {
  id: number;
  tipoStatus: TipoStatus;
  descricao?: string;
  dataModificacao: string; // Vem como string no formato ISO (ex: "2026-05-21T14:47:22")
}
