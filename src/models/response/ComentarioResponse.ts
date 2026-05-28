export interface ComentarioResponse {
    id: number,
    statusComentario: {
        id: number,
        tipoStatus: {
            id: number,
            nomeTipoStatus: string
        },
        descricao: string | null,
        dataModificacao: string
    },
    dataComentario: string | null,
    mensagem: string,
    autor: {
        nome: string
    },
    idPublicacao: number,
    reacoes: {
        usuario: { id: number },
        tipoReacao: { nomeTipo: string }
    }[]
}