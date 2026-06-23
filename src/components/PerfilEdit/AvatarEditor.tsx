import { style } from "./edit";
import { useDynamicThemeStyles } from "@/style/useDynamicThemeStyles";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  fotoUri: string | null;
  uploading: boolean;
  onAlterar: () => void;
};

export function AvatarEditor({ fotoUri, uploading, onAlterar }: Props) {
  const theme = useTheme();
  const dynamic = useDynamicThemeStyles();

  return (
    <View style={style.linhaAvatar}>
      <View style={style.avatarContainer}>
        {uploading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            style={style.headerProfile}
          />
        ) : (
          <Image
            source={fotoUri ? { uri: fotoUri } : require("@/assets/template/avatar.png")}
            style={style.headerProfile}
          />
        )}
      </View>
      <TouchableOpacity style={[style.editarAvatar, dynamic.bgPrimary]} onPress={onAlterar} disabled={uploading}>
        <Feather name="edit-3" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}