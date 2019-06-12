import { StyleSheet, Platform, I18nManager } from "react-native";
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
  //Logo
  mainHeaderStyle: {
    width: WIDTH,
    flexDirection: "row",
    paddingTop: 2,
    paddingBottom: 5
  },
  inViewHeader: {
    ...Platform.select({
      ios: {
        marginTop: 35
      },
      android: {
        marginTop: 5
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
    flex: 0.5,
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
    fontFamily: Strings.lBold,
    // ...Platform.select({
    //   ios: {
    //     fontFamily: Strings.lBold
    //   },
    //   android: {
    //     fontFamily: Strings.lBold
    //   }
    // })
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
    backgroundColor: "#fff",
    width: WIDTH
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
    height: HEIGHT - 160
  },
  headerText: {
    color: "#959595",
    alignSelf: "flex-start",
    fontSize: 16,
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
  noProducts: {
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  productNotFound: {
    color: "#f74242",
    fontSize: 16,
    alignSelf: "center"
  },
  catalogItem: {
    color: "#959595",
    fontSize: 16
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center"
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
    fontFamily: Strings.lLight,
    // ...Platform.select({
    //   ios: {
    //     fontFamily: Strings.lLight
    //   },
    //   android: {
    //     fontFamily: Strings.lLight
    //   }
    // })
  },
  // div: {
  //   width: WIDTH - 30,
  //   height: 1,
  //   marginLeft: 15,
  //   backgroundColor: "#dddddd"
  // },
  imageContainer: {
    width: (WIDTH - 30) / 2,
    height: (WIDTH - 30) / 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  imageStyle: {
    height: 90,
    width: 90
  },
  // bgImageStyle: {
  //   height: 150,
  //   width: 150,
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  bgImageStyle: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 90,
    justifyContent: "center",
    borderColor: "#2e7965",
    alignItems: "center",
    alignSelf: "center"
  },
  bgImageStyleInner: {
    height: 145,
    width: 145,
    borderWidth: 1,
    borderRadius: 90,
    justifyContent: "center",
    borderColor: "#F37756",
    alignItems: "center"
  },
  itemContainer: {
    width: WIDTH / 2 - 20,
    alignSelf: "center",
    alignItems: "center"
  },
  textWrap: {
    height: 100,
    paddingBottom: 2
  },
  itemNameStyle: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 13,
    paddingTop: 2,
    // height: 75,
    color: "#282828",
    fontFamily: Strings.lSemiBold,
  },
  itemQtyStyle: {
    textAlign: "center",
    color: "#2e7965",
    fontSize: 15,
    fontFamily: Strings.lSemiBold,
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
  fav_style: {
    position: "absolute",
    zIndex: 100,
    marginLeft: 0,
    marginTop: 3,
    alignSelf: "flex-start"
  },
  fav_style_icon: {
    width: 20,
    height: 20
  },
  loadingTxt: {
    color: "#2e7965",
    fontSize: 16,
    alignSelf: "center"
  },
  buttonContainer: {
    width: WIDTH,
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    marginTop: 5,
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
