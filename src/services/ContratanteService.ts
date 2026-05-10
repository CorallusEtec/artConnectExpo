import config from './config';

interface ContratanteCadastroDTO {
  nome: string;
  email: string;
  senha: string;
  razaoSocial: string | null;
  cnpj: string | null;
  cpf: string | null;
  tipo: 'cnpj' | 'cpf';
}

export default class ContratanteService {
    static async getById(id: number) {
        const response = await fetch(`${config.apiUrl}/contratante/${id}`);

        if(!response.ok) {
            throw new Error("Erro ao buscar usuario");
        }

        return response.json();
    }

    static async save(contratante: ContratanteCadastroDTO) {
        try {
            const response = await fetch(`${config.apiUrl}/contratante/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contratante),
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text);
            }

            return text;
        } catch (error) {
            console.error("Erro ao salvar contratante:", error);
            throw error;
        }
    }
}