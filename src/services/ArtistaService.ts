import { ArtistaResponse } from "@/models/response/ArtistaResponse";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";

export interface ArtistaEditDTO {
  nome?: string;
  textoBio?: string;
  nomeLog?: string;
  numLog?: number;
  cep?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  arte?: { id: number };
  generosArte?: { id: number }[];
}

export interface ArtistaFiltro {
  tipoArtista?: string;
  genero?: string;
  estilo?: string;
  nome?: string;
}

async function getToken(): Promise<string> {
  const tokenData = await AsyncStorage.getItem("@artconnect:token");
  if (!tokenData) {
    throw new Error("Usuário não autenticado");
  }
  const tokenParse: AuthLoginResponse = JSON.parse(tokenData);
  return tokenParse.token;
}

export class ArtistaService {
  static async edit(payload: ArtistaEditDTO) {
    const token = await getToken();

    const response = await config.axiosClient.put(
      `${config.apiUrl}/artista/edit`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  }

  static async findById(artistaId: number) {
    const response = await config.axiosClient.get<ArtistaResponse>(
      `${config.apiUrl}/artista/${artistaId}`,
    );

    return response.data;
  }

  static async listar(filtros?: ArtistaFiltro) {
    const response = await config.axiosClient.get(
      `${config.apiUrl}/artista/findAll`,
      { params: filtros },
    );

    return response.data;
  }
}

export function useArtistaByIdQuery(artistaId: number) {
  return useQuery({
    queryKey: ["artista", artistaId],
    queryFn: () => ArtistaService.findById(artistaId),
    enabled: !!artistaId,
  });
}

export function useArtistaFiltroQuery(filtros?: ArtistaFiltro) {
  return useQuery({
    queryKey: ["artistaFiltro", filtros],
    queryFn: () => ArtistaService.listar(filtros),
  });
}

export function useEditArtistaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ArtistaEditDTO) => ArtistaService.edit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artista"] });
    },
  });
}