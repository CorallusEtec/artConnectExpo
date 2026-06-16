import React, { useState } from "react";
import { SegmentedButtons } from "react-native-paper";

export function ScopeTabs() {
  const [escopo, setEscopo] = useState("");

  return (
    <SegmentedButtons
      value={escopo}
      onValueChange={setEscopo}
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
