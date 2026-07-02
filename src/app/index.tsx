import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import "text-encoding-polyfill";

export default function Index() {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator />;

  if (isAuth) return <Redirect href="/(home)/(tabs)/home" />;

   return <Redirect href="/(public)/login" />;
  //return <Redirect href="/(public)/(cadastro)/cadastroArtista" />;
}
