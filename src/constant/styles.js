import { Dimensions } from "react-native";
import { Colors } from "./colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const STYLES = {
  back_button: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
   width:50,
alignItems:'center',
height:"100%",
justifyContent:'center'
  },

  header: {
    color: "white",
    fontWeight: "normal",
    fontSize: 19,
    flex:1,
    textAlign: "center",
marginRight:50
  },
  header1: {
    color: "white",
    fontWeight: "500",
    fontSize: 22,
    // marginTop: "7%",
    textAlign: "center",
    flex: 0.9,
  },

  save_touch: {
    // marginTop: "8%",
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  save_touch1: {
    marginTop: "2%",
    width:60,
    alignItems: "center",
    justifyContent: "center",
  },

  save_text: {
    // color: "yellow",
    // borderWidth: 1.3,
    // borderColor: "yellow",
    // // paddingHorizontal: "6%",
    // borderRadius: 20,
    
    // fontSize: 14, fontFamily:"Inter-Black2",
    fontSize:14,borderColor:"yellow",borderWidth:1.3,borderRadius:20,color:"yellow",fontFamily:"Inter-Black2",
  },
  add_text: {
    color: "yellow",
                borderWidth: 1.3,
                borderColor: "yellow",
                paddingVertical: "1%",
                borderRadius: 20,
                fontFamily:"Inter-Black2",
                fontSize: 15,paddingHorizontal:"12%"
  },

  side_bar: {
    fontSize: 16,
    marginStart: "5%",
    marginTop: "0%",
  },

  bar_header: {
    color: "white",
    fontWeight: "500",
    fontSize: 22,
    marginTop: "0%",
  },
  header_box: {
    height: height * 0.08,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",
// justifyContent:"space-between",
    flexDirection: "row",
  },
  login_box: {
    height: height * 0.10,
    backgroundColor: Colors.MAIN_COLOR,
    alignItems: "center",

    // marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
 ICON_TEXT: {
    fontSize: 16,
    color: "black",
    fontWeight: "normal",
    marginStart: "3%",marginTop:"1%"
  },
  button: {
    height: "6%",
    width: "90%",
    marginTop: "5%",

    alignSelf: "center",
    backgroundColor: "#28608f",
    elevation: 1,
    borderRadius: 8,
    justifyContent: "center",
  },
};
