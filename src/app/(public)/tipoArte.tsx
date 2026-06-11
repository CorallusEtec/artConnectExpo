import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/tipoArte";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function tipoArte() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Música", value: "musica" },
    { label: "Teatro", value: "teatro" },
    { label: "Pintura", value: "pintura" },
    { label: "Stand-up", value: "stand-up" },
    { label: "Dança", value: "dança" },
    { label: "Exemplo", value: "exemplo" },
    { label: "Exemplo", value: "exemplo" },
  ]);

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
        <Text style={style.titulo}> Olá, ****** </Text>
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
              setItems={setItems}
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
            title="Criar conta"
            onPress={() => router.navigate("/login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
