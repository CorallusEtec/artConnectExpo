import { create } from "zustand";

export interface ContratanteDTO {
  id: number;

  nome: string;
  email: string;
  textoBio: string;
  contatos: any[];

  dataNasc: string;
  razaoSocial: string;
  sexo: string;

  nomeLog: string;
  numLog: number;
  cep: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;
}

export interface ArtistaDTO {
  id: number;

  nome: string;
  email: string;
  textoBio: string;
  contatos: any[];

  arte: any;
  nomeArtistico: string;
  dataNasc: string;

  nomeLog: string;
  numLog: number;
  cep: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;
}

type Usuario = ContratanteDTO | ArtistaDTO;

interface AuthState {
  usuario: Usuario | null;

  setUsuario: (usuario: Usuario) => void;

  limparUsuario: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,

  setUsuario: (usuario) => set({ usuario }),

  limparUsuario: () => set({ usuario: null }),
}));