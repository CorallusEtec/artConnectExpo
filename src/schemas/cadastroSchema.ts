import z from "zod";

export const schema = z
  .object({
    nome: z
      .string({ error: "Campo não preenchido" })
      .trim()
      .min(3, { error: "O nome deve ter no mínimo 3 letras" }),
    email: z.email({ error: "Insira um email inválido" }),
    senha: z
      .string({ error: "Campo não preenchido" })
      .trim()
      .min(6, { error: "A senha deve conter no mínimo 6 caracteres" }),
    senhaConfirm: z
      .string({ error: "Campo não preenchido" })
      .trim()
      .min(6, { error: "A senha deve conter no mínimo 6 caracteres" }),
    isArtista: z.boolean().default(false),
  })
  .refine(({ senha, senhaConfirm }) => senha === senhaConfirm, {
    error: "As senhas não coincidem.",
    path: ["senhaConfirm"],
  });
