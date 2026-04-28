import config from "./config";

export default class LoginService {

    static async login(email: string, senha: string) {
    try {
      const response = await fetch(`${config.apiUrl}/login/logar?email=${email}&senha=${senha}`);

      if (!response.ok) {
        throw new Error("Login inválido");
      }

      const data = await response.json();
      return data;
    } catch (erro) {
      throw erro;
    }
  }
}