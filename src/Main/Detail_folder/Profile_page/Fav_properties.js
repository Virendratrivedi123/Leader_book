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
  View_Fav,
  View_statics,
  View_visits,
} from "../../../Services";
import { useFonts } from "expo-font";
import Header from "../../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Favorite_properties() {
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
      View_Fav(data)
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call

          if (responseJson.data.favourite_properties.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([
              ...dataSource,
              ...responseJson?.data?.favourite_properties,
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
      <View style={styles.item_v}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>

       
        <Image
        style={styles.img2}
        source={{
          uri: item?.image,
        }}
      />
        <View style={{}}>
          <Text style={styles.txt5}>{item?.price}</Text>
          <Text style={styles.txt55_}>{item?.title}</Text>
          <View style={styles.box2}>
            <View style={styles.img_1}>
              <Image style={styles.img} source={Images.bed}></Image>
              <Text style={styles.txt6}>{item?.bedrooms?.value}</Text>
            </View>
            <View style={styles.img_2}>
              <Image style={styles.img} source={Images.bath}></Image>
              <Text style={styles.txt6}>{item?.bathrooms?.value}</Text>
            </View>
          </View>

          <Text style={styles.txt555}>
            {item?.mls?.label} :
            <Text style={styles.txt5_}>{item?.mls?.value}</Text>
          </Text>
          <Text onPress={() => navigation.navigate("Web",{web:item?.view_listing_url?.value})} style={styles.txt_b}>
          {item?.view_listing_url?.label}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Lead User favorite Properties"
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
  img_2: { flexDirection: "row", alignItems: "center", marginLeft: "10%" },
  img_1: { flexDirection: "row", alignItems: "center" },
  item_v: {
    backgroundColor: "#e6e6e6",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  btn: { flexDirection: "row", alignItems: "center" },
  txt4: { paddingLeft: "3%", fontWeight: "500", fontSize: 15 },
  txt5: {
    fontSize: wp("4.2%"),
    fontFamily: "Inter-Black",
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt_b: {
    fontSize: wp("4.7%"),
    fontFamily: "Inter-Black4",
    paddingTop: "0.5%",
    paddingLeft: "3%",color:"blue"
  },
  txt555: {
    fontSize: wp("4.2%"),
    fontFamily: "Inter-Black2",

    marginHorizontal: "3%",
    marginVertical: "0.5%",
  },
  txt5_: {
    fontSize: wp("4.2%"),
    fontFamily: "Inter-Black4",

    paddingLeft: "3%",
  },
  txt55_: {
    fontSize: wp("4%"),
    fontFamily: "Inter-Black4",
    paddingTop: "1%",
    paddingLeft: "2%",
    width: width * 0.6,
  },
  txt6: {
    fontSize: wp("4.2%"),
    fontFamily: "Inter-Black",

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
    height: 1,
    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: "2%",
  },
  box3: {
    margin: "1%",
    borderRadius: 6,
    borderWidth: 1,

    borderColor: "#8c8c8c",
    height: height * 0.87,
  },
  img: { height: hp("5%"), width: wp("7.38%"), resizeMode: "contain" },
  img2: { height: hp("15%"), width: wp("20%"), resizeMode: "contain",marginHorizontal:"10%" },
  box1: {
    backgroundColor: "#00ffff",
    margin: 3,
    borderRadius: 6,
    paddingLeft: 10,
    height: height * 0.06,
  },
  box11: {
    alignItems: "center",
    height: height * 0.06,
    flexDirection: "row",
    marginStart: "3%",
  },
  box2: { flexDirection: "row", marginLeft: "3%" },
  backimage: { flex: 0.65, marginStart: "5%" },
  box_items: { flexDirection: "row", alignItems: "center" },

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
  cube1: {
    height: height * 0.04,
    width: "9%",
    backgroundColor: "#00ffff",
    borderRadius: 2,
    marginEnd: "1%",
  },
  cube2: {
    height: height * 0.04,
    width: "9%",
    backgroundColor: "#ffcc99",
    borderRadius: 2,
    marginEnd: "1%",
  },
  cube3: {
    height: height * 0.04,
    width: "9%",
    backgroundColor: "#e6e6e6",
    borderRadius: 2,
    marginEnd: "1%",
  },
  txt11: {
    color: "black",
    fontSize: wp("4%"),
    fontFamily: "Inter-Black2",
    width: width * 0.18,
  },
  txt12: {
    color: "black",
    fontSize: wp("4%"),
    fontFamily: "Inter-Black2",
    width: width * 0.18,
  },
  txt13: {
    color: "black",
    fontSize: wp("4%"),
    fontFamily: "Inter-Black2",
    width: width * 0.25,
  },
  txt2: {
    color: "#0080ff",
    fontSize: wp("3.8%"),
    fontFamily: "Inter-Black",
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

export default Favorite_properties;
