import { UsuarioResponse } from "./UsuarioResponse"

interface ReacaoDetails {
    totalReacoes: number,
    tipoReacao: {
        id: number,
        nomeTipo: string
    }
}

export interface PublicacaoResponse {
    id: number,
    legenda: string,
    urlMidia: string | null,
    dataPublicacao: string,
    autor: UsuarioResponse
    totalReacoes: null | number,
    totalComentarios: number,
    reacoes: ReacaoDetails[]
}