import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { STYLES } from "../../constant/styles";
import { Colors } from "../../constant/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View_lead_activity } from "../../Services";
import { ScreenNames } from "../../constant/ScreenNames";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/header";
import { Images } from "../../constant/images";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Lead_activity() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-ExtraBold.ttf"),
  });

  const route = useRoute();
  const [com, setcom] = useState(false);
  const [d, setd] = useState(false);
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [loading, setLoading] = React.useState(true);
  // const User_data = route.params.name;
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(route.params.id)

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d?.email,
        password: d?.password,
        id: route?.params.id,
      };
      View_lead_activity(data)
        .then((response) => response.json())
        .then((result) => {
          var Array = [];
          var arr = [];

          var item = result?.data?.lead_timeline_activities;
          var item2 = result?.data?.activity_search_filters;
          arr.push(item2);
          Array.push(item);
          setdata1(arr[0]);
          setdata(Array[0]);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);
  // const logo=route.params.logo
  // console.log(route.params.logo1)
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header
          leftIcon={Images.backArrow}
          rightIcon={Images.filterVertical}
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => {
            modalVisible ? setModalVisible(false) : setModalVisible(true);
          }}
        />

        <View style={styles.logo_header}>
          <View style={styles.logo}>
            <Text style={styles.logo_text}>{route?.params?.logo1}</Text>
          </View>
          <Text style={styles.logo_name}>{route?.params?.name}</Text>
        </View>

        <View style={styles.act}>
          <Text style={styles.act_text}>Lead Activity</Text>
        </View>
        {com == "All" ? (
          loading ? (
            <Loader loading={loading} />
          ) : data && data.length > 0 ? (
            <FlatList
              style={{  borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,}}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                
                <View style={styles.flat_data}>
                  <View style={styles.first}>
                    {item?.title == "eMail Sent" ? (
                      <Image
                        style={styles.img}
                        source={Images.email_white}
                      ></Image>
                    ) : (
                      <Image
                        style={styles.img}
                        source={Images.sms_sent}
                      ></Image>
                    )}
                    <Text style={styles.title}>{item?.title}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={styles.time_img}
                        source={Images.time}
                      ></Image>
                      <Text style={styles.created}>{item?.created}</Text>
                    </View>
                  </View>
                  <View style={styles.second}>
                    <Text style={styles.txt}>User Name</Text>
                    <Text style={styles.user_id}>: {item?.user_id}</Text>
                  </View>
                  <View style={styles.second}>
                    <Text style={styles.txt}>{item?.sent_by.label}</Text>
                    <Text style={styles.sent_by_value} numberOfLines={1}>
                      : {item?.sent_by.value}
                    </Text>
                  </View>
                  <View style={styles.second}>
                    <Text style={styles.txt}>{item?.recived_by.label}</Text>
                    <Text style={styles.rec_val}>
                      : {item?.recived_by.value}
                    </Text>
                  </View>
                  {item?.title == "eMail Sent" ? (
                    <View style={styles.second}>
                      <Text style={styles.txt}>{item?.subject.label}: </Text>
                      <View
                        style={{ width: width * 0.54, height: height * 0.07 }}
                      >
                        <ScrollView>
                          <Text style={styles.sub_val}>
                            {item?.subject.value}
                          </Text>
                        </ScrollView>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.second}>
                      <Text style={styles.txt}>
                        {item?.message_text.label}:{" "}
                      </Text>
                      <View style={styles.sub}>
                        <ScrollView>
                          <Text style={styles.sub_val}>
                            {item?.message_text.value}
                          </Text>
                        </ScrollView>
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ScreenNames.Comments, {
                        user: {
                          lead_activity_id: item?.id,
                          lead_id: route?.params?.id,
                          activity_type: item?.activity_type,
                          title: item?.title,
                        },
                      });
                    }}
                    style={styles.btn}
                  >
                    <Text style={styles.comment_txt}>View Comment</Text>
                  </TouchableOpacity>
                  <View style={styles.line}></View>
                  </View>
                
                  
                
              )}
            />
          ) : <View style={styles.show}>
          <Text>No Activity Found</Text>
        </View>
        ) : // loading ? (
        //   <Loader loading={loading} />
        // ) : data && data.length > 0 ? (

        com == "Call" ? (
          <View style={styles.show}>
            <Text>No Activity Found</Text>
          </View>
        ) : com == "SMS" ? (
          <View style={styles.show}>
            <Text>No Activity Found</Text>
          </View>
        ) : com == "Tasks" ? (
          <View style={styles.show}>
            <Text>No Activity Found</Text>
          </View>
        ) : com == "Notes" ? (
          <View style={styles.show}>
            <Text>No Activity Found</Text>
          </View>
        ) : com == "Mails" ? (
          <View style={styles.show}>
            <Text>No Activity Found</Text>
          </View>
        ) : com == "SSE" ? (
          <View style={styles.show}>
            <Text>No Activity Found</Text>
          </View>
        ) : com == "Appointment" ? (
          <View style={styles.show}>
            <Text>No Activity Found</Text>
          </View>
        ) : (
          setcom("All")
        )}

        {/* </View> */}
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        avoidKeyboard={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          activeOpacity={0}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.data1_view}>
            <ScrollView>
              <FlatList
                style={styles.flat_data1}
                data={data1}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View style={styles.modal_top}>
                    <TouchableOpacity style={{ marginTop: "8%" }}>
                      {item?.label == "All" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("All");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <Entypo
                              style={styles.modal_icn}
                              name="menu"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : item?.label == "Call" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("Call");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <Ionicons
                              style={styles.modal_icn}
                              name="ios-call"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : item?.label == "SMS" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("SMS");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <MaterialIcons
                              style={styles.modal_icn}
                              name="email"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : item?.label == "Tasks" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("Tasks");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <MaterialIcons
                              style={styles.modal_icn}
                              name="textsms"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : item?.label == "Notes" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("Notes");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <Ionicons
                              style={styles.modal_icn}
                              name="ios-call"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : item?.label == "Mails" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("Mails");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <Feather
                              style={styles.modal_icn}
                              name="mail"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : item?.label == "Saved Search Emails" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("SSE");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <MaterialCommunityIcons
                              style={styles.modal_icn}
                              name="calendar-month-outline"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : item?.label == "Appointments" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setcom("Appointments");
                          }}
                        >
                          <View style={styles.icon_row}>
                            <Entypo
                              style={styles.modal_icn}
                              name="menu"
                              size={30}
                              color="grey"
                            />
                            <Text style={styles.modal_txt}>{item?.label}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    height: height * 0.072,
    width: width * 0.15,
    resizeMode: "contain",
  },
  time_img: {
    height: height * 0.019,
    width: width * 0.05,
    resizeMode: "contain",
    marginTop: "2%",
  },
  flat_data1: {
    backgroundColor: "white",
    height: height * 0.35,
    width: width * 0.65,
    borderRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#666666",
  },
  data1_view: {
    alignSelf: "flex-end",
    marginEnd: "10%",
    marginTop: "13%",
  },
  icon_row: { flexDirection: "row" },
  sub: { width: width * 0.54, height: height * 0.081 },
  comment_txt: {
    paddingHorizontal: "1%",
    fontSize: wp("4.73%"),
    color: "#284162",
    fontFamily: "Inter-Black4",
  },
  txt: { fontSize: 14, color: "#284162" },
  flat_data: {
    width:"95%",elevation: 10,alignSelf:"center",paddingTop:"3%",
    // marginBottom: "10%",
   
    elevation: 10,backgroundColor:"#ffffff"
  },
  show: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontFamily: "Inter-Black",
  },
  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",

    position: "absolute",
    top: "10%",
    right: "8%",

    backgroundColor: "white",
    height: "35%",
    width: "55%",
    borderRadius: 8,
  },
  modal_icn: { marginHorizontal: 10 },
  modal_txt: {
    fontSize: 12,

    marginTop: "3%",
    color: "#666666",
    width: width * 0.5,
    fontFamily: "Inter-Black",
  },
  modal_top: {
    flexDirection: "row",

    alignItems: "center",
  },
  centeredView: {
    flex: 1,

    alignItems: "flex-end",
    marginEnd: "10%",
    marginTop: "12%",
  },
  modalView: {
    height: "30%",
    width: "70%",
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderColor: "grey",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logo_name: {
    fontSize: wp("6.43%"),
    marginStart: "3%",

    color: "white",
    fontFamily: "Inter-Black2",
  },
  logo_header: {
    flexDirection: "row",
    backgroundColor: Colors.MAIN_COLOR,
    marginTop: "-4%",
  },
  logo: {
    width: Dimensions.get("window").width * 0.17,
    height: Dimensions.get("window").width * 0.17,

    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    alignItems: "center",
    justifyContent: "center",
    marginStart: "5%",
    backgroundColor: "#666699",
    marginBottom: "2%",
  },
  logo_text: { fontSize: wp("8.53%"), color: "white", fontFamily: "Inter-Black3" },
  act_text: {
    color: "white",
    fontSize: 20,
    marginStart: "5%",
    fontFamily: "Inter-Black",
  },
  act: {
    height: "6%",
    backgroundColor: "#b3b3b3",
    justifyContent: "center",
    width:"95%",
    marginTop: "2%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 10,alignSelf:"center"
  },
  btn: {
    alignSelf: "flex-end",
    borderWidth: 1.5,
    marginTop: "1%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: "3%",
    borderColor: "#284162",
  },
  created: {
    fontSize: wp("3.23%"),
    color: "#284162",
    fontWeight: "400",
    fontFamily: "Inter-Black",
  },
  rec_val: { fontSize: wp("4.13%"), color: "#878787", fontFamily: "Inter-Black" },
  sub_val: {
    fontSize: wp("4.13%"),
    color: "#878787",
    fontFamily: "Inter-Black",
  },
  sent_by_value: {
   fontSize: wp("4.13%"),
    width: width * 0.53,
    color: "#878787",
    fontFamily: "Inter-Black",
  },
  user_id: { fontSize: wp("4.13%"), color: "#878787", fontFamily: "Inter-Black" },
  title: {
    fontSize: wp("4.53%"),
    flex: 0.9,
    marginTop: "3%",
    marginStart: "2.5%",
    color: "#808080",
    fontFamily: "Inter-Black4",
  },
  first: { flexDirection: "row",paddingLeft:"2%" },
  second: { flexDirection: "row", marginLeft: "20%" },

  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#bfbfbf",
    marginTop: "7%",alignSelf:"center"
  },
  circle_email: {
    height: height * 0.055,
    width: width * 0.12,

    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginStart: "2%",
    backgroundColor: "#0099cc",
    marginBottom: "1%",
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 30,
  },
  circle_text: {
    fontSize: 10,
    fontWeight: "500",
    color: "#bfbfbf",
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  container: { backgroundColor: "#e6e6e6", height: "100%" },
});

export default Lead_activity;
