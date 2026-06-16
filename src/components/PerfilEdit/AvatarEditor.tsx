import { gStyles } from "@/style/gStyle";
import { style } from "./edit";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";

type Props = {
  fotoUri: string | null;
  uploading: boolean;
  onAlterar: () => void;
};

export function AvatarEditor({ fotoUri, uploading, onAlterar }: Props) {
  return (
    <View style={style.linhaAvatar}>
      <View style={style.avatarContainer}>
        {uploading ? (
          <ActivityIndicator
            size="large"
            color={gStyles.azul[200]}
            style={style.headerProfile}
          />
        ) : (
          <Image
            source={fotoUri ? { uri: fotoUri } : require("@/assets/template/avatar.png")}
            style={style.headerProfile}
          />
        )}
      </View>
      <TouchableOpacity style={style.editarAvatar} onPress={onAlterar} disabled={uploading}>
        <Feather name="edit-3" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}