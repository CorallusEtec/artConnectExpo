import { TipoConta } from "../enumeration/enumeration";

export interface AuthLoginResponse {
  id: number;
  token: string;
  tipoConta: TipoConta;
}
