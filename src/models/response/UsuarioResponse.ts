import { TipoConta } from "../enumeration/enumeration";
import { ArteResponse } from "./ArteResponse";
import { GeneroArteResponse } from "./GeneroArteResponse";
import { PublicacaoDetailsResponse } from "./Publicacao/PublicacaoDetailsResponse";
import { Status } from "./Status";

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  tipoConta: TipoConta;
  status?: Status;
  dataCriacao: string;
  nomeLog?: string;
  numLog?: number;
  cep?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  textoBio?: string;
  fotoPerfilUrl?: string;
  contatos?: [];
  publicacoes: PublicacaoDetailsResponse[];

  arte: ArteResponse;
  generosArte: GeneroArteResponse[];
}
