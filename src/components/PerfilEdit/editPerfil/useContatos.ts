import { TipoContato } from "@/models/enumeration/TipoContato";
import { useEffect, useRef, useState } from "react";
import { Contato } from "../ContatoInput/types";

export function useContatos(contatosIniciais: any[] = []) {
  const [contatosEmail, setContatosEmail] = useState<Contato[]>([]);
  const [contatosTelegram, setContatosTelegram] = useState<Contato[]>([]);
  const [contatosInstagram, setContatosInstagram] = useState<Contato[]>([]);
  const [contatosTelefone, setContatosTelefone] = useState<Contato[]>([]);

  const prevContatosRef = useRef<string>("");

  function mapearContatos(tipo: number): Contato[] {
    if (!contatosIniciais || contatosIniciais.length === 0) return [];
    return contatosIniciais
      .filter((c: any) => c.tipoContato?.idTipoContato === tipo)
      .map((c: any): Contato => ({
        id: c.idContato,
        valor: c.valorContato || "",
        tipo,
      }));
  }

  useEffect(() => {
    const currentKey = JSON.stringify(contatosIniciais);
    if (prevContatosRef.current === currentKey) return;
    prevContatosRef.current = currentKey;

    setContatosEmail(mapearContatos(TipoContato.EMAIL));
    setContatosTelegram(mapearContatos(TipoContato.TELEGRAM));
    setContatosInstagram(mapearContatos(TipoContato.INSTAGRAM));
    setContatosTelefone(mapearContatos(TipoContato.TELEFONE));
  }, [contatosIniciais]);

  return {
    contatosEmail,
    setContatosEmail,
    contatosTelegram,
    setContatosTelegram,
    contatosInstagram,
    setContatosInstagram,
    contatosTelefone,
    setContatosTelefone,
  };
}