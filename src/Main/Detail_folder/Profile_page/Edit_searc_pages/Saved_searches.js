import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

import {
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Zocial,
  FontAwesome5,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../../constant/colors";



const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Saved_searches() {
  const [fontsLoaded] = useFonts({
    "prima": require("../../../../../assets/fonts/PrimaSansBold.otf"),
    "prima_r": require("../../../../../assets/fonts/PrimaSansRegular.otf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  

  return (
    <SafeAreaView style={styles.container}>
      
                <View style={{ paddingHorizontal: "6%" }}>
                  <View style={styles.box5}>
                    <Text style={styles.notify}>Notifications</Text>
                    <AntDesign
                      style={{ marginStart: "2%" }}
                      name="questioncircle"
                      size={15}
                      color="blue"
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <View style={styles.menu}>
                      <Text style={styles.menu_txt}>Daily</Text>
                      <Text style={styles.notify}>+</Text>
                    </View>
                    <Text style={styles.txt6}>Edit</Text>
                    <Text style={styles.txt6}>View</Text>
                    <Text style={styles.txt6}>Delete</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginVertical: "1%" }}>
                    <Text style={styles.saved_search}>Saved Search - </Text>
                    <Text style={styles.saved_txt}>May 24 2023</Text>
                  </View>
                  <Text style={styles.saved_txt}>
                    Search in the city All Areas
                  </Text>
                  <View style={styles.line}></View>
                </View>
             
         
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Apply: {
    fontSize: 16,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: "4%",

    paddingHorizontal: "8%",
    borderRadius: 5,
    alignSelf: "center",
    marginTop: "15%",
    marginBottom: "5%",
  },
  reset: {
    fontSize: 16,
    color: Colors.MAIN_COLOR,

    textAlign: "center",

    alignSelf: "center",
  },
  dropdown_txt: { fontSize: 11, fontWeight: "normal", color: "blue" },
  modal_box_txt1: { fontSize: 16, fontWeight: "bold", width: "43%" },
  modal_box_view: { paddingHorizontal: "6%", paddingVertical: "3%" },
  modal_box_txt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom_box: {
    borderRadius: 2,

    borderWidth: 1,
    borderColor: "#cccccc",

    margin: "2%",
    flexDirection: "row",
    width: width * 0.28,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3%",
  },
  done2: { fontSize: 16, fontWeight: "600", textAlign: "right", color: "blue" },
  list_txt: {
    fontSize: 22,
    fontWeight: "normal",
    textAlign: "center",
    marginTop: "5%",
  },
  list: {
    height: "12%",
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "35%",
    backgroundColor: "#cccccc",
    borderRadius: 6,
  },
  done: { flex: 0.4, fontSize: 18, fontFamily: "Inter-Black2" },
  date: {
    flex: 0.8,
    fontSize: 14,
    color: "#cccccc",
    fontFamily: "Inter-Black4",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
    marginBottom: -20,
  },
  modalView: {
    height: "50%",
    width: "100%",
    backgroundColor: "#e6e6e6",
    borderTopWidth: 0.5,
    borderColor: "grey",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_top: {
    flexDirection: "row",
    height: "13%",

    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: "5%",
  },
  ADD: {
    fontSize: 15,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: "4%",
    marginEnd: "5%",
    fontFamily: "prima_r",
    paddingHorizontal: "8%",
    borderRadius: 5,
  },
  more_filter: {
    fontSize: 15,

    color: "black",
    textAlign: "center",
    paddingVertical: "4%",

    fontFamily: "prima_r",
    paddingHorizontal: "12%",
    borderRadius: 5,

    borderWidth: 1,
    borderColor: "#cccccc",
  },
  close: {
    fontSize: 13,

    color: "black",
    textAlign: "center",
    paddingVertical: 7,

    fontFamily: "prima_r",
    borderRadius: 5,
    width: "22%",
    borderWidth: 1,
    borderColor: "#cccccc",
    alignSelf: "flex-end",
    margin: "2%",
  },
  note2: { fontSize: 15, fontFamily: "prima_r", color: "black" },
  note3: { fontSize: 15, color: "black", textAlign: "center" },
  note4: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginVertical: "2%",
  },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    marginTop: "1%",
    width: "100%",
    marginBottom: "0.5%",
  },
  line3: {
    backgroundColor: "#cccccc",
    height: 1,
    marginTop: "1%",
    width: "94%",
    marginBottom: "0.5%",
    marginHorizontal: "6%",
  },
  pin2: {
    flexDirection: "row",

    paddingHorizontal: "6%",
    // alignSelf: "center",
    justifyContent: "space-between",
    paddingVertical: "5%",
  },
  modalText1: {
    fontSize: 18,
   
  },
  input: {
    // height: height * 0.06,

    borderColor: "#999999",

    flexDirection: "row",
    alignSelf: "center",
    marginVertical: "18%",
  },
  modal_page: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    // alignItems:"center"
    alignItems: "center",
    justifyContent: "center",
  },
  modalView1: {
    height: height * 0.6,
    width: "75%",
    backgroundColor: "white",
    borderRadius: 2,

    elevation: 20,
    alignSelf: "center",
  },
  postal_box: {
    fontSize: 14,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    // width: "100%",
    alignSelf: "flex-end",
    fontFamily: "prima_r",
    paddingHorizontal: 15,
    borderRadius: 2,
  },
  note: { fontSize: 13, fontFamily: "prima_r", color: "#6c6c6c" },
  line: {
    height: 1,
    backgroundColor: "#666666",
    marginTop: "8%",
    marginBottom: "15%",
  },
  saved_search: { fontSize: 14, fontFamily: "prima", color: "#427fb8" },
  saved_txt: { fontSize: 13, fontFamily: "prima_r", color: "#6c6c6c" },
  txt6: {
    fontSize: 13,
    backgroundColor: "#20aed6",
    color: "white",
    textAlign: "center",
    paddingHorizontal: "3%",
    paddingVertical: "1.5%",
    borderRadius: 2,

    alignSelf: "center",
    marginHorizontal: "1%",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    height: 25,
    borderColor: "#999999",
    width: "40%",
    borderRadius: 20,
    paddingHorizontal: "2%",
    marginEnd: "6%",
    marginStart: "2%",
  },
  menu_txt: {
    fontSize: 13,
    fontFamily: "prima_r",
    color: "#1e78d8",
  },
  save: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  notify: {
    fontSize: 12,

    color: "#5e5e5e",
    marginStart: "2%",
    fontFamily: "prima",
  },
  contct_view: { marginTop: "8%", paddingHorizontal: "6%" },
  btn: {
    backgroundColor: "#32b0d6",

    height: height * 0.035,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "15%",
  },

  cnct: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
    marginVertical: "8%",
  },
  first_name: { fontSize: 15, fontWeight: "bold", color: "#666666" },
  view2: { flexDirection: "row", marginTop: "1%" },
  view1: { flexDirection: "row" },
  img_set: { flexDirection: "row", marginStart: "30%", flex: 0.9 },
  set_txt: {
    fontSize: 11,
    color: "#3b84c0",
    fontWeight: "bold",
    flex: 0.5,
    paddingLeft: "10%",
  },
  set_txt2: {
    fontSize: 10,
    color: "#3b84c0",
    fontWeight: "bold",
    paddingLeft: "10%",
  },
  set1: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt4: {
    fontSize: 14,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    // width: "100%",
    alignSelf: "center",
    fontFamily: "prima_r",
    paddingHorizontal: 15,
    borderRadius: 2,
  },
  back_img: {
    height: height * 0.032,
    width: width * 0.1,
    resizeMode: "contain",
  },
  circle: {
    backgroundColor: "black",
    height: height * 0.052,
    width: width * 0.11,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  box1: {
    backgroundColor: "#2a6573",

    height: height * 0.08,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "5%",
  },
  box2: {
    // height: height * 0.9,
    // alignItems: "center",

    marginTop: "15%",
    borderWidth: 0.5,
    borderColor: "#666666",
    borderRadius: 6,
    marginHorizontal: "2%",
    padding: 5,
    paddingBottom: "10%",
  },
  box3: {
    // alignItems: "center",

    borderWidth: 0.8,
    borderColor: "#666666",
    borderRadius: 6,
    width: "100%",
    backgroundColor: "#cccccc",
    paddingHorizontal: "2%",
    paddingTop: "2%",
  },
  box4: {
    // alignItems: "center",

    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: "3%",
    justifyContent: "flex-start",
    paddingVertical: "4%",
    paddingHorizontal: "3%",
  },
  box5: {
    // alignItems: "center",

    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: "15%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "4%",
  },
  tch: {
    backgroundColor: "white",
    margin: "2%",
    borderRadius: 4,
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  txt5: {
    textAlign: "center",
    fontSize: 13,
    color: "#6c6c6c",
    fontFamily: "prima_r",
  },
  touch_box: {
    height: 30,

    flexDirection: "row",
    borderRadius: 4,
    backgroundColor: "white",

    alignItems: "center",
    padding: 5,
    marginRight: "2%",
  },

  backimage: { flex: 0.65, marginStart: "5%" },
  box_items: { flexDirection: "row", alignItems: "center" },
  img: {
    height: height * 0.02,
    width: width * 0.05,
    resizeMode: "contain",
    alignSelf: "center",
  },
  img2: {
    height: height * 0.02,
    width: width * 0.05,
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
  scrollView: {
    marginBottom: 20,
  },

  header: {
    color: "white",
    fontWeight: "500",
    fontSize: 21,
  },
  txt1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  txt2: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "#6c6c6c",
  },
  txt3: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default Saved_searches;
