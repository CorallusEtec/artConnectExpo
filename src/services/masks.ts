export default class masks {

  static unmask(value: string) {
    return (value || "").replace(/\D/g, "");
  }

  static telefone(value: string) {
    const v = masks.unmask(value);

    if (v.length <= 10) {
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }

    return v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

    static handleTelefone(digitosAtuais: string, novoTexto: string): string {
        const novosDigitos = masks.unmask(novoTexto);
        const deletou = novoTexto.length < masks.telefone(digitosAtuais).length;

        if (novosDigitos === digitosAtuais && deletou) {
            return digitosAtuais.slice(0, -1);
        }
        return novosDigitos;
    }
}