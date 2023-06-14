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
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

import { Colors } from "../../../../constant/colors";
import { useFonts } from "expo-font";

import { useNavigation, useRoute } from "@react-navigation/native";
import Data_next from "./Data_next";

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

function Modal_data({ data }) {
  const [fontsLoaded] = useFonts({
    prima: require("../../../../../assets/fonts/PrimaSansBold.otf"),
    prima_r: require("../../../../../assets/fonts/PrimaSansRegular.otf"),
  });
  const navigation = useNavigation();
  const route = useRoute();

  const [First_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [arr, setarr] = React.useState();

  const [d, setd] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {d?<Data_next data={arr}/>:<View style={styles.contct_view}>
        <Text style={styles.header}>{data}</Text>
        <FlatList
          style={{}}
          data={DATA}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.modal_box_txt}>
                <Text onPress={() => {setd(true),setarr(item)}} style={styles.modal_box_txt1}>
                  {item.description}
                </Text>

                <TouchableOpacity
                  style={styles.modal_box_txt2}
                  onPress={() => {}}
                >
                  <FontAwesome
                    style={{}}
                    name="long-arrow-right"
                    size={16}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>}
      
      <View style={styles.note_view}>
        <Text style={styles.note}>
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
      </View>
      <View style={styles.login_view}>
        <Text style={styles.login}>Login</Text>
        <Text style={styles.copy}>Copyright 2023 SellingToolz Ltd</Text>
        <Text style={styles.policy}>Privacy Policy</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login_view: {
    backgroundColor: "#790102",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  note_view: { backgroundColor: "#6d6e72",  },
  note: { fontSize: 15, padding: "5%", color: "white", textAlign: "center",lineHeight: 25, },
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
  contct_view: { paddingHorizontal: "5%",marginBottom: "40%" },
  header: {
    marginTop: "3%",
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

export default Modal_data;
