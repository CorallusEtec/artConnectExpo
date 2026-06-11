import z from "zod";

export const schema = z.object({
  nome: z.string().min(3, "O nome deve ter mínimo 3 caracteres"),
  email: z.email("O email é inválido"),
  senha: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});
