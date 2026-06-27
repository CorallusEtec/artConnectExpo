import { z } from 'zod';

export const perfilSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  textoBio: z.string().optional(),
  nomeLog: z.string().optional(),
  numLog: z.string().optional(),
  cep: z.string().optional(),
  bairro: z.string().optional(),
  complemento: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  razaoSocial: z.string().optional(),
});

export type PerfilFormData = z.infer<typeof perfilSchema>;