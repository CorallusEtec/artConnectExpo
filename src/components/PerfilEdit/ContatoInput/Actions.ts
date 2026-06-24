import { Contato } from "./types";
import ContatoService from "@/services/ContatoService";

export function adicionarContato(
  setLista: React.Dispatch<React.SetStateAction<Contato[]>>,
  tipo: number
) {
  setLista(prev => [...prev, { valor: "", tipo }]);
}

export function atualizarContato(
  setLista: React.Dispatch<React.SetStateAction<Contato[]>>,
  index: number,
  text: string
) {
  setLista(prev =>
    prev.map((c, i) => (i === index ? { ...c, valor: text } : c))
  );
}

export async function removerContato(
  setLista: React.Dispatch<React.SetStateAction<Contato[]>>,
  lista: Contato[],
  index: number,
  token: string
) {
  const contato = lista[index];

  if (contato.id) {
    await ContatoService.delete(contato.id, token);
  }

  setLista(prev => {
    const copy = [...prev];
    copy.splice(index, 1);
    return copy;
  });
}