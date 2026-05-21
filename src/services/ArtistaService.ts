import { ErroValidacao } from "@/services/ErroValidacao";
import config from './config';
import { ValidationService } from "./ValidacaoService";

export interface ArtistaCadastroDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface ArtistaEditDTO {
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

  tipoArtista?: string;
  genero?: string;
  estilo?: string;
}
export default class ArtistaService {

  static async getById(id: number) {
    const response = await fetch(`${config.apiUrl}/artista/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar usuario");
    }

    return response.json();
  }

  static async listar(filtros?: { tipoArtista?: string; genero?: string; estilo?: string; nome?: string }) {
  const params = new URLSearchParams();
  if (filtros?.nome)        params.append("nome", filtros.nome);
  if (filtros?.tipoArtista) params.append("tipoArtista", filtros.tipoArtista);
  if (filtros?.genero)      params.append("genero", filtros.genero);
  if (filtros?.estilo)      params.append("estilo", filtros.estilo);

  const query = params.toString();
  const url = query
    ? `${config.apiUrl}/artista/findAll?${query}`
    : `${config.apiUrl}/artista/findAll`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar artistas");
  }

  return response.json();
}

  static async save(artista: ArtistaCadastroDTO) {
    try {
      const response = await fetch(`${config.apiUrl}/artista/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(artista),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text);
      }

      return text;
    } catch (error) {
      console.error("Erro ao salvar artista:", error);
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