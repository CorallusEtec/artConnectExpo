import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import config from "./config";


export class ComentarioService {
    static async findByPost(postId: number): Promise<ComentarioResponse[]> {
        try {
            const data = await fetch(`${config.apiUrl}/comentario/findByPost/${postId}`);

            return data.json();

        } catch (erro) {
            throw Error("Erro ao buscar os posts");
        }
    }
}