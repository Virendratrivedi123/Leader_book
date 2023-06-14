import React, { useState } from "react";
import { useFonts } from 'expo-font';
import {
  Entypo,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useRoute } from "@react-navigation/native";
import { STYLES } from "../constant/styles";
import { Images } from "../constant/images";
import Header from "./header";
import { Colors } from "../constant/colors";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Phone() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../assets/fonts/Mulish-Regular.ttf'),
    
   
  });
  const navigation = useNavigation();
  const [com, setcom] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Phone"
        leftIcon={Images.menu}
        // rightIcon={Images.search}
        onLeftPress={() => navigation.toggleDrawer()}
        onRightPress={() => {}}
        customRight={true}
      />
      <Text
        style={{
          color: Colors.blue_txt,
          fontSize: 18,
          marginTop: "10%",
          marginHorizontal: "6%",  fontFamily:"Inter-Black4",
        }}
      >
        Choose Calling Method
      </Text>
      <TouchableOpacity
        onPress={() => {
          setcom("By Twilio");
        }}
        style={styles.button}
        activeOpacity={1}
      >
        {com == "By Twilio" ? (
          <Text style={styles.circle2}>
            <MaterialCommunityIcons
              name="checkbox-marked-circle"
              size={31}
              color={Colors.blue_txt}
            />
          </Text>
        ) : (
          <Text style={styles.circle}></Text>
        )}

        <Text style={styles.login}>By Twilio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setcom("By Phone");
        }}
        style={styles.button}
        activeOpacity={1}
      >
        {com == "By Phone" ? (
          <Text style={styles.circle2}>
            <MaterialCommunityIcons
              name="checkbox-marked-circle"
              size={31}
              color={Colors.blue_txt}
            />
          </Text>
        ) : (
          <Text style={styles.circle}></Text>
        )}

        <Text style={styles.login}>By Phone</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  button: {
    height: "7%",
    width: "90%",
    marginVertical: "2%",
    borderRadius: 8,
    alignSelf: "center",
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
  },
  login: {
    textAlign: "center",
    color: Colors.blue_txt,
    fontSize: 18,
    marginStart: "5%",
    fontFamily:"Inter-Black",
  },
  circle: {
    marginStart: "3%",
    height: height * 0.034,
    width: "8%",
    borderWidth: 1,
    borderRadius: 15,borderColor:Colors.blue_txt
  },
  circle2: {
    marginStart: "3%",

    width: "8%",

    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",borderColor:Colors.blue_txt
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: "contain",
  },
});

export default Phone;
