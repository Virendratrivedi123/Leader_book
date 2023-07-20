import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,  KeyboardAvoidingView,Pressable
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


import { Colors } from "../../../../constant/colors";

import { Images } from "../../../../constant/images";
import Header from "../../../../components/header";
import { useFonts } from "expo-font";
import { Create_lead_task, add_lead_task } from "../../../../Services";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;




function Tpage() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../../../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [istimePickerVisible, settimePickerVisibility] = useState(false);
  const [date, setdate] = useState("");
  const [date1, setdate1] = useState("");
  const [date_time, setdate_time] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [modalVisible6, setModalVisible6] = useState(false);
  const [com, setcom] = useState(false);
  const [subject, setsubject] = useState("");
  const [notes, setnotes] = useState("");
  const [percentage, setpercentage] = useState("");
  const scroll = React.createRef()
  const [d1, setd1] = useState(false);
  const [d2, setd2] = useState(false);
  const [d3, setd3] = useState(false);
  const [er,seter]=useState([])
  const [st_data,setst_data]=useState([])
  const [pr_data,setpr_data]=useState([])

  const [loading, setLoading] = React.useState(true);
  const [DATA, setDATA] = useState([]);
  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        id:route.params.id
      };

     Create_lead_task(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          // result?.data?.task_detail.map((i)=>{
          //   return(setDATA(i.CrmTask))
          // })
          var a = result?.data?.create_lead_task_detail
          seter(a.enable_reminder?.dropdown_arr)
          setst_data(a.status?.dropdown_arr)
          setpr_data(a.priority?.dropdown_arr)
       
         
          // setDATA(result?.data?.task_detail);

          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)
        
          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);

  const showDatePicker2 = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility(false);
  };

  const time_date_confirm = (i) => {
    setdate_time(
      moment(i).format("YYYY-MM-DD ") +
        moment().utcOffset("+05:30").format(" HH:mm") +
        ":00"
    );

    hideDatePicker2();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const start_date_confirm = (i) => {
    setdate(moment(i).format("YYYY-MM-DD "));

    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const End_date_confirm = (i) => {
    setdate1(moment(i).format("YYYY-MM-DD "));

    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  // console.log(date)
  const showtimePicker = () => {
    settimePickerVisibility(true);
  };

  const hidetimePicker = () => {
    settimePickerVisibility(false);
  };

  const handleConfirm2 = (date) => {
    // console.warn("A date has been picked: ", date);
    hidetimePicker();
  };

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        id: route?.params?.id,
        rt: date_time,
        notes: notes,
        subject: subject,
        due_date: date1,
        priority: value5,
        cp: percentage,
        er: value3,
        start_date: date,
        status: value4,
      };
      add_lead_task(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          // Alert.alert(data.msg);
          setModalVisible6(true)
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(value3,value4,value5)
  
  
  return (
    <SafeAreaView style={styles.container}>

      <Header
        label="New Task"
        leftIcon={Images.backArrow}
        // rightIcon={Images.search}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {
          if(subject.length <1 || date.length < 1 || date1.length < 1)
        { setModalVisible5(true)}
        if(subject.length >0 && date.length > 0 && date1.length >0)
        { postdata()}
       
        }}
        customRight={true}
      />
        {loading ? (
          <Loader loading={loading} />
        ) :
      <KeyboardAvoidingView
          // keyboardVerticalOffset={height + 47}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ }}
          enabled
        >
         
      <ScrollView
      ref={scroll}
      >
        <View
          style={{
            paddingHorizontal: "2%",
            marginBottom: "30%",
            // paddingStart: "15%",
          }}
        >
          <Text style={styles.name_txt}>Subject</Text>
          <TextInput
            placeholder="Enter Subject"
            style={styles.input}
            //   value={text_sign}
              onChangeText={(txt) => setsubject(txt)}
            placeholderTextColor={"#cccccc"}
          ></TextInput>

        
          
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.calender}></Image>
            <Text style={styles.name_txt2}>Start Date</Text>
          </View>
          <View style={[styles.press]}>
            <TouchableOpacity
              style={{ width: "60%",flex:0.95 }}
              onPress={() => setModalVisible(true)}
            >
              <TextInput
                style={{
                  color: "grey",
                  fontSize: wp("5%"),
                  fontFamily: "Inter-Black4",
                }}
                placeholder={"Start Date"}
                showSoftInputOnFocus={false}
                // editable={false}
                value={date}
                onPressIn={() => setModalVisible(true)}
                placeholderTextColor={"#cccccc"}
              ></TextInput>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setdate("");
              }}
              style={{  }}
            >
              <Image style={styles.cancel} source={Images.cancel}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.calender}></Image>
            <Text style={styles.name_txt2}>Due Date</Text>
          </View>

          <View style={[styles.press]}>
            <TouchableOpacity
              style={{ width: "60%" ,flex:0.95}}
              onPress={() => setModalVisible2(true)}
            >
              <TextInput
                style={{
                  color: "grey",
                  fontSize: wp("5%"),
                  fontFamily: "Inter-Black4",
                }}
                placeholder={"Due Date"}
                showSoftInputOnFocus={false}
                // editable={false}
                value={date1}
                onPressIn={() => setModalVisible2(true)}
                placeholderTextColor={"#cccccc"}
              ></TextInput>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setdate1("");
              }}
              style={{ }}
            >
              <Image style={styles.cancel} source={Images.cancel}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.set_alarm}></Image>
            <Text style={styles.name_txt2}>Enable Reminder</Text>
          </View>
          <SelectDropdown
            data={er}
            defaultValueByIndex={0}
          
            onSelect={(item, index) => {
              setValue3(item.label)
            }}
           
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.label;
            }}
            rowTextForSelection={(item, index) => {
              return item.label;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return  <AntDesign
              style={styles.icon}
              color="#003366"
              name="downsquare"
              size={30}
            />
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            dropdownOverlayColor="rgba(52, 52, 52, 0)"
          />
        
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.clock_circular}></Image>
            <Text style={styles.name_txt2}>Reminder Time</Text>
          </View>

          <View style={[styles.press]}>

            <TextInput
             style={{flex:0.95,color: "grey",
             fontSize: wp("5%"),
             fontFamily: "Inter-Black4",}}
              placeholder={"Reminder Date and Time"}
              placeholderTextColor={"#cccccc"}
              caretHidden={true}
              showSoftInputOnFocus={false}
                // editable={false}
                value={date_time}
                onPressIn={() => {scroll.current.scrollTo({x: 0, y: 180, animated: true}),setModalVisible3(true)}}
            >

            </TextInput>
            <TouchableOpacity
              onPress={() => {
                setdate_time("");
              }}
              style={{ }}
            >
              <Image style={styles.cancel} source={Images.cancel}></Image>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ width: "80%" }}
              
            > */}
              {/* <TextInput
                style={{
                  color: "grey",
                  fontSize: wp("5%"),
                  fontFamily: "Inter-Black4",
                }}
               caretHidden={true}
                placeholder={"Reminder Date and Time"}
                showSoftInputOnFocus={false}
                // editable={false}
                value={date_time}
                onPressIn={() => {scroll.current.scrollTo({x: 0, y: 180, animated: true}),setModalVisible3(true)}}
                placeholderTextColor={"#cccccc"}
              ></TextInput> */}
            
            {/* <TouchableOpacity
              onPress={() => {
                setdate_time("");
              }}
              style={{ marginEnd: "5%" }}
            >
              <Image style={styles.cancel} source={Images.cancel}></Image>
            </TouchableOpacity> */}
          </View>
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.graph}></Image>
            <Text style={styles.name_txt2}>Status</Text>
          </View>
          <SelectDropdown
            data={st_data}
            defaultValueByIndex={"0"}
            // defaultValue={'India'}
            onSelect={(item, index) => {
              setValue4(item.label)
            }}
           
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.label;
            }}
            rowTextForSelection={(item, index) => {
              return item.label;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return  <AntDesign
              style={styles.icon}
              color="#003366"
              name="downsquare"
              size={30}
            />
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            dropdownOverlayColor="rgba(52, 52, 52, 0)"
          />
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.warning}></Image>
            <Text style={styles.name_txt2}>Priority</Text>
          </View>
          <SelectDropdown
            data={pr_data}
            defaultValueByIndex={"0"}
            // defaultValue={'India'}
            onSelect={(item, index) => {
              setValue5(item.label)
            }}
           
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.label;
            }}
            rowTextForSelection={(item, index) => {
              return item.label;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return  <AntDesign
              style={styles.icon}
              color="#003366"
              name="downsquare"
              size={30}
            />
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            dropdownOverlayColor="rgba(52, 52, 52, 0)"
          />
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.percentage}></Image>
            <Text style={styles.name_txt2}>Complete(%)</Text>
          </View>
          <TextInput
            // placeholder="Reminder"
            style={styles.input2}
            keyboardType="number-pad"
            //   value={text_sign}
              onChangeText={(txt) => setpercentage(txt)}
          ></TextInput>
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.task_note}></Image>
            <Text style={styles.name_txt2}>Notes</Text>
          </View>
          <TextInput
            // placeholder="Reminder"
            style={styles.input2}
            //   value={text_sign}
              onChangeText={(txt) => setnotes(txt)}
          ></TextInput>
          <View style={styles.line3}></View>
      
        </View>
      </ScrollView>
      </KeyboardAvoidingView>}
      {/* {com ? (
        <View
          style={{ height: 150, width: "100%", backgroundColor: "red" }}
        ></View>
      ) : null} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        avoidKeyboard={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modal_top}>
              <Text style={{ flex: 0.9 }}></Text>
              <Text style={styles.date}>Start Date</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.done}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.modal_btn}
                onPress={showDatePicker}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {moment().utcOffset("+05:30").format("DD-MMM-YYYY ")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modal_btn}
                onPress={showtimePicker}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {moment().utcOffset("+05:30").format(" hh:mm a")}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={start_date_confirm}
                onCancel={hideDatePicker}
                pickerStyleIOS
              />
              <DateTimePickerModal
                isVisible={istimePickerVisible}
                mode="time"
                onConfirm={handleConfirm2}
                onCancel={hidetimePicker}
                pickerStyleIOS
                pickerComponentStyleIOS
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modal_top}>
              <Text style={{ flex: 0.9 }}></Text>
              <Text style={styles.date}>Start Date</Text>
              <TouchableOpacity
                onPress={() => setModalVisible2(!modalVisible2)}
                style={styles.done}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.modal_btn}
                onPress={showDatePicker}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {moment().utcOffset("+05:30").format("DD-MMM-YYYY ")}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={End_date_confirm}
                onCancel={hideDatePicker}
                pickerStyleIOS
              />
            </View>
          </View>
        </View>
      </Modal>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modal_top}>
              <Text style={{ flex: 0.9 }}></Text>
              <Text style={styles.date}>Start Date</Text>
              <TouchableOpacity
                onPress={() => setModalVisible3(!modalVisible3)}
                style={styles.done}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.modal_btn}
                onPress={showDatePicker2}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {moment().utcOffset("+05:30").format("DD-MMM-YYYY ")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modal_btn}
                onPress={showtimePicker}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {moment().utcOffset("+05:30").format(" hh:mm a")}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={time_date_confirm}
                onCancel={hideDatePicker2}
                pickerStyleIOS
              />
              <DateTimePickerModal
                isVisible={istimePickerVisible}
                mode="time"
                onConfirm={handleConfirm2}
                onCancel={hidetimePicker}
                pickerStyleIOS
                pickerComponentStyleIOS
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
          transparent={true}
          visible={modalVisible6}
          onRequestClose={() => {
            setModalVisible5(!modalVisible6);
          }}
        >
          <View style={styles.centeredView_box}>
            <View style={styles.modalView_box}>
              <Text style={styles.textStyle1_box}>Lead Booker</Text>
              <Text style={styles.textStyle2_box}>
                Task has been added successfully.
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
                  setModalVisible6(!modalVisible6),navigation.pop(1)
                }}
              >
                <Text style={styles.textStyle3_box}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal><Modal
        transparent={true}
        visible={modalVisible5}
        onRequestClose={() => {
          setModalVisible5(!modalVisible5);
        }}
      >
        <View style={styles.centeredView_box}>
          <View style={styles.modalView_box}>
            <Text style={styles.textStyle1_box}>Lead Booker</Text>
            {subject.length < 1 ? ( <Text style={styles.textStyle2_box}>
             Enter subject
            </Text>): date.length <1 ? ( <Text style={styles.textStyle2_box}>
             Select Start Date
            </Text>): date1.length <1 ? ( <Text style={styles.textStyle2_box}>
             Select End Date
            </Text>):null}
           
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
                setModalVisible5(!modalVisible5)
              }}
            >
              <Text style={styles.textStyle3_box}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  done: { flex: 0.4, fontSize: 18, fontFamily: "Inter-Black2" },
  date: {
    flex: 0.8,
    fontSize: 14,
    color: "#cccccc",
    fontFamily: "Inter-Black4",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  modal_top: {
    flexDirection: "row",
    height: "13%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle1: { fontSize: 17, fontFamily: "Inter-Black2" },
  textStyle2: { fontSize: 14 },
  fontFamily: "Inter-Black4",
  textStyle3: { fontSize: 17, color: "blue", fontFamily: "Inter-Black4" },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
    marginBottom: -20,
  },
  modalView: {
    height: "50%",

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
  floating_btn: {
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
    alignItems: "center",

    position: "absolute",
    bottom: "0%",

    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
    marginBottom: -20,
    height: "50%",
    width: "100%",
  },
  selectedTextStyle: { color: Colors.txt, fontFamily: "Inter-Black4",fontSize: wp("5.5%") },
  icon2: {
    marginTop: "8%",
    height: hp("4.21%"),
     width: wp("6.58%"),
     resizeMode: "contain",
    marginStart: "3%",marginEnd:"3.5%"
  },
  cancel: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  icon4: { marginTop: "8%", flex: 0.15, fontSize: 28, marginStart: "-1%" },
  icon3: {
    marginTop: "8%",
    flex: 0.2,
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  icon5: { marginTop: "8%", flex: 0.17, fontSize: 22 },
  icon_notes: {},
  dropdown: {
  
    color: Colors.txt,
    paddingHorizontal: "2%",
    fontSize: wp("5%"),
    height: height * 0.05,
    borderRadius: 6,
    fontFamily: "Inter-Black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",width:"86%",marginStart:"12%"
   
  },
  dropdown_txt: { fontSize: wp("5%"), color: "#6c6c6c", fontFamily: "Inter-Black4" },
  dropdown2: {
    height: "2.6%",
    marginStart: "12%",
    marginTop: "5%",
  },
  line: {
    backgroundColor: "grey",
    height: 1,
    marginTop: "2%",

    width: "90%",
    marginStart: "14%",
  },
  line3: {
    backgroundColor: "grey",
    height: 1,

    width: "86%",
    marginStart: "12%",
    marginTop: "8%",
  },
  line2: {
    backgroundColor: "grey",
    height: 1,

    width: "86%",
    marginStart: "12%",
    marginTop: "1%",
  },
  name_txt: {
  
    paddingTop: "5%",
    marginStart: "13.5%",
    color: Colors.blue_txt,
    fontSize: wp("5%"),
                  fontFamily: "Inter-Black4",
  },
  name_txt2: {
   
    marginTop: "5%",
    color: Colors.blue_txt,
    fontSize: wp("5%"),
                  fontFamily: "Inter-Black4",
  },
  input: {
    color: "#666666",

    fontSize: wp("5%"),
    fontFamily: "Inter-Black4",
    marginTop: "3%",
    marginStart: "13.5%",
   
  },
  press: {
    color: "#8c8c8c",

   

    marginStart: "13.5%",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    
  },
  input3: {
    color: "#8c8c8c",
    fontSize: wp("5%"),
   
    marginStart: "14%",
    fontFamily: "Inter-Black4",
  },
  input2: {
    color: "#8c8c8c",

    fontSize: wp("5%"),
    marginStart: "14%",
    fontFamily: "Inter-Black4",
  },

  modal_btn: {
    backgroundColor: "#d9d9d9",

    height: height * 0.05,
    width: width * 0.35,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "15%",
    alignItems: "center",
    marginEnd: "2%",
  },
  dropdown1BtnStyle: {
    width: '100%',
     paddingHorizontal:"3.8%",marginBottom:"-3%",backgroundColor:"transparent"
    
  },
  dropdown1BtnTxtStyle: {fontSize: wp("5%"), color: "#6c6c6c", fontFamily: "Inter-Black4", textAlign: 'left',marginStart:"11%",},
  dropdown1DropdownStyle: { backgroundColor: "white",
  color: Colors.txt,
  paddingHorizontal: "2%",
  fontSize: wp("5%"),
  height: height * 0.13,
  borderRadius: 6,
  fontFamily: "Inter-Black",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",width:"80%",marginStart:"12%",marginTop:Platform.OS =="ios"?0:"-10%"},
  dropdown1RowStyle: { borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

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
    alignSelf: "center",alignItems:"center",justifyContent:"center",
    // elevation: 20,
  },
  textStyle1_box: { fontSize: wp("5.41%"), fontFamily:"Inter-Black2",marginTop:"7%" },
  textStyle2_box: { fontSize: wp("4%") ,textAlign:"center",width:"80%",marginBottom:"7%",marginTop:"1%",color:"#262626",},
  textStyle3_box: { fontSize: wp("5.31%"), color: "#2b92ee",fontFamily:"Inter-Black", marginVertical: "5%",},

});

export default Tpage;
