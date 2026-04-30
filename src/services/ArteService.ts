import config from "./config";

interface Arte {
  id: number;
  nomeArte: string;
}

export default class ArteService {
  static async findAll(): Promise<Arte[]> {
    try {
      const response = await fetch(`${config.apiUrl}/arte/findAll`);
      const data: Arte[] = await response.json();
      return data;
    } catch (erro) {
      console.error(erro);
      return [];
    }
  }
}