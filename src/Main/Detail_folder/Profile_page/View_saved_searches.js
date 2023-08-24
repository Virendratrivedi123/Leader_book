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
} from "../../../Services";
import Header from "../../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function View_saved_searches() {
  const navigation = useNavigation();
  const route = useRoute();
  const [mark, setmark] = useState(false);
  const [mark_n, setmark_n] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(true);
  const [lead_u_id, setlead_u_id] = React.useState("");
  const [pause_searches_by_admin, setpause_searches_by_admin] =
    React.useState("");

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
      Saved_Searches(data)
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call
          setlead_u_id(responseJson.data.lead.lead_user_id);
          setpause_searches_by_admin(responseJson.data.pause_searches_by_admin);
          console.log(responseJson.data.pause_searches_by_admin);
          if (responseJson.data.saved_searches.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([
              ...dataSource,
              ...responseJson?.data?.saved_searches,
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

  const postdata = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        user_id: lead_u_id,
        id: route.params.data.id,
        password: d.password,
        no: "0",
      };
      Stop_saved_search_email(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postdata2 = async () => {
    try {
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
        user_id: lead_u_id,
        id: route.params.data.id,
        password: d.password,
        no: "1",
      };
      Stop_saved_search_email(data).then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      <View>
        {index % 2 == 1 ? (
          <View style={{ backgroundColor: "#e6e6e6" }}>
            <Text style={styles.txt5}>{item?.search_detail?.name}</Text>
            <Text style={styles.txt6}>Notifications: {item?.notification}</Text>
            <Text style={styles.txt7}>{item?.search_detail?.string}</Text>
            <View style={styles.line}></View>
          </View>
        ) : (
          <View>
            <Text style={styles.txt5}>{item?.search_detail?.name}</Text>
            <Text style={styles.txt6}>Notifications: {item?.notification}</Text>
            <Text style={styles.txt7}>{item?.search_detail?.string}</Text>
            <View style={styles.line}></View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Lead User Searches"
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
      <View style={styles.box2}>
        <Text style={styles.txt3}>
          Stop Saved Search Email?{pause_searches_by_admin}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setpause_searches_by_admin("0"), postdata();
          }}
        >
          {pause_searches_by_admin == "0" ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color={Colors.MAIN_COLOR}
              />
              <Text style={styles.txt3_}>No</Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="circle-thin" size={18} color="#cccccc" />
              <Text style={styles.txt3_}>No</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setpause_searches_by_admin("1"), postdata2();
          }}
        >
          {pause_searches_by_admin == "1" ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color={Colors.MAIN_COLOR}
              />
              <Text style={styles.txt3_}>Yes</Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="circle-thin" size={18} color="#cccccc" />
              <Text style={styles.txt3_}>Yes</Text>
            </View>
          )}
        </TouchableOpacity>
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
    fontWeight: "500",
    fontSize: 15,
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt6: {
    fontWeight: "400",
    fontSize: 15,
    paddingTop: "2.5%",
    paddingLeft: "3%",
  },
  txt7: {
    fontWeight: "normal",
    fontSize: 14,
    paddingTop: "2.5%",
    color: "#404040",
    paddingLeft: "3%",
  },
  line: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#cccccc",
    marginTop: "15%",
  },
  box3: {
    margin: "1%",
    borderRadius: 6,
    borderWidth: 1,

    height: height*0.8,
    borderColor: "#8c8c8c",
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
    fontWeight: "bold",
    fontSize: 14,
    marginTop: "1%",
  },
  txt2: {
    color: "#0080ff",
    fontWeight: "normal",
    fontSize: 13,
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

export default View_saved_searches;
