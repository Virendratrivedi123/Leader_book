import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STYLES } from "../../constant/styles";
import { Colors } from "../../constant/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View_lead_activity_comments } from "../../Services";
import { ScreenNames } from "../../constant/ScreenNames";
import Header from "../../components/header";
import { Images } from "../../constant/images";
import { useFonts } from 'expo-font';
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Comments() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setdata] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        activity_type: route.params.user.activity_type,
        lead_activity_id: route.params.user.lead_activity_id,
        lead_id: route.params.user.lead_id,
      };
      View_lead_activity_comments(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          var arr = [];
          var item = result.data.lead_activity_comments;
          arr.push(item);
          setdata(item);

          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);
  // let text = "How are?";
  // const a = text.split(" ");
  // console.log(a[0])
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={STYLES.header_box}>
        <TouchableOpacity
          style={STYLES.side_bar}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <Text style={STYLES.bar_header}>eMail Sent Comments</Text>
      </View> */}
       <Header
        label={route.params.user.title+" Comments"}
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {}}
        // customRight={true}
      />

      <FlatList
        style={{ backgroundColor: "white" }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.first}>
              <View style={styles.circle_email}>
                <Text style={styles.circle_text}>{item.user_name[0]}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "-10%",
                }}
              >
                <Text style={styles.title}>{item.user_name}</Text>
                <Text style={styles.created}>{item.created}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginTop: "-3%" }}
                    name="pencil"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
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
            <View
              style={styles.modal_page}
            >
              <Text> </Text>
              <Text style={{ fontSize: 20, color: "black" }}>Comment</Text>
              <Text
                onPress={() => setModalVisible(!modalVisible)}
                style={{ fontSize: 20, color: "black" }}
              >
                X
              </Text>
            </View>
            <View
              style={{ height: 1, width: "100%", backgroundColor: "#cccccc" }}
            ></View>
            <View
              style={{
                height: "50%",
                width: "90%",
                backgroundColor: "#f2f2f2",
                marginVertical: "5%",
                borderRadius: 10,
                alignSelf: "center",
              }}
            ></View>
            <View></View>
            {/* <View style={styles.modal_top}>
              <Text style={{ flex: 0.9 }}></Text>
              <Text style={styles.date}>Start Date</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.done}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Done</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </Modal>
      <View style={styles.box}>
        <View style={styles.input_box}>
          <TextInput
            style={styles.input}
            placeholder="Add a Comment"
            placeholderTextColor={"white"}
          ></TextInput>
        </View>

        <FontAwesome
          style={{ marginStart: "3%" }}
          name="send"
          size={35}
          color="white"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal_page:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: "5%",
  },
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modalView: {
    height: "40%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  circle_text: {
    fontSize: 30,
    fontFamily:"Inter-Black3",
    color: "#bfbfbf",
    marginEnd: "10%",
  },
  first: { flexDirection: "row", marginTop: "3%" },
  circle_email: {
    height: height * 0.08,
    width: width * 0.16,

    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginStart: "2%",
    backgroundColor: "#e6e6e6",
    marginBottom: "1%",
  },
  created: {
    fontSize: 10,
    color: "#666666",
    marginEnd: "2%",
    fontWeight: "500",
  },
  title: {
    fontSize: 17,
    fontFamily:"Inter-Black2",
    marginHorizontal: "4%",
    color: "#666666",
  },
  input_box: {
    height: height * 0.12,
    width: width * 0.8,
    backgroundColor: "#666699",
    borderRadius: 8,
    color: "white",

    fontSize: 15,
    fontFamily:"Inter-Black2"
  },
  box: {
    height: height * 0.15,
    backgroundColor: Colors.MAIN_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: {
    color: "white",
    paddingHorizontal: "2%",
    paddingTop: "2%",
    fontSize: 15,
    fontFamily:"Inter-Black4"
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
    justifyContent: "center",
  },
  headertxt1: {
    fontSize: 16,
    marginStart: "8%",
    marginTop: "7%",
    flex: 0.5,
  },

  headertxt2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "7%",
    textAlign: "center",
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

export default Comments;
