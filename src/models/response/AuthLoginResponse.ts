import { TipoConta } from "../enumeration/enumeration";
import { Status } from "./Status";

export interface AuthLoginResponse {
  id: number;
  token: string;
  tipoConta: TipoConta;
  status: Status;
}
