import React from "react";
import { StyleSheet, Image, View, TouchableOpacity, Text,Dimensions } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../constant/colors";
import { STYLES } from "../constant/styles";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function Header4({
  label,
  rightIcon,
  leftIcon,
  onRightPress,
  onLeftPress,
  showLeftIconBorder,
  showRightIconBorder,
  customRight,
}) {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Inter-Black2': require('../../assets/fonts/Mulish-Bold.ttf'),
   
  });
  
  return (
    <View style={styles.headerView}>
      {leftIcon ? (
        <TouchableOpacity
          hitSlop={{ top: 70, right: 70, left: 70, bottom: 70 }}
          style={showLeftIconBorder !== false && styles.penIconView}
          onPress={onLeftPress}
        >
          <Image source={leftIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <Text style={{...styles.headerTitle, marginLeft:customRight?15:0}}>{label}</Text>
      {rightIcon ? (
        <TouchableOpacity
          // style={styles.penIconView}
          style={showRightIconBorder !== false && styles.penIconView}
          onPress={onRightPress}
          hitSlop={{ top: 50, right: 50, left: 50, bottom: 50 }}
        >
          <Image
            source={rightIcon}
            style={[
              showRightIconBorder == false && { height: 30, width: 30 },
              styles.icon2,
            ]}
          />
        </TouchableOpacity>
      ) : customRight ? (
        <TouchableOpacity style={{alignItems:"center",justifyContent:"center",borderColor:Colors.MAIN_COLOR,borderWidth:1,borderRadius:30,}} onPress={onRightPress}>
          <Text style={{fontSize:17,color:Colors.MAIN_COLOR,fontFamily:"Inter-Black",padding:"1%"}}> Apply </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("100%"),
    height: hp("10%"),
    // backgroundColor: Colors.MAIN_COLOR,
    paddingHorizontal: wp("4%"),
  },
  headerTitle: {
    // fontFamily: Fonts.poppinsMeduim,
    fontSize: wp("6%"),
    color: "white",
    flex: 1,
    textAlign: "center",fontFamily:"Inter-Black"
  },
  penIconView: {
    // backgroundColor: '#4E4E50',
    alignItems: "center",
    justifyContent: "center",
    height: hp("4.21%"),
    width: wp("9.58%"),
    borderRadius: 8,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  icon2: {
   height: hp("4.21%"),
    width: wp("7.58%"),
    resizeMode: "contain",
  },
});
