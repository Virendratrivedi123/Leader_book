import React, { useEffect, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
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

const dt = [
  { label: "Canada", value: "1" },
  { label: "USA", value: "2" },
];

import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { edit_profile, user_update } from "../../Services";
import { ScreenNames } from "../../constant/ScreenNames";
import { STYLES } from "../../constant/styles";
import Header from "../header";
import { useFonts } from "expo-font";
import { Images } from "../../constant/images";
import { Colors } from "../../constant/colors";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
function Edit_profile() {
  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [First_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [state, setstate] = React.useState("");
  const [city, setCity] = React.useState("");
  const [text_sign, setText_sign] = React.useState("");
  const [country_id, setCountry_id] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [drop, setDrop] = React.useState("");
  const [id, setId] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../../assets/fonts/Mulish-Regular.ttf"),
  });

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");
      const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const dr = JSON.parse(drop_data);
      setDrop(dr);
      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
      };
      edit_profile(data)
        .then((response) => response.json())
        .then((result) => {
          var Array = [];

          var item = result?.data?.profile_data_arr?.Profile;
          setFirst_name(item?.first_name?.value);
          setLast_name(item?.last_name?.value);
          setEmail(item?.email?.value);
          setTitle(item?.title?.value);
          setCompany(item?.company?.value);
          setPhone(item?.phone?.value);
          setAddress(item?.address?.value);
          setCity(item?.city?.value);
          setText_sign(item?.text_sign?.value);
          setstate(item?.state?.value);
          Array.push(item);
          setdata(Array);
          setId(item.id);
          setValue(item.country_id.value);
          // console.log(result.data.profile_data_arr.Profile.country_id)
          setCountry_id(item?.country_id);
          setLoading(false);
          // console.log("new",First_name)
        })

        .catch((error) => console.log("error", error));

      // console.log(d);

      // var array = [];
      // array.push(d);

      // setdata(array);
    })();
  }, []);

  // console.log(typeof(country_id))

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        first_name: First_name,
        last_name: last_name,
        email: email,
        title: title,
        country_id: value,
        state: state,
        address_tag: text_sign,
        city: city,
        phone: phone,
        text_sign: text_sign,
        company: company,
        address: address,
        id: id,
        password: d.password,
      };
      user_update(data).then((response) => {
        response.json().then((data) => {
          // console.log(data);
          // Alert.alert(data.msg);
          navigation.goBack();
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(value)

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Profile"
        leftIcon={Images.backArrow}
        onLeftPress={() => navigation.navigate(ScreenNames.HOME)}
        customRight={true}
        onRightPress={() =>
          state == "text"
            ? Alert.alert("All the fields must be filled ")
            : postdata()
        }
      />
      {loading ? (
        <Loader loading={loading} />
      ) : data && data.length > 0 ? (
        <ScrollView>
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
                  <View style={{ paddingHorizontal: "4%", marginBottom: "5%" }}>
                    <Text style={styles.name_txt}>
                      {" "}
                      {item.first_name.label}
                    </Text>
                    <TextInput
                      placeholder="Firstname"
                      style={styles.input}
                      value={First_name}
                      onChangeText={(txt) => setFirst_name(txt)}
                    ></TextInput>
                    {/* {console.log(First_name)} */}
                    <Text style={styles.name_txt}> {item.last_name.label}</Text>
                    <TextInput
                      placeholder="Lastname"
                      style={styles.input}
                      value={last_name}
                      onChangeText={(txt) => setLast_name(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}> {item.email.label}</Text>
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      value={email}
                      onChangeText={(txt) => setEmail(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}> {item.title.label}</Text>
                    <TextInput
                      placeholder="Job title"
                      style={styles.input}
                      defaultValue={title}
                      onChangeText={(txt) => setTitle(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}> {item.company.label}</Text>
                    <TextInput
                      placeholder="Company name"
                      style={styles.input}
                      value={company}
                      onChangeText={(txt) => setCompany(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}> {item.phone.label}</Text>
                    <TextInput
                      placeholder="Phone"
                      style={styles.input}
                      value={phone}
                      onChangeText={(txt) => setPhone(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}> Office Street Address</Text>
                    <TextInput
                      placeholder="Address"
                      style={styles.input}
                      value={address}
                      onChangeText={(txt) => setAddress(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}> {item.city.label}</Text>
                    <TextInput
                      placeholder="City"
                      style={styles.input}
                      value={city}
                      onChangeText={(txt) => setCity(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}>{item.state.label}</Text>
                    <TextInput
                      placeholder="Province/State/Postal Code"
                      style={styles.input}
                      value={state}
                      onChangeText={(txt) => setstate(txt)}
                    ></TextInput>
                    <Text style={styles.name_txt}>
                      {" "}
                      {item.country_id.label}
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
                      data={item.country_id.dropdown_arr}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={drop}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(i) => {
                        setValue(i.value);
                        AsyncStorage.setItem(
                          "dropdown_data",
                          JSON.stringify(i.label)
                        );
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
                    <Text style={styles.name_txt}> {item.text_sign.label}</Text>
                    <TextInput
                      placeholder="name"
                      style={styles.input}
                      value={text_sign}
                      onChangeText={(txt) => setText_sign(txt)}
                    ></TextInput>
                  </View>
                </View>
              )}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  save: {
    fontSize: 20,
    color: "yellow",
    borderWidth: 1.5,
    borderColor: "yellow",
    borderRadius: 15,
    paddingHorizontal: 2,
    textAlign: "center",
  },
  dropdown: {
    height: 50,

    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
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
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 15,
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
  },
  input: {
    backgroundColor: "white",
    color: Colors.txt,
    paddingHorizontal: "2%",
    fontSize: 17,
    height: 50,
    borderRadius: 6,
  },
  button: {
    height: height * 0.085,
    width: width * 0.9,
    marginTop: 50,

    padding: 10,
    alignSelf: "center",
    backgroundColor: "#003366",
    elevation: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  //   header: {
  //     height: height * 0.1,
  //     backgroundColor: "#003366",
  //     justifyContent: "space-between",
  //     alignItems: "center",flexDirection:"row",
  //   },
  header: {
    height: height * 0.12,
    backgroundColor: "#003366",
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
  },
  headertxt3: {
    marginTop: "8%",
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },

  headertxt2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "7%",
    textAlign: "center",
    flex: 0.5,
  },
  headertxt1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "7%",
    textAlign: "center",
    flex: 0.2,
    marginStart: "8%",
  },
  add: {
    color: "yellow",
    borderWidth: 1.3,
    borderColor: "yellow",
    paddingHorizontal: "2%",
    borderRadius: 20,
    fontWeight: "400",
    fontSize: 20,
  },

  fp_text: {
    fontSize: 15,
    color: "black",
    textAlign: "right",
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Edit_profile;
