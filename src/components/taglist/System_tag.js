import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  
  FlatList,SafeAreaView
} from "react-native";
import { useFonts } from 'expo-font';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import {
  
  Ionicons,
  
} from "@expo/vector-icons";
import { Colors } from "../../constant/colors";



export default function System_tag() {
  


  const DATA = [
    {
      id: 0,
      name: "Morining",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.",
        s:false
    },
    {
      id: 1,
      name: "Noon",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 2,
      name: "Evening",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 3,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 4,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 5,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 6,
      name: "6 AM To 9 AM",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 7,
      name: "Google Ads",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 8,
      name: "Facebook Buyer",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 9,
      name: "Facebook Seller",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
    {
      id: 10,
      name: "Facebook Seller",
      Number: "0",
      voicemail: "Voicemail",
      description:
        "This tag will be automatically added to leads who visits mostly in mornings to view listings.", s:false
    },
  ];
  const [selected_data, setSelected_data] = useState(DATA);
  const press =(item)=>{
    const temp=[]
     selected_data.map((val)=>{
     if(val.id == item.id)
     {
         temp.push({...val,s:!val.s})
     }
     else{temp.push({...val,s:false})}
    });
    setSelected_data(temp)
   }
   const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../../assets/fonts/Mulish-Bold.ttf'),
    'Inter-Black3': require('../../../assets/fonts/Mulish-ExtraBold.ttf'),
    'Inter-Black4': require('../../../assets/fonts/Mulish-Regular.ttf'),
   
  });
// console.log((selected_data))
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <FlatList
        style={{}}
        data={selected_data}
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
                    <Text style={styles.name}>{item.name}</Text></View>

                    <TouchableOpacity onPress={() =>  press(item)  }>
                      {item.s ?<Ionicons
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
                      Total Leads ({item.Number})
                    </Text>
                  </View>
                  {   item.s  ?<View style={{ flexDirection: "row" }}>
                    <Text style={styles.number}>
                      Description: ({item.description})
                    </Text>
                  </View>:null}
                  
                </View>
              </View>
            
          </View>
        )}
      />
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
    fontSize: 16,
    fontFamily:"Inter-Black2",
    color: "white",
  },
  number: {
    fontSize: 14,

    fontFamily:"Inter-Black",
    color: Colors.blue_txt,
    
    marginBottom: "1.5%",marginStart:"2%"
  },
  

  container: { flex: 1, marginTop: "1.5%" },
});
