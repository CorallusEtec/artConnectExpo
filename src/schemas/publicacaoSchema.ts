import { tipoMidia } from "@/models/enumeration/enumeration";
import z from "zod";

export const publicacaoSchema = z
  .object({
    legenda: z.string().optional(),
    conteudo: z
      .object({
        tipo: z.literal(tipoMidia),
        url: z.url(),
        name: z.string(),
        mimeType: z.string(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Verifica se pelo menos um dos campos existe e tem valor
      const temLegenda =
        data.legenda !== undefined && data.legenda.trim() !== "";
      const temConteudo = data.conteudo !== undefined;

      return temLegenda || temConteudo;
    },
    {
      message: "A publicação deve conter pelo menos uma legenda ou um conteúdo",
      path: ["conteudo"],
    },
  );
