import { ArtistaEditDTO, ArtistaService } from "@/services/ArtistaService";
import ContatoService from "@/services/ContatoService";
import { ContratanteEditDTO, ContratanteService } from "@/services/ContratanteService";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Contato } from "../ContatoInput/types";
import { PerfilFormData } from "./validation";

export function useSalvarPerfil(
  tipoUsuario: "artista" | "contratante" | null,
  obterToken: () => Promise<any>,
  getValidateId: () => number
) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialog, setDialog] = useState(false);
  const queryClient = useQueryClient();

  function limparUndefined<T extends Record<string, any>>(payload: T): T {
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) delete payload[key];
    });
    return payload;
  }

  function prepararPayloadArtista(
    form: PerfilFormData,
    arteSelecionada: number | null,
    generosSelecionados: number[]
  ): ArtistaEditDTO {
    const payload = limparUndefined<ArtistaEditDTO>({
      nome: form.nome || undefined,
      textoBio: form.textoBio || undefined,
      nomeLog: form.nomeLog || undefined,
      numLog: form.numLog ? Number(form.numLog) : undefined,
      cep: form.cep || undefined,
      bairro: form.bairro || undefined,
      complemento: form.complemento || undefined,
      cidade: form.cidade || undefined,
      uf: form.uf || undefined,
    });

    return {
      ...payload,
      arte: arteSelecionada ? ({ id: arteSelecionada } as any) : null,
      generosArte: generosSelecionados.length
        ? (generosSelecionados.map((id) => ({ id })) as any)
        : [],
    } as ArtistaEditDTO;
  }

  function prepararPayloadContratante(form: PerfilFormData): ContratanteEditDTO {
    return limparUndefined<ContratanteEditDTO>({
      nome: form.nome || undefined,
      textoBio: form.textoBio || undefined,
      nomeLog: form.nomeLog || undefined,
      numLog: form.numLog ? Number(form.numLog) : undefined,
      cep: form.cep || undefined,
      bairro: form.bairro || undefined,
      complemento: form.complemento || undefined,
      cidade: form.cidade || undefined,
      uf: form.uf || undefined,
      razaoSocial: form.razaoSocial || undefined,
    });
  }

  async function salvarContatos(token: string, contatos: Contato[]) {
    const contatosFiltrados = contatos.filter((c) => c.valor.trim());

    for (const contato of contatosFiltrados) {
      if (contato.id) {
        await ContatoService.edit(contato.id, { valorContato: contato.valor }, token);
      } else {
        await ContatoService.save(
          { valorContato: contato.valor, idTipoContato: contato.tipo },
          token
        );
      }
    }
  }

  async function handleSalvar(
    form: PerfilFormData,
    contatos: Contato[],
    arteSelecionada: number | null = null,
    generosSelecionados: number[] = []
  ) {
    if (!tipoUsuario) return;

    try {
      setSaving(true);
      setError(null);

      const tokenParse = await obterToken();
      if (!tokenParse) return;

      if (tipoUsuario === "artista") {
        await ArtistaService.edit(
          prepararPayloadArtista(form, arteSelecionada, generosSelecionados)
        );
      } else {
        await ContratanteService.edit(prepararPayloadContratante(form));
      }

      await salvarContatos(tokenParse.token, contatos);

      setDialog(true);

      queryClient.invalidateQueries({
        queryKey: [getValidateId(), "profileData"],
      });
    } catch (err: any) {
      setError(err.message || "Não foi possível salvar as alterações");
    } finally {
      setSaving(false);
    }
  }

  return {
    saving,
    error,
    dialog,
    handleSalvar,
    fecharDialog: () => setDialog(false),
  };
}