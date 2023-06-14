import React from "react";

import { Entypo, Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../constant/ScreenNames";
import { STYLES } from "../constant/styles";
import { Dimensions } from "react-native";
import Header from "./header";
import { Images } from "../constant/images";

function Home() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
   
  });
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Home"
        leftIcon={Images.menu}
        rightIcon={{}}
        onLeftPress={() => navigation.toggleDrawer()}
        onRightPress={() => navigation.navigate(ScreenNames.LAST_LOGGED_USERS)}
      />
      
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.LAST_LOGGED_USERS)}
        style={STYLES.button}
      >
        <View style={{ flexDirection: "row", marginStart: "2%" }}>
          <Ionicons name="md-person-sharp" size={25} color="white" />
          <Text style={styles.login}>Last Logged Users</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.MOST_ACTIVE_USERS)}
        style={STYLES.button}
      >
        <View style={{ flexDirection: "row", marginStart: "2%" }}>
          <Ionicons name="md-person-sharp" size={25} color="white" />
          <Text style={styles.login}>Most Active Users</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={STYLES.button}
      >
        <View style={{ flexDirection: "row", marginStart: "2%" }}>
          <Ionicons name="md-person-sharp" size={25} color="white" />
          <Text style={styles.login}>Recent Leads</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.EDIT_PROFILE)}
        style={STYLES.button}
      >
        <View style={{ flexDirection: "row", marginStart: "2%" }}>
          <Ionicons name="md-person-sharp" size={25} color="white" />
          <Text style={styles.login}>Edit Profile</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  login: {
    
    color: "white",
    fontSize: 18,
    marginStart: "3%",
    fontFamily:"Inter-Black",
  },
});

export default Home;
