import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
  Keyboard,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Audio } from "expo-av";

import {
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Delete_sms, Send_sms, Sms_chat, get_leads_All } from "../../Services";
import moment from "moment";
import Loader from "../../constant/Loader";
import { Image } from "react-native";
import { Images } from "../../constant/images";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [val, setval] = useState("");
  const [c, setc] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);
  const [t, sett] = useState(route.params.name);

  const [DATA, setDATA] = useState([]);
  const [DATA2, setDATA2] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [m_id, setm_id] = useState("");
  const [dataSource, setDataSource] = useState([]);

  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [sound, setSound] = React.useState();
  const [r, setR] = React.useState(true);
  const [rec, setRec] = React.useState("");

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: rec,
    });
    setSound(sound);

    await sound.playAsync();
  }

  async function playSound2() {
    const { sound } = await Audio.Sound.createAsync({
      uri: rec,
    });
    setSound(sound);

    await sound.pauseAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  React.useEffect(() => {
    (async () => {
      getData();
    })();
  }, []);

  async function getData() {
    console.log(offset);

    const user_data = await AsyncStorage.getItem("user_data");

    const d = JSON.parse(user_data);

    // console.log(dr)
    const data = {
      email: d.email,
      password: d.password,
      no: offset,
    };
    get_leads_All(data)
      .then((response) => response.json())
      .then(async (responseJson) => {
        // Successful response from the API Call

        if (responseJson.data.leads.length > 0) {
          setOffset(offset + 1);
          // After the response increasing the offset
          setDataSource([...dataSource, ...responseJson.data.leads]);
          // await AsyncStorage.setItem('Dts', JSON.stringify(dataSource));
        

          // setLoading2(false);
        } else {
          setIsListEnd(true);

         
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const ab = () => {
    var a = [];
    dataSource.map((i) => {
      a.push({ ...i.Lead });
    });

    route.params.id
      ? a.map((item, index) => {
          if (route.params.id == item.id) {
            navigation.navigate(ScreenNames.DETAIL, {
              user: {
                name: item?.name,
                id: item?.id,
                logo: item?.name_initials,
                imp2:"1"
              },
              index: index,
              DATA: a,
              imp:"1"
            }),
              AsyncStorage.setItem("imp", "complete");
          }
        })
      : null;
  };

  console.log(DATA2.length)

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        id: route.params.id,
      };

      Sms_chat(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result?.data?.leads)

          setDATA(result?.data?.messages);

          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)

          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        id: route?.params?.id,

        msg: val,
      };

      Send_sms(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setLoading(true);
          call_api();

          // Alert.alert(data.msg);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      // val.length == 0 ? setc(false):setc(true)

      setc(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setc(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const DELETE = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        id: route?.params?.id,

        msg_id: m_id,
      };

      Delete_sms(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setLoading(true);
          setModalVisible(false);
          call_api();

          // Alert.alert(data.msg);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const call_api = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        id: route.params.id,
      };

      Sms_chat(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result?.data?.leads)

          setDATA(result?.data?.messages);

          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)

          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getIndex = () => {
    return DATA2.map((i) => {
      if (i.name == t) {
        sett(i.ind);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ marginStart: "4%" }}
            onPress={() => navigation.goBack()}
            
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={45}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              alignItems: "center",

              flexDirection: "row",
            }}
            onPress={() => {
             ab()
            }}
          >
            <View style={styles.circle}>
              <Text style={styles.ini}>{route.params.n_i}</Text>
            </View>

            <Text style={styles.name}>{route.params.name}</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loader loading={loading} />
        ) : (
          <>
            <FlatList
              style={styles.flat}
              data={DATA}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <View>
                  {item?.direction == "incoming" ? (
                    <View style={{}}>
                      <View style={styles.out}>
                        <TouchableOpacity
                          // style={styles.in}
                          onLongPress={() => {
                            setm_id(item.id), setModalVisible(true);
                          }}
                          activeOpacity={1}
                        >
                          <Text style={styles.txt}>{item.text}</Text>
                        </TouchableOpacity>
                        {item?.attachment_audio_url_thumbnail ? (
                          <TouchableOpacity
                            style={{ alignSelf: "flex-start" }}
                            onPress={() => {
                              setRec(item?.attachment_audio_url),
                                setModalVisible1(true);
                            }}
                          >
                            <Image
                              style={styles.img}
                              source={{
                                uri: item?.attachment_audio_url_thumbnail,
                              }}
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.no}>{item.text}</Text>
                        <Text style={styles.time2}>
                          {}
                          {moment(item?.created_date).format("H:mm")}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{ alignSelf: "flex-end", alignItems: "flex-end" }}
                    >
                      <View style={styles.in}>
                        <TouchableOpacity
                          // style={styles.in}
                          onLongPress={() => {
                            setm_id(item.id), setModalVisible(true);
                          }}
                          activeOpacity={1}
                        >
                          <Text style={styles.no}>{item.text}</Text>
                        </TouchableOpacity>
                        {item?.attachment_audio_url_thumbnail ? (
                          <TouchableOpacity
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => {
                              setRec(item?.attachment_audio_url),
                                setModalVisible1(true);
                            }}
                          >
                            <Image
                              style={styles.img}
                              source={{
                                uri: item?.attachment_audio_url_thumbnail,
                              }}
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>

                      <Text style={styles.time1}>
                        {moment(item?.created_date).format("DD, MMM H:mm")}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            />
            <View style={styles.box}>
              <View
                style={{
                  // height: height * 0.12,
                  paddingHorizontal: "2%",
                  marginHorizontal: 15,
                  fontSize: 15,
                  fontWeight: "500",
                  backgroundColor: "white",
                  height: 50,
                  borderWidth: 1,
                  width: c && val.length > 0 ? "75%" : "90%",
                  color: "#666666",
                  borderRadius: 4,
                  borderColor: "blue",
                }}
              >
                <TextInput
                  style={styles.input}
                  value={val}
                  onChangeText={(txt) => {
                    setval(txt);
                  }}
                  maxLength={160}
                  placeholder="Text Message"
                  // onKeyPress={({ nativeEvent }) => {
                  //   if (nativeEvent.key === "Backspace") {
                  //     val.trim().length == 0 ? setc(false) : setc(true);
                  //   }
                  // }}
                ></TextInput>
                <Text style={{ textAlign: "right", color: "#cccccc" }}>
                  {160 - val.length}/1
                </Text>
              </View>
              {c && val.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    postdata();
                  }}
                >
                  <FontAwesome
                    name="send"
                    style={{
                      marginBottom: 10,
                      marginEnd: "10%",
                      marginStart: "10%",
                    }}
                    size={32}
                    color="blue"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.centeredVieww}
          >
            <TouchableOpacity
              style={styles.modalVieww}
              activeOpacity={1}
              onPress={() => {
                DELETE();
              }}
            >
              <Text style={styles.textStyle3}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(!modalVisible1), playSound2();
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalVisible1(!modalVisible1), playSound2();
            }}
            style={styles.centeredVieww2}
          >
            <TouchableOpacity
              style={styles.modalVieww2}
              activeOpacity={1}
              onPress={() => {}}
            >
             
              {r ? (
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    onPress={() => {
                      playSound();
                      setR(false);
                    }}
                    style={styles.textStyle3}
                  >
                    <AntDesign name="play" size={55} color="black" />
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    onPress={() => {
                      playSound2();
                      setR(true);
                    }}
                    style={styles.textStyle3}
                  >
                    <AntDesign name="pausecircle" size={55} color="black" />
                  </Text>
                </View>
              )}
               
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  ini: {
    fontSize: wp("8.21%"),
    fontFamily: "Inter-Black3",
    color: "white",
  },
  name: {
    color: "white",
    fontSize: wp("5.61%"),
    fontFamily: "Inter-Black2",
    marginStart: "6%",
  },
  flat: {
    paddingHorizontal: "3%",
    marginBottom: "5%",
    backgroundColor: "white",
  },
  txt: {
    color: "#b3b3b3",
    fontSize: wp("4.61%"),

    fontFamily: "Inter-Black",
  },
  in: {
    backgroundColor: "#00b300",
    marginVertical: "5%",
    alignSelf: "flex-end",
    paddingVertical: "6%",
    paddingHorizontal: "7%",
    borderRadius: 15,
  },
  out: {
    borderColor: "#cccccc",
    borderWidth: 1,
    marginVertical: "5%",
    alignSelf: "flex-start",
    paddingVertical: "5%",
    paddingHorizontal: "7%",
    borderRadius: 15,
  },
  no: {
    color: "white",
    fontSize: wp("4.61%"),

    fontFamily: "Inter-Black",
  },
  circle: {
    width: Dimensions.get("window").width * 0.16,
    height: Dimensions.get("window").width * 0.16,

    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    backgroundColor: Colors.MAIN_icon,

    alignItems: "center",
    justifyContent: "center",
    marginStart: "8%",
  },
  header: {
    height: height * 0.12,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
    //   justifyContent: "space-between",
  },
  time1: {
    color: "#b3b3b3",
    fontSize: wp("4.21%"),

    fontFamily: "Inter-Black4",
  },
  time2: {
    color: "#b3b3b3",
    fontSize: wp("4.21%"),

    fontFamily: "Inter-Black4",
    marginStart: "3%",
  },
  circle_text: {
    fontSize: 24,
    fontFamily: "Inter-Black3",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input_box: {
    // height: height * 0.12,
    paddingHorizontal: "2%",
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: "500",
    backgroundColor: "white",
    height: 50,
    borderWidth: 1,
    width: "90%",
    color: "#666666",
    borderRadius: 4,
    borderColor: "blue",
  },
  box: {
    height: height * 0.1,
    backgroundColor: "#cccccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
  },
  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "0%",
    width: "100%",
  },
  centeredVieww: {
    flex: 1,

    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.1)",
    alignItems: "center",
  },
  modalVieww: {
    width: "95%",
    backgroundColor: "#ececee",
    borderRadius: 15,

    elevation: 5,
    marginTop: height * 0.9,

    // elevation: 20,
  },
  centeredVieww2: {
    flex: 1,

    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalVieww2: {
    width: "95%",
    backgroundColor: "#ececee",
    borderRadius: 6,

    elevation: 5,
    alignSelf: "center",
    height: "20%",

    paddingHorizontal: "10%",
    justifyContent: "center",

    // elevation: 20,
  },
  textStyle1: {
    fontSize: wp("5.41%"),
    fontFamily: "Inter-Black2",
    marginTop: "7%",
  },
  textStyle2: {
    fontSize: wp("4%"),
    textAlign: "center",
    marginVertical: "7%",
    color: "#262626",
  },
  textStyle3: {
    fontSize: wp("6.01%"),
    color: "#00b300",
    fontFamily: "Inter-Black",
    marginVertical: "5%",
    textAlign: "center",
  },
  img: {
    width: Dimensions.get("window").width * 0.44,
    height: Dimensions.get("window").width * 0.44,
    resizeMode: "contain",
    marginStart: "25%",
    marginTop: "4%",
  },
});
