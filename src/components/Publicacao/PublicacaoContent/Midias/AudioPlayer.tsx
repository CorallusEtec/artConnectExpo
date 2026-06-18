import { Ionicons } from "@expo/vector-icons";
import { Slider } from "@react-native-assets/slider";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  uri: string;
};

export function AudioPlayer({ uri }: Props) {
  console.log("AudioPlayer recebeu uri:", JSON.stringify(uri))
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);

  function togglePlay() {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  }

  function onSeek(value: number) {
    player.seekTo(value);
  }

  function formatTime(seconds: number) {
    const totalSec = Math.floor(seconds);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <audio src={uri} controls style={{ width: "100%" }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlay} disabled={!status.isLoaded} style={styles.button}>
        <Ionicons name={status.playing ? "pause" : "play"} size={24} color="#000" />
      </TouchableOpacity>

      <Slider
        style={{ flex: 1, marginHorizontal: 8 }}
        minimumValue={0}
        maximumValue={status.duration || 1}
        value={status.currentTime}
        onSlidingComplete={onSeek}
      />

      <Text style={styles.time}>
        {formatTime(status.currentTime)} / {formatTime(status.duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  webContainer: {
    width: "100%",
    padding: 8,
  },
  button: {
    padding: 4,
  },
  time: {
    fontSize: 12,
    minWidth: 80,
    textAlign: "right",
  },
});