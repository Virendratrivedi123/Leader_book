import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Colors } from "../../../../constant/colors";
import { Images } from "../../../../constant/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


import Header from "../../../../components/header";

import { ScrollView } from "react-native-gesture-handler";
import { Appointment_detail, Task_detail } from "../../../../Services";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


function Task_Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;

  console.log(route.params.id)
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

      Task_detail(data)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          result?.data?.task_detail.map((i)=>{
            return(setDATA(i.CrmTask))
          })
          // setDATA(result?.data?.task_detail);

          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)
        
          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={"Task Detail"}
        leftIcon={Images.backArrow}
        rightIcon2={Images.pencil}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {navigation.navigate("Edit_Task_Detail",{"id":route.params.id})}}
        customRight={true}
      />
      <ScrollView 
      endFillColor={"white"}
      style={{}}>
        <Text style={styles.header_msg}>{route.params.msg}</Text>

        <View style={{ paddingHorizontal: "8%", paddingTop: "5%" ,backgroundColor: "white",height:height}}>
          <Text style={styles.label}>Related To</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.link_button}/>
           
          </View>

          <Text style={styles.name}>{DATA?.lead_name}</Text>
          <Text style={styles.label}>Owner</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.user_icon}></Image>
           
          </View>

          <Text style={styles.text3}>{DATA?.owner}</Text>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.warning}></Image>
            
          </View>

          <Text style={styles.text3}>{DATA?.priority}</Text>
          <Text style={styles.label}>Start Date</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.calender}></Image>
           
          </View>

          <Text style={styles.text3}>{DATA?.start_date}</Text>
          <Text style={styles.label}>Due Date</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.calender}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>{DATA?.due_date}</Text>
          <Text style={styles.label}>Status</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.graph}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>Test James</Text>
          <Text style={styles.label}>Complete(%)</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.percentage}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>{DATA?.complete_percenatge}</Text>
          <Text style={styles.label}>Notes</Text>
          <View style={styles.circle}>
            <Image style={styles.img} source={Images.task_note}></Image>
            {/* <Text style={styles.text2}>{item.name}</Text> */}
          </View>

          <Text style={styles.text3}>{DATA?.notes}</Text>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: 60,
    position: "absolute",
    bottom: "10%",
    alignSelf: "flex-end",
    right: "8%",
    height: 60,
    backgroundColor: Colors.MAIN_COLOR,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "black",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    // backgroundColor: Colors.MAIN_COLOR,
  },
  header_msg: {
    fontSize: wp("6.5%"),

    // color: "#808080",
    fontFamily: "Inter-Black2",
    textAlign: "center",
    color: "white",
    backgroundColor: Colors.MAIN_COLOR,
    paddingBottom: "2%",
    marginTop: "-1.5%",
  },
  img: {
    height: hp("4.51%"),
    width: wp("7%"),
    resizeMode: "contain",
    marginEnd: "1%",
  },
  label: {
    fontSize: wp("4.2%"),

    // color: "#808080",
    fontFamily: "Inter-Black4",
    paddingStart: "15%",
    color: Colors.txt,
    marginBottom: "-4%",
  },
  name: {
    fontSize: wp("4.8%"),
    marginTop: "-5%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "#2b92ee",
    fontFamily: "Inter-Black4",
    paddingStart: "15%",
    marginBottom: "7%",
  },
  text2: {
    fontSize: wp("4.5%"),
    marginTop: "-2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "black",
    fontFamily: "Inter-Black4",
    paddingStart: "15%",
    marginBottom: "7%",
  },
  text3: {
    fontSize: wp("4.5%"),
    marginTop: "-5%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "black",
    fontFamily: "Inter-Black4",
    paddingStart: "15%",
    marginBottom: "7%",
  },
  text4: {
    fontSize: 15,
    marginTop: "2%",
    // color: "#808080",
    marginStart: "5%",
    color: "#666666",
    fontFamily: "Inter-Black",
  },
  text5: {
    fontSize: 18,

    // color: "#808080",
    marginStart: "3%",
    color: "#8c8c8c",
    fontFamily: "Inter-Black",
  },

  circle: {
    flexDirection: "row",
  },
  circle_text: {
    fontSize: 30,
    fontWeight: "600",
    color: "#bfbfbf",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "2%",
    width: "100%",
  },
});


export default Task_Detail;
