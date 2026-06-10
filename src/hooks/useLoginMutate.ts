import { useAuth } from "@/contexts/AuthContext";
import { AuthService } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export function useLoginMutate() {
  const { signIn } = useAuth();
  const mutate = useMutation({
    mutationFn: AuthService.login,

    onSuccess: (data) => {
      signIn(data.data);
      router.replace("/home");
    },
  });
  return mutate;
}
