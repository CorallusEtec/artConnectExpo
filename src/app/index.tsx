import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function Splash() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash-icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {loading && <ActivityIndicator size="large" color="#0e2bcc" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
