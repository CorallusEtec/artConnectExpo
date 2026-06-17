import z from "zod";

export const schema = z.object({
  nome: z.string().trim().min(3),
  email: z.email("O email é inválido"),
  senha: z.string().trim().min(6, "A senha deve conter no mínimo 6 caracteres"),
  senhaConfirm: z.string().trim(),
});
