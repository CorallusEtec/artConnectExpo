import { useSearch } from "@/contexts/SearchContext";
import React, { useState } from "react";
import { SegmentedButtons } from "react-native-paper";

export function ScopeTabs() {
  const [escopo, setEscopo] = useState("");
  const { tipoFiltro } = useSearch();

  function handleEscopo(value: "Publicacao" | "Usuario") {
      tipoFiltro.current = value
    setEscopo(value)
  }
  return (
    <SegmentedButtons
      value={escopo as "Publicacao" | "Usuario"}
      onValueChange={handleEscopo}
      buttons={[
        {
          value: "Publicacao",
          label: "Publicações",
        },
        {
          value: "Usuario",
          label: "Usuários",
        }
      ]}
    />
  );
}
