import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../constant/colors";

import Basic_detail from "./Detail_folder/Basic_detail";
import Profile from "./Detail_folder/Profile";
import Related from "./Detail_folder/Related";
import { ScreenNames } from "../constant/ScreenNames";

import { Images } from "../constant/images";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Detail({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
  });
  const route = useRoute();
  const [com, setcom] = useState(false);
  const [ind, setInd] = useState(route.params.index);
  const [i, seti] = useState(route?.params?.user?.id);
  const [DATA, setDATA] = useState(route?.params?.DATA);
  const [key, setKey] = useState(Math.random());
  const [loading, setLoading] = React.useState(true);
  console.log(route?.params?.index)
  const [User_data, setUserData] = useState(route.params.DATA[ind]);
  React.useEffect(() => {
    (async () => {
      seti(route.params.user.id);
      // setLoading(false);
    })();
  }, []);

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View>
   
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate(ScreenNames.MAIN_SCREEN)}
        >
          <Image source={Images.backArrow} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.nxt_view,
            display: ind > 0 ? "flex" : "none",
            marginRight: 5,
            paddingHorizontal: 5,
          }}
          // onPress={() => {seti(DATA)}}
          onPress={() => {
            if (ind > 0) {
              setUserData(route.params.DATA[ind - 1]);
              setInd(ind - 1);
              setKey(Math.random());
              setcom("RECENT");
            }
          }}
        >
          <Image
            source={Images.backArrow}
            style={{
              height: 15,
              width: 15,
              resizeMode: "contain",
              marginStart: 5,
              marginEnd: 10,
            }}
          />
          <Text style={styles.nxt_txt}> Previous Lead</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.nxt_view,
            paddingHorizontal: 5,
            display: DATA.length > ind + 1 ? "flex" : "none",
          }}
          // onPress={() => {seti(DATA)}}
          onPress={() => {
            if (DATA.length > ind + 1) {
              // console.log(DATA[ind])
              setUserData(route.params.DATA[ind + 1]);
              setInd(ind + 1);
              setKey(Math.random());
              setcom("RECENT");
            }
          }}
        >
          <Text style={styles.nxt_txt}>Next Lead</Text>
          <Image
            source={Images.nextArrow}
            style={{
              height: 15,
              width: 15,
              resizeMode: "contain",
              marginStart: 7,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.in_box}>
        <View style={styles.circle}>
          <Text style={styles.circle_text}>{DATA[ind].name_initials}</Text>
        </View>
        <Text style={styles.name}>{DATA[ind].name}</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ScreenNames.EDIT_LEAD_DETAIL, {
              id: DATA[ind].id,
            })
          }
        >
          <Image style={styles.pencil} source={Images.editYellow} />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate(ScreenNames.EDIT_LEAD_DETAIL, {
          //     id: route.params.user.id,
          //   })
          // }
        >
          <Image style={styles.delete} source={Images.delete} />
        </TouchableOpacity>
      </View>

      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.ord}
          onPress={() => {
            setcom("RECENT");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: com == "RECENT" ? "Inter-Black3" : "Inter-Black2",
              color: "white",
              marginBottom: "2%",
              marginStart: "5%",
              marginTop: "4%",
            }}
          >
            BASIC DETAIL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            setcom("PRIORITY");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: com == "PRIORITY" ? "Inter-Black3" : "Inter-Black2",
              color: "white",
              marginBottom: "2%",
              marginTop: "4%",
            }}
          >
            PROFILE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            setcom("ALL");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: com == "ALL" ? "Inter-Black3" : "Inter-Black2",
              color: "white",
              marginBottom: "2%",
              marginTop: "4%",
            }}
          >
            RELATED
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line_box}>
        <View
          style={{
            height: 3,
            width: width * 0.3,
            backgroundColor: com == "RECENT" ? Colors.LINE : Colors.MAIN_COLOR,
            marginTop: "3%",
          }}
        ></View>

        <View
          style={{
            height: 3,
            width: width * 0.3,
            backgroundColor:
              com == "PRIORITY" ? Colors.LINE : Colors.MAIN_COLOR,
            marginTop: "3%",
            marginStart: "5%",
          }}
        ></View>
        <View
          style={{
            height: 3,
            width: width * 0.3,
            backgroundColor: com == "ALL" ? Colors.LINE : Colors.MAIN_COLOR,
            marginTop: "3%",
            marginStart: "5%",
          }}
        ></View>
      </View>
      </View>
      <View style={{ flex: 1 }}>
        {com == "RECENT" ? (
          <Basic_detail data={User_data} key={key} />
        ) : com == "PRIORITY" ? (
          <Profile data={User_data} key={key} />
        ) : com == "ALL" ? (
          <Related
            data={{
              data: User_data,
              d: DATA,
              in: ind,
            }}
            key={key}
          />
        ) : (
          setcom("RECENT")
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  line_box: { flexDirection: "row", backgroundColor: Colors.MAIN_COLOR },
  delete: {
    height: height * 0.035,
    width: width * 0.08,
    resizeMode: "contain",
  },
  pencil: {
    height: height * 0.035,
    width: width * 0.12,
    resizeMode: "contain",
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  arrow: { marginHorizontal: "3%", marginVertical: "3%" },
  nxt_txt: {
    fontSize: 9,
    color: "white",

    fontWeight: "normal",
    fontFamily: "Inter-Black",
  },
  nxt_view: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    marginTop: "4%",
  },
  back: {
    color: "white",
    fontWeight: "bold",

    marginTop: "3%",
    textAlign: "center",
    flex: 0.9,
    marginStart: "3%",
  },
  in_box: {
    flexDirection: "row",
    backgroundColor: Colors.MAIN_COLOR,
  },
  box: {
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
    paddingBottom: 8,
  },
  circle: {
    width: Dimensions.get("window").width * 0.17,
    height: Dimensions.get("window").width * 0.17,

    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    alignItems: "center",
    justifyContent: "center",
    marginStart: "5%",
    backgroundColor: "#666699",
    marginBottom: "3%",
  },
  circle_text: { fontSize: 28, color: "white", fontFamily: "Inter-Black3" },
  name: {
    fontSize: 20,
    marginStart: "3%",
    // fontWeight: "bold",
    color: "white",
    fontFamily: "Inter-Black2",
  },
  text: {
    fontSize: 14,
    // fontWeight: "500",
    color: "white",
    marginStart: "3%",
    fontFamily: "Inter-Black2",
    // textAlign: "center",
  },

  tab: { flexDirection: "row", backgroundColor: Colors.MAIN_COLOR },
  ord: {
    backgroundColor: Colors.MAIN_COLOR,

    flex: 0.5,
  },
  add: {
    backgroundColor: Colors.MAIN_COLOR,
    flex: 0.4,
  },
  setting: {
    backgroundColor: Colors.MAIN_COLOR,

    flex: 0.3,
  },
});
