import { ArtistaResponse } from "@/models/response/ArtistaResponse";
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
}

export class ArtistaService {
  static async edit(token: string, payload: ArtistaEditDTO): Promise<void> {
    try {
      const response = await fetch(`${config.apiUrl}/artista/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(token);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          (await response.text()) ||
          "Erro ao editar artista";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Erro ao editar artista:", error);
      throw error;
    }
  }

  static async findById(artistaId: number) {
    const response = await config.axiosClient.get<ArtistaResponse>(
      `${config.apiUrl}/artista/${artistaId}`,
    );

    return response;
  }

  static async listarAntigo(filtros?: {
    tipoArtista?: string;
    genero?: string;
    estilo?: string;
    nome?: string;
  }) {
    const params = new URLSearchParams();
    if (filtros?.nome) params.append("nome", filtros.nome);
    if (filtros?.tipoArtista) params.append("tipoArtista", filtros.tipoArtista);
    if (filtros?.genero) params.append("genero", filtros.genero);
    if (filtros?.estilo) params.append("estilo", filtros.estilo);

    const query = params.toString();
    const url = query
      ? `${config.apiUrl}/artista/findAll?${query}`
      : `${config.apiUrl}/artista/findAll`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao buscar artistas");
    }

    return response.json();
  }
}
