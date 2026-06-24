import { router } from "expo-router";

export function navegarParaPerfil(usuarioId?: number) {
  if (usuarioId) {
    router.push(`/${usuarioId}`);
  }
}