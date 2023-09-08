import React, { useState } from "react";
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";

if (
Platform.OS === "android" &&
UIManager.setLayoutAnimationEnabledExperimental
) {
UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Demo = () => {
 const [expanded, setExpanded] = useState(false);

  return (
  <View style={style.container}>
  <TouchableOpacity
  style={{backgroundColor:'red',height:90,justifyContent:'center',alignItems:'center',borderRadius:7}}
    onPress={() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    }}
  >
    <Text>Press me to {expanded ? "collapse" : "expand"}!</Text>
  </TouchableOpacity>

</View>
);
};

const style = StyleSheet.create({
 tile: {
  backgroundColor: "lightgrey",
  borderWidth: 0.5,
  borderColor: "#d6d7da"
 },
container: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 overflow: "hidden"
}
});

export default Demo;