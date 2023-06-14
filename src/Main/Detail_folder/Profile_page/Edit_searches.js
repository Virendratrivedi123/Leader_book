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
  FlatList,
} from "react-native";
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

import { useFonts } from "expo-font";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../constant/colors";
import { Images } from "../../../constant/images";
import Your_profile from "./Edit_searc_pages/Your_profile";
import News_Feed from "./Edit_searc_pages/News_feed";
import Saved_searches from "./Edit_searc_pages/Saved_searches";
import Change_pass from "./Edit_searc_pages/Change_pass";
import Cancel_account from "./Edit_searc_pages/Cancel_account";
import Modal_data from "./Edit_searc_pages/Modal_data";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DATA = [
  {
    id: 0,
    name: "SELLING",

    description: "29 ESSENTIAL TIPS",
    s: false,
  },
  {
    id: 1,
    name: "BUYING",

    description: "29 ESSENTIAL TIPS",
    s: false,
  },
  {
    id: 2,
    name: "LISTINGS",

    description: "29 ESSENTIAL TIPS",
    s: false,
  },
  {
    id: 3,
    name: "RESOURCES",

    description: "29 ESSENTIAL TIPS",
    s: false,
  },
];
function Edit_searches() {
  const [fontsLoaded] = useFonts({
    " prima": require("../../../../assets/fonts/PrimaSansBold.otf"),
    prima_r: require("../../../../assets/fonts/PrimaSansRegular.otf"),
    "Inter-Black": require("../../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [selected_data, setSelected_data] = useState(DATA);

  const [com, setcom] = useState(false);
  const [d, setd] = useState(false);
  const [d1, setd1] = useState(false);
  const [modalVisible, setModalVisible] = useState("");

  const up_down = (item) => {
    const newitem = selected_data.map((val) => {
      if (val.id == item.id) {
        return { ...val, s: !val.s };
      } else {
        return val;
      }
    });
    setSelected_data(newitem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_box}>
        <View style={styles.box_items}>
          <TouchableOpacity
            style={styles.backimage}
            onPress={() => navigation.goBack()}
          >
            <Image source={Images.close_white} style={styles.back_img} />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Saved Searches</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.box1}>
            <View style={styles.img_set}>
              <FontAwesome5
                style={{ marginHorizontal: "5%" }}
                name="user-alt"
                size={16}
                color="black"
              />
              <Text style={styles.txt1}>MY ACCOUNT</Text>
            </View>
            <View style={styles.circle}>
              <Text onPress={() => setd(!d)}>
                <Entypo name="menu" size={32} color="white" />
              </Text>
            </View>
          </View>

          {d1 ? (
            <Modal_data data={modalVisible} />
          ) : (
            <>
              <Text style={styles.txt4}>Create New Search</Text>
              <Text style={styles.txt2}>Welcome {route.params.data.name}</Text>
              <View style={styles.set1}>
                <Text
                  onPress={() => {
                    setcom("Your Profile");
                  }}
                  style={styles.set_txt}
                >
                  Edit Profile
                </Text>

                <Text style={{}}>|</Text>
                <Text
                  onPress={() => {
                    setcom("Favorites");
                  }}
                  style={styles.set_txt}
                >
                  0 Favorite Properties
                </Text>
              </View>
              <View style={styles.set1}>
                <Text
                  onPress={() => {
                    setcom("Saved Searches");
                  }}
                  style={styles.set_txt}
                >
                  1 Saved Search
                </Text>

                <Text style={{}}>|</Text>
                <Text
                  onPress={() => {
                    setcom("News Feeds");
                  }}
                  style={styles.set_txt}
                >
                  0 Postal Code Search
                </Text>
              </View>
              <Text style={styles.set_txt2}>Sign out</Text>
              <View style={styles.box2}>
                <View style={styles.box3}>
                  <View style={styles.view1}>
                    <TouchableOpacity
                      style={{
                        height: 30,

                        flexDirection: "row",
                        borderRadius: 4,
                        backgroundColor:
                          com == "Your Profile" ? "white" : Colors.btn,

                        alignItems: "center",
                        padding: 5,
                        marginRight: "2%",
                      }}
                      onPress={() => {
                        setcom("Your Profile");
                      }}
                    >
                      <Text style={styles.txt5}>Your Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 30,

                        flexDirection: "row",
                        borderRadius: 4,
                        backgroundColor:
                          com == "Favorites" ? "white" : Colors.btn,

                        alignItems: "center",
                        padding: 5,
                        marginRight: "2%",
                      }}
                      onPress={() => {
                        setcom("Favorites");
                      }}
                    >
                      <Text style={styles.txt5}>Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 30,

                        flexDirection: "row",
                        borderRadius: 4,
                        backgroundColor:
                          com == "Saved Searches" ? "white" : Colors.btn,

                        alignItems: "center",
                        padding: 5,
                        marginRight: "2%",
                      }}
                      onPress={() => {
                        setcom("Saved Searches");
                      }}
                    >
                      <Text style={styles.txt5}>Saved Searches</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.view2}>
                    <TouchableOpacity
                      style={{
                        height: 30,

                        flexDirection: "row",
                        borderRadius: 4,
                        backgroundColor:
                          com == "News Feeds" ? "white" : Colors.btn,

                        alignItems: "center",
                        padding: 5,
                        marginRight: "2%",
                      }}
                      onPress={() => {
                        setcom("News Feeds");
                      }}
                    >
                      <Text style={styles.txt5}>News Feeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 30,

                        flexDirection: "row",
                        borderRadius: 4,
                        backgroundColor:
                          com == "Change Password" ? "white" : Colors.btn,

                        alignItems: "center",
                        padding: 5,
                        marginRight: "2%",
                      }}
                      onPress={() => {
                        setcom("Change Password");
                      }}
                    >
                      <Text style={styles.txt5}>Change Password</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.view2}>
                    <TouchableOpacity
                      style={{
                        height: 30,

                        flexDirection: "row",
                        borderRadius: 4,
                        backgroundColor:
                          com == "Cancel Account" ? "white" : Colors.btn,

                        alignItems: "center",
                        padding: 5,
                        marginRight: "2%",
                      }}
                      onPress={() => {
                        setcom("Cancel Account");
                      }}
                    >
                      <Text style={styles.txt5}>Cancel Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{}}>
                  {com == "Your Profile" ? (
                    <Your_profile data={route?.params?.data} />
                  ) : com == "Favorites" ? (
                    <View style={{ marginVertical: "15%" }}>
                      <Text style={{ marginHorizontal: "5%", fontSize: 13 }}>
                        No record found
                      </Text>
                    </View>
                  ) : com == "Saved Searches" ? (
                    <Saved_searches />
                  ) : com == "News Feeds" ? (
                    <News_Feed />
                  ) : com == "Change Password" ? (
                    <Change_pass />
                  ) : com == "Cancel Account" ? (
                    <Cancel_account />
                  ) : (
                    setcom("Saved Searches")
                  )}
                </View>
              </View>
              <Text style={styles.modal_box_txt1}>
                Newton, Galileo and Einstein have all been called "Fathers of
                Modern Physics." Newton was called this because of his famous
                law of motion and gravitation, Galileo for his role in the
                scientific revolution and his contributions on observational
                astronomy, and Einstein for his groundbreaking theory of
                relativity. Newton, Galileo and Einstein have all been called
                "Fathers of Modern Physics." Newton was called this because of
                his famous law of motion and gravitation, Galileo for his role
                in the scientific revolution and his contributions on
                observational astronomy, and Einstein for his groundbreaking
                theory of relativity. Newton, Galileo and Einstein have all been
                called "Fathers of Modern Physics." Newton was called this
                because of his famous law of motion and gravitation, Galileo for
                his role in the scientific revolution and his contributions on
                observational astronomy, and Einstein for his groundbreaking
                theory of relativity.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
      {d ? (
        <View style={styles.modalView1}>
          <View style={styles.modal_box_view}>
            <View style={styles.modal_box_txt}>
              <Text style={styles.modal_box_txt1}>HOME</Text>
            </View>
          </View>
          <View style={styles.modal_box_view}>
            <View style={styles.modal_box_txt}>
              <Text style={styles.modal_box_txt1}>ABOUT US</Text>
            </View>
          </View>

          <FlatList
            style={{}}
            data={selected_data}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <View>
                <View style={styles.modal_box_view}>
                  <View style={styles.modal_box_txt}>
                    <Text
                      onPress={() => {
                        setd1(true), setd(false), setModalVisible(item.name);
                      }}
                      style={styles.modal_box_txt1}
                    >
                      {item.name}
                    </Text>

                    <TouchableOpacity style={{}} onPress={() => up_down(item)}>
                      {item.s ? (
                        <FontAwesome
                          name="chevron-circle-up"
                          size={35}
                          color="black"
                        />
                      ) : (
                        <FontAwesome
                          name="chevron-circle-down"
                          size={35}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {item.s ? (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.in_txt}>{item.description}</Text>
                  </View>
                ) : null}
              </View>
            )}
          />

          <View style={styles.modal_box_view}>
            <View style={styles.modal_box_txt}>
              <Text style={styles.modal_box_txt1}>BLOG</Text>
            </View>
          </View>

          <View style={styles.modal_box_view}>
            <View style={styles.modal_box_txt}>
              <Text style={styles.modal_box_txt1}>CONTACT</Text>
            </View>
          </View>
        </View>
      ) : null}
      <View
        style={{
          
          position: "absolute",
          bottom: "40%",
          right: 0,
         
          
        }}
      >
        <TouchableOpacity
          // onPress={() => navigation.navigate(ScreenNames.NEW_LEADS)}
          onPress={() => {}}
          // style={styles.floating_btn}
        >
          <Image
            source={Images.home_search}
            style={{ height: height*0.05, width: width*0.12, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  in_txt: {
    fontSize: 15,
    fontWeight: "normal",
    color: "black",
    paddingHorizontal: "7%",
  },
  modalView1: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderRadius: 2,

    position: "absolute",
    alignSelf: "center",
    borderColor: "#666666",
    borderWidth: 1,
    marginTop: "33%",
    paddingVertical: "2%",
  },
  floating_btn: {
    position: "absolute",
    bottom: "10%",
    alignSelf: "flex-end",
    right: "8%",
  },
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
  modal_box_txt1: {
    fontSize: 14,
    fontFamily: "Inter-Black",
    color: "black",
    marginVertical: "4%",
    textAlign: "center",
  },

  modal_box_view: { paddingHorizontal: "6%" },
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

    // alignItems:"center"
    alignItems: "center",
    justifyContent: "center",
  },

  postal_box: {
    fontSize: 14,
    backgroundColor: Colors.MAIN_COLOR,
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    // width: "100%",
    alignSelf: "flex-end",
    fontFamily: "prima_r",
    paddingHorizontal: 15,
    borderRadius: 2,
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
    backgroundColor: "#20aed6",
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
  scrollView: {},

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

export default Edit_searches;
