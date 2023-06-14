import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Customdrawer from "./components/Custom_Drawer";
import {
  Dimensions,
} from "react-native";
import Tag from "./components/Tag";
import Tasks from "./components/Tasks";
import Appointments from "./components/Appointments";
import Phone from "./components/Phone";
import Last_logged_users from "./components/home1_data/Last_logged_users";
import Most_active_users from "./components/home1_data/Most_active_users";
import Edit_profile from "./components/home1_data/Edit_profile";
import Main_Screen from "./Main/Main_screen";
import Home from "./components/Home";
import { ScreenNames } from "./constant/ScreenNames";
import Add_appointment from "./components/Appointment/Add_appointment";
import Recent_chats from "./components/Recent_chats";

import Add_task from "./components/tasks/Add_tasks";

const Drawer = createDrawerNavigator();

const width = Dimensions.get("window").width;
function Drawer_screen() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false , drawerStyle: {
        width: width*0.63,
      }, }}
      drawerContent={(props) => <Customdrawer {...props} />}
    >
      <Drawer.Screen name={ScreenNames.MAIN_SCREEN} component={Main_Screen} />
      <Drawer.Screen name={ScreenNames.HOME} component={Home} />
      <Drawer.Screen name={ScreenNames.TAG} component={Tag} />
      <Drawer.Screen name={ScreenNames.TASKS} component={Tasks} />
      <Drawer.Screen name={ScreenNames.APPOINTMENTS} component={Appointments} />
      <Drawer.Screen name={ScreenNames.PHONE} component={Phone} />
      <Drawer.Screen name={ScreenNames.LAST_LOGGED_USERS} component={Last_logged_users} />
      <Drawer.Screen name={ScreenNames.MOST_ACTIVE_USERS} component={Most_active_users} />
      <Drawer.Screen name={ScreenNames.EDIT_PROFILE} component={Edit_profile} />
      <Drawer.Screen name={ScreenNames.ADD_APPOINTMENT} component={Add_appointment} />
      <Drawer.Screen name={ScreenNames.RECENT_CHATS} component={Recent_chats} />
  
      <Drawer.Screen name={ScreenNames.ADD_TASKS} component={Add_task} />
    </Drawer.Navigator>
  );
}

export default Drawer_screen;
