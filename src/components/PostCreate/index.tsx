import { View, Text, TextInput, Pressable } from "react-native";
import { style } from "./style";
import { useCreate } from "./useCreate";
import AttachBar from "./AttachBar";
import MediaPreview from "./MediaPreview";

export default function Create() {
  const {
    erro,
    legenda,
    setLegenda,
    midia,
    tipoMidia,
    escolherImagem,
    escolherCamera,
    handlePublicar,
  } = useCreate();

  return (
    <View style={style.container}>
      <Text style={style.title}>Criar publicação</Text>

      {erro ? <Text style={{ color: "red" }}>{erro}</Text> : null}

      <TextInput
        placeholder="Texto do post..."
        value={legenda}
        onChangeText={setLegenda}
        style={style.input}
        multiline
      />

      <AttachBar onImage={escolherImagem} onCamera={escolherCamera} />

      <MediaPreview midia={midia} tipoMidia={tipoMidia} />

      <Pressable style={style.postar} onPress={handlePublicar}>
        <Text style={style.postarText}>Publicar</Text>
      </Pressable>
    </View>
  );
}