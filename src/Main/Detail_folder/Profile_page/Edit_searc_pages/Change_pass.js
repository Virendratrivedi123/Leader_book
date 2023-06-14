import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
 
  TextInput,
  
} from "react-native";

import { Colors } from "../../../../constant/colors";
import { useFonts } from "expo-font";

import { useNavigation, useRoute } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Change_pass() {

  const [fontsLoaded] = useFonts({
    prima: require("../../../../../assets/fonts/PrimaSansBold.otf"),
    prima_r: require("../../../../../assets/fonts/PrimaSansRegular.otf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  
  
  const [First_name, setFirst_name] = React.useState(
  ""
  );
  const [last_name, setLast_name] = React.useState(
    ""
  );
  const [email, setEmail] = React.useState("");

  const [phone, setPhone] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      
                <View style={styles.contct_view}>
                  <Text style={styles.cnct}>Change Password</Text>
                  <Text style={styles.first_name}>Old Password</Text>
                  <TextInput
                    
                    style={styles.input}
                    value={First_name}
                    onChangeText={(txt) => setFirst_name(txt)}
                    placeholderTextColor={"#666666"}
                  ></TextInput>
                  <Text style={styles.first_name}>New Password</Text>
                  <TextInput
                    
                    style={styles.input}
                    value={last_name}
                    onChangeText={(txt) => setLast_name(txt)}
                    placeholderTextColor={"#666666"}
                  ></TextInput>
                  <Text style={styles.first_name}>Confirm New Password</Text>
                  <TextInput
                    
                    style={styles.input}
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                    placeholderTextColor={"#666666"}
                  ></TextInput>
                  
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.save}>Save</Text>
                  </TouchableOpacity>
                </View>
             
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  input: {
    // height: height * 0.06,

    borderColor: "#999999",
      width:"80%",
   
    borderWidth:1,borderRadius:4,paddingHorizontal:7,color:Colors.txt,marginVertical:"5%",fontFamily: "prima_r",fontSize:13
    
  },
 
  
  save: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  
  contct_view: {  paddingHorizontal: "6%" ,marginTop:"10%"},
  btn: {
    backgroundColor: "#32b0d6",

    height: height * 0.035,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",marginBottom:"5%"
  },

  cnct: {
    fontSize: 14,
    fontFamily: "prima",
    color: "#666666",marginBottom:"10%"
    
  },
  first_name: { fontSize: 13,  color: "#666666",fontFamily: "prima",textAlign:"right",marginEnd:"15%" },
  
});

export default Change_pass;
