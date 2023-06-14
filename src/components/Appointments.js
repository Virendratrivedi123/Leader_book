import React from "react";

import { Entypo, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constant/colors";
import { ScreenNames } from "../constant/ScreenNames";
import { STYLES } from "../constant/styles";
import Header from "./header";
import { Images } from "../constant/images";
import { useFonts } from 'expo-font';


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DATA = [
  {
    id: "0",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "1",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "2",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "3",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "4",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "5",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "6",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "7",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "8",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
];

function Appointments() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../assets/fonts/Mulish-Regular.ttf'),
    
   
  });
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
<Header
label="Appointments"
leftIcon={Images.menu}
rightIcon={Images.time}
onLeftPress={() => navigation.toggleDrawer()}
/>
      <FlatList
        style={{}}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: "15%",
                marginTop: "5%",
              }}
            >
              <View style={styles.circle}>
                <Text style={styles.circle_text}>T</Text>
              </View>
              <View>
                <Text style={styles.text1}>{item.name}</Text>
                <Text style={styles.text2}>{item.Number}</Text>
                <Text style={styles.text3}>{item.voicemail}</Text>
                <Text style={styles.text3}>{item.voicemail}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: "2%",
                    marginStart: "2%",
                  }}
                >
                  <Text style={{}}>
                    {" "}
                    <SimpleLineIcons name="bell" size={22} color="#b3b3b3" />
                  </Text>
                  <Text style={styles.text5}>{item.voicemail}</Text>
                </View>
              </View>
            </View>

            <View style={styles.line}></View>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.ADD_APPOINTMENT)}
        style={styles.floating_btn}
      >
        {/* <Ionicons name="ios-add" size={60} color="white" /> */}
        <Ionicons name="ios-add" size={60} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: 60,
    position: "absolute",
    bottom: "10%",
    alignSelf: "flex-end",
    right: "8%",
    height: 60,
    backgroundColor: Colors.MAIN_COLOR,
    borderRadius: 30,
    elevation: 10,
    shadowColor: "black",
    resizeMode: "contain",
  },

  text1: {
    fontSize: 18,
    marginTop: "0%",
    // color: "#808080",
    fontFamily:"Inter-Black2",
    marginStart: "5%",
    color: "black",
  },
  text2: {
    fontSize: 19,
    marginTop: "2%",
    // color: "#808080",
    fontFamily:"Inter-Black2",
    marginStart: "5%",
    color: "grey",
  },
  text3: {
    fontSize: 15,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "5%",
    color: "#8c8c8c",
    fontFamily:"Inter-Black",
  },
  text4: {
    fontSize: 14,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "5%",
    color: "#666666",fontFamily:"Inter-Black4",
  },
  text5: {
    fontSize: 18,

    // color: "#808080",
    marginStart: "3%",
    color: "#8c8c8c",
    fontFamily:"Inter-Black",
  },

  circle: {
    height: height * 0.08,
    width: width * 0.17,
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginStart: 20,
  },
  circle_text: {
    fontSize: 30,
    fontWeight: "600",
    color: "#bfbfbf",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "2%",
    width: "100%",
  },
});

export default Appointments;
