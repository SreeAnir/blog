import React, { Component } from "react";
import axios from "axios";
import AddressForm from "../manage_address/AddressForm";

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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import CheckBox from "react-native-check-box";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let _this = null;

export default class EditAddress extends Component {
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
    this.state = {
      addressObj: []
    };
  }
  componentWillMount() {
    address = {
      name: "Sree Maggi Edit",
      city: "Milan",
      province: "MI",
      cap: "20143",
      state: "Italy",
      primary_address: 0
    };

    this.setState({
      addressObj: this.props.navigation.getParam("itemDetails", address)
    });
  }
  componentDidMount() {
    _this = this;
    EventRegister.addEventListener('editAddressListner',(data)=>{
      console.log('addressEdited');
      
      this.addressEdited()
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener('phoneCallbuttonPressed')
}

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  addressEdited(){
    console.log('addressEdited');
    EventRegister.removeEventListener('editAddressListner')
    this.props.navigation.state.params.onUpdateAddress();
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <AddressForm
          form_option={"edit"}
          {...this.props}
          address_data={this.state.addressObj}
        />
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
