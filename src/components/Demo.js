import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const audioUri = 'http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg'; // Replace with the URL or local path to your audio file

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderValueChange = (value) => {
    if (sound) {
      sound.setPositionAsync(value * duration);
      setSliderValue(value);
    }
  };

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: false, isLooping: false }
        );
        setSound(sound);
           time()
        const { durationMillis } = await sound.getStatusAsync();
        setDuration(durationMillis);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  const time = () => {
    setTimeout(() => {
     setIsPlaying(false)
    }, duration);
  };

  useEffect(() => {
    const updatePosition = async () => {
      if (sound) {
        const { positionMillis, isPlaying, durationMillis } = await sound.getStatusAsync();
        setPosition(positionMillis);
        setSliderValue(positionMillis / durationMillis);

        if (!isPlaying && positionMillis === durationMillis) {
          // When the audio ends, reset position and slider value
          sound.setPositionAsync(0);
          setSliderValue(0);
        }
      }
    };

    const interval = setInterval(updatePosition, 500);

    return () => {
      clearInterval(interval);
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      <TouchableOpacity onPress={handlePlayPause}>
        <Text style={styles.playPauseButton}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={handleSliderValueChange}
        disabled={!sound}
      />
      <Text style={styles.time}>
        {new Date(position).toISOString().substr(14, 5)} / {new Date(duration).toISOString().substr(14, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  playPauseButton: {
    fontSize: 18,
    color: 'blue',
  },
  slider: {
    width: '80%',
    marginTop: 20,
  },
  time: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Demo
