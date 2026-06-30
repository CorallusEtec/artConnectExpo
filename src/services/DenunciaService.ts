import { useAuth } from "@/contexts";
import { DenunciaSaveRequest } from "@/models/request/DenunciaSaveRequest";
import { useMutation } from "@tanstack/react-query";
import config from "./config";

export function useMutateDenuncia() {
  const { getValidateToken } = useAuth();
  const mutate = useMutation({
    mutationFn: (request: DenunciaSaveRequest) =>
      DenunciaService.save(request, getValidateToken()),
  });
  return mutate;
}

class DenunciaService {
  static async save(request: DenunciaSaveRequest, token: string) {
    const response = await config.axiosClient.post(
      `${config.apiUrl}/denuncia/save`,
      request,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response;
  }
}
