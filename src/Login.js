import React, { useState ,useCallback} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import base64 from "react-native-base64";
import { SafeAreaView } from 'react-native-safe-area-context';

import { LOGIN } from "./Services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenNames } from "./constant/ScreenNames";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { STYLES } from "./constant/styles";
import { Colors } from "./constant/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Login_screen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  var validator = require("validator");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("userInfo");
      if (user) {
        navigation.navigate(ScreenNames.DRAWER);
      }
    })();
  }, []);

  const login_method = async () => {
    if (email == "") {
      setModalVisible2(true);
    } else if (validator.isEmail(email) == "") {
      setModalVisible(true);
    } else if (password == "") {
      setModalVisible3(true);
    } else {
      try {
        setLoading(true);
        const pwd = await base64.encode(password);

        const data = {
          email: email,
          password: pwd,
        };
        LOGIN(data)
          .then((response) => response.json())
          .then((result) => {
            setLoading(false);
            if (result.status == 1) {
              AsyncStorage.setItem("userInfo", JSON.stringify(result.data));
              AsyncStorage.setItem("fm", "1");
              AsyncStorage.setItem("user_data", JSON.stringify(data))
                .then(() => {
                  navigation.navigate(ScreenNames.DRAWER);
                })
                .catch((e) => alert(e));
            } else {
              alert(result.message);
            }
          });
      } catch (error) {
        console.log("error==>" + error);
        alert(error);
      }
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <View>
        <View style={STYLES.login_box}>
          <Text style={styles.login}>Login</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(txt) => setEmail(txt)}
          value={email}
          placeholderTextColor={"#cccccc"}
          maxLength={40}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(value2) => setPassword(value2)}
          placeholderTextColor={"#cccccc"}
          secureTextEntry={true}
          value={password}
        />
        <TouchableOpacity
          // onPress={() => navigation.navigate("drawer")}
          onPress={login_method}
          style={styles.button}
        >
          <Text style={styles.login1}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.FORGOT_PASSWORD)}
          style={styles.fp}
        >
          <Text style={styles.fp_text}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.centeredView}>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle1}>Lead Booker</Text>
                <Text style={styles.textStyle2}>Enter Valid Email Address</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                    marginVertical: "5%",
                    width: "100%",
                  }}
                ></View>
                <Pressable
                  style={{ height: 20 }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle3}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible2(!modalVisible2);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle1}>Lead Booker</Text>
                <Text style={styles.textStyle2}>Enter Email Address</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                    marginVertical: "5%",
                    width: "100%",
                  }}
                ></View>
                <Pressable
                  style={{ height: 20 }}
                  onPress={() => {
                    setModalVisible2(!modalVisible2);
                  }}
                >
                  <Text style={styles.textStyle3}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            transparent={true}
            visible={modalVisible3}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible3(!modalVisible3);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle1}>Lead Booker</Text>
                <Text style={styles.textStyle2}>Enter Password</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                    marginVertical: "5%",
                    width: "100%",
                  }}
                ></View>
                <Pressable
                  style={{ height: 20 }}
                  onPress={() => {
                    setModalVisible3(!modalVisible3);
                  }}
                >
                  <Text style={styles.textStyle3}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle1: { fontSize: 17, fontWeight: "bold" },
  textStyle2: { fontSize: 14 },
  textStyle3: { fontSize: 17, color: "blue" },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    backgroundColor: "white",
    borderRadius: 6,
    width: "85%",
    height: "18%",
    alignItems: "center",
    shadowColor: "#000",
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  container: {
    flex: 1,backgroundColor: "#f2f2f2"
  },
  input: {
    height: height * 0.08,
    width: width * 0.9,
    marginTop: 30,

    padding: 10,
    alignSelf: "center",
    backgroundColor: "white",
    
    borderRadius: 6,
    color: "black",
    fontSize: 19, fontFamily:"Inter-Black4",
  },
  button: {
    height: height * 0.095,
    width: width * 0.9,
    marginTop: 30,
    padding: 10,
    alignSelf: "center",
    backgroundColor: Colors.MAIN_COLOR,
    elevation: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "normal", fontFamily:"Inter-Black",
    
  },
  login1: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "normal", fontFamily:"Inter-Black",
  },

  fp_text: {
    fontSize: 12,
    color:Colors.MAIN_COLOR,
    textAlign: "right",
    
    paddingHorizontal: 20,
    paddingVertical: 15, fontFamily:"Inter-Black",
  },
});

export default Login_screen;
