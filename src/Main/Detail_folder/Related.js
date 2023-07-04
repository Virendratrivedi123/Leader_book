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
import { Pin_note, Related_page_counter, get_leads_basic_detail } from "../../Services";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";
import { Images } from "../../constant/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Related({ data }) {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
  });

  // console.log(data.d)
  const User_data = data;
  const Id = data.data.id;
  // console.log(Id)
  const [DATA, setDATA] = useState([]);
  

  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  
  const [note, setnote] = useState(data.data?.pined_note_text);
  const [n, setn] = useState("");
  const [pin_date, setpin_date] = useState("");
  
  const [modalTitle2, setModalTitle2] = useState(data?.data?.pinned_by);
  const [d, setd] = useState(icon_note == "Yes" ? 3:0);

  // console.log(note)

  useEffect(() => {
    (async () => {
      // user_data.pined_note == "Yes" ? setd(3) : setd(0);
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      const data = {
        email: d.email,
        password: d.password,
        id: Id,
      };
      get_leads_basic_detail(data)
        .then((response) => response.json())
        .then((result) => {
        
          setModalTitle2(result?.data?.lead_detail?.Lead.pinned_by?.value)
         
          setnote(result?.data?.lead_detail.Lead?.pinned_note_text?.value)
           seticon_note(result?.data?.lead_detail?.Lead.pined_note)
           setpin_date(result?.data?.lead_detail?.Lead.pinned_date?.value)
           setd(result?.data?.lead_detail?.Lead.pined_note=="Yes"?3:0)
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
        id: Id,
        password: d.password,
      };
      Pin_note(data).then((response) => {
        response.json().then((data) => {
          // console.log(data);
         
          call_api(),note.length > 0 ? setd(3):setd(0);
          setModalTitle2(result?.data?.lead_detail?.Lead.pinned_by?.value)
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const call_api = async () => {
    try {
      setLoading(true)
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      const data = {
        email: d.email,
        password: d.password,
        id: Id,
      };
      get_leads_basic_detail(data)
        .then((response) => response.json())
        .then((result) => {
         

          
          setnote(result?.data?.lead_detail?.Lead?.pinned_note_text?.value)
          seticon_note(result?.data?.lead_detail?.Lead.pined_note)
          setpin_date(result?.data?.lead_detail?.Lead.pinned_date?.value)
         
          
          setLoading(false);
        

          // setLoading(false);
        })
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      
      const data = {
        email: d.email,
        password: d.password,
        lead_id: Id,
      };
      Related_page_counter(data)
        .then((response) => response.json())
        .then((result) => {
          
          setDATA(result?.data?.related_page_counts);
         
       

          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);

  
 
  
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : DATA != null ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Page)
            }}
          >
            <View style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.circle} source={Images.notes}></Image>

                <Text style={styles.txt}>
                  {DATA?.notes?.label}
                  </Text>
              </View>

              <View style={styles.count}>
                <Text style={styles.count_txt}>{DATA?.notes?.count}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
              
                "Task_page",{ user: {
                  name: User_data.data.name,
              logo: User_data.data.name_initials,

              id: User_data.data.id,
                },
                index: data?.in,
                DATA: data?.d,})
             
            }}
          >
            <View style={styles.box}>
              <View style={styles.box1}>
                <Image style={styles.circle} source={Images.Tasks}></Image>

                <Text style={styles.txt}>{DATA?.tasks?.label}</Text>
              </View>

              <View style={styles.count}>
                <Text style={styles.count_txt}>{DATA?.tasks?.count}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Appoint_page")
            }}
          >
            <View style={styles.box}>
              <View style={styles.box1}>
                <Image
                  style={styles.circle}
                  source={Images.Appointment}
                ></Image>

                <Text style={styles.txt}>{DATA?.appointments?.label}</Text>
              </View>

              <View style={styles.count}>
                <Text style={styles.count_txt}>{DATA.appointments?.count}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.line}></View>
        </View>
      ) : (
        <View style={styles.null_txt}>
        <Text style={{fontSize: wp("6%"),width:"70%",fontFamily: "Inter-Black2",color:"#6c6c6c",textAlign:"center"}}>"There is no Related exist for this lead"</Text>
      </View>
      )}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.floating_btn}
      >
       
        { loading ? null : icon_note == "Yes" ? (
          <Image
            style={{
              width: Dimensions.get('window').width * 0.13,
                  height: Dimensions.get('window').width * 0.13,
                  resizeMode: "contain",
            }}
            source={Images.pencil_note}
          ></Image>
        ) : (
          <Image
            style={{
              width: Dimensions.get('window').width * 0.13,
                  height: Dimensions.get('window').width * 0.13,
                  resizeMode: "contain",
            }}
            source={Images.plus_note}
          ></Image>
        )}
      </TouchableOpacity>
      <View style={styles.bottom_btn}>
        <Text
          onPress={() => {
            navigation.navigate(ScreenNames.LEAD_ACTIVITY, {
              name: User_data.data.name,
              logo1: User_data.data.name_initials,

              id: User_data.data.id,
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
                            postdata(),  setModalVisible(!modalVisible)
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
                          postdata(),  setModalVisible(!modalVisible)
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
                        <Text style={{ color: "white",fontSize: wp("6%"),fontFamily: "Inter-Black4" }}>Add Note</Text>
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
                          onPress={() => (
                            setModalVisible(!modalVisible)
                            // , 
                            // setd(0), setn("")
                          )}
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
  );
}

const styles = StyleSheet.create({
  null_txt: { flex: 1, alignItems: "center", justifyContent: "center", },
  update_txt: { color: "white",fontSize: wp("6%"),fontFamily: "Inter-Black4"},
  note3: { color: "black", margin: "4%", fontSize: 14 ,fontFamily:"Inter-Black"},
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
  line2: {
    backgroundColor: "#f2f2f2",
    height: 1.5,

    width: "100%",
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
    marginTop: height*0.22,
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
    marginTop: "40%",
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
  tag: { color: "white", fontSize: 18 },
  flat: { backgroundColor: "#f2f2f2", padding: 10, marginBottom: 40 },
  input: {
    height: height * 0.25,
    margin: 12,

   
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
    alignSelf: "center",marginTop: height*0.12,
  },
  modalView2: {
    // height: height * 0.44,
    width: "90%",
    backgroundColor: "#feb6c1",
    borderRadius: 10,

    elevation: 5,
    alignSelf: "center",marginTop: height*0.12,
  },
  modalView1: {
    // height: height * 0.44,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,

    elevation: 20,
    alignSelf: "center",marginTop: height*0.12,
  },
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  bottom_btn: {
    width: "100%",
    height: height * 0.068,
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
    resizeMode: "contain",  marginLeft: "4%",marginTop:"4%"
  },
  floating_btn: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    bottom: "12%",
    right: "5%",shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.95,
    shadowRadius: 2.84,
    elevation: 5,
  },
  null_txt: { flex: 1, alignItems: "center", justifyContent: "center" },
  box1: { flexDirection: "row", alignItems: "center" },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "3%",
  },
  txt: { fontSize: 16, color: "#666666", fontFamily:"Inter-Black" },
  count_txt: {
    color: "white",
    fontSize: 12,paddingHorizontal:"0.5%",paddingVertical:"0.2%"
    
    
  },
  count: {
    backgroundColor: Colors.MAIN_icon,
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
  line2: {
    backgroundColor: "#e6e6e6",
    height: 2,
    marginVertical: "0.5%",
    width: "100%",
   
  },

  container: { flex: 1, backgroundColor: "white" },
});
