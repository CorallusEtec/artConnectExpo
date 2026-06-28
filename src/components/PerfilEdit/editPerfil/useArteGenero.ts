import { useArteList } from "@/services/ArteService";
import { useGeneroArteByArte } from "@/services/GeneroArteService";
import { useEffect, useRef, useState } from "react";

export function useArteGenero(arteInicial: number | null, generosIniciais: number[] = []) {
  const [arteSelecionada, setArteSelecionada] = useState<number | null>(arteInicial);
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>(generosIniciais);

  const prevArteRef = useRef<number | null | undefined>(undefined);
  const prevGenerosRef = useRef<string>("");

  useEffect(() => {
    if (arteInicial !== prevArteRef.current) {
      prevArteRef.current = arteInicial;
      setArteSelecionada(arteInicial);
    }
  }, [arteInicial]);

  useEffect(() => {
    const key = JSON.stringify(generosIniciais);
    if (key !== prevGenerosRef.current) {
      prevGenerosRef.current = key;
      setGenerosSelecionados(generosIniciais);
    }
  }, [generosIniciais]);

  const { tiposArte: tiposArteResp } = useArteList();
  const tiposArte = tiposArteResp?.data?.content ?? [];

  const { generosArte, isFetching: carregandoGeneros } = useGeneroArteByArte(
    arteSelecionada ?? undefined
  );

  function handleSelecionarArte(id: number | null) {
    setArteSelecionada(id);
    setGenerosSelecionados([]);
  }

  function handleToggleGenero(id: number) {
    setGenerosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  return {
    tiposArte,
    arteSelecionada,
    generosArte,
    carregandoGeneros,
    generosSelecionados,
    handleSelecionarArte,
    handleToggleGenero,
  };
}