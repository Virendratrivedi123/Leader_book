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
  Alert,
  TouchableHighlight,
  ScrollView,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Pin_note, add_tag, get_leads, get_leads_All } from "../Services";
import { useNavigation } from "@react-navigation/native";
import Loader from "../constant/Loader";
import { ScreenNames } from "../constant/ScreenNames";
import { Colors } from "../constant/colors";
import { Images } from "../constant/images";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function All() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-Regular.ttf"),
  });

  const [d, setd] = useState(false);
  const [t, sett] = useState(false);
  const [t2, sett2] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const [DATA, setDATA] = useState([]);
  const [s, sets] = useState([]);
  const [demo, setdemo] = useState(false);
  const [loading2, setLoading2] = React.useState(true);
  const [loading3, setLoading3] = React.useState(false);
  
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible7, setModalVisible7] = useState(false);
  const [modalVisible8, setModalVisible8] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const searchref = useRef();

  const [DATA1, setDATA1] = useState([]);
  const [DATA2, setDATA2] = useState([]);
  const [modalVisible_tags, setModalVisible_tags] = useState(false);
  const [blank_tag, setblank_tag] = useState("yes");
  const [blank_tag2, setblank_tag2] = useState("yes");
  const [DATA1_c, setDATA1_c] = useState([]);
  const [DATA2_c, setDATA2_c] = useState([]);
  const [selected_data, setselected_data] = useState([]);
  const [selected_data2, setselected_data2] = useState([]);
  
  const [dataSource, setDataSource] = useState([]);
  const [search, setsearch] = useState("");
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [v_data, setv_data] = useState([]);
  const [v_id, setv_id] = useState("");
  const [modalVisible6, setModalVisible6] = useState(false);

  React.useEffect(() => {
    (async () => {
      getData();
    })();
  }, []);

  async function getData() {
    console.log(offset);
    if (!loading && !isListEnd) {
      const user_data = await AsyncStorage.getItem("user_data");
      const user_data2 = await AsyncStorage.getItem("userInfo");
        const search = await AsyncStorage.getItem("search");
        const d = JSON.parse(user_data);
        const d2 = JSON.parse(user_data2);
  
  
        // console.log(d2.userinfo.password)
        const data = {
          email:d2.userinfo.email,
        password: d.password,
        no: offset,
      };
      get_leads_All(data)
        .then((response) => response.json())
        .then(async (responseJson) => {
          // Successful response from the API Call
          var c = [];
          responseJson?.data?.tags?.user_tags.map((i) => {
            c.push({
              ...i,

              isChecked: false,
            });
          });
          var b = [];
          responseJson?.data?.tags?.system_tags.map((i) => {
            b.push({
              ...i,

              isChecked: false,
            });
          });

          setDATA1(c);
          setDATA2(b);
          setDATA1_c(c);
          setDATA2_c(b);
          setselected_data(c);
          setselected_data2(b);
          if (responseJson.data.leads.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson.data.leads]);

            drs();

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

            drs();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const drs = async () => {
    const set = await AsyncStorage.getItem("set");
    const d3 = JSON.parse(set);

    if (d3 == "1") {
      const user_data2 = await AsyncStorage.getItem("search_data");
      const d2 = JSON.parse(user_data2);

      // console.log(result?.data?.leads)
      var a = [];
      d2?.data?.leads.map((i) => {
        a.push({
          ...i.Lead,

          isChecked: false,
          note_value: "",
        });
      });

      var c = [];
      d2?.data?.tags?.user_tags.map((i) => {
        c.push({
          ...i,

          isChecked: false,
        });
      });
      var b = [];
      d2?.data?.tags?.system_tags.map((i) => {
        b.push({
          ...i,

          isChecked: false,
        });
      });
      setDATA(a);
    } else {
      var it = 0;

      var a = [];
      dataSource.map((i) => {
        a.push({ ...i.Lead, isChecked: false, note_value: "", ind: it++ });
      });

      setDATA(a);
    }
  };

  const postdata = async () => {
    setLoading3(true);
    try {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        pin_text: note,
        id: modalTitle,
        password: d.password,
      };
      Pin_note(data).then((response) => {
        response.json().then(async (data) => {
          setModalVisible(!modalVisible);
          AsyncStorage.setItem("op", "1");
          navigation.push(ScreenNames.DRAWER);
        });
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
    let selected = temp.filter((i) => i.isChecked);
    sets(selected);
    setDATA(temp);
  };

  const press = (item) => {
    if (item.isChecked == true && s.length <= 1) {
      setd(!d), AsyncStorage.setItem("op", "1");
      navigation.push(ScreenNames.DRAWER);
    }
  };

  let selected = DATA.filter((i) => i.isChecked);
  // console.log(selected)

  var ab = selected.map((i) => {
    return i.id;
  });
  const myString2 = ab.toString();

  const voice = () => {
    setv_data(selected);
    setModalVisible7(true);
  };

  const voice_remove_data = (i) => {
    let filteredArray = v_data.filter((item) => item.id !== i);
    setv_data(filteredArray);
    handleChange(i);

    setModalVisible8(false);
  };

  const voice_remove_data2 = (i) => {
    let filteredArray = v_data.filter((item) => item.id !== i);
    setv_data(filteredArray);
    handleChange(i);

    setModalVisible8(false);
    setModalVisible7(false);
    setd(false);
  };
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
    setdemo(!demo)
    setd(!d);
    setDATA(temp);
  };

  const selectAlldata2 = () => {
    let temp = DATA.map((i) => {
      if (t == true) {
        return { ...i, isChecked: true };
      }
    });

    setDATA(temp);
    sett2(!t2);
  };

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

  const handleChange2 = (id) => {
    let temp = DATA.map((i) => {
      if (id === i.id) {
        return { ...i, isChecked: (i.isChecked = !i.isChecked) };
      }

      return i;
    });

    setd(!d);
    setDATA(temp);
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading2 ? <Loader loading={loading2} /> : null}
      </View>
    );
  };

  const onsearch2 = (text) => {
    if (text == "") {
      setDATA2(DATA2_c);
      setblank_tag2("yes");
    } else {
      let temp = selected_data2.filter((item) => {
        return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });

      setDATA2(temp);
      if (DATA2 == "") {
        setblank_tag2("no");
      } else {
        setblank_tag2("yes");
      }
    }
  };

  const onsearch = (text) => {
    if (text == "") {
      setDATA1(DATA1_c);
      setblank_tag("yes");
    } else {
      let temp = selected_data.filter((item) => {
        return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });

      setDATA1(temp);
      if (DATA1 == "") {
        setblank_tag("no");
      } else {
        setblank_tag("yes");
      }
    }
  };

  const handleChange_tag = (value) => {
    let temp = DATA1.map((product) => {
      if (value === product.value) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setDATA1(temp);
  };

  const handleChange1_tag = (value) => {
    let temp = DATA2.map((product) => {
      if (value === product.value) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setDATA2(temp);
  };

  let selected2 = DATA1.filter((product) => product.isChecked);
  let selected1 = DATA2.filter((product) => product.isChecked);
  selected2.push(...selected1);
  // console.log(selected2)

  var a = selected2.map((i) => {
    return i.value;
  });
  const myString = a.toString();

  const Add_tag = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        lead_id: myString2,

        tag_id: myString,
      };

      add_tag(data).then((response) => {
        response.json().then((data) => {
          console.log(data);

          // Alert.alert(data.msg);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setOffset(0);
      setLoading2(true);
      getData();
    });

    return () => {
      // executed when unmount
      unsubscribe();
    };
  }, [navigation]);

  const ItemView = ({ item, index }) => {
    return (
      // Flat List Item
      <View>
        <View style={styles.flat_view}>
          {d == true ? (
            <Pressable
              style={{ marginStart: "6%" }}
              onPress={() => {
                demo?handleChange(item.id):
                (handleChange(item.id),press(item))
              }}
            >
              {item.isChecked ? (
                <AntDesign name="checkcircle" size={23} color={"#4775d1"} />
              ) : (
                <FontAwesome name="circle-thin" size={23} color="#cccccc" />
              )}
            </Pressable>
          ) : null}
          <TouchableHighlight
            style={{ paddingVertical: "3%" }}
            underlayColor={"#d9d9d9"}
            onLongPress={() => {
              handleChange2(item.id), sett(!t);
            }}
            onPress={() => {
              d
                ? (handleChange(item.id), press(item))
                : navigation.navigate(ScreenNames.DETAIL, {
                    user: {
                      name: item.name,
                      id: item.id,
                      logo: item.name_initials,
                    },
                    index: index,
                    DATA: DATA,
                  });
            }}
          >
            <View
              activeOpacity={1}
              style={[styles.touch,{
                  width: d == true ? width * 0.8 : width * 0.93,
              }]}
            >
              {}
              <View style={styles.set}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate(ScreenNames.DETAIL, {
                      user: {
                        name: item?.name,
                        id: item?.id,
                        logo: item?.name_initials,
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
                      {item?.name_initials}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text
                  onPress={() => {
                    navigation.navigate(ScreenNames.DETAIL, {
                      user: {
                        name: item?.name,
                        id: item?.id,
                        logo: item?.name_initials,
                      },
                      index: index,
                      DATA: DATA,
                    });
                    // AsyncStorage.setItem("user_id", item.id);
                  }}
                  style={styles.name}
                >
                  {item?.name}
                </Text>

                <TouchableOpacity
                  style={styles.note_box}
                  activeOpacity={1}
                  onPress={() => {
                    item?.pined_note == "Yes" ? setd1(3) : setd1(0);
                    setModalVisible(true),
                      setModalTitle2(item?.pinned_by),
                      setModalTitle(item?.id),
                      setnote(item?.pined_note_text),
                      setpin_date(item?.pinned_date),
                      setpin_note(item?.pined_note);
                  }}
                >
                  {item?.pined_note == "Yes" ? (
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

              {item?.phone ? (
                <>
                  <View style={styles.line2}></View>
                  <View style={styles.set}>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`tel:${item?.phone}`);
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
                        Linking.openURL(`tel:${item?.phone}`);
                      }}
                      style={styles.number}
                    >
                      {item?.phone}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`sms:${item?.phone}`);
                      }}
                    >
                      <Image style={styles.sms} source={Images.sms}></Image>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}

              {item?.email ? (
                <>
                  <View style={styles.line2}></View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      Linking.openURL(`mailto:${item?.email}`);
                    }}
                    style={styles.set}
                  >
                    <View style={styles.email_icon}>
                      <Image
                        style={styles.mail_icon}
                        source={Images.mail_icon}
                      ></Image>
                    </View>
                    <Text style={styles.email}>{item?.email}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.line3}></View>
              )}

              <View style={styles.line2}></View>
              <TouchableOpacity
                activeOpacity={1}
                // onPress={() => setModalVisible2(!modalVisible2)}
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
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.line}></View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.line}></View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading2 ? (
        <Loader loading={loading2} />
      ) : (
        <View>
          {t ? (
            <View style={styles.select}>
              <TouchableOpacity
                // style={{ alignItems: "center" }}
                onPress={() => {
                  t2 ? selectAlldata2() : UnselectAlldata();
                  // selectAlldata2()
                }}
              >
                <Text style={styles.select_txt}>Select All</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                styles.select,
                { backgroundColor: d == true ? "orange" : null },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  selectAlldata();
                }}
              >
                <Text
                  style={[
                    styles.select_txt2,
                    {
                      color: d == true ? "white" : "#999999",
                    },
                  ]}
                >
                  Select All
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {loading3 ? (
            <Loader loading={loading3} />
          ) : (
            <FlatList
              style={styles.flat}
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              ListFooterComponent={renderFooter}
              onEndReached={getData}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
      )}
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
                    onPress={() => (setModalVisible(!modalVisible), setd1(0))}
                  >
                    <Entypo name="cross" size={30} color="black" />
                  </Pressable>
                </View>
                <View style={styles.line2}></View>

                <KeyboardAvoidingView enabled>
                  <View style={styles.input}>
                    <TextInput
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

                <Text style={styles.no_note}>No note added yet.</Text>
                <TouchableOpacity
                  onPress={() => {
                    setd1(1);
                  }}
                  style={styles.add_note}
                >
                  <Text style={styles.add_note_txt}>Add Note</Text>
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
                      // call_api(),
                      getData(),
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
                <Pressable onPress={() => setModalVisible2(!modalVisible2)}>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          style={[
            styles.ball,
            {
              transform: [{ translateY: translation }],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.NEW_LEADS)}

            // style={styles.floating_btn}
          >
            <Image source={Images.addLeads} style={styles.ball_img} />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible_tags}
          onRequestClose={() => {
            setModalVisible_tags(!modalVisible_tags);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(52, 52, 52, 0.9)",
            }}
          >
            <View style={styles.modal_tag_view}>
              <View
                style={{
                  flexDirection: "row",

                  margin: "4%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image style={styles.pencil} source={{}} />
                <Text style={styles.modal_tagText2}>Add Tags To Leads</Text>

                <Pressable
                  style={{}}
                  onPress={() => {
                    setModalVisible_tags(!modalVisible_tags),
                      setsearch(""),
                      setd(false),
                      AsyncStorage.setItem("op", "1");
                    navigation.push(ScreenNames.DRAWER);
                  }}
                >
                  <Image style={styles.pencil} source={Images.close_icon} />
                </Pressable>
              </View>
              <View style={styles.line}></View>
              <KeyboardAvoidingView enabled>
                <View style={styles.tag_input2}>
                  <TextInput
                    ref={searchref}
                    onChangeText={(text) => {
                      onsearch(text), onsearch2(text), setsearch(text);
                    }}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Tags"
                    placeholderTextColor={"#cccccc"}
                    style={{ padding: "2%", fontSize: wp("5.13%") }}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.line}></View>
              <ScrollView>
                {blank_tag == "yes" ? (
                  <>
                    <Text
                      style={{
                        fontSize: wp("6.13%"),
                        marginTop: "3%",
                        fontFamily: "Inter-Black",
                        marginStart: "3%",
                      }}
                    >
                      User Tags
                    </Text>
                    <FlatList
                      style={{}}
                      data={DATA1}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            paddingHorizontal: "6%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "3%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "normal",
                            }}
                          >
                            {item.label}
                          </Text>
                          <Pressable
                            onPress={() => handleChange_tag(item.value)}
                          >
                            {item.isChecked ? (
                              <Image
                                style={{
                                  height: hp("4%"),
                                  width: wp("6%"),
                                  resizeMode: "contain",
                                }}
                                source={Images.Task_Complete}
                              ></Image>
                            ) : (
                              <Image
                                style={{
                                  height: hp("4%"),
                                  width: wp("6%"),
                                  resizeMode: "contain",
                                }}
                                source={Images.Task_circle}
                              ></Image>
                            )}
                          </Pressable>
                        </View>
                      )}
                    />
                  </>
                ) : null}

                <Text style={styles.title_txt2}>
                  {blank_tag2 == "yes" ? "System Tags" : ""}
                </Text>
                <FlatList
                  style={{}}
                  data={DATA2}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        paddingHorizontal: "6%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "3%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "normal",
                        }}
                      >
                        {item.label}
                      </Text>
                      <Pressable onPress={() => handleChange1_tag(item.value)}>
                        {item.isChecked ? (
                          <Image
                            style={{
                              height: hp("4%"),
                              width: wp("6%"),
                              resizeMode: "contain",
                            }}
                            source={Images.Task_Complete}
                          ></Image>
                        ) : (
                          <Image
                            style={{
                              height: hp("4%"),
                              width: wp("6%"),
                              resizeMode: "contain",
                            }}
                            source={Images.Task_circle}
                          ></Image>
                        )}
                      </Pressable>
                    </View>
                  )}
                />
              </ScrollView>
              <View style={styles.line}></View>

              {myString.length == 0 ? (
                <TouchableOpacity
                  style={styles.save_lead_tag}
                  //  onPress={() => {setModalVisible1(!modalVisible1),setsearch(""),Add_tag()}}
                  activeOpacity={1}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Inter-Black2",
                      fontSize: wp("4.13%"),
                    }}
                  >
                    Save Lead To Tag
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.save_lead_tag}
                  onPress={() => {
                    setModalVisible_tags(!modalVisible_tags),
                      setsearch(""),
                      Add_tag(),
                      setModalVisible6(true);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Inter-Black2",
                      fontSize: wp("4.13%"),
                    }}
                  >
                    Save Lead To Tag
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible6}
        onRequestClose={() => {
          setModalVisible6(!modalVisible6);
        }}
      >
        <View style={styles.centeredView_box}>
          <View style={styles.modalView_box}>
            <Text style={styles.textStyle1_box}>Lead Booker</Text>
            <Text style={styles.textStyle2_box}>
              Tag has been added successfully.
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#cccccc",

                width: "100%",
              }}
            ></View>
            <Pressable
              style={{}}
              onPress={() => {
                setModalVisible6(!modalVisible6),
                  setd(false),
                  AsyncStorage.setItem("op", "1");
                navigation.push(ScreenNames.DRAWER);
              }}
            >
              <Text style={styles.textStyle3_box}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalVisible7}
        onRequestClose={() => {
          setModalVisible7(!modalVisible7);
        }}
      >
        <View style={styles.centeredView_box}>
          <View style={styles.modalView_box2}>
            <FlatList
              style={styles.flat2}
              data={v_data}
              extraData={v_data}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View>
                  <View style={styles.flat_view}>
                    <TouchableHighlight
                      style={{ paddingVertical: "3%" }}
                      underlayColor={"#d9d9d9"}
                      // onLongPress={() => {
                      //   handleChange2(item.id), sett(!t),settag_id(item.id)
                      // }}
                    >
                      <View
                        activeOpacity={1}
                        style={{
                          backgroundColor: "white",

                          width: width * 0.93,

                          elevation: 5,
                          alignSelf: "center",
                          justifyContent: "center",
                          borderRadius: 5,
                          shadowColor: "white",
                        }}
                      >
                        {}
                        <View style={styles.set}>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {}}
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
                              // AsyncStorage.setItem("user_id", item.id);
                            }}
                            style={styles.name}
                          >
                            {item?.name}
                          </Text>

                          <TouchableOpacity
                            style={{
                              marginTop: "-10%",
                            }}
                            activeOpacity={1}
                            onPress={() => {
                              setModalVisible8(true), setv_id(item.id);
                            }}
                          >
                            <Image
                              style={styles.cancel}
                              source={Images.cancel}
                            ></Image>
                          </TouchableOpacity>
                        </View>

                        {item.phone ? (
                          <>
                            <View style={styles.line2}></View>
                            <View style={styles.set}>
                              <TouchableOpacity
                                onPress={() => {}}
                                style={styles.phone_icon}
                              >
                                <Image
                                  style={styles.call}
                                  source={Images.call_icon}
                                ></Image>
                              </TouchableOpacity>
                              <Text onPress={() => {}} style={styles.number}>
                                {item?.phone}
                              </Text>

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
                                  item.pined_note == "Yes"
                                    ? setd1(3)
                                    : setd1(0);
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
                          </>
                        ) : null}

                        {item.email ? (
                          <>
                            <View style={styles.line2}></View>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => {}}
                              style={styles.set}
                            >
                              <View style={styles.email_icon}>
                                <Image
                                  style={styles.mail_icon}
                                  source={Images.mail_icon}
                                ></Image>
                              </View>
                              <Text style={styles.email}>{item?.email}</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <View style={styles.line3}></View>
                        )}

                        <View style={styles.line2}></View>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            // setname(item?.name),
                            //   setemail(item?.email),
                            //   setno(item?.phone),
                            //   setname_ini(item?.name_initials),
                            //   setModalVisible2(!modalVisible2);
                          }}
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
            <View
              style={{
                backgroundColor: Colors.MAIN_COLOR,
                alignItems: "center",
                justifyContent: "space-between",
                height: "15%",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={{}}
                onPress={() => {
                  Linking.openURL(`tel:${v_data[0].phone}`);
                }}
              >
                <Text style={styles.textStyle3_box}>Start Dialing</Text>
              </Pressable>
              <Pressable
                style={{}}
                onPress={() => {
                  // setModalVisible7(!modalVisible7);
                }}
              >
                <Text style={styles.textStyle3_box}>Pause Queue</Text>
              </Pressable>

              <Pressable
                style={{}}
                onPress={() => {
                  setModalVisible7(!modalVisible7);
                }}
              >
                <Text style={styles.textStyle3_box}>Cancel Queue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalVisible8}
        onRequestClose={() => {
          setModalVisible8(!modalVisible8);
        }}
      >
        <View style={styles.centeredView_box}>
          <View style={styles.modalView_box}>
            <Text style={styles.textStyle1_box}>Lead Booker</Text>
            <Text style={styles.textStyle2_box}>
              Are you sure? You want to remove this lead from queue?
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#cccccc",

                width: "100%",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {v_data.length == 1 ? (
                <Pressable
                  onPress={() => {
                    voice_remove_data2(v_id);
                  }}
                >
                  <Text style={styles.textStyle4_box}>Yes</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    voice_remove_data(v_id);
                  }}
                >
                  <Text style={styles.textStyle4_box}>Yes</Text>
                </Pressable>
              )}

              <View style={styles.mid_line}></View>
              <Pressable
                onPress={() => {
                  setModalVisible8(!modalVisible8);
                }}
              >
                <Text style={styles.textStyle4_box}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.tag_box}>
        {d == true ? (
          <View style={styles.tag_view}>
            <View style={styles.btn1}>
              <TouchableOpacity
                onPress={() => {
                  voice();
                }}
                style={styles.tag_touch}
              >
                <Text style={styles.tag}>Voice Call</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btn2}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible_tags(true);
                }}
                style={styles.tag_touch}
              >
                <Text style={styles.tag}>Add Tags</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  note_box:{
    marginTop: "2%",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.95,
    shadowRadius: 2.84,
    elevation: 5,
  },
  touch:{ backgroundColor: "white",

             

  elevation: 5,
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 5,
  shadowColor: "white",},
  select: {
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
  },
  select_txt: {
    color: "#999999",
    fontSize: wp("5.41%"),

    fontFamily: "Inter-Black",
  },
  select_txt2: { fontSize: wp("5.41%"), fontFamily: "Inter-Black" },
  update_txt: {
    color: "white",
    fontSize: wp("6%"),
    fontFamily: "Inter-Black4",
  },
  voice_modal_txt: {
    fontSize: wp("7.5%"),

    fontFamily: "Inter-Black",
    color: Colors.MAIN_icon,
    marginStart: "25%",
  },
  note3: {
    color: "black",
    margin: "4%",
    fontSize: 14,
    fontFamily: "Inter-Black4",
  },
  no_note: {
    color: "black",
    marginLeft: "4%",
    marginTop: "12%",
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
    backgroundColor: "#f2f2f2",
    // paddingVertical: "3%",
  },
  pin2: {
    flexDirection: "row",

    margin: "4%",
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  voice_box: {
    flexDirection: "row",

    margin: "4%",

    justifyContent: "space-between",
    alignItems: "center",
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
  modal_btn_txt2: {
    color: "white",
    fontSize: wp("5.5%"),
    fontFamily: "Inter-Black",
  },
  modal_btn_txt_voicemail1: {
    color: "white",
    fontSize: wp("5.5%"),
    fontFamily: "Inter-Black",
    width: width * 0.3,
    textAlign: "center",
  },
  modal_btn_txt_voicemail2: {
    color: "white",
    fontSize: wp("5.5%"),
    fontFamily: "Inter-Black",
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
  modal_btn2: {
    height: height * 0.08,
    width: "85%",
    backgroundColor: "#d8524f",
    alignSelf: "center",

    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  modal_btn_voicemail: {
    height: height * 0.08,
    width: "50%",
    backgroundColor: "green",
    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#b3b3b3",
  },
  modal_btn_voicemail2: {
    height: height * 0.08,
    width: "50%",
    backgroundColor: Colors.MAIN_icon,
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
  add_note_txt: {
    color: "white",
    fontSize: wp("6%"),
    fontFamily: "Inter-Black4",
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
    height: hp("5%"),
    width: wp("9.38%"),

    resizeMode: "contain",
  },
  cancel: {
    height: hp("5%"),
    width: wp("7.38%"),

    resizeMode: "contain",
  },
  tag_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tag_touch: { alignItems: "center" },
  tag: { color: "white", fontSize: wp("4.71%"), fontFamily: "Inter-Black2" },
  flat: { marginBottom: "10%" },
  flat2: {},
  input: {
    height: height * 0.25,
    margin: 12,

    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  ball: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",

    right: "6%",

    backgroundColor: Colors.float_btn,

    bottom: height * 0.28,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    elevation: 5,
  },
  ball_img:{
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    resizeMode: "contain",
  },
  input2: {
    height: height * 0.17,

    padding: 10,

    borderRadius: 8,
    borderWidth: 0.5,
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
  modalView3: {
    height: height * 0.44,
    width: "77%",
    backgroundColor: "#fcf5bf",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",
    marginTop: height * -0.17,
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
    height: height * 0.85,
    width: "90%",
    backgroundColor: "white",
    // borderRadius: 10,

    elevation: 20,
    alignSelf: "center",
    marginTop: height * 0.09,
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
  mid_line: {
    height: height * 0.07,
    backgroundColor: "#cccccc",

    width: "0.5%",
  },
  voice: {
    height: hp("4%"),
    width: wp("7.38%"),
    resizeMode: "contain",
  },
  close_icon: {
    height: hp("3.5%"),
    width: wp("7.38%"),
    resizeMode: "contain",
  },
  mail_icon: { height: hp("3%"), width: wp("6.38%"), resizeMode: "contain" },
  mail_icon_v: { height: hp("4%"), width: wp("6.38%"), resizeMode: "contain" },
  voice_icon: { flex: 0.14, marginStart: "8%" },
  email_icon: { flex: 0.14, marginStart: "8%" },
  icon: {},
  icon1: { marginTop: "5%" },
  name: {
    fontSize: wp("6.31%"),

    color: "#666666",

    flex: 0.97,
    fontFamily: "Inter-Black",
    opacity: 1,
  },
  name2: {
    fontSize: wp("5.51%"),

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
    fontSize: wp("4.21%"),
    // flex: 0.9,

    fontFamily: "Inter-Black4",
    color: "#808080",
    // fontFamily: "Inter-Black2",
  },
  modal_box: {
    width: "85%",
    height: "10%",
    borderColor: "black",
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    alignItems: "center",
  },
  modal_header: {
    fontSize: wp("4.8%"),
    // flex: 0.9,

    fontFamily: "Inter-Black2",
    color: "black",
    marginStart: "4.5%",
    marginBottom: "3%",
  },
  modal_header2: {
    fontSize: wp("4.8%"),
    // flex: 0.9,

    fontFamily: "Inter-Black2",
    color: "black",
    marginStart: "4.5%",
    marginVertical: "3%",
  },
  modal_header3: {
    fontSize: wp("4.5%"),
    // flex: 0.9,

    fontFamily: "Inter-Black2",
    color: "blue",
    marginStart: "5.5%",
    marginVertical: "3%",
  },
  modal_header4: {
    fontSize: wp("4.8%"),
    // flex: 0.9,

    fontFamily: "Inter-Black4",
    color: "black",
    marginStart: "4.5%",
    marginVertical: "3%",
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
    width: Dimensions.get("window").width * 0.22,
    height: Dimensions.get("window").width * 0.22,
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

    width: "90%",
    marginVertical: "3%",
    alignSelf: "center",
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
  dropdown1BtnStyle: {
    width: "90%",
    backgroundColor: "transparent",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  dropdown1BtnTxtStyle: {
    fontSize: wp("4.5%"),
    color: "blue",
    fontFamily: "Inter-Black4",
    textAlign: "left",
    marginStart: "-1%",
  },
  dropdown1DropdownStyle: {
    backgroundColor: "red",

    height: height * 0.25,
    borderRadius: 6,
    width: "77%",
    marginStart: "1.5%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    overflow: "visible",
  },
  dropdown1RowStyle: { borderBottomColor: "#C5C5C5" },
  dropdown1RowTxtStyle: {
    color: "black",
    textAlign: "center",
    fontSize: wp("4%"),
  },

  container: { backgroundColor: "#e6e6e6", flex: 1 },
  modal_tag_view: {
    height: height * 0.83,
    width: "93%",
    backgroundColor: "white",
    borderRadius: 6,

    elevation: 20,
    alignSelf: "center",

    marginTop: "15%",
  },
  modal_tagText3: {
    fontSize: 18,

    color: "#666666",
    fontFamily: "Inter-Black",
  },
  modal_tagText2: {
    fontSize: wp("5.83%"),

    color: Colors.blue_txt,
    fontFamily: "Inter-Black4",
    marginEnd: "5%",
  },
  tag_input2: {
    margin: "2%",

    borderWidth: 1,
    borderRadius: 20,
  },
  pencil: {
    height: height * 0.028,
    width: width * 0.12,
    resizeMode: "contain",
    marginStart: "8%",
  },
  save_lead_tag: {
    height: height * 0.06,

    backgroundColor: Colors.float_btn,
    alignSelf: "center",
    marginTop: "1%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
    padding: 3,
    width: "50%",
  },
  title_txt2: {
    fontSize: wp("6.13%"),
    marginTop: "3%",
    fontFamily: "Inter-Black",
    marginStart: "3%",
  },
  centeredView_box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modalView_box: {
    width: "85%",
    backgroundColor: "#ececee",
    borderRadius: 20,

    elevation: 5,
    alignSelf: "center",

    // elevation: 20,
  },
  modalView_box3: {
    width: "85%",
    backgroundColor: "#ececee",

    elevation: 5,
    alignSelf: "center",
    padding: "5%",

    // elevation: 20,
  },
  modalView_box2: {
    width: "100%",
    backgroundColor: "#ececee",
    borderRadius: 4,

    elevation: 5,

    height: "100%",
    // elevation: 20,
  },
  textStyle1_box2: {
    fontSize: wp("5.41%"),
    fontFamily: "Inter-Black",
    marginVertical: "4%",
    marginStart: "5%",
  },

  textStyle1_box: {
    fontSize: wp("5.41%"),
    fontFamily: "Inter-Black2",
    marginTop: "7%",
    textAlign: "center",
  },
  textStyle2_box: {
    fontSize: wp("4%"),
    textAlign: "center",
    width: "100%",
    marginBottom: "7%",
    marginTop: "1%",
    color: "#262626",
  },
  textStyle3_box: {
    fontSize: wp("4.31%"),
    color: "white",
    fontFamily: "Inter-Black2",
    backgroundColor: "red",
    paddingVertical: "5%",
    paddingHorizontal: "2%",
    borderRadius: 25,
  },
  textStyle4_box: {
    fontSize: wp("4.91%"),
    color: "blue",
    fontFamily: "Inter-Black",
  },
  textStyle5_box: {
    fontSize: wp("4.41%"),
    color: "black",
    fontFamily: "Inter-Black",
    marginTop: "15%",
  },
});

export default All;
