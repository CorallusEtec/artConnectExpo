import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { ComentarioRequest } from "@/models/request/ComentarioRequest";
import config from "./config";

export class ComentarioService {
    static domain = `${config.apiUrl}/comentario`

    static async findByPost(postId: number | undefined): Promise<ComentarioResponse[] | null> {
        try {
            if(typeof postId == "undefined") {
                return null;
            } 
                const data = await fetch(`${this.domain}/findByPost/${postId}`);
                return data.json();


        } catch (erro) {
            throw Error("Erro ao buscar os posts");
        }
    }

    static async comment(comentario: ComentarioRequest): Promise<void> {
        try {
            const data = await fetch(`${this.domain}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comentario),
            });

        } catch (e) {
            console.error(e)
            throw new Error("Erro ao postar comentario");
        }
    }
}