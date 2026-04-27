import config from './config';

interface ArtistaDTO {
  nome: string;
  email: string;
  senha: string;
}

export default class ArtistaService {

    static async save(artista: ArtistaDTO) {
        try {
            const response = await fetch(`${config.apiUrl}/artista/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(artista),
            });

            const data = await response.text();
            
            if(!response.ok) {
                throw new Error(data || 'erro ao cadastrar');
            }

            return data;
        } catch (error) {
            console.error("Erro ao cadastrar",error);
            throw error;
        }
    }

}

