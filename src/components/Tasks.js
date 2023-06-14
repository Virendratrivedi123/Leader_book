import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Complete from "./tasks/Complete";
import InComplete from "./tasks/Incomplete";
import { STYLES } from "../constant/styles";
import { Images } from "../constant/images";
import Header from "./header";
import { Colors } from "../constant/colors";

// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Tasks() {
  const [com, setcom] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Tasks"
        leftIcon={Images.menu}
        rightIcon={Images.time}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View style={{}}>
        <View>
          <View style={styles.tab}>
            <TouchableOpacity
              style={styles.ord}
              onPress={() => {
                setcom("MY ORDERS");
              }}
            >
              <View style={styles.home_text}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Incomplete
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.add}
              onPress={() => {
                setcom("MY ADDRESSES");
              }}
            >
              <View style={styles.home_text}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Complete
                </Text>
              </View>
              {/* <View
                  style={{
                    height: 2,
                    width: 100,
                    backgroundColor: com == "MY ADDRESSES" ? "#ffcc00" : "#003366",
                    marginTop: "10%",
                  }}
                ></View> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.setting}
              onPress={() => {
                setcom("ALL SETTINGS");
              }}
            ></TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: Colors.MAIN_COLOR,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 3,
                width: width * 0.5,
                backgroundColor: com == "MY ORDERS" ? "#ffcc00" : Colors.MAIN_COLOR,
                marginTop: "2%",
              }}
            ></View>

            <View
              style={{
                height: 3,
                width: width * 0.5,
                backgroundColor: com == "MY ADDRESSES" ? "#ffcc00" : Colors.MAIN_COLOR,
                marginTop: "2%",
              }}
            ></View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {com == "MY ORDERS" ? (
          <InComplete />
        ) : com == "MY ADDRESSES" ? (
          <Complete />
        ) : (
          setcom("MY ORDERS")
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tab: {
    flexDirection: "row",
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  ord: {
    backgroundColor: Colors.MAIN_COLOR,
    marginTop: "0%",
    marginStart: "5%",
    flex: 0.5,
  },
  add: {
    backgroundColor: Colors.MAIN_COLOR,
    marginTop: "0%",
    flex: 0.55,
  },
  setting: {
    backgroundColor: "#003366",
    marginTop: "5%",

    marginBottom: 0,
  },
});

export default Tasks;
