import React, { Component } from "react";

import { Platform } from "react-native";
import renderIf from "render-if";

import {
  StyleSheet,
  Image,
  View,
  I18nManager,
  TouchableOpacity,
  Text
} from "react-native";
import Strings from "../../res/strings/Strings";

import { HEIGHT, WIDTH } from "../util/tools/Utility";
export const BackView = props => {
  const { backimgStyle } = styles;
  return (
    <Image
      resizeMode="contain"
      source={require("../../res/images/back_arrow.png")}
      style={backimgStyle}
    />
  );
};
export const LogoView = props => {
  global.cartCount = props.cartcount;
  const {
    logoImgStyle,
    mainHeaderStyle,
    walletImgStyle,
    iconsView,
    logoContainer,
    div,
    cartCountText,
    cartCountTextWrap,
    cartDiv,
    inViewHeader
  } = styles;
  return (
    <View style={[mainHeaderStyle, inViewHeader]}>
      <View style={logoContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Image
            resizeMode="contain"
            source={require("../../res/images/logo.png")}
            style={logoImgStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={iconsView}>
        <TouchableOpacity
          onPress={() => {
            if (props.navigation.state.routeName != "Wallet") {
              props.navigation.navigate("Wallet");
            }
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../res/images/wallet.png")}
            style={walletImgStyle}
          />
        </TouchableOpacity>
        <View style={div} />
        <TouchableOpacity
          style={cartDiv}
          onPress={() => {
            if (props.navigation.state.routeName != "Cart") {
              props.navigation.navigate("Cart");
            }
          }}
        >
          {Number(global.cartCount) > 0 ? (
            <View style={cartCountTextWrap}>
              <Text style={cartCountText}>{Number(global.cartCount)}</Text>
            </View>
          ) : (
            <View />
          )}
          <Image
            resizeMode="contain"
            source={require("../../res/images/cart.png")}
            style={walletImgStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const BackViewWithIcon = props => {
  const {
    logoImgStyle,
    mainHeaderStyle,
    walletImgStyle,
    iconsView,
    logoContainer,
    div,
    backViewContainer,
    backimgStyle,
    backContainer,
    cartCountText,
    cartCountTextWrap,
    cartDiv
  } = styles;
  return (
    <View style={mainHeaderStyle}>
      <View style={logoContainer}>
        <View style={backViewContainer}>
          <TouchableOpacity
            style={backContainer}
            onPress={() => {
              {
                if (props.navigation.state.routeName == "ProductDetails") {
                  props.navigation.state.params.onUpdate();
                } else if (props.navigation.state.routeName == "ViewProduct") {
                  if (props.navigation.state.params.onUpdate)
                    props.navigation.state.params.onUpdate();
                  else props.navigation.goBack();
                }
              }

              props.navigation.goBack();
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../res/images/back_arrow.png")}
              style={backimgStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <Image
              resizeMode="contain"
              source={require("../../res/images/logo.png")}
              style={logoImgStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={iconsView}>
        <TouchableOpacity
          onPress={() => {
            if (props.navigation.state.routeName != "Wallet") {
              props.navigation.navigate("Wallet");
            }
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../res/images/wallet.png")}
            style={walletImgStyle}
          />
        </TouchableOpacity>
        <View style={div} />
        <TouchableOpacity
          style={styles.cartDiv2}
          onPress={() => {
            if (props.navigation.state.routeName != "Cart") {
              props.navigation.navigate("Cart");
            }
          }}
        >
          {Number(global.cartCount) > 0 ? (
            <View style={cartCountTextWrap}>
              <Text style={cartCountText}>{Number(global.cartCount)}</Text>
            </View>
          ) : (
            <View />
          )}
          <Image
            resizeMode="contain"
            source={require("../../res/images/cart.png")}
            style={walletImgStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const PaymentView = props => {
  console.log(props.navigation.state.routeName);
  const {
    logoImgStyle,
    mainHeaderStyle,
    walletImgStyle,
    iconsView,
    logoContainer,
    div,
    backimgStyle,
    iconsViewShipment,
    backViewContainer,
    backContainer,
    iconsLabel,
    iconsDisabledLabel,
    threeIcon,
    twoIcon
  } = styles;
  const shipmentCheck = renderIf(
    props.navigation.state.routeName == "ViewAddress"
  );
  const shipmentCheckOne = renderIf(
    props.navigation.state.routeName == "DefaultTimeSlot"
  );
  const shipmentCheckTwo = renderIf(
    props.navigation.state.routeName == "TimeSlotMain"
  );
  const paymentCheck = renderIf(
    props.navigation.state.routeName == "PaymentOption"
  );
  const cardCheck = renderIf(
    props.navigation.state.routeName == "cardView"
  );
  const cardPayFail = renderIf(
    props.navigation.state.routeName == "FailedCardPayment"
  );
  const cardPaySuc = renderIf(
    props.navigation.state.routeName == "SuccessCardPayment"
  );
  const reportCheck = renderIf(props.navigation.state.routeName == "Report");
  console.log(props.navigation.state.routeName );
  return (
    <View style={mainHeaderStyle}>
      <View style={backViewContainer}>
        <TouchableOpacity
          style={backContainer}
          onPress={() => {
              if (props.navigation.state.routeName == "DefaultTimeSlot") {
              if (props.navigation.state.params.onAddressUpdate){
                props.navigation.state.params.onAddressUpdate(1, 0);
              } 
                props.navigation.goBack();
              }
              else if (props.navigation.state.routeName == "TimeSlotMain") {
              if (props.navigation.state.params.onAddressUpdate){
                props.navigation.state.params.onAddressUpdate(1, 1);
              } 
                props.navigation.goBack();
              }
              else if (props.navigation.state.routeName == "SuccessCardPayment") {
              props.navigation.navigate("Home");
              }
              else if (props.navigation.state.routeName == "FailedCardPayment") {
              props.navigation.navigate("Home");
              } else{ 
                props.navigation.goBack();
              }
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../res/images/back_arrow.png")}
            style={backimgStyle}
          />
        </TouchableOpacity>
      </View>

      {shipmentCheck(
        <View style={[iconsViewShipment, threeIcon]}>
          <Text style={iconsLabel}>1. {Strings.shipment}</Text>
          <Text style={[iconsLabel, iconsDisabledLabel]}>
            2. {Strings.payment}
          </Text>
          <Text style={[iconsLabel, iconsDisabledLabel]}>
            3. {Strings.report}
          </Text>
        </View>
      )}
      {shipmentCheckOne(
        <View style={[iconsViewShipment, threeIcon]}>
          <Text style={iconsLabel}>1. {Strings.shipment}</Text>
          <Text style={[iconsLabel, iconsDisabledLabel]}>
            2. {Strings.payment}
          </Text>
          <Text style={[iconsLabel, iconsDisabledLabel]}>
            3. {Strings.report}
          </Text>
        </View>
      )}
      {shipmentCheckTwo(
        <View style={[iconsViewShipment, threeIcon]}>
          <Text style={iconsLabel}>1. {Strings.shipment}</Text>
          <Text style={[iconsLabel, iconsDisabledLabel]}>
            2. {Strings.payment}
          </Text>
          <Text style={[iconsLabel, iconsDisabledLabel]}>
            3. {Strings.report}
          </Text>
        </View>
      )}
      {paymentCheck(
        <View style={[iconsViewShipment, twoIcon]}>
          <Text style={[iconsLabel]}>2. {Strings.payment}</Text>
          <Text style={[iconsLabel, iconsDisabledLabel]}>
            3. {Strings.report}
          </Text>
        </View>
      )}
      {reportCheck(
        <View style={[iconsViewShipment, threeIcon]}>
          <Text style={iconsLabel}>3. {Strings.report}</Text>
        </View>
      )}
      {cardCheck(
        <View style={[iconsViewShipment, threeIcon]}>
          <Text style={iconsLabel}>4. {Strings.cardPage}</Text>
        </View>
      )}
      {cardPayFail(
        <View style={[iconsViewShipment, threeIcon]}>
          <Text style={iconsLabel}>4. {Strings.cardPage}</Text>
        </View>
      )}
      {cardPaySuc(
        <View style={[iconsViewShipment, threeIcon]}>
          <Text style={iconsLabel}>4. {Strings.cardPage}</Text>
        </View>
      )}
    </View>
  );
};

export const LogoHeader = props => {
  console.log(props.navigation.state.routeName);
  const {
    logoImgStyle,
    mainHeaderStyle,
    walletImgStyle,
    iconsView,
    logoContainer,
    div,
    backViewContainer,
    backimgStyle,
    backContainer
  } = styles;
  return (
    <View style={mainHeaderStyle}>
      <View style={logoContainer}>
        <View style={backViewContainer}>
          <TouchableOpacity
            style={backContainer}
            onPress={() => {
              console.log(props.navigation.state.routeName);
              if (props.navigation.state.routeName == "AddNewAddress") {
                props.navigation.navigate("AddressList");
              } 
               else {
                props.navigation.goBack();
              }
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../res/images/back_arrow.png")}
              style={backimgStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoWrapper}
            onPress={() =>
              props.navigation.navigate("Home", { token: "<new token>" })
            }
          >
            <Image
              resizeMode="contain"
              source={require("../../res/images/logo.png")}
              style={logoImgStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
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
    height: 25,
    width: 25,
    paddingRight:10,
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
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  iconsDisabledLabel: {
    color: "#e0e0e0"
  }
});
