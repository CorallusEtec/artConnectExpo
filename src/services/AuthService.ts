import { useAuth } from "@/contexts/AuthContext";
import { AuthLoginRequest } from "@/models/request/AuthLoginRequest";
import { AuthRegisterRequest } from "@/models/request/AuthRegisterRequest";
import { useMutation } from "@tanstack/react-query";
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

export class AuthService {
  static async login(loginRequest: AuthLoginRequest) {
    return await config.axiosClient.post(
      `${config.apiUrl}/auth/login`,
      loginRequest,
    );
  }

  static async register(cadastroRequest: AuthRegisterRequest) {
    const response = await config.axiosClient.post(
      `${config.apiUrl}/auth/register`,
      cadastroRequest,
    );

    return response;
  }
}
