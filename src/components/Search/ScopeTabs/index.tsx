import { Publicacao } from "@/components/Publicacao";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { useSearch } from "@/contexts/SearchContext";
import { useFeedQuery } from "@/services/PublicacaoService";
import { useUsuarioFiltroQuery } from "@/services/UsuarioService";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, SegmentedButtons, Text } from "react-native-paper";
import EmptyState from "../EmptyState";
import UserCard from "../UserCard";

interface ScopeTabsProps {
  setTipoFiltro?: (value: "Publicacao" | "Usuario") => void;
}

export function ScopeTabs({ setTipoFiltro }: ScopeTabsProps) {
  const { tipoFiltro, form } = useSearch();
  const [escopo, setEscopo] = useState(tipoFiltro.current);
  const scrollViewRef = useRef<ScrollView>(null);

  const [filtrosAtuais, setFiltrosAtuais] = useState({
    nome: form.current.nome,
    legenda: form.current.legenda,
  });

  useEffect(() => {
    setFiltrosAtuais({
      nome: form.current.nome,
      legenda: form.current.legenda,
    });
  }, [form.current]);

  const usuarioQuery = useUsuarioFiltroQuery(filtrosAtuais);
  const publicacaoQuery = useFeedQuery(
    { legenda: filtrosAtuais.legenda },
    "feed"
  );

  const { data, refetch, isLoading, isFetching } = escopo === "Usuario" ? usuarioQuery : publicacaoQuery;

  function handleEscopo(value: "Publicacao" | "Usuario") {
    tipoFiltro.current = value;
    setEscopo(value);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });

    if (setTipoFiltro) {
      setTipoFiltro(value);
    }
  }

  function handleBuscar() {
    setFiltrosAtuais({
      nome: form.current.nome,
      legenda: form.current.legenda,
    });
    refetch();
  }

  const termoBuscaAtual = escopo === "Usuario" ? filtrosAtuais.nome : filtrosAtuais.legenda;

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
          style={{
            marginTop: 16,
            borderRadius: 8,
            paddingVertical: 4,
          }}
          onPress={handleBuscar}
          loading={isLoading || isFetching}
        >
          Buscar
        </Button>

        {termoBuscaAtual?.trim() !== "" && (
          <Text style={{ marginVertical: 12, fontSize: 14, color: "#666" }}>
            {data?.data?.content?.length || 0} resultados encontrados
          </Text>
        )}
      </View>

      {termoBuscaAtual?.trim() !== "" ? (
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
                    item.cidade && item.estado 
                      ? `${item.cidade}, ${item.estado}` 
                      : item.cidade 
                      ? item.cidade 
                      : item.estado 
                      ? item.estado 
                      : ""}                  
                    textoBio={item.textoBio || "Sem descrição"}
                  tipo={item.tipoConta}
                  fotoPerfilUrl={item.fotoPerfilUrl}
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