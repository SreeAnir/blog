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
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  headerText: {
    color: "#959595",
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 15,
    textTransform: "uppercase",
    lineHeight: 26,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  labelLight: {
    color: "#b3b3b3",
    alignSelf: "center",
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  flatListContainer: {
    alignItems: "flex-start",
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15
  },
  addresstContainer: {
    borderWidth: 1,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#bcbcbc",
    width: WIDTH - 60
  },
  selectedAddress: {
    backgroundColor: "#F37756"
  },
  textAddressSelected: {
    color: "#FFF"
  },
  fontBright:{
    color: "#FFF",
  },
  fontFade:{
    color: "#959595",
  },
  altriAddress: {
    paddingBottom: 0,
    paddingTop: 0,
    lineHeight: 20,
    marginRight: 10,
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
  addressContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textAddressDefault: {
    color: "#bcbcbc"
  },
  textAddress: {
    textAlign: "left",
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  textContainer: {
    alignSelf: "center",
    marginLeft: 10
  },
  totalTitleTextStyle: {
    alignSelf: "flex-start",
    marginLeft: 15,
    color: "#959595",
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
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
