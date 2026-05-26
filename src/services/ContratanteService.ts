import { useQuery } from '@/hooks/useQuery';
import config from './config';
import { ErroValidacao } from './ErroValidacao';
import { ValidationService } from './ValidacaoService';

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
        const response = await useQuery({url:`${config.apiUrl}/contratante/${id}`});

        if(!response.ok) {
            throw new Error("Erro ao buscar usuario");
        }

        return response.json();
    }

    static async save(contratante: ContratanteCadastroDTO) {
        try {
          const response = await useQuery({
            body: JSON.stringify(contratante),
            method: "POST",
            url:`${config.apiUrl}/contratante/save?tipo=${contratante.tipo}`
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

    static validarCadastro(dados: any): ErroValidacao {
  const erro = new ErroValidacao();

  if (
    !dados.nome ||
    !dados.email ||
    !dados.senha ||
    !dados.tipo ||
    (dados.tipo === "cnpj" && (!dados.razaoSocial || !dados.cnpj))
  ) {
    return erro.invalido("Todos os campos são obrigatórios");
  }

  if (!ValidationService.validarEmail(dados.email)) {
    return erro.invalido("Email inválido");
  }

  if (!ValidationService.validarSenha(dados.senha)) {
    return erro.invalido("Senha deve ter no mínimo 6 caracteres");
  }

  if (dados.senha !== dados.confirmaSenha) {
    return erro.invalido("As senhas não conferem");
  }
  return erro;
}
}