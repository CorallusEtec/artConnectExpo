import { Dispatch, SetStateAction } from "react";
import { Contato } from "./types";

export function adicionarContato(
  setLista: Dispatch<SetStateAction<Contato[]>>,
  tipo: number
) {
  setLista((prev) => [...prev, { valor: "", tipo, id: undefined }]);
}

export function atualizarContato(
  setLista: Dispatch<SetStateAction<Contato[]>>,
  index: number,
  valor: string
) {
  setLista((prev) => {
    const copy = [...prev];
    copy[index] = { ...copy[index], valor };
    return copy;
  });
}