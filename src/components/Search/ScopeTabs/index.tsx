import { Publicacao } from "@/components/Publicacao";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { useSearch } from "@/contexts/SearchContext";
import { useFeedQuery } from "@/services/PublicacaoService";
import { useArtistaFiltroSearchQuery, useUsuarioFiltroQuery } from "@/services/UsuarioService";
import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, SegmentedButtons, Text } from "react-native-paper";
import EmptyState from "../EmptyState";
import UserCard from "../UserCard";

interface ScopeTabsProps {
  setTipoFiltro?: (value: "Publicacao" | "Usuario") => void;
}

export function ScopeTabs({ setTipoFiltro }: ScopeTabsProps) {
  const { tipoFiltro, form, filtrosAtivos, aplicarFiltros } = useSearch();
  const [escopo, setEscopo] = useState(tipoFiltro.current);
  const scrollViewRef = useRef<ScrollView>(null);

  const usuarioQuery = useUsuarioFiltroQuery(filtrosAtivos);
  const artistaQuery = useArtistaFiltroSearchQuery(filtrosAtivos);

  const temFiltroArte = !!(filtrosAtivos.arte || filtrosAtivos.generoArte);
  const queryAtiva = temFiltroArte ? artistaQuery : usuarioQuery;

  const publicacaoQuery = useFeedQuery(
    { legenda: filtrosAtivos.legenda },
    "feed"
  );

  const { data, refetch, isLoading, isFetching } =
    escopo === "Usuario" ? queryAtiva : publicacaoQuery;

  function handleEscopo(value: "Publicacao" | "Usuario") {
    tipoFiltro.current = value;
    setEscopo(value);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    if (setTipoFiltro) setTipoFiltro(value);
  }

  function handleBuscar() {
    aplicarFiltros(); 
    refetch();
  }

  const temFiltroAtivo =
    escopo === "Usuario"
      ? !!(
          filtrosAtivos.nome ||
          filtrosAtivos.arte ||
          filtrosAtivos.generoArte ||
          filtrosAtivos.cidade ||
          filtrosAtivos.uf
        )
      : !!filtrosAtivos.legenda;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <SegmentedButtons
          value={escopo as "Publicacao" | "Usuario"}
          onValueChange={handleEscopo}
          buttons={[
            { value: "Publicacao", label: "Publicações" },
            { value: "Usuario", label: "Usuários" },
          ]}
        />
        <Button
          mode="contained"
          style={{ marginTop: 16, borderRadius: 8, paddingVertical: 4 }}
          onPress={handleBuscar}
          loading={isLoading || isFetching}
        >
          Buscar
        </Button>

        {temFiltroAtivo && (
          <Text style={{ marginVertical: 12, fontSize: 14, color: "#666" }}>
            {data?.data?.content?.length || 0} resultados encontrados
          </Text>
        )}
      </View>

      {temFiltroAtivo ? (
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={true}
        >
          {escopo === "Usuario" ? (
            data?.data?.content?.map((item: any) => {
              if (item.tipoConta === "ADMIN") return null;
              return (
                <UserCard
                  key={item.id}
                  id={item.id}
                  nome={item.nome}
                  localizacao={
                    item.cidade && item.uf
                      ? `${item.cidade}, ${item.uf}`
                      : item.cidade || item.uf || ""
                  }
                  textoBio={item.textoBio || "Sem descrição"}
                  tipo={item.tipoConta}
                  fotoPerfilUrl={item.fotoPerfilUrl}
                  arte={item.arte}
                  generosArte={item.generosArte}
                />
              );
            })
          ) : (
            data?.data?.content?.map((item: any) => (
              <PublicacaoProvider
                key={item.publicacao.id}
                idPublicacaoInit={item.publicacao.id}
              >
                <Publicacao />
              </PublicacaoProvider>
            ))
          )}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <EmptyState />
        </View>
      )}
    </View>
  );
}