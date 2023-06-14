import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

import {
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Zocial,
  FontAwesome5,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../../constant/colors";
import { Images } from "../../../../constant/images";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function News_Feed() {
  const [fontsLoaded] = useFonts({
    prima: require("../../../../../assets/fonts/PrimaSansBold.otf"),
    prima_r: require("../../../../../assets/fonts/PrimaSansRegular.otf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [mark, setmark] = useState(false);
  const [val1, setval1] = useState(0);
  const [val2, setval2] = useState(0);
  const [val3, setval3] = useState(0);
  const [com, setcom] = useState(false);
  const [d, setd] = useState(false);
  const [d1, setd1] = useState(1);
  const [email_frequency, setemail_frequency] = useState("Self Manage");
 

  return (
    <SafeAreaView style={styles.container}>
      
                <View style={{ paddingHorizontal: "6%", marginTop: "10%" }}>
                  <View styles={{}}>
                    <Text
                      style={styles.postal_box}
                      onPress={() => setModalVisible(true)}
                    >
                      Add New Postal Code
                    </Text>
                  </View>
                  <Text style={styles.note}>
                    Note: if you want to add multiple postal codes then you have
                    to add multiple postal code searches.
                  </Text>
                  <View style={styles.box4}>
                    <Text style={styles.notify}>Notifications</Text>

                    <AntDesign
                      style={{ marginStart: "2%" }}
                      name="questioncircle"
                      size={15}
                      color="blue"
                    />
                  </View>

                  <Text style={styles.saved_txt}>No record found</Text>
                </View>
             
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          propagateSwipe={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal_page}>
            {d ? (
              <View style={styles.modalView1}>
                <ScrollView>
                  <View style={styles.pin2}>
                    <Text style={styles.modalText1}>More Filter</Text>
                    <Pressable
                      onPress={() => {
                        setModalVisible(!modalVisible), setd(false);
                      }}
                    >
                      <Entypo name="cross" size={24} color="#cccccc" />
                    </Pressable>
                  </View>
                  <View style={styles.line2}></View>
                  <View style={styles.modal_box_view}>
                    <View style={styles.modal_box_txt}>
                      <Text style={styles.modal_box_txt1}>Email Frequency</Text>
                      <TouchableOpacity
                        style={styles.bottom_box}
                        onPress={() => {
                          setModalVisible1(true),setd1(1)
                        }}
                      >
                        <Text style={styles.dropdown_txt}>{email_frequency}</Text>
                        <View>
                          <AntDesign
                            style={{}}
                            name="up"
                            size={8}
                            color="blue"
                          />
                          <AntDesign name="down" size={8} color="blue" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line3}></View>
                  <View style={styles.modal_box_view}>
                    <View style={styles.modal_box_txt}>
                      <Text style={styles.modal_box_txt1}>Property Type</Text>
                      <TouchableOpacity
                        style={styles.bottom_box}
                        onPress={() => {
                          setModalVisible1(true),setd1(2)
                        }}
                      >
                        <Text style={styles.dropdown_txt}>Type</Text>
                        <View>
                          <AntDesign
                            style={{}}
                            name="up"
                            size={8}
                            color="blue"
                          />
                          <AntDesign name="down" size={8} color="blue" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line3}></View>
                  <View style={styles.modal_box_view}>
                    <View style={styles.modal_box_txt}>
                      <Text style={styles.modal_box_txt1}>Bed Min</Text>
                      <TouchableOpacity
                        style={styles.bottom_box}
                        onPress={() => {
                          setModalVisible1(true),setd1(3)
                        }}
                      >
                        <Text style={styles.dropdown_txt}>Any</Text>
                        <View>
                          <AntDesign
                            style={{}}
                            name="up"
                            size={8}
                            color="blue"
                          />
                          <AntDesign name="down" size={8} color="blue" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line3}></View>
                  <View style={styles.modal_box_view}>
                    <View style={styles.modal_box_txt}>
                      <Text style={styles.modal_box_txt1}>Bath Max</Text>
                      <TouchableOpacity
                        style={styles.bottom_box}
                        onPress={() => {
                          setModalVisible1(true),setd1(4)
                        }}
                      >
                        <Text style={styles.dropdown_txt}>Any</Text>
                        <View>
                          <AntDesign
                            style={{}}
                            name="up"
                            size={8}
                            color="blue"
                          />
                          <AntDesign name="down" size={8} color="blue" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line3}></View>
                  <View style={styles.modal_box_view}>
                    <View style={styles.modal_box_txt}>
                      <Text style={styles.modal_box_txt1}>Price Min</Text>
                      <TouchableOpacity
                        style={styles.bottom_box}
                        onPress={() => {
                          setModalVisible1(true);
                        }}
                      >
                        <Text style={styles.dropdown_txt}>Min $</Text>
                        <View>
                          <AntDesign
                            style={{}}
                            name="up"
                            size={8}
                            color="blue"
                          />
                          <AntDesign name="down" size={8} color="blue" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line3}></View>
                  <View style={styles.modal_box_view}>
                    <View style={styles.modal_box_txt}>
                      <Text style={styles.modal_box_txt1}>Price Max</Text>
                      <TouchableOpacity
                        style={styles.bottom_box}
                        onPress={() => {
                          setModalVisible1(true);
                        }}
                      >
                        <Text style={styles.dropdown_txt}>Max $</Text>
                        <View>
                          <AntDesign
                            style={{}}
                            name="up"
                            size={8}
                            color="blue"
                          />
                          <AntDesign name="down" size={8} color="blue" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line3}></View>
                  <View style={styles.modal_box_view}>
                    <View style={styles.modal_box_txt}>
                      <Text style={styles.modal_box_txt1}>
                        Transaction Type
                      </Text>
                      <TouchableOpacity
                        style={styles.bottom_box}
                        onPress={() => {
                          setModalVisible1(true);
                        }}
                      >
                        <Text style={styles.dropdown_txt}>Transaction Ty</Text>
                        <View>
                          <AntDesign
                            style={{}}
                            name="up"
                            size={8}
                            color="blue"
                          />
                          <AntDesign name="down" size={8} color="blue" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line3}></View>
                  <Text
                    style={styles.Apply}
                    onPress={() => {
                      setModalVisible1(true);
                    }}
                  >
                    Apply
                  </Text>
                  <Text style={styles.reset}>Reset</Text>
                </ScrollView>
              </View>
            ) : (
              <View style={styles.modalView1}>
                <ScrollView>
                  <View style={styles.pin2}>
                    <Text style={styles.modalText1}>Postal Code</Text>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Entypo name="cross" size={24} color="#cccccc" />
                    </Pressable>
                  </View>
                  <View style={styles.line2}></View>
                  <View
                    style={{ paddingHorizontal: "6%", paddingVertical: "3%" }}
                  >
                    <Text style={styles.note2}>
                      Testsite.advancewebsites.com is always on the lookout for
                      homes that you should know about.
                    </Text>
                    <KeyboardAvoidingView enabled>
                      <View style={styles.input}>
                        <TextInput
                          selectionColor={"blue"}
                          style={{
                            height: height * 0.07,
                            width: width * 0.1,
                            borderColor: val1 == 0 ? "blue" : "#cccccc",
                            borderWidth: 1,
                            borderRadius: 4,
                            alignItems: "center",
                            fontSize: 30,
                            textAlign: "center",
                          }}
                          //  value={""}
                          onChangeText={(txt) => {
                            setval1(txt);
                          }}
                          maxLength={1}
                        />
                        <TextInput
                          selectionColor={"blue"}
                          style={{
                            height: height * 0.07,
                            width: width * 0.1,
                            borderColor:
                              val1 != 0 && val2 == 0 ? "blue" : "#cccccc",
                            borderWidth: 1,
                            borderRadius: 4,
                            alignItems: "center",
                            textAlign: "center",
                            marginHorizontal: 4,
                            fontSize: 30,
                          }}
                          //  value={""}
                          onChangeText={(txt) => {
                            setval2(txt);
                          }}
                          maxLength={1}
                        />
                        <TextInput
                          selectionColor={"blue"}
                          style={{
                            height: height * 0.07,
                            width: width * 0.1,
                            borderColor:
                              val1 != 0 && val2 != 0 && val3 == 0
                                ? "blue"
                                : "#cccccc",
                            borderWidth: 1,
                            borderRadius: 4,
                            alignItems: "center",
                            textAlign: "center",
                            fontSize: 30,
                          }}
                          //  value={""}
                          onChangeText={(txt) => {
                            setval3(txt);
                          }}
                          maxLength={1}
                        />
                      </View>
                    </KeyboardAvoidingView>
                    <Text style={styles.note3}>Enter First 3-digit POSTAL</Text>
                    <Text style={styles.note4}>code</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: "15%",
                        marginBottom: "5%",
                      }}
                    >
                      <Text style={styles.ADD} onPress={() => {}}>
                        Add
                      </Text>
                      <Text
                        style={styles.more_filter}
                        onPress={() => {
                          setd(true);
                        }}
                      >
                        More Filters
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line2}></View>
                  <Text
                    style={styles.close}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    Close
                  </Text>
                </ScrollView>
              </View>
            )}
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          avoidKeyboard={true}
          onRequestClose={() => {
            setModalVisible1(!modalVisible1);
          }}
        >
          <View style={styles.centeredView}>
            {d1 == 1 ? (
              <View style={styles.modalView}>
                <View style={styles.modal_top}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={styles.done}
                  >
                    <Text style={styles.done2}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <ScrollView>
                    <View style={{}}>
                      <Text 
                      onPress={() => setemail_frequency("After 2 Weeks")}
                      style={styles.list_txt}>After 2 Weeks</Text>
                      <Text 
                       onPress={() => setemail_frequency("After 1 Months")}
                      style={styles.list_txt}>After 1 months</Text>
                      <Text style={styles.list_txt}>After 2 months</Text>
                      <Text style={styles.list_txt}>Self Manage</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : d1 == 2 ? (
              <View style={styles.modalView}>
                <View style={styles.modal_top}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={styles.done}
                  >
                    <Text style={styles.done2}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <ScrollView>
                    <View style={{}}>
                      <Text style={styles.list_txt}>Type</Text>
                      <Text style={styles.list_txt}>Apartment</Text>
                      <Text style={styles.list_txt}>Attached</Text>
                      <Text style={styles.list_txt}>cottage</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : d1 == 3 ? (
              <View style={styles.modalView}>
                <View style={styles.modal_top}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={styles.done}
                  >
                    <Text style={styles.done2}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <ScrollView>
                    <View style={{}}>
                      <Text style={styles.list_txt}>Any</Text>
                      <Text style={styles.list_txt}>1+Beds</Text>
                      <Text style={styles.list_txt}>2+Beds</Text>
                      <Text style={styles.list_txt}>3+Beds</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : d1 == 4 ? (
              <View style={styles.modalView}>
                <View style={styles.modal_top}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={styles.done}
                  >
                    <Text style={styles.done2}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <ScrollView>
                    <View style={{}}>
                    <Text style={styles.list_txt}>Any</Text>
                      <Text style={styles.list_txt}>1+Baths</Text>
                      <Text style={styles.list_txt}>2+Baths</Text>
                      <Text style={styles.list_txt}>3+Baths</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : d1 == 5 ? (
              <View style={styles.modalView}>
                <View style={styles.modal_top}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={styles.done}
                  >
                    <Text style={styles.done2}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <ScrollView>
                    <View style={{}}>
                      <Text style={styles.list_txt}>After 2 Weeks</Text>
                      <Text style={styles.list_txt}>After 1 months</Text>
                      <Text style={styles.list_txt}>After 2 months</Text>
                      <Text style={styles.list_txt}>Self Manage</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : d1 == 6 ? (
              <View style={styles.modalView}>
                <View style={styles.modal_top}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={styles.done}
                  >
                    <Text style={styles.done2}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <ScrollView>
                    <View style={{}}>
                      <Text style={styles.list_txt}>After 2 Weeks</Text>
                      <Text style={styles.list_txt}>After 1 months</Text>
                      <Text style={styles.list_txt}>After 2 months</Text>
                      <Text style={styles.list_txt}>Self Manage</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : d1 == 7 ? (
              <View style={styles.modalView}>
                <View style={styles.modal_top}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={styles.done}
                  >
                    <Text style={styles.done2}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <ScrollView>
                    <View style={{}}>
                      <Text style={styles.list_txt}>After 2 Weeks</Text>
                      <Text style={styles.list_txt}>After 1 months</Text>
                      <Text style={styles.list_txt}>After 2 months</Text>
                      <Text style={styles.list_txt}>Self Manage</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : (
              setd1(1)
            )}
          </View>
        </Modal>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Apply: {
    fontSize: 16,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: "4%",

    paddingHorizontal: "8%",
    borderRadius: 5,
    alignSelf: "center",
    marginTop: "15%",
    marginBottom: "5%",
  },
  reset: {
    fontSize: 16,
    color: Colors.MAIN_COLOR,

    textAlign: "center",

    alignSelf: "center",
  },
  dropdown_txt: { fontSize: 11, fontWeight: "normal", color: "blue" },
  modal_box_txt1: { fontSize: 16, fontWeight: "bold", width: "43%" },
  modal_box_view: { paddingHorizontal: "6%", paddingVertical: "3%" },
  modal_box_txt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom_box: {
    borderRadius: 2,

    borderWidth: 1,
    borderColor: "#cccccc",

    margin: "2%",
    flexDirection: "row",
    width: width * 0.28,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3%",
  },
  done2: { fontSize: 16, fontWeight: "600", textAlign: "right", color: "blue" },
  list_txt: {
    fontSize: 22,
    fontWeight: "normal",
    textAlign: "center",
    marginTop: "5%",
  },
  list: {
    height: "12%",
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "35%",
    backgroundColor: "#cccccc",
    borderRadius: 6,
  },
  done: { flex: 0.4, fontSize: 18, fontFamily: "Inter-Black2" },
  date: {
    flex: 0.8,
    fontSize: 14,
    color: "#cccccc",
    fontFamily: "Inter-Black4",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
    marginBottom: -20,
  },
  modalView: {
    height: "50%",
    width: "100%",
    backgroundColor: "#e6e6e6",
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
  modal_top: {
    flexDirection: "row",
    height: "13%",

    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: "5%",
  },
  ADD: {
    fontSize: 15,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: "4%",
    marginEnd: "5%",
    fontFamily: "prima_r",
    paddingHorizontal: "8%",
    borderRadius: 5,
  },
  more_filter: {
    fontSize: 15,

    color: "black",
    textAlign: "center",
    paddingVertical: "4%",

    fontFamily: "prima_r",
    paddingHorizontal: "12%",
    borderRadius: 5,

    borderWidth: 1,
    borderColor: "#cccccc",
  },
  close: {
    fontSize: 13,

    color: "black",
    textAlign: "center",
    paddingVertical: 7,

    fontFamily: "prima_r",
    borderRadius: 5,
    width: "22%",
    borderWidth: 1,
    borderColor: "#cccccc",
    alignSelf: "flex-end",
    margin: "2%",
  },
  note2: { fontSize: 15, fontFamily: "prima_r", color: "black" },
  note3: { fontSize: 15, color: "black", textAlign: "center" },
  note4: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginVertical: "2%",
  },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    marginTop: "1%",
    width: "100%",
    marginBottom: "0.5%",
  },
  line3: {
    backgroundColor: "#cccccc",
    height: 1,
    marginTop: "1%",
    width: "94%",
    marginBottom: "0.5%",
    marginHorizontal: "6%",
  },
  pin2: {
    flexDirection: "row",

    paddingHorizontal: "6%",
    // alignSelf: "center",
    justifyContent: "space-between",
    paddingVertical: "5%",
  },
  modalText1: {
    fontSize: 18,
   
  },
  input: {
    // height: height * 0.06,

    borderColor: "#999999",

    flexDirection: "row",
    alignSelf: "center",
    marginVertical: "18%",
  },
  modal_page: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    // alignItems:"center"
    alignItems: "center",
    justifyContent: "center",
  },
  modalView1: {
    height: height * 0.6,
    width: "75%",
    backgroundColor: "white",
    borderRadius: 2,

    elevation: 20,
    alignSelf: "center",
  },
  postal_box: {
    fontSize: 14,
    backgroundColor: "#20aed6",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    // width: "100%",
    alignSelf: "flex-end",
    fontFamily: "prima_r",
    paddingHorizontal: 15,
    borderRadius: 2,borderWidth:1,borderColor:Colors.MAIN_COLOR
  },
  note: { fontSize: 13, fontFamily: "prima_r", color: "#6c6c6c" },
  line: {
    height: 1,
    backgroundColor: "#666666",
    marginTop: "8%",
    marginBottom: "15%",
  },
  saved_search: { fontSize: 14, fontFamily: "prima", color: "#427fb8" },
  saved_txt: { fontSize: 13, fontFamily: "prima_r", color: "#6c6c6c" },
  txt6: {
    fontSize: 13,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingHorizontal: "3%",
    paddingVertical: "1.5%",
    borderRadius: 2,

    alignSelf: "center",
    marginHorizontal: "1%",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    height: 25,
    borderColor: "#999999",
    width: "40%",
    borderRadius: 20,
    paddingHorizontal: "2%",
    marginEnd: "6%",
    marginStart: "2%",
  },
  menu_txt: {
    fontSize: 13,
    fontFamily: "prima_r",
    color: "#1e78d8",
  },
  save: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  notify: {
    fontSize: 12,

    color: "#5e5e5e",
    marginStart: "2%",
    fontFamily: "prima",
  },
  contct_view: { marginTop: "8%", paddingHorizontal: "6%" },
  btn: {
    backgroundColor: "#32b0d6",

    height: height * 0.035,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "15%",
  },

  cnct: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
    marginVertical: "8%",
  },
  first_name: { fontSize: 15, fontWeight: "bold", color: "#666666" },
  view2: { flexDirection: "row", marginTop: "1%" },
  view1: { flexDirection: "row" },
  img_set: { flexDirection: "row", marginStart: "30%", flex: 0.9 },
  set_txt: {
    fontSize: 11,
    color: "#3b84c0",
    fontWeight: "bold",
    flex: 0.5,
    paddingLeft: "10%",
  },
  set_txt2: {
    fontSize: 10,
    color: "#3b84c0",
    fontWeight: "bold",
    paddingLeft: "10%",
  },
  set1: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt4: {
    fontSize: 14,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    // width: "100%",
    alignSelf: "center",
    fontFamily: "prima_r",
    paddingHorizontal: 15,
    borderRadius: 2,
  },
  back_img: {
    height: height * 0.032,
    width: width * 0.1,
    resizeMode: "contain",
  },
  circle: {
    backgroundColor: "black",
    height: height * 0.052,
    width: width * 0.11,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  box1: {
    backgroundColor: "#2a6573",

    height: height * 0.08,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "5%",
  },
  box2: {
    // height: height * 0.9,
    // alignItems: "center",

    marginTop: "15%",
    borderWidth: 0.5,
    borderColor: "#666666",
    borderRadius: 6,
    marginHorizontal: "2%",
    padding: 5,
    paddingBottom: "10%",
  },
  box3: {
    // alignItems: "center",

    borderWidth: 0.8,
    borderColor: "#666666",
    borderRadius: 6,
    width: "100%",
    backgroundColor: "#cccccc",
    paddingHorizontal: "2%",
    paddingTop: "2%",
  },
  box4: {
    // alignItems: "center",

    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: "3%",
    justifyContent: "flex-start",
    paddingVertical: "4%",
    paddingHorizontal: "3%",
  },
  box5: {
    // alignItems: "center",

    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: "3%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "4%",
  },
  tch: {
    backgroundColor: "white",
    margin: "2%",
    borderRadius: 4,
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  txt5: {
    textAlign: "center",
    fontSize: 13,
    color: "#6c6c6c",
    fontFamily: "prima_r",
  },
  touch_box: {
    height: 30,

    flexDirection: "row",
    borderRadius: 4,
    backgroundColor: "white",

    alignItems: "center",
    padding: 5,
    marginRight: "2%",
  },

  backimage: { flex: 0.65, marginStart: "5%" },
  box_items: { flexDirection: "row", alignItems: "center" },
  img: {
    height: height * 0.02,
    width: width * 0.05,
    resizeMode: "contain",
    alignSelf: "center",
  },
  img2: {
    height: height * 0.02,
    width: width * 0.05,
    resizeMode: "contain",
  },
  header_box: {
    height: height * 0.08,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    marginBottom: 20,
  },

  header: {
    color: "white",
    fontWeight: "500",
    fontSize: 21,
  },
  txt1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  txt2: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "#6c6c6c",
  },
  txt3: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default News_Feed;
