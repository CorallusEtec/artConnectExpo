export interface Contato {
  id?: number;
  valor: string;
  tipo: number;
}

export interface ContatoInputProps {
  titulo: string;
  lista: Contato[];
  setLista: React.Dispatch<React.SetStateAction<Contato[]>>;
  tipo: number;
  placeholder: string;
  maskFn?: (value: string) => string;
  onMaskChange?: (oldValue: string, newValue: string) => string;
}