import React, { useState, useEffect, useRef } from "react";

import { Entypo, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  Image,Modal,Pressable
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../constant/colors";
import { ScreenNames } from "../constant/ScreenNames";
import { STYLES } from "../constant/styles";
import Header from "./header";
import { Images } from "../constant/images";
import { useFonts } from "expo-font";
import { Appointment_full } from "../Services";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;



function Appointments() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../assets/fonts/Mulish-Regular.ttf"),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;
  const [loading, setLoading] = React.useState(true);
  const [DATA, setDATA] = useState([]);
  const [d2, setd2] = useState(false);
  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        // id:route.params.user.id
      };

      Appointment_full(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
         
          setDATA(result?.data?.appointment_arr);

          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)
          setd2(true);
          Animated.timing(translation, {
            toValue: h,
            delay: 0,
            easing: Easing.elastic(4),
            useNativeDriver: true,
          }).start();
          setLoading(false);
          // if(result?.message == "No Appointment scheduled yet.")
          // {setModalVisible(true)}
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);

  const call_api = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        // id:route.params.user.id
      };

      Appointment_full(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.data)
         
          setDATA(result?.data?.appointment_arr);

          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)
          setd2(true);
          Animated.timing(translation, {
            toValue: h,
            delay: 0,
            easing: Easing.elastic(4),
            useNativeDriver: true,
          }).start();
          setLoading(false);
          
         
          
        });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setLoading(true)
      call_api()
      console.log("reload the page");
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
    <Header
      label={"Appointments"}
      leftIcon={Images.menu}
      rightIcon={{}}
      onLeftPress={() =>  navigation.toggleDrawer()}
      onRightPress={() => {}}
      // customRight={true}
    />
     {loading ? (
        <Loader loading={loading} />
      ) :  (
    <FlatList
      style={{}}
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View>
          <TouchableOpacity
           onPress={() => navigation.navigate("Appoint_Detail",{"msg":item.subject,"id":item.id,})}
           
            style={{
              flexDirection: "row",
              
              marginTop: "5%",
            }}
          >
            <View style={styles.circle}>
              <Text style={styles.circle_text}>{item.lead_name_initial}</Text>
            </View>
            <View>
              <Text style={styles.text1}>{item.subject}</Text>
              <Text style={styles.text2}>{item.lead_name}</Text>
              <Text style={styles.text3}>{item.start_time}</Text>
              <Text style={styles.text3}>{item.end_time}</Text>
              {item.reminder_time ?<View
                style={{
                  flexDirection: "row",
                  marginTop: "3%",
                  marginStart: "2%",
                }}
              >
                <Text style={{}}>
                  {" "}
                  <SimpleLineIcons name="bell" size={22} color="#b3b3b3" />
                </Text>
                <Text style={styles.text5}>{item.reminder_time}</Text>
              </View>:null}
              

              <Text style={styles.text4}>{item.notes}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.line}></View>
        </View>
      )}
    />
    
  )} 
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
              <Text style={styles.textStyle2}>No Appointment scheduled yet.</Text>
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
   {d2?<Animated.View
      style={{
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",

        right: "6%",
        // width: Dimensions.get("window").width * 0.16,
        // height: Dimensions.get("window").width * 0.16,

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
        onPress={() => navigation.navigate(ScreenNames.APage,{check:"1"})}
      >
        <Image
          source={Images.addNote}
          style={{
            width: Dimensions.get("window").width * 0.17,
            height: Dimensions.get("window").width * 0.17,
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity>
    </Animated.View>:null}
    
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
    flex: 1,backgroundColor:"white"
  },
  text1: {
    fontSize: 18,
    marginTop: "0%",
    // color: "#808080",
    fontFamily: "Inter-Black2",
    marginStart: "5%",
    color: "black",
  },
  text2: {
    fontSize: 19,
    marginTop: "2%",
    // color: "#808080",
    fontFamily: "Inter-Black2",
    marginStart: "5%",
    color: "grey",
  },
  text3: {
    fontSize: wp("4.91%"),
    marginTop: "3%",
    // color: "#808080",
    marginStart: "5%",
    color: Colors.txt,
    fontFamily: "Inter-Black4",
  },
  text4: {
    fontSize: wp("5.11%"),
    marginTop: "3%",
    // color: "#808080",
    marginStart: "5%",
    color: Colors.txt,
    fontFamily: "Inter-Black4",
  },
  text5: {
    fontSize: wp("4.91%"),

    // color: "#808080",
    marginStart: "3%",
    color: Colors.txt,
    fontFamily: "Inter-Black4",
  },

  circle: {
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    backgroundColor: "#f2f2f2",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,

    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginStart: 20,
  },
  circle_text: {
    fontSize: 30,
    fontFamily: "Inter-Black2",
    color: "#bfbfbf",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "2%",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.1)",
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
export default Appointments;
