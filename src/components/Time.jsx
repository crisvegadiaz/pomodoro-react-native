import { View, Text, StyleSheet } from "react-native";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export default function Time({ time }) {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 15,
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
