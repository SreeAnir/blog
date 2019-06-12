import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { ApiCall } from "../../network/RestApi";
import { OkAlert } from "../../util/OKAlert/OKAlert";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  SafeAreaView,
  BackHandler
} from "react-native";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import { setData } from "../../util/data/PreferenceData";
import { EventRegister } from "react-native-event-listeners";

let _this = null;
var totalPrice = "0.00 €";

export default class Cart extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.state = {
      cartItems: "",
      error: "",
      email:null
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackKeyButton
    );
  }
  async componentDidMount() {
    _this = this;
    BackHandler.addEventListener("hardwareBackPress", this.handleBackKeyButton);
    loaderHandler.showLoader(Strings.Processing); //
    let cartItemCount = await AsyncStorage.getItem("cartItemCount");
    if (cartItemCount != null) {
      global.cartCount = cartItemCount;
    }
    await this._loadCartApi();
    await this.getCustomerProfile();
    loaderHandler.hideLoader();
  }
  _selectProduct(item) {
    console.log("_selectProduct", item);
    item.id = item.productId;
    this.props.navigation.navigate("ViewProduct", {
      itemDetails: item
    });
  }
  clearProductClick(itemCart) {
    Alert.alert(
      itemCart.productName,
      "  verrà rimosso dal carrello",
      [
        {
          text: Strings.continue,
          onPress: () => {
            this._clearProductRow(itemCart);
          }
        },
        {
          text: Strings.cancel,
          onPress: () => {
            return false;
          }
        }
      ],
      { cancelable: false }
    );
  }
  async _clearProductRow(itemChange) {
    //API to create Row
    // alert("Removing "+itemChange.productName);
    let variables = {
      id: parseInt(itemChange.id)
    };
    let queryString = `mutation deleteCustomerOrderRow($id:Int!){
      deleteCustomerOrderRow(id:$id ){
        id
        orderTimestamp
        totalAmount
        customerOrderRows{
         id
         productId
         productName
         photo
         unitsNumber
         total
       }
    }
  }
 `;
    ApiCall(queryString, variables).then(data => {
      let dataResponse = data.response;
      console.log("dataResponse", dataResponse);
      if (data.status == 1) {
        //save updated count
        // alert("cart product row deleted");
        OkAlert(itemChange.productName, Strings.was_removed);
        this.__renderCartresponse(dataResponse.deleteCustomerOrderRow);
        this._loadCartApi();
      } else {
        console.log("Error" + JSON.stringify(dataResponse));
      }
    });
  }
  
  async _deleteRowProduct(itemCart) {
    if (itemCart.unitsNumber == 1) {
      alert("Clicca su TOGLI per rimuovere questo articolo");
    } else {
      let inc_index = this.state.cartItems.customerOrderRows.indexOf(itemCart);
      this.setState(cartItems => {
        const list = this.state.cartItems.customerOrderRows.map((item, j) => {
          if (j == inc_index) {
            if (parseInt(item.unitsNumber) > 1) {
              item.unitsNumber = parseInt(item.unitsNumber) - 1;
              this.setProductRow(item, inc_index, "-");
            }
          }
        });
        return {
          list
        };
      });
      let cartItemCount = await AsyncStorage.getItem("cartItemCount");
      cartItemCount--;
      global.cartCount = cartItemCount;
      setData("cartItemCount", cartItemCount);
      this.forceUpdate();
    }
  }
  async _addRowProduct(itemCart) {
    // alert(JSON.stringify(this.state.cartItems));
    cartCount = 0;
    let inc_index = this.state.cartItems.customerOrderRows.indexOf(itemCart);
    // alert(inc_index);
    this.setState(cartItems => {
      const list = this.state.cartItems.customerOrderRows.map((item, j) => {
        if (j == inc_index) {
          item.unitsNumber = parseInt(item.unitsNumber) + 1;
          this.setProductRow(item, inc_index, "+");
        }
      });
      return {
        list
      };
    });
    let cartItemCount = await AsyncStorage.getItem("cartItemCount");
    cartItemCount++;
    global.cartCount = cartItemCount;
    setData("cartItemCount", cartItemCount);
    this.forceUpdate();
  }
  setProductRow(itemChange, inc_index, oper) {
    //API to create Row
    let variables = {
      id: parseInt(itemChange.id),
      unitsNumber: itemChange.unitsNumber
    };
    let queryString = `mutation updateRowUnitsNumber($id:Int!,$unitsNumber :Int!){
      updateRowUnitsNumber(id:$id , unitsNumber: $unitsNumber){
        id
        orderTimestamp
        totalAmount
        customerOrderRows{
         id
         productId
         productName
         photo
         unitsNumber
         total
       }
      }
  }
 `;
    ApiCall(queryString, variables).then(data => {
      let dataResponse = data.response;
      let uNumber = itemChange.unitsNumber;
      console.log(dataResponse);
      if (data.status == 1) {
        //save updated count
        prodList = dataResponse.updateRowUnitsNumber;
        this.__renderCartresponse(prodList);
      } else {
       OkAlert(dataResponse.errors[0]['message'],"");
        if (oper == "-") {
          uNumber = (uNumber) + 1;
          global.cartCount =global.cartCount +1; 
        } else {
          uNumber = (uNumber) - 1;
          global.cartCount =global.cartCount-1 ; 
        }
        setData("cartItemCount",  global.cartCount ); 
        this.setState(cartItems => {
          const list = this.state.cartItems.customerOrderRows.map((item, j) => {
            if (j == inc_index) {
              //alert(uNumber);
              item.unitsNumber =uNumber;
              // parseInt(item.unitsNumber) + 1;
            }
          });
          return {
            list
          };
        });
      }
    });
  }
  
  _proceedCheckout() {
    console.log("this.state.email",this.state.email);
    if(this.state.email==null){
      OkAlert(Strings.error,Strings.error_email);
      return false;
    }
    this.props.navigation.navigate("ViewAddress");
  }

  async getCustomerProfile() {
    const queryString = ` query {
      profile {
      email,
       }   
      } `;
    loaderHandler.showLoader(Strings.Processing); //
    return await ApiCall(queryString, null).then(data => {
      let profileData = data.response.profile;
      if (data.status == 1) {
        this.setState({ email: profileData.email });
      } else {
        this.setState({ email: null });
      }
      loaderHandler.hideLoader();
    });
  }

  _clearStorage() {
    AsyncStorage.removeItem("cartProducts");
    AsyncStorage.removeItem("customerOrder");
  }
  async componentWillMount() {
    let cartItemCount = await AsyncStorage.getItem("cartItemCount");

    if (cartItemCount != null) {
      global.cartCount = cartItemCount;
    }
  }
  handleBackKeyButton() {
    _this.goBack();
    return true;
  }
 
  async _loadCartApi() {
    let queryString = `query  {  
      getCustomerOrder {
        id
        orderTimestamp
        totalAmount
        customerOrderRows  {
          id
          productName
          photo
          unitsNumber
          total
          productId
        }
    } }
    `;

    return ApiCall(queryString, null).then(data => {
      let dataResponse = data.response;
      let prodList = "";
      if (data.status == 1) {
        prodList = dataResponse.getCustomerOrder;
        this.__renderCartresponse(prodList);
        // }
      } else {//data.message 
        this.setState({ error:Strings.no_product_cart});
        prodList = "";
        setData("cartItemCount", 0);
        global.cartCount = 0;
        this.setState({ cartItems: prodList });
      }
    });
  }

  __renderCartresponse(prodList) {
    console.log("prodList", prodList);
    let cartCount = 0;
    totalPrice = prodList.totalAmount + " €";
    let orderId = prodList.id;
    setData("customerOrder", orderId);
    let customerOrderRows = prodList.customerOrderRows;
    for (itm of customerOrderRows) {
      cartCount = parseInt(itm.unitsNumber) + parseInt(cartCount);
    }
    this.setState({ cartItems: prodList });
    setData("cartItemCount", cartCount);
    global.cartCount = Number(cartCount);
  }
  goBack() {
    //this.props.navigation.state.params.onUpdate();
    this.props.navigation.navigate("Home", { token: "<new token>" });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  render() {
    let listItem = -1;

    if (this.state.cartItems != "") {
      listItem = this.state.cartItems.customerOrderRows;

      if (typeof listItem == "object") {
        if (listItem.length == 0) {
          listItem = null;
        }
      }
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          <View style={styles.headerStyle}>
            <View style={styles.mainHeaderStyle}>
              <View style={styles.logoContainer}>
                <View style={styles.backViewContainer}>
                  <TouchableOpacity
                    style={styles.backContainer}
                    onPress={() => this.goBack()}
                  >
                    <Image
                      resizeMode="contain"
                      source={require("../../../res/images/back_arrow.png")}
                      style={styles.backimgStyle}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Home")}
                  >
                    <Image
                      resizeMode="contain"
                      source={require("../../../res/images/logo.png")}
                      style={styles.logoImgStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.iconsView}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Wallet");
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../../../res/images/wallet.png")}
                    style={styles.walletImgStyle}
                  />
                </TouchableOpacity>
                <View style={styles.div} />
                <TouchableOpacity
                  style={styles.cartDiv2}
                  // onPress={() => {
                  //     props.navigation.navigate("Cart");
                  // }}
                >
                  {Number(global.cartCount) > 0 ? (
                    <View style={styles.cartCountTextWrap}>
                      <Text style={styles.cartCountText}>
                        {Number(global.cartCount)}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}
                  <Image
                    resizeMode="contain"
                    source={require("../../../res/images/cart.png")}
                    style={styles.walletImgStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* end header */}
          </View>
          <KeyboardAwareScrollView style={styles.parentContainer}>
            <View style={styles.container}>
              <Text style={styles.headerText}>{Strings.cart_title}</Text>
              {this.state.error != "" ? (
                <View style={styles.flatListContainer}>
                  <Text style={styles.no_product_cart}>{this.state.error}</Text>
                </View>
              ) : (
                <Text />
              )}
              <View style={styles.flatListContainer}>
                {listItem != null ? (
                  <FlatList
                    data={listItem}
                    extraData={this.state}
                    keyExtractor={(x, i) => i.toString()}
                    numColumns={1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View style={styles.cartItemParentContainer}>
                        <View style={styles.box1}>
                          <View style={styles.itemContainer}>
                            <TouchableOpacity
                              onPress={() => this._selectProduct(item)}
                            >
                              <ImageBackground
                                style={styles.bgImageStyle}
                                source={require("../../../res/images/circle-small.png")}
                              >
                                <Image
                                  style={styles.imageStyle}
                                  source={{ uri: item.photo }}
                                  resizeMode="contain"
                                />
                              </ImageBackground>
                            </TouchableOpacity>
                            <View
                              style={{
                                flexDirection: "column"
                              }}
                            >
                              <Text style={styles.itemNameStyle}>
                                {item.productName}
                              </Text>
                              <Text
                                onPress={() => this.clearProductClick(item)}
                                style={styles.itemDelete}
                              >
                                {Strings.Delete}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Text style={[styles.itemPriceStyle, styles.box2]}>
                          {item.total} €
                        </Text>
                        <View style={styles.box3}>
                          <TouchableOpacity
                            style={styles.qtyBtnContainer}
                            onPress={() => this._deleteRowProduct(item)}
                          >
                            <Text style={styles.qtySelectionStyle}>-</Text>
                          </TouchableOpacity>
                          <View style={styles.qtyBorder}>
                            <Text style={styles.qtyTextStyle}>
                              {item.unitsNumber}
                            </Text>
                          </View>

                          <TouchableOpacity
                            style={styles.qtyBtnContainer}
                            onPress={() => this._addRowProduct(item)}
                          >
                            <Text style={styles.qtySelectionStyle}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <View>
                    <View style={styles.noProducts}>
                      {listItem == -1 ? (
                        <Text style={styles.loading_cart}>
                          {Strings.loading_cart}
                          {listItem}
                        </Text>
                      ) : (
                        <Text style={styles.no_product_cart}>
                          {Strings.no_product_cart}
                          {listItem}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAwareScrollView>
          <BusyIndicator
            text="Loading.."
            size="large"
            color={"#2F7965"}
            textColor={"#e2be5a"}
            overlayColor={"#eee"}
          />
          {listItem != null ? (
            <View style={styles.footerContainer}>
              {listItem != "" && listItem != -1 ? (
                <View>
                  <View style={styles.totalContainer}>
                    <View style={styles.totalTitleContainer}>
                      <Text style={styles.totalTitleTextStyle}>
                        {Strings.cart_total_text}
                      </Text>
                    </View>
                    <View style={styles.totalPriceContainer}>
                      <Text style={styles.totalTextStyle}>{totalPrice}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => this._proceedCheckout()}
                    style={styles.checkOutButtonContainer}
                  >
                    <View style={styles.checkOutButtonContainer}>
                      <Text style={styles.buttonTextStyle}>
                        {Strings.cart_check_out}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
              <TouchableOpacity
                onPress={() => this.callPhone()}
                style={styles.buttonContainer}
              >
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonTextStyle}>{Strings.home_btn}</Text>
                  <Image
                    style={styles.chatImageStyle}
                    resizeMode={"contain"}
                    source={require("../../../res/images/chat.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
