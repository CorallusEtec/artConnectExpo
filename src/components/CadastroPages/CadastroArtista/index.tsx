import { DialogToLogin } from "@/components/Cadastro/DialogToLogin";
import { useCadastro } from "@/contexts/CadastroContext";
import { ArteResponse } from "@/models/response/ArteResponse";
import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { useArteList } from "@/services/ArteService";
import { useCadastroMutate } from "@/services/AuthService";
import { useGeneroArteByArte } from "@/services/GeneroArteService";
import { style } from "./style";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArteSelector } from "./ArteSelector";
import { SubgeneroSelector } from "./SubgeneroSelector";
import { Header } from "./Header";

export default function CadastroArtista() {
  const { cadastroRequest, fotoPerfil } = useCadastro();
  const [arte, setArte] = useState<ArteResponse | undefined>();
  const [expanded, setExpanded] = useState(true);
  const { data } = useArteList();
  const [generosArte, setGeneroArte] = useState<GeneroArteResponse[]>([]);
  const { mutate, isPending, isSuccess } = useCadastroMutate();
  const { data: generoData, refetch } = useGeneroArteByArte(arte == undefined ? 0 : arte.id);

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
    <SafeAreaView style={style.container}>
      <DialogToLogin visible={isSuccess} />
      <StatusBar hidden />
      <View>
        <Header />
        <ArteSelector
          data={data}
          arte={arte}
          expanded={expanded}
          setExpanded={setExpanded}
          selectArte={selectArte}
        />
        <SubgeneroSelector
          arte={arte}
          setArte={setArte}
          generoData={generoData}
          generosArte={generosArte}
          toggleGenero={toggleGenero}
        />
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
  );
}