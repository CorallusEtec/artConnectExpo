import { ErroValidacao } from "@/services/ErroValidacao";
import config from './config';
import { ValidationService } from "./ValidacaoService";

export interface ArtistaCadastroDTO {
    nome: string;
    email: string;
    senha: string;
}

export default class ArtistaService {
    static async getById(id: number) {
        const response = await fetch(`${config.apiUrl}/artista/${id}`);

        if(!response.ok) {
            throw new Error("Erro ao buscar usuario");
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