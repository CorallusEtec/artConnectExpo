import { Usuario } from '../store';
import config from './config';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ArtistaCadastroDTO {
  nome: string;
  email: string;
  senha: string;
}

<<<<<<< HEAD:src/services/ArtistaService.ts


export default class ArtistaService {

    static async save(artista: ArtistaCadastroDTO) {
=======
interface ArtistaEditDTO {
  nome?: string;
  textoBio?: string;
  contatos?: any[];
  arte?: { id: number };
  nomeArtistico?: string;
  dataNasc?: string;
  nomeLog?: string;
  numLog?: number;
  cep?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
}

export default class ArtistaService {

    static async save(artista: ArtistaDTO): Promise<Usuario> {
>>>>>>> 4c545ff4e4d0640c810ca7152eee1b9e88bbd8be:src/services/UsuarioService.ts
        try {
            const response = await fetch(`${config.apiUrl}/artista/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(artista),
            });

            if(!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'erro ao cadastrar');
            }

            const data: Usuario = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao cadastrar", error);
            throw error;
        }
    }

    static async edit(id: number, artista: ArtistaEditDTO): Promise<Usuario> {
        try {
            const response = await fetch(`${config.apiUrl}/artista/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(artista),
            });

            if(!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'erro ao editar');
            }

            const data: Usuario = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao editar", error);
            throw error;
        }
    }

    static async saveUserLocal(user: any) {
        await AsyncStorage.setItem('@login', JSON.stringify(user));
    }

    static async getUserLocal() {
        const user = await AsyncStorage.getItem('@login');
        if(user==null) {
            return null;
        } else {
            return JSON.parse(user);
        }
    }

    static async getById(id: number) {
    const response = await fetch(`${config.apiUrl}/artista/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    return response.json();
  }

}

