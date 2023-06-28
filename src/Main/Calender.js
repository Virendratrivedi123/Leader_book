import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "../constant/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Images } from "../constant/images";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const Calender = () => {
  const [d, setd] = useState(false);
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../assets/fonts/Mulish-Regular.ttf"),
  });
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const startDate = selected ? selected.format("YYYY-MM-DD").toString() : "";
  const EndDate = selected2 ? selected2.format("YYYY-MM-DD").toString() : "";
  const start_end_date = `${startDate} To ${EndDate}`;
  const customDayHeaderStylesCallback = (dayOfWeek, month, year) => {
    return {
      style: {
        backgroundColor: "#6c6c6c",
        innerHeight: 50,
        outerHeight: 50,
      },
      textStyle: {
        color: "white",
        fontSize: 12,
      },
    };
  };
  // const date = new Date(selected);  // 2009-11-10
  // const month = date.toLocaleString('default', { month: 'long' });
  // console.log(month);
  return (
    <SafeAreaView style={styles.container}>
      
    
      {/* <Text>{start_end_date}</Text> */}
      <View
        style={styles.date_view}
      >
        <View style={styles.date_box}>
          {d?<Text style={styles.start_end_date}>
          {start_end_date}
          </Text>:
          <Text style={styles.start_end_date}>
             Date Search
          </Text>}
          
        </View>
          <TouchableOpacity
          
          >
          <Image
        
        
        source={Images.close_icon} style={styles.icon2} />
          </TouchableOpacity>
        
      </View>
      
      <CalendarPicker
      
       headerWrapperStyle={{marginStart:"10%"}}
      scaleFactor={400}
        customDayHeaderStyles={customDayHeaderStylesCallback}
        scrollable={true}
        monthYearHeaderWrapperStyle={{ paddingStart: "52%", }}
        monthTitleStyle={styles.month}
        yearTitleStyle={styles.month}
        nextTitleStyle={{ marginStart: "50%" }}
        previousTitle="From"
        previousTitleStyle={styles.previous}
        dayLabelsWrapper={styles.day}
        horizontal
        startFromMonday={false}
        // allowRangeSelection={true}
        // minDate={minDate}
        // maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="white"
        onDateChange={(date) => {
          setSelected(date),setd(true)
        }}
        textStyle={{ fontSize: 12 }}
        showDayStragglers={true}
      />
      <CalendarPicker
      
      headerWrapperStyle={{backgroundColor:"white",width:"87%",alignSelf:"center",height:height*0.055,borderRadius:1}}
      
      scaleFactor={400}
        customDayHeaderStyles={customDayHeaderStylesCallback}
        scrollable={true}
        monthYearHeaderWrapperStyle={{ paddingStart: "58%" }}
        monthTitleStyle={styles.month}
        yearTitleStyle={styles.month}
        
        nextTitle=""
        previousTitle="To"
        previousTitleStyle={styles.previous}
        dayLabelsWrapper={styles.day}
        horizontal
        startFromMonday={false}
        // allowRangeSelection={true}
        // minDate={minDate}
        // maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="white"
        onDateChange={(date) => {
          setSelected2(date);
        }}
        textStyle={{ fontSize: 10 }}
        showDayStragglers={true}
      />
   
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  start_end_date:{ fontSize: 15, color: "#cccccc",fontFamily: "Inter-Black4", },
  previous:{
    fontSize: 13,
    color: Colors.MAIN_COLOR,
    fontWeight: "bold",width:width*0.12,
    
  },
  day:{ backgroundColor: "#6c6c6c", marginTop: "-2%" },
  month:{ fontSize: wp("4%"), color: "#6c6c6c" },
  date_view:{
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "6%",marginBottom:"-4%"
  },
  date_box: {
    height: height * 0.07,
    width: "86%",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: "5%",
    borderRadius: 6,paddingStart:"3%"
  },

  icon2: {
    height: hp("5.21%"),
    width: wp("6.08%"),
    resizeMode: "contain",
    marginStart: "3%",
  },
});

export default Calender;
