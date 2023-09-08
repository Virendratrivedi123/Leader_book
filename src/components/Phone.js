import React, { useState, useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useRoute } from "@react-navigation/native";
import { STYLES } from "../constant/styles";
import { Images } from "../constant/images";
import Header from "./header";
import { Colors } from "../constant/colors";
import { Settings, User_settings } from "../Services";
import Loader from "../constant/Loader";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Phone() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const [v, setv] = useState(true);
  const [header, setheader] = useState("");
  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
      };

      User_settings(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result?.data?.leads)
          setheader(result?.data?.user_settings?.app_calling_method?.label);
          var r =
            result?.data?.user_settings?.app_calling_method?.selected_value;

          var a = [];
          result?.data?.user_settings?.app_calling_method?.radio_button.map(
            (i) => {
              a.push({
                ...i,

                isChecked: false,
              });
            }
          );

          a.map((i) => {
            if (i.value == r) {
              i.isChecked = true;
            }
          });

          setDATA(a);
          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)

          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);

  const postdata = async (i) => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,

        password: d.password,
        set: i,
      };
      Settings(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
          call_api();
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const call_api = async () => {
    setLoading(true);
    try {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
      };

      User_settings(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result?.data?.leads)
          setheader(result?.data?.user_settings?.app_calling_method?.label);
          var r =
            result?.data?.user_settings?.app_calling_method?.selected_value;

          var a = [];
          result?.data?.user_settings?.app_calling_method?.radio_button.map(
            (i) => {
              a.push({
                ...i,

                isChecked: false,
              });
            }
          );

          a.map((i) => {
            if (i.value == r) {
              i.isChecked = true;
            }
          });

          setDATA(a);

          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setLoading(true);
      call_api();
      console.log("reload the page");
    });

    return unsubscribe;
  }, [navigation]);

  const press = (item) => {
    const temp = [];
    DATA.map((val) => {
      if (val.label == item.label) {
        temp.push({ ...val, isChecked: true });
      } else {
        temp.push({ ...val, isChecked: false });
      }
    });
    setDATA(temp);
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Phone"
        leftIcon={Images.menu}
        // rightIcon={Images.search}
        onLeftPress={() => navigation.toggleDrawer()}
        onRightPress={() => {
          postdata(v);
        }}
        customRight={true}
      />
      {loading ? (
        <Loader loading={loading} />
      ) : DATA && DATA.length > 0 ? (
        <>
          <Text
            style={{
              color: Colors.blue_txt,
              fontSize: 18,
              marginTop: "10%",
              marginHorizontal: "6%",
              fontFamily: "Inter-Black4",
            }}
          >
            {header}
          </Text>
          <FlatList
            style={styles.flat}
            data={DATA}
            extraData={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    press(item), setv(item.value);
                  }}
                  style={styles.button}
                >
                  {item?.isChecked ? (
                    <Image style={styles.sms} source={Images.check}></Image>
                  ) : (
                    <Image style={styles.sms} source={Images.uncheck}></Image>
                  )}

                  <Text style={styles.login}>{item.label}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sms: {
    height: hp("6.5%"),
    width: wp("6.5%"),
    resizeMode: "contain",
    marginStart: "3%",
  },
  button: {
                    
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 8,
    marginVertical: "2%",
  },
  login: {
    color: Colors.blue_txt,
    fontSize: 18,
    marginStart: "5%",
    fontFamily: "Inter-Black",
  },
  circle: {
    marginStart: "3%",
    height: height * 0.034,
    width: "8%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.blue_txt,
  },
  circle2: {
    marginStart: "3%",
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: "contain",
  },
});

export default Phone;
