import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { Ionicons, Octicons } from "@expo/vector-icons";
import { get_leads_priorities } from "../Services";
import Loader from "../constant/Loader";
import { ScreenNames } from "../constant/ScreenNames";
import { Colors } from "../constant/colors";
import { Images } from "../constant/images";
import { useFonts } from 'expo-font';

export default function Priority() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../assets/fonts/Mulish-Regular.ttf'),
    'Inter-Black5': require('../../assets/fonts/Mulish-Light.ttf'),
   
  });
  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const translation = useRef(new Animated.Value(0)).current;
  const [d1, setd1] = useState(false);
  

  useEffect(() => {
    (async () => {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
      };
      get_leads_priorities(data)
        .then((response) => response.json())
        .then((result) => {
          setDATA(result?.data?.leadpriorities);
          setd1(true);
          Animated.timing(translation, {
            toValue: 100,
            delay: 0,
            easing: Easing.elastic(4),
            useNativeDriver: true,
          }).start();
          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {loading ? (
          <Loader loading={loading} />
        ) : DATA && DATA.length > 0 ? (
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View>
                <View style={styles.mainview}>
                  <View style={styles.box}>
                    <View style={styles.name_set}>
                      <Text style={styles.name}>{item.type}</Text>
                    </View>
                    <View style={styles.num_set}>
                      <Text style={styles.number}>{item.totalcount} Leads</Text>

                      <Text style={{}}>
                        <Ionicons
                          name="ios-chevron-forward"
                          size={20}
                          color="#cccccc"
                        />
                      </Text>
                    </View>
                    <View style={styles.line}></View>
                  </View>
                </View>
              </View>
            )}
          />
        ) : null}

        {d1 ? (
          <Animated.View
            style={{
             
              alignItems: "center",
              justifyContent: "center",
             
              position: "absolute",

              right: "8%",
    
              backgroundColor: Colors.float_btn,
              width: Dimensions.get('window').width * 0.18,
    height: Dimensions.get('window').width * 0.18,

borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              transform: [{ translateY: translation }],
              bottom: (height + 180) * 0.22,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNames.NEW_LEADS)}

              // style={styles.floating_btn}
            >
              <Image
                source={Images.addLeads}
                style={{ height: 60, width: 60, resizeMode: "contain" }}
              />

              {/* <Ionicons name="person-add" size={40} color="white" /> */}
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainview: { flexDirection: "row" },
  name_set: { flexDirection: "row", marginTop: "1%" },
  num_set: { flexDirection: "row", marginStart: "5%" },
  box: {
    width: "100%",

    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: "10%",
    right: "8%",
    height: 60,
    backgroundColor: "orange",
    borderRadius: 30,
  },

  icon: { marginTop: "5%" },
  icon1: { marginTop: "5%" },
  number: {
    fontSize: 17,

    color: "#808080",
    flex: 0.95,
    marginTop: "1%",
    fontFamily: 'Inter-Black5',
  },
  name: {
    fontSize: 18,

    fontWeight: "400",
    color: "#737373",
    marginLeft: "5%",fontFamily: 'Inter-Black',
  },
  email: {
    fontSize: 16,
    flex: 0.9,
    marginTop: "5%",
    
    color: "#808080",fontFamily: 'Inter-Black5',
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
    height: 1,
    marginTop: "5%",
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

  container: { flex: 1, backgroundColor: "white" },
});
