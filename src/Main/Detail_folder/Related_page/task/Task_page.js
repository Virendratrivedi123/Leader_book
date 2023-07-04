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
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DATA = [
  {
    id: "0",
    msg: "Task 1",
    name: "James test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "1",
    msg: "Task 2",
    name: "James test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "2",
    msg: "Task 3",
    name: "James test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "3",
    msg: "Task 2",
    name: "James test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "4",
    msg: "Task 2",
    name: "James test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "5",
    msg: "Task 2",
    name: "James test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
];

function Task_page() {
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

  // console.log(  route.params.user.name,
  //    route.params.user.id,
  //    route.params.user.logo,route.params.index)
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={"Tasks"}
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {}}
        // customRight={true}
      />
      <FlatList
        style={{}}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: "8%",
                marginTop: "5%",
              }}
            >
              <View style={styles.circle}>
                <Image style={styles.img} source={Images.task_cicle}></Image>
              </View>
              <TouchableOpacity
              onPress={() => navigation.navigate("Task_Detail",{"msg":item.msg})}
              >
                <Text style={styles.text1}>{item.msg}</Text>
                <Text style={styles.text2}>
                  Lead Name: <Text
                  onPress={() => {
                    navigation.navigate(ScreenNames.DETAIL
                      , {
                      user: {
                        name: route.params.user.name,
                        id: route.params.user.id,
                        logo: route.params.user.logo,
                      },
                      index: route.params.index,
                      DATA: route.params.DATA,
                      demo:"aman"
                    }
                    );
                    
                    // AsyncStorage.setItem("user_id", item.id);
                  }}
                  style={styles.name}>{item.name}</Text>
                </Text>
                <Text style={styles.text2}>
                  Status: <Text style={styles.text3}>{item.voicemail}</Text>
                </Text>
                <Text style={styles.text2}>
                  Priority: <Text style={styles.text3}>{item.voicemail}</Text>
                </Text>
                <Text style={styles.text2}>
                  Due Date: <Text style={styles.text3}>{item.voicemail}</Text>
                </Text>
                <Text style={styles.text2}>
                  Reminder Time:{" "}
                  <Text style={styles.text3}>{item.voicemail}</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.line}></View>
          </View>
        )}
      />

      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",

          position: "absolute",

          right: "6%",
          // width: Dimensions.get("window").width * 0.16,
          // height: Dimensions.get("window").width * 0.16,

          borderRadius:
            Math.round(
              Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,

          transform: [{ translateY: translation }],
          bottom: height * 0.28,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate(ScreenNames.TPage)}
        >
          <Image
            source={Images.addNote}
            style={{
              width: Dimensions.get("window").width * 0.17,
              height: Dimensions.get("window").width * 0.17,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </Animated.View>
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
    flex: 1,
  },
  img: {
    height: hp("4.51%"),
    width: wp("8%"),
    resizeMode: "contain",
    marginEnd: "1%",
  },
  text1: {
    fontSize: 17,

    // color: "#808080",
    fontFamily: "Inter-Black",
    marginStart: "2%",
    color: "black",
    marginTop: "0%",
  },
  text2: {
    fontSize: 13,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black",
  },
  text3: {
    fontSize: 13,
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: Colors.txt,
    fontFamily: "Inter-Black",
  },
  name: {
    fontSize: 13,
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "#2b92ee",
    fontFamily: "Inter-Black", textDecorationLine: "underline",  textDecorationStyle: "solid",
    textDecorationColor: "#2b92ee",
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
    marginStart: "7%",
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

export default Task_page;
