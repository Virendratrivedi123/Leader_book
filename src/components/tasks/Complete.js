import React, { useState, useEffect, useRef } from "react";

import {
 
  Ionicons,
} from "@expo/vector-icons";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,Animated,Easing,
Image
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";
import { Images } from "../../constant/images";
import { useFonts } from 'expo-font';

// import Icon from 'react-native-vector-icons/FontAwesome';
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




function Complete() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const navigation = useNavigation();
  const translation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(translation, {
      toValue: 100,
      delay: 0,
      easing:  Easing.elastic(4),
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        style={{}}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: "8%"
                ,marginStart:"7%",marginTop:"2%"
              }}
            >
             
              <View>
                <Text style={styles.text1}>{item.name}</Text>
                <Text style={styles.text2}>Lead Name: <Text style={styles.text3}>{item.voicemail}</Text></Text>
                <Text style={styles.text2}>Status: <Text style={styles.text3}>{item.voicemail}</Text></Text>
                <Text style={styles.text2}>Priority: <Text style={styles.text3}>{item.voicemail}</Text></Text>
                <Text style={styles.text2}>Due Date: <Text style={styles.text3}>{item.voicemail}</Text></Text>
               
                
                
              </View>
              
            </View>

            <View style={styles.line}></View>
          </View>
        )}
      />
      <Animated.View
            style={{
             
              alignItems: "center",
              justifyContent: "center",
             
              position: "absolute",

              right: "6%",
            
borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
             
              
              transform: [{ translateY: translation }],
              bottom: height * 0.24,
              elevation: 5,
            }}
          >
            <TouchableOpacity 
              activeOpacity={1}
        onPress={() => navigation.navigate(ScreenNames.ADD_TASKS)}

      >
<Image source={Images.addNote} style={{ width: Dimensions.get("window").width * 0.17,
              height: Dimensions.get("window").width * 0.17,
              resizeMode: "contain",}}/>
      </TouchableOpacity>
          </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    height: height * 0.12,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
    marginBottom: "3%",
  },
  headertxt1: {
    fontSize: 16,
    marginStart: "5%",
    marginTop: "7%",
    flex: 0.5,
  },

  headertxt2: {
    color: "white",
    fontWeight: "500",
    fontSize: 22,
    marginTop: "7%",
  },

  floating_btn: {
    position: "absolute",
    bottom: "10%",alignSelf:"flex-end",
    right: "8%",
  },

  text1: {
    fontSize: 16,
    marginTop: "0%",
    // color: "#808080",
    fontFamily:"Inter-Black2",
    marginStart: "2%",
    color: "black",
  },
  text2: {
    fontSize: 13,
    marginTop: "5%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily:"Inter-Black"
  },
  text3: {
    fontSize: 12,
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: Colors.txt,
    fontFamily:"Inter-Black"
  },
  

  circle: {
    
    
    marginStart: "7%",
  },
  circle_text: {
    fontSize: 30,
    fontWeight: "600",
    color: "#bfbfbf",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    
    width: "100%",marginTop:"5%"
  },
});

export default Complete;
