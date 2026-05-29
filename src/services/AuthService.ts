import { AuthLoginRequest } from "@/models/request/AuthLoginRequest";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import config from "./config";
import { AuthRegisterRequest } from "@/models/request/AuthRegisterRequest";
import { useQuery } from "@/hooks/useQuery";

export class AuthService {
    static async login(loginRequest: AuthLoginRequest): Promise<AuthLoginResponse> {
        const request = await useQuery({
            method: "POST", 
            url:`${config.apiUrl}/auth/login`, 
            body:JSON.stringify(loginRequest)
        })
        
       
        return request.json()
    }

    static async register(registerRequest: AuthRegisterRequest) {
        await useQuery({
            url: `${config.apiUrl}/auth/register`,
            body: JSON.stringify(registerRequest),
            method: "POST",
        });

    }
}