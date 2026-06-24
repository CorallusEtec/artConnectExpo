export interface ContatoResponse {
  idContato?: number;
  valorContato: string;

  tipoContato?: {
    idTipoContato: number;
    descricao?: string;
  };
}