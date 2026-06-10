import { UsuarioLoginRequest } from "@/models/response/UsuarioLoginResponse";
import config from "./config";

export class AuthService {
  static async login(loginRequest: UsuarioLoginRequest) {
    return await config.axiosClient.post(
      `${config.apiUrl}/auth/login`,
      loginRequest,
    );
  }
}
