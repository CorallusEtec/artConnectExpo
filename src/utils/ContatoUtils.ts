import { TipoContato } from "@/models/enumeration/TipoContato";

const ICONE_POR_TIPO_CONTATO: Record<number, string> = {
  [TipoContato.TELEFONE]: "whatsapp",
  [TipoContato.TELEGRAM]: "send",
  [TipoContato.INSTAGRAM]: "instagram",
  [TipoContato.EMAIL]: "email",
};

export function iconePorTipoContato(idTipoContato?: number): string {
  return (idTipoContato && ICONE_POR_TIPO_CONTATO[idTipoContato]) || "card-account-phone-outline";
}

//links para entrar em contato com a pessoa

type ContatoLink = {
  tipoContato?: { idTipoContato: number };
  valorContato: string;
};

const LINK_POR_TIPO_CONTATO: Record<number, (valor: string) => string> = {
  [TipoContato.TELEFONE]: (valor) => `https://wa.me/55${valor.replace(/\D/g, "")}`,
  [TipoContato.TELEGRAM]: (valor) => `https://t.me/${valor.replace("@", "")}`,
  [TipoContato.INSTAGRAM]: (valor) => `https://instagram.com/${valor.replace("@", "")}`,
};

export function linkPorContato(contato: ContatoLink): string | null {
  const idTipoContato = contato.tipoContato?.idTipoContato;
  if (!idTipoContato) return null;

  const montarLink = LINK_POR_TIPO_CONTATO[idTipoContato];
  return montarLink ? montarLink(contato.valorContato) : null;
}