import { useAuth } from "@/contexts/AuthContext";
import { UsuarioLoginRequest } from "@/models/response/UsuarioLoginResponse";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import config from "./config";

export function useLoginMutate() {
  const { signIn, token } = useAuth();
  const mutate = useMutation({
    mutationFn: (data: UsuarioLoginRequest) => AuthService.login(data),

    onSuccess: (data) => {
      (async () => {
        await signIn(data.data);
        router.replace("/home");
      })();
    },
  });
  return mutate;
}

export class AuthService {
  static async login(loginRequest: UsuarioLoginRequest) {
    return await config.axiosClient.post(
      `${config.apiUrl}/auth/login`,
      loginRequest,
    );
  }
}
