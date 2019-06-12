import React, { Component } from "react";
import axios from "axios";
import AddressForm from "../manage_address/AddressForm";
import { EventRegister } from "react-native-event-listeners";

import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
export default class AddNewAddress extends Component {
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
  }
  componentDidMount() {
    _this = this;
    EventRegister.addEventListener("addAddressListner", data => {
      this.addressAdded();
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }
  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }
  addressAdded() {
    EventRegister.removeEventListener("addAddressListner");
    this.props.navigation.state.params.onUpdateAddAddress();
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.parentContainer}>
        <AddressForm {...this.props} form_option={"new"} />
        <View style={styles.buttonContainerAdd}>
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
      </View>
    );
  }
}
