import config from "./config";
import { ContatoEdit } from "@/models/request/ContatoEditRequest";
import { ContatoSave } from "@/models/request/ContatoSaveRequest";

export default class ContatoService {
  /** Salva um novo contato do usuário autenticado.
   *
   * @param payload Dados do contato a ser salvo.
   * @param token Token do usuário autenticado.
   */
  static async save(payload: ContatoSave, token: string) {
    const response = await config.axiosClient.post(
      `${config.apiUrl}/contato/save`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  }

  /** Edita o valor de um contato existente.
   *
   * @param idContato Id do contato a ser editado.
   * @param payload Novo valor do contato.
   * @param token Token do usuário autenticado.
   */
  static async edit(idContato: number, payload: ContatoEdit, token: string) {
    const response = await config.axiosClient.put(
      `${config.apiUrl}/contato/${idContato}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  }

  /** Exclui um contato pelo Id.
   *
   * @param idContato Id do contato a ser excluído.
   * @param token Token do usuário autenticado.
   */
  static async delete(idContato: number, token: string) {
    const response = await config.axiosClient.delete(
      `${config.apiUrl}/contato/${idContato}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  }
}