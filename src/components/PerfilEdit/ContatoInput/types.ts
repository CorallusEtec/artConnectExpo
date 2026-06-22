export interface Contato {
  id?: number;
  valor: string;
  tipo: number;
}

export interface ContatoInputProps {
  titulo: string;
  valorInicial?: Contato[];
  tipo: number;
  placeholder: string;
  onChange: (lista: Contato[]) => void;
  onRemover: (index: number) => void;
}