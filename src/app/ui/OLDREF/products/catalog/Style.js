import { StyleSheet, Platform,I18nManager } from "react-native";
import Strings from "../../../../res/strings/Strings";
import Colors from "../../../../res/colors/Colors";
import { HEIGHT, WIDTH } from "../../../util/tools/Utility";

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.appcolor,
    height: 55,
    padding: 10
  },
  headerTitleStyle: {
    color: "#2e7867",
    alignSelf: "center",
    flexGrow: 0.5,
    textAlign: "center",
    fontSize: 17
  },
  //Logo
  mainHeaderStyle: {
    width: WIDTH,
    flexDirection: "row",
    paddingTop:2,
    paddingBottom:5,
  },
  inViewHeader: {
    ...Platform.select({
      ios: {
        marginTop:35,
      },
      android: {
        marginTop: 5,
      }
    })
    
  },
  backViewContainer: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  backContainer: {
    alignSelf: "center",
    width: 50
  },
  backimgStyle: {
    height: 25,
    width: 25,
    paddingRight: 10,
    marginRight: 5,
    alignSelf: "center",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  logoImgStyle: {
    height: 30,
    width: 130,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  logoContainer: {
    width: WIDTH - 140
  },
  logoWrapper: {
    flexDirection: "row",
    marginTop: 15,
    flex:0.5,
    justifyContent: "space-between"
  },
  cartDiv2: {
    marginRight: 15,
  
    width: 60,
    alignItems: "center",
    flexDirection: "column"
  },
  cartCountTextWrap: {
    backgroundColor: "green",
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: -14,
    borderWidth: 1,
    marginLeft: 5,
    zIndex: 1
  },
  cartCountText: {
    color: "#FFF",
    fontSize: 12,
    lineHeight: 15,
    fontFamily: Strings.lBold
  },
  div: {
    width: 1,
    height: 30,
    backgroundColor: "#dddddd"
  },
  iconsView: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  walletImgStyle: {
    height: 30,
    width: 70
  },
  //End logo
  parentContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: WIDTH,
    marginTop: 10
  },
  // textInputStyle: {
  //   marginLeft: 10,
  //   padding:10,
  //   fontSize: 14,
  //   fontSize: 14,
  //   marginTop:0,
  //   paddingBottom:2,
  //   ...Platform.select({
  //     ios: {
  //       fontFamily: Strings.lLight
  //     },
  //     android: {
  //       fontFamily: Strings.lLight
  //     }
  //   })
  // },
  textInputStyle: {
    marginLeft: 10,
    fontSize: 14,
    borderWidth:0.5,
    borderRadius:2,
    borderColor:"#F47855",
    width:WIDTH-90,
    fontSize: 14,
    padding:5,
    paddingLeft:5,
    paddingRight:0,
    fontFamily: Strings.lLight
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    // borderBottomWidth: 1,
    // borderBottomColor: "#e3e3e3",

  },
  borderSearch:{
    
  },
  searchIconStyle: {
    width: 20,
    height: 20,
    marginTop:5,
    alignSelf: "center",
    marginLeft: 5,
   },
  headerText: {
    color: "#959595",
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    lineHeight: 26,
    alignSelf: "center",
    fontFamily: Strings.lBold
  },
  profileDetailWrapper: {
    width: WIDTH,
    flex: 1
  },
  profileRow: {
    width: WIDTH - 60,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center"
  },
  arrow_icon: {
    width: 20,
    height: 20,
    flex: 0.1,
    alignSelf: "flex-end"
  },
  lineSeparator: {
    borderColor: "#f5f4f4",
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    width: WIDTH
  },
  textInpuWrapper: {
    flexDirection: "row",
    flex: 1
  },
  textLabelCategory: {
    flex: 0.9,
    paddingBottom: 0,
    paddingTop: 0,
    lineHeight: 28,
    marginRight: 10,
    fontSize: 16,
    color: "#2e7965",
    fontFamily: Strings.lSemiBold
  },
  subCatTxt:{
    paddingLeft:10,
    color: "#000",
  },
  buttonContainer: {
    width: WIDTH,
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    // marginTop: 15,
    backgroundColor: "#2e7965"
  },
  buttonTextStyle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
    fontFamily: Strings.lSemiBold
  },
  chatImageStyle: {
    width: 28,
    height: 28,
    marginLeft: 15,
    alignSelf: "center"
  }
});
