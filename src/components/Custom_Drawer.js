import React, { useEffect, useState ,useCallback} from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import {
  Feather,
  AntDesign,
  SimpleLineIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,Image
} from "react-native";
import { ScreenNames } from "../constant/ScreenNames";
import { Colors } from "../constant/colors";
import { STYLES } from "../constant/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from "../constant/images";
function Customdrawer(props) {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const navigation = useNavigation();
  const [First_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");

  const [company, setCompany] = React.useState("");

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const d = JSON.parse(user);
      setCompany(d?.userinfo?.company);
      setFirst_name(d?.userinfo?.first_name);
      setLast_name(d?.userinfo?.last_name);
      //  console.log(d)
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // console.log(company)
  return (
    <DrawerContentScrollView style={{marginTop:"-1.7%",backgroundColor:"#f5f5f5",}} {...props}onLayout={onLayoutRootView}>
      <View style={styles.up}>
        <View style={{ marginTop: "8%", marginStart: "8%" }}>
          <View style={styles.circle}>
            <Text style={styles.circle_text}>
              {First_name[0]}
              {last_name[0]}
            </Text>
          </View>

          <Text style={styles.name_text}>
            {First_name} {last_name}
          </Text>
          <Text style={styles.name_text2}>{company}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.HOME)}
        style={styles.gap}
      >
        <View style={styles.icon}>
        
        <Image style={styles.icon2} source={Images.home_navigation}></Image>
          <Text style={styles.ICON_TEXT}>HOME</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.MAIN_SCREEN)}
        style={styles.gap}
      >
        <View style={styles.icon}>
        <Image style={styles.icon2} source={Images.lead}></Image>
          <Text style={styles.ICON_TEXT}>LEADS</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.TAG)}
        style={styles.gap}
      >
        <View style={styles.icon}>
        <Image style={styles.icon2} source={Images.tags}></Image>
          <Text style={styles.ICON_TEXT}>TAG SEARCH</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.TASKS)}
        style={styles.gap}
      >
        <View style={styles.icon}>
        <Image style={styles.icon2} source={Images.tasks_navigation}></Image>
          <Text style={styles.ICON_TEXT}>TASKS</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.APPOINTMENTS)}
        style={styles.gap}
      >
        <View style={styles.icon}>
        <Image style={styles.icon2} source={Images.calender}></Image>
          <Text style={styles.ICON_TEXT}>APPOINTMENTS</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.PHONE)}
        style={styles.gap}
      >
        <View style={styles.icon}>
        <Image style={styles.icon2} source={Images.settings}></Image>

          <Text style={styles.ICON_TEXT}>PHONE</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.RECENT_CHATS)}
        style={styles.gap}
      >
        <View style={styles.icon}>
        <AntDesign name="wechat" size={26} color={Colors.ICON} />
          
          <Text style={styles.ICON_TEXT}>RECENT CHATS</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.gap}>
        <View style={styles.icon}>
        <Image style={styles.icon2} source={Images.logout}></Image>
          <Text style={styles.ICON_TEXT}>LOG OUT</Text>
        </View>
      </TouchableOpacity>
     
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  
  gap: { marginVertical: "9.1%" },
  circle: {
    width: Dimensions.get('window').width * 0.22,
    height: Dimensions.get('window').width * 0.22,

borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    backgroundColor: "white",
   
    alignItems: "center",
    justifyContent: "center",elevation:30,
  },
  circle_text: {
    fontSize: 35,
  
    color: "#a9a9a9",fontFamily:"Inter-Black2"
  },
  name_text: {
    fontSize: 17,
    fontFamily:"Inter-Black2",
    color: "white",
    marginTop: "5%",
  },
  name_text2: {
    fontSize: 15,
    
    color: "white",
    width: width * 0.5,fontFamily:"Inter-Black2",marginBottom:"10%"
  },
  ICON_TEXT: {
    fontSize: wp("5.13%"),
    color: "black",
    
    marginStart: "1.5%",marginTop:"1%",fontFamily:"Inter-Black"
  },
  up: {
    // height: height * 0.22,
    backgroundColor: "#506584",
  },

  icon: {
    flexDirection: "row",
    marginStart: "7%",
  },
  icon2: {
    
    height: hp("4.5%"),
    width: wp("8.58%"),
    resizeMode: "contain",
   
  },
});

export default Customdrawer;
