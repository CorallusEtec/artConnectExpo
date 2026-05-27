import { useQuery } from "@/hooks/useQuery";
import config from "./config";

export default class ReacaoService {

  static async reagirPost(
    postId:number,
    usuarioId:number,
    tipo:string
  ){

    const response = await useQuery({
      url:`${config.apiUrl}/reacoes/post/${postId}/reagir`,
      method:"POST",
      body:JSON.stringify({
        idAutor:usuarioId,
        nomeTipoReacao:tipo
      }),
    });
    const text =
      await response.text()

    if(!text)
      return {}

    return JSON.parse(text)
  }

  static async getReacaoPost(postId: number, usuarioId: number) {
  const response = await useQuery({
    url: `${config.apiUrl}/reacoes/post/${postId}?usuarioId=${usuarioId}`,
    method: "GET",
  });

  const text = await response.text();
  if (!text) return { empty: true };
  return JSON.parse(text);
}
}