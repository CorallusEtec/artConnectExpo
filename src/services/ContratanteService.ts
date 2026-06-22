import { ContratanteResponse } from "@/models/response/ContratanteResponse";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export interface ContratanteCadastroDTO {
  nome: string;
  email: string;
  senha: string;
  razaoSocial: string | null;
  cnpj: string | null;
  cpf: string | null;
  tipo: "cnpj" | "cpf";
}

async function getToken(): Promise<string> {
  const tokenData = await AsyncStorage.getItem("@artconnect:token");
  if (!tokenData) {
    throw new Error("Usuário não autenticado");
  }
  const tokenParse: AuthLoginResponse = JSON.parse(tokenData);
  return tokenParse.token;
}

export class ContratanteService {
  static async findById(idContratante: number) {
    const response = await config.axiosClient.get<ContratanteResponse>(
      `${config.apiUrl}/contratante/${idContratante}`,
    );

    return response.data;
  }

  static async edit(payload: ContratanteEditDTO) {
    const token = await getToken();

    const response = await config.axiosClient.put(
      `${config.apiUrl}/contratante/edit`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  }

  static async save(contratante: ContratanteCadastroDTO) {
    const response = await config.axiosClient.post(
      `${config.apiUrl}/contratante/save`,
      contratante,
      { params: { tipo: contratante.tipo } },
    );

    return response.data;
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

export function useContratanteByIdQuery(idContratante: number) {
  return useQuery({
    queryKey: ["contratante", idContratante],
    queryFn: () => ContratanteService.findById(idContratante),
    enabled: !!idContratante,
  });
}

export function useEditContratanteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ContratanteEditDTO) =>
      ContratanteService.edit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contratante"] });
    },
  });
}

export function useSaveContratanteMutation() {
  return useMutation({
    mutationFn: (contratante: ContratanteCadastroDTO) =>
      ContratanteService.save(contratante),
  });
}