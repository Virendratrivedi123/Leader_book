import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable, StatusBar, FlatList } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { get_leads } from "../Services";
import AsyncStorage from "@react-native-async-storage/async-storage";


const data = [
    { value: 1, txt: 'React Native', isChecked: false },
    { value: 2, txt: 'Javascript', isChecked: false },
    { value: 3, txt: 'Laravel', isChecked: false },
    { value: 4, txt: 'PHP', isChecked: false },
    { value: 5, txt: 'jQuery', isChecked: false },
    { value: 6, txt: 'Boostrap', isChecked: false },
    { value: 7, txt: 'HTML', isChecked: false },
];

const Demo = () => {
    const [DATA, setDATA] = React.useState([]);
    const [d, setd] = useState(false);

    useEffect(() => {
      (async () => {
        const user_data = await AsyncStorage.getItem("user_data");
  
        const d = JSON.parse(user_data);
  
        // console.log(dr)
        const data = {
          email: d.email,
          password: d.password,
        };
  
        get_leads(data)
          .then((response) => response.json())
          .then((result) => {
            // console.log(result?.data?.leads)
            var a = [];
            result?.data?.leads.map((i) => {
            a.push({
              ...i.Lead,

              isChecked: false,
            });
          });
            setDATA(a);
            
          })
          
          .catch((error) => console.log("error", error));
      })();
    }, []);

    // console.log(DATA)

    const handleChange = (id) => {
        let temp = DATA.map((i) => {
            if (id === i.id) {
                return { ...i, isChecked: !i.isChecked };
            }
            return i;
        });
        setDATA(temp);
    };

    let selected = DATA.filter((i) => i.isChecked);
    // console.log(selected)
   

    const selectAlldata = () => {
      let temp = DATA.map((i) => {
       if(d == false)  {
            return { ...i, isChecked: true };
        }
        if(d == true)  {
          return { ...i, isChecked: false };
      }
        
    });
    setd(!d);
    setDATA(temp);
    };

   
        return (
          <View>
             <Text
            onPress={()=>{selectAlldata()}}
            style={styles.text}>Selected </Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                   
                        <View style={styles.card}>
                          {d == true?
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'space-between',
                                }}>
                                <Pressable onPress={() => handleChange(item.id)} >
                                    <MaterialCommunityIcons
                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#000" />
                                </Pressable>
                                <Text>{item.first_name}</Text>
                            </View>: <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'space-between',
                                }}>
                                
                                <Text>{item.first_name}</Text>
                            </View> }
                        </View>
                   
                )}
            />
            
            </View>
        );
    

   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 50,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    card: {
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',marginTop:50
    },
});

export default Demo;