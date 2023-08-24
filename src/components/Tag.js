import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import User_tag from "./taglist/User_tag";
import System_tag from "./taglist/System_tag";
import { STYLES } from "../constant/styles";
import { Colors } from "../constant/colors";
import Header from "./header";
import { Images } from "../constant/images";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { useFonts } from 'expo-font';
import New_pG from "./taglist/New";


function Tag() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const [com, setcom] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label2="Tags"
        leftIcon={Images.menu}
        rightIcon={{}}
        onLeftPress={() => navigation.toggleDrawer()}
      />

      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.ord}
          onPress={() => {
            setcom("User_tag");
          }}
        >
          <Text style={styles.home_text}>USER TAGS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ord}
          onPress={() => {
            setcom("System_tag");
          }}
        >
          <Text style={styles.home_text}>SYSTEM TAGS</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 3,
            width: width * 0.5,
            backgroundColor: com == "User_tag" ? "#ffcc00" :Colors.MAIN_COLOR,
          }}
        ></View>

        <View
          style={{
            height: 3,
            width: width * 0.5,
            backgroundColor: com == "System_tag" ? "#ffcc00" : Colors.MAIN_COLOR,
          }}
        ></View>
      </View>

      <View style={{ flex: 1 }}>
        {com == "User_tag" ? (
          <New_pG />
        ) : com == "System_tag" ? (
          <System_tag />
        ) : (
          setcom("User_tag")
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  home_text: {
    fontSize: 16,
    fontFamily:"Inter-Black3",
    color: "white",
    textAlign: "center",
    paddingVertical: "3%",
  },

  tab: {
    flexDirection: "row",
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
  },
  ord: {
    backgroundColor: Colors.MAIN_COLOR,
    marginTop: "0%",
    // marginStart: "0%",
    // flex: 0.5,
  },
  add: {
    backgroundColor: Colors.MAIN_COLOR,
    marginTop: "0%",
  },
});

export default Tag;
