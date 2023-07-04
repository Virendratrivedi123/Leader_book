import React, { useEffect, useState } from "react";

import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { STYLES } from "../constant/styles";
import { ScreenNames } from "../constant/ScreenNames";
import Loader from "../constant/Loader";
import { New_lead_detail, New_lead_detail_update } from "../Services";
import Header from "../components/header";
import { Images } from "../constant/images";
import { Colors } from "../constant/colors";
import { useFonts } from "expo-font";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
function New_lead() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setdata] = useState([]);
  const [Assigned_value, setAssigned_value] = useState(0);
  const [type_value, settype_value] = useState(0);
  const [status_value, setstatus_value] = useState(0);
  const [follow_value, setfollow_value] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [First_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [company, setCompany] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [state, setstate] = React.useState("");
  const [city, setCity] = React.useState("");
  const [comments, setcomments] = React.useState("");
  const [logged_date, setlogged_date] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [follow, setfollow] = React.useState("");
  const [status, setstatus] = React.useState("");
  const [type, settype] = React.useState("");
  const [assign, setassign] = React.useState("");
  const [id, setId] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    (async () => {
      // const user_data = await AsyncStorage.getItem("user_data");
      // const Follow_data = await AsyncStorage.getItem("Follow");
      // const status_data = await AsyncStorage.getItem("Status");
      // const assign_data = await AsyncStorage.getItem("Assign");
      // const type_data = await AsyncStorage.getItem("Type");
      // const d = JSON.parse(user_data);
      // const F = JSON.parse(Follow_data);
      // const S = JSON.parse(status_data);
      // const T = JSON.parse(type_data);
      // const A = JSON.parse(assign_data);
      // setfollow(F);
      // setassign(A);
      // settype(T);
      // setstatus(S);
      // // console.log(dr)
      // const data = {
      //   email: d.email,
      //   password: d.password,
      //   id: route.params.id,
      // };
      // New_lead_detail(data)
      //   .then((response) => response.json())
      //   .then((result) => {
      //     console.log(result.data.lead_detail.Lead)
      // var Array = [];

      // var item = result.data.lead_detail.Lead;
      // setFirst_name(item?.first_name?.field_type);
      // setLast_name(item?.last_name?.field_type);
      // setEmail(item?.email?.field_type);
      // setCompany(item?.company_name?.field_type);
      // setPhone(item?.phone?.field_type);
      // setAddress(item?.address?.field_type);
      // setCity(item?.city?.field_type);
      // setstate(item?.state?.field_type);
      // setlogged_date(item?.new_grouped_date?.field_type);
      // setcomments(item?.comments?.field_type);
      // Array.push(item);
      // setdata(Array);
      // setLoading(false);
      //   })
      //   .catch((error) => console.log("error", error));
      const user_data = await AsyncStorage.getItem("user_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
      };
      New_lead_detail(data)
        .then((response) => response.json())
        .then((result) => {
          var Array = [];

          var item = result.data.lead_detail.Lead;

          setFirst_name(item?.first_name?.field_type);
          setLast_name(item?.last_name?.field_type);
          setEmail(item?.email?.field_type);
          setCompany(item?.company_name?.field_type);
          setPhone(item?.phone?.field_type);
          setAddress(item?.address?.field_type);
          setAssigned_value(item?.user_id?.dropdown_arr[0].label);
          settype(item?.lead_type_id?.dropdown_arr[0].label);
          setCity(item?.city?.field_type);
          setstate(item?.state?.field_type);
          setstatus_value(item?.is_grl_crea_lead?.dropdown_arr[0].label);
          setfollow_value(item?.month?.dropdown_arr[17].label);
          setcomments(item?.comments?.field_type);
          Array.push(item);
          setdata(Array);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  // console.log(phone)

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        first_name: First_name,
        last_name: last_name,
        lead_email: email,
        phone: phone2,
        is_grl_crea_lead: status_value,
        comments: comments,
        month: follow_value,
        state: state,
        address: address,
        city: city,

        company_name: company,
        address: address,

        password: d.password,
        email: d.email,
      };
      New_lead_detail_update(data).then((response) => {
        response.json().then((data) => {
          // Alert.alert(data.msg);
          navigation.navigate(ScreenNames.MAIN_SCREEN);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  let phone2 = phone.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  console.log();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={"New Lead"}
        leftIcon={Images.backArrow}
        onLeftPress={() => navigation.goBack()}
        customRight={true}
        onRightPress={() => {
          state == "text"
            ? Alert.alert("All the fields must be filled ")
            : postdata();
        }}
      />

      {loading ? (
        <Loader loading={loading} />
      ) : data && data.length > 0 ? (
        <KeyboardAvoidingView
          // keyboardVerticalOffset={height + 47}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={{ flex: 1 }}
          enabled
        >
          <FlatList
            style={{ backgroundColor: "#f2f2f2" }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View>
                <View style={{ paddingHorizontal: "6%", marginBottom: "40%" }}>
                  <Text style={styles.name_txt}>{item.first_name.label}</Text>

                  <TextInput
                    // placeholder="Enter first name"
                    style={styles.input}
                    // value={First_name}
                    onChangeText={(txt) => setFirst_name(txt)}
                  ></TextInput>
                  {/* {console.log(First_name)} */}
                  <Text style={styles.name_txt}>{item.last_name.label}</Text>
                  <TextInput
                    // placeholder=" Enter last name"
                    style={styles.input}
                    // value={last_name}
                    onChangeText={(txt) => setLast_name(txt)}
                  ></TextInput>
                  <Text style={styles.name_txt}>Choose Site</Text>
                  {/* {renderLabel()} */}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={item?.site_id?.dropdown_arr}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={"Test2"}
                    value={type_value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(i) => {
                      settype_value(i.value);
                      AsyncStorage.setItem("Type", JSON.stringify(i.label));
                      setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color="#003366"
                        name="downsquare"
                        size={30}
                      />
                    )}
                  />

                  <Text style={styles.name_txt}>{item.email.label}</Text>
                  <TextInput
                    // placeholder="Enter email"
                    style={styles.input}
                    // value={email}
                    keyboardType="email-address"
                    onChangeText={(txt) => setEmail(txt)}
                  ></TextInput>

                  <Text style={styles.name_txt}>{item.phone.label}</Text>
                  <TextInput
                    // placeholder="Enter Phone"
                    style={styles.input}
                    // value={phone}
                    maxLength={10}
                    keyboardType="phone-pad"
                    onChangeText={(txt) => setPhone(txt)}
                  ></TextInput>
                  <Text style={styles.name_txt}>{item.comments.label}</Text>
                  <TextInput
                    // placeholder="No Comments"
                    style={styles.comments}
                    // value={comments}
                    onChangeText={(txt) => setcomments(txt)}
                  ></TextInput>

                  <Text style={styles.name_txt}>{item.user_id.label}</Text>
                  {/* {renderLabel()} */}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={item?.user_id?.dropdown_arr}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={Assigned_value}
                    value={Assigned_value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(i) => {
                      setAssigned_value(i.value);
                      AsyncStorage.setItem("Assign", JSON.stringify(i.label));
                      setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color="#003366"
                        name="downsquare"
                        size={30}
                      />
                    )}
                  />
                  <Text style={styles.name_txt}>{item.lead_type_id.label}</Text>
                  {/* {renderLabel()} */}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={item?.lead_type_id?.dropdown_arr}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={type}
                    value={type_value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(i) => {
                      settype_value(i.value);
                      AsyncStorage.setItem("Type", JSON.stringify(i.label));
                      setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color="#003366"
                        name="downsquare"
                        size={30}
                      />
                    )}
                  />

                  <Text style={styles.name_txt}>
                    {item.is_grl_crea_lead.label}
                  </Text>
                  {/* {renderLabel()} */}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={item?.is_grl_crea_lead?.dropdown_arr}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={status_value}
                    value={status_value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(i) => {
                      setstatus_value(i.value);
                      AsyncStorage.setItem("Status", JSON.stringify(i.label));
                      setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color="#003366"
                        name="downsquare"
                        size={30}
                      />
                    )}
                  />
                  <Text style={styles.name_txt}>{item.month.label}</Text>
                  {/* {renderLabel()} */}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={item.month.dropdown_arr}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={follow_value}
                    value={follow_value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(i) => {
                      setfollow_value(i.value);
                      AsyncStorage.setItem("Follow", JSON.stringify(i.label));
                      setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                      <FontAwesome
                        style={styles.icon}
                        name="calendar"
                        size={30}
                        color="grey"
                      />
                    )}
                  />

                  <Text style={styles.name_txt}>{item.company_name.label}</Text>

                  <TextInput
                    // placeholder="Enter Company name"
                    style={styles.input}
                    // value={company}
                    onChangeText={(txt) => setCompany(txt)}
                  ></TextInput>
                  <Text style={styles.name_txt}>{item.address.label}</Text>
                  <TextInput
                    // placeholder="Enter Address"
                    style={styles.input}
                    // value={address}
                    onChangeText={(txt) => setAddress(txt)}
                  ></TextInput>
                  <Text style={styles.name_txt}>{item.city.label}</Text>
                  <TextInput
                    // placeholder="Enter City"
                    style={styles.input}
                    // value={city}
                    onChangeText={(txt) => setCity(txt)}
                  ></TextInput>
                  <Text style={styles.name_txt}>State/Province</Text>
                  <TextInput
                    // placeholder="Enter State"
                    style={styles.input}
                    // value={state}
                    onChangeText={(txt) => setstate(txt)}
                  ></TextInput>
                </View>
              </View>
            )}
          />
        </KeyboardAvoidingView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: "white",
    fontWeight: "normal",
    fontSize: 19,
    // flex:1,
    textAlign: "center",
    fontFamily: "Inter-Black",
  },

  dropdown: {
    height: height * 0.06,

    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginLeft: "-5%",
  },
  label: {
    // position: "absolute",
    // backgroundColor: "white",
    // left: 22,
    // top: 8,
    // zIndex: 999,
    // paddingHorizontal: 8,
    // fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#808080",
    fontFamily: "Inter-Black",
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "#808080",
    fontFamily: "Inter-Black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  name_txt: {
    fontSize: 17,
    marginBottom: "2%",
    paddingTop: "5%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black4",
    marginStart: "2%",
  },
  input: {
    backgroundColor: "white",
    color: Colors.txt,
    paddingHorizontal: "2%",
    fontSize: 16,
    height: height * 0.06,
    borderRadius: 6,
    fontFamily: "Inter-Black4",
  },
  comments: {
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: "2%",
    fontSize: 17,
    height: "5%",
    borderRadius: 6,
    fontFamily: "Inter-Black",
  },
});

export default New_lead;
