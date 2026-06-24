import { publicacaoSchema } from "@/schemas/publicacaoSchema";
import { usePublicar } from "@/services/PublicacaoService";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import z from "zod";
import { AlertMessage } from "../AlertMessage";
import MediaPreview from "./MediaPreview";
import { style } from "./style";
import { useCreate } from "./useCreate";

export default function Create() {
  const theme = useTheme();
  const {
    erro,
    legenda,
    setLegenda,
    midia,
    tipoMidia,
    escolherGaleria,
    escolherCamera,
    handlePublicar,
    escolherAudio,
  } = useCreate();

  const { mutate, isPending, error } = usePublicar();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(publicacaoSchema),
  });
  function submit(data: z.infer<typeof publicacaoSchema>) {
    mutate({
      file: data.conteudo,
      legenda: data.legenda,
      tipoMidia: data.conteudo?.tipo || null,
    });
    reset();
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={style.container}>
      <Text style={[style.title, { color: theme.colors.primary }]}>
        Criar publicação
      </Text>

      <AlertMessage
        text={error?.message}
        visible={!!error}
        onDismiss={() => {}}
      />

      <Controller
        name="legenda"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Texto do post..."
            value={value}
            onChangeText={onChange}
            style={style.input}
            multiline
          />
        )}
      />
      <Controller
        name="conteudo"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Pressable onPress={() => escolherGaleria(onChange)}>
              <FontAwesome name="file-image-o" size={20} color="gray" />
            </Pressable>

            <Pressable onPress={() => escolherAudio(onChange)}>
              <FontAwesome name="file-audio-o" size={20} color="gray" />
            </Pressable>

            <Pressable onPress={() => escolherCamera(onChange)}>
              <FontAwesome name="camera" size={20} color="gray" />
            </Pressable>
          </View>
        )}
      />

      <MediaPreview
        midia={getValues("conteudo")}
        tipoMidia={getValues("conteudo.tipo")}
      />

      <Button
        //onPress={() => console.log("Teste")}
        onPress={handleSubmit(submit)}
        disabled={isPending}
        mode="contained"
        loading={isPending}
      >
        Publicar
      </Button>
    </Pressable>
  );
}
