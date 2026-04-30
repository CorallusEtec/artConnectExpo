import { ErroValidacao } from "@/services/ErroValidacao";
import config from "./config";

export default class LoginService {

    static async login(email: string, senha: string) {
    try {
      const response = await fetch(`${config.apiUrl}/login/logar?email=${email}&senha=${senha}`);

      if (!response.ok) {
      throw new Error("Email ou senha inválidos");
    }

      const data = await response.json();
      return data;
    } catch (erro) {
      throw erro;
    }
  }

  static validarLogin(dados: {email:string, senha:string}): ErroValidacao {
      const erro = new ErroValidacao();
  
      if (!dados.email || !dados.senha) {
        return erro.invalido("Todos os campos são obrigatórios");
      }
      return erro;
    }
}