import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { ComentarioRequest } from "@/models/request/ComentarioRequest";
import config from "./config";
import { useQuery } from "@/hooks/useQuery";

export class ComentarioService {
    static domain = `${config.apiUrl}/comentario`

    static async findByPost(postId: number | undefined): Promise<ComentarioResponse[] | null> {
        try {
            if(typeof postId == "undefined") {
                return null;
            } 
                const data = await useQuery({
                    url: `${this.domain}/findByPost/${postId}`
                });
                return data.json();


        } catch (erro) {
            throw Error("Erro ao buscar os posts");
        }
    }

    static async comment(comentario: ComentarioRequest): Promise<void> {
        try {
            await useQuery({
                url:`${this.domain}/comment`,
                method: 'POST',
                body: JSON.stringify(comentario),
            });

        } catch (e) {
            console.error(e)
            throw new Error("Erro ao postar comentario");
        }
    }
}