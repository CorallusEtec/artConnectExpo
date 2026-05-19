export class ValidationService {
  static emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static validarEmail(email: string) {
    return this.emailPattern.test(email);
  }

  static validarSenha(senha: string) {
    return senha.trim().length >= 6;
  }

  static campoVazio(valor?: string) {
    return !valor || valor.trim() === "";
  }
}