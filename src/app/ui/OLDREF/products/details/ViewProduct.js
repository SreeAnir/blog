import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { BackViewWithIcon } from "../../../components/Header";
import { ApiCall } from "../../../network/RestApi";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import Swiper from "react-native-swiper";
import { OkAlert } from "../../../util/OKAlert/OKAlert";
import { addToCart } from "../../../components/Cart";
import { EventRegister } from "react-native-event-listeners";
let this_ = this;
var productDetails = -1;
var imageArray = [];
export default class ViewProduct extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerStyle: styles.headerStyle,
  //     headerTitleStyle: styles.headerTitleStyle,
  //     headerLeft: (
  //       <View>
  //         <BackViewWithIcon cartCount={"1"} navigation={navigation} />
  //       </View>
  //     )
  //   };
  // };

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    products = props.navigation.state.params.itemDetails;
    this.state = {
      selectedProductID: products,
      productDetail: -1,
      cartTotal: global.cartCount,
      imageArray: []
    };
  }
  async componentDidMount() {
    await this.addListViewProduct();
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }
  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  async addListViewProduct() {
    this.listener = EventRegister.addEventListener(
      "productDetailsCart",
      countCart => {
        global.cartCount = countCart;
        this.setState({ cartTotal: countCart });
        // console.log("product global.cartCount ", global.cartCount);
        // this.props.navigation.navigate("ViewProduct", {
        //   itemDetails: this.state.productDetail
        // });
      }
    );

    let selId = Number(this.state.selectedProductID.id);
    // loaderHandler.showLoader(Strings.Processing); //
    const queryString = ` query ($productId:Int!){
    getProduct(productId:$productId) {
      allergens,
      description,
      id,
      ingredients,
      name,
      nutritionalTable,
      categoryId,
      photo,
      price,
      unitMeasure,
      unitMeasurePrice,   
      }   
    }  `;

    const variables = {
      productId: selId
    };

    await ApiCall(queryString, variables).then(data => {
      let responseData = data.response;
      console.log("responseData", responseData);
      if (data.status != 1) {
        OkAlert(responseData.error, "Go Back to See the list");
        this.setState({ productDetail: "" });
        loaderHandler.hideLoader();
      } else {
        let details = responseData.getProduct;
        this.setState({ productDetail: details });
        loaderHandler.hideLoader();
      }

      productDetails = this.state.productDetail;
      this.setState({ imageArray: [] });
      if (productDetails != "") {
        this.state.imageArray.push(productDetails.photo);
      }
    });
    this.forceUpdate();
  }
  __saveTocart(product) {
    addToCart(product);
    //create a common function to
    // setData("customerOrderId",product);
    // setData("customerOrderId",product);
  }
  setGoback() {
    if (
      this.props.navigation.state.params.onUpdate != undefined && 
      typeof (this.props.navigation.state.params.onUpdate )!= undefined
    ) {
      this.props.navigation.state.params.onUpdate();
    }
    this.props.navigation.goBack();
  }
  render() {
    global.cartCount = this.state.cartTotal;
    return (
      <View style={styles.parentContainer}>
        <View style={[styles.mainHeaderStyle, styles.inViewHeader]}>
          <View style={styles.logoContainer}>
            <View style={styles.backViewContainer}>
              <TouchableOpacity
                style={styles.backContainer}
                onPress={() => this.setGoback()}
              >
                <Image
                  resizeMode="contain"
                  source={require("../../../../res/images/back_arrow.png")}
                  style={styles.backimgStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image
                  resizeMode="contain"
                  source={require("../../../../res/images/logo.png")}
                  style={styles.logoImgStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.iconsView}>
            <TouchableOpacity
              onPress={() => {
                if (this.props.navigation.state.routeName != "Wallet") {
                  this.props.navigation.navigate("Wallet");
                }
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../../../res/images/wallet.png")}
                style={styles.walletImgStyle}
              />
            </TouchableOpacity>
            <View style={styles.div} />
            <TouchableOpacity
              style={styles.cartDiv2}
              onPress={() => {
                this.props.navigation.navigate("Cart");
              }}
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
                source={require("../../../../res/images/cart.png")}
                style={styles.walletImgStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        {productDetails != "" && productDetails != -1 ? (
          <ScrollView>
            <View style={styles.container}>
              {/* <Image
                style={styles.fav_style}
                resizeMode={"contain"}
                source={require("../../../../res/images/icon_fav.png")}
              /> */}
            </View>
            <View style={styles.swiperContainer}>
              <Swiper
                style={styles.wrapper}
                key={this.state.imageArray.length}
                dot={<View style={styles.dotStyle} />}
                activeDot={<View style={styles.activeDotStyle} />}
                paginationStyle={{
                  bottom: 0.5
                }}
                onIndexChanged={index => {}}
                loop={false}
              >
                {this.state.imageArray.map(item => (
                  <View key={item} style={styles.bannerItemStyle}>
                    <ImageBackground
                      style={styles.bgImageStyle}
                      source={require("../../../../res/images/circle.png")}
                    >{console.log("image url",item)}
                      <Image
                        style={styles.image}
                        source={{ uri: item }}
                        resizeMode="contain"
                      />
                    </ImageBackground>
                  </View>
                ))}
              </Swiper>
            </View>
            <View>
              <Text style={styles.productNameText}>{productDetails.name}</Text>
              {/* <Text style={styles.decTextStyle}>
                {productDetails.description}
              </Text> */}
            </View>
            <View style={styles.containerTwo}>
              <View style={styles.logoWrapper}>
                {/* <Image
                  style={styles.logoStyle}
                  resizeMode="contain"
                  source={require("../../../../res/images/logo.png")}
                /> */}
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.itemPriceStyle}>
                  {productDetails.price}€
                </Text>
                <View>
                  <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => this.__saveTocart(productDetails)}
                  >
                    <Text style={styles.addTextStyle}>
                      {Strings.product_details_add}
                    </Text>
                  </TouchableOpacity>
                  {productDetails.unitMeasurePrice != null ? (
                    <Text style={styles.prezzoStyle}>
                      {Strings.price_for} {productDetails.unitMeasure}{" "}
                      {productDetails.unitMeasurePrice}€
                    </Text>
                  ) : (
                    <Text />
                  )}
                </View>
              </View>
            </View>
            <View>
              {/* <Text style={styles.decTitleStyle}>
                {Strings.product_details_description}
              </Text> */}
              <Text style={styles.decTextStyle}>
                {/* {productDetails.name} - {productDetails.nutritionalTable} */}
                {productDetails.description}
              </Text>
            </View>
            {/* {productDetails.categoryId == 1 ||
            productDetails.categoryId == 3 ? ( */}
              <View>
                {productDetails.ingredients != null ? (
                  <View>
                    <Text style={styles.small_heading}>Ingredienti:</Text>
                    <Text style={styles.smallLine}>
                      {productDetails.ingredients}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {productDetails.nutritionalTable != null ? (
                  <View>
                    <Text style={styles.small_heading}>
                      Tabella Nutrizionale:
                    </Text>
                    <Text style={styles.smallLine}>
                      {productDetails.nutritionalTable}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {productDetails.allergens != null ? (
                  <View>
                    <Text style={styles.small_heading}>Allergeni:</Text>
                    <Text style={styles.smallLine}>
                      {productDetails.allergens}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            {/* ) : (
              <View />
            )} */}
            <View />
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.noProducts}>
                {productDetails == -1 ? (
                  <Text style={styles.productNotFound}>
                    {Strings.ProductLoading}
                  </Text>
                ) : (
                  <Text style={styles.productNotFound}>
                    {Strings.Noproducts}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        )}
        <BusyIndicator
          text="Loading.."
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.buttonclickstyle, styles.iconBar1]}
            onPress={() => this.props.navigation.navigate("ProfileMenu")}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/profile.png")}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity
            onPress={() => this.props.navigation.navigate("Favorite")}
            style={styles.buttonclickstyle}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/favourite.png")}
            />
          </TouchableOpacity>*/}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Catalog")}
            style={[styles.buttonclickstyle, styles.iconBar2]}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/catalogue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TrenordCard", {})}
            style={[styles.buttonclickstyle, styles.iconBar3]}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/trenord.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("LombCard", {})}
            style={[styles.buttonclickstyle, styles.iconBar3]}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/lamb.png")}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
            style={styles.buttonclickstyle}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/settings.png")}
            />
          </TouchableOpacity>*/}
        </View>
        <TouchableOpacity
          onPress={() => this.callPhone()}
          style={styles.buttonContainer}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonTextStyle}>{Strings.home_btn}</Text>
            <Image
              style={styles.chatImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/chat.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
