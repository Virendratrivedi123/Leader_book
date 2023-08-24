import React, { useState, useEffect, useRef } from "react";
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
  SafeAreaView,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Image,
  SectionList,
  Alert,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import {
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Zocial,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  Pin_note,
  View_lead_activity,
  add_tag,
  get_leads,
  get_leads_basic_detail,
  remove_tag,
} from "../../Services";
import Loader from "../../constant/Loader";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";
import { Images } from "../../constant/images";

function Basic_detail({ data }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../../assets/fonts/Mulish-Regular.ttf"),
  });
  const User_data = data;
  const navigation = useNavigation();
  const searchref = useRef();
  const [search, setsearch] = useState("");
  const [DATA, setDATA] = useState([]);
  const [DATA1, setDATA1] = useState([]);
  const [DATA2, setDATA2] = useState([]);
  const [DATA1_c, setDATA1_c] = useState([]);
  const [DATA2_c, setDATA2_c] = useState([]);
  const [tag, settag] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [note, setnote] = useState(data?.pined_note_text);
  const [n, setn] = useState("");
  const [pin_date, setpin_date] = useState("");

  const [modalTitle2, setModalTitle2] = useState(data?.pinned_by);
  const [tag_id, settag_id] = React.useState("");
  const [tag_id2, settag_id2] = React.useState(0);
  const [d, setd] = useState(icon_note == "Yes" ? 3 : 0);
  const [lead_activity_msg, setlead_activity_msg] = useState("");
  const [blank_tag, setblank_tag] = useState("yes");
  const [blank_tag2, setblank_tag2] = useState("yes");
  const [selected_data, setselected_data] = useState([]);
  const [selected_data2, setselected_data2] = useState([]);

  useEffect(() => {
    (async () => {
      // user_data.pined_note == "Yes" ? setd(3) : setd(0);
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      const data = {
        email: d.email,
        password: d.password,
        id: User_data.id,
      };
      get_leads_basic_detail(data)
        .then((response) => response.json())
        .then((result) => {
          setModalTitle2(result?.data?.lead_detail?.Lead.pinned_by?.value);
          setnote(result?.data?.lead_detail.Lead?.pinned_note_text?.value);
          seticon_note(result?.data?.lead_detail?.Lead.pined_note);
          setpin_date(result?.data?.lead_detail?.Lead.pinned_date?.value);
          setd(result?.data?.lead_detail?.Lead.pined_note == "Yes" ? 3 : 0);
          var k = [];

          k.push(result?.data?.lead_detail);
          var t = result?.data?.lead_detail?.Lead?.lead_tags;
          var a = result?.data?.tags?.user_tags;
          var b = result?.data?.tags?.system_tags;

          var a = [];
          result?.data?.tags?.user_tags.map((i) => {
            a.push({
              ...i,

              isChecked: false,
            });
          });
          var b = [];
          result?.data?.tags?.system_tags.map((i) => {
            b.push({
              ...i,

              isChecked: false,
            });
          });

          setDATA(k);
          setDATA1(a);
          setDATA2(b);
          setDATA1_c(a);
          setDATA2_c(b);
          setselected_data(a);
          setselected_data2(b);
          setLoading(false);
          settag(t);
          var g = tag.map((i) => {
            return i.label.length;
          });

          let sum = 0;

          for (let num of g) {
            sum = sum + num;
          }
          settag_id2(sum);
          // setLoading(false);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);
  const [icon_note, seticon_note] = useState("");

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        pin_text: note,
        id: User_data.id,
        password: d.password,
      };
      Pin_note(data).then((response) => {
        response.json().then((data) => {
          // console.log(data);

          call_api(), note.length > 0 ? setd(3) : setd(0);
          setModalTitle2(result?.data?.lead_detail?.Lead.pinned_by?.value);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(User_data.id)
  const call_api = async () => {
    try {
      setLoading(true);
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      const data = {
        email: d.email,
        password: d.password,
        id: User_data.id,
      };
      get_leads_basic_detail(data)
        .then((response) => response.json())
        .then((result) => {
          var k = [];

          k.push(result?.data?.lead_detail);
          var t = result?.data?.lead_detail?.Lead?.lead_tags;
          var a = result?.data?.tags?.user_tags;
          var b = result?.data?.tags?.system_tags;
          setnote(result?.data?.lead_detail?.Lead?.pinned_note_text?.value);
          seticon_note(result?.data?.lead_detail?.Lead.pined_note);
          setpin_date(result?.data?.lead_detail?.Lead.pinned_date?.value);
          var a = [];
          result?.data?.tags?.user_tags.map((i) => {
            a.push({
              ...i,

              isChecked: false,
            });
          });
          var b = [];
          result?.data?.tags?.system_tags.map((i) => {
            b.push({
              ...i,

              isChecked: false,
            });
          });

          setDATA(k);
          setDATA1(a);
          setDATA2(b);
          setDATA1_c(a);
          setDATA2_c(b);
          setselected_data(a);
          setselected_data2(b);
          setLoading(false);
          settag(t);
          var g = tag.map((i) => {
            return i.label.length;
          });

          let sum = 0;

          for (let num of g) {
            sum = sum + num;
          }
          settag_id2(sum);
          // setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value) => {
    let temp = DATA1.map((product) => {
      if (value === product.value) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setDATA1(temp);
  };

  const handleChange1 = (value) => {
    let temp = DATA2.map((product) => {
      if (value === product.value) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setDATA2(temp);
  };

  let selected = DATA1.filter((product) => product.isChecked);
  let selected1 = DATA2.filter((product) => product.isChecked);
  selected.push(...selected1);

  var a = selected.map((i) => {
    return i.value;
  });
  const myString = a.toString();
  // console.log(myString);
  // a.map((i)=>{
  //   return(settag_id2(i))
  // })

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d?.email,
        password: d?.password,
        id: User_data?.id,
      };
      View_lead_activity(data)
        .then((response) => response.json())
        .then((result) => {
          setlead_activity_msg(result.message);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  //  const onsearch = (text) => {

  //   let selected_data = DATA1
  //     selected_data.push(...DATA2)

  //   if (text == "") {
  //    setDATA1(DATA1_c)
  //    setDATA2(DATA2_c)
  //    setblank_tag("1")
  //   } else {
  //     let temp = selected_data.filter((item) => {
  //       return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
  //     });
  // setblank(temp.map((i)=>{
  //     return(i.label)
  //   }))

  //     setDATA1(temp)
  //     setblank_tag("")
  //     setDATA2([])
  //     // setDATA2(temp);
  //   }
  // };

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

      // setDATA2(temp);
    }
  };

  const onsearch = (text) => {
    if (text == "") {
      setDATA1(DATA1_c);
      setblank_tag("yes");
      //  setDATA2(DATA2_c)
      //  setblank_tag("1")
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
      // setDATA2(temp);
    }
  };

  const Remove_tag = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        lead_id: User_data?.id,

        tag_id: tag_id,
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
      remove_tag(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          call_api();
          // Alert.alert(data.msg);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Add_tag = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        lead_id: User_data?.id,

        tag_id: myString,
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
      add_tag(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          call_api();
          // Alert.alert(data.msg);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(tag_id2);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : DATA && DATA.length > 0 ? (
        <>
          <FlatList
            data={DATA}
            style={{ marginBottom: "12%" }}
            // keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <>
                <View style={styles.pad}>
                  <Text style={styles.number}>
                    {item.Lead.email.label}
                    {/* {icon_note}{d} */}
                  </Text>

                  <View style={styles.row}>
                    <Text style={styles.name}>
                      {item.Lead.email.value}
                      {/* {pin_date} */}
                    </Text>
                    <Text
                      onPress={() => {
                        Linking.openURL(`mailto:${item.Lead.email.value}`);
                      }}
                    >
                      <Zocial name="email" size={22} color={Colors.MAIN_icon} />
                    </Text>
                  </View>
                </View>
                <View style={styles.line}></View>
                <View
                  style={{
                    paddingRight: "2%",
                    flexDirection: "row",
                    paddingVertical: "2%",
                    paddingLeft: "5%",
                  }}
                >
                  <View style={{ flex: 1.4 }}>
                    <Text style={styles.number}>{item.Lead.phone.label}</Text>
                    <Text style={styles.name}>{item.Lead.phone.value}</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: "3%" }}>
                    <Entypo
                      style={{}}
                      name="voicemail"
                      size={28}
                      color={Colors.MAIN_icon}
                    />
                    <Text
                      style={{ marginLeft: 10 }}
                      onPress={() => {
                        Linking.openURL(`tel:${item.Lead.phone.value}`);
                      }}
                    >
                      <FontAwesome5
                        name="phone-alt"
                        size={25}
                        color={Colors.MAIN_icon}
                      />
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`sms:${item.Lead.phone}`);
                      }}
                    >
                      <Image
                        style={{
                          height: height * 0.032,
                          width: width * 0.13,
                          resizeMode: "contain",
                        }}
                        source={Images.sms}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>{item.Lead.comments.label}</Text>
                  <Text style={styles.name}>
                    {item.Lead.comments.value
                      ? item.Lead.comments.value
                      : "No Comment"}
                  </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>{item.Lead.user_id.label}</Text>
                  <Text style={styles.name}>{item.Lead.user_id.value}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>
                    {item.Lead.lead_type_id.label}
                  </Text>
                  <Text style={styles.name}>
                    {item.Lead.lead_type_id.value}
                  </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>{item.Lead.site_id.label}</Text>
                  <Text style={styles.name}>{item.Lead.site_id.value}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>
                    {item.Lead.is_grl_crea_lead.label}
                  </Text>
                  <Text style={styles.name}>
                    {item.Lead.is_grl_crea_lead.value}
                  </Text>
                </View>
                <View style={styles.line}></View>

                <View style={styles.pad}>
                  <Text style={styles.number}>{item.Lead.month.label}</Text>
                  <Text style={styles.name}>{item.Lead.month.value}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <View style={styles.row}>
                    <Text style={styles.number}>Lead Tags</Text>

                    <TouchableOpacity
                      onPress={() => setModalVisible1(true)}
                      style={{ flexDirection: "row" }}
                    >
                      <AntDesign
                        name="plus"
                        size={17}
                        color={Colors.MAIN_icon}
                      />
                      <FontAwesome
                        name="tags"
                        size={20}
                        color={Colors.MAIN_icon}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* <FlatList
                  style={{ marginTop: "2%", }}
                  data={item.Lead.lead_tags}
                  
                  numColumns={tag_id2}
                  keyExtractor={(item) => "#" + item.id}
                  renderItem={({ item, index }) => (
                    <View style={styles.box}>
                      <Text style={styles.tag}>{item.label}</Text>
                      <TouchableOpacity
                      onPress={() => {setModalVisible4(true),settag_id(item.value)}}
                      >
                      <Image
                        style={{
                          height: hp("4.2%"),
                          width: wp("4.2%"),
                          resizeMode: "contain",
                          marginStart: 5,
                        }}
                        source={Images.close_white}
                      ></Image>
                      </TouchableOpacity>
                      
                    </View>
                  )}
                /> */}
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {item.Lead.lead_tags.map((i) => {
                      return (
                        <View style={styles.box}>
                          <Text style={styles.tag}>{i.label}</Text>
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible4(true), settag_id(i.value);
                            }}
                          >
                            <Image
                              style={{
                                height: hp("4.2%"),
                                width: wp("4.2%"),
                                resizeMode: "contain",
                                marginStart: 5,
                              }}
                              source={Images.close_white}
                            ></Image>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>
                    {item.Lead.new_grouped_date.label}
                  </Text>
                  <Text style={styles.name}>
                    {item.Lead.new_grouped_date.value}
                  </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>
                    {item.Lead.company_name.label}
                  </Text>
                  <Text style={styles.name}>
                    {item.Lead.company_name.value
                      ? item.Lead.company_name.value
                      : "No Company"}
                  </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>{item.Lead.address.label}</Text>
                  <Text style={styles.name}>
                    {item.Lead.address.value
                      ? item.Lead.address.value
                      : "No Address"}
                  </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>{item.Lead.city.label}</Text>
                  <Text style={styles.name}>
                    {item.Lead.city.value ? item.Lead.city.value : "No City"}
                  </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.pad}>
                  <Text style={styles.number}>State/Province</Text>
                  <Text style={styles.name}>
                    {item.Lead.state.value ? item.Lead.state.value : "No State"}
                  </Text>
                </View>
                <View style={styles.line}></View>
              </>
            )}
          />
          <View style={styles.centeredView}>
            {d == 1 ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modal_page}>
                  <View style={styles.modalView1}>
                    <View style={styles.pin2}>
                      <Text style={styles.modalText1}>Pin Note</Text>
                      <Pressable
                        onPress={() => (
                          setModalVisible(!modalVisible), setd(0)
                        )}
                      >
                        <Entypo name="cross" size={30} color="black" />
                      </Pressable>
                    </View>
                    <View style={styles.line}></View>

                    <KeyboardAvoidingView enabled>
                      <View style={styles.input}>
                        <TextInput
                          style={{
                            padding: 10,
                            textAlignVertical: "top",
                            height: "100%",
                          }}
                          //  value={""}
                          onChangeText={(txt) => (setnote(txt), setn(txt))}
                        />
                      </View>
                    </KeyboardAvoidingView>
                    <View style={styles.modal_btn_box}>
                      {n.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            postdata(), setModalVisible(!modalVisible);
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
                            setd(0);
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
            ) : d == 4 ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modal_page}>
                  <View style={styles.modalView1}>
                    <View style={styles.pin2}>
                      <Text style={styles.modalText1}>Pin Note</Text>
                      <Pressable onPress={() => setd(3)}>
                        <Entypo name="cross" size={30} color="black" />
                      </Pressable>
                    </View>
                    <View style={styles.line}></View>

                    <KeyboardAvoidingView enabled>
                      <View style={styles.input}>
                        <TextInput
                          style={{
                            padding: 10,
                            textAlignVertical: "top",
                            height: "100%",
                          }}
                          value={note}
                          onChangeText={(txt) => setnote(txt)}
                        />
                      </View>
                    </KeyboardAvoidingView>
                    <View style={styles.modal_btn_box}>
                      <TouchableOpacity
                        onPress={() => {
                          postdata(), setModalVisible(!modalVisible);
                        }}
                        style={styles.modal_btn}
                      >
                        <Text style={styles.modal_btn_txt}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          {
                            setd(3);
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
            ) : d == 0 ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
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
                        setd(1);
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
            ) : d == 3 ? (
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
                        onPress={
                          () => setModalVisible(!modalVisible)
                          // ,
                          // setd(0), setn("")
                        }
                      >
                        <Entypo name="cross" size={30} color="black" />
                      </Pressable>
                    </View>
                    <Text style={styles.date}>{pin_date}</Text>
                    <Text style={styles.note3}>{note}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setd(4);
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
              visible={modalVisible1}
              onRequestClose={() => {
                setModalVisible1(!modalVisible1);
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
                        setModalVisible1(!modalVisible1),
                          setsearch(""),
                          call_api();
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
                                onPress={() => handleChange(item.value)}
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
                          <Pressable onPress={() => handleChange1(item.value)}>
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
                  {/* <SectionList
                  stickySectionHeadersEnabled={false}
                    renderSectionHeader={({ section: { title } }) => (
                      
                      <Text
                        style={{
                          
                          fontSize: wp("6.13%"),
                          marginTop: "3%" ,fontFamily:"Inter-Black",marginStart:"3%"
                        }}
                      >
                        {blank_tag=="1"?title:"" }
                      </Text>
                    )}
                    sections={[
                      {
                        title: "User Tags",
                        data: DATA1,
                        renderItem: ({
                          item,
                          index,
                          section: { title, data },
                        }) => (
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: "6%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",marginTop:"2%",
                            }}
                            onPress={() => {}}
                          >
                            <Text
                              style={{
                                fontSize: wp("4.9%"),
                                fontWeight: "normal",
                                fontFamily:"Inter-Black4",marginBottom:"4%"
                              }}
                            >
                              {item.label}
                            </Text>
                            <Pressable style={{}} onPress={() => handleChange(item.value)}>
                            
                             
                                 { item.isChecked
                                    ? <Image style={{height: hp("4%"),
                                    width: wp("6%"),
                                    resizeMode: "contain",}} source={Images.Task_Complete}></Image>
                                    : <Image style={{height: hp("4%"),
                                    width: wp("6%"),
                                    resizeMode: "contain",}} source={Images.Task_circle}></Image>}
                               
                            </Pressable>
                          </TouchableOpacity>
                        ),
                      },
                      {
                        title: "System Tags",
                        data: DATA2,
                        renderItem: ({
                          item,
                          index,
                          section: { title, data },
                        }) => (
                          <View
                            style={{
                              paddingHorizontal: "6%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",marginTop:"3%"
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
                              onPress={() => handleChange1(item.value)}
                            >
                              { item.isChecked
                                    ? <Image style={{height: hp("4%"),
                                    width: wp("6%"),
                                    resizeMode: "contain",}} source={Images.Task_Complete}></Image>
                                    : <Image style={{height: hp("4%"),
                                    width: wp("6%"),
                                    resizeMode: "contain",}} source={Images.Task_circle}></Image>}
                            </Pressable>
                          </View>
                        ),
                      },
                    ]}
                    // keyExtractor={(item, index) => item.name + index}
                  /> */}
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
                        setModalVisible1(!modalVisible1),
                          setsearch(""),
                          Add_tag();
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
          <View style={styles.centeredView}>
            <Modal
              transparent={true}
              visible={modalVisible3}
              onRequestClose={() => {
                setModalVisible3(!modalVisible3);
              }}
            >
              <View style={styles.centeredView_lead}>
                <View style={styles.modalView_lead}>
                  <Text style={styles.textStyle1}>Lead Booker</Text>
                  <Text style={styles.textStyle2}>No Activity Found</Text>
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
                      setModalVisible3(!modalVisible3);
                    }}
                  >
                    <Text style={styles.textStyle3}>Ok</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.centeredView}>
            <Modal
              transparent={true}
              visible={modalVisible4}
              onRequestClose={() => {
                setModalVisible4(!modalVisible4);
              }}
            >
              <View style={styles.centeredView_lead}>
                <View style={styles.modalView_lead}>
                  <Text style={styles.textStyle1}>Lead Booker</Text>
                  <Text style={styles.textStyle2}>
                    Are you sure to remove this tag ?
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
                    <Pressable
                      style={{}}
                      onPress={() => {
                        setModalVisible4(!modalVisible4), Remove_tag();
                      }}
                    >
                      <Text style={styles.textStyle3}>Yes</Text>
                    </Pressable>
                    <View
                      style={{
                        height: height * 0.075,
                        backgroundColor: "#cccccc",

                        width: "0.5%",
                      }}
                    ></View>
                    <Pressable
                      style={{}}
                      onPress={() => {
                        setModalVisible4(!modalVisible4);
                      }}
                    >
                      <Text style={styles.textStyle3}>No</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.floating_btn}
          >
            {icon_note == "Yes" ? (
              <Image
                style={{
                  width: Dimensions.get("window").width * 0.13,
                  height: Dimensions.get("window").width * 0.13,
                  resizeMode: "contain",
                }}
                source={Images.pencil_note}
              ></Image>
            ) : (
              <Image
                style={{
                  width: Dimensions.get("window").width * 0.13,
                  height: Dimensions.get("window").width * 0.13,
                  resizeMode: "contain",
                }}
                source={Images.plus_note}
              ></Image>
            )}
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: height * 0.068,
              backgroundColor: Colors.MAIN_COLOR,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <Text
              onPress={() => {
                lead_activity_msg == "No Activity Found"
                  ? setModalVisible3(true)
                  : navigation.navigate(ScreenNames.LEAD_ACTIVITY, {
                      name: User_data?.name,
                      logo1: User_data?.name_initials,

                      id: User_data?.id,
                    });
              }}
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Inter-Black",
              }}
            >
              View Lead Activity
            </Text>
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title_txt2: {
    fontSize: wp("6.13%"),
    marginTop: "3%",
    fontFamily: "Inter-Black",
    marginStart: "3%",
  },
  textStyle1: {
    fontSize: wp("5.41%"),
    fontFamily: "Inter-Black2",
    marginTop: "7%",
    textAlign: "center",
  },
  textStyle2: {
    fontSize: wp("4%"),

    width: "80%",
    marginBottom: "7%",
    marginTop: "1%",
    color: "#262626",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Inter-Black",
  },
  textStyle3: {
    fontSize: wp("5.31%"),
    color: "#2b92ee",
    fontFamily: "Inter-Black",
    marginVertical: "5%",
  },

  centeredView_lead: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modalView_lead: {
    width: "87%",
    backgroundColor: "#ececee",
    borderRadius: 15,

    elevation: 5,
    alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
    // elevation: 20,
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
  update_txt: {
    color: "white",
    fontSize: wp("6%"),
    fontFamily: "Inter-Black4",
  },
  note3: {
    color: "black",
    margin: "4%",
    fontSize: 14,
    fontFamily: "Inter-Black",
  },
  date: {
    color: "black",
    marginLeft: "4%",
    marginVertical: "1%",
    fontSize: 15,
    fontFamily: "Inter-Black4",
    fontFamily: "Inter-Black",
  },
  set: {
    flexDirection: "row",
    padding: "3%",
    alignItems: "center",
  },
  circle_box: {
    flexDirection: "row",
    paddingVertical: "2%",
    alignItems: "center",
  },
  flat_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
  modal_btn_txt: { color: "white", fontSize: 17, fontFamily: "Inter-Black" },
  modal_btn: {
    height: height * 0.05,
    width: "45%",
    backgroundColor: "#d8524f",
    alignSelf: "center",

    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
    height: height * 0.065,
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
    height: height * 0.057,
    width: width * 0.11,
    resizeMode: "contain",
  },
  tag_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tag_touch: { alignItems: "center" },
  tag: { color: "white", fontSize: wp("4.63%"), fontFamily: "Inter-Black4" },
  flat: { backgroundColor: "#f2f2f2", padding: 10, marginBottom: 40 },
  input: {
    height: height * 0.25,
    margin: 12,

    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    fontFamily: "Inter-Black",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Inter-Black",
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
    width: "90%",
    backgroundColor: "#fcf5bf",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",
    marginTop: height * 0.12,
  },
  modalView2: {
    // height: height * 0.44,
    width: "90%",
    backgroundColor: "#feb6c1",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",
    marginTop: height * 0.12,
  },
  modalView1: {
    // height: height * 0.44,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,

    elevation: 20,
    alignSelf: "center",
    marginTop: height * 0.12,
  },

  item: {
    backgroundColor: "#f9c2ff",
    padding: 5,
    marginVertical: 4,
    fontFamily: "Inter-Black",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    fontFamily: "Inter-Black",
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Black",
  },
  pad: { paddingVertical: "3%", paddingHorizontal: "5%" },

  tag_input2: {
    margin: "2%",

    borderWidth: 1,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 20,
    fontFamily: "Inter-Black2",
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },

  modal_tag_view: {
    height: height * 0.83,
    width: "93%",
    backgroundColor: "white",
    borderRadius: 6,

    elevation: 20,
    alignSelf: "center",

    marginTop: "15%",
  },
  floating_btn: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    bottom: "12%",
    right: "5%",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.95,
    shadowRadius: 2.84,
    elevation: 5,
  },

  box: {
    flexDirection: "row",

    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 6,
    marginEnd: "2%",
    marginTop: "2%",
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,

    color: "#808080",

    marginTop: "2%",
    fontWeight: "300",
    fontFamily: "Inter-Black4",
  },
  number: {
    fontSize: 15,

    // fontWeight: "400",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 1,

    width: "93%",
    alignSelf: "center",
  },

  container: { flex: 1, backgroundColor: "white" },
});

export default Basic_detail;
