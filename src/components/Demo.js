import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

function Demo() {
  const [isVisible, setIsVisible] = useState(false);
  const fadeAnim = new Animated.Value(0); // Initial value is 0

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    Animated.timing(
      fadeAnim,
      {
        toValue: isVisible ? 0 : 1, // Animate to 0 (hide) or 1 (show)
        duration: 300, // Adjust the duration as needed
        useNativeDriver: false, // Set this to true if possible for performance
      }
    ).start();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={toggleVisibility}>
        <Text>Show/Hide</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          marginTop: 20,
          opacity: fadeAnim, // Use the animated value for opacity
        }}
      >
        {isVisible && <Text>This is an animated element.</Text>}
      </Animated.View>
    </View>
  );
}

export default Demo;