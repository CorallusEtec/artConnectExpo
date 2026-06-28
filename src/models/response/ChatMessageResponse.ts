import { UsuarioResponse } from "./UsuarioResponse";

export interface ChatMessageResponse {
  recipient: UsuarioResponse;
  sender: UsuarioResponse;
  mensagem: string;
  dataEnvio: string;
}
