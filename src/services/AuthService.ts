import config from "./config";

export interface UsuarioLoginRequest {
  email: string;
  senha: string;
}

export class AuthService {
  static async login(loginRequest: UsuarioLoginRequest) {
    return await config.axiosClient.post(
      `${config.apiUrl}/auth/login`,
      loginRequest,
    );
  }
}
