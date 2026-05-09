import config from './config';

export default class ArtistaService {
    static async getById(id: number) {
        const response = await fetch(`${config.apiUrl}/artista/${id}`);

        if(!response.ok) {
            throw new Error("Erro ao buscar usuario");
        }

        return response.json();
    }
}