import React from "react"; // Certifique-se de importar o React se não estiver implícito
import { SegmentedButtons } from "react-native-paper";

interface ScopeTabsProps {
  escopo: string;
  // Alterado aqui: aceita tanto uma função simples quanto o Dispatch do useState
  onChange: (value: any) => void; 
}

export default function ScopeTabs({ escopo, onChange }: ScopeTabsProps) {
  return (
    <SegmentedButtons
      value={escopo}
      onValueChange={onChange} 
      buttons={[
        {
          value: "publicacao",
          label: "Publicações",
        },
        {
          value: "artista",
          label: "Usuários",
        },
      ]}
    />
  );
}