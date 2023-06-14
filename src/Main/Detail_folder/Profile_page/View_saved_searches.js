import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Zocial,
  FontAwesome5,
} from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../constant/colors";
import { Images } from "../../../constant/images";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function View_saved_searches() {
  const navigation = useNavigation();
  const route = useRoute();
  const [mark, setmark] = useState(false);
  const [mark1, setmark1] = useState(false);
    // console.log(route.params.data.email)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_box}>
        <View style={styles.box_items}>
          <TouchableOpacity
            style={styles.backimage}
            onPress={() => navigation.goBack()}
          >
            <Image source={Images.backArrow} style={styles.img} />
          </TouchableOpacity>
          <Text style={styles.header}>Lead User Searches</Text>
        </View>
      </View>
      <View>
        <View style={styles.box1}>
          <Text style={styles.txt1}>Lead User:</Text>
          <Text style={styles.txt2}>
            {route.params.data.name} ({route.params.data.email} -
          </Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.txt3}>Stop Saved Search Email?</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setmark(!mark);
            }}
          >
            {mark ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color={Colors.MAIN_COLOR}
              />
            ) : (
              <FontAwesome name="circle-thin" size={18} color="#cccccc" />
            )}
            <Text style={styles.txt4}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setmark(!mark);
            }}
          >
            {mark ? (
              <FontAwesome name="circle-thin" size={18} color="#cccccc" />
            ) : (
              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color={Colors.MAIN_COLOR}
              />
            )}
            <Text style={styles.txt4}>Yes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box3}>
          <Text style={styles.txt5}>Saved Search - 22 May 2023</Text>
          <Text style={styles.txt6}>Notifications: Daily</Text>
          <Text style={styles.txt7}>Search in the city All Areas</Text>
          <View style={styles.line}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: { flexDirection: "row", alignItems: "center" },
  txt4: { paddingLeft: "3%", fontWeight: "500", fontSize: 15 },
  txt5: {
    fontWeight: "500",
    fontSize: 15,
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt6: {
    fontWeight: "400",
    fontSize: 15,
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt7: {
    fontWeight: "normal",
    fontSize: 14,
    paddingTop: "2.5%",
    color: "#404040",
    paddingLeft: "3%",
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#8c8c8c",
    marginTop: "15%",
  },
  box3: {
    margin: 3,
    borderRadius: 6,
    borderWidth: 1,

    height: height * 0.775,
    borderColor: "#8c8c8c",
  },
  box1: {
    backgroundColor: "#00ffff",
    margin: 3,
    borderRadius: 6,
    paddingLeft: 10,
    height: height * 0.06,
  },
  box2: {
    margin: 3,
    borderRadius: 6,
    borderWidth: 0.5,
    height: height * 0.06,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#8c8c8c",
  },
  backimage: { flex: 0.65, marginStart: "5%" },
  box_items: { flexDirection: "row", alignItems: "center" },
  img: {
    height: height * 0.028,
    width: width * 0.1,
    resizeMode: "contain",
  },
  header_box: {
    height: height * 0.08,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },

  header: {
    color: "white",
    fontWeight: "500",
    fontSize: 21,
  },
  txt1: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: "1%",
  },
  txt2: {
    color: "#0080ff",
    fontWeight: "normal",
    fontSize: 13,
  },
  txt3: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default View_saved_searches;
