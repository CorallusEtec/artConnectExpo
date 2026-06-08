import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import PublicacoesService from "@/services/PublicacoesService";
import UsuarioService from "@/services/UsuarioService";

export function usePerfil() {
  const [usuario, setUsuario] = useState<UsuarioResponse>();
  const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        let us: UsuarioResponse = {} as UsuarioResponse;

        const tk = await AsyncStorage.getItem("@artconnect:token");

  
        if (tk) {
          const tokenParse: AuthLoginResponse = JSON.parse(tk);

          us = await UsuarioService.findById(tokenParse.id);
          console.log(us);
          setUsuario(us);
        }

        if (us.id) {
          const data = await PublicacoesService.listar();
          const meus = (data ?? []).filter(
            (p: PublicacaoResponse) => p.autor.id == us?.id,
          );
          setPublicacoes(meus);
        } else {
          setPublicacoes([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
      setLoading(false);
    }
    carregar();
  }, []);


  return { usuario, publicacoes, loading };
}