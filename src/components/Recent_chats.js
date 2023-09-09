import React, { useState, useEffect, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../constant/colors";
import { ScreenNames } from "../constant/ScreenNames";
import { Images } from "../constant/images";
import { Mark_task, Recent_chat, Task_full, recent_chat } from "../Services";
import Loader from "../constant/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./header";
import moment from "moment";

// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Recent_chats() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const translation = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(true);
  const [DATA, setDATA] = useState([]);
  const [DATA2, setDATA2] = useState([]);
  const [DATA3, setDATA3] = useState([]);
  const [d2, setd2] = useState(false);
  const [t, sett] = useState(1);
  const route = useRoute();
  const h = (18 / 100) * height;
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

 
  async function getData() {
    const user_data = await AsyncStorage.getItem("user_data");
    const user_data2 = await AsyncStorage.getItem("userInfo");
      const search = await AsyncStorage.getItem("search");
      const d = JSON.parse(user_data);
      const d2 = JSON.parse(user_data2);


      // console.log(d2.userinfo.password)
      const data = {
        email:d2.userinfo.email,
        password: d.password,
        no: offset,
      };
      recent_chat(data)
      .then((response) => response.json())
      .then((result) => setDataSource([...dataSource,...result.data.recent_leads],setLoading2(false)))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getData();
  }, [offset]);



  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? <Loader loading={loading} /> : null}
      </View>
    );
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View>
        <View>
          <TouchableOpacity
            style={{ paddingHorizontal: "5%" }}
            onPress={() => {
              navigation.navigate("chat", {
                name: item?.name,
                id: item?.lead_id,
                n_i: item?.name_initials,
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              <View style={{}}>
                <View style={styles.circle}>
                  <Text style={styles.circle_text}>{item?.name_initials}</Text>
                </View>
              </View>

              <View style={{ marginStart: "5%", flex: 1 }}>
                <Text style={styles.text2} numberOfLines={1}>
                  {item?.name}
                </Text>
                <Text style={styles.text1}>{item?.last_message}</Text>
              </View>
              <Text style={styles.text3}>
                {moment(item?.last_message_time).format("Do MMMM h:mm")}
              </Text>
              {/* <Text style={styles.text3}>fgfdgfh</Text> */}
            </View>

            <View style={styles.line}></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label2="Recent Chats"
        leftIcon={Images.menu}
        rightIcon={{}}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      {loading2 ? (
        <Loader loading={loading2} />
      ) : (
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          
          onEndReachedThreshold={0.5}
          onEndReached={()=>{setOffset(offset+1)}}
          renderItem={ItemView}
        />
      )} 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  text1: {
    fontSize: 15,
    marginTop: "2%",
    color: "#b3b3b3",
    fontFamily: "Inter-Black",

    // color: "black",
  },
  text2: {
    fontSize: 19,
    marginTop: "2%",
    // color: "#808080",
    fontFamily: "Inter-Black3",
    color: "black",
    width: width * 0.3,
  },
  text3: {
    fontSize: 14,
    marginTop: "2%",
    // color: "#808080",

    color: "#b3b3b3",
    fontFamily: "Inter-Black",
  },

  circle: {
    width: Dimensions.get("window").width * 0.16,
    height: Dimensions.get("window").width * 0.16,

    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    backgroundColor: Colors.MAIN_COLOR,

    alignItems: "center",
    justifyContent: "center",
  },
  circle_text: {
    fontSize: 24,
    fontFamily: "Inter-Black3",
    color: "white",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "2%",
    width: "100%",
  },
});

export default Recent_chats;
