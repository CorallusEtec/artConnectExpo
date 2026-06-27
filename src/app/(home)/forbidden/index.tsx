import { useAuth } from "@/contexts";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { style } from "@/style/pages/forbidden";
import { router } from "expo-router";
import { Image, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export default function Forbidden() {
  const { getValidateId } = useAuth();
  const { data, isLoading } = useUsuarioByIdQuery(getValidateId());

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Image
          style={style.icon}
          source={require("@/assets/images/favicon.png")}
        />
        <Text variant="headlineMedium">Acesso bloqueado</Text>
      </View>
      <View style={style.body}>
        <Text variant="bodyMedium">
          Olá {data?.data.nome}, Informamos que o acesso de sua conta foi
          restrito
        </Text>
      </View>
      <View style={style.misc}>
        <Text variant="bodyMedium">
          Status da conta: {data?.data.status?.tipoStatus}
        </Text>
        {data?.data.status?.descricao && (
          <Text variant="labelLarge">{data?.data.status?.descricao}</Text>
        )}
      </View>

      <View>
        <Button onPress={() => router.navigate("/login")}>Entendi</Button>
      </View>
    </View>
  );
}
