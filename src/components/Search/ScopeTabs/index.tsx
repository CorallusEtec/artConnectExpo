import { useSearch } from "@/contexts/SearchContext";
import { useUsuarioFiltroQuery } from "@/services/UsuarioService";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Divider, SegmentedButtons, Text } from "react-native-paper";
import EmptyState from "../EmptyState";

export function ScopeTabs() {
  const { tipoFiltro, form } = useSearch();
  const [escopo, setEscopo] = useState(tipoFiltro.current);
  const { data, refetch } = useUsuarioFiltroQuery(form.current);

  function handleEscopo(value: "Publicacao" | "Usuario") {
    tipoFiltro.current = value;
    setEscopo(value);
  }
  return (
    <View>
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
          },
        ]}
      />
      <Button
        mode="contained"
        style={{
          marginTop: 16,
          borderRadius: 8,
          paddingVertical: 4,
        }}
        onPress={() => refetch()}
      >
        Buscar
      </Button>
      {form.current.nome?.trim() != "" || form.current.legenda?.trim() != "" ? (
        <>
          <Text>Usuarios encontrados: {data?.data.content.length}</Text>
          <ScrollView style={{ marginBottom: 200 }}>
            {data?.data.content.map((item) => (
              <>
                <TouchableOpacity
                  key={item.id}
                  style={{ padding: 20 }}
                  onPress={() => console.log(item.nome)}
                >
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
                <Divider />
              </>
            ))}
          </ScrollView>
        </>
      ) : (
        <EmptyState />
      )}
    </View>
  );
}
