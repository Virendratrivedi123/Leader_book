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
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STYLES } from "../../../constant/styles";
import { Colors } from "../../../constant/colors";
import { Images } from "../../../constant/images";
import Header2 from "../../../components/header2";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Page() {
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
      <Header2
        label={route.params.name}
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {}}
        // customRight={true}
      />

      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",

          position: "absolute",

          right: "12%",
          width: Dimensions.get("window").width * 0.18,
          height: Dimensions.get("window").width * 0.18,

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
          onPress={() =>
            navigation.navigate(route.params.n, { name: route.params.name })
          }
        >
          <Image
            source={Images.addNote}
            style={{ height: 60, width: 60, resizeMode: "contain" }}
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
  input: {
    height: height * 0.075,
    width: width * 0.9,
    marginTop: 30,

    padding: 10,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 1,
    borderRadius: 6,
    color: "#808080",
    fontSize: 20,
  },
  button: {
    height: height * 0.085,
    width: width * 0.9,
    marginTop: 50,

    padding: 10,
    alignSelf: "center",
    backgroundColor: "#003366",
    elevation: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  //   header: {
  //     height: height * 0.1,
  //     backgroundColor: "#003366",
  //     justifyContent: "space-between",
  //     alignItems: "center",flexDirection:"row",
  //   },
  header: {
    height: height * 0.12,
    backgroundColor: "white",
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  headertxt1: {
    fontSize: 16,
    marginStart: "8%",
    marginTop: "7%",
    flex: 0.5,
  },

  headertxt2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "7%",
    textAlign: "center",
  },
  fp_text: {
    fontSize: 15,
    color: "black",
    textAlign: "right",
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Page;
