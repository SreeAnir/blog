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
    backgroundColor: "#fff"
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
 
  textLabel: {
    paddingBottom: 0,
    paddingTop: 0,
   lineHeight: 20,
    marginRight: 10,
    fontSize: 14,
    fontWeight:"100",
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
  closeCross: {
    fontSize: 14,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
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
  buttonContainerAdd: {
    bottom:0,
    justifyContent: 'flex-end',
    position: 'absolute',
   
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
