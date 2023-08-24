import React, { useState, useEffect, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Recent from "./Recent";
import Priority from "./Priority";
import All from "./All";
import { Colors } from "../constant/colors";
import { STYLES } from "../constant/styles";
import { BackHandler } from "react-native";
import Header from "../components/header";
import { Images } from "../constant/images";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScreenNames } from "../constant/ScreenNames";

export default function Main_Screen({ navigation }) {
  const [com, setcom] = useState(false);
  const [com1, setcom1] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const hasUnsavedChanges = Boolean(true);
  const route = useRoute();

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../assets/fonts/Mulish-Regular.ttf"),
    prima: require("../../assets/fonts/PrimaSansBold.otf"),
    prima_r: require("../../assets/fonts/PrimaSansRegular.otf"),
  });

  React.useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("o", "1");
      const user = await AsyncStorage.getItem("fm");

      console.log(user);
      if (user == 1) {
        // setModalVisible(true);
      }
    })();
  }, []);
  
  React.useEffect(() => {
    (async () => {
      const user2 = await AsyncStorage.getItem("op");
      const user3 = await AsyncStorage.getItem("search");
      console.log(route?.params?.i,"pt");
      if (user2 == "1") {
        setcom("ALL");
        // setModalVisible(true);
      }
      if (route?.params?.i == "1") {
        setcom("All");
        // setModalVisible(true);
      }
      if (route?.params?.i == "pt") {
        setcom("PRIORITY");
        // setModalVisible(true);
      }
    })();
  }, []);
  // console.log(height)
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen

        // e.preventDefault();

        // setModalVisible1(true);
      }),
    [navigation, hasUnsavedChanges]
  );
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const a = "pass";
 
  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Header
        label2="Leads"
        leftIcon={Images.menu}
        rightIcon={Images.search}
        onLeftPress={() => navigation.toggleDrawer()}
        // onRightPress={() => {AsyncStorage.removeItem("op")
        // AsyncStorage.removeItem("set"),navigation.navigate("Search")}}
      />
      <View>
        <View style={styles.tab}>
          <TouchableOpacity
            style={styles.ord}
            onPress={() => {
              setcom("RECENT");
              AsyncStorage.removeItem("op")
              AsyncStorage.removeItem("set")
            }}
          >
            <View style={styles.home_text}>
              <Text
              //  onPress={() => {AsyncStorage.setItem("op","2"),
              //  navigation.push(ScreenNames.DRAWER)}}
                style={{
                  fontSize: wp("4.93%"),
                  fontFamily: com == "RECENT" ? "Inter-Black3" : "Inter-Black2",
                  color: "white",
                  marginBottom: "2%",
                  marginTop: "4%",
                }}
              >
                RECENT
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.add}
            onPress={() => {
              setcom("PRIORITY");
              AsyncStorage.removeItem("op")
              AsyncStorage.removeItem("set")
            }}
          >
            <View style={styles.home_text}>
              <Text
              
              //  onPress={() => {AsyncStorage.setItem("op","p"),
              //  navigation.push(ScreenNames.DRAWER)}}
                style={{
                  fontSize: wp("4.93%"),
                  fontFamily:
                    com == "PRIORITY" ? "Inter-Black3" : "Inter-Black2",
                  color: "white",
                  marginBottom: "2%",
                  marginTop: "4%",
                }}
              >
                PRIORITY
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.setting}
            onPress={() => {
              setcom("ALL");
            }}
          >
            <View style={styles.home_text}>
              <Text
                style={{
                  fontSize: wp("4.93%"),
                  fontFamily: com == "ALL" ? "Inter-Black3" : "Inter-Black2",
                  color: "white",
                  marginBottom: "2%",
                  marginTop: "4%",
                }}
              >
                ALL
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", backgroundColor: Colors.MAIN_COLOR }}
        >
          <View
            style={{
              height: 3,
              width: width * 0.3,
              backgroundColor:
                com == "RECENT" ? Colors.LINE : Colors.MAIN_COLOR,
              marginTop: "2%",
            }}
          ></View>

          <View
            style={{
              height: 3,
              width: width * 0.3,
              backgroundColor:
                com == "PRIORITY" ? Colors.LINE : Colors.MAIN_COLOR,
              marginTop: "2%",
              marginStart: "5%",
            }}
          ></View>
          <View
            style={{
              height: 3,
              width: width * 0.3,
              backgroundColor: com == "ALL" ? Colors.LINE : Colors.MAIN_COLOR,
              marginTop: "2%",
              marginStart: "5%",
            }}
          ></View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {com == "RECENT" ? (
          <Recent data={a} />
        ) : com == "PRIORITY" ? (
          <Priority />
        ) : com == "ALL" ? (
          <All
            navigation={navigation}
            data={{
              key: route?.params?.key,
              i: route?.params?.i,
            }}
          />
        ) : (
          setcom("RECENT")
        )}
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        avoidKeyboard={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ImageBackground
            style={styles.modalView}
            source={require("../../assets/image/sms1.png")}
          >
            <Text style={{ fontSize: 12, color: "white" }}>
              Press and hold any lead for multi calling
            </Text>
            <Text
              onPress={() => (
                setModalVisible(!modalVisible), AsyncStorage.removeItem("fm")
              )}
              style={styles.modal_txt}
            >
              Ok,Got It!
            </Text>
          </ImageBackground>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={modalVisible1}
        avoidKeyboard={true}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={() => (setModalVisible1(!modalVisible1), setcom1(0))}
        >
          <View style={styles.modalpage}>
            <View style={styles.modalView}>
              <Text style={styles.close_txt}>Closing Appplication</Text>
              <View style={styles.closing_line}></View>
              <Text style={styles.exit}>Are you sure wants to exit ?</Text>
              <View style={styles.exit_line}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Text style={styles.modal_txt1}>No</Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: "#d9d9d9",
                    width: 1,
                  }}
                ></View>
                <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                  <Text style={styles.modal_txt1}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontWeight: "500",
    fontSize: 22,
    textAlign: "center",
    flex: 1,
  },
  closing_line: { backgroundColor: "#33d6ff", height: 2, width: "100%" },
  exit_line: {
    backgroundColor: "#d9d9d9",
    height: 1,
    width: "100%",
    marginTop: "4%",
  },
  exit: {
    fontSize: 17,
    color: "black",
    marginVertical: "5%",
    marginStart: "6%",
  },
  close_txt: {
    fontSize: 20,
    color: "#33d6ff",
    marginStart: "5%",
    marginVertical: "6%",
  },
  modalpage: {
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    flex: 1,
    justifyContent: "center",
  },
  centeredView: {
    backgroundColor: "transparent",
    marginVertical: "50%",
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.7)",
  },
  modal_txt: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginVertical: "4%",
    fontWeight: "bold",
    marginHorizontal: "20%",
  },
  modal_txt1: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginVertical: "8%",
    marginHorizontal: "20%",
  },
  modalView: {
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    borderRadius: 4,
  },
  modalView1: {
    backgroundColor: "white",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    fontFamily: "Inter-Black2",
    color: "white",
    marginBottom: "2%",
    marginTop: "4%",
    // textAlign: "center",
  },

  tab: { flexDirection: "row", backgroundColor: Colors.MAIN_COLOR },
  ord: {
    backgroundColor: Colors.MAIN_COLOR,

    flex: 0.48,
    marginStart: "5%",
  },
  add: {
    backgroundColor: Colors.MAIN_COLOR,
    flex: 0.55,
  },
  setting: {
    backgroundColor: Colors.MAIN_COLOR,

    flex: 0.3,
  },
});
