import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { createContext, useContext } from "react";

const CommentContext = createContext<ComentarioResponse | undefined>(undefined);

// Contexto para compartilhamento dos dados do comentario pelos componentes filhos
export function useCommentContext() {
    const context = useContext(CommentContext);
    if(!context) {
        throw new Error("Os subcomponentes de Comentario devem ser usados dentro de <Comentario />")
    }
    return context
}

export const ComentarioProvider = CommentContext.Provider;