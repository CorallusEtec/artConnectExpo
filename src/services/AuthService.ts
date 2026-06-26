import { useAuth } from "@/contexts/AuthContext";
import { AuthLoginRequest } from "@/models/request/AuthLoginRequest";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import config from "./config";

export function useLoginMutate() {
  const { signIn } = useAuth();
  const mutate = useMutation({
    mutationFn: (data: AuthLoginRequest) => AuthService.login(data),

    onSuccess: (data) => {
      (async () => {
        await signIn(data.data);
      })();
    },
  });
  return mutate;
}

export function useCadastroMutate() {
  const mutate = useMutation({
    mutationFn: (request: FormData) => AuthService.register(request),
  });

  return mutate;
}

export class AuthService {
  static async login(loginRequest: AuthLoginRequest) {
    return await config.axiosClient.post(
      `${config.apiUrl}/auth/login`,
      loginRequest,
    );
  }

  static async register(cadastroRequest: FormData) {
    const response = await axios.post(
      `${config.apiUrl}/auth/register`,
      cadastroRequest,
    );

    return response;
  }
}
