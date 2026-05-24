import { ErroValidacao } from "@/services/ErroValidacao";
import config from './config';

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
        const response = await fetch(`${config.apiUrl}/contato/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contato),
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(text);
        }

        return text;
    }

    static async delete(idContato: number): Promise<string> {
        const response = await fetch(`${config.apiUrl}/contato/${idContato}`, {
            method: 'DELETE',
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(text);
        }

        return text;
    }

    static async edit(idContato: number, editRequest: ContatoEditDTO): Promise<string> {
        const response = await fetch(`${config.apiUrl}/contato/${idContato}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(editRequest),
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(text);
        }

        return text;
    }
}