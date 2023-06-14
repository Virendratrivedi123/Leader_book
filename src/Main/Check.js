import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScreenNames } from "../constant/ScreenNames";
import Basic_detail from "./Detail_folder/Basic_detail";
import Profile from "./Detail_folder/Profile";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
 } from "react-native";
import Related from "./Detail_folder/Related";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STYLES } from "../constant/styles";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { Colors } from "../constant/colors";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();

function MyTabs({ navigation }) {
  const route = useRoute();
  const [id,setid]= useState("")
  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user_id");
      const v = JSON.parse(user);
      setid(v.Lead.id)
      
    //   setid(v.Lead.id)
      //   console.log(v.Lead.id)
    })();
  }, []);
//   console.log(id)
  return (
    <SafeAreaView>
      
      <View style={STYLES.header_box}>
        <TouchableOpacity
          style={STYLES.back_button}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <Text style={STYLES.header}></Text>
        <TouchableOpacity style={STYLES.save_touch} onPress={() => {}}>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1.5,
              borderColor: "white",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: "white",
                marginVertical: "3%",
                marginStart: "2%",
                fontWeight: "bold",
              }}
            >
              Next Level
            </Text>
            <Text style={{ marginHorizontal: "3%", marginVertical: "3%" }}>
              <FontAwesome name="long-arrow-right" size={15} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.MAIN_COLOR,
        }}
      >
        <View
          style={{
            height: height * 0.07,
            width: width * 0.15,

            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            marginStart: "5%",
            backgroundColor: "#666699",
            marginBottom: "3%",
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "white" }}>
           
          </Text>
        </View>
        <Text
          style={{
            fontSize: 22,
            marginStart: "3%",
            fontWeight: "500",
            color: "white",
          }}
        >
          
        </Text>
        <Text
          style={{ marginStart: "3%" }}
        //   onPress={() =>
        //     navigation.navigate(ScreenNames.EDIT_LEAD_DETAIL, {
        //       id: route.params.user.id,
        //     })
        //   }
        >
          <FontAwesome5 name="pencil-alt" size={25} color="yellow" />
        </Text>
        <Text style={{ marginStart: "3%" }}>
          <MaterialCommunityIcons name="delete" size={30} color="red" />
        </Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name={ScreenNames.BASIC_DETAIL} component={Basic_detail} />
        <Tab.Screen name={ScreenNames.PROFILE} component={Profile} />
        {/* <Tab.Screen name={ScreenNames.RELATED} component={Related} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default MyTabs;
