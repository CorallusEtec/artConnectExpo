import { TipoConta } from "../enumeration/enumeration";
/**
 * Interface para tipar autor de publicação e comentário
 */
export interface AutorResponse {
  id: number;
  nome: string;
  tipoConta: TipoConta;
}
