import { StyleSheet, Platform, I18nManager } from "react-native";
import Strings from "../../../../res/strings/Strings";
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
    fontSize: 17,
  },
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
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
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

  //header end
  parentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: WIDTH
  },
  container: {
    flex: 1,
    width: WIDTH,
    marginTop: 10
  },
  noProducts: {
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  productLoading: {
    color: "#eeee",
    fontSize: 16,
    alignSelf: "center"
  },
  productNotFound: {
    color: "#f74242",
    fontSize: 16,
    alignSelf: "center"
  },
  fav_style: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 30,
    top: 35,
    zIndex: 100,
    // marginLeft: 35,
    // marginTop: 35,
    alignSelf: "flex-start"
  },
  dotStyle: {
    backgroundColor: "#f37656",
    // backgroundColor: "transparent",
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5
  },
  activeDotStyle: {
    backgroundColor: "#2e7965",
    // backgroundColor: "transparent",
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5
  },
  bannerItemStyle: {
    width: WIDTH,
    alignSelf: "center",
    alignItems: "center",
    height: HEIGHT * 0.6,
    flexDirection: "column"
  },
  wrapper: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    justifyContent: "center",
    ...Platform.select({
      android: {
        width: 300
      }
    }),
    height: 300,
    marginTop: 35
  },
  bgImageStyle: {
    width: 290,
    height: 290,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    alignSelf: "center",
    width: 180,
    height: 180
  },
  productNameText: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
    color: "#282828",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  swiperContainer: {
    flex: 0.8,
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
    width: WIDTH
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
  containerTwo: {
    flexDirection: "row",
    width:WIDTH-60,
    marginTop: 10,
    marginLeft:15,
    marginRight:15,
  //  alignSelf: "center"
  },
  logoStyle: {
    padding: 8,
    height: 26,
    width: 82,
    marginLeft: 15
  },
  priceContainer: {
    flexDirection: "row",
    alignSelf: "center",
    flex: 0.5,
    height: 35,

  },
  itemPriceStyle: {
    textAlign: "center",
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 15,
    marginTop: 5,
    color: "#3f846f",
    fontSize: 20,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  btnContainer: {
    backgroundColor: "#f37656",
    width: 110,
    height: 35,
    alignSelf: "flex-end"
  },
  addTextStyle: {
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 35,
    justifyContent: "space-around",
    flex: 1,
    alignContent: "center",
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  decTitleStyle: {
    textAlign: "center",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 15,
    color: "#959595",
    alignItems: "center",
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  prezzoStyle: {
    color: "#969696",
    fontSize: 12,
    alignSelf: "center"
  },
  small_heading:{
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 15,
    color: "#606060",
    fontSize: 13,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  smallLine: {
    // textAlign: "center",
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 15,
    color: "#969696",
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  decTextStyle: {
    // textAlign: "center",
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 15,
    color: "#969696",
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  tabContainer: {
    flexDirection: "row",
    width: WIDTH-70,
    alignSelf:"center",
    marginBottom:10
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
  iconBar1:{
    alignItems:"center",
    //paddingRight:15,
  },
  iconBar2:{
    alignItems:"center",
   // paddingLeft:15,
  },
  iconBar3:{
    alignItems:"center",
   // paddingLeft:15,
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
  },
  imageStyle: {
    height: 45,
    width: 45,
    alignSelf: "center"
  },
  sellerContainer: {
    width: WIDTH / 3,
    alignSelf: "center"
  },
  sellerListcontainer: {
    height: 90,
    width: WIDTH
  },
  priceTextStyle: {
    color: "#959595",
    alignSelf: "center",
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  }
});
