import React from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,TextInput,Image
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../constant/colors";
import { STYLES } from "../../../constant/styles";
import { Images } from "../../../constant/images";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Npage() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: height * 0.08,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",justifyContent:"space-between"}}>
      <TouchableOpacity
            style={{ marginStart: "4%",   }}
            onPress={() =>  navigation.goBack()}
          >
           <Image
            source={Images.backArrow}
            style={{ height: height*0.028, width: 30, resizeMode: "contain" }}
          />
          </TouchableOpacity>
        <Text
            style={{
              color: "white",
              fontWeight: "400",
              fontSize: 20,
              
            }}
          >
           
          </Text>
        <TouchableOpacity
            style={{
              
              
              alignItems: "center",
              justifyContent: "center",marginEnd:"5%"
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                color: "yellow",
                borderWidth: 1,
                borderColor: "yellow",
                paddingVertical: "0.5%",
                borderRadius: 20,
                fontWeight: "500",
                fontSize: 15,paddingHorizontal:"1%"
              }}
            >
              SAVE
            </Text>
          </TouchableOpacity>
      </View>

      <View style={{}}>
      <TextInput
        style={styles.input}
        placeholder="Note"
        // onChangeText={onChangeText}
        // value={text}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    
    
    padding: 20,
    
    
    color: "grey",
    fontSize: 17,fontWeight:"500"
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
    justifyContent: "center",
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

export default Npage;
