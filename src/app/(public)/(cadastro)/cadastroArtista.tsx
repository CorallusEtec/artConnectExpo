import { DialogToLogin } from "@/components/Cadastro/DialogToLogin";
import { useCadastro } from "@/contexts/CadastroContext";
import { ArteResponse } from "@/models/response/ArteResponse";
import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { useArteList } from "@/services/ArteService";
import { useCadastroMutate } from "@/services/AuthService";
import { useGeneroArteByArte } from "@/services/GeneroArteService";
import { style } from "@/style/pages/cadastroArtista";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, TouchableOpacity, View } from "react-native";
import { Button, Chip, Divider, IconButton, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CadastroArtista() {
  const { cadastroRequest, fotoPerfil } = useCadastro();
  const [arte, setArte] = useState<ArteResponse | undefined>();
  const [expanded, setExpanded] = useState(true);
  const { data } = useArteList();
  const [generosArte, setGeneroArte] = useState<GeneroArteResponse[]>([]);
  const { mutate, isPending, isSuccess } = useCadastroMutate();
  const { data: generoData, refetch } = useGeneroArteByArte(
    arte == undefined ? 0 : arte.id
  );

  useEffect(() => {
    refetch();
  }, [arte?.id]);

  function selectArte(item?: ArteResponse) {
    setArte(item);
    setExpanded(false);
    setGeneroArte([]);
  }

  function toggleGenero(genero: GeneroArteResponse) {
    setGeneroArte((prev) =>
      prev.find((g) => g.id === genero.id)
        ? prev.filter((g) => g.id !== genero.id)
        : [...prev, genero]
    );
  }

  function submit() {
    const formData = new FormData();

    if (fotoPerfil.current) {
      formData.append("fotoPerfil", fotoPerfil.current as unknown as Blob);
    }

    if (arte) {
      cadastroRequest.current.details = {
        ...cadastroRequest.current.details,
        generosArte,
        arte,
      };
    }

    formData.append("principal", JSON.stringify(cadastroRequest.current));
    mutate(formData);
  }

  return (
    <>
    <SafeAreaView style={style.container}>
      <DialogToLogin visible={isSuccess} />
      <StatusBar hidden />

      <View>

        {/* HEADER */}
        <View style={style.header}>
          <Text variant="headlineSmall" style={style.title}>
            Qual o seu tipo de arte?
          </Text>

          <Text variant="bodyMedium" style={style.subtitle}>
            Escolha sua área principal de atuação
          </Text>
        </View>

        {/* SELETOR DE ARTE */}
        <View style={style.section}>
          <View style={style.sectionHeader}>
            <Text variant="titleMedium">
              {arte ? "Arte selecionada" : "Selecione uma arte"}
            </Text>

            <IconButton
              icon={expanded ? "chevron-up" : "chevron-down"}
              onPress={() => setExpanded((p) => !p)}
            />
          </View>

          {expanded && (
            <View style={style.card}>
              <FlatList
                data={data?.data.content || []}
                keyExtractor={(item) => String(item.id)}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => {
                  const selected = arte?.id === item.id;

                  return (
                    <TouchableOpacity onPress={() => selectArte(selected ? undefined : item)}>
                      <List.Item
                        title={item.nomeArte}
                        right={
                          selected
                            ? (props) => <List.Icon {...props} icon="check" />
                            : undefined
                        }
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>

        {/* CHIP ARTE SELECIONADA */}
        {arte && (
          <View style={style.chipSection}>
            <Chip icon="palette" onClose={() => setArte(undefined)}>
              {arte.nomeArte}
            </Chip>
          </View>
        )}

        {/* SUBGÊNEROS */}
        {arte && (
          <View style={style.section}>
            <Text variant="titleMedium" style={{ marginBottom: 10 }}>
              Subgêneros
            </Text>

            {generoData?.data?.length ? (
              <View style={style.chipWrap}>
                {generoData.data.map((item) => {
                  const selected = generosArte.some((g) => g.id === item.id);
                  return (
                    <Chip
                      key={item.id}
                      selected={selected}
                      onPress={() => toggleGenero(item)}
                      mode="outlined"
                      style={{ margin: 4 }}
                    >
                      {item.nomeGeneroArte}
                    </Chip>
                  );
                })}
              </View>
            ) : (
              <Text style={{ opacity: 0.6 }}>
                Nenhum subgênero disponível para essa arte
              </Text>
            )}
          </View>
        )}

        {/* BOTÃO FINAL */}
        <View style={style.footer}>
          <Button
            mode="contained"
            onPress={submit}
            loading={isPending}
            disabled={isPending}
            style={style.button}
          >
            Finalizar cadastro
          </Button>
        </View>
      </View>
      </SafeAreaView>
    </>
  );
}