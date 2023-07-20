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
  Image,FlatList,Modal,Pressable, Alert
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
import { Note } from "../../../../Services";
import Loader from "../../../../constant/Loader";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Note_Page() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;
  const [d2, setd2] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [DATA, setDATA] = useState([]);
  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        id:route.params.id
      };

      Note(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
         
          setDATA(result?.data?.lead_notes);

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
        id:route.params.id
      };

      Note(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          
        
         
          setDATA(result?.data?.lead_notes);

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
          
          if(result.message == "No notes has been added yet")
          {setModalVisible(true)}
          
        
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
        label={'Notes'}
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => {navigation.goBack()}}
        onRightPress={() => {}}
        // customRight={true}
      />
       {loading ? (
        <Loader loading={loading} />
      ) :
      <View>
     {}
      <FlatList
        style={{ marginTop:"3%"}}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{flex:1}}>
             <TouchableOpacity
        activeOpacity={1}
        style={{flexDirection:"row"}}
          onPress={() =>
            
            navigation.navigate("Update_note",{"user":item?.LeadNote,'lead_id':route?.params?.id})
            // setModalVisible(true)
          }
        >
              <View style={styles.circle}>
                <Image style={styles.img} source={Images.chat_icon}></Image>
              </View>
              <View>
                <Text style={styles.text2}>{item.LeadNote?.user_name}</Text>
                <Text style={styles.text1}>{item.LeadNote?.note}</Text>
                
              
                
                  <Text style={styles.text3}>{item.LeadNote?.created}</Text>
              
              </View>
              </TouchableOpacity>

            <View style={styles.line}></View>
          </View>
        )}
      />
      
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
        
      </View>}
       
      {d2?<Animated.View
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
            
            navigation.navigate(ScreenNames.NPage,{"id":route.params.id})
            // setModalVisible(true)
          }
        >
          <Image
            source={Images.addNote}
            style={{ width: Dimensions.get("window").width * 0.17,
            height: Dimensions.get("window").width * 0.17, resizeMode: "contain" }}
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
    flex: 1,
  },
  img: {
    height: hp("6.51%"),
    width: wp("9%"),
    resizeMode: "contain",
    marginEnd: "1%",
  },
  text1: {
    fontSize: wp("4.41%"),

    // color: "#808080",
    fontFamily: "Inter-Black2",
    marginStart: "2%",
    color: "black",
    marginTop: "10%",
  },
  text2: {
    fontSize: wp("4.41%"),
    marginTop: "8%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black4",
  },
  text3: {
    fontSize: wp("3.9%"),
    marginTop: "20%",
    // // color: "#808080",
    // marginStart: "5%",
    color: Colors.txt,
    fontFamily: "Inter-Black4",marginStart: "2%",
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
   
    width: "100%",marginTop:"4%",marginBottom:"1%"
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

export default Note_Page;
