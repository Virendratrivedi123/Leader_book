import React, { useState, useEffect } from "react";
import { useFonts } from 'expo-font';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { Entypo } from "@expo/vector-icons";
import Loader from "../../constant/Loader";
import { Related_page_counter } from "../../Services";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";
import { Images } from "../../constant/images";

export default function Related({ data }) {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const User_data = data;
  const Id = data.id;
  const [DATA, setDATA] = useState([]);
  const [t, sett] = useState("");
  const [tc, settc] = useState("");
  const [a, seta] = useState("");
  const [ac, setac] = useState("");
  const [notes, setnotes] = useState("");
  const [nc, setnc] = useState("");

  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [d, setd] = useState(data?.pined_note == "Yes" ? 3 : 0);
  const [note, setnote] = useState(data?.pined_note_text);
  const [n, setn] = useState("");
  const [pin_date] = useState(data?.pinned_date);
  const [icon_note] = useState(data?.pined_note);
  const [modalTitle2] = useState(data?.pinned_by);

  // console.log(note)

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        lead_id: Id,
      };
      Related_page_counter(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.data.related_page_counts)
          setDATA(result?.data?.related_page_counts);
          sett(result?.data?.related_page_counts.tasks.label);
          settc(result?.data?.related_page_counts.tasks.count);
          seta(result?.data?.related_page_counts.appointments.label);
          setac(result?.data?.related_page_counts.appointments.count);
          setnotes(result?.data?.related_page_counts.notes.label);
          setnc(result?.data?.related_page_counts.notes.count);

          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);
  // console.log(t.length)
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : t && t.length > 0 ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Page, {
                name: notes,
                n: ScreenNames.NPage,
              });
            }}
          >
            <View style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.circle} source={Images.notes}></Image>

                <Text style={styles.txt}>{notes}</Text>
              </View>

              <View style={styles.count}>
                <Text style={styles.count_txt}>{nc}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Page, {
                name: t,
                n: ScreenNames.TPage,
              });
            }}
          >
            <View style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.circle} source={Images.Tasks}></Image>

                <Text style={styles.txt}>{t}</Text>
              </View>

              <View style={styles.count}>
                <Text style={styles.count_txt}>{tc}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Page, {
                name: a,
                n: ScreenNames.APage,
              });
            }}
          >
            <View style={styles.box}>
              <View style={styles.box1}>
                <Image
                  style={styles.circle}
                  source={Images.Appointment}
                ></Image>

                <Text style={styles.txt}>{a}</Text>
              </View>

              <View style={styles.count}>
                <Text style={styles.count_txt}>{ac}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.line}></View>
        </View>
      ) : (
        <View style={styles.null_txt}>
          <Text>"There is no related exist for this lead"</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.floating_btn}
      >
        {loading ? null : icon_note == "Yes" ? (
          <Image
            style={{
              width: Dimensions.get('window').width * 0.18,
                  height: Dimensions.get('window').width * 0.18,
                  resizeMode: "contain",
            }}
            source={Images.pencil_box}
          ></Image>
        ) : (
          <Image
            style={{
              width: Dimensions.get('window').width * 0.18,
                  height: Dimensions.get('window').width * 0.18,
                  resizeMode: "contain",
            }}
            source={Images.plus_box}
          ></Image>
        )}
      </TouchableOpacity>
      <View style={styles.bottom_btn}>
        <Text
          onPress={() => {
            navigation.navigate(ScreenNames.LEAD_ACTIVITY, {
              name: User_data.name,
              logo1: User_data.name_initials,

              id: User_data.id,
            });
          }}
          style={{ color: "white", fontSize: 20,fontFamily:"Inter-Black" }}
        >
          View Lead Activity
        </Text>
      </View>
      {d == 1 ? (
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
                  onPress={() => (setModalVisible(!modalVisible), setd(0))}
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
                      setd(3);
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
            Alert.alert("Modal has been closed.");
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
                    setd(3);
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
                  setd(1);
                }}
                style={styles.add_note}
              >
                <Text style={{ color: "white" }}>Add Note</Text>
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
                    setModalVisible(!modalVisible)
                    // , setd(0), setn("")
                  )}
                >
                  <Entypo name="cross" size={30} color="black" />
                </Pressable>
              </View>
              <Text style={styles.date}>{pin_date}</Text>
              <Text style={styles.note4}>{note}</Text>
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
  );
}

const styles = StyleSheet.create({
  update_txt: { color: "white", fontSize: 17,fontFamily:"Inter-Black" },
  note4: { color: "black", margin: "4%", fontSize: 14 ,fontFamily:"Inter-Black"},
  date: {
    color: "black",
    marginLeft: "4%",
    marginVertical: "1%",
    fontSize: 15,fontFamily:"Inter-Black"
  },
  set: {
    flexDirection: "row",
    padding: "3%",
    alignItems: "center",
    justifyContent: "center",
  },
  circle_box: {
    flexDirection: "row",
    paddingVertical: "0%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flat_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  line2: {
    backgroundColor: "#f2f2f2",
    height: 1.5,

    width: "100%",
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
  modal_btn_txt: { color: "white", fontSize: 17,fontFamily:"Inter-Black" },
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
    marginTop: height*0.12,
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
    height: height * 0.057,
    width: width * 0.2,
    resizeMode: "contain",
  },
  tag_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tag_touch: { alignItems: "center" },
  tag: { color: "white", fontSize: 18 ,fontFamily:"Inter-Black"},
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
    fontWeight: "500",fontFamily:"Inter-Black"
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
  bottom_btn: {
    width: "100%",
    height: height * 0.065,
    backgroundColor: Colors.MAIN_COLOR,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  note1: {
    height: height * 0.1,
    width: width * 0.2,
    resizeMode: "contain",
  },
  note3: {
    height: height * 0.085,
    width: width * 0.2,
    resizeMode: "contain",
  },
  floating_btn: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    bottom: "10%",
    right: "1%",
  },
  null_txt: { flex: 1, alignItems: "center", justifyContent: "center" },
  box1: { flexDirection: "row", alignItems: "center" },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "2%",
  },
  txt: { fontSize: 16, color: "#666666", fontFamily:"Inter-Black" },
  count_txt: {
    color: "white",
    fontSize: 12,
    
    
  },
  count: {
    backgroundColor: Colors.MAIN_COLOR,
    // height: height * 0.02,
    // width: width * 0.085,
    borderRadius: 10,paddingHorizontal:"3%"
  },
  circle: {
    width: Dimensions.get('window').width * 0.12,
    height: Dimensions.get('window').width * 0.12,

borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    marginRight: 20,
   
    backgroundColor: "#009973",
   
    alignItems: "center",
    justifyContent: "center",
  },
  circle1: {
    height: height * 0.055,
    marginRight: 20,
    width: width * 0.12,
    backgroundColor: "#66ccff",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  circle2: {
    height: height * 0.055,
    marginRight: 20,
    width: width * 0.12,
    backgroundColor: "#e6e6e6",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  line: {
    backgroundColor: "#e6e6e6",
    height: 2,
    marginVertical: "0.5%",
    width: "100%",
    marginStart: "19%",
  },

  container: { flex: 1, backgroundColor: "white" },
});
