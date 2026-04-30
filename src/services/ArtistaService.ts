import { Usuario } from '../store';
import config from './config';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ErroValidacao } from "@/services/ErroValidacao";
import { ValidationService } from "@/services/ValidacaoService";

interface ArtistaCadastroDTO {
  nome: string;
  email: string;
  senha: string;
}

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

  static async save(artista: ArtistaCadastroDTO): Promise<string> {
  try {
    const response = await fetch(`${config.apiUrl}/artista/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(artista),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text);
    }

    return text;
  } catch (error) {
    console.error("Erro ao cadastrar", error);
    throw error;
  }
}

 static async edit(id: number, artista: ArtistaEditDTO): Promise<void> {
  const response = await fetch(`${config.apiUrl}/artista/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(artista),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }
  console.log("Atualização OK:", text);
}

  static async saveUserLocal(user: any) {
    await AsyncStorage.setItem('@login', JSON.stringify(user));
  }

  static async getUserLocal() {
    const user = await AsyncStorage.getItem('@login');
    return user ? JSON.parse(user) : null;
  }

  static async getById(id: number) {
    const response = await fetch(`${config.apiUrl}/artista/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    return response.json();
  }

  static validarCadastro(dados: any): ErroValidacao {
    const erro = new ErroValidacao();

    if (!dados.nome || !dados.email || !dados.senha) {
      return erro.invalido("Todos os campos são obrigatórios");
    }

    if (!ValidationService.validarEmail(dados.email)) {
      return erro.invalido("Email inválido");
    }

    if (!ValidationService.validarSenha(dados.senha)) {
      return erro.invalido("Senha deve ter no mínimo 6 caracteres");
    }

    if (dados.senha !== dados.confirmaSenha) {
      return erro.invalido("As senhas não conferem");
    }

    return erro;
  }
}