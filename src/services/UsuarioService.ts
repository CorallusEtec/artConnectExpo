import config from './config';
import { ErroValidacao } from './ErroValidacao';
import { ValidationService } from './ValidacaoService';

export default class UsuarioService {
    static async getById(id: number) {
        const response = await fetch(`${config.apiUrl}/usuario/${id}`);
        if(!response.ok) {
            throw new Error("Erro ao buscar usuário");
        }
        return response.json();
    }
}