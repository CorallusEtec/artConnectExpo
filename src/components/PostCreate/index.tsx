import { Pressable, Text, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AlertMessage } from "../AlertMessage";
import AttachBar from "./AttachBar";
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
  return (
    <View style={style.container}>
      <Text style={[style.title, { color: theme.colors.primary }]}>Criar publicação</Text>

      <AlertMessage text={erro} visible={!!erro} onDismiss={() => {}} />

      <TextInput
        placeholder="Texto do post..."
        value={legenda}
        onChangeText={setLegenda}
        style={style.input}
        multiline
      />

      <AttachBar
        onImage={escolherGaleria}
        onCamera={escolherCamera}
        onFile={escolherAudio}
      />

      <MediaPreview midia={midia} tipoMidia={tipoMidia} />

      <Pressable style={[style.postar, { backgroundColor: theme.colors.primary }]} onPress={handlePublicar}>
        <Text style={style.postarText}>Publicar</Text>
      </Pressable>
    </View>
  );
}