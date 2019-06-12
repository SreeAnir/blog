import { StyleSheet, Platform, I18nManager } from "react-native";
import Strings from "../../../res/strings/Strings";
import Colors from "../../../res/colors/Colors";
import { HEIGHT, WIDTH } from "../../util/tools/Utility";

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
  container: {
    flex: 1,
    flexDirection: "column",
    width: WIDTH,
    marginTop: 10
  },
  headerText: {
    color: "#959595",
    alignSelf: "center",
    fontSize: 16,
    fontFamily: Strings.lBold
  },
  flatListContainer: {
    alignItems: "flex-start",
    marginBottom: 5,
    padding: 10,
    width: WIDTH
  },
  itemContainer: {
    ///// width: WIDTH / 2,
    flexDirection: "row",
    marginBottom: 10
  },
  bgImageStyle: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    height: 33,
    width: 33
  },
  itemNameStyle: {
    width: WIDTH - 245,
    flexWrap: 'wrap',
    textAlign: "left",
    alignSelf: "flex-start",
    flexDirection: "column",
    alignContent: "center",
    color: "#282828",
    paddingBottom: 15,
    marginRight:2,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 2,
    fontSize: 10,
    fontFamily: Strings.lSemiBold
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  itemDelete: {
    fontSize: 11,
    fontFamily: Strings.lSemiBold,
    bottom: 10,
    position: "absolute",
    color: "#f74242"
  },
  itemQtyStyle: {
    textAlign: "center",
    alignSelf: "flex-start",
    marginBottom: 5,
    color: "#bcbcbc",
    fontSize: 10,
    fontFamily: Strings.lLight
  },
  textContainer: {
    alignSelf: "center",
    marginLeft: 10
  },
  cartItemParentContainer: {
    width: WIDTH,
    flexDirection: "row",
    flex: 1,
    marginBottom: 10
  },

  box1: {
    flex: 0.6,
    flexDirection: "row"
  },
  box2: {
    flex: 0.15,
    flexDirection: "row"
  },
  box3: {
    alignSelf: "flex-start",
    marginTop: 13,
    flex: 0.3,
    flexDirection: "row"
  },

  itemPriceStyle: {
    alignSelf: "flex-start",
    marginBottom: 5,
    // marginRight: 10,
    marginTop: 15,
    // marginLeft: 15,
    color: "#3f846f",
    alignItems: "center",
    fontSize: 12,
    fontFamily: Strings.lSemiBold
  },
  qtyBtnContainer: {
    width: 25,
    height: 25,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "#f67659"
  },
  qtySelectionStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Strings.lBold
  },
  noProducts: {
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  loading_cart: {
    color: "#969696",
    fontSize: 16
  },
  no_product_cart: {
    color: "#f74242",
    fontSize: 16,
    alignSelf: "center"
  },
  qtyTextStyle: {
    textAlign: "center",
    alignSelf: "center",
    color: "#969696",
    fontSize: 11,
    lineHeight: 22,
    fontFamily: Strings.lMedium
  },
  qtyBorder: {
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 50,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#dedcdd",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  footerContainer: {},
  totalTitleTextStyle: {
    alignSelf: "flex-start",
    marginLeft: 15,
    color: "#959595",
    fontSize: 14,
    fontFamily: Strings.lRegular
  },
  totalTextStyle: {
    textAlign: "center",
    marginRight: 15,
    alignSelf: "flex-end",
    alignContent: "flex-end",
    color: "#959595",
    fontSize: 16,
    fontFamily: Strings.lRegular
  },
  totalTitleContainer: {
    marginRight:10,
  },
  totalPriceContainer: {},
  totalContainer: {
    flexDirection: "row",
    width: WIDTH,
    justifyContent: "space-between",
    marginBottom: 10
  },
  buttonContainer: {
    width: WIDTH,
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    backgroundColor: "#2e7965"
  },
  checkOutButtonContainer: {
    width: WIDTH,
    flexDirection: "row",
    height: 65,
    justifyContent: "center",
    // marginTop: 15,
    backgroundColor: "#f37656"
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
  },

  //header Logo

  imgStyle: {
    height: 25,
    width: 30,
    marginLeft: 5,
    marginRight: 5
  },
  logoContainer: {
    width: WIDTH - 140
  },
  backContainer: {
    alignSelf: "center",
    width: 50
  },
  inViewHeader: {
    marginTop: 5
  },
  cartCountText: {
    color: "#FFF",
    fontSize: 12,
    lineHeight: 15,
    fontFamily: Strings.lBold
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

  cartDiv: {
    marginRight: 15,
    width: 50,
    alignItems: "center",
    flexDirection: "column"
  },
  cartDiv2: {
    marginRight: 15,
    width: 60,
    alignItems: "center",
    flexDirection: "column"
  },
  backimgStyle: {
    paddingRight: 10,
    height: 25,
    width: 25,
    marginRight: 5,
    alignSelf: "center",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  logoImgStyle: {
    height: 30,
    width: 130,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  logoWrapper: {
    //marginLeft: 5,
    //marginRight: 5,
    //padding: 8,
    // transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  walletImgStyle: {
    height: 30,
    width: 70
  },
  mainHeaderStyle: {
    width: WIDTH,
    flexDirection: "row"
  },
  iconsView: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  div: {
    width: 1,
    height: 30,
    backgroundColor: "#dddddd"
  },
  backViewContainer: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  iconsViewShipment: {
    flexDirection: "row",
    alignContent: "center"
  },
  twoIcon: {
    paddingLeft: 15,
    width: WIDTH - 50
  },
  threeIcon: {
    width: WIDTH - 30
  },
  iconsLabel: {
    flex: 1,
    alignContent: "space-around",
    color: "#9e9e9e",
    fontSize: 14,
    fontFamily: Strings.lBold
  },
  iconsDisabledLabel: {
    color: "#e0e0e0"
  }

  // enf header log
});
