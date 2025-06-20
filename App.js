import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "./src/components/Header";
import Time from "./src/components/Time";
import { Audio } from "expo-av";

const COLORS = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
const MODES = {
  POMO: 0,
  SHORT: 1,
  BREAK: 2,
};
const DURATIONS = {
  POMO: 25 * 60,
  SHORT: 5 * 60,
  BREAK: 10 * 60,
};

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(DURATIONS.POMO);
  const [currentMode, setCurrentMode] = useState("POMO");
  const [isActive, setIsActive] = useState(false);

  // Refs para sonidos
  const clickSoundRef = useRef(null);
  const alarmSoundRef = useRef(null);

  // Cargar sonidos una vez
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const click = await Audio.Sound.createAsync(require("./assets/click.wav"));
      const alarm = await Audio.Sound.createAsync(require("./assets/alarma.mp3"));
      if (isMounted) {
        clickSoundRef.current = click.sound;
        alarmSoundRef.current = alarm.sound;
      }
    })();
    return () => {
      isMounted = false;
      clickSoundRef.current && clickSoundRef.current.unloadAsync();
      alarmSoundRef.current && alarmSoundRef.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      const nextMode = isWorking ? "SHORT" : "POMO";
      setCurrentMode(nextMode);
      setTime(DURATIONS[nextMode]);
      playAlarmSound();
    }
    return () => clearInterval(interval);
  }, [isActive, time, isWorking]);

  const playClickSound = useCallback(async () => {
    if (clickSoundRef.current) {
      await clickSoundRef.current.replayAsync();
    }
  }, []);

  const playAlarmSound = useCallback(async () => {
    if (alarmSoundRef.current) {
      await alarmSoundRef.current.replayAsync();
    }
  }, []);

  const handleStartStop = useCallback(() => {
    playClickSound();
    setIsActive((prev) => !prev);
  }, [playClickSound]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: COLORS[MODES[currentMode]] }]}
    >
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" ? 30 : 0,
          borderWidth: 3,
        }}
      >
        <Text style={styles.title}>Pomodoro</Text>
        <Header
          currentTime={currentMode}
          setCurrentTime={setCurrentMode}
          setTime={setTime}
        />
        <Time time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={styles.buttonText}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
