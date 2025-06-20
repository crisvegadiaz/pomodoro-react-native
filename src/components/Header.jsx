import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const OPTIONS = [
  { label: "Pomodoro", minutes: 25 },
  { label: "Short Break", minutes: 5 },
  { label: "Long Break", minutes: 15 },
];

export default function Header({ currentTime, setCurrentTime, setTime }) {
  const handlePress = (index) => {
    setCurrentTime(index);
    setTime(OPTIONS[index].minutes * 60);
  };

  return (
    <View style={styles.container}>
      {OPTIONS.map((option, index) => {
        const isActive = currentTime === index;
        return (
          <TouchableOpacity
            key={option.label}
            onPress={() => handlePress(index)}
            style={[
              styles.item,
              !isActive && styles.inactiveItem,
            ]}
          >
            <Text style={styles.text}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    flex: 1,
    alignItems: "center",
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20,
  },
  inactiveItem: {
    borderColor: "transparent",
  },
  text: {
    fontWeight: "bold",
  },
});
