import { Entypo, Foundation } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { style } from "../style";

export function AudioPlayer({ uri }: { uri: string }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [tocando, setTocando] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [duracao, setDuracao] = useState(1);
  const icone = tocando
  ? <Foundation name="pause" size={24} color="white" />
  : <Entypo name="controller-play" size={24} color="white" />

  /**
   * Descarrega o som quando o componente desmonta ou quando 'sound' muda
   */
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  /**
   * Carrega o audio e começa a tocar imediatamente
   * tambem tem o listenter que atualiza a posição em tempo real, e
   * e reseta o player quando o audio termina
   */
  async function carregarSom() {
    const { sound: novoSom } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    );
    setSound(novoSom);
    setTocando(true);

    novoSom.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;
      setPosicao(status.positionMillis);
      setDuracao(status.durationMillis ?? 1);
      if (status.didJustFinish) {
        setTocando(false);
        setPosicao(0);
      }
    });
  }

  /**
   * Verifica se o som ainda está carregado na memória antes de qualquer operação,
   * se não estiver, limpa o estado para forçar um recarregamento na próxima interação.
   * Isso resolve o erro 'sound is not loaded' que ocorre quando o componente
   * desmonta e remonta
   */
    async function getSoundCarregado(): Promise<Audio.Sound | null> {
        if (!sound) return null;
        const status = await sound.getStatusAsync();
        if (!status.isLoaded) {
            setSound(null); 
            setTocando(false);
            return null;
        }
        return sound;
    }   

    /**
   * Alterna entre play e pause.
   * Se o som não estiver carregado, chama 'carregarSom' primeiro.
   */
    async function togglePlay() {
        const s = await getSoundCarregado();
        if (!s) {
            await carregarSom();
            return;
        }
        if (tocando) {
            await s.pauseAsync();
            setTocando(false);
        } else {
            await s.playAsync();
            setTocando(true);
        }
    }

    /**
   * É o controle da barra de progresso ao clicar
   */
    async function seek(porcentagem: number) {
        const s = await getSoundCarregado();
        if (!s) return;
        await s.setPositionAsync(porcentagem * duracao);
    }

    /**
   * converte os milissegundos
   */
  function formatarTempo(ms: number) {
    const total = Math.floor(ms / 1000);
    const min = Math.floor(total / 60);
    const seg = total % 60;
    return `${min}:${seg.toString().padStart(2, "0")}`;
  }

  const progresso = posicao / duracao;

  return (
    <>
      <View style={style.audioPlayer}>
        <Pressable onPress={togglePlay} style={style.audioBtn}>
          <Text style={style.audioBtnIcon}>{icone}</Text>
        </Pressable>

        <View style={style.audioBarWrapper}>
          <View
            style={style.audioBarBg}
            onStartShouldSetResponder={() => true}
            onResponderGrant={async (e) => {
                const { locationX } = e.nativeEvent;
                (e.target as any).measure(async (_: any, __: any, width: number) => {
                    if (!sound) {
                    await carregarSom();
                    }
                    await seek(locationX / width); 
                });
            }}
            >
            <View style={[style.audioBarFill, { width: `${progresso * 100}%` as any }]} />
            </View>

          <View style={style.audioTempos}>
            <Text style={style.audioTempoText}>{formatarTempo(posicao)}</Text>
            <Text style={style.audioTempoText}>{formatarTempo(duracao)}</Text>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}