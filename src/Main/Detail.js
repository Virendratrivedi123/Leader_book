import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
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
  Image,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../constant/colors";

import Basic_detail from "./Detail_folder/Basic_detail";
import Profile from "./Detail_folder/Profile";
import Related from "./Detail_folder/Related";
import { ScreenNames } from "../constant/ScreenNames";

import { Images } from "../constant/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Delete } from "../Services";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Detail({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
  });
  const route = useRoute();
  const [com, setcom] = useState(false);
  const [ind, setInd] = useState(route.params.index);
  const [i, seti] = useState(route?.params?.user?.id);
  const [DATA, setDATA] = useState(route?.params?.DATA);
  const [key, setKey] = useState(Math.random());
  const [loading, setLoading] = React.useState(true);
  console.log(route?.params?.index);
  const [User_data, setUserData] = useState(route?.params?.DATA[ind]);
  const [back_data, setback_data] = useState(route?.params?.user?.imp2);
  const [back_data2, setback_data2] = useState(route?.params?.r);
  const [modalVisible, setModalVisible] = useState(false);
  const [point, setpoint] = useState("2");
  const [delete_id, setdelete_id] = useState("");
  const d = [
    {
      id: "1",
      title: "Delete Property Search Only",
      value: "2",
      isChecked: true,
    },
    {
      id: "2",
      title: "Delete All Information (Leads and Profile Data)",
      value: "3",
      isChecked: false,
    },
  ];

  const [dummy, setdummy] = useState(d);

  React.useEffect(() => {
    (async () => {
      const u = route.params.user.imp2;
      console.log(u, "sm");
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      seti(route.params.user.id);
      // setLoading(false);
    })();
  }, []);

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        point: point,
        id: delete_id,
        password: d.password,
      };
      Delete(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setModalVisible(!modalVisible);
          const filteredData = DATA.filter((item) => item.id !== delete_id);
          navigation.push(ScreenNames.DETAIL, {
            user: {
              name: filteredData[ind].name,
              id: filteredData[ind].id,
              logo: filteredData[ind].name_initials,
            },
            index: ind,
            DATA: filteredData,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const press = (item) => {
    const temp = [];
    dummy.map((val) => {
      if (val.id == item.id) {
        temp.push({ ...val, isChecked: true });
      } else {
        temp.push({ ...val, isChecked: false });
      }
    });
    setdummy(temp);
  };
  console.log(point, "aman");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.box}>
          {back_data == "1" ? (
            <TouchableOpacity
              style={styles.back}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={Images.backArrow} style={styles.icon} />
            </TouchableOpacity>
          ) : back_data2 == "1" ? (
            <TouchableOpacity
              style={styles.back}
              onPress={() => {
                navigation.navigate("P2",{id:route.params?.id2,name:route.params?.name2})
              }}
            >
              <Image source={Images.backArrow} style={styles.icon} />
            </TouchableOpacity>
          ) :(
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.navigate(ScreenNames.MAIN_SCREEN)}
            >
              <Image source={Images.backArrow} style={styles.icon} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              ...styles.nxt_view,
              display: ind > 0 ? "flex" : "none",
              marginRight: 5,
              paddingHorizontal: 5,
            }}
            // onPress={() => {seti(DATA)}}
            onPress={() => {
              if (ind > 0) {
                setUserData(route.params.DATA[ind - 1]);
                setInd(ind - 1);
                setKey(Math.random());
                setcom("RECENT");
              }
            }}
          >
            <Image
              source={Images.backArrow}
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                marginStart: 5,
                marginEnd: 10,
              }}
            />
            <Text style={styles.nxt_txt}> Previous Lead</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.nxt_view,
              paddingHorizontal: 5,
              display: DATA.length > ind + 1 ? "flex" : "none",
            }}
            // onPress={() => {seti(DATA)}}
            onPress={() => {
              if (DATA.length > ind + 1) {
                // console.log(DATA[ind])
                setUserData(route.params.DATA[ind + 1]);
                setInd(ind + 1);
                setKey(Math.random());
                setcom("RECENT");
              }
            }}
          >
            <Text style={styles.nxt_txt}>Next Lead</Text>
            <Image
              source={Images.nextArrow}
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                marginStart: 7,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.in_box}>
          <View style={styles.circle}>
            <Text style={styles.circle_text}>{DATA[ind].name_initials}</Text>
          </View>
          <Text style={styles.name}>{DATA[ind].name}</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ScreenNames.EDIT_LEAD_DETAIL, {
                id: DATA[ind].id,
              })
            }
          >
            <Image style={styles.pencil} source={Images.editYellow} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => {
                setdelete_id(DATA[ind].id),
                  setpoint("2"),
                  setdummy(d),
                  setModalVisible(true);
              }
              // {setdelete_id(DATA[ind].id),setModalVisible(true)}
            }
          >
            <Image style={styles.delete} source={Images.delete} />
          </TouchableOpacity>
        </View>

        <View style={styles.tab}>
          <TouchableOpacity
            style={styles.ord}
            onPress={() => {
              setcom("RECENT");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: com == "RECENT" ? "Inter-Black3" : "Inter-Black2",
                color: "white",
                marginBottom: "2%",
                marginStart: "5%",
                marginTop: "4%",
              }}
            >
              BASIC DETAIL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.add}
            onPress={() => {
              setcom("PRIORITY");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: com == "PRIORITY" ? "Inter-Black3" : "Inter-Black2",
                color: "white",
                marginBottom: "2%",
                marginTop: "4%",
              }}
            >
              PROFILE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.setting}
            onPress={() => {
              setcom("ALL");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: com == "ALL" ? "Inter-Black3" : "Inter-Black2",
                color: "white",
                marginBottom: "2%",
                marginTop: "4%",
              }}
            >
              RELATED
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line_box}>
          <View
            style={{
              height: 3,
              width: width * 0.3,
              backgroundColor:
                com == "RECENT" ? Colors.LINE : Colors.MAIN_COLOR,
              marginTop: "3%",
            }}
          ></View>

          <View
            style={{
              height: 3,
              width: width * 0.3,
              backgroundColor:
                com == "PRIORITY" ? Colors.LINE : Colors.MAIN_COLOR,
              marginTop: "3%",
              marginStart: "5%",
            }}
          ></View>
          <View
            style={{
              height: 3,
              width: width * 0.3,
              backgroundColor: com == "ALL" ? Colors.LINE : Colors.MAIN_COLOR,
              marginTop: "3%",
              marginStart: "5%",
            }}
          ></View>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.upper}>
              <Image style={styles.cancel} source={{}} />
              <Text
                style={styles.textStyle1}
                onPress={() => {
                  postdata();
                }}
              >
                Delete Lead
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Image style={styles.cancel} source={Images.close_icon} />
              </TouchableOpacity>
            </View>

            <View style={styles.line}></View>
            <View style={{ marginVertical: "5%", marginHorizontal: "5%" }}>
              <Text style={styles.textStyle3}>
                Are you sure you want to delete this Lead?
              </Text>
              <Text style={styles.textStyle4}>
                Note:Once the lead(s) deleted permanently from the site,can't be
                recovered back.
              </Text>
              <FlatList
                data={dummy}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View>
                    {/* <Text style={styles.textStyle5}>{item.title}</Text> */}
                    <TouchableOpacity
                      onPress={() => {
                        press(item), setpoint(item.value);
                      }}
                      style={styles.button}
                    >
                      {item?.isChecked ? (
                        <Image style={styles.sms} source={Images.check}></Image>
                      ) : (
                        <Image
                          style={styles.sms}
                          source={Images.uncheck}
                        ></Image>
                      )}

                      <Text style={styles.textStyle5}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1 }}>
        {com == "RECENT" ? (
          <Basic_detail data={User_data} key={key} />
        ) : com == "PRIORITY" ? (
          <Profile data={User_data} key={key} />
        ) : com == "ALL" ? (
          <Related
            data={{
              data: User_data,
              d: DATA,
              in: ind,
            }}
            key={key}
          />
        ) : (
          setcom("RECENT")
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  line_box: { flexDirection: "row", backgroundColor: Colors.MAIN_COLOR },
  button: {
    alignItems: "center",

    flexDirection: "row",

    marginVertical: "2%",
    marginHorizontal: "5%",
  },
  upper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "5%",
    paddingHorizontal: "5%",
  },
  sms: {
    height: hp("6.5%"),
    width: wp("6.5%"),
    resizeMode: "contain",
    marginStart: "3%",
  },
  delete: {
    height: height * 0.035,
    width: width * 0.08,
    resizeMode: "contain",
  },
  line: {
    height: 1,
    backgroundColor: "#cccccc",

    width: "100%",
  },
  cancel: {
    height: height * 0.02,
    width: width * 0.05,
    resizeMode: "contain",
  },
  pencil: {
    height: height * 0.035,
    width: width * 0.12,
    resizeMode: "contain",
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  arrow: { marginHorizontal: "3%", marginVertical: "3%" },
  nxt_txt: {
    fontSize: 9,
    color: "white",

    fontWeight: "normal",
    fontFamily: "Inter-Black",
  },
  nxt_view: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    marginTop: "4%",
  },
  back: {
    color: "white",
    fontWeight: "bold",

    marginTop: "3%",
    textAlign: "center",
    flex: 0.9,
    marginStart: "3%",
  },
  in_box: {
    flexDirection: "row",
    backgroundColor: Colors.MAIN_COLOR,
  },
  box: {
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
    paddingBottom: 8,
  },
  circle: {
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
    marginBottom: "3%",
  },
  circle_text: { fontSize: 28, color: "white", fontFamily: "Inter-Black3" },
  name: {
    fontSize: 20,
    marginStart: "3%",
    // fontWeight: "bold",
    color: "white",
    fontFamily: "Inter-Black2",
  },
  text: {
    fontSize: 14,
    // fontWeight: "500",
    color: "white",
    marginStart: "3%",
    fontFamily: "Inter-Black2",
    // textAlign: "center",
  },

  tab: { flexDirection: "row", backgroundColor: Colors.MAIN_COLOR },
  ord: {
    backgroundColor: Colors.MAIN_COLOR,

    flex: 0.5,
  },
  add: {
    backgroundColor: Colors.MAIN_COLOR,
    flex: 0.4,
  },
  setting: {
    backgroundColor: Colors.MAIN_COLOR,

    flex: 0.3,
  },
  textStyle1: {
    fontSize: wp("5.41%"),
    fontFamily: "Inter-Black4",
  },
  textStyle2: {
    fontSize: wp("4%"),
    textAlign: "center",
    width: "80%",
    marginBottom: "7%",
    marginTop: "1%",
    color: "#262626",
  },
  textStyle3: {
    fontSize: wp("4.31%"),
    color: "black",
    fontFamily: "Inter-Black",
    textAlign: "center",
  },
  textStyle4: {
    fontSize: wp("3.61%"),
    color: "red",
    fontFamily: "Inter-Black",
    textAlign: "center",
    margin: "5%",
    width: width * 0.6,
    alignSelf: "center",
  },
  textStyle5: {
    fontSize: wp("3.81%"),
    color: "black",
    fontFamily: "Inter-Black",

    margin: "5%",
    width: width * 0.6,
    alignSelf: "center",
    justifyContent: "flex-start",
  },

  centeredView: {
    flex: 1,

    alignItems: "center",

    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,

    elevation: 5,
    marginTop: "30%",

    // elevation: 20,
  },
});
