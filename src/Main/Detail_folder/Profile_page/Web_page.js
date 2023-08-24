import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import WebView from "react-native-webview";
import Header from "../../../components/header";
import { Images } from "../../../constant/images";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function Web_page() {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
      <Header
         label=""
         leftIcon={Images.close_white}
         rightIcon={{}}
         onLeftPress={() => navigation.goBack()}
      />

      
      
       <WebView
        source={{
          uri: route?.params?.web,
        }}
        style={{marginTop: 20}}
      />
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});