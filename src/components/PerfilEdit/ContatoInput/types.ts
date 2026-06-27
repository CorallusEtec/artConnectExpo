export type Contato = {
  id?: number;
  valor: string;
  tipo: number;
};

export type ContatoInputProps = {
  titulo: string;
  valorInicial?: Contato[];
  tipo: number;
  placeholder: string;
  onChange: (contatos: Contato[]) => void;
  onRemover: (index: number) => void;
};