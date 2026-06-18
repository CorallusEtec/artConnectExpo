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
import {
    Button,
    Card,
    Chip,
    Divider,
    IconButton,
    List,
    Text,
} from "react-native-paper";

export default function CadastroArtista() {
  const { cadastroRequest, fotoPerfil } = useCadastro();
  const [arte, setArte] = useState<ArteResponse | undefined>();
  const [card, setCard] = useState(true);
  const { data } = useArteList();
  const [generosArte, setGeneroArte] = useState<GeneroArteResponse[]>([]);
  const { mutate, isPending, isSuccess } = useCadastroMutate();
  const { data: generoData, refetch } = useGeneroArteByArte(
    arte == undefined ? 0 : arte.id,
  );
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    refetch();
  }, [arte?.id]);

  function selectArte(arte?: ArteResponse) {
    setArte(arte);
    setCard(false);
    setGeneroArte([]);
  }

  function appendGenero(genero: GeneroArteResponse) {
    setGeneroArte((prev) => [...prev, genero]);
  }
  function removeGenero(generoId: number) {
    setGeneroArte((prev) => prev.filter((g) => g.id != generoId));
  }
  function toggleGenero(genero: GeneroArteResponse) {
    if (generosArte.find((r) => r.id == genero.id)) {
      removeGenero(genero.id);
    } else {
      appendGenero(genero);
    }
  }

  function submit() {
    const formData = new FormData();

    if (fotoPerfil.current) {
      formData.append("fotoPerfil", fotoPerfil.current as unknown as Blob);
    }

    if (arte) {
      cadastroRequest.current.details = {
        ...cadastroRequest.current.details,
        generosArte: generosArte,
        arte: arte,
      };
    }
    formData.append("principal", JSON.stringify(cadastroRequest.current));
    mutate(formData);
  }
  return (
    <>
      <DialogToLogin visible={isSuccess} />
      <StatusBar hidden />
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text variant="headlineSmall">Qual o seu tipo de arte?</Text>
          <Text variant="bodyMedium">
            Selecione o tipo de arte que você trabalha.
          </Text>
          <Button onPress={submit} mode="text">
            Agora não
          </Button>
        </View>

        <Card>
          <View style={style.cardHeader}>
            <Text variant="titleSmall">
              {arte ? "Alterar arte" : "Selecione uma arte"}
            </Text>
            <IconButton
              onPress={() => setCard((prev) => !prev)}
              icon={card ? "menu-up" : "menu-down"}
            />
          </View>
          {card && (
            <Card.Content>
              <FlatList
                style={{ maxHeight: 220 }}
                data={data?.data.content || []}
                renderItem={({ item }) => (
                  <>
                    {arte?.id == item.id ? (
                      <TouchableOpacity onPress={() => selectArte(undefined)}>
                        <List.Item
                          right={(props) => (
                            <List.Icon icon="close" {...props} />
                          )}
                          title={item.nomeArte}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          selectArte(item);
                        }}
                      >
                        <List.Item title={item.nomeArte} />
                      </TouchableOpacity>
                    )}
                    <Divider />
                  </>
                )}
              />
            </Card.Content>
          )}
        </Card>

        <View style={style.arteChipContainer}>
          {arte && (
            <Chip
              closeIcon="close"
              onPress={() => setArte(undefined)}
              onClose={() => setArte(undefined)}
              compact
              mode="flat"
            >
              {arte?.nomeArte}
            </Chip>
          )}
        </View>
        <View style={style.titleContainer}>
          <Text variant="bodyLarge">Adicione os subgêneros dessa arte</Text>
        </View>
        <View style={style.arteChipContainer}>
          {generoData?.data && (
            <FlatList
              data={generoData?.data}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}
              renderItem={({ item }) => (
                <Chip
                  selected={
                    generosArte.filter((r) => r.id == item.id).length != 0
                  }
                  onPress={() => toggleGenero(item)}
                  mode="outlined"
                >
                  {item.nomeGeneroArte}
                </Chip>
              )}
            />
          )}
        </View>

        <View style={style.finishContainer}>
          <Button
            loading={isPending}
            disabled={isPending}
            onPress={submit}
            mode="contained"
          >
            Finalizar Cadastro
          </Button>
        </View>
      </View>
    </>
  );
}
