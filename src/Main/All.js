import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import { useFonts } from 'expo-font';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import {
  Entypo,
  Feather,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { get_leads, get_leads_All } from "../Services";
import { useNavigation } from "@react-navigation/native";
import Loader from "../constant/Loader";
import { ScreenNames } from "../constant/ScreenNames";
import { Colors } from "../constant/colors";
import { Images } from "../constant/images";

export default function All() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black3': require('../../assets/fonts/Mulish-Regular.ttf'),
   
  });

 

  // if (!fontsLoaded) {
  //   return null;
  // }
  const [d, setd] = useState(false);
  const navigation = useNavigation();

  const [DATA, setDATA] = useState([]);

  const [loading, setLoading] = React.useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [d1, setd1] = useState(0);
  const [d2, setd2] = useState(false);
  const [pin_note, setpin_note] = useState("");
  const [pin_date, setpin_date] = useState("");
  const [note, setnote] = useState("");
  const [n, setn] = useState("");
  const [modalTitle2, setModalTitle2] = useState("");
  const translation = useRef(new Animated.Value(0)).current;

  

  

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
      };

      get_leads_All(data)
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
            toValue: 100,
            delay: 0,
            easing: Easing.elastic(4),
            useNativeDriver: true,
          }).start();
          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);

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

  // console.log(DATA);

  return (
    // <ScrollView style={{  }}>
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {loading ? (
          <Loader loading={loading} />
        ) : DATA && DATA.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                height: height * 0.045,
                width: width * 0.38,
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
                    fontSize: 16,fontFamily:"Inter-Black"
                  }}
                >
                  Select All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.flat}
              data={DATA}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View>
                  <View style={styles.flat_view}>
                    {d == true ? (
                      <Pressable onPress={() => handleChange(item.id)}>
                        {item.isChecked ? (
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={28}
                            color={"blue"}
                          />
                        ) : (
                          <FontAwesome
                            name="circle-thin"
                            size={28}
                            color="#cccccc"
                          />
                        )}
                      </Pressable>
                    ) : null}
                    <View
                      style={{
                        backgroundColor: "white",

                        width: d == true ? width * 0.8 : width * 0.95,

                        elevation: 5,
                        alignSelf: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                        shadowColor: "white",
                      }}
                    >
                      
                      
                      <View style={styles.set}>
                       
                       <View style={styles.circle_icon}>
                         
                          <View style={styles.circle}>
                            <Text style={styles.circle_text}>
                              {item.name_initials}
                            </Text>
                        
                        </View>
                       </View>
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
                            })
                              // AsyncStorage.setItem("user_id", item.id);
                          }}
                          style={styles.name}
                        >
                          {item.name}
                        </Text>
                       
                       

                       <TouchableOpacity
                          style={{ marginTop: "6%" }}
                          activeOpacity={1}
                          onPress={() => {
                            item.pined_note == "Yes" ? setd1(3) : setd1(0);
                            setModalVisible(true),
                              setModalTitle2(item.pinned_by),
                              setnote(item.pined_note_text),
                              setpin_date(item.pinned_date),
                              setpin_note(item.pined_note);
                          }}
                        >
                          {item.pined_note == "Yes" ? (
                            <Image
                              style={styles.note2}
                              source={Images.pencil_box}
                            ></Image>
                          ) : (
                            <Image
                              style={styles.note2}
                              source={Images.plus_box}
                            ></Image>
                          )}
                        </TouchableOpacity>
                        
                     </View>
                     <View style={styles.line2}></View>
                      <View style={styles.set}>
                       
                        <View style={styles.phone_icon}>
                          <Feather
                            name="phone"
                            size={24}
                            color={Colors.MAIN_COLOR}
                          />
                        </View>
                        <Text
                          onPress={() => {
                            Linking.openURL(`tel:${item.phone}`);
                          }}
                          style={styles.number}
                        >
                          {item.phone ? item.phone : "no number"}
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
                      <View style={styles.line2}></View>
                      <View style={styles.set}>
                        <View style={styles.email_icon}>
                          <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color={Colors.MAIN_COLOR}
                          />
                        </View>
                        <Text
                          style={styles.email}
                          onPress={() => {
                            Linking.openURL(`mailto:${item.email}`);
                          }}
                        >
                          {item.email}
                        </Text>
                      </View>
                      <View style={styles.line2}></View>
                      <View style={styles.set}>
                        <View style={styles.voice_icon}>
                          <Entypo
                            name="voicemail"
                            size={24}
                            color={Colors.MAIN_COLOR}
                          />
                        </View>
                        <Text style={styles.voicemail}>
                          {item.voicemail ? item.voicemail : "Voicemail"}
                        </Text>
                      </View>
                    </View>
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
                            //  value={""}
                            onChangeText={(txt) => (setnote(txt), setn(txt))}
                          />
                        </View>
                      </KeyboardAvoidingView>
                      <View style={styles.modal_btn_box}>
                        {n.length > 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              setd1(3);
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
                            setd1(3);
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
                        <Text style={{ color: "white" }}>Add Note</Text>
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
                            setModalVisible(!modalVisible), setd1(0), setn("")
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
        {d2 ? (
          <Animated.View
            style={{
             
              alignItems: "center",
              justifyContent: "center",
              width: Dimensions.get('window').width * 0.18,
    height: Dimensions.get('window').width * 0.18,

borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              position: "absolute",

              right: "8%",
             
              backgroundColor: Colors.float_btn,
              
              transform: [{ translateY: translation }],
              bottom: (height + 180)*0.22,
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
                style={{ height: 60, width: 60, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </View>
    </SafeAreaView>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  update_txt: { color: "white", fontSize: 17 ,fontFamily:"Inter-Black4"},
  note3: { color: "black", margin: "4%", fontSize: 14,fontFamily:"Inter-Black4"},
  date: {
    color: "black",
    marginLeft: "4%",
    marginVertical: "1%",
    fontSize: 15,fontFamily:"Inter-Black4"
  },
  set: {
    flexDirection: "row",
    padding: "2%",
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
  modal_btn_txt: { color: "white", fontSize: 17,fontFamily:"Inter-Black4" },
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
    marginTop: "10%",
  },
  pin: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "4%",
  },
  add_note: {
    height: height * 0.05,
    width: width * 0.3,
    backgroundColor: "#5bbfdf",
    alignSelf: "center",
    marginTop: height*0.22,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  update_note: {
    height: height * 0.05,
    width: width * 0.3,
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
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    resizeMode: "contain",


    
  },
  tag_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tag_touch: { alignItems: "center" },
  tag: { color: "white", fontSize: 18,fontFamily:"Inter-Black4" },
  flat: { backgroundColor: "#f2f2f2", padding: 10, marginBottom: 40 },
  input: {
    height: height * 0.25,
    margin: 12,

    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  modalText: {
    fontSize: 20,
    fontFamily:"Inter-Black2"
  },
  modalText1: {
    fontSize: 20,
    marginHorizontal: "30%",fontFamily:"Inter-Black4"
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
  },
  modalView2: {
    // height: height * 0.44,
    width: "90%",
    backgroundColor: "#feb6c1",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",
  },
  modalView1: {
    // height: height * 0.44,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,

    elevation: 20,
    alignSelf: "center",
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
  phone_icon: {  flex:0.17,marginStart: "5%" },
  circle_icon: {  marginStart: "5%",marginEnd:"3%" },
  sms: {
    width: Dimensions.get('window').width * 0.11,
    height: Dimensions.get('window').width * 0.11,
    resizeMode: "contain",
    marginTop: 6,
  },
  voice_icon: { flex: 0.16, marginStart: "5%" },
  email_icon: { flex: 0.16, marginStart: "5%" },
  icon: {},
  icon1: { marginTop: "5%" },
  name: {
    fontSize: 20,

    color: "#666666",
    fontWeight: "normal",
    flex: 1,fontFamily: 'Inter-Black',
  },
  number: {
    fontSize: 15,
   

    // fontWeight: "700",
    color: "#808080",flex:0.8,fontFamily: 'Inter-Black2',
  },
  email: {
    fontSize: 15,
    flex: 0.9,

    // fontWeight: "700",
    color: "#808080",fontFamily: 'Inter-Black2',
  },
  voicemail: {
    fontSize: 15,
    flex: 0.9,

    // fontWeight: "700",
    color: "#808080",fontFamily: 'Inter-Black2',
  },

  circleview: {   alignItems: "center" },
  circle: {
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').width * 0.17,
backgroundColor: "#f2f2f2",
borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
justifyContent: "center",
  },
  circle_text: {
    fontSize: 30,
    // fontWeight: "700",
    color: "#bfbfbf",
    textAlign: "center",fontFamily: 'Inter-Black3',
  },
  bouncy: { marginStart: "10%", marginRight: "-4%" },
  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "3%",

    width: "100%",
  },
  line2: {
    backgroundColor: "#f2f2f2",
    height: 1.5,

    width: "100%",
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