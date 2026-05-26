export interface AuthRegisterRequest {
    nome: string,
    email: string,
    senha: string,
    tipoConta: "ARTISTA" | "CONTRATANTE_CPF" | "CONTRATANTE_CNPJ",
    razaoSocial?: string,
    cnpj?: string,

}