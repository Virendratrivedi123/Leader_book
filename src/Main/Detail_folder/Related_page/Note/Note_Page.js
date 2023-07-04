import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,FlatList,Modal,Pressable
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Colors } from "../../../../constant/colors";
import { Images } from "../../../../constant/images";
import Header from "../../../../components/header";
import { ScreenNames } from "../../../../constant/ScreenNames";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const DATA = [
  {
    id: "0",
    tasks: "Note 1",
    name:"james osmar",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "1",
    tasks: "Note 2",
    name:"james osmar",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "2",
    tasks: "Note 2",
    name:"james osmar",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  {
    id: "3",
    tasks: "Note 2",
    name:"james osmar",
    voicemail: "5 May 2022 14:02 PM",
    email: "praful.mishra121@gmail.com",
  },
  
];
function Note_Page() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;
  useEffect(() => {
    Animated.timing(translation, {
      toValue: h,
      delay: 0,
      easing: Easing.elastic(4),
      useNativeDriver: true,
    }).start();
  }, []);

  // React.useEffect(async () => {
  //   // const user = await AsyncStorage.getItem("go_recent");
  //   // console.log(user)
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     // do something
    
      
  //     // if (user == "1") {
  //     //   setcom("RECENT")
  //       AsyncStorage.removeItem('go_recent')
  //     // console.log("setcom");
  //     // }
     
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={'Notes'}
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => {navigation.goBack()}}
        onRightPress={() => {}}
        // customRight={true}
      />
      <View>
      <FlatList
        style={{}}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{flex:1}}>
            <View
              style={{
                flexDirection: "row",
               marginTop:"5%"
                
              }}
            >
              <View style={styles.circle}>
                <Image style={styles.img} source={Images.chat_icon}></Image>
              </View>
              <View>
                <Text style={styles.text2}>{item.name}</Text>
                <Text style={styles.text1}>{item.tasks}</Text>
                
              
                
                  <Text style={styles.text3}>{item.voicemail}</Text>
              
              </View>
            </View>

            <View style={styles.line}></View>
          </View>
        )}
      />
       <View style={styles.centeredView}>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle1}>Lead Booker</Text>
                <Text style={styles.textStyle2}>No notes has been added yet</Text>
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
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle3}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
       
      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",

          position: "absolute",

          right: "6%",
          

          borderRadius:
            Math.round(
              Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,

          transform: [{ translateY: translation }],
          bottom: height * 0.28,
          elevation: 5,
        }}
      >
        <TouchableOpacity
        activeOpacity={1}
          onPress={() =>
            
            navigation.navigate(ScreenNames.NPage)
            // setModalVisible(true)
          }
        >
          <Image
            source={Images.addNote}
            style={{ width: Dimensions.get("window").width * 0.17,
            height: Dimensions.get("window").width * 0.17, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    elevation: 5,
    shadowColor: "black",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  img: {
    height: hp("6.51%"),
    width: wp("9%"),
    resizeMode: "contain",
    marginEnd: "1%",
  },
  text1: {
    fontSize: 15,

    // color: "#808080",
    fontFamily: "Inter-Black2",
    marginStart: "2%",
    color: "black",
    marginTop: "10%",
  },
  text2: {
    fontSize: 15,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black4",
  },
  text3: {
    fontSize: 13,
    marginTop: "20%",
    // // color: "#808080",
    // marginStart: "5%",
    color: Colors.txt,
    fontFamily: "Inter-Black",marginStart: "2%",
  },
  text4: {
    fontSize: 15,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "5%",
    color: "#666666",
    fontFamily: "Inter-Black",
  },
  text5: {
    fontSize: 18,

    // color: "#808080",
    marginStart: "3%",
    color: "#8c8c8c",
    fontFamily: "Inter-Black",
  },

  circle: {
    marginStart: "7%",marginEnd:"2%"
  },
  circle_text: {
    fontSize: 30,
    fontWeight: "600",
    color: "#bfbfbf",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical:"5%",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#ececee",
    borderRadius: 20,

    elevation: 5,
    alignSelf: "center",alignItems:"center",justifyContent:"center",
    // elevation: 20,
  },
  textStyle1: { fontSize: wp("5.41%"), fontFamily:"Inter-Black2",marginTop:"7%" },
  textStyle2: { fontSize: wp("4%") ,textAlign:"center",width:"80%",marginBottom:"7%",marginTop:"1%",color:"#262626",},
  textStyle3: { fontSize: wp("5.31%"), color: "#2b92ee",fontFamily:"Inter-Black", marginVertical: "5%",},

});

export default Note_Page;
