import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";
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
import { ScrollView } from "react-native-gesture-handler";
import { ScreenNames } from "../../constant/ScreenNames";
import { STYLES } from "../../constant/styles";
import Header from "../header";
import { Images } from "../../constant/images";
import { Colors } from "../../constant/colors";
import { useFonts } from 'expo-font';
import Header2 from "../header2";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const dt = [
  { label: "ok", value: "1" },
  { label: "okay", value: "2" },
];

function Add_appointment() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
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
  const [com, setcom] = useState(false);

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
  return (
    <SafeAreaView style={styles.container}>
      <Header2
        label="Add Appointment"
        leftIcon={Images.backArrow}
        // rightIcon={Images.search}
        onLeftPress={() => navigation.navigate(ScreenNames.APPOINTMENTS)}
        onRightPress={() => {}}
        customRight={true}
      />
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
            placeholder="Subject"
            style={styles.input}
            //   value={text_sign}
            //   onChangeText={(txt) => setText_sign(txt)}
            placeholderTextColor={"#cccccc"}
          ></TextInput>

          <View style={styles.line2}></View>
          <Text style={styles.name_txt}>Location</Text>
          <TextInput
            placeholder="Location"
            style={styles.input}
            //   value={text_sign}
            //   onChangeText={(txt) => setText_sign(txt)}
            placeholderTextColor={"#cccccc"}
          ></TextInput>

          <View style={styles.line2}></View>
          <Text style={styles.name_txt}>Site</Text>
          <Dropdown
            style={[styles.dropdown2]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={dt}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={""}
            value={value1}
            //   onFocus={() => setIsFocus(true)}
            //   onBlur={() => setIsFocus(false)}
            onChange={(i) => {
              setValue1(i.value);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={{ paddingHorizontal: "5%" }}
                color="#003366"
                name="downsquare"
                size={30}
              />
            )}
          />
          <View style={styles.line2}></View>
          <Text style={styles.name_txt}>Search Lead</Text>
          <TextInput
            placeholder="Search Lead"
            style={styles.input}
            //   value={text_sign}
            //   onChangeText={(txt) => setText_sign(txt)}
            placeholderTextColor={"#cccccc"}
          ></TextInput>
          <View style={styles.line2}></View>
          <Text style={styles.name_txt}>Selected Lead</Text>
          <TextInput
            // placeholder="Subject"
            style={styles.input}
            //   value={text_sign}
            //   onChangeText={(txt) => setText_sign(txt)}
          ></TextInput>

          <View style={styles.line2}></View>
          <Text style={styles.name_txt}>All Day Event</Text>
          <Dropdown
            style={[styles.dropdown2]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={dt}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={""}
            value={value1}
            //   onFocus={() => setIsFocus(true)}
            //   onBlur={() => setIsFocus(false)}
            onChange={(i) => {
              setValue1(i.value);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={{ paddingHorizontal: "5%" }}
                color="#003366"
                name="downsquare"
                size={30}
              />
            )}
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
                style={{ color: "grey", fontSize: 16,fontFamily:"Inter-Black4", }}
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
                style={{ color: "grey", fontSize: 16,fontFamily:"Inter-Black4", }}
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

          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={dt}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={""}
            value={value3}
            //   onFocus={() => setIsFocus(true)}
            //   onBlur={() => setIsFocus(false)}
            onChange={(i) => {
              setValue3(i.value);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={{ paddingHorizontal: "5%" }}
                color="#003366"
                name="downsquare"
                size={30}
              />
            )}
          />
          
          

         
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            {/* <Image style={styles.icon2} source={Images.graph}></Image> */}
            <Text style={styles.name_txt}>Time Unit</Text>
          </View>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={dt}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={""}
            value={value4}
            //   onFocus={() => setIsFocus(true)}
            //   onBlur={() => setIsFocus(false)}
            onChange={(i) => {
              setValue4(i.value);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={{ paddingHorizontal: "5%" }}
                color="#003366"
                name="downsquare"
                size={30}
              />
            )}
          />
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            {/* <Image style={styles.icon2} source={Images.warning}></Image> */}
            <Text style={styles.name_txt}>Show Time As</Text>
          </View>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={dt}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={""}
            value={value5}
            //   onFocus={() => setIsFocus(true)}
            //   onBlur={() => setIsFocus(false)}
            onChange={(i) => {
              setValue5(i.value);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={{ paddingHorizontal: "5%" }}
                color="#003366"
                name="downsquare"
                size={30}
              />
            )}
          />

          
          <View style={styles.line2}></View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.icon2} source={Images.task_note}></Image>
            <Text style={styles.name_txt2}>Notes</Text>
          </View>
          <TextInput
            // placeholder="Reminder"
            style={styles.input2}
            //   value={text_sign}
            //   onChangeText={(txt) => setText_sign(txt)}
          ></TextInput>
          <View style={styles.line3}></View>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  done: { flex: 0.4, fontSize: 18, fontFamily:"Inter-Black2" },
  date: { flex: 0.8, fontSize: 14, color: "#cccccc",fontFamily:"Inter-Black4" },
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
  textStyle1: { fontSize: 17, fontFamily:"Inter-Black2" },
  textStyle2: { fontSize: 14 },fontFamily:"Inter-Black4",
  textStyle3: { fontSize: 17, color: "blue",fontFamily:"Inter-Black4" },

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
  selectedTextStyle: { color: "#8c8c8c",fontFamily:"Inter-Black4" },
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
    height: "2.6%",
    marginStart: "14%",
  },
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
    fontSize: 16,
    paddingTop: "5%",
    paddingStart: "12%",
    color: Colors.blue_txt,
    fontFamily:"Inter-Black4"
  },
  name_txt2: { fontSize: 16, marginTop: "5%", color: Colors.blue_txt,fontFamily:"Inter-Black4" },
  input: {
    color: "#8c8c8c",

    fontSize: 16,
    marginTop: "3%",
    marginStart: "12%",fontFamily:"Inter-Black4"
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
    marginStart: "14%",fontFamily:"Inter-Black4"
  },
  input2: {
    color: "#8c8c8c",

    fontSize: 17,
    marginStart: "14%",fontFamily:"Inter-Black4"
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
});

export default Add_appointment;
