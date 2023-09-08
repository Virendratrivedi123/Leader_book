



import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
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
} from "react-native";
import { useFonts } from "expo-font";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { Entypo, FontAwesome, AntDesign ,MaterialCommunityIcons,Ionicons} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Delete_Tag, Pin_note, Save_tag, Tags, get_leads, get_leads_All } from "../../Services";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../constant/Loader";
import { ScreenNames } from "../../constant/ScreenNames";
import { Colors } from "../../constant/colors";
import { Images } from "../../constant/images";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import Tag from "../Tag";

function User_tag2() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../../assets/fonts/Mulish-SemiBold.ttf"),
    "Inter-Black2": require("../../../assets/fonts/Mulish-Bold.ttf"),
    "Inter-Black3": require("../../../assets/fonts/Mulish-ExtraBold.ttf"),
    "Inter-Black4": require("../../../assets/fonts/Mulish-Regular.ttf"),
  });

 
  
  const navigation = useNavigation();
  const [DATA, setDATA] = useState([]);
  const [selected_data, setSelected_data] = useState([]);
  const [search, setsearch] = useState("");
  const [tag, settag] = useState("");
  const [des, setdes] = useState("");
  const [id, setid] = useState("");
  const [arr, setarr] = useState(DATA);
  const [notes, setmynotes] = useState("");
  const searchref = useRef();
  const [n, setn] = useState("");
  const [loading2, setLoading2] = React.useState(true);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
 
 
  const [d2, setd2] = useState(false);
  const [d, setd] = useState("1");
  
 
  const translation = useRef(new Animated.Value(0)).current;
  const h = (18 / 100) * height;
  const [loading, setLoading] = useState(false); 
   

  const [dataSource, setDataSource] = useState([]);
 
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  
 

  
  React.useEffect(() => {
    (async () => {
      
     
        getData()
      
    })();
  }, []);

  async function getData() {
    console.log(offset);
    if (!loading && !isListEnd) {
      const user_data = await AsyncStorage.getItem("user_data");

      const d = JSON.parse(user_data);

      // console.log(dr)
      const data = {
        email: d.email,
        password: d.password,
        no: offset,
      };
     Tags(data)
        .then((response) => response.json())
        .then(async (responseJson) => {
          // Successful response from the API Call

          if (responseJson.data.user_tags.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson.data.user_tags]);
            // await AsyncStorage.setItem('Dts', JSON.stringify(dataSource));
            drs();
            
            setLoading2(false);
           
            setd2(true);
            Animated.timing(translation, {
              toValue: h,
              delay: 0,
              easing: Easing.elastic(4),
              useNativeDriver: true,
            }).start();
          } else {
            setIsListEnd(true);
            
            drs();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const up_down = (item) => {
    const newitem = DATA.map((val) => {
      if (val.id == item.id) {
        return { ...val, isChecked: !val.isChecked };
      } else {
        return val;
      }
    });
    setDATA(newitem);
  };

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
  // const Delete = (i) => {
  //   const newPeople = selected_data.filter((person) => person.id !== i.id);

  //   setSelected_data(newPeople);
  //   setarr(newPeople);
  // };

  const onsearch = () => {
    if (search == "") {
      setDATA(selected_data)
    } else {
      var a=[]
      let temp = DATA.filter((item) => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setDATA(a)
      setDATA(temp);
    }
  };

  const submit = () => {
    var newdata = {
      id: new Date(),
      name: notes,
      s: false,
    };
    arr.push(newdata);
    //  setSelected_data([...arr,newdata]);
  };

  const drs = async () => {

    var it = 0;
    // const myArray = await AsyncStorage.getItem('Dts')
    // const rt = JSON.parse(myArray)
    // console.log(rt.length)
    // console.log(rt)

    var a = [];
    dataSource.map((i) => {
      a.push({ ...i.CrmTag, isChecked: false,  });
    });
    
    setDATA(a);
   setSelected_data(a)
  };

 
  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading2 ? <Loader loading={loading2} /> : null}
      </View>
    );
  };
  
  const postdata = async () => {
    
     try {
      
    
       const user_data = await AsyncStorage.getItem("user_data");
       // const drop_data = await AsyncStorage.getItem("dropdown_data");
       const d = JSON.parse(user_data);
       const data = {
         email: d.email,
         des: des,
         id: id,
         name:tag,
         password: d.password,
       };
       Save_tag(data).then((response) => {
         response.json().then(async (data) => {
          
           console.log(data)
          //  DATA.map((i,index)=>{
          //   if(i.id== id){
          //     DATA[index] = { ...i, ...i.name = tag,
          //     };
          //   }
            
            
          // })
       
          navigation.goBack()
           setModalVisible(!modalVisible)
       
         
         
         });
       });
     } catch (error) {
       console.error(error);
     }
   };
 
   const Delete = async () => {
    
    try {
     
   
      const user_data = await AsyncStorage.getItem("user_data");
      // const drop_data = await AsyncStorage.getItem("dropdown_data");
      const d = JSON.parse(user_data);
      const data = {
        email: d.email,
     
        id: id,
       
        password: d.password,
      };
    Delete_Tag(data).then((response) => {
        response.json().then(async (data) => {
         
          console.log(data)
         //  DATA.map((i,index)=>{
         //   if(i.id== id){
         //     DATA[index] = { ...i, ...i.name = tag,
         //     };
         //   }
           
           
         // })
      
         navigation.goBack()
          setModalVisible(!modalVisible)
      
        
        
        });
      });
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOffset(0)
      setLoading2(true)
      getData();
    });
    
    return () => {
     // executed when unmount
     unsubscribe();
    
    }
}, [navigation]);

  
// console.log(DATA)
  const ItemView = ({ item, index }) => {
    return (
      
      // Flat List Item
     
       
      
            <View
              style={styles.flat_data}
            >
              <View
                style={styles.flat_view}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // marginStart: "3%",
                    
                    // alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.name}>{item?.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    
                      <TouchableOpacity
                        onPress={() =>{setd("1"),settag(item?.name),setid(item?.id),setdes(item?.description), setModalVisible(true)}}
                        style={styles.icn}
                      >
                        <Image style={styles.pencil} source={Images.editYellow} />
                      </TouchableOpacity>
                   
                    <TouchableOpacity
                      style={{  }}
                      onPress={() =>{ setid(item?.id),setd("5"),setModalVisible(true)}}
                    >
                      <View
                        style={styles.icn}
                      >
                         <Image style={styles.pencil} source={Images.delete} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{  }}
                      onPress={() => press(item)}
                    >
                      {item?.isChecked ? (
                        <Ionicons
                          name="ios-chevron-up"
                          size={25}
                          color="#808080"
                        />
                      ) : (
                        <Ionicons
                          name="ios-chevron-down"
                          size={30}
                          color="#808080"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: "row",  }}>
                  <Text style={styles.number}>Total Leads ({item?.total_leads})</Text>
                </View>
                {item?.isChecked ? (
                  <View style={{ flexDirection: "row",marginTop:"3%"  }}>
                    <Text style={styles.number}>
                      Description: ({item?.description})
                    </Text>
                  </View>
                  
                ) : null}
                 {item?.isChecked ? (
                  <View style={{ flexDirection: "row",  }}>
                    <Text style={styles.number}>
                      Verified Leads: ({item?.verified_leads})
                    </Text>
                  </View>
                  
                ) : null}
              </View>
            </View>
         
    );
  };

 

  return (
    <SafeAreaView style={styles.container}>

    {loading2 ? (
      <Loader loading={loading2} />
    ) : (
      <View>
        <View style={styles.input}>
      <TextInput
        ref={searchref}
        style={{fontSize:17,width:"90%",height:"100%"}}
        onChangeText={(text) => {
           setsearch(text);
        }}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Tags"
        placeholderTextColor={"#cccccc"}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace') {
            setDATA(selected_data),sett("1")
          }
        }}
      />
      <TouchableOpacity
        onPress={() =>{ onsearch(),sett("2")}}
      >
<FontAwesome name="search" size={22} color="black" />
      </TouchableOpacity>
     
    </View>
     {t=="1"?<FlatList
        style={{marginBottom:"15%"}}
          data={DATA}
         
         
          keyExtractor={(item, index) => index.toString()}
         
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />:<FlatList
        style={{marginBottom:"15%"}}
          data={DATA}
         
         
          keyExtractor={(item, index) => index.toString()}
         
          renderItem={ItemView}
          // ListFooterComponent={renderFooter}
          // onEndReached={getData}
          // onEndReachedThreshold={0.5}
        />}
        
      </View>
    )}

      {d2 ? (
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",

            position: "absolute",

            right: "6%",
            // width: Dimensions.get("window").width * 0.16,
            // height: Dimensions.get("window").width * 0.16,

            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,

            transform: [{ translateY: translation }],
            bottom: height * 0.28,
            elevation: 5,
          }}
        >
            <TouchableOpacity
            activeOpacity={1}
              // onPress={() => navigation.navigate(ScreenNames.NEW_LEADS)}
              onPress={() =>{ setd("2"),setModalVisible(true)}}
              // style={styles.floating_btn}
            >
              <Image
                source={Images.addLeads}
                style={{ width: Dimensions.get('window').width * 0.18,
                height: Dimensions.get('window').width * 0.18, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            </Animated.View>
      ) : null}


      {d == "1"?<Modal
        animationType="slide"
        transparent={true}
        avoidKeyboard={false}
        visible={modalVisible}
        onRequestClose={() => {
          
          setd(false)
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.main_modal}
        >
          <View style={styles.modalView}>
            <View
              style={styles.main_view}
            >
              <Text style={{ fontSize: 20 }}></Text>
              <Text style={styles.add}>
                Edit Your Tag
              </Text>
              <Pressable
                style={{}}
                onPress={() =>{setd(), setModalVisible(!modalVisible)}}
              >
                <Entypo name="cross" size={30} color="black" />
              </Pressable>
            </View>
            <View
              style={styles.modal_page}
            ></View>
            <View style={styles.modal_inner_view}>
              <Text
                style={styles.nam_tag}
              >
                Edit your tag
              </Text>
              <TextInput
                style={styles.input2}
                onChangeText={(txt) => settag(txt)}
                value={tag}
              
              />
              <Text
                style={styles.description}
              >
                Description
              </Text>
              <TextInput
                style={styles.input2}
                onChangeText={(txt) => setdes(txt)}
                value={des}
               
              
              />
              <TouchableOpacity
                onPress={() => setd("4")}
                style={styles.create}
              >
                <Text style={styles.create_txt}>Save Tag</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>: d=="2" ?<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setd(!d), setModalVisible(!modalVisible)
        }}
      >
        <View
          style={styles.main_modal}
        >
          <View style={styles.modalView}>
            <View
              style={styles.main_view}
            >
              <Text style={{ fontSize: 20 }}></Text>
              <Text style={styles.add}>
                Add Tag
              </Text>
              <Pressable
                style={{}}
                onPress={() =>{setd(!d), setModalVisible(!modalVisible)}}
              >
                <Entypo name="cross" size={30} color="black" />
              </Pressable>
            </View>
            <View
              style={styles.modal_page}
            ></View>
            <View style={styles.modal_inner_view}>
              <Text
                style={styles.nam_tag}
              >
                Name your tag
              </Text>
              <TextInput
                style={styles.input2}
                onChangeText={(txt) => settag(txt)}
                // value={tag}
              
              />
              <Text
                style={styles.description}
              >
                Description
              </Text>
              <TextInput
                style={styles.input2}
                onChangeText={(txt) => setdes(txt)}
                // value={des}
             
              />
              <TouchableOpacity
                    onPress={() => setd("3")}
                style={styles.create}
              >
                <Text style={styles.create_txt}>Create Tag</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>:d=="3"?<Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredVieww}>
              <View style={styles.modalVieww}>
              
                <Text style={styles.textStyle2}>Tag has been saved successfully</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                   
                    width: "100%",
                  }}
                ></View>
                <Pressable
                  style={{  }}
                  onPress={() => {
                   
                    setModalVisible(!modalVisible),postdata()
                  }}
                >
                  <Text style={styles.textStyle3}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>:d=="4"?<Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredVieww}>
              <View style={styles.modalVieww}>
                
                <Text style={styles.textStyle2}>Tag has been updated successfully</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                   
                    width: "100%",
                  }}
                ></View>
                <Pressable
                  style={{  }}
                  onPress={() => {
                   
                    setModalVisible(!modalVisible),postdata()
                  }}
                >
                  <Text style={styles.textStyle3}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>:d=="5"?<Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredVieww}>
              <View style={styles.modalVieww}>
                
                <Text style={styles.textStyle2}>Are you sure to delete this tag?</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#cccccc",
                   
                    width: "100%",
                  }}
                ></View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                <Pressable
                  style={{  }}
                  onPress={() => {
                   
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle3}>Cancel</Text>
                </Pressable>
                <View
                  style={{
                    height: height*0.06,
                    backgroundColor: "#cccccc",
                   
                    width: 1,marginLeft:"-8%"
                  }}
                ></View>
                <Pressable
                  style={{  }}
                  onPress={() => {
                   
                  Delete()
                  }}
                >
                  <Text style={styles.textStyle3}>OK</Text>
                </Pressable>
                </View>
                
              </View>
            </View>
          </Modal>:null}
      
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pencil: {
    height: height * 0.025,
    width: width * 0.07,
    resizeMode: "contain",
  },
  icn:{
                         
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 6,marginEnd:5,alignItems:"center",justifyContent:"center",height:height*0.038
  },
  flat_data:{
    flexDirection: "row",
    marginHorizontal: "3%",
    marginVertical: "1%",
  },
  flat_view:{
    width: "100%",

    elevation: 2,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 6,padding:"3%"
  },
  main_modal:{
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    alignItems: "center",
    
  },
  main_view:{
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%",
  },
  add:{ color: Colors.MAIN_COLOR,fontSize: wp("5.41%"), fontFamily: "Inter-Black" },
  
  modal_inner_view:{ marginHorizontal: "3%", marginTop: "2%" },
  nam_tag:{
    
    color: Colors.MAIN_COLOR,
    marginTop: "4%",
   fontSize: wp("5.01%"), fontFamily: "Inter-Black"
  },
  description:{
    fontSize: 16,
    color: Colors.MAIN_COLOR,
    marginTop: "4%",
    fontFamily:"Inter-Black",
  },
  create_txt:{ color: "white", fontSize: wp("5.01%"), fontFamily: "Inter-Black4",paddingHorizontal:"5%",paddingVertical:"3%" },
  create:{
    
    
    backgroundColor: "orange",
    alignSelf: "center",
    marginVertical: "7%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: wp("5.21%"), fontFamily: "Inter-Black2"
  },
  input2: {
    height: height * 0.06,

    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    marginTop: "1%",color:Colors.txt,fontSize: wp("5.21%"), fontFamily: "Inter-Black4"
  },
  input: {
    height: height * 0.075,
    width: width * 0.95,
    marginVertical: "2%",

    alignSelf: "center",
    backgroundColor: "white",
    elevation: 1,
    borderRadius: 20,
    color: "#808080",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "3%",borderWidth:0.7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(5, 5, 52, 0.3)",
  },
  modalView: {
    // height: height * 0.42,
    width: "87%",
    backgroundColor: "#ffffff",
    borderRadius: 10,

    elevation: 15,
    alignSelf: "center",marginTop:"50%"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  floating_btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: "19%",
    position: "absolute",
    bottom: "10%",
    right: "8%",
    height: "11%",
    backgroundColor: "orange",
    borderRadius: 100,
  },
  
 
  name: {
    borderRadius: 20,
    
    fontSize: wp("5.41%"), fontFamily: "Inter-Black",
    color: Colors.blue_txt,
  },
  number: {
    fontSize: wp("4.01%"), fontFamily: "Inter-Black",
    color: Colors.blue_txt,

    marginBottom: "1.5%",
  },
  
  circleview: { marginStart: "1%", marginEnd: "7%" },
  circle: {
    height: height * 0.1,
    width: width * 0.2,
    backgroundColor: "#e6e6e6",
    
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
    height: 2,
    marginVertical: "5%",
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

  container: { flex: 1, },
  line: {
    backgroundColor: "#cccccc",
    height: 0.5,
    marginVertical: "0%",
    width: "100%",
  },
  centeredVieww: {
    flex: 1,
    justifyContent: "center",
    
    marginTop: 0,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modalVieww: {
    width: "85%",
    backgroundColor: "#ececee",
    borderRadius: 20,

    elevation: 5,alignSelf:"center"
   
    // elevation: 20,
  },
  textStyle1: { fontSize: wp("5.41%"), fontFamily:"Inter-Black2",marginTop:"7%" },
  textStyle2: { fontSize: wp("4%") ,textAlign:"center",marginVertical:"7%",color:"#262626",},
  textStyle3: { fontSize: wp("5.01%"), color: "#2b92ee",fontFamily:"Inter-Black", marginVertical: "5%",textAlign:"center"},


});


export default User_tag2;
