import { SearchFiltroParams } from "@/models/request/pageable/SearchFiltroParams";
import { ArteResponse } from "@/models/response/ArteResponse";
import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { useArteList } from "@/services/ArteService";
import { useGeneroArteByArte } from "@/services/GeneroArteService";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Chip, Menu, Text, TextInput, TouchableRipple } from "react-native-paper";
import { style } from "./style";

type Props = { 
  form: SearchFiltroParams; 
  setForm: React.Dispatch<React.SetStateAction<SearchFiltroParams>>;
  modalFiltro: boolean;
  resetCounter: number;
};

export function FilterArtistaForm({ form, setForm, modalFiltro, resetCounter }: Props) {
  const [arteSelecionadaId, setArteSelecionadaId] = useState<number | null>(null);
  const [arteSelecionadaNome, setArteSelecionadaNome] = useState<string>("");
  const [menuArteVisivel, setMenuArteVisivel] = useState(false);

  const { tiposArte } = useArteList();
  const { generosArte } = useGeneroArteByArte(arteSelecionadaId ?? undefined);

  useEffect(() => {
    if (!modalFiltro) return;
    if (!tiposArte?.data?.content) return;

    const arte = tiposArte.data.content.find(
      a => a.nomeArte === form.arte
    );
    if (arte) {
      setArteSelecionadaId(arte.id);
      setArteSelecionadaNome(arte.nomeArte);
    } else {
      setArteSelecionadaId(null);
      setArteSelecionadaNome("");
    }
  }, [modalFiltro, tiposArte, form.arte]);

  function selecionarArte(arte: ArteResponse | null) {
    if (arte === null) {
      setArteSelecionadaId(null);
      setArteSelecionadaNome("");
      setForm(prev => ({ ...prev, arte: "", generoArte: "" }));
    } else {
      setArteSelecionadaId(arte.id);
      setArteSelecionadaNome(arte.nomeArte);
      setForm(prev => ({ ...prev, arte: arte.nomeArte, generoArte: "" }));
    }
    setMenuArteVisivel(false);
  }

  function selecionarGenero(genero: GeneroArteResponse) {
    const novoValor = form.generoArte === genero.nomeGeneroArte ? "" : genero.nomeGeneroArte;
    setForm(prev => ({ ...prev, generoArte: novoValor }));
  }

  function handleCidade(text: string) {
    setForm(prev => ({ ...prev, cidade: text }));
  }

  function handleUf(text: string) {
    const upper = text.toUpperCase().slice(0, 2);
    setForm(prev => ({ ...prev, uf: upper }));
  }

  useEffect(() => {
    setArteSelecionadaId(null);
    setArteSelecionadaNome("");
  }, [resetCounter]);

  return (
    <View>
      {/* Arte */}
      <Text style={style.label}>Arte</Text>
      <Menu
        visible={menuArteVisivel}
        onDismiss={() => setMenuArteVisivel(false)}
        anchor={
          <TouchableRipple
            onPress={() => setMenuArteVisivel(true)}
            style={style.menuAnchor}
          >
            <>
              <Text style={arteSelecionadaId ? style.menuTextSelected : style.menuTextPlaceholder}>
                {arteSelecionadaNome || "Selecione uma arte"}
              </Text>
              <Feather name="chevron-down" size={18} color="#9CA3AF" />
            </>
          </TouchableRipple>
        }
      >
        <Menu.Item
          title="Todas"
          onPress={() => selecionarArte(null)}
          leadingIcon={arteSelecionadaId === null ? "check" : undefined}
        />
        {tiposArte?.data?.content?.map((arte: ArteResponse) => (
          <Menu.Item
            key={arte.id}
            title={arte.nomeArte}
            onPress={() => selecionarArte(arte)}
            leadingIcon={arte.id === arteSelecionadaId ? "check" : undefined}
          />
        ))}
      </Menu>

      {/* Gênero de Arte */}
      {arteSelecionadaId && (generosArte?.length ?? 0) > 0 && (
        <>
          <Text style={style.label}>Gênero de Arte</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.chipsScroll}>
            <View style={style.chipsRow}>
              {generosArte?.map((genero: GeneroArteResponse) => {
                const selecionado = form.generoArte === genero.nomeGeneroArte;
                return (
                  <Chip
                    key={genero.id}
                    showSelectedCheck={true}
                    mode="outlined"
                    selected={selecionado}
                    onPress={() => selecionarGenero(genero)}
                    style={[style.chip, selecionado && style.chipSelected]}
                    selectedColor={selecionado ? "#fff" : "#0B31A3"}
                  >
                    {genero.nomeGeneroArte}
                  </Chip>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}

      {/* Localização */}
      <View style={style.row}>
        <View style={style.flex1}>
          <Text style={style.label}>Cidade</Text>
          <TextInput
            mode="outlined"
            placeholder="Ex: São Paulo"
            value={form.cidade || ""}
            onChangeText={handleCidade}
            style={style.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#0B31A3"
          />
        </View>
        <View style={style.ufContainer}>
          <Text style={style.label}>UF</Text>
          <TextInput
            mode="outlined"
            placeholder="SP"
            value={form.uf || ""}
            onChangeText={handleUf}
            style={style.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#0B31A3"
            autoCapitalize="characters"
            maxLength={2}
          />
        </View>
      </View>
    </View>
  );
}