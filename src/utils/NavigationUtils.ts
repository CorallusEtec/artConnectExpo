import { router } from "expo-router";

export function navegarParaPerfil(authId: number, usuarioId?: number) {
  if (usuarioId === authId) {
    router.push("/perfil");
  } else {
    router.push(`/${usuarioId}`);
  }
}
