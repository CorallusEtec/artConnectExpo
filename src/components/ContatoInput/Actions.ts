import { Contato } from "./types";

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
    prev.map((c, i) =>
      i === index ? { ...c, valor: text } : c
    )
  );
}

export function removerContato(
  setLista: React.Dispatch<React.SetStateAction<Contato[]>>,
  index: number
) {
  setLista(prev => {
    const copy = [...prev];
    copy.splice(index, 1);
    return copy;
  });
}