import React, { useEffect, useState } from "react";

import { FlatList, ScrollView } from "react-native-gesture-handler";

import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  
  Pressable,
  Modal,SectionList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "../constant/Loader";
import {
  New_lead_detail,
  New_lead_detail_update,
  Search_page,
} from "../Services";
import Header4 from "../components/header4";
import { Images } from "../constant/images";
import { Colors } from "../constant/colors";
import { useFonts } from "expo-font";
import CalendarPicker from "react-native-calendar-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Search() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setdata] = useState([]);
  const [DATA1,setDATA1]= useState([]);
  const [DATA2,setDATA2]= useState([]);
 const[bg,setbg]=useState("white")

  const [Lead_type, setLead_type] = useState([]);
  const [Lead_site, setLead_site] = useState([]);
  const [Agent_data, setAgent_data] = useState([]);
  const [Date_range, setdate_range] = useState([]);
  const [Daytime_range, setdaytime_range] = useState([]);
  const [Lead_status, setLead_status] = useState([]);
  const [email_status, setemail_status] = useState([]);
  const [d, setd] = useState(false);
  const [d2, setd2] = useState(false);
  const [d3, setd3] = useState(false);
  const [d4, setd4] = useState(false);
  const [d5, setd5] = useState(false);
  const [site_txt, setsite_txt] = useState("");
  const [status_txt, setstatus_txt] = useState("");
  const [range_txt, setrange_txt] = React.useState("");
  
  const [email_txt, setEmail_txt] = React.useState("");
  const [Modal_date, setmodal_date] = React.useState("");
 

  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const startDate = selected ? selected.format("YYYY-MM-DD").toString() : "";
  const EndDate = selected2 ? selected2.format("YYYY-MM-DD").toString() : "";
  const start_end_date = `${startDate} To ${EndDate}`;
  
  const customDayHeaderStylesCallback = (dayOfWeek, month, year) => {
    return {
      style: {
        backgroundColor: "#6c6c6c",
        innerHeight: 50,
        outerHeight: 50,
      },
      textStyle: {
        color: "white",
        fontSize: 12,
      },
    };
  };
  

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
      };
      Search_page(data)
        .then((response) => response.json())
        .then((result) => {
          //  console.log(result?.data?.searchfilters)
          setDATA1(result?.data?.searchfilters?.tags.user_tags)
          setDATA2(result?.data?.searchfilters?.tags.system_tags)
          setLead_type(result?.data?.searchfilters?.lead_type);
          setLead_site(result?.data?.searchfilters?.lead_site);
          setAgent_data(result?.data?.searchfilters?.agent_name);
          setdate_range(result?.data?.searchfilters?.date_range);
          setLead_status(result?.data?.searchfilters?.lead_status);
         setemail_status(result?.data?.searchfilters?.email_status);
          setdaytime_range(result?.data?.searchfilters?.daytime_range);
          setdata(result?.data?.searchfilters?.lead_type);
          
         

          var item = result?.data?.searchfilters?.lead_site.map((i)=>{
            return(i.label)
          })
          var item2 = result?.data?.searchfilters?.daytime_range.map((i)=>{
            return(i.label)
          })
          var item3 = result?.data?.searchfilters?.lead_status.map((i)=>{
            return(i.label)
          })
          var item4 = result?.data?.searchfilters?.email_status.map((i)=>{
            return(i.label)
          })
          setsite_txt(item[0])
          setEmail_txt(item4[0])
          setstatus_txt(item3[0])
          setrange_txt(item2[0])

          // Array.push(item);
          // setdata(Array);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : data && data.length > 0 ? (
        <>
          <Header4
            // label={"New Lead"}
            leftIcon={Images.close_icon}
            onLeftPress={() => navigation.goBack()}
            customRight={true}
            onRightPress={() => {}}
          />
          <ScrollView >
            <View style={styles.input}>
              <TextInput
                style={{ fontSize: 16 }}
                underlineColorAndroid="transparent"
                placeholder="Name, Email, City or Street"
                placeholderTextColor={"#cccccc"}
              />
              <FontAwesome name="search" size={22} color="black" />
            </View>
            <View style={{ paddingHorizontal: "5%" }}>
              <View style={{}}>
                <Text style={styles.name_txt}>Tags</Text>
                <View
                  style={{
                    backgroundColor: "white",
                    marginBottom: "5%",
                    height: height * 0.15,
                    borderRadius: 6,
                    padding: "2%",
                  }}
                >
                  <ScrollView>
                  <Text style={styles.title_txt}>User Tags</Text>
                  <FlatList
                    style={{}}
                    data={DATA1}
                    numColumns={4}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          backgroundColor: "#cccccc",
                          marginEnd: "3%",
                          marginBottom: "2%",
                          height: height * 0.067,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6,
                          width: width * 0.195,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: wp("4.13%"),
                            color: "#6c6c6c",width:"90%",fontFamily:"Inter-Black4"
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    )}
                  />
                   <Text style={styles.title_txt2}>System Tags</Text>
                  <FlatList
                    style={{}}
                    data={DATA2}
                    numColumns={4}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          backgroundColor: "#cccccc",
                          marginEnd: "3%",
                          marginBottom: "2%",
                          height: height * 0.067,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6,
                          width: width * 0.195,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: wp("4.13%"),
                            color: "#6c6c6c",width:"98%",fontFamily:"Inter-Black4"
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    )}
                  />
                  </ScrollView>
                </View>
                {/* {console.log(First_name)} */}
                <Text style={styles.name_txt}>Agent Name</Text>
                <View
                  style={{
                    backgroundColor: "white",
                    marginBottom: "5%",
                    height: height * 0.15,
                    borderRadius: 6,
                    padding: "2%",
                  }}
                >
                  <FlatList
                    style={{}}
                    data={Agent_data}
                    numColumns={4}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          backgroundColor: "#cccccc",
                          marginEnd: "3%",
                          marginBottom: "2%",
                          height: height * 0.067,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6,
                          width: width * 0.195,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: "#6c6c6c",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                <Text style={styles.name_txt}>Lead Site</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  activeOpacity={1}
                  onPress={() => {
                    setd(!d);
                  }}
                >
                  <Text style={styles.dropdown_txt}>{site_txt}</Text>
                  <AntDesign name="caretdown" size={24} color="#bfbfbf" />
                </TouchableOpacity>

                {d ? (
                  <View
                    style={{
                      backgroundColor: "white",
                      height: height * 0.3,
                      width: "100%",
                      
                      borderRadius: 6,
                      marginTop: "-5%",
                    }}
                  >
                    <FlatList
                      style={{}}
                      data={Lead_site}
                      // numColumns={4}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            paddingStart: "5%",
                          }}
                        >
                          <TouchableOpacity
                          onPress={() => {
                            setsite_txt(item.label),setd(!d),setbg(item.label)
                          }}
                          style={{backgroundColor : item.label == bg ? '#cccccc' : 'white'}}
                          >
                          <Text
                          
                            style={{
                              fontSize: 17,
                              color: "black",
                              marginVertical: "3%",
                            }}
                          >
                            {item.label}
                          </Text>
                          </TouchableOpacity>

                          <View
                            style={{ backgroundColor: "#cccccc", height: 1 }}
                          ></View>
                        </View>
                      )}
                    />
                  </View>
                ) : null}

                <Text style={styles.name_txt}>Lead type</Text>
                <View
                  style={{
                    backgroundColor: "white",
                    marginVertical: "5%",
                    height: height * 0.15,
                    borderRadius: 6,
                    padding: "2%",
                  }}
                >
                  <FlatList
                    style={{}}
                    data={Lead_type}
                    numColumns={4}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          backgroundColor: "#cccccc",
                          marginEnd: "3%",
                          marginBottom: "2%",
                          height: height * 0.067,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6,
                          width: width * 0.195,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: "#6c6c6c",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                <Text style={styles.name_txt}>Date range</Text>
                <View
                  style={{
                    backgroundColor: "white",
                    marginBottom: "5%",
                    height: height * 0.15,
                    borderRadius: 6,
                    padding: "2%",
                  }}
                >
                  <FlatList
                    style={{}}
                    data={Date_range}
                    numColumns={4}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          backgroundColor: "#cccccc",
                          marginEnd: "3%",
                          marginBottom: "2%",
                          height: height * 0.067,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6,
                          width: width * 0.195,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: "#6c6c6c",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                <Text style={styles.name_txt}>Choose Lead Status</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  activeOpacity={1}
                  onPress={() => {
                    setd3(!d3);
                  }}
                >
                  <Text style={styles.dropdown_txt}>{status_txt}</Text>
                  <AntDesign name="caretdown" size={24} color="#bfbfbf" />
                </TouchableOpacity>
                {d3 ? (
                  <View
                    style={{
                      backgroundColor: "white",
                      height: height * 0.3,
                      width: "100%",
                      elevation: 10,
                      borderRadius: 6,
                      marginTop: "-5%",
                    }}
                  >
                    <FlatList
                      style={{}}
                      data={Lead_status}
                      // numColumns={4}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            paddingStart: "5%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              color: "black",
                              marginVertical: "3%",
                            }}
                          >
                            {item.label}
                          </Text>
                          <View
                            style={{ backgroundColor: "#cccccc", height: 1 }}
                          ></View>
                        </View>
                      )}
                    />
                  </View>
                ) : null}
                <Text style={styles.name_txt}>Daytime Range</Text>

                <TouchableOpacity
                  style={styles.dropdown}
                  activeOpacity={1}
                  onPress={() => {
                    setd4(!d4);
                  }}
                >
                  <Text style={styles.dropdown_txt}>{range_txt}</Text>
                  <AntDesign name="caretdown" size={24} color="#bfbfbf" />
                </TouchableOpacity>
                {d4 ? (
                  <View
                    style={{
                      backgroundColor: "white",
                      height: height * 0.3,
                      width: "100%",
                      elevation: 10,
                      borderRadius: 6,
                      marginTop: "-5%",
                    }}
                  >
                    <FlatList
                      style={{}}
                      data={Daytime_range}
                      // numColumns={4}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            paddingStart: "5%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              color: "black",
                              marginVertical: "3%",
                            }}
                          >
                            {item.label}
                          </Text>
                          <View
                            style={{ backgroundColor: "#cccccc", height: 1 }}
                          ></View>
                        </View>
                      )}
                    />
                  </View>
                ) : null}
                <Text style={styles.name_txt}>Email Status</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  activeOpacity={1}
                  onPress={() => {
                    setd5(!d5);
                  }}
                >
                  <Text style={styles.dropdown_txt}>{email_txt}</Text>
                  <AntDesign name="caretdown" size={24} color="#bfbfbf" />
                </TouchableOpacity>
                {d5 ? (
                  <View
                    style={{
                      backgroundColor: "white",
                      height: height * 0.3,
                      width: "100%",
                      elevation: 10,
                      borderRadius: 6,
                      marginTop: "-5%",
                    }}
                  >
                    <FlatList
                      style={{}}
                      data={email_status}
                      // numColumns={4}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            paddingStart: "5%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              color: "black",
                              marginVertical: "3%",
                            }}
                          >
                            {item.label}
                          </Text>
                          <View
                            style={{ backgroundColor: "#cccccc", height: 1 }}
                          ></View>
                        </View>
                      )}
                    />
                  </View>
                ) : null}

                <TouchableOpacity
                  style={styles.dropdown}
                  activeOpacity={1}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.dropdown_txt}>{Modal_date?Modal_date:"Date Search"}</Text>
                  <Image
                    style={{
                      height: hp("4.21%"),
                      width: wp("7.58%"),
                      resizeMode: "contain",
                    }}
                    source={Images.calender}
                  ></Image>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    height: 40,
                    marginVertical: "10%",
                  }}
                  activeOpacity={1}
                  onPress={() => {}}
                >
                  <Text style={styles.dropdown_txt}></Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                
                <View style={styles.date_view}>
                  <View style={styles.date_box}>
                    {d ? (
                      <Text style={styles.start_end_date}>
                        {start_end_date}
                      </Text>
                    ) : (
                      <Text style={styles.start_end_date}>Date Search</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible),setmodal_date(`${startDate} To ${EndDate}`)
                    }}
                  >
                    <Image source={Images.close_icon} style={styles.icon2} />
                  </TouchableOpacity>
                </View>

                <CalendarPicker
                  headerWrapperStyle={{ marginStart: "10%" }}
                  scaleFactor={400}
                  customDayHeaderStyles={customDayHeaderStylesCallback}
                  scrollable={true}
                  monthYearHeaderWrapperStyle={{ paddingStart: "52%" }}
                  monthTitleStyle={styles.month}
                  yearTitleStyle={styles.month}
                  nextTitleStyle={{ marginStart: "50%" }}
                  previousTitle="From"
                  previousTitleStyle={styles.previous}
                  dayLabelsWrapper={styles.day}
                  horizontal
                  startFromMonday={false}
                  // allowRangeSelection={true}
                  // minDate={minDate}
                  // maxDate={maxDate}
                  todayBackgroundColor="#f2e6ff"
                  selectedDayColor="white"
                  onDateChange={(date) => {
                    setSelected(date), setd(true);
                  }}
                  textStyle={{ fontSize: 12 }}
                  showDayStragglers={true}
                />
                <CalendarPicker
                  headerWrapperStyle={{
                    backgroundColor: "white",
                    width: "87%",
                    alignSelf: "center",
                    height: height * 0.055,
                    borderRadius: 1,
                  }}
                  scaleFactor={400}
                  customDayHeaderStyles={customDayHeaderStylesCallback}
                  scrollable={true}
                  monthYearHeaderWrapperStyle={{ paddingStart: "58%" }}
                  monthTitleStyle={styles.month}
                  yearTitleStyle={styles.month}
                  nextTitle=""
                  previousTitle="To"
                  previousTitleStyle={styles.previous}
                  dayLabelsWrapper={styles.day}
                  horizontal
                  startFromMonday={false}
                  // allowRangeSelection={true}
                  // minDate={minDate}
                  // maxDate={maxDate}
                  todayBackgroundColor="#f2e6ff"
                  selectedDayColor="white"
                  onDateChange={(date) => {
                    setSelected2(date);
                  }}
                  textStyle={{ fontSize: 10 }}
                  showDayStragglers={true}
                />
              </View>
            </Modal>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title_txt:{ 
  fontSize: wp("4.23%"),marginBottom:"4%",
  color: "black",fontFamily:"Inter-Black"},
  title_txt2:{ 
    fontSize: wp("4.23%"),marginTop:"2%",marginBottom:"4%",
    color: "black",fontFamily:"Inter-Black"},
  start_end_date: {
    fontSize: 15,
    color: "#cccccc",
    fontFamily: "Inter-Black4",
  },
  previous: {
    fontSize: 13,
    color: Colors.MAIN_COLOR,
    fontWeight: "bold",
    width: width * 0.12,
  },
  day: { backgroundColor: "#6c6c6c", marginTop: "-2%" },
  month: { fontSize: wp("4%"), color: "#6c6c6c" },
  date_view: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "6%",
    paddingTop: "10%",
  },
  date_box: {
    height: height * 0.065,
    width: "86%",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // marginVertical: "5%",
    borderRadius: 6,
    paddingStart: "3%",
    marginEnd: "3%",
  },

  icon2: {
    height: hp("5.21%"),
    width: wp("6.08%"),
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: "5%",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#f2f2f2",

    elevation: 5,
    alignSelf: "center",
    height: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  box1: {
    flexDirection: "row",

    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 6,
    marginEnd: "2%",
    marginTop: "2%",
    paddingHorizontal: 5,
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
  header: {
    color: "white",
    fontWeight: "normal",
    fontSize: 19,
    // flex:1,
    textAlign: "center",
    fontFamily: "Inter-Black",
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
    color: "#4d4d4d",
    fontFamily: "Inter-Black4",
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "#4d4d4d",
    fontFamily: "Inter-Black4",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  name_txt2: {
    fontSize: 17,
    marginBottom: "2%",
    marginTop: "5%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black4",
    marginStart: "2%",
  },
  input: {
    backgroundColor: "white",
    color: Colors.txt,
    paddingHorizontal: "3%",
    fontSize: 16,
    height: height * 0.08,
    borderRadius: 6,
    fontFamily: "Inter-Black",
    marginHorizontal: "5%",
    marginBottom: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdown: {
    backgroundColor: "white",
    color: Colors.txt,
    paddingHorizontal: "3%",
    fontSize: 16,
    height: height * 0.08,
    borderRadius: 6,
    fontFamily: "Inter-Black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
  name_txt: {
    fontSize: wp("4.43%"),
    color: Colors.blue_txt,
    fontFamily: "Inter-Black2",
    marginBottom: "1%",
  },
  dropdown_txt: { fontSize: 16, color: "#6c6c6c", fontFamily: "Inter-Black4" },
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

export default Search;
