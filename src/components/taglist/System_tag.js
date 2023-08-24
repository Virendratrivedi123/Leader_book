import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { Entypo, FontAwesome, AntDesign,Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useNavigation } from "@react-navigation/native";




import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../constant/colors";
import { system_Tag } from "../../Services";

export default function Recent() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
  });

  const navigation = useNavigation();
  const route = useRoute();
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

      system_Tag(data)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result?.data?.leads)
         
          var a = [];
          result?.data?.system_tags.map((i) => {
            a.push({
              ...i.CrmTag,

              isChecked: false,
              
            });
          });
          setDATA(a);

          // setModalTitle2(result?.data?.leads?.name)
          // setnote(result?.data?.leads?.first_name)
        
          setLoading(false);
        })

        .catch((error) => console.log("error", error));
    })();
  }, []);


  
  const press =(item)=>{
    const temp=[]
     DATA.map((val)=>{
     if(val.id == item.id)
     {
         temp.push({...val,isChecked:!val.isChecked})
     }
     else{temp.push({...val,isChecked:false})}
    });
    setDATA(temp)
  }
   

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
    {loading ? (
          <Loader loading={loading} />
        ) :(
      <FlatList
        style={{}}
        data={DATA}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <View>
            
              <View
                style={styles.page_view}
              >
                <View
                  style={styles.main_view}
                >
                  <View
                    style={{
                      flexDirection: "row",
                     
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{borderRadius:12,
                     backgroundColor: "grey",
                    }}>
                    <Text style={styles.name}>{item?.name}</Text></View>

                    <TouchableOpacity onPress={() =>  press(item)  }>
                      {item?.isChecked ?<Ionicons
                        name="ios-chevron-up"
                        size={28}
                        color="#808080"
                      />:<Ionicons
                      name="ios-chevron-down"
                      size={28}
                      color="#808080"
                    />}
                      
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.number}>
                      Total Leads ({item?.total_leads})
                    </Text>
                  </View>
                  {   item?.isChecked ?<View style={{ flexDirection: "row" }}>
                    <Text style={styles.des}>
                      Description: {item?.description}
                    </Text>
                  </View>:null}
                  {   item?.isChecked ?<View style={{ flexDirection: "row" }}>
                    <Text style={styles.des}>
                      Verified Leads: ({item?.verified_leads})
                    </Text>
                  </View>:null}
                  
                </View>
              </View>
            
          </View>
        )}
      />)}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_view:{
    width: "100%",

    elevation: 2,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 4,padding:"3%"
  },
  page_view:{
    flexDirection: "row",
    marginHorizontal: "2%",
    marginVertical: "1%",
  },
  
  name: {
    
    paddingHorizontal: "4%",
   
    paddingVertical: "0.5%",
    fontSize: wp("4.51%"), fontFamily: "Inter-Black2",
    color: "white",
  },
  number: {
    fontSize: wp("4.01%"), fontFamily: "Inter-Black",
    color: Colors.blue_txt,
    
    marginBottom: "5%",marginStart:"3.5%"
  },
  des: {
    fontSize: wp("4.21%"), fontFamily: "Inter-Black",
    color: "black",
    
    marginBottom: "1.5%",marginStart:"0.5%"
  },
  

  container: { flex: 1, marginTop: "1.5%" },
});
