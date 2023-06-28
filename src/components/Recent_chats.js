import React from "react";

import { Entypo } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import {
  Dimensions,
  Text,
  View,
  TextInput,
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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DATA = [
  {
    id: "0",
    name: "test4",
    Number: "James Test",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "1",
    name: "test4",
    Number: "Manjeet 12 Kumar",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "2",
    name: "test4",
    Number: "James Test",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "3",
    name: "test4",
    Number: "Test 3 Test",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "4",
    name: "test4",
    Number: "James & Testing",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "5",
    name: "test4",
    Number: "James Test",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "6",
    name: "test4",
    Number: "James Test",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "7",
    name: "test4",
    Number: "James Test",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "8",
    name: "test4",
    Number: "James Test",
    voicemail: "5 May 14:02",
    email: "praful.mishra121@gmail.com",
  },
];

function Recent_chats() {
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
label="Recent chats"
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
            <TouchableOpacity
              // onPress={()=>{navigation.navigate("chat",{name:item.Number})}}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "5%",
                  marginTop: "5%",
                }}
              >
                <View style={{ flex: 0.35 }}>
                  <View style={styles.circle}>
                    <Text style={styles.circle_text}>JT</Text>
                  </View>
                </View>

                <View style={{ flex: 0.55 }}>
                  <Text style={styles.text2} numberOfLines={1}>
                    {item.Number}
                  </Text>
                  <Text style={styles.text1}>{item.name}</Text>
                </View>
                <Text style={styles.text3}>{item.voicemail}</Text>
              </View>

              <View style={styles.line}></View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  text1: {
    fontSize: 15,
    marginTop: "2%",
    color: "#b3b3b3",
    fontFamily:"Inter-Black",

    // color: "black",
  },
  text2: {
    fontSize: 19,
    marginTop: "2%",
    // color: "#808080",
    fontFamily:"Inter-Black3",
    color: "black",
    width: width * 0.355,
  },
  text3: {
    fontSize: 14,
    marginTop: "2%",
    // color: "#808080",

    color: "#b3b3b3",
    fontFamily:"Inter-Black",
  },

  circle: {
    width: Dimensions.get('window').width * 0.16,
    height: Dimensions.get('window').width * 0.16,

borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    backgroundColor: Colors.MAIN_COLOR,
   
    alignItems: "center",
    justifyContent: "center",
    marginStart: 20,
  },
  circle_text: {
    fontSize: 24,
    fontFamily:"Inter-Black3",
    color: "white",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "2%",
    width: "100%",
  },
});

export default Recent_chats;
