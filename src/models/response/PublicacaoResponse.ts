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
    autor: {
        nome: string
    },
    totalReacoes: null | number,
    totalComentarios: number,
    reacoes: ReacaoDetails[]
}