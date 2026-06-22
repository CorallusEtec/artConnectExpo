import { useState } from "react";
import { ArteResponse } from "@/models/response/ArteResponse";
import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { gStyles } from "@/style/gStyle";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";
import { Chip, Menu, Text, TouchableRipple } from "react-native-paper";

type Props = {
  tiposArte: ArteResponse[];
  arteSelecionada: number | null;
  onSelecionarArte: (id: number | null) => void;
  generosArte: GeneroArteResponse[];
  carregandoGeneros: boolean;
  generosSelecionados: number[];
  onToggleGenero: (id: number) => void;
};

export function ArteGeneroFields({
  tiposArte,
  arteSelecionada,
  onSelecionarArte,
  generosArte,
  carregandoGeneros,
  generosSelecionados,
  onToggleGenero,
}: Props) {
  const [menuVisivel, setMenuVisivel] = useState(false);

  const arteAtual = tiposArte.find((a) => a.id === arteSelecionada);
  const labelArte = arteAtual?.nomeArte ?? "Nenhuma";

  function selecionar(id: number | null) {
    onSelecionarArte(id);
    setMenuVisivel(false);
  }

  return (
    <View style={{ marginTop: 12, gap: 8 }}>
      <Text variant="bodyLarge">Arte</Text>

      <Menu
        visible={menuVisivel}
        onDismiss={() => setMenuVisivel(false)}
        anchor={
          <TouchableRipple
            onPress={() => setMenuVisivel(true)}
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <>
              <Text style={{ color: arteAtual ? "#000" : gStyles.cinza[500] }}>
                {labelArte}
              </Text>
              <Feather name="chevron-down" size={18} color={gStyles.cinza[500]} />
            </>
          </TouchableRipple>
        }
      >
        <Menu.Item
          title="Nenhuma"
          onPress={() => selecionar(null)}
          leadingIcon={arteSelecionada === null ? "check" : undefined}
        />
        {tiposArte.map((arte) => (
          <Menu.Item
            key={arte.id}
            title={arte.nomeArte}
            onPress={() => selecionar(arte.id)}
            leadingIcon={arte.id === arteSelecionada ? "check" : undefined}
          />
        ))}
      </Menu>

      {arteSelecionada && (
        <>
          <Text variant="bodyLarge" style={{ marginTop: 8 }}>
            Gêneros
          </Text>

          {carregandoGeneros ? (
            <ActivityIndicator />
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {generosArte.map((genero) => {
                const selecionado = generosSelecionados.includes(genero.id);
                return (
                  <Chip
                    key={genero.id}
                    mode="outlined"
                    selected={selecionado}
                    selectedColor={selecionado ? "#fff" : gStyles.azul[200]}
                    style={selecionado && { backgroundColor: gStyles.azul[200] }}
                    onPress={() => onToggleGenero(genero.id)}
                  >
                    {genero.nomeGeneroArte}
                  </Chip>
                );
              })}
            </View>
          )}
        </>
      )}
    </View>
  );
}