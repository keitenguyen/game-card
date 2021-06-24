import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {convertSecondsToMMSS} from '../utils/Tools';

const Countdown = ({totalTime, onStopTimer}) => {
  let timerRef = useRef(null);
  const [seconds, setSeconds] = useState(totalTime);
  useEffect(() => {
    timerRef.current = () => {
      setSeconds(seconds - 1);
    };

    const id = setInterval(() => {
      timerRef.current();
    }, 1000);
    if (seconds <= 0) {
      clearInterval(id);
      onStopTimer();
    }

    return () => clearInterval(id);
  }, [onStopTimer, seconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thời gian còn lại: {convertSecondsToMMSS(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
  },
});

export default Countdown;
