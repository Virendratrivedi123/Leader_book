import React, { useState } from "react";

import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,Modal,Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Forgot_password } from "./Services";
import { STYLES } from "./constant/styles";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { useFonts } from 'expo-font';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "./constant/colors";
import Header from "./components/header";
import { Images } from "./constant/images";


function Forgot_pasword() {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const forgot_method = async () => {
    if (email == "") {
      setModalVisible(true);
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
      
         <Header
        label="Forgot Password"
        leftIcon={Images.backArrow}
        
        onLeftPress={() => navigation.goBack()}
       
      />
      
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
                <Text style={styles.textStyle2}>Could you please enter a valid email address?</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                    
                    width: "100%",
                  }}
                ></View>
                <Pressable
                  style={{  }}
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
      </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: height * 0.08,
    width: width * 0.9,
    marginTop: 30,

    padding: 10,
    alignSelf: "center",
    backgroundColor: "white",
    
    borderRadius: 20,
    color: Colors.txt,
    fontSize: wp("5.41%"), fontFamily:"Inter-Black4",
  },
  textStyle1: { fontSize: wp("5.41%"), fontFamily:"Inter-Black2",marginTop:"7%" },
  textStyle2: { fontSize: wp("4%") ,textAlign:"center",width:"80%",marginBottom:"7%",marginTop:"1%",color:"#262626",},
  textStyle3: { fontSize: wp("5.31%"), color: "#2b92ee",fontFamily:"Inter-Black", marginVertical: "5%",},

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#ececee",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",alignItems:"center",justifyContent:"center",
    elevation: 20,
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
    fontSize: wp("6.2%"),
    fontFamily:"Inter-Black",
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
