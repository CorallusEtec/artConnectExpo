import { SearchFiltroParams } from "@/models/request/pageable/SearchFiltroParams";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";

export function useUsuarioByIdQuery(usuarioId: number) {
  const query = useQuery({
    queryKey: [usuarioId, "profileData"],
    queryFn: () => UsuarioService.findById(usuarioId),
  });
  return {
    ...query,
    data: query.data,
  };
}

export function useUsuarioFiltroQuery(params?: SearchFiltroParams) {
  const query = useQuery({
    queryKey: ["usuarioFiltro", params],
    queryFn: () => UsuarioService.listarFiltro(params),
  });
  return {
    ...query,
    data: query.data,
  };
}

export function useUpdateFotoPerfilMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: { uri: string; name?: string; type?: string }) =>
      usuarioService.updateFotoPerfil(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });
}

export class UsuarioService {
  static async listarFiltro(params?: SearchFiltroParams) {
    const response = await config.axiosClient.get<
      PagedResponse<UsuarioResponse>
    >(`${config.apiUrl}/usuario/findAll`, {
      params: params,
    });
    return response;
  }

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

  async findById(id: number, token?: string): Promise<any> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${config.apiUrl}/usuario/${id}`, {
      headers,
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    return await response.json();
  }

  async updateFotoPerfil(file: {
  uri: string;
  name?: string;
  type?: string;
}): Promise<string> {
  const tokenData = await AsyncStorage.getItem("@artconnect:token");
  if (!tokenData) {
    throw new Error("Usuário não autenticado");
  }

  const tokenParse: AuthLoginResponse = JSON.parse(tokenData);

  const uriParts = file.uri.split('.');
  const fileExtension = uriParts[uriParts.length - 1] || "jpg";
  const mimeType = file.type || `image/${fileExtension === 'png' ? 'png' : 'jpeg'}`;
  const fileName = file.name || `foto-perfil-${Date.now()}.${fileExtension}`;

  const formData = new FormData();
  
  formData.append("file", {
    uri: file.uri,
    name: fileName,
    type: mimeType,
  } as any);

  const response = await config.axiosClient.put(
    `${config.apiUrl}/usuario/foto-perfil`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${tokenParse.token}`,
      },
    },
  );

  return response.data?.message || "Foto de perfil atualizada com sucesso!";
}

  /**
   * Busca os dados atualizados do usuário incluindo a nova foto
   */
  async getCurrentUser(): Promise<any> {
    const tokenData = await AsyncStorage.getItem("@artconnect:token");
    if (!tokenData) {
      throw new Error("Usuário não autenticado");
    }

    const tokenParse: AuthLoginResponse = JSON.parse(tokenData);
    return await this.findById(tokenParse.id, tokenParse.token);
  }

  static async listarArtistasFiltro(params?: SearchFiltroParams) {
    const response = await config.axiosClient.get<PagedResponse<UsuarioResponse>>(
      `${config.apiUrl}/artista/findAll`,
      { params: params }
    );
    return response;
  }
}

  export function useArtistaFiltroSearchQuery(params?: SearchFiltroParams) {
    const query = useQuery({
      queryKey: ["artistaFiltroSearch", params],
      queryFn: () => UsuarioService.listarArtistasFiltro(params),
    });
    return { ...query, data: query.data };
  }

const usuarioService = new UsuarioService();
export default usuarioService;