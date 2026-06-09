import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import config from "./config";

export interface UsuarioLoginRequest {
  email: string;
  senha: string;
}

export class AuthService {
  static async login(
    loginRequest: UsuarioLoginRequest,
  ): Promise<AuthLoginResponse> {
    const response = await fetch(`${config.apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRequest),
    });
    if (!response.ok) {
      throw new Error("Não foi possível logar.");
    }

    return await response.json();
  }
}
