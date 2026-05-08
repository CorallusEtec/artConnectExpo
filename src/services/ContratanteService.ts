import config from './config';

export default class ContratanteService {
    static async getById(id: number) {
        const response = await fetch(`${config.apiUrl}/contratante/${id}`);

        if(!response.ok) {
            throw new Error("Erro ao buscar usuario");
        }

        return response.json();
    }
}