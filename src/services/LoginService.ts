import { ErroValidacao } from "@/services/ErroValidacao";
import config from './config';

export default class LoginService {

    static async login(email: string, senha: string)  {
            const response = await fetch(`${config.apiUrl}/login/logar?email=${email}&senha=${senha}`);

            if(!response.ok) {
                throw new Error('Email ou senha incorretos');
            }
            const data = await response.json();

            const status = data.status?.tipoStatus?.nomeTipoStatus;
            if(status === "SUSPENSO") { throw new Error('Conta suspensa'); }
            if(status === "PENDENTE") { throw new Error('Confirmação de conta pendente'); }

            return data;
    }

    static validarLogin(dados: {email:string, senha:string}): ErroValidacao {
      const erro = new ErroValidacao();
  
      if (!dados.email || !dados.senha) {
        return erro.invalido("Todos os campos são obrigatórios");
      }
      return erro;
    }
}