import { ArteResponse } from "../response/ArteResponse";
import { GeneroArteResponse } from "../response/GeneroArteResponse";

export interface AuthRegisterRequest {
  nome: string;
  email: string;
  senha: string;
  tipoConta: "ARTISTA" | "CONTRATANTE";

  details: UsuarioRegisterDetailsRequest;
}

interface UsuarioRegisterDetailsRequest {
  nomeLog?: string;
  numLog?: number;
  cep?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  nomeArtistico: string;
  arte: ArteResponse;
  generosArte: GeneroArteResponse[];
}
