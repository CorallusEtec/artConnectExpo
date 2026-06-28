import { AvatarRender } from "@/components/AvatarRender";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { AppUtils } from "@/utils/AppUtils";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Appbar, Text, TouchableRipple } from "react-native-paper";
import { style } from "./style";

export function ChatRoomHeader() {
  const { id } = useLocalSearchParams();
  const { data } = useUsuarioByIdQuery(Number(id));
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => router.navigate("/contacts")} />
      <TouchableRipple
        onPress={() => router.navigate(`/${id}`)}
        rippleColor="rgba(0,0,0,.79)"
        style={style.content}
      >
        <>
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
        </>
      </TouchableRipple>
    </Appbar.Header>
  );
}
