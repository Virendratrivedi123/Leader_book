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
  Alert,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";
import { Images } from "../../constant/images";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../constant/Loader";
import {
  Task_full,
  Task_full_completed,
  get_leads,
  get_leads_All,
} from "../../Services";
// import Icon from 'react-native-vector-icons/FontAwesome';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Complete() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(true);
  const [d2, setd2] = useState(false);
  const translation = useRef(new Animated.Value(0)).current;
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [DATA, setDATA] = useState([]);
  const h = (18 / 100) * height;

  React.useEffect(() => {
    (async () => {
      getData();
      getData2();
    })();
  }, []);

  async function getData() {
    console.log(offset);
    if (!loading && !isListEnd) {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        no: offset,
      };
      Task_full_completed(data)
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call
          // console.log(responseJson);
          if (responseJson.data.tasks.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson?.data?.tasks]);
            setLoading(false);
            setLoading2(false);
            setd2(true);
            Animated.timing(translation, {
              toValue: h,
              delay: 0,
              easing: Easing.elastic(4),
              useNativeDriver: true,
            }).start();
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function go() {
    return [...new Set(dataSource)];
  }

  async function getData2() {
    console.log(offset);
    if (!loading && !isListEnd) {
      const user_data = await AsyncStorage.getItem("user_data");
      const user = await AsyncStorage.getItem("imp");
      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        no: offset,
      };
      get_leads_All(data)
        .then((response) => response.json())
        .then(async (responseJson) => {
          // Successful response from the API Call

          if (responseJson.data.leads.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource2([...dataSource2, ...responseJson.data.leads]);

            // await AsyncStorage.setItem('Dts', JSON.stringify(dataSource));
          } else {
            setIsListEnd(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? <Loader loading={loading} /> : null}
      </View>
    );
  };

  const ab = (i) => {
    var a = [];
    dataSource2.map((i) => {
      a.push({ ...i.Lead });
    });

    i
      ? a.map((item, index) => {
          if (i == item.id) {
            navigation.navigate(ScreenNames.DETAIL, {
              user: {
                name: item?.name,
                id: item?.id,
                logo: item?.name_initials,
                imp2:"1"
              },
              index: index,
              DATA: a,
              imp:"1"
            }),
              AsyncStorage.setItem("imp", "complete");
          }
        })
      : null;
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: "8%",
            marginTop: "1%",
            marginHorizontal: "7%",
          }}
        >
          <View>
            <Text style={styles.text1}>{item?.subject}</Text>
            {item?.lead_name ? (
              <Text style={styles.text2}>
                Lead Name:{" "}
                <Text
                  style={styles.text4}
                  onPress={() => {
                    ab(item.lead_id);
                    // navigation.navigate(ScreenNames.ALL, (
                    //   AsyncStorage.setItem("imp", item.lead_id))
                    // );
                    // AsyncStorage.setItem("user_id", item.id);
                  }}
                >
                  {item?.lead_name}
                </Text>
              </Text>
            ) : (
              <Text style={styles.text2}>
                Lead Name: <Text style={styles.text3}>No Lead Assigned</Text>
              </Text>
            )}

            <Text style={styles.text2}>
              Status: <Text style={styles.text3}>{item?.status}</Text>
            </Text>
            <Text style={styles.text2}>
              Priority: <Text style={styles.text3}>{item?.priority}</Text>
            </Text>
            {item?.start_date ? (
              <Text style={styles.text2}>
                Start Date: <Text style={styles.text3}>{item?.start_date}</Text>
              </Text>
            ) : null}
            <Text style={styles.text2}>
              Due Date: <Text style={styles.text3}>{item?.due_date}</Text>
            </Text>
            {item?.reminder_time ? (
              <Text style={styles.text2}>
                Reminder Time:{" "}
                <Text style={styles.text3}>{item?.reminder_time}</Text>
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.line}></View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading2 ? (
        <Loader loading={loading2} />
      ) : (
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
      )}

      {d2 ? (
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",

            position: "absolute",

            right: "6%",
            // width: Dimensions.get("window").width * 0.16,
            // height: Dimensions.get("window").width * 0.16,

            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,

            transform: [{ translateY: translation }],
            bottom: height * 0.28,
            elevation: 5,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              navigation.navigate(ScreenNames.APage, { check: "1" })
            }
          >
            <Image
              source={Images.addNote}
              style={{
                width: Dimensions.get("window").width * 0.17,
                height: Dimensions.get("window").width * 0.17,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
}
//   return (
//     <SafeAreaView style={styles.container}>

//       <FlatList
//         style={{}}
//         data={DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
// <View>
//   <View
//     style={{
//       flexDirection: "row",
//       marginBottom: "8%"
//       ,marginStart:"7%",marginTop:"2%"
//     }}
//   >

//     <View>
//       <Text style={styles.text1}>{item.name}</Text>
//       <Text style={styles.text2}>Lead Name: <Text style={styles.text3}>{item.voicemail}</Text></Text>
//       <Text style={styles.text2}>Status: <Text style={styles.text3}>{item.voicemail}</Text></Text>
//       <Text style={styles.text2}>Priority: <Text style={styles.text3}>{item.voicemail}</Text></Text>
//       <Text style={styles.text2}>Due Date: <Text style={styles.text3}>{item.voicemail}</Text></Text>

//     </View>

//   </View>

//   <View style={styles.line}></View>
// </View>
//         )}
//       />
//       <Animated.View
//             style={{

//               alignItems: "center",
//               justifyContent: "center",

//               position: "absolute",

//               right: "6%",

// borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,

//               transform: [{ translateY: translation }],
//               bottom: height * 0.24,
//               elevation: 5,
//             }}
//           >
//             <TouchableOpacity
//               activeOpacity={1}
//         onPress={() => navigation.navigate(ScreenNames.ADD_TASKS)}

//       >
// <Image source={Images.addNote} style={{ width: Dimensions.get("window").width * 0.17,
//               height: Dimensions.get("window").width * 0.17,
//               resizeMode: "contain",}}/>
//       </TouchableOpacity>
//           </Animated.View>
//     </SafeAreaView>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    height: height * 0.12,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
    marginBottom: "3%",
  },
  headertxt1: {
    fontSize: 16,
    marginStart: "5%",
    marginTop: "7%",
    flex: 0.5,
  },

  headertxt2: {
    color: "white",
    fontWeight: "500",
    fontSize: 22,
    marginTop: "7%",
  },

  floating_btn: {
    position: "absolute",
    bottom: "10%",
    alignSelf: "flex-end",
    right: "8%",
  },

  text1: {
    fontSize: wp("5.5%"),
    marginTop: "0%",
    // color: "#808080",
    fontFamily: "Inter-Black",
    marginStart: "2%",
    color: "black",
  },
  text2: {
    fontSize: wp("4.1%"),
    marginTop: "5%",
    // color: "#808080",
    marginStart: "2%",
    color: Colors.blue_txt,
    fontFamily: "Inter-Black",
  },
  text3: {
    fontSize: wp("4%"),
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: Colors.txt,
    fontFamily: "Inter-Black",
  },
  text4: {
    fontSize: wp("4%"),
    // marginTop: "2%",
    // // color: "#808080",
    // marginStart: "5%",
    color: "#2b92ee",
    fontFamily: "Inter-Black",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#2b92ee",
  },

  circle: {
    marginStart: "7%",
  },
  circle_text: {
    fontSize: 30,
    fontWeight: "600",
    color: "#bfbfbf",
  },

  line: {
    backgroundColor: "#cccccc",
    height: 0.5,

    width: "100%",
    marginTop: "5%",
  },
});

export default Complete;
