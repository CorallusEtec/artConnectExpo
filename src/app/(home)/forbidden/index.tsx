import { useAuth } from "@/contexts";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { style } from "@/style/pages/forbidden";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  useTheme,
} from "react-native-paper";

export default function Forbidden() {
  const { getValidateId } = useAuth();
  const theme = useTheme();
  const { data, isLoading } = useUsuarioByIdQuery(getValidateId());

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Octicons name="shield-x" size={64} color={theme.colors.primary} />
        <Text variant="headlineMedium">Acesso bloqueado</Text>
      </View>
      <View style={style.body}>
        <Text
          style={{ textAlign: "center", color: theme.colors.onBackground }}
          variant="bodySmall"
        >
          Olá {data?.data.nome}, Seu acesso foi restrito por violar nossos
          Termos de Uso.
        </Text>
      </View>
      <View style={style.misc}>
        <Card
          contentStyle={[
            style.card,
            { backgroundColor: theme.colors.errorContainer },
          ]}
          mode="contained"
        >
          <Card.Content>
            <View style={style.cardContent}>
              <FontAwesome5
                name="user-shield"
                size={24}
                color={theme.colors.error}
              />
              <View>
                <Text variant="bodyLarge">Status da conta</Text>
                <Text
                  style={{ color: theme.colors.error, fontWeight: "800" }}
                  variant="bodySmall"
                >
                  {data?.data.status?.tipoStatus}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card
          mode="contained"
          contentStyle={[
            style.card,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Card.Content>
            <View style={style.cardContent}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={theme.colors.primary}
              />
              <View>
                <Text variant="bodyLarge">Acha que foi um engano?</Text>
                <Text variant="bodySmall">
                  Envie um email para o nosso suporte:
                  corallus.contato@gmail.com
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        {data?.data.status?.descricao && (
          <Card
            mode="contained"
            contentStyle={[
              style.card,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Card.Content>
              <View style={style.cardContent}>
                <Feather
                  name="file-text"
                  size={24}
                  color={theme.colors.secondary}
                />
                <View>
                  <Text variant="bodyLarge">Observação</Text>
                  <Text style={{ width: "80%" }} variant="bodySmall">
                    {data?.data.status?.descricao}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      </View>

      <View>
        <Button onPress={() => router.navigate("/login")}>Entendi</Button>
      </View>
    </View>
  );
}
