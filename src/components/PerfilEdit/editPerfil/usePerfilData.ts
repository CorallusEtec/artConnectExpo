import { useAuth } from "@/contexts";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import UsuarioService from "@/services/UsuarioService";

export function usePerfilData() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<"artista" | "contratante" | null>(null);

  async function obterToken() {
    const tokenData = await AsyncStorage.getItem("@artconnect:token");
    if (!tokenData) {
      router.navigate("/login");
      return null;
    }
    return JSON.parse(tokenData) as AuthLoginResponse;
  }

  async function carregarDados() {
    try {
      const tokenParse = await obterToken();
      if (!tokenParse) return;

      const model = await UsuarioService.findById(tokenParse.id, tokenParse.token);
      setUser(model);
      setTipoUsuario(model.tipoConta === "CONTRATANTE" ? "contratante" : "artista");
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return { loading, user, tipoUsuario, obterToken };
}