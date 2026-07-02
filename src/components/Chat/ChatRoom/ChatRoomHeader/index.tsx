import { AvatarRender } from "@/components/AvatarRender";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { AppUtils } from "@/utils/AppUtils";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { style } from "./style";

export function ChatRoomHeader() {
  const { id } = useLocalSearchParams();
  const { data } = useUsuarioByIdQuery(Number(id));
  return (
    <Appbar.Header style={style.container}>
      <View style={style.leftActionContainer}>
        <Appbar.BackAction onPress={() => router.navigate("/contacts")} />
        <Pressable
          onPress={() => router.navigate(`/${id}`)}
          style={style.content}
        >
          <AvatarRender
            nome={data?.data.nome}
            uri={data?.data.fotoPerfilUrl}
            size={40}
          />
          <View>
            <Text variant="labelLarge">{data?.data.nome}</Text>
            <Text variant="bodySmall">
              {AppUtils.capitalize(data?.data.tipoConta ?? "")}
            </Text>
          </View>
        </Pressable>
      </View>
      <Appbar.Action icon="flag-outline" />
    </Appbar.Header>
  );
}
