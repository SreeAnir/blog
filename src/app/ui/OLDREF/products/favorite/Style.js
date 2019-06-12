import { StyleSheet, Platform } from "react-native";
import Strings from "../../../../res/strings/Strings";
import Colors from "../../../../res/colors/Colors";
import { HEIGHT, WIDTH } from "../../../util/tools/Utility";

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: "#fff",
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
  no_favourite:{
    margin:10,
    fontSize:16
  },
  flatListContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 10,
    width: WIDTH
  },
  container: {
    flexDirection: "column",
    width: WIDTH,
    marginTop: 10,
    marginBottom:10
  },
  headerText: {
    color: "#959595",
    alignSelf: "center",
    textTransform: "uppercase",
    lineHeight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  searchIconStyle: {
    width: 20,
    height: 20,
    alignSelf: "center",
    marginLeft: 25
  },
  textInputStyle: {
    width: WIDTH,
    marginLeft: 10,
    fontSize: 14,
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
  fav_style: {
  
    position: "absolute",
    zIndex: 100,
     marginLeft: 0,
     marginTop: 3,
    alignSelf: "flex-start"
  },
  fav_style_icon:{
    width: 20,
    height: 20,
  },
  imageContainer: {
    width: (WIDTH - 30) / 2,
    height: (WIDTH - 30) / 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  imageStyle: {
    height: 100,
    width: 100
  },
  bgImageStyle: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  itemContainer: {
    width: WIDTH / 2 - 20,
    alignSelf: "center",
    alignItems: "center"
  },
  itemNameStyle: {
    textAlign: "center",
    marginTop: 5,
    color: "#bcbcbc",
    fontSize: 13,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  itemQtyStyle: {
    textAlign: "center",
    marginBottom: 5,
    color: "#bcbcbc",
    fontSize: 13,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  tabContainer: {
    flexDirection: "row",
    width: WIDTH
  },
  tabImageStyle: {
    width: 60,
    height: 60
  },
  buttonclickstyle: {
    width: 60,
    height: 60,
    flex: 1,
    alignItems: "center"
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
