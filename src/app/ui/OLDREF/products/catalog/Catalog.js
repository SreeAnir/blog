import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { OkAlert } from "../../../util/OKAlert/OKAlert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ApiCall } from "../../../network/RestApi";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import renderIf from "render-if";

let _this = null;

export default class Catalog extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.state = {
      search_term: "",
      catalogData: [],
      activeList: -1,
      cartTotal: global.cartCount
    };
  }
  componentDidMount() {
    _this = this;
    const queryString = ` query {
      listCategories {
        id,name,subcategories {
          id,name
        }
        
        } 
    } `;
    loaderHandler.showLoader(Strings.Processing); //
    ApiCall(queryString, null).then(data => {
      let responseData = data.response;
      if (data.status != 1) {
        loaderHandler.hideLoader();
        OkAlert(Strings.Error, responseData.errors[0].message);
      } else {
        this.setState({ catalogData: responseData.listCategories });
        setTimeout(function() {
          loaderHandler.hideLoader();
        });
      }
    });
  }
  _chooseCategory(item) {
    let selectedItem = item;
    this.props.navigation.navigate("catalogProducts", {
      productList: selectedItem,
      searchTerm: ""
    });
  }
  updateCartCount() {
    this.setState({ cartTotal: global.cartCount });
  }
  _searchProduct() {
    if (this.state.search_term.length < 3) {
      alert("3" + Strings.minimum_char);
      return false;
    }
    if (this.state.search_term != "") {
      loaderHandler.showLoader(
        Strings.Searchingfor + " " + this.state.search_term
      );
      this.props.navigation.navigate("catalogProducts", {
        productList: "",
        searchTerm: this.state.search_term,
        onUpdate: () => this.updateCartCount()
      });
    }
  }
  _toggleSubcategory(index) {
    if (this.state.activeList == index) {
      this.setState({ activeList: -1 });
    } else {
      this.setState({ activeList: index });
    }
  }
  setGoback() {
    this.props.navigation.navigate("Home", { token: "<new token>" });
  }
  renderHeader() {
    return (
      <View style={[styles.mainHeaderStyle, styles.inViewHeader]}>
        <View style={styles.logoContainer}>
          <View style={styles.backViewContainer}>
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => {
                this.setGoback();
              }}
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
            {Number(this.state.cartTotal) > 0 ? (
              <View style={styles.cartCountTextWrap}>
                <Text style={styles.cartCountText}>
                  {Number(this.state.cartTotal)}
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
    );
  }
  renderList(itemSel, index) {
    return (
      <View>
        <View style={styles.profileRow}>
          <TouchableOpacity
            onPress={() => this._toggleSubcategory(index)}
            style={styles.textInpuWrapper}
          >
            <Text style={[styles.textLabelCategory]}>{itemSel.name}</Text>
            <Image
              style={styles.arrow_icon}
              resizeMode={"contain"}
              source={require("../../../../res/images/forward.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lineSeparator} />
        {renderIf(this.state.activeList == index)(
          <FlatList
            data={itemSel.subcategories}
            keyExtractor={(x1, i1) => i1.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.profileRow}>
                <TouchableOpacity
                  onPress={() => this._chooseCategory(item)}
                  style={styles.textInpuWrapper}
                >
                  <Text style={[styles.textLabelCategory,styles.subCatTxt]}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    );
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  render() {
    let listItem = this.state.catalogData;
    return (
      <View style={styles.parentContainer}>
        {this.renderHeader()}
        <KeyboardAwareScrollView style={styles.parentContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.CATALOG}</Text>
            <View style={styles.profileDetailWrapper}>
              <View style={styles.searchContainer}>
                <Image
                  resizeMode="contain"
                  source={require("../../../../res/images/search.png")}
                  style={styles.searchIconStyle} onPress={() =>this._searchProduct() }
                />
                <TextInput
                  returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                  placeholderTextColor="#ffffff"
                  placeholder={Strings.home_search}
                  placeholderTextColor="#959595"
                  underlineColorAndroid="transparent"
                  onChangeText={value => this.setState({ search_term: value })}
                  style={styles.textInputStyle}
                  onEndEditing={() => this._searchProduct()}
                />
              </View>
              {/* <View style={styles.borderSearch} /> */}
              <FlatList
                data={listItem}
                extraData={this.state}
                keyExtractor={(x, i) => i.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => this.renderList(item, index)}
              />
            </View>
            <View />
          </View>
        </KeyboardAwareScrollView>
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
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
      </View>
    );
  }
}
