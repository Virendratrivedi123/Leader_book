import React, { useState } from "react";

import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Forgot_password } from "./Services";
import { STYLES } from "./constant/styles";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Forgot_pasword() {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const forgot_method = async () => {
    if (email == "") {
      alert("Please enter email");
    } else {
      try {
        setLoading(true);
        Forgot_password(email)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.status == 1) {
              setLoading(false);
              Alert.alert("Success", result.message, [
                { text: "OK", onPress: () => navigation.navigate("Login") },
              ]);
            } else {
              alert(result.message);
            }
          });
      } catch (error) {
        console.log("error==>" + error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
          <Text style={STYLES.header}>Forgot Password</Text>
        </View>
        {/* <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={{margin:"5%"}}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.login}>Forgot Password</Text>
        </View> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#bfbfbf"}
          keyboardType="email-address"
          maxLength={40}
          onChangeText={setEmail}
          value={email}
        />

        <TouchableOpacity onPress={forgot_method} style={styles.button}>
          <Text style={styles.login}>Reset my Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: "normal",
  },
  //   header: {
  //     height: height * 0.1,
  //     backgroundColor: "#003366",
  //     justifyContent: "space-between",
  //     alignItems: "center",flexDirection:"row",
  //   },
  header: {
    height: height * 0.12,
    backgroundColor: "#003366",
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
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
  },
  fp: {},
  fp_text: {
    fontSize: 15,
    color: "black",
    textAlign: "right",
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Forgot_pasword;
