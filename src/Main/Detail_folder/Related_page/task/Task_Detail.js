import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  FlatList,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STYLES } from "../../../../constant/styles";
import { Colors } from "../../../../constant/colors";
import { Images } from "../../../../constant/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { ScreenNames } from "../../../../constant/ScreenNames";
import Header from "../../../../components/header";

import { ScrollView } from "react-native-gesture-handler";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DATA = [
  {
    id: "0",
    name: "Task 2",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "1",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "2",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "3",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "4",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "5",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
];

function Task_Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;
  useEffect(() => {
    Animated.timing(translation, {
      toValue: h,
      delay: 0,
      easing: Easing.elastic(4),
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={"Task Detail"}
        leftIcon={Images.backArrow}
        rightIcon2={Images.pencil}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {navigation.navigate("Edit_Task_Detail")}}
        customRight={true}
      />
      <ScrollView 
      endFillColor={"white"}
      style={{}}>
        <Text style={styles.header_msg}>{route.params.msg}</Text>

        <View style={{ paddingHorizontal: "8%", paddingTop: "5%" ,backgroundColor: "white",height:height}}>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.link_button}/>
           
          </View>

          <Text style={styles.name}>Test James</Text>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.user_icon}></Image>
           
          </View>

          <Text style={styles.text3}>Test James</Text>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.warning}></Image>
            
          </View>

          <Text style={styles.text3}>Test James</Text>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.calender}></Image>
           
          </View>

          <Text style={styles.text3}>Test James</Text>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.calender}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>Test James</Text>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.graph}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>Test James</Text>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.percentage}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>Test James</Text>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.task_note}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>Test James</Text>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: 60,
    position: "absolute",
    bottom: "10%",
    alignSelf: "flex-end",
    right: "8%",
    height: 60,
    backgroundColor: Colors.MAIN_COLOR,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "black",
    resizeMode: "contain",
  },
  container: {
    flex: 1,backgroundColor: Colors.MAIN_COLOR,
  },
  header_msg: {
    fontSize: wp("6.5%"),

    // color: "#808080",
    fontFamily: "Inter-Black2",
    textAlign: "center",
    color: "white",
    backgroundColor: Colors.MAIN_COLOR,
    paddingBottom: "2%",
    marginTop: "-1.5%",
  },
  img: {
    height: hp("4.51%"),
    width: wp("7%"),
    resizeMode: "contain",
    marginEnd: "1%",
  },
  label: {
    fontSize: 14,

    // color: "#808080",
    fontFamily: "Inter-Black4",
    paddingStart: "15%",
    color: Colors.txt,
    marginBottom: "-4%",
  },
  name:{ fontSize: 16,
    marginTop: "-3%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "#2b92ee",
    fontFamily: "Inter-Black4",
    paddingStart: "15%",
    marginBottom: "7%",},
  text2: {
    fontSize: 13,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black",
  },
  text3: {
    fontSize: 16,
    marginTop: "-4%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "black",
    fontFamily: "Inter-Black4",
    paddingStart: "15%",
    marginBottom: "7%",
  },
  text4: {
    fontSize: 15,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "5%",
    color: "#666666",
    fontFamily: "Inter-Black",
  },
  text5: {
    fontSize: 18,

    // color: "#808080",
    marginStart: "3%",
    color: "#8c8c8c",
    fontFamily: "Inter-Black",
  },

  circle: {
    flexDirection: "row",
  },
  circle_text: {
    fontSize: 30,
    fontWeight: "600",
    color: "#bfbfbf",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "2%",
    width: "100%",
  },
});

export default Task_Detail;
