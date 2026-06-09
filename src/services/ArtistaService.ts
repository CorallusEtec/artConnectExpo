import config from "./config";

export interface ArtistaCadastroDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface ArtistaEditDTO {
  nome?: string;
  textoBio?: string;
  contatos?: any[];
  arte?: { id: number };
  nomeArtistico?: string;
  dataNasc?: string;
  nomeLog?: string;
  numLog?: number;
  cep?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;

  tipoArtista?: string;
  genero?: string;
  estilo?: string;
}
export default class ArtistaService {
  /**
   *
   * @param filtros
   * @deprecated Use
   * @returns
   */
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
