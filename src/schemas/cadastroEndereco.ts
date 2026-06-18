import z from "zod";

export const schema = z.object({
  logradouro: z.string({ error: "Campo não preenchido" }).trim(),
  cep: z.string({ error: "Campo não preenchido" }).trim(),
  numLog: z.number({ error: "Campo não preenchido" }),
  complemento: z.string().trim().optional(),
  bairro: z.string({ error: "Campo não preenchido" }).trim(),
  cidade: z.string({ error: "Campo não preenchido" }).trim(),
  uf: z.string({ error: "Campo não preenchido" }).trim(),
});
