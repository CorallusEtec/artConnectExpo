import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: gStyles.azul[200],
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
  },

  mediaButton: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  mediaButtonText: {
    color: "#333",
    fontWeight: "500",
  },

  preview: {
    marginTop: 10,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },

  postar: {
    backgroundColor: gStyles.azul[200],
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  postarText: {
    color: "#fff",
    fontWeight: "bold",
  },

  attach: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },

  attachText: {
    color: gStyles.cinza[600],
    fontSize: 14,
  },

  card: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: gStyles.cinza[500],
    alignSelf: 'flex-start'
  },
  previewWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },

  previewImage: {
    width: "100%",
    aspectRatio: 1
  },

  previewVideo: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    borderRadius: 12,
  },

  previewAudio: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#000000",
  },

  previewAudioName: {
    flex: 1,
    fontSize: 14,
    color: "#444",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});