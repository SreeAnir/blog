import { StyleSheet, Platform } from "react-native";
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
  parentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom:55
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: WIDTH,
    marginTop: 10
  },
  headerText: {
    color: "#959595",
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    lineHeight: 26,
    alignSelf: "center",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  profileDetailWrapper: {
    width: WIDTH
  },
  profileRow: {
    borderTopColor: "#c9c6c6",
    borderTopWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  addressContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#c9c6c6",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 5,
  },
  subhead:{
    paddingLeft:20,
    paddingRight:20,
    borderBottomWidth:1,
    borderBottomColor: "#bcbcbc",

  },
  altriText: {
    lineHeight: 40,
    color: "#2e7966",
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  altriAddress: {
    paddingBottom: 0,
    paddingTop: 0,
    lineHeight: 20,
    marginRight: 10,
    fontSize: 16,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  deletAddress:{
    color:'#ff6666',
    borderWidth:1,
    borderColor:'#ff6666',
    width:20,
    borderRadius:50,
    textAlign:"center",
    fontSize:13,
  },
  addButton: {
    paddingTop: 15,
    paddingBottom: 15
  },
  newAddressLabel: {
    alignSelf: "center",
    fontSize: 14,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  textLabel: {
    paddingBottom: 0,
    paddingTop: 0,
    lineHeight: 20,
    marginRight: 10,
    fontSize: 14,
    fontWeight: "100",
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  textLabelInput: {
    width: WIDTH - 60
  },
  textInpuWrapper: {
    flexDirection: "row"
  },
  closeCrossWrapper:{
    width:40,
    paddingLeft:5,
  },
  closeCross: {
    fontSize: 18,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  twoOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rightBox: {
    flexDirection: "row",
    alignSelf: "flex-start",
    width: WIDTH / 2
  },
  checkBoxView: {
    color: "#959595"
  },
  leftBox: {
    width: WIDTH / 2 - 20
  },

  lineSeparator: {
    borderTopColor: "#c9c6c6",
    borderTopWidth: 0.5
  },
  buttonContainer: {
    width: WIDTH,
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    backgroundColor: "#2e7965"
  },
  buttonTextStyle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  chatImageStyle: {
    width: 28,
    height: 28,
    marginLeft: 15,
    alignSelf: "center"
  }
});
