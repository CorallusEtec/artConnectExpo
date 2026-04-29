import config from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ContratanteCadastroDTO {
  nome: string;
  email: string;
  senha: string;
  razaoSocial: string | null;
  cnpj: string | null;
  tipo: 'cnpj' | 'cpf';
}

export default class ContratanteService {

  static async save(contratante: ContratanteCadastroDTO) {
    try {
      const { tipo, ...body } = contratante;

      const response = await fetch(`${config.apiUrl}/contratante/save?tipo=${tipo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Erro ao cadastrar');
      }

      return await response.text();

    } catch (error) {
      console.error("Erro ao cadastrar contratante", error);
      throw error;
    }
  }

  static async saveUserLocal(user: any) {
    await AsyncStorage.setItem('@login-contratante', JSON.stringify(user));
  }

  static async getUserLocal() {
    const user = await AsyncStorage.getItem('@login-contratante');
    return user ? JSON.parse(user) : null;
  }

  static async getById(id: number) {
    const response = await fetch(`${config.apiUrl}/contratante/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar contratante");
    }

    return response.json();
  }
}