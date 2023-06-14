import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,SafeAreaView
} from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import {
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constant/colors";
import { ScreenNames } from "../../constant/ScreenNames";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [val, setval] = useState("");
  const [c, setc] = useState("90%");
  const navigation = useNavigation();
  const route =useRoute()

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello world",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View></View>
      </Send>
    );
  };

  const renderDay = (props) => {
    return <Day {...props} textStyle={{ color: "red" }} />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "green",
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            margin: 10,
          },
          left: {
            // backgroundColor: 'green',
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            margin: 10,
            borderWidth: 1,
            borderColor: "#cccccc",
          },
        }}
        textStyle={{
          left: {
            color: "#666666",
          },
        }}
      />
    );
  };
  const func = () => {
    setc(false);
  };

  const scrollToBottomComponent = (props) => {
    return (
      <View style={styles.box}>
        <View
          style={{
            // height: height * 0.12,
            paddingHorizontal: "2%",
            marginHorizontal: 15,
            fontSize: 15,
            fontWeight: "500",
            backgroundColor: "white",
            height: 50,
            borderWidth: 1,
            width: c ? "75%" : "90%",
            color: "#666666",
            borderRadius: 4,
            borderColor: "blue",
          }}
        >
          <TextInput
            style={styles.input}
            value={val}
            onChangeText={(txt) => {
              setval(txt), setc(true);
            }}
            placeholder="Text Message"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                val.trim().length == 0 ? setc(false) : setc(true);
              }
            }}
          ></TextInput>
        </View>

        <Send {...props}>
          <View>
            <FontAwesome
              name="send"
              style={{ marginBottom: 10, marginEnd: "10%" }}
              size={32}
              color="blue"
            />
          </View>
        </Send>
      </View>
    );
  };
  // console.log(val.trim().length)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <View
        style={{
          height: height * 0.12,
          backgroundColor: Colors.MAIN_COLOR,
          alignItems: "center",

          // marginTop: 25,
          flexDirection: "row",
        //   justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ marginStart: "4%",  flex:0.35}}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={45}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            

            alignItems: "center",
            justifyContent: "center",
            
            flexDirection: "row",
          }}
        //   onPress={() => {navigation.navigate(ScreenNames.DETAIL)}}
        >
          <View
            style={{
              height: height * 0.07,
              width: width * 0.145,
              backgroundColor: "#666699",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            {route.params.name[0]}
                         
            </Text>
          </View>

          <Text
            style={{
              color: "white",
              fontWeight: "400",
              fontSize: 22,
              marginStart:10
            }}
          >
            {route.params.name}
          </Text>
        </TouchableOpacity>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Text Message"
        renderComposer={scrollToBottomComponent}
        renderBubble={renderBubble}
        minInputToolbarHeight={100}
        minComposerHeight={80}
        //   renderChatEmpty={func}
        //   alwaysShowSend
        //   renderSend={renderSend}
        text={val}
        onInputTextChanged={(text) => {
          setval(text), setc(!c);
        }}
      />
    </View>
    </SafeAreaView>
    

    
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  circle: {
    height: height * 0.08,
    width: width * 0.17,
    backgroundColor: Colors.MAIN_COLOR,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  circle_text: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input_box: {
    // height: height * 0.12,
    paddingHorizontal: "2%",
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: "500",
    backgroundColor: "white",
    height: 50,
    borderWidth: 1,
    width: "90%",
    color: "#666666",
    borderRadius: 4,
    borderColor: "blue",
  },
  box: {
    height: height * 0.1,
    backgroundColor: "#cccccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
  },
  input: {},
});
