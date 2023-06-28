import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  
  FlatList,
  Modal,
  Pressable,
  TextInput,Animated,Easing,SafeAreaView,Image
} from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import {
 
  Ionicons,
 
  FontAwesome,
  
  MaterialCommunityIcons,Entypo
} from "@expo/vector-icons";


import { Colors } from "../../constant/colors";
import { useFonts } from 'expo-font';
import { Images } from "../../constant/images";

export default function User_tag({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const [d, setd] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const translation = useRef(new Animated.Value(0)).current;
  const h = 18/100*height
  useEffect(() => {
    Animated.timing(translation, {
      toValue: h,
      delay: 0,
      easing:  Easing.elastic(4),
      useNativeDriver: true,
    }).start();
  }, []);

  const DATA = [
    {
      id: 0,
      name: "Morining",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 1,
      name: "Noon",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 2,
      name: "Evening",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 3,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 4,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 5,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 6,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 7,
      name: "Google Ads",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 8,
      name: "Facebook Buyer",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 9,
      name: "Facebook Seller",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
    {
      id: 10,
      name: "Facebook Seller",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
      s: false,
    },
  ];
  const [selected_data, setSelected_data] = useState(DATA);
  const [search, setsearch] = useState("");
  const [arr, setarr] = useState(DATA);
  const [notes, setmynotes] = useState("");
  const searchref = useRef();

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
  const Delete = (i) => {
    const newPeople = selected_data.filter((person) => person.id !== i.id);

    setSelected_data(newPeople);
    setarr(newPeople);
  };

  const onsearch = (text) => {
    if (text == "") {
      setSelected_data(arr);
    } else {
      let temp = selected_data.filter((item) => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setSelected_data(temp);
    }
  };

  const submit = () => {
    var newdata = {
      id: new Date(),
      name: notes,
      s: false,
    };
    arr.push(newdata);
    //  setSelected_data([...arr,newdata]);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          ref={searchref}
          style={{fontSize:17,}}
          onChangeText={(text) => {
            onsearch(text), setsearch(text);
          }}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Tags"
          placeholderTextColor={"#cccccc"}
        />
        <FontAwesome name="search" size={22} color="black" />
      </View>

      <FlatList
        style={{ height: "100%" }}
        data={selected_data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <View
              style={styles.flat_data}
            >
              <View
                style={styles.flat_view}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // marginStart: "3%",
                    
                    // alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{  }}
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <View
                        style={styles.icn}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={24}
                          color="orange"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{  }}
                      onPress={() => Delete(item)}
                    >
                      <View
                        style={styles.icn}
                      >
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={24}
                          color="black"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{  }}
                      onPress={() => up_down(item)}
                    >
                      {item.s ? (
                        <Ionicons
                          name="ios-chevron-up"
                          size={25}
                          color="#808080"
                        />
                      ) : (
                        <Ionicons
                          name="ios-chevron-down"
                          size={30}
                          color="#808080"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: "row",  }}>
                  <Text style={styles.number}>Total Leads ({item.Number})</Text>
                </View>
                {item.s ? (
                  <View style={{ flexDirection: "row",  }}>
                    <Text style={styles.number}>
                      Description: ({item.description})
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        )}
      />
      
      <Animated.View
            style={{
             
              alignItems: "center",
              justifyContent: "center",
             
              position: "absolute",

              right: "6%",
              
borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              backgroundColor: Colors.float_btn,
              
              transform: [{ translateY: translation }],
              bottom: (height )*0.28,
              elevation: 5,
            }}
          >
            <TouchableOpacity
              // onPress={() => navigation.navigate(ScreenNames.NEW_LEADS)}
              onPress={() => setModalVisible(true)}
              // style={styles.floating_btn}
            >
              <Image
                source={Images.addLeads}
                style={{ width: Dimensions.get('window').width * 0.18,
                height: Dimensions.get('window').width * 0.18, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.main_modal}
        >
          <View style={styles.modalView}>
            <View
              style={styles.main_view}
            >
              <Text style={{ fontSize: 20 }}></Text>
              <Text style={styles.add}>
                Add Tag
              </Text>
              <Pressable
                style={{}}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Entypo name="cross" size={30} color="black" />
              </Pressable>
            </View>
            <View
              style={styles.modal_page}
            ></View>
            <View style={styles.modal_inner_view}>
              <Text
                style={styles.nam_tag}
              >
                Name your tag
              </Text>
              <TextInput
                style={styles.input2}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder=""
                keyboardType="numeric"
              />
              <Text
                style={styles.description}
              >
                Description
              </Text>
              <TextInput
                style={styles.input2}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder=""
                keyboardType="numeric"
              />
              <TouchableOpacity
                // onPress={() => setd(!d)}
                style={styles.create}
              >
                <Text style={styles.create_txt}>Create Tag</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icn:{
                         
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 6,marginEnd:5
  },
  flat_data:{
    flexDirection: "row",
    marginHorizontal: "3%",
    marginVertical: "1%",
  },
  flat_view:{
    width: "100%",

    elevation: 2,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 6,padding:"3%"
  },
  main_modal:{
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    alignItems: "center",
    
  },
  main_view:{
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%",
  },
  add:{ fontSize: 20, color: Colors.MAIN_COLOR,fontFamily:"Inter-Black", },
  modal_page:{
    height: 1,
    width: "100%",
    backgroundColor: "#cccccc",
  },
  modal_inner_view:{ marginHorizontal: "3%", marginTop: "2%" },
  nam_tag:{
    fontSize: 16,
    color: Colors.MAIN_COLOR,
    marginTop: "4%",
    fontFamily:"Inter-Black",
  },
  description:{
    fontSize: 16,
    color: Colors.MAIN_COLOR,
    marginTop: "4%",
    fontFamily:"Inter-Black",
  },
  create_txt:{ color: "white", fontSize: 17,fontFamily:"Inter-Black",paddingHorizontal:"5%",paddingVertical:"3%" },
  create:{
    
    
    backgroundColor: "orange",
    alignSelf: "center",
    marginVertical: "7%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 25,
    fontFamily:"Inter-Black2",
  },
  input2: {
    height: height * 0.06,

    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    marginTop: "1%",
  },
  input: {
    height: height * 0.075,
    width: width * 0.95,
    marginVertical: "2%",

    alignSelf: "center",
    backgroundColor: "white",
    elevation: 1,
    borderRadius: 20,
    color: "#808080",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "3%",borderWidth:0.7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(5, 5, 52, 0.3)",
  },
  modalView: {
    // height: height * 0.42,
    width: "87%",
    backgroundColor: "white",
    borderRadius: 6,

    elevation: 15,
    alignSelf: "center",marginTop:"50%"
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
  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: "19%",
    position: "absolute",
    bottom: "10%",
    right: "8%",
    height: "11%",
    backgroundColor: "orange",
    borderRadius: 100,
  },
  
 
  name: {
    borderRadius: 20,
    
    fontSize: 17,
    fontFamily:"Inter-Black2",
    color: Colors.blue_txt,
  },
  number: {
    fontSize: 14,

    fontFamily:"Inter-Black",
    color: Colors.blue_txt,

    marginBottom: "1.5%",
  },
  email: {
    fontSize: 16,
    flex: 0.9,
    marginTop: "5%",
    fontWeight: "600",
    color: "#808080",
  },
  voicemail: {
    fontSize: 17,
    flex: 0.9,
    marginTop: "5%",
    fontWeight: "600",
    color: "#808080",
  },

  circleview: { marginStart: "1%", marginEnd: "7%" },
  circle: {
    height: height * 0.1,
    width: width * 0.2,
    backgroundColor: "#e6e6e6",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  circle_text: {
    fontSize: 25,
    fontWeight: "400",
    color: "gray",
  },
  bouncy: { marginStart: "10%", marginRight: "-4%" },
  line: {
    backgroundColor: "#cccccc",
    height: 2,
    marginVertical: "5%",
    width: "100%",
  },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    marginVertical: "4%",
    width: "95%",
    marginStart: "5%",
  },
  button: {
    height: height * 0.025,
    width: width * 0.5,

    padding: 10,
    alignSelf: "center",
    backgroundColor: "#003366",
    elevation: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "10%",
  },
  login: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "500",
  },
  item: {
    padding: 10,

    marginTop: "0%",
    marginBottom: "0%",

    elevation: 5,
  },

  container: { flex: 1, },
});
