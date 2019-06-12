import { StyleSheet, Platform } from "react-native";
import Strings from "../../../res/strings/Strings";
import Colors from "../../../res/colors/Colors";
import { HEIGHT, WIDTH } from "../../util/tools/Utility";

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.appcolor,
    height: 55,
    padding: 10,
  },
  headerTitleStyle: {
    color:"#969696",
    alignSelf: "center",
    flexGrow: 0.5,
    textAlign: "center",
    fontSize: 16,
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
    color: "#969696",
    fontSize: 16,
    marginBottom: 10,
    marginTop:10,
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
    width: WIDTH,
    paddingBottom:10,

  },
  paragraph:{
    paddingTop:10,
    paddingLeft:20,
    paddingRight:20,
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
  profileRow: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft:15,
    paddingRight:15,
    width: WIDTH - 5,
    alignSelf: "center",
    flex: 1,
    flexDirection:"row",
  },
  lineSeparator: {
    borderColor: "#808080",
    borderBottomWidth: 0.5,
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row"
  },
  toggle_icon: {
    width: 40,
    height: 25,
  },
  icon_list: {
    width: 15,
    height: 15,
    marginTop:10,
  },
  textLabel: {
    flex: 0.9,
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 28,
    marginRight: 10,
    fontSize: 16,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lato_bold
      },
      android: {
        fontFamily: Strings.lato_bold
      }
    })
  },
  buttonContainer: {
    width: 30
  },
  textLabelInfoOption:{
    flex: 0.9,
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 28,
    marginRight: 10,
    fontSize: 16,
    color: "#2e7966",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  textLabelInfo: {
    paddingBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 30,
    marginRight: 10,
    fontSize: 16,
    marginTop:2,
    color: "#2e7966",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  }
});
