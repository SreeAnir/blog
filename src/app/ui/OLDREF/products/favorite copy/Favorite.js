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
import { LogoHeader } from "../../../components/Header";
import { EventRegister } from "react-native-event-listeners";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let _this = null;

export default class Favorite extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <LogoHeader navigation={navigation} />
        </View>
      )
    };
  };

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    _this = this;
  }
  _onClick(item) {
    this.props.navigation.navigate("favoriteProductsDetails", {
      productDetails: item
    });
  }
  _changeFavorite(item) {
    listItem = this.state.productsList;

    index = null;
    for (var arr = 0; arr < listItem.length; arr++) {
      if (listItem[arr].name == item.name) {
        index = arr;
      }
    }
    if (index != null) {
      listItem.splice(index, 1);
      this.setState({ productsList: listItem });
    }
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  render() {
    let listItem = this.state.productsList;
    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.preference}</Text>
            {listItem.length == 0 ? (
              <View>
                <Text style={styles.no_favourite}> {Strings.no_favorites}</Text>
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
                            source={{ uri: item.image }}
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
