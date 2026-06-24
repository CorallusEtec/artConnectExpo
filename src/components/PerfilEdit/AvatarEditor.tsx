import { useDynamicThemeStyles } from "@/style/useDynamicThemeStyles";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AvatarRender } from "../AvatarRender";
import { style } from "./edit";

type Props = {
  fotoUri: string | null;
  uploading: boolean;
  onAlterar: () => void;
  nome: string;
};

export function AvatarEditor({ fotoUri, uploading, onAlterar, nome }: Props) {
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
          <AvatarRender nome={nome} size={92} uri={fotoUri || undefined} />
        )}
      </View>
      <TouchableOpacity
        style={[style.editarAvatar, dynamic.bgPrimary]}
        onPress={onAlterar}
        disabled={uploading}
      >
        <Feather name="edit-3" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
