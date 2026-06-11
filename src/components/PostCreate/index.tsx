import { Pressable, Text, TextInput, View } from "react-native";
import AttachBar from "./AttachBar";
import MediaPreview from "./MediaPreview";
import { style } from "./style";
import { useCreate } from "./useCreate";

export default function Create() {
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
    nomeAudio
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

      <AttachBar onImage={escolherGaleria} onCamera={escolherCamera} onFile={escolherAudio}/>

      <MediaPreview midia={midia} tipoMidia={tipoMidia} />

      <Pressable style={style.postar} onPress={handlePublicar}>
        <Text style={style.postarText}>Publicar</Text>
      </Pressable>
    </View>
  );
}