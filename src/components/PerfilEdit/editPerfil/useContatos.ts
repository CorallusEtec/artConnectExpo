import { TipoContato } from "@/models/enumeration/TipoContato";
import { useEffect, useRef, useState } from "react";
import { Contato } from "../ContatoInput/types";

export function useContatos(contatosIniciais: any[] = []) {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const prevContatosRef = useRef<string>("");

  useEffect(() => {
    const currentKey = JSON.stringify(contatosIniciais);
    if (prevContatosRef.current === currentKey) return;
    prevContatosRef.current = currentKey;

    if (!contatosIniciais || contatosIniciais.length === 0) {
      setContatos([]);
      return;
    }

    const novoContatos: Contato[] = contatosIniciais.map((c: any) => ({
      id: c.idContato,
      valor: c.valorContato || "",
      tipo: c.tipoContato?.idTipoContato,
    }));

    setContatos(novoContatos);
  }, [contatosIniciais]);

  const contatosEmail = contatos.filter((c) => c.tipo === TipoContato.EMAIL);
  const contatosTelegram = contatos.filter((c) => c.tipo === TipoContato.TELEGRAM);
  const contatosInstagram = contatos.filter((c) => c.tipo === TipoContato.INSTAGRAM);
  const contatosTelefone = contatos.filter((c) => c.tipo === TipoContato.TELEFONE);

  const setContatosEmail = (lista: Contato[]) => {
    const outros = contatos.filter((c) => c.tipo !== TipoContato.EMAIL);
    setContatos([...outros, ...lista]);
  };

  const setContatosTelegram = (lista: Contato[]) => {
    const outros = contatos.filter((c) => c.tipo !== TipoContato.TELEGRAM);
    setContatos([...outros, ...lista]);
  };

  const setContatosInstagram = (lista: Contato[]) => {
    const outros = contatos.filter((c) => c.tipo !== TipoContato.INSTAGRAM);
    setContatos([...outros, ...lista]);
  };

  const setContatosTelefone = (lista: Contato[]) => {
    const outros = contatos.filter((c) => c.tipo !== TipoContato.TELEFONE);
    setContatos([...outros, ...lista]);
  };

  return {
    contatos,
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