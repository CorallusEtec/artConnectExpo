export interface AuthRegisterRequest {
  nome: string;
  email: string;
  senha: string;
  tipoConta: "ARTISTA" | "CONTRATANTE";
}
