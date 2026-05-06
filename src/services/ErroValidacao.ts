export class ErroValidacao {
  valido: boolean;
  mensagem: string;

  constructor() {
    this.valido = true;
    this.mensagem = "";
  }

  invalido(msg: string) {
    this.valido = false;
    this.mensagem = msg;
    return this;
  }
}