import { AuthService } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export function useLoginMutate() {
  const mutate = useMutation({
    mutationFn: AuthService.login,

    onSuccess: (data) => {
      (async () => {
        await AsyncStorage.setItem("@artconnect:token", JSON.stringify(data));
      })();
      router.replace("/home");
    },
  });
  return mutate;
}
