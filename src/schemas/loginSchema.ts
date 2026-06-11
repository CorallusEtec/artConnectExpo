import * as z from "zod";

/**
 * Schema de validação do login
 */
export const schema = z.object({
  email: z.email("O email é inválido"),
  senha: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});
