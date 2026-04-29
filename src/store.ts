import { create } from "zustand";

interface ArtistaDTO {
  id: number;
  nome: string;
  email: string;
  tipoConta: string;
  status: string;

  dataCriacao: string;

  nomeArtistico: string;
  arte: any; 
  dataNasc: string;

  nomeLog: string;
  numLog: number;
  cep: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;

  textoBio: string;

  seguidores: any[];
  seguido: any[];
  contatos: any[];
}

interface ContratanteDTO {
  id: number;
  nome: string;
  email: string;
  tipoConta: string;
  status: string;
  dataCriacao: string;
  razaoSocial?: string;
  cnpj?: string;
  tipo?: 'cnpj' | 'cpf';
}

type UsuarioAutenticado = ArtistaDTO | ContratanteDTO;

interface AuthState {
  usuario: UsuarioAutenticado | null;
  tipoConta: 'artista' | 'contratante' | null;
  setUsuario: (usuario: UsuarioAutenticado, tipo: 'artista' | 'contratante') => void;
  clear: () => void;
}

export type Usuario = UsuarioAutenticado;

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  tipoConta: null,

  setUsuario: (usuario, tipo) => set({ usuario, tipoConta: tipo }),

  clear: () => set({ usuario: null, tipoConta: null }),
}));
