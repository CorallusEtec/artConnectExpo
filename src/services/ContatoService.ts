import { ErroValidacao } from "@/services/ErroValidacao";
import config from './config';
import { useQuery } from "@/hooks/useQuery";

export interface ContatoSaveDTO {
    valorContato: string;
    idUsuario: number;
    idTipoContato: number;
}

export interface ContatoEditDTO {
    valorContato: string;
}

export default class ContatoService {

    static async save(contato: ContatoSaveDTO): Promise<string> {
        const response = await useQuery({
            url: `${config.apiUrl}/contato/save`,
            method: "POST",
            body: JSON.stringify(contato),
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(text);
        }

        return text;
    }

    static async delete(idContato: number): Promise<string> {
        const response = await useQuery({
            url: `${config.apiUrl}/contato/${idContato}`,
            method: "DELETE",
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(text);
        }

        return text;
    }

    static async edit(idContato: number, editRequest: ContatoEditDTO): Promise<string> {
        const response = await useQuery({
            url: `${config.apiUrl}/contato/${idContato}`,
            method: "PUT",
            body: JSON.stringify(editRequest)
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(text);
        }

        return text;
    }
}