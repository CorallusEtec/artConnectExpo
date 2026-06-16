import { ContratanteResponse } from "@/models/response/ContratanteResponse";
import config from "./config";

export class ContratanteService {
  static async findById(idContratante: number) {
    const response = await config.axiosClient.get<ContratanteResponse>(
      `${config.apiUrl}/contratante/${idContratante}`,
    );
    return response;
  }
}
