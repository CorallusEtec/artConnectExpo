import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

export function useUsuarioByIdQuery(id: number) {
  const query = useQuery({
    queryKey: ["profileData"],
    queryFn: () => UsuarioService.findById(id),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
  });
  return {
    ...query,
    data: query.data,
  };
}

export class UsuarioService {
  async listar(params?: any) {
    const queryParams = new URLSearchParams();

    if (params?.nome) {
      queryParams.append("nome", params.nome);
    }

    if (params?.tipoConta) {
      queryParams.append("tipoConta", params.tipoConta);
    }

    if (params?.cidade) {
      queryParams.append("cidade", params.cidade);
    }

    if (params?.uf) {
      queryParams.append("uf", params.uf);
    }

    const response = await fetch(
      `${config.apiUrl}/usuario/findAll?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    return await response.json();
  }
  static async findById(id: number) {
    const reponse = await config.axiosClient.get<UsuarioResponse>(
      `${config.apiUrl}/usuario/${id}`,
    );

    return reponse;
  }
}

export default new UsuarioService();
