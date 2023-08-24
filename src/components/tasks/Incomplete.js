import React, { useState, useEffect, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  Image,
  ActivityIndicator,Modal,Pressable
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";
import { Images } from "../../constant/images";
import { Mark_task, Task_full } from "../../Services";
import Loader from "../../constant/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tasks from "../Tasks";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function InComplete() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const translation = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(true);
  const [DATA, setDATA] = useState([]);
  const [DATA2, setDATA2] = useState([]);
  const [DATA3, setDATA3] = useState([]);
  const [d2, setd2] = useState(false);
  const [t, sett] = useState(1);
  const route = useRoute();
  const h = (18 / 100) * height;
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible1, setModalVisible1] = useState(false);
 
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  
  React.useEffect(() => {
    (async () => {
      getData()
    })();
  }, []);

  async function getData() {
    console.log(offset);
    if (!loading && !isListEnd) {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        no: offset,
      };
      Task_full(data)
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call
          // console.log(responseJson);
          if (responseJson.data.tasks.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson?.data?.tasks]);
            setLoading(false);
            setLoading2(false);
            setd2(true);
            Animated.timing(translation, {
              toValue: h,
              delay: 0,
              easing: Easing.elastic(4),
              useNativeDriver: true,
            }).start();
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  const postdata = async (i,r) => {
    try {
   
      
    
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        lead_id: "",
        task_status:"1",
        task_id: i,
       
      };
    
      Mark_task(data).then((response) => {
        response.json().then((data) => {
          console.log(data)
          if(data?.message == "Task has been marked as completed successfully.")
          {setModalVisible1(true),deleteItemById(i)}
          
          // Alert.alert(data.msg);
         
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItemById =( task_id) => {
    const filteredData = dataSource.filter(item => item.task_id !== task_id);
    setLoading2(true)
    setDataSource(filteredData)
  }
  

  
  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? <Loader loading={loading} /> : null}
      </View>
    );
  };

 
  

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: "8%",
            marginTop: "1%",
          }}
        >
          <TouchableOpacity style={styles.circle}
              
              onPress={() => {postdata(item?.task_id)}}
              // >
              //  onPress={() => {deleteItemById(item?.task_id)}}
              > 
                <Image style={styles.img} source={Images.task_cicle}></Image>
              </TouchableOpacity>

              <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate("Task_Detail",{"msg":item?.subject,"id":item?.task_id})}
              >
          <View>
            <Text style={styles.text1}>{item?.subject}</Text>
            {item?.lead_name ? (
              <Text style={styles.text2}>
                Lead Name: <Text style={styles.text3}>{item?.lead_name}</Text>
              </Text>
            ) : (
              <Text style={styles.text2}>
                Lead Name: <Text style={styles.text3}>No Lead Assigned</Text>
              </Text>
            )}

            <Text style={styles.text2}>
              Status: <Text style={styles.text3}>{item?.status}</Text>
            </Text>
            <Text style={styles.text2}>
              Priority: <Text style={styles.text3}>{item?.priority}</Text>
            </Text>
            {item?.start_date ? (
              <Text style={styles.text2}>
                Start Date: <Text style={styles.text3}>{item?.start_date}</Text>
              </Text>
            ) : null}
            <Text style={styles.text2}>
              Due Date: <Text style={styles.text3}>{item?.due_date}</Text>
            </Text>
            {item?.reminder_time ? (
              <Text style={styles.text2}>
                Reminder Time:{" "}
                <Text style={styles.text3}>{item?.reminder_time}</Text>
              </Text>
            ) : null}
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.line}></View>
    );
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOffset(0)
      setLoading2(true)
      getData();
    });
    
    return () => {
     // executed when unmount
     unsubscribe();
    
    }
}, [navigation]);


  return (
    <SafeAreaView style={styles.container}>
      {loading2 ? (
        <Loader loading={loading2} />
      ) : (
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
      )}
        <Modal
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              
              setModalVisible1(!modalVisible1);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle1}>Lead Booker</Text>
                <Text style={styles.textStyle2}>Task has been marked as completed successfully</Text>
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
                   
                    setModalVisible1(!modalVisible1),setLoading2(false)
                  }}
                >
                  <Text style={styles.textStyle3}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

      {d2 ? (
        <Animated.View
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
            onPress={() =>
              navigation.navigate(ScreenNames.TPage, { check: "1" })
            }
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
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  img: {
    height: hp("4.51%"),
    width: wp("8%"),
    resizeMode: "contain",
    marginEnd: "1%",
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
    bottom: "10%",
    alignSelf: "flex-end",
    right: "8%",
  },

  text1: {
    fontSize: 17,

    // color: "#808080",
    fontFamily: "Inter-Black",
    marginStart: "2%",
    color: "black",
    marginTop: "0%",
  },
  text2: {
    fontSize: 13,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black",
  },
  text3: {
    fontSize: 13,
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: Colors.txt,
    fontFamily: "Inter-Black",
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

export default InComplete;
