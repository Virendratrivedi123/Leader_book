import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import {
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Zocial,
  FontAwesome5,
} from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../constant/colors";
import { Images } from "../../../constant/images";
import Loader from "../../../constant/Loader";
import {
  Recent_chat,
  Saved_Searches,
  Stop_saved_search_email,
  View_visits,
} from "../../../Services";
import { useFonts } from "expo-font";
import Header from "../../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Visits() {
    const [fontsLoaded] = useFonts({
        "Inter-Black": require("../../../../assets/fonts/Mulish-SemiBold.ttf"),
        "Inter-Black2": require("../../../../assets/fonts/Mulish-Bold.ttf"),
        "Inter-Black3": require("../../../../assets/fonts/Mulish-ExtraBold.ttf"),
        "Inter-Black4": require("../../../../assets/fonts/Mulish-Regular.ttf"),
      });

  const navigation = useNavigation();
  const route = useRoute();
  
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(true);
 

  React.useEffect(() => {
    (async () => {
      getData();
    })();
  }, []);

  async function getData() {
    // console.log(offset);
    if (!loading && !isListEnd) {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        no: offset,
        id: route.params.data.id,
      };
      View_visits(data)
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call
        
         
          if (responseJson.data.lead_visits.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([
              ...dataSource,
              ...responseJson?.data?.lead_visits,
            ]);
            setLoading(false);
            setLoading2(false);
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

  

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? <Loader loading={loading} /> : null}
      </View>
    );
  };

  const ItemView = ({ item, index }) => {
    return (
    
        <View style={{ backgroundColor: "#e6e6e6",borderTopLeftRadius:6,borderTopRightRadius:6 }}>
        <View style={{ }}>
            <Text style={styles.txt5}>Page: <Text style={styles.txt5_}>{item?.page}</Text></Text>
            <Text style={styles.txt5}>Created: <Text style={styles.txt5_}>{item?.created}</Text></Text>
            <Text style={styles.txt6}>{item?.listing_detail?.title}</Text>
            <View style={styles.line}></View>
      
      </View>
       </View>
          
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="View Number of Visits"
        leftIcon={Images.backArrow}
        rightIcon={{}}
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.box1}>
        <Text style={styles.txt1}>Lead User:</Text>
        <Text style={styles.txt2}>
          {route.params.data.name} ({route.params.data.email} -
        </Text>
      </View>
     
      {loading2 ? (
        <Loader loading={loading2} />
      ) : (
        <View style={styles.box3}>
          <FlatList
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            ListFooterComponent={renderFooter}
            onEndReached={getData}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: { flexDirection: "row", alignItems: "center" },
  txt4: { paddingLeft: "3%", fontWeight: "500", fontSize: 15 },
  txt5: {
    fontSize: wp("4.5%"),
    fontFamily: "Inter-Black2",
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt5_: {
    fontSize: wp("4.5%"),
    fontFamily: "Inter-Black4",
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt6: {
    fontSize: wp("4.5%"),
    fontFamily: "Inter-Black4",
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt7: {
    fontSize: wp("6%"),
    fontFamily: "Inter-Black4",
    paddingTop: "2.5%",
    color: "#404040",
    paddingLeft: "3%",
  },
  line: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: "2%",
  },
  box3: {
    margin: "1%",
    borderRadius: 6,
    borderWidth: 1,

   
    borderColor: "#8c8c8c",height:height*0.87
  },
  box1: {
    backgroundColor: "#00ffff",
    margin: 3,
    borderRadius: 6,
    paddingLeft: 10,
    height: height * 0.06,
  },
  box2: {
    margin: 3,
    borderRadius: 6,
    borderWidth: 0.5,
    height: height * 0.06,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#8c8c8c",
  },
  backimage: { flex: 0.65, marginStart: "5%" },
  box_items: { flexDirection: "row", alignItems: "center" },
  img: {
    height: height * 0.028,
    width: width * 0.1,
    resizeMode: "contain",
  },
  header_box: {
    height: height * 0.08,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },

  header: {
    color: "white",
    fontWeight: "500",
    fontSize: 21,
  },
  txt1: {
    color: "grey",
    fontSize: wp("4%"),
    fontFamily: "Inter-Black2",
    marginTop: "1%",
  },
  txt2: {
    color: "#0080ff",
    fontSize: wp("4%"),
    fontFamily: "Inter-Black4",
  },
  txt3: {
    fontWeight: "500",
    fontSize: 15,
  },
  txt3_: {
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 10,
  },
});

export default Visits;
