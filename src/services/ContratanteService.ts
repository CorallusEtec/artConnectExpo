import config from "./config";
import { ErroValidacao } from "./ErroValidacao";
import { ValidationService } from "./ValidacaoService";

export interface ContratanteEditDTO {
  nome?: string;
  textoBio?: string;
  nomeLog?: string;
  numLog?: number;
  cep?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  razaoSocial?: string;
}

interface ContratanteCadastroDTO {
  nome: string;
  email: string;
  senha: string;
  razaoSocial: string | null;
  cnpj: string | null;
  cpf: string | null;
  tipo: "cnpj" | "cpf";
}

export default class ContratanteService {
   static async edit(token: string, payload: ContratanteEditDTO): Promise<void> {
      try {
        const response = await fetch(`${config.apiUrl}/contratante/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.message || await response.text() || "Erro ao editar contratante";
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error("Erro ao editar contratante:", error);
        throw error;
      }
    }

  static async save(contratante: ContratanteCadastroDTO) {
    try {
      const response = await fetch(
        `${config.apiUrl}/contratante/save?tipo=${contratante.tipo}`,
        {
          body: JSON.stringify(contratante),
          method: "POST",
        },
      );

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
