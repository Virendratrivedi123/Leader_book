import React from "react";

import { Entypo, Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../constant/ScreenNames";
import { STYLES } from "../constant/styles";
import { Dimensions } from "react-native";
import Header from "./header";
import { Images } from "../constant/images";
import { Active_filters } from "../Services";

function Home() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
   
  });
  const navigation = useNavigation();
  React.useEffect(() => {
    (async () => {
    
      get_it();
    
    })();
  }, []);
  async function get_it() {
    const user_data = await AsyncStorage.getItem("user_data");
    const search = await AsyncStorage.getItem("search");
    const d = JSON.parse(user_data);

    // console.log(dr)
    const data = {
      email: d.email,
      password: d.password,
      no: "",
      filters: "0",
    };
    Active_filters(data)
      .then((response) => response.json())
      .then(async (responseJson) => {
        // Successful response from the API Call
        const f_v=(responseJson.data.active_users_filter_value);
        responseJson.data.active_users_filter.map((i)=>{
          if(f_v == i.value){
            AsyncStorage.setItem("label",i.label)
          }
        })
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
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
        <View style={{ flexDirection: "row", marginStart: "3%" }}>
          <Ionicons name="md-person-sharp" size={23} color="white" />
          <Text style={styles.login}>Last Logged Users</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.MOST_ACTIVE_USERS)}
        style={STYLES.button}
      >
        <View style={{ flexDirection: "row", marginStart: "3%" }}>
          <Ionicons name="md-person-sharp" size={23} color="white" />
          <Text style={styles.login}>Most Active Users</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
         onPress={() => {AsyncStorage.setItem("op","2"),
         navigation.push(ScreenNames.DRAWER)}}
        style={STYLES.button}
      >
        <View style={{ flexDirection: "row", marginStart: "3%" }}>
          <Ionicons name="md-person-sharp" size={23} color="white" />
          <Text style={styles.login}>Recent Leads</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.EDIT_PROFILE)}
        style={STYLES.button}
      >
        <View style={{ flexDirection: "row", marginStart: "3%" }}>
          <Ionicons name="md-person-sharp" size={23} color="white" />
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
    fontSize: 17,
    marginStart: "3%",
    fontFamily:"Inter-Black",
  },
});

export default Home;
