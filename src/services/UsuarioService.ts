import { useQuery } from "@/hooks/useQuery";
import config from "./config";

export class UsuarioService {
  async listar(params?: any) {

    const queryParams = new URLSearchParams();

    if (params?.nome) {
      queryParams.append("nome", params.nome);
    }

    if (params?.tipoConta) {
      queryParams.append(
        "tipoConta",
        params.tipoConta
      );
    }

    if (params?.cidade) {
      queryParams.append("cidade", params.cidade);
    }

    if (params?.uf) {
      queryParams.append("uf", params.uf);
    }

    const response = await fetch(
      `${config.apiUrl}/usuario/findAll?${
        queryParams.toString()
      }`
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao buscar usuários"
      );
    }

    return await response.json();
  }

  async findById(id: number): Promise<any> {
    const response = await useQuery({url: `${config.apiUrl}/usuario/${id}`})

    if(!response.ok) {
      return response.status;
    }

    return await response.json();
  }
}

export default new UsuarioService();
