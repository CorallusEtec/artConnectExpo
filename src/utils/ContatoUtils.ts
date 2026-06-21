import { TipoContato } from "@/models/enumeration/TipoContato";

const ICONE_POR_TIPO_CONTATO: Record<number, string> = {
  [TipoContato.TELEFONE]: "phone",
  [TipoContato.TELEGRAM]: "send",
  [TipoContato.INSTAGRAM]: "instagram",
  [TipoContato.EMAIL]: "email",
};

export function iconePorTipoContato(idTipoContato?: number): string {
  return (idTipoContato && ICONE_POR_TIPO_CONTATO[idTipoContato]) || "card-account-phone-outline";
}