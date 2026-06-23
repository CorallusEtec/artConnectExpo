export const tipoMidia = ["IMAGEM", "VIDEO", "AUDIO"] as const; // Const para o schema do zod
export type TipoMidia = (typeof tipoMidia)[number];

export type TipoConta = "ARTISTA" | "CONTRATANTE" | "CONVIDADO";

export type TipoReacao = "LIKE" | "DISLIKE";

export type TipoStatus = "ATIVO" | "INATIVO" | "BLOQUEADO" | "PENDENTE";

/** Serve para tipar os tipos de componentes 'reagiveis' da aplicação */
export type TipoRecurso = "COMENTARIO" | "PUBLICACAO";
