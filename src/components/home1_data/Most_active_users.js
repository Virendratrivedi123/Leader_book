import React, { useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNames } from "../../constant/ScreenNames";
import { STYLES } from "../../constant/styles";
import { Images } from "../../constant/images";
import Header from "../header";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
function Most_active_users() {
  const navigation = useNavigation();
  const [d, setd] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
<Header
        label="Most active users"
        leftIcon={Images.backArrow}
        rightIcon={Images.time}
        onLeftPress={() => navigation.navigate(ScreenNames.HOME)}
        // onRightPress={() => navigation.navigate(ScreenNames.LAST_LOGGED_USERS)}
      />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          height: height * 0.04,
          width: width * 0.45,
          backgroundColor: d == true ? "orange" : null,
          margin: "3%",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          // onPress={selectAlldata}
        >
          <Text
            style={{ color: d == true ? "white" : "#b3b3b3", fontSize: 20 }}
          >
            Select All
          </Text>
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

export default Most_active_users;
