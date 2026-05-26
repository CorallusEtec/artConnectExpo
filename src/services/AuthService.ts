import { AuthLoginRequest } from "@/models/request/AuthLoginRequest";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import config from "./config";
import { AuthRegisterRequest } from "@/models/request/AuthRegisterRequest";
import { useQuery } from "@/hooks/useQuery";

export class AuthService {
    static async login(loginRequest: AuthLoginRequest): Promise<AuthLoginResponse> {
        const teste = await useQuery({method: "POST", url:`${config.apiUrl}/auth/login`, body:JSON.stringify(loginRequest)})
        
        const request = await fetch(`${config.apiUrl}/auth/login`,{
            method: "POST",
            body: JSON.stringify(loginRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        return teste.json()
    }

    static async register(registerRequest: AuthRegisterRequest) {
        const request = await fetch(`${config.apiUrl}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerRequest)
        });

        return request.json();
    }
}