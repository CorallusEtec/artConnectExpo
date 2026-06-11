export type TipoConta = 'ARTISTA' | 'CONTRATANTE' | 'ADMIN';
export type NomeTipoStatus = 'ATIVO' | 'INATIVO' | 'BLOQUEADO' | 'PENDENTE';

export interface TipoStatus {
  id: number;
  nomeTipoStatus: NomeTipoStatus;
}

// 3. Interface para o objeto interno de Status
export interface Status {
  id: number;
  tipoStatus: TipoStatus;
  descricao?: string;
  dataModificacao: string; // Vem como string no formato ISO (ex: "2026-05-21T14:47:22")
}

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
  contatos?: []
}