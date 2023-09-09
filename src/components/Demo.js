import React, { useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';

const Demo = () => {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();

  const startStopwatch = () => {
    if (!running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); // Update every second
      setRunning(true);
    } else {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setRunning(false);
  };
  return (
    <View>
       <Text style={{ fontSize: 40 }}>{seconds} seconds</Text>
      <Button title={running ? 'Stop' : 'Start'} onPress={startStopwatch} />
      <Button title="Reset" onPress={resetStopwatch} />
    </View>
  );
};

export default Demo;
