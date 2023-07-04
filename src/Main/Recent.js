import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Image,
  SafeAreaView,
  Alert,TouchableHighlight
} from "react-native";
import { useFonts } from "expo-font";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Pin_note, get_leads } from "../Services";
import { useNavigation } from "@react-navigation/native";
import Loader from "../constant/Loader";
import { ScreenNames } from "../constant/ScreenNames";
import { Colors } from "../constant/colors";
import { Images } from "../constant/images";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export default function Recent(data) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-Regular.ttf"),
  });

  // if (!fontsLoaded) {
  //   return null;
  // }
  const [d, setd] = useState(false);
  const [t, sett] = useState(false);
  const [t2, sett2] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const [DATA, setDATA] = useState([]);

  const [loading, setLoading] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [d1, setd1] = useState(0);
  const [d2, setd2] = useState(false);
  const [pin_note, setpin_note] = useState("");
  const [pin_date, setpin_date] = useState("");
  const [note, setnote] = useState("");
  const [n, setn] = useState("");
  const [modalTitle2, setModalTitle2] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;
  
  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
      };

      get_leads(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result?.data?.leads)
          var a = [];
          result?.data?.leads.map((i) => {
            a.push({
              ...i.Lead,

              isChecked: false,
              note_value: "",
            });
          });
          setDATA(a);

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

  const postdata = async () => {
    try {
      loading2 ? <Loader loading={loading2} /> : setModalVisible(!modalVisible);

      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        pin_text: note,
        id: modalTitle,
        password: d.password,
      };
      Pin_note(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          call_api(), setModalVisible(!modalVisible);
          setLoading2(false);
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
      };

      get_leads(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result?.data?.leads)
          var a = [];
          result?.data?.leads.map((i) => {
            a.push({
              ...i.Lead,

              isChecked: false,
              note_value: "",
            });
          });
          setDATA(a);

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
  // console.log(DATA);

  const handleChange = (id) => {
    let temp = DATA.map((i) => {
      if (id === i.id) {
        return { ...i, isChecked: !i.isChecked };
      }
      return i;
    });
    setDATA(temp);
  };

  let selected = DATA.filter((i) => i.isChecked);
  // console.log(selected)

  const selectAlldata = () => {
    let temp = DATA.map((i) => {
      if (d == false) {
        return { ...i, isChecked: true };
      }
      if (d == true) {
        return { ...i, isChecked: false };
      }
    });
    setd(!d);
    setDATA(temp);
  };

  const selectAlldata2 = () => {
    let temp = DATA.map((i) => {
      if (t == true) {
        return { ...i, isChecked: true };
      }

      // if (i.isChecked == true&& t == true) {
      //   return { ...i, isChecked: false };
      // }
    });

    setDATA(temp);
    sett2(!t2);
  };
  // console.log(t2 ? Alert.alert("ut"):"");
  const UnselectAlldata = () => {
    let temp = DATA.map((i) => {
      if (t == true) {
        return { ...i, isChecked: false };
      }
    });
    sett2(!t2);
    setDATA(temp);
    sett(false);

    setd(!d);
  };
  // console.log(d);

  const handleChange2 = (id) => {
    let temp = DATA.map((i) => {
      if (id === i.id) {
        return { ...i, isChecked: (i.isChecked = !i.isChecked) };
      }

      return i;
    });
    // sett2(!t2);
    setd(!d);
    setDATA(temp);
    // sett2(true)
  };

  // React.useEffect(() => {
  //   (async () => {
  //     let temp = DATA.map((i) => {
  //       if (route?.params?.b.id === i.id) {
  //         return {
  //           ...i,
  //           pinnednote: (i.pinnednote = route?.params?.b.pinnednote),
  //         };
  //       }

  //       return i;
  //     });
  //     // sett2(!t2);
  //     setDATA(temp);
  //   })();
  // }, []);
 
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
    // <ScrollView style={{  }}>
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {loading ? (
          <Loader loading={loading} />
        ) : DATA && DATA.length > 0 ? (
          <>
            {t ? (
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  height: height * 0.048,
                  width: width * 0.42,
                  // backgroundColor: d == true ? "orange" : null,
                  margin: "3%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 0.8,
                  borderRadius: 25,
                  borderColor: "black",
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => {
                    t2 ? selectAlldata2() : UnselectAlldata();
                    // selectAlldata2()
                  }}
                >
                  <Text
                    style={{
                      color: "#999999",
                      fontSize: wp("5.41%"),

                      fontFamily: "Inter-Black",
                    }}
                  >
                    Select All
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  height: height * 0.048,
                  width: width * 0.42,
                  backgroundColor: d == true ? "orange" : null,
                  margin: "3%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 0.8,
                  borderRadius: 25,
                  borderColor: "black",
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => {
                    selectAlldata();
                    
                  }}
                >
                  <Text
                    style={{
                      color: d == true ? "white" : "#999999",
                      fontSize: wp("5.41%"),
                      fontFamily: "Inter-Black",
                    }}
                  >
                    Select All
                  </Text>
                </TouchableOpacity>
              </View>
            )}
           
            <FlatList
              style={styles.flat}
              data={DATA}
              extraData={DATA}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View>
                  
                  <View style={styles.flat_view}>
                    {d == true ? (
                      <Pressable
                        style={{ marginStart: "6%" }}
                        onPress={() => handleChange(item.id)}
                      >
                        {item.isChecked ? (
                          <AntDesign
                            name="checkcircle"
                            size={23}
                            color={"#4775d1"}
                          />
                        ) : (
                          <FontAwesome
                            name="circle-thin"
                            size={23}
                            color="#cccccc"
                          />
                        )}
                      </Pressable>
                    ) : null}
                    <TouchableHighlight
                      style={{ paddingVertical: "3%" }}
                      underlayColor={"#d9d9d9"}
                      onLongPress={() => {
                        handleChange2(item.id), sett(!t);
                      }}
                    >
                      <View
                        activeOpacity={1}
                        // onLongPress={() => {
                        //   handleChange2(item.id), sett(!t);
                        // }}
                        // onPress={() => {
                        //   navigation.navigate(ScreenNames.DETAIL, {
                        //     user: {
                        //       name: item.name,
                        //       id: item.id,
                        //       logo: item.name_initials,
                        //     },
                        //     index: index,
                        //     DATA: DATA,
                        //   });
                        //   // AsyncStorage.setItem("user_id", item.id);
                        // }}
                        style={{
                          backgroundColor: "white",

                          width: d == true ? width * 0.8 : width * 0.93,

                          elevation: 5,
                          alignSelf: "center",
                          justifyContent: "center",
                          borderRadius: 5,
                          shadowColor: "white",
                        }}
                      >{}
                        <View style={styles.set}>
                          <TouchableOpacity
                          activeOpacity={1}
                            onPress={() => {
                              navigation.navigate(ScreenNames.DETAIL, {
                                user: {
                                  name: item.name,
                                  id: item.id,
                                  logo: item.name_initials,
                                },
                                index: index,
                                DATA: DATA,
                              });
                              // AsyncStorage.setItem("user_id", item.id);
                            }}
                            style={styles.circle_icon}
                          >
                            <View style={styles.circle}>
                              <Text style={styles.circle_text}>
                                {item.name_initials}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <Text
                            onPress={() => {
                              navigation.navigate(ScreenNames.DETAIL, {
                                user: {
                                  name: item.name,
                                  id: item.id,
                                  logo: item.name_initials,
                                },
                                index: index,
                                DATA: DATA,
                              });
                              // AsyncStorage.setItem("user_id", item.id);
                            }}
                            style={styles.name}
                          >
                            {item.name}
                          </Text>
                          {/* {route?.params?.b?.id == item.id ? (
                            (item.pined_note = route?.params?.b?.pined_note)
                          ) : (
                            <> */}

                          <TouchableOpacity
                            style={{
                              marginTop: "2%",
                              shadowColor: "#000",
                              shadowOffset: { width: 2, height: 4 },
                              shadowOpacity: 0.95,
                              shadowRadius: 2.84,
                              elevation: 5,
                            }}
                            activeOpacity={1}
                            onPress={() => {
                              item.pined_note == "Yes" ? setd1(3) : setd1(0);
                              setModalVisible(true),
                                setModalTitle2(item.pinned_by),
                                setModalTitle(item.id),
                                setnote(item.pined_note_text),
                                setpin_date(item.pinned_date),
                                setpin_note(item.pined_note);
                            }}
                          >
                            
                            {item.pined_note == "Yes" ? (
                              <Image
                                style={styles.note2}
                                source={Images.pencil_note}
                              ></Image>
                            ) : (
                              <Image
                                style={styles.note2}
                                source={Images.plus_note}
                              ></Image>
                            )}
                          </TouchableOpacity>
                        </View>

                        {item.phone ? (
                          <>
                            <View style={styles.line2}></View>
                            <View style={styles.set}>
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(`tel:${item.phone}`);
                                }}
                                style={styles.phone_icon}
                              >
                                <Image
                                  style={styles.call}
                                  source={Images.call_icon}
                                ></Image>
                              </TouchableOpacity>
                              <Text
                                onPress={() => {
                                  Linking.openURL(`tel:${item.phone}`);
                                }}
                                style={styles.number}
                              >
                                {item.phone}
                              </Text>

                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(`sms:${item.phone}`);
                                }}
                              >
                                <Image
                                  style={styles.sms}
                                  source={Images.sms}
                                ></Image>
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : null}

                        {item.email ? (
                          <>
                            <View style={styles.line2}></View>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => {
                                Linking.openURL(`mailto:${item.email}`);
                              }}
                              style={styles.set}
                            >
                              <View style={styles.email_icon}>
                                <Image
                                  style={styles.mail_icon}
                                  source={Images.mail_icon}
                                ></Image>
                              </View>
                              <Text style={styles.email}>{item.email}</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <View style={styles.line3}></View>
                        )}
                        {/* {item.voicemail ? (
                        <> */}
                        <View style={styles.line2}></View>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => setModalVisible2(!modalVisible2)}
                          style={styles.set}
                        >
                          <View style={styles.voice_icon}>
                            <Image
                              style={styles.voice}
                              source={Images.Voice_icon}
                            ></Image>
                          </View>
                          <Text style={styles.voicemail}>
                            {/* {item.voicemail} */}
                            Voicemail
                          </Text>
                        </TouchableOpacity>
                        {/* </>
                      ) : <View style={styles.line3}></View>} */}
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.line}></View>
                </View>
              )}
            />

            <View style={styles.centeredView}>
              {/* {pin_note == "Yes" ? (setd1(3)):({})} */}
              {d1 == 1 ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modal_page}>
                    <View style={styles.modalView1}>
                      <View style={styles.pin2}>
                        <Text style={styles.modalText1}>Pin Note</Text>
                        <Pressable
                          onPress={() => (
                            setModalVisible(!modalVisible), setd1(0)
                          )}
                        >
                          <Entypo name="cross" size={30} color="black" />
                        </Pressable>
                      </View>
                      <View style={styles.line2}></View>

                      <KeyboardAvoidingView enabled>
                        <View style={styles.input}>
                          <TextInput
                          style={{padding:10,textAlignVertical: 'top',height:"100%"}}
                            //  value={""}
                            onChangeText={(txt) => (setnote(txt), setn(txt))}
                          />
                        </View>
                      </KeyboardAvoidingView>
                      <View style={styles.modal_btn_box}>
                        {n.length > 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              postdata();
                            }}
                            style={styles.modal_btn}
                          >
                            <Text style={styles.modal_btn_txt}>Save</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {}}
                            activeOpacity={1}
                            style={styles.modal_btn}
                          >
                            <Text style={styles.modal_btn_txt}>Save</Text>
                          </TouchableOpacity>
                        )}

                        <TouchableOpacity
                          onPress={() => {
                            {
                              setd1(0);
                            }
                          }}
                          style={styles.modal_btn}
                        >
                          <Text style={styles.modal_btn_txt}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : d1 == 4 ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modal_page}>
                    <View style={styles.modalView1}>
                      <View style={styles.pin2}>
                        <Text style={styles.modalText1}>Pin Note</Text>
                        <Pressable onPress={() => setd1(3)}>
                          <Entypo name="cross" size={30} color="black" />
                        </Pressable>
                      </View>
                      <View style={styles.line2}></View>

                      <KeyboardAvoidingView enabled>
                        <View style={styles.input}>
                          <TextInput
                        style={{padding:10,textAlignVertical: 'top',height:"100%"}}

                            value={note}
                            onChangeText={(txt) => setnote(txt)}
                          />
                        </View>
                      </KeyboardAvoidingView>
                      <View style={styles.modal_btn_box}>
                        <TouchableOpacity
                          onPress={() => {
                            postdata();
                          }}
                          style={styles.modal_btn}
                        >
                          <Text style={styles.modal_btn_txt}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            {
                              setd1(3);
                            }
                          }}
                          style={styles.modal_btn}
                        >
                          <Text style={styles.modal_btn_txt}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : d1 == 0 ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modal_page}>
                    <View style={styles.modalView}>
                      <View style={styles.pin}>
                        <Text style={styles.modalText}>Pin Note</Text>
                        <Pressable
                          style={{}}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Entypo name="cross" size={30} color="black" />
                        </Pressable>
                      </View>

                      <Text
                        style={{
                          color: "black",
                          marginLeft: "4%",
                          marginTop: "12%",
                        }}
                      >
                        No note added yet.
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setd1(1);
                        }}
                        style={styles.add_note}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: wp("6%"),
                            fontFamily: "Inter-Black4",
                          }}
                        >
                          Add Note
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              ) : d1 == 3 ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modal_page}>
                    <View style={styles.modalView2}>
                      <View style={styles.pin}>
                        <Text style={styles.modalText}>{modalTitle2}</Text>
                        <Pressable
                          style={{}}
                          onPress={() => (
                            call_api(),
                            setModalVisible(!modalVisible),
                            // setd1(0),
                            setn("")
                          )}
                        >
                          <Entypo name="cross" size={30} color="black" />
                        </Pressable>
                      </View>
                      <Text style={styles.date}>{pin_date}</Text>
                      <Text style={styles.note3}>{note}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setd1(4);
                        }}
                        style={styles.update_note}
                      >
                        <Text style={styles.update_txt}>Update</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              ) : null}
            </View>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                  setModalVisible2(!modalVisible2);
                }}
              >
                <View style={styles.modal_page}>
                  <View style={styles.modal_voicemail_view}>
                    <View style={styles.pin2}>
                      <Text style={styles.modalText1}>Voicemail</Text>
                      <Pressable
                        onPress={() => setModalVisible2(!modalVisible2)}
                      >
                        <Entypo name="cross" size={30} color="black" />
                      </Pressable>
                    </View>
                    <View style={styles.line2}></View>
                    <View style={styles.modal_btn_box_voicemail}>
                      <TouchableOpacity
                        onPress={() => {}}
                        activeOpacity={1}
                        style={styles.modal_btn_voicemail}
                      >
                        <Text style={styles.modal_btn_txt_voicemail1}>
                          Ringing Voicemail
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          {
                          }
                        }}
                        style={styles.modal_btn_voicemail2}
                      >
                        <Text style={styles.modal_btn_txt_voicemail2}>
                          iVoiceCast
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => {}}
                        style={styles.circle_icon_v}
                      >
                        <View style={styles.circle_v}>
                          <Text style={styles.circle_text_v}>US</Text>
                        </View>
                      </TouchableOpacity>
                      <Text onPress={() => {}} style={styles.name2}>
                        Upashak Singh
                      </Text>
                    </View>
                    <View style={styles.line4}></View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{ marginStart: "7%", marginEnd: "5%" }}
                      >
                        <Image
                          style={styles.mail_icon_v}
                          source={Images.mail_icon}
                        ></Image>
                      </TouchableOpacity>
                      <Text onPress={() => {}} style={styles.email_v}>
                        Upashak88workgmail.com
                      </Text>
                    </View>
                    <View style={styles.line4}></View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{ marginStart: "7%", marginEnd: "5%" }}
                      >
                        <Image
                          style={styles.mail_icon_v}
                          source={Images.call_icon}
                        ></Image>
                      </TouchableOpacity>
                      <Text onPress={() => {}} style={styles.email_v}>
                        9893553321
                      </Text>
                    </View>
                    <KeyboardAvoidingView enabled>
                      <View style={styles.input2}>
                        <TextInput
                        //  value={""}
                        // onChangeText={(txt) => (setnote(txt), setn(txt))}
                        />
                      </View>
                    </KeyboardAvoidingView>
                    <View style={styles.modal_btn_box}>
                      <TouchableOpacity
                        onPress={() => {}}
                        activeOpacity={1}
                        style={styles.modal_btn}
                      >
                        <Text style={styles.modal_btn_txt}>Save</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          {
                          }
                        }}
                        style={styles.modal_btn}
                      >
                        <Text style={styles.modal_btn_txt}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {d2 ? (
              <Animated.View
                style={{
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius:
                    Math.round(
                      Dimensions.get("window").width +
                        Dimensions.get("window").height
                    ) / 2,
                  position: "absolute",

                  right: "6%",

                  backgroundColor: Colors.float_btn,

                  transform: [{ translateY: translation }],
                  bottom: height * 0.28,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(ScreenNames.NEW_LEADS)}
                  // onPress={() => navigation.navigate("demo")}
                  // style={styles.floating_btn}
                >
                  <Image
                    source={Images.addLeads}
                    style={{
                      width: Dimensions.get("window").width * 0.18,
                      height: Dimensions.get("window").width * 0.18,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>
            ) : null}
            <View style={styles.tag_box}>
              {d == true ? (
                <View style={styles.tag_view}>
                  <View style={styles.btn1}>
                    <TouchableOpacity style={styles.tag_touch}>
                      <Text style={styles.tag}>Voice Call</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.btn2}>
                    <TouchableOpacity style={styles.tag_touch}>
                      <Text style={styles.tag}>Add Tags</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </>
        ) : null}
      </View>
    </SafeAreaView>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  update_txt: {
    color: "white",
    fontSize: wp("6%"),
    fontFamily: "Inter-Black4",
  },
  note3: {
    color: "black",
    margin: "4%",
    fontSize: 14,
    fontFamily: "Inter-Black4",
  },
  date: {
    color: "black",
    marginLeft: "4%",
    marginVertical: "1%",
    fontSize: 15,
    fontFamily: "Inter-Black4",
  },
  set: {
    flexDirection: "row",
    paddingVertical: "4%",
    alignItems: "center",
  },
  circle_box: {
    flexDirection: "row",
    // paddingVertical: "2%",
    alignItems: "center",
  },
  flat_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: "3%",
  },
  pin2: {
    flexDirection: "row",

    margin: "4%",
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  modal_btn_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    marginVertical: "4%",
  },
  modal_btn_box_voicemail: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginVertical: "2%",
    paddingHorizontal: "3%",
  },
  modal_btn_txt: { color: "white", fontSize: 17, fontFamily: "Inter-Black4" },
  modal_btn_txt_voicemail1: {
    color: "#2b92ee",
    fontSize: wp("4%"),
    fontFamily: "Inter-Black4",
  },
  modal_btn_txt_voicemail2: {
    color: "white",
    fontSize: wp("4%"),
    fontFamily: "Inter-Black4",
  },
  modal_btn: {
    height: height * 0.05,
    width: "45%",
    backgroundColor: "#d8524f",
    alignSelf: "center",

    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  modal_btn_voicemail: {
    height: height * 0.05,
    width: "50%",
    backgroundColor: "#f2f2f2",
    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#b3b3b3",
  },
  modal_btn_voicemail2: {
    height: height * 0.05,
    width: "50%",
    backgroundColor: Colors.MAIN_COLOR,
    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#b3b3b3",
  },
  modal_page: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.7)",
  },
  pin: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "4%",
  },
  add_note: {
    height: height * 0.065,
    width: width * 0.36,
    backgroundColor: "#5bbfdf",
    alignSelf: "center",
    marginTop: height * 0.22,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  update_note: {
    height: height * 0.065,
    width: width * 0.36,
    backgroundColor: "#5bbfdf",
    alignSelf: "center",
    marginTop: "48%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  tag_box: {
    width: "100%",
    height: height * 0.068,
    backgroundColor: Colors.MAIN_COLOR,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  note: {
    height: height * 0.07,
    width: width * 0.2,
    resizeMode: "contain",
  },
  note2: {
    height: hp("6%"),
    width: wp("10.38%"),

    resizeMode: "contain",
  },
  tag_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tag_touch: { alignItems: "center" },
  tag: { color: "white", fontSize: wp("4.71%"), fontFamily: "Inter-Black2" },
  flat: { backgroundColor: "#f2f2f2", marginBottom: "10%" },
  input: {
    height: height * 0.25,
    margin: 12,

    
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  input2: {
    height: height * 0.08,

    padding: 10,

    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#b3b3b3",
    width: "85%",
    alignSelf: "center",
    marginVertical: "3%",
  },
  modalText: {
    fontSize: 20,
    fontFamily: "Inter-Black2",
  },
  modalText1: {
    fontSize: 20,
    marginHorizontal: "30%",
    fontFamily: "Inter-Black4",
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    // height: height * 0.44,
    width: "87%",
    backgroundColor: "#fcf5bf",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",
    marginTop: height * 0.12,
  },
  modalView2: {
    // height: height * 0.44,
    width: "87%",
    backgroundColor: "#feb6c1",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",
    marginTop: height * 0.12,
  },
  modalView1: {
    // height: height * 0.44,
    width: "87%",
    backgroundColor: "white",
    borderRadius: 10,

    elevation: 20,
    alignSelf: "center",
    marginTop: height * 0.12,
  },
  modal_voicemail_view: {
    // height: height * 0.44,
    width: "87%",
    backgroundColor: "white",
    // borderRadius: 10,

    elevation: 20,
    alignSelf: "center",
    marginTop: height * 0.12,
  },
  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",

    right: "8%",
    height: 60,
    backgroundColor: "orange",
    borderRadius: 30,
  },
  btn1: {
    flexDirection: "row",
    alignSelf: "center",
    height: height * 0.045,
    width: width * 0.32,
    backgroundColor: "brown",
    margin: "5%",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
  },
  btn2: {
    flexDirection: "row",
    alignSelf: "center",
    height: height * 0.045,
    width: width * 0.32,
    backgroundColor: "orange",
    margin: "5%",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
  },
  phone_icon: { flex: 0.15, marginStart: "8%" },
  circle_icon: { marginStart: "8%", marginEnd: "3%" },
  sms: {
    height: hp("6%"),
    width: wp("10.38%"),
    resizeMode: "contain",
    marginTop: "5%",
  },
  call: {
    height: hp("4%"),
    width: wp("7.38%"),
    resizeMode: "contain",
  },
  voice: {
    height: hp("4%"),
    width: wp("7.38%"),
    resizeMode: "contain",
  },
  mail_icon: { height: hp("3%"), width: wp("6.38%"), resizeMode: "contain" },
  mail_icon_v: { height: hp("2%"), width: wp("4.38%"), resizeMode: "contain" },
  voice_icon: { flex: 0.14, marginStart: "8%" },
  email_icon: { flex: 0.14, marginStart: "8%" },
  icon: {},
  icon1: { marginTop: "5%" },
  name: {
    fontSize: wp("6.31%"),

    color: "#666666",

    flex: 0.97,
    fontFamily: "Inter-Black",opacity:1
  },
  name2: {
    fontSize: wp("4.31%"),

    color: "#666666",

    fontFamily: "Inter-Black2",
  },
  number: {
    fontSize: wp("4.61%"),

    // fontWeight: "700",
    color: "#808080",
    flex: 0.82,
    fontFamily: "Inter-Black2",
  },
  email: {
    fontSize: wp("4.61%"),
    flex: 0.9,

    // fontWeight: "700",
    color: "#808080",
    fontFamily: "Inter-Black2",
  },
  email_v: {
    fontSize: wp("3.61%"),
    // flex: 0.9,

    fontWeight: "500",
    color: "#808080",
    // fontFamily: "Inter-Black2",
  },
  voicemail: {
    fontSize: wp("4.61%"),
    flex: 0.9,

    // fontWeight: "700",
    color: "#808080",
    fontFamily: "Inter-Black2",
  },

  circleview: { alignItems: "center" },
  circle_icon_v: { marginStart: "5%", marginEnd: "7%" },
  circle_v: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "#f2f2f2",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    justifyContent: "center",
  },
  circle_text_v: {
    fontSize: wp("8.61%"),
    // fontWeight: "700",
    color: "#bfbfbf",
    textAlign: "center",
    fontFamily: "Inter-Black",
  },
  circle: {
    width: Dimensions.get("window").width * 0.17,
    height: Dimensions.get("window").width * 0.17,
    backgroundColor: "#f2f2f2",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    justifyContent: "center",
  },
  circle_text: {
    fontSize: 28,
    // fontWeight: "700",
    color: "#bfbfbf",
    textAlign: "center",
    fontFamily: "Inter-Black3",
  },
  bouncy: { marginStart: "10%", marginRight: "-4%" },
  line: {
    backgroundColor: "#cccccc",
    height: 0.5,

    width: "100%",
  },
  line2: {
    backgroundColor: "#f2f2f2",
    height: 1.5,

    width: "100%",
  },
  line3: {
    backgroundColor: "#f2f2f2",
    height: 1.5,

    width: "100%",
    marginBottom: "0.5%",
  },
  line4: {
    backgroundColor: "#f2f2f2",
    height: 1.5,

    width: "100%",
    marginVertical: "3%",
  },
  button: {
    height: height * 0.025,
    width: width * 0.5,

    padding: 10,
    alignSelf: "center",
    backgroundColor: "#003366",
    elevation: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "10%",
  },
  login: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "500",
  },
  item: {
    backgroundColor: "white",
    padding: 10,

    width: width * 0.8,
    marginTop: "0%",
    marginBottom: "0%",
    marginEnd: "5%",
    elevation: 5,
  },

  container: { backgroundColor: "#e6e6e6", flex: 1 },
});
