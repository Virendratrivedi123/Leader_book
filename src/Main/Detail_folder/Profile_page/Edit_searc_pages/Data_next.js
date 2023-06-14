import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  Zocial,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { Colors } from "../../../../constant/colors";
import { useFonts } from "expo-font";

import { useNavigation, useRoute } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DATA = [
  {
    id: 0,
    name: "SELLING",

    description: "29 Essential Tips",
    s: false,
  },
  {
    id: 1,
    name: "BUYING",

    description: "Home Didnt sell?",
    s: false,
  },
  {
    id: 2,
    name: "LISTINGS",

    description: "Free Home Evaluation",
    s: false,
  },
  {
    id: 4,
    name: "RESOURCES",

    description: "Sold in 27 Days",
    s: false,
  },
  {
    id: 5,
    name: "LISTINGS",

    description: "Free Home Evaluation",
    s: false,
  },
  {
    id: 6,
    name: "RESOURCES",

    description: "Sold in 27 Days",
    s: false,
  },
  {
    id: 7,
    name: "LISTINGS",

    description: "Free Home Evaluation",
    s: false,
  },
  {
    id: 8,
    name: "RESOURCES",

    description: "Sold in 27 Days",
    s: false,
  },
];

function Data_next({ data }) {
  const [fontsLoaded] = useFonts({
    prima: require("../../../../../assets/fonts/PrimaSansBold.otf"),
    prima_r: require("../../../../../assets/fonts/PrimaSansRegular.otf"),
  });
  const navigation = useNavigation();
  const route = useRoute();

  const [First_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [phone, setPhone] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contct_view}>
        <Text style={styles.header}>{data.description}</Text>
        <Text style={styles.note2}>
          Newton, Galileo and Einstein have all been called "Fathers of Modern
          Physics." Newton was called this because of his famous law of motion
          and gravitation, Galileo for his role in the scientific revolution and
          his contributions on observational astronomy, and Einstein for his
          groundbreaking theory of relativity. Newton, Galileo and Einstein have
          all been called "Fathers of Modern Physics." Newton was called this
          because of his famous law of motion and gravitation, Galileo for his
          role in the scientific revolution and his contributions on
          observational astronomy, and Einstein for his groundbreaking theory of
          relativity. Newton, Galileo and Einstein have all been called "Fathers
          of Modern Physics." Newton was called this because of his famous law
          of motion and gravitation, Galileo for his role in the scientific
          revolution and his contributions on observational astronomy, and
          Einstein for his groundbreaking theory of relativity.
        </Text>
        <Text style={styles.note}>it's easy ...</Text>
        <Text style={styles.note}>
          motion and gravitation, Galileo for his role in the scientific
          revolution and his contributions on observational astronomy
        </Text>
        <Text style={styles.note3}>
          motion and gravitation, Galileo for his role in the scientific
          revolution and his contributions on observational astronomy
        </Text>
        <Text style={styles.first_name}>First Name*</Text>
        <View style={styles.input_image}>
          <FontAwesome5 name="user-alt" size={17} color="black" />
        </View>
        <TextInput
          placeholder=""
          style={styles.input}
          // value={phone}
          // onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor={"#666666"}
        ></TextInput>
        <Text style={styles.first_name}>Last Name*</Text>
        <View style={styles.input_image}>
          <FontAwesome5 name="user-alt" size={17} color="black" />
        </View>
        <TextInput
          placeholder=""
          style={styles.input}
          // value={phone}
          // onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor={"#666666"}
        ></TextInput>
        <Text style={styles.first_name}>Phone*</Text>
        <View style={styles.input_image}>
          <MaterialIcons name="call" size={17} color="black" />
        </View>
        <TextInput
          placeholder=""
          style={styles.input}
          // value={phone}
          // onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor={"#666666"}
        ></TextInput>
        <Text style={styles.first_name}>Email*</Text>
        <View style={styles.input_image}>
          <Zocial name="email" size={17} color="black" />
        </View>
        <TextInput
          placeholder=""
          style={styles.input}
          // value={phone}
          // onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor={"#666666"}
        ></TextInput>
        <Text style={styles.first_name}>Code Above*</Text>
        <View style={styles.input_image}>
          <Entypo name="google-drive" size={17} color="black" />
        </View>
        <TextInput
          placeholder=""
          style={styles.input}
          // value={phone}
          // onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor={"#666666"}
        ></TextInput>
        <TouchableOpacity
        style={styles.btn}
        >
           <Text style={styles.btn_txt}>Continue {">"}{">"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    btn_txt:{fontSize:20,color:"white",elevation:10},
    btn:{ backgroundColor: "red",

    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "8%",width:"60%",alignSelf:"center"},
  input: {
    height: height * 0.05,

    borderColor: "#cccccc",
    //   width:"90%",

    borderWidth: 1,
    paddingHorizontal: 7,
    color: Colors.txt,
    marginTop: "5%",
    fontFamily: "prima_r",
    fontSize: 13,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  input_image: {
    borderColor: "#cccccc",
    height: height * 0.053,
    width: "13%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#e6e6e6",
    borderStartWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  first_name: {
    fontSize: 15,
    color: "#666666",
    fontWeight: "bold",
    marginTop: "5%",marginBottom:"3%"
  },
  login_view: {
    backgroundColor: "#790102",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  note_view: { backgroundColor: "#6d6e72", marginTop: "40%" },
  note: {
    fontSize: 15,
    color: "#6c6c6c",
    lineHeight: 25,
    fontWeight: "bold",
    paddingVertical: "3%",
  },
  note2: { fontSize: 15, color: "black", lineHeight: 25 },
  note3: { fontSize: 12, color: "#6c6c6c", lineHeight: 15, fontWeight: "bold" },
  policy: { color: "white", fontSize: 15, textDecorationLine: "underline" },
  copy: { color: "white", fontSize: 14, paddingVertical: "2%" },
  login: { color: "white", fontSize: 15, textDecorationLine: "underline" },
  container: { flex: 1 },
  modal_box_txt2: {
    backgroundColor: Colors.MAIN_COLOR,
    paddingEnd: "7%",
    paddingVertical: "5%",
    paddingStart: "3%",
  },
  contct_view: { paddingHorizontal: "3%" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6c6c6c",
    marginBottom: "7%",
  },
  modal_box_txt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5%",
  },
  modal_box_txt1: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: Colors.MAIN_COLOR,
    paddingStart: "7%",
    paddingVertical: "5%",
  },
});

export default Data_next;
