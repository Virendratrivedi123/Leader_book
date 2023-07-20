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
  Image,
  FlatList,Modal,Pressable
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STYLES } from "../../../../constant/styles";
import { Colors } from "../../../../constant/colors";
import { Images } from "../../../../constant/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { ScreenNames } from "../../../../constant/ScreenNames";
import Header from "../../../../components/header";
import { Mark_task, tasks } from "../../../../Services";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;



function Task_page() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;
  const [d2, setd2] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [DATA, setDATA] = useState([]);
  const [task_id, settask_id] = useState("");
  const [task_status, settask_status] = useState("");
  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        id:route.params.user.id
      };

      tasks(data)
        .then((response) => response.json())
        .then((result) => {
         
          setDATA(result?.data?.tasks);
          
        result?.data?.tasks.map((i)=>{
          return(settask_id(i?.CrmTask?.id))
        })
        result?.data?.tasks.map((i)=>{
          return(settask_status(i?.CrmTask?.status))
        })
         
         
          // settask_id(a[0]?.id)
          // settask_status(a[0]?.status)
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
          if(result?.message == "No task has been added yet")
          {setModalVisible(true)}
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
        id:route.params.user.id
      };

      tasks(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
         
          setDATA(result?.data?.tasks);
         
         
          // var b=  a[0].id
         
          // settask_id(a[0]?.id)
          // settask_status(a[0]?.status)
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

  

  const postdata = async () => {
    try {

      
    
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        lead_id: route.params.user.id,
        task_status:task_status,
        task_id: task_id,
       
      };
      // var a = DATA.map((i)=>{
      //   return(i?.CrmTask)
      // })
      // a.map((i)=>{
      //   return(settask_status(i?.status))
      // })
      // a.map((i)=>{
      //   return(settask_id(i?.id))
      // })
      Mark_task(data).then((response) => {
        response.json().then((data) => {
          console.log(data)
          call_api()
          // Alert.alert(data.msg);
         
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  
console.log(DATA)
  // console.log(  route.params.user.name,
  //    route.params.user.id,
  //    route.params.user.logo,route.params.index)
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={"Tasks"}
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => navigation.goBack()}
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
            <View
              style={{
                flexDirection: "row",
                marginBottom: "8%",
                marginTop: "5%",
              }}
            >
              <TouchableOpacity style={styles.circle}
              
              onPress={() => {postdata()}}
              >
                <Image style={styles.img} source={Images.task_cicle}></Image>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => navigation.navigate("Task_Detail",{"msg":item.CrmTask?.subject,"id":item.CrmTask?.id})}
              >
                <Text style={styles.text1}>{item.CrmTask?.subject}</Text>
                <Text style={styles.text2}>
                  Lead Name: <Text
                  onPress={() => {
                    navigation.push(ScreenNames.DETAIL
                      , {
                      user: {
                        name: route.params.user.name,
                        id: route.params.user.id,
                        logo: route.params.user.logo,
                      },
                      index: route.params.index,
                      DATA: route.params.DATA,
                      demo:"aman"
                    }
                    );
                    
                    // AsyncStorage.setItem("user_id", item.id);
                  }}
                  style={styles.name}>{item.CrmTask?.lead_name}</Text>
                </Text>
                <Text style={styles.text2}>
                  Status: <Text style={styles.text3}>{item.CrmTask?.status}</Text>
                </Text>
                <Text style={styles.text2}>
                  Priority: <Text style={styles.text3}>{item.CrmTask?.priority}</Text>
                </Text>
                <Text style={styles.text2}>
                 Start Date: <Text style={styles.text3}>{item.CrmTask?.start_date}</Text>
                </Text>
                <Text style={styles.text2}>
                  Due Date: <Text style={styles.text3}>{item.CrmTask?.due_date}</Text>
                </Text>
                
              </TouchableOpacity>
            </View>

            <View style={styles.line}></View>
          </View>
        )}
      />)}
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
                <Text style={styles.textStyle2}>No task has been added yet</Text>
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
          onPress={() => navigation.navigate(ScreenNames.TPage,{id:route.params.user.id})}
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
    flex: 1,
  },
  img: {
    height: hp("4.51%"),
    width: wp("8%"),
    resizeMode: "contain",
    marginEnd: "1%",
  },
  text1: {
    fontSize: wp("5.5%"),

    // color: "#808080",
    fontFamily: "Inter-Black",
    marginStart: "2%",
    color: "black",
    marginVertical: "4%",
  },
  text2: {
    fontSize: wp("4.1%"),
    marginTop: "7%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black",
  },
  text3: {
    fontSize: wp("4%"),
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "#666666",
    fontFamily: "Inter-Black",
  },
  name: {
    fontSize: wp("4%"),
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "#2b92ee",
    fontFamily: "Inter-Black", textDecorationLine: "underline",  textDecorationStyle: "solid",
    textDecorationColor: "#2b92ee",
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
    marginVertical: "0%",
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
export default Task_page;
