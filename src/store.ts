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

interface AuthState {
  artista: ArtistaDTO | null;
  setArtista: (artista: ArtistaDTO) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  artista: null,

  setArtista: (artista) => set({ artista }),

  clear: () => set({ artista: null }),
}));
