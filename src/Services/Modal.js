import React, { useEffect, useRef } from 'react';
import { Animated,Easing } from 'react-native';
const Appi = () => {
  const translation = useRef(
    new Animated.Value(0)
  ).current;
  
  useEffect(() => {
    Animated.timing(translation, {
      toValue: 100,
      delay: 0,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return (
    <Animated.View
      style={{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        
        right: "8%",
        height: 60,
        backgroundColor: "orange",
        borderRadius: 30,
        transform: [{ translateY: translation }],
      }}
    />
  );
};

export default Appi;