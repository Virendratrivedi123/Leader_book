import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Keyboard,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import {
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STYLES } from "../../constant/styles";
import { Colors } from "../../constant/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View_lead_activity_comments,
  save_lead_activity_comments,
  update_lead_activity_comments,
} from "../../Services";
import { ScreenNames } from "../../constant/ScreenNames";
import Header from "../../components/header";
import { Images } from "../../constant/images";
import { useFonts } from "expo-font";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../constant/Loader";
import { Platform } from "react-native";

function Comments() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setdata] = useState([]);
  const [circle_text, setcircle_text] = useState("");
  const [comment, setcomment] = useState("");
  const [c, setc] = useState("0%");
  const [loading, setLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setid] = useState("");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Platform.OS == "ios" ? setc("45%") : setc("0%");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      Platform.OS == "ios" ? setc("0%") : setc("0%");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);
      const user = await AsyncStorage.getItem("user_txt");
      const ds = JSON.parse(user);
      setcircle_text(ds);

      console.log(ds);
      const data = {
        email: d.email,
        password: d.password,
        activity_type: route.params.user.activity_type,
        lead_activity_id: route.params.user.lead_activity_id,
        lead_id: route.params.user.lead_id,
      };
      View_lead_activity_comments(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          var arr = [];
          var item = result.data.lead_activity_comments;
          arr.push(item);
          setdata(item);

          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  const call_api = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);
      const user = await AsyncStorage.getItem("user_txt");
      const ds = JSON.parse(user);
      setcircle_text(ds);

      console.log(ds);
      const data = {
        email: d.email,
        password: d.password,
        activity_type: route.params.user.activity_type,
        lead_activity_id: route.params.user.lead_activity_id,
        lead_id: route.params.user.lead_id,
      };
      View_lead_activity_comments(data)
        .then((response) => response.json())
        .then((result) => {
          console.log(result,"a")
          var arr = [];
          var item = result.data.lead_activity_comments;
          arr.push(item);
          setdata(item);

          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        activity_type: route?.params?.user?.activity_type,
        lead_activity_id: route?.params?.user?.lead_activity_id,
        lead_id: route?.params?.user?.lead_id,
        comment: comment,
      };
      save_lead_activity_comments(data).then((response) => {
        response.json().then((data) => {
          setLoading(true);
          call_api();
          // console.log(data);
          // Alert.alert(data.msg);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const postdata2 = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        activity_type: route?.params?.user?.activity_type,
        lead_activity_id: route?.params?.user?.lead_activity_id,
        lead_id: route?.params?.user?.lead_id,
        comment: comment,
        comment_id: id,
      };
      update_lead_activity_comments(data).then((response) => {
        response.json().then((data) => {
          setLoading(true);
          call_api();
          console.log(data);
          // Alert.alert(data.msg);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // let text = "How are?";
  // const a = text.split(" ");

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={route.params.user.title + " Comments"}
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {}}
        // customRight={true}
      />
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <FlatList
          style={{ backgroundColor: "white", marginBottom: height * 0.15 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.title}>{item.user_name}</Text>
                <Text numberOfLines={1} style={styles.created}>
                  {item.created}
                </Text>
              </View>
              <View style={styles.first}>
                <View style={styles.circle_email}>
                  <Text style={styles.circle_text}>RG</Text>
                </View>
                <Text style={styles.note_text}>{item?.note}</Text>
                <TouchableOpacity
                  style={{ marginTop: "8%" }}
                  onPress={() => {
                    setModalVisible(true),setcomment(item?.note),setid(item?.id)
                  }}
                >
                  <Image
                    style={styles.img}
                    source={Images.edit_Comment}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.line}></View>
            </View>
          )}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        avoidKeyboard={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modal_page}>
              <Text> </Text>
              <Text style={{ fontSize: wp("6.61%"),
    fontFamily: "Inter-Black4", color: Colors.MAIN_icon,marginLeft:"15%" }}>Comment</Text>
              <Pressable
              style={{}}
                        onPress={() => (
                          setModalVisible(!modalVisible)
                        )}
                      >
                         <Image
                    style={styles.img2}
                    source={Images.close_icon}
                  ></Image>
                      </Pressable>
            </View>
            <View
              style={{ height: 1, width: "100%", backgroundColor: "#cccccc" }}
            ></View>
            <View style={styles.input_box2}>
          <TextInput
            style={styles.input2}
            placeholder="Add a Comment"
            value={comment}
            placeholderTextColor={"black"}
            onChangeText={(txt) => setcomment(txt)}
          ></TextInput>
        </View>
            <TouchableOpacity

            style={{backgroundColor:Colors.MAIN_icon,height:height*0.065,justifyContent:"center",width:"40%",alignSelf:"center",marginBottom:"10%",borderRadius:8}}
            onPress={() => (
              setModalVisible(!modalVisible),postdata2()
            )}><Text style={{ fontSize: 20, color: "white",textAlign:"center" }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View
        style={{
          height: height * 0.15,
          backgroundColor: Colors.MAIN_COLOR,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: c,
          width: "100%",
        }}
      >
        {/* <KeyboardAvoidingView
        keyboardShouldPersistTaps={'always'}
        >
        <View style={styles.input_box}>
          <TextInput
            style={styles.input}
            placeholder="Add a Comment"
            placeholderTextColor={"white"}
            onChangeText={(txt) => setcomment(txt)}
          ></TextInput>
        </View></KeyboardAvoidingView> */}
        <View style={styles.input_box}>
          <TextInput
            style={styles.input}
            placeholder="Add a Comment"
            placeholderTextColor={"white"}
            onChangeText={(txt) => setcomment(txt)}
          ></TextInput>
        </View>

        <TouchableOpacity style={{ marginStart: "3%" }} onPress={postdata}>
          <FontAwesome name="send" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal_page: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",alignItems:"center"
  },
  container: {
    flex: 1,
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#bfbfbf",
    marginTop: "12%",
    alignSelf: "center",
    marginBottom: "1%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    
    width: "87%",
    backgroundColor: "white",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  circle_text: {
    fontSize: wp("8.61%"),
    fontFamily: "Inter-Black3",
    color: "#bfbfbf",
  },
  first: { flexDirection: "row", marginTop: "-3%" },
  circle_email: {
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    backgroundColor: "#f2f2f2",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginStart: "2%",

    marginBottom: "1%",
  },
  img: {
    height: height * 0.045,
    width: width * 0.15,
    resizeMode: "contain",
  },
  img2: {
    height: height * 0.028,
    width: width * 0.15,
    resizeMode: "contain",
  },
  created: {
    fontSize: wp("3.53%"),
    color: "#666666",
    marginEnd: "2%",
    fontFamily: "Inter-Black",
    width: width * 0.36,
  },
  title: {
    fontSize: wp("5.93%"),

    fontFamily: "Inter-Black",
    marginLeft: "3%",
    color: "#666666",
  },
  note_text: {
    fontSize: wp("4.63%"),

    fontFamily: "Inter-Black4",
    margin: "3%",
    color: "#666666",
    flex: 0.95,
  },
  input_box: {
    height: height * 0.12,
    width: width * 0.8,
    backgroundColor: "#666699",
    borderRadius: 8,
    color: "white",

    fontSize: 15,
    fontFamily: "Inter-Black2",
  },
  input_box2: {
    height: height * 0.23,
    width: width * 0.8,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    

    fontSize: 15,
    fontFamily: "Inter-Black2",alignSelf:"center",marginVertical:"3%"
  },
  box: {},
  input: {
    color: "white",
    paddingHorizontal: "2%",
    paddingTop: "2%",
    fontSize: 15,
    fontFamily: "Inter-Black4",
  },
  input2: {
    color: "black",
    paddingHorizontal: "2%",
    paddingTop: "2%",
    fontSize: 15,
    fontFamily: "Inter-Black4",
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

export default Comments;
