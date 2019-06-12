import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  FlatList
} from "react-native";

import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { BackViewWithIcon } from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ApiCall } from "../../../network/RestApi";
import { EventRegister } from "react-native-event-listeners";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

let _this = null;

export default class Favorite extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <BackViewWithIcon navigation={navigation} />
        </View>
      )
    };
  };

  constructor() {
    super();
    this.state = {};
    this.state = { productDetail: "-1" };
  }

  async componentDidMount() {
    _this = this;

    await this._loadProducts();
    favImage = [
      require("../../../../res/images/icon_fav.png"),
      require("../../../../res/images/icon_dislike.png")
    ];
  }
  async _loadProducts() {
    let queryString = ` query {searchProducts(term:"") {
      allergens,
      description,
      id,
      ingredients,
      name,
      nutritionalTable,
      photo,
      price,
      unitMeasure,
      unitMeasurePrice,  
      }   
       } `;
    let variables = null;

    loaderHandler.showLoader(Strings.Processing); //
    ApiCall(queryString, variables).then(data => {
      let responseData = data.response;
      console.log("Fav Api");
      console.log(responseData);
      if (data.status != 1) {
        loaderHandler.hideLoader();
      } else {
        listItemProduct = responseData.searchProducts;
        listItemProduct = listItemProduct.splice(0, 14);
        this.setState({ productDetail: listItemProduct });
        console.log(listItemProduct);
        setTimeout(function() {
          loaderHandler.hideLoader();
        }, 30);
      }
    });
  }
  _onClick(item) {
    this.props.navigation.navigate("ViewProduct", {
      itemDetails: item
    });
  }
  _changeFavorite(item) {
    // listItem = this.state.productsList;
    // index = null;
    // for (var arr = 0; arr < listItem.length; arr++) {
    //   if (listItem[arr].name == item.name) {
    //     index = arr;
    //   }
    // }
    // if (index != null) {
    //   listItem.splice(index, 1);
    //   this.setState({ productDetail: listItem });
    // }
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  render() {
    listItem = this.state.productDetail;
    console.log(listItem);

    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.preference}</Text>
            {(listItem.length == 0 || listItem == -1) ? (
              <View>
                {listItem.length == 0 ? (
                  <Text style={styles.no_favourite}>
                    {Strings.no_favorites}
                  </Text>
                ) : (
                  <Text />
                )}
              </View>
            ) : (
              <View style={styles.flatListContainer}>
                <FlatList
                  data={listItem}
                  extraData={this.state}
                  keyExtractor={(x, i) => i.toString()}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <TouchableOpacity
                        style={styles.fav_style}
                        onPress={() => this._changeFavorite(item)}
                      >
                        {/* <Image
                          style={styles.fav_style_icon}
                          resizeMode={"contain"}
                          source={require("../../../../res/images/icon_fav.png")}
                        /> */}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._onClick(item)}>
                        <ImageBackground
                          style={styles.bgImageStyle}
                          source={require("../../../../res/images/circle.png")}
                        >
                          <Image
                            style={styles.imageStyle}
                            source={{ uri: item.photo }}
                            resizeMode="contain"
                          />
                        </ImageBackground>
                        <Text style={styles.itemNameStyle}>{item.name}</Text>
                        <Text style={styles.itemQtyStyle}>{item.qty}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
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
