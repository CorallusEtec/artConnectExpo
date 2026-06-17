import { TipoConta } from "@/models/enumeration/enumeration";

export interface SearchFiltroParams {
    nome?: string,
    tipoConta?: TipoConta,
    cidade?: string,
    uf?: string,
    arte?: string,
    nomeArtistico?: string,
    legenda?: string;
    dataInicio?: string;
    dataFim?: string;
    nomeAutor?: string;
    idUsuario?: number;
}