import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown';
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Keyboard,
  Modal,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";



import { Colors } from "../../../../constant/colors";
import { STYLES } from "../../../../constant/styles";
import { Images } from "../../../../constant/images";
import Header from "../../../../components/header";
import { useFonts } from 'expo-font';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Edit_Appointment_detail, Update_lead_appointment } from "../../../../Services";
import Loader from "../../../../constant/Loader";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;



function Update_Appointment() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../../../assets/fonts/Mulish-Regular.ttf'),
  });
  const navigation = useNavigation();
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
  const [com, setcom] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const route = useRoute();
  const [subject, setsubject] = useState("");
  const [notes, setnotes] = useState("");
  const[reminder_data,setreminder_data]=useState([])
  const[st_data,setst_data]=useState([])
  const[pr_data,setpr_data]=useState([])
  const [location, setlocation] = useState("");
  const [reminder, setreminder] = useState("");
  const [reminder_time, setreminder_time] = useState("");
  const [reminder_time_unit, setreminder_time_unit] = useState("");
  const [day_event, setday_event] = useState("No");
  const [time_as, settime_as] = useState("");
  const [d, setd] = useState(false);
  const [d1, setd1] = useState(false);
  const [d2, setd2] = useState(false);
  const [dt, setdt] = useState();
  const [dt3, setdt3] = useState();
  const [dt2, setdt2] = useState();



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

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        id:route?.params.id
      };

      Edit_Appointment_detail(data)
        .then((response) => response.json())
        .then((result) => {
          
          // console.log(result)
        var data= result?.data?.appointment_fields_arr
      
        setdt(data?.all_day_event?.dropdown_arr);
        setdt2(data?.reminder_time_unit?.dropdown_arr);
        setdt3(data?.show_time_as?.dropdown_arr);
         setsubject(data?.subject?.value)
         setnotes(data?.notes?.value)
         setlocation(data?.location?.value)
        settime_as(data?.show_time_as?.value)
        setreminder_time_unit(data?.reminder_time_unit?.value)
       
         setdate_time(data?.reminder_time?.value)
         setdate(data?.start_time?.value)
         setdate1(data?.end_time?.value)
         setreminder_data(data?.reminder?.dropdown_arr)
         setst_data(data?.show_time_as?.dropdown_arr)
         setpr_data(data?.reminder_time_unit?.dropdown_arr)
         setValue1(data?.reminder?.value)
        //  setValue3(data?.enable_reminder?.value)
        //  setValue4(data?.status?.value)
        //  setValue5(data?.priority?.value)
         
         
          
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
        appointment_id: route?.params?.id,
        reminder_time_unit: reminder_time_unit,
        notes: notes,
        subject: subject,
        reminder_time: reminder_time,
        reminder: value4,
        end_date: date1,
        day_event: day_event,
        start_date: date,
         lead_id:route.params.lead_id,
        location: location,
        time_as: time_as,
      };
     Update_lead_appointment(data).then((response) => {
        response.json().then((data) => {
          console.log(data)
          // Alert.alert(data.msg);
          setModalVisible5(true)
        });
      });
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Update Appointment"
        leftIcon={Images.backArrow}
        // rightIcon={Images.search}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {postdata()}}
        customRight2={true}
      />
         {loading ? (
          <Loader loading={loading} />
        ) :  (
      <ScrollView>
        <View
          style={{
            paddingHorizontal: "2%",
            marginBottom: "5%",
            // paddingStart: "15%",
          }}
        >
          <Text style={styles.name_txt}>Subject</Text>
          <TextInput
            placeholder="Enter Subject"
            style={styles.input}
              value={subject}
              onChangeText={(txt) => setsubject(txt)}
            placeholderTextColor={"#cccccc"}
          ></TextInput>

          
         

          <View style={styles.line2}></View>
          <Text style={styles.name_txt}>Location</Text>
          <TextInput
            placeholder="Enter Subject"
            style={styles.input}
              value={location}
              onChangeText={(txt) => setlocation(txt)}
            placeholderTextColor={"#cccccc"}
          ></TextInput>
<View style={styles.line2}></View>
          <Text style={styles.name_txt}>Site</Text>
          <TextInput
            placeholder="Location"
            style={styles.input}
            value={"Test2"}
            editable={false}
            // onChangeText={(txt) => setlocation(txt)}
            placeholderTextColor={"#cccccc"}
          ></TextInput>

          <View style={styles.line2}></View>
          <Text style={styles.name_txt}>All Day Event</Text>
          

<SelectDropdown
            data={dt}
            defaultValueByIndex={"0"}
          
            onSelect={(item, index) => {
              setday_event(item.value)
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
            <Image style={styles.icon2} source={Images.calender}></Image>
            <Text style={styles.name_txt2}>Start Time</Text>
          </View>
          <View style={[styles.press]}>
            <TouchableOpacity
            style={{width:"60%",}}
            onPress={() => setModalVisible(true)}>
              <TextInput
                style={{ color: "grey", fontSize: 16,fontFamily:"Inter-Black", }}
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
              style={{ marginEnd: "5%" }}
            >
              <Image style={styles.cancel} source={Images.cancel}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.calender}></Image>
            <Text style={styles.name_txt2}>End Time</Text>
          </View>

          <View style={[styles.press]}>
            <TouchableOpacity
            style={{width:"60%",}}
            onPress={() => setModalVisible2(true)}>
              <TextInput
                style={{ color: "grey", fontSize: 17,fontFamily:"Inter-Black", }}
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
              style={{ marginEnd: "5%" }}
            >
              <Image style={styles.cancel} source={Images.cancel}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.set_alarm}></Image>
            <Text style={styles.name_txt2}>Reminder</Text>
          </View>
          
          <SelectDropdown
            data={reminder_data}
            defaultValueByIndex={value1}
            // defaultValue={'India'}
            onSelect={(selectedItem, index) => {
              setreminder(selectedItem.label)
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
            <Image style={styles.icon2} source={""}></Image>
            <Text style={styles.name_txt2}>Time Unit</Text>
          </View>
          <SelectDropdown
            data={dt2}
            defaultValueByIndex={"0"}
          
            onSelect={(item, index) => {
              setreminder_time_unit(item.value)
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
            <Image style={styles.icon2} source={""}></Image>
            <Text style={styles.name_txt2}>Show Time As</Text>
          </View>
          <SelectDropdown
            data={dt3}
            defaultValueByIndex={"0"}
          
            onSelect={(item, index) => {
              settime_as(item.value)
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
            <Image style={styles.icon2} source={Images.task_note}></Image>
            <Text style={styles.name_txt2}>Notes</Text>
          </View>
          <TextInput
            // placeholder="Reminder"
            style={styles.input2}
              value={notes}
              onChangeText={(txt) => setnotes(txt)}
          ></TextInput>
          <View style={styles.line3}></View>
        </View>
      </ScrollView>)}
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
      <View style={styles.centeredView_box}>
          <Modal
            transparent={true}
            visible={modalVisible5}
            onRequestClose={() => {
              
              setModalVisible5(!modalVisible5);
            }}
          >
            <View style={styles.centeredView_box}>
              <View style={styles.modalView_box}>
                <Text style={styles.textStyle1_box}>Lead Booker</Text>
                <Text style={styles.textStyle2_box}>Appointment has been updated successfully.</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                   
                    width: "100%",
                  }}
                ></View>
                <Pressable
                  style={{  }}
                  onPress={() => {
                    setModalVisible5(!modalVisible5),navigation.pop(2)
                  }}
                >
                  <Text style={styles.textStyle3_box}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
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
  selectedTextStyle: { color: "#8c8c8c", fontFamily: "Inter-Black4" },
  icon2: {
    marginTop: "8%",
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginHorizontal: "2.5%",
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
    marginStart: "14%",
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
    fontSize: wp("5%"),
    paddingTop: "5%",
    paddingStart: "12%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black4",
  },
  name_txt2: {
    fontSize: wp("5%"),
    marginTop: "5%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black4",
  },
  input: {
    color: "#8c8c8c",

    fontSize: wp("5%"),
    marginTop: "3%",
    marginStart: "12%",
    fontFamily: "Inter-Black4",
  },
  press: {
    marginStart: "12.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input3: {
    color: "#8c8c8c",

    fontSize: 17,
    marginStart: "14%",
    fontFamily: "Inter-Black4",
  },
  input2: {
    color: "#8c8c8c",

    fontSize: 17,
    marginStart: "13%",
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
  dropdown1BtnTxtStyle: {fontSize: wp("5%"), color: "#6c6c6c", fontFamily: "Inter-Black4", textAlign: 'left',marginStart:"9%",},
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
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    // elevation: 20,
  },
  textStyle1_box: {
    fontSize: wp("5.41%"),
    fontFamily: "Inter-Black2",
    marginTop: "7%",
  },
  textStyle2_box: {
    fontSize: wp("4%"),
    textAlign: "center",
    width: "80%",
    marginBottom: "7%",
    marginTop: "1%",
    color: "#262626",
  },
  textStyle3_box: {
    fontSize: wp("5.31%"),
    color: "#2b92ee",
    fontFamily: "Inter-Black",
    marginVertical: "5%",
  },
});

export default Update_Appointment;
