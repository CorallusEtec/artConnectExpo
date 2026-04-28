import { TextButton } from "@/components/TextButton";
import ArteService from "@/services/ArteService";
import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./style";

export default function tipoArte() {
  const artista = useAuthStore((state) => state.artista);

  type ItemPicker = {
    label: string;
    value: number;
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<ItemPicker[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarArte() {
      try {
        const dados = await ArteService.findAll();
        console.log(dados);

        const dadosFormatados = dados.map((item) => ({
          label: item.nomeArte,
          value: item.id,
        }));

        setItems(dadosFormatados);
      } catch (erro) {
        console.error(erro);
      }
    }
    carregarArte();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Pressable
        onPress={() => router.navigate("/cadastro")}
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 25,
          top: 10,
          left: 10,
        }}
      >
        <FontAwesome6
          name="circle-arrow-left"
          size={35}
          color={gStyles.azul[200]}
        />
      </Pressable>

      <View style={style.textContainer}>
        <Text style={style.titulo}> Olá! </Text>
        <Text style={style.subTitulo}> Bem vindo ao Art Connect! </Text>
        <Text style={style.subTitulo}>
          {" "}
          Crie seu portfólio artístico e nós te conectamos a contratantes.{" "}
        </Text>
      </View>

      <View style={[style.bottomPage, open && { marginBottom: 100 }]}>
        <Text style={style.label}> Qual o seu tipo de arte? </Text>
        <View style={style.pickerContainer}>
          <View>
            <Text style={style.label}> Tipo de arte </Text>

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              listMode="SCROLLVIEW"
              style={style.picker}
              labelStyle={{ fontFamily: "Inter_400Regular" }}
              placeholderStyle={{ fontFamily: "Inter_400Regular" }}
              textStyle={{ fontFamily: "Inter_400Regular" }}
              maxHeight={200}
              placeholder="Selecione um tipo de arte"
              dropDownContainerStyle={{
                width: "100%",
                backgroundColor: gStyles.cinza[200],
                borderColor: gStyles.cinza[200],
              }}
            />
          </View>
        </View>
      </View>

      <View style={style.btnContainer}>
        <View style={style.btnWrapper}>
          <TextButton
            theme="primary"
            title="Criar conta"
            disabled={carregando}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
