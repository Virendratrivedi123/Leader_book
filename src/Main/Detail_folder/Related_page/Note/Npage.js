import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../../constant/colors";
import { STYLES } from "../../../../constant/styles";
import { Images } from "../../../../constant/images";
import Header from "../../../../components/header";
import { Add_Note } from "../../../../Services";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Npage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [note, setnote] = useState("");
  const [modalVisible5, setModalVisible5] = useState(false);
  const [modalVisible6, setModalVisible6] = useState(false);
  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        password: d.password,
        id: route?.params?.id,
        note: note,
      };
      Add_Note(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          // Alert.alert(data.msg);
          setModalVisible6(true);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        
        <Header
          // label="Add Appointment"
          leftIcon={Images.backArrow}
          // rightIcon={Images.search}
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => {
            if(note.length <1 )
          { setModalVisible5(true)}
          if(note.length >0 )
          { postdata()}
         
          }}
          customRight={true}
        />
        <View style={{}}>
          <TextInput
            style={styles.input}
            placeholder="Note"
            onChangeText={(txt) => setnote(txt)}
            // value={text}
            placeholderTextColor={"#6c6c6c"}
          />
        </View>
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
            {note.length < 1 ? ( <Text style={styles.textStyle2_box}>
             Enter note
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 15,

    color: "#6c6c6c",
    fontSize: wp("4.8%"),
    fontFamily: "Inter-Black2",
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

export default Npage;
