import React, { useState, useEffect ,useCallback} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login_screen from "./src/Login";
import Forgot_pasword from "./src/ForgotPassword";
import Drawer_screen from "./src/Drawer";
import Recent from "./src/Main/Recent";
import Priority from "./src/Main/Priority";
import All from "./src/Main/All";
import { ScreenNames } from "./src/constant/ScreenNames";
import { LogBox } from "react-native";
import New_lead from "./src/Main/New_lead";

import Detail from "./src/Main/Detail";
import Basic_detail from "./src/Main/Detail_folder/Basic_detail";
import Profile from "./src/Main/Detail_folder/Profile";
import Related from "./src/Main/Detail_folder/Related";
import Lead_activity from "./src/Main/Detail_folder/Lead_activity";
import Edit_lead_detail from "./src/Main/Detail_folder/Edit_lead_detail";
import Comments from "./src/Main/Detail_folder/Comments";
import Appi from "./src/Services/Modal";
import Page from "./src/Main/Detail_folder/Related_page/Page";
import tpage from "./src/Main/Detail_folder/Related_page/Tpage";
import Npage from "./src/Main/Detail_folder/Related_page/Npage";
import Apage from "./src/Main/Detail_folder/Related_page/Apage";

import ChatScreen from "./src/components/recent_chats/Chat";
import Demo from "./src/components/Demo";
import View_saved_searches from "./src/Main/Detail_folder/Profile_page/View_saved_searches";
import Edit_searches from "./src/Main/Detail_folder/Profile_page/Edit_searches";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import * as SplashScreen from 'expo-splash-screen';
import Your_profile from "./src/Main/Detail_folder/Profile_page/Edit_searc_pages/Your_profile";
import News_Feed from "./src/Main/Detail_folder/Profile_page/Edit_searc_pages/News_feed";
import Saved_searches from "./src/Main/Detail_folder/Profile_page/Edit_searc_pages/Saved_searches";
import Change_pass from "./src/Main/Detail_folder/Profile_page/Edit_searc_pages/Change_pass";
import Cancel_account from "./src/Main/Detail_folder/Profile_page/Edit_searc_pages/Cancel_account";
import Modal_data from "./src/Main/Detail_folder/Profile_page/Edit_searc_pages/Modal_data";
import Data_next from "./src/Main/Detail_folder/Profile_page/Edit_searc_pages/Data_next";
import Search from "./src/Main/Search";
import Calender from "./src/Main/Calender";

SplashScreen.preventAutoHideAsync();



const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
       
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
     
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  return (
    <NavigationContainer  onLayout={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ScreenNames.LOGIN} component={Login_screen} />
        <Stack.Screen name={ScreenNames.FORGOT_PASSWORD} component={Forgot_pasword}/>
        <Stack.Screen name={ScreenNames.DRAWER} component={Drawer_screen} />
        <Stack.Screen name={ScreenNames.RECENT} component={Recent} />
        <Stack.Screen name={ScreenNames.PRIORITY} component={Priority} />
        <Stack.Screen name={ScreenNames.ALL} component={All} />
        <Stack.Screen name={ScreenNames.NEW_LEADS} component={New_lead} />
        <Stack.Screen name={ScreenNames.DETAIL} component={Detail} />
        <Stack.Screen name={ScreenNames.BASIC_DETAIL} component={Basic_detail} />
        <Stack.Screen name={ScreenNames.PROFILE} component={Profile} />
        <Stack.Screen name={ScreenNames.RELATED} component={Related} />
        <Stack.Screen name={ScreenNames.LEAD_ACTIVITY} component={Lead_activity} />
        <Stack.Screen name={ScreenNames.EDIT_LEAD_DETAIL} component={Edit_lead_detail} />
        <Stack.Screen name={ScreenNames.Comments} component={Comments} />
        <Stack.Screen name={ScreenNames.Page} component={Page} />
        <Stack.Screen name={ScreenNames.TPage} component={tpage} />
        <Stack.Screen name={ScreenNames.NPage} component={Npage} />
        <Stack.Screen name={ScreenNames.APage} component={Apage} />
        <Stack.Screen name={"chat"} component={ChatScreen}  />
        <Stack.Screen name={"demo"} component={Demo}  />
        <Stack.Screen name={"Saved_searches"} component={View_saved_searches}  />
        <Stack.Screen name={"Edit_searches"} component={Edit_searches}  />
        <Stack.Screen name={"Your_profile"} component={Your_profile}  />
        <Stack.Screen name={"News_feed"} component={News_Feed}  />
        <Stack.Screen name={"Saved_search"} component={Saved_searches}  />
        <Stack.Screen name={"Change_pass"} component={Change_pass}  />
        <Stack.Screen name={"Cancel_account"} component={Cancel_account}  />
        <Stack.Screen name={"Modal_data"} component={Modal_data}  />
        <Stack.Screen name={"Data_next"} component={Data_next}  />
        <Stack.Screen name={"Search"} component={Search}  />
        <Stack.Screen name={"Calender"} component={Calender}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
