import React, { Component } from "react";
import axios from "axios";

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { OkAlert } from "../../../util/OKAlert/OKAlert";
import CheckBox from "react-native-check-box";
import moment from "moment";
import { ApiCall } from "../../../network/RestApi";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
let _this = null;

export default class AddressForm extends Component {
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
      username: "",
      viaPiazza: null,
      provincia: null,
      cap: null,
      stato: null,
      comune: null,
      civico: null,
      citofono: null,
      scala: null,
      piano: null,
      interno: null,
      predefinito: false,
      primary_address: 0,
      isChecked: false,
      editId: 0,
      addressList: [],
      primaryaddressDetails: {}
    };
    this._radioButtonPress = this._radioButtonPress.bind(this);
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    var dt = date;

    var DateFormat = moment(date).format("DD/MM/YYYY");
    this.setState({
      dob: DateFormat
    });
    this._hideDateTimePicker();
    this.textOnFoxus("dob");
  };

  _radioButtonPress = itemVal => {
    //this.setState({ key: itemVal });
  };

  componentDidMount() {
    _this = this;
    this.listener = EventRegister.addEventListener(
      "serviceDeletedSuccessfull",
      data => {
        if (!global.isAddressDeleted) this.deleteAddress(data.item);
      }
    );

    if (this.props.form_option == "new") {
      this.setState({ editId: 0 });
    }
    if (this.props.form_option == "edit") {
      this.setState(this.props.address_data);
      if (this.props.address_data.predefinito == true) {
        this.setState({
          isChecked: true
        });
      }
      this.setState({ editId: Number(this.props.address_data.id) });
    }
    if (this.props.form_option == "list") {
      this.setState({ username: this.props.username });
      global.listShippingAddress = this.props.address_data;
      this.updateList(this.props.address_data);
      var primaryaddressArray = this.props.address_data.filter(function(data) {
        return data.predefinito == true;
      });
      if (primaryaddressArray.length == 0) {
        this.setState({ primaryaddressDetails: this.props.address_data[0] });
      } else {
        this.setState({ primaryaddressDetails: primaryaddressArray[0] });
      }
    }
    const radio_props = [
      { label: Strings.female, value: 0 },
      { label: Strings.male, value: 1 }
    ];
  }
  updateList(address_data) {
    let address_param = address_data;
    let secondList = [];
    let primary_address_count = 0;
    this.setState(address_data[0]); // just initialising,
    for (addItem of address_param) {
      if (addItem.predefinito && primary_address_count == 0) {
        primary_address_count = 1;
        this.setState(addItem);
        this.setState({ isChecked: true });
        this.setState({ editId: Number(addItem.id) });
      } else {
        secondList.push(addItem);
      }
    }

    this.setState({ addressList: secondList });
    this.forceUpdate();
  }

  changeTelematico(option_checked) {
    //check_telematico
    this.setState({ check_telematico: !option_checked });
  }
  selectAddress(item) {
    this.props.navigation.navigate("paymentOption");
  }
  deleteElement(item) {
    for (var i = 0; i < this.state.addressList.length; i++) {
      if (this.state.addressList[i].id == item.id) {
        delete this.state.addressList[i];
        this.setState({});
      }
    }
  }
  deleteAddress(item) {
    EventRegister.removeEventListener("serviceDeletedSuccessfull");
    global.isAddressDeleted = true;
    ////OkAlert(Strings.address_deletd , "");
    let variables = {
      id: parseInt(item.id)
    };
    let queryString = `mutation deleteShippingAddress($id:Int!){
      deleteShippingAddress(id:$id ){
      id
    }
  }
 `;

    ApiCall(queryString, variables).then(data => {
      let dataResponse = data.response;

      //alert("df");
      if (data.status == 1) {
        // this.props.update()
        //save updated count
        ///// alert(item.viaPiazza + " Deleted");
        // OkAlert("oooo", " Was Removed");
        //this._loadCartApi();
        let deletedId = dataResponse.deleteShippingAddress.id;
        let curData = _this.state.addressList;
        for (var i = 0; i < curData.length; i++) {
          if (parseInt(curData[i].id) == parseInt(deletedId)) {
            curData.splice(i, 1);
            this.updateList(curData);
            break;
          }
        }
      } else {
        apiMsg = data.message;
        OkAlert("Sorry!!!", apiMsg);
        return false;
      }
      loaderHandler.showLoader(Strings.Updating);
    });
    //address_data=[];
    //this.updateList(address_data);
  }
  closeButton() {
    if (this.state.show == 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            /// this.saveField();
          }}
          style={styles.closeCrossWrapper}
        >
          <Text style={styles.closeCross}>X</Text>
        </TouchableOpacity>
      );
    } else {
      return <Text />;
    }
  }
  textOnFoxus(field) {
    this.setState({ show: field });
  }
  saveFieldAddress() {
    // this.textOnFoxus("primary_address");
    this.UpdateAddress();
    this.setState({ show: null });
  }
  textOnFoxusOut() {
    this.setState({ show: 0 });
  }
  checkBoxSetting(primaryAdd) {
    this.setState({ isChecked: !this.state.isChecked });
    if (primaryAdd) {
      this.setState({ isChecked: true });
    }
  }
  makeEmpty(stringNull) {
    typeof stringNull;
    if (stringNull == null) {
      return "";
    } else {
      return stringNull;
    }
  }
  UpdateAddress() {
    if (
      this.state.viaPiazza != null &&
      this.state.comune != null &&
      this.state.provincia != null &&
      this.state.cap != null &&
      this.state.civico != null &&
      this.state.citofono != null &&
      this.state.piano != null &&
      this.state.editId != null
    ) {
      const variables = {
        viaPiazza: this.makeEmpty(this.state.viaPiazza),
        comune: this.makeEmpty(this.state.comune),
        id: Number(this.state.editId),
        provincia: this.makeEmpty(this.state.provincia),
        cap: this.makeEmpty(this.state.cap),
        civico: this.makeEmpty(this.state.civico),
        citofono: this.makeEmpty(this.state.citofono),
        scala: this.makeEmpty(this.state.scala),
        piano: this.makeEmpty(this.state.piano),
        predefinito: this.state.isChecked,
        interno: this.makeEmpty(this.state.interno),
        stato: this.makeEmpty(this.state.stato)
      };

      const queryString = ` mutation updateShippingAddress($viaPiazza: String!,
            $comune: String!,
            $id:Int!,
            $provincia: String!,
            $cap: String!,
            $civico: String!,
            $citofono:String!,
            $scala:String!,
            $piano:String!,
            $predefinito:Boolean!,
            $interno:String!,
            $stato:String!,)
          {updateShippingAddress(viaPiazza:$viaPiazza,
            comune: $comune,
            id:$id,
            provincia:$provincia,
            cap:$cap,
            civico:$civico,
            citofono: $citofono,
            scala: $scala,
            piano: $piano,
            predefinito: $predefinito,
            interno: $interno,
            stato: $stato) 
          {viaPiazza,comune,provincia,cap,civico,citofono,scala,piano,predefinito,interno,stato,id}} `;
      loaderHandler.showLoader(Strings.Updating);
      ApiCall(queryString, variables).then(data => {
        let responseRegister = data;
        if (responseRegister.status == 1) {
          // let curData = global.listShippingAddress;
          loaderHandler.hideLoader();
          OkAlert(Strings.address_updated);
          EventRegister.emit("editAddressListner");
        } else {
          apiMsg = data.message;
          OkAlert("Sorry!!!", apiMsg);
          return false;
        }
        loaderHandler.showLoader(Strings.Updating);
      });
      this.setState({ show: null });
    } else {
      alert(
        "Via/Viale/Piazza ,Civico,Comunem, CAP, Provincia, Piano and Citofono is required "
      );
    }
  }
  addNewAddress() {
    if (
      this.state.viaPiazza != null &&
      this.state.comune != null &&
      this.state.provincia != null &&
      this.state.cap != null &&
      this.state.civico != null &&
      this.state.citofono != null &&
      this.state.piano != null
    ) {
      const variables = {
        viaPiazza: this.makeEmpty(this.state.viaPiazza),
        comune: this.makeEmpty(this.state.comune),
        provincia: this.makeEmpty(this.state.provincia),
        cap: this.makeEmpty(this.state.cap),
        civico: this.makeEmpty(this.state.civico),
        citofono: this.makeEmpty(this.state.citofono),
        scala: this.makeEmpty(this.state.scala),
        piano: this.makeEmpty(this.state.piano),
        predefinito: this.state.isChecked,
        interno: this.makeEmpty(this.state.interno),
        stato: this.makeEmpty(this.state.stato)
      };
      const queryString = ` mutation createShippingAddress($viaPiazza: String!,
           $comune: String!,
            $provincia: String!,
            $cap: String!,
            $civico: String!,
            $citofono:String!,
            $scala:String!,
            $piano:String!,
            $predefinito:Boolean!,
            $interno:String!,
            $stato:String!,)
          {createShippingAddress(viaPiazza:$viaPiazza,
            comune: $comune,
            provincia:$provincia,
            cap:$cap,
            civico:$civico,
            citofono: $citofono,
            scala: $scala,
            piano: $piano,
            predefinito: $predefinito,
            interno: $interno,
            stato: $stato) 
          {viaPiazza,comune,provincia,cap,civico,citofono,scala,piano,predefinito,interno,stato}} `;
      ApiCall(queryString, variables).then(data => {
        let responseRegister = data;
        if (data.status) {
          OkAlert(Strings.new_address_added);
        } else {
          apiMsg = data.message;
          OkAlert("Sorry!!!", apiMsg);
          return false;
        }
        loaderHandler.showLoader(Strings.Updating);
        EventRegister.emit("addAddressListner");
      });
      this.setState({ show: null });
    } else {
      alert(
        "Via/Viale/Piazza ,Civico,Comunem, CAP, Provincia, Piano and Citofono is required "
      );
    }
  }
  render() {
    if (this.props.form_option == "list") {
      // addressList = this.props.address_data;
      // if((this.state.addressList).length>0 ) {
      addressList = this.state.addressList;
      /// }
    } else {
      let addressList = this.state;
    }
    return (
      <KeyboardAwareScrollView style={styles.parentContainer}>
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
        <View style={styles.container}>
          <Text style={styles.headerText}>{Strings.ADDRESS}</Text>
          {this.state.primary_address == 1 ? (
            <Text style={[styles.altriText, styles.subhead]}>
              Indirizzo predefinito
            </Text>
          ) : (
            <Text />
          )}

          <View style={styles.profileDetailWrapper}>
            {this.props.form_option != "list" && (
              <View>
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>Via/Viale/Piazza</Text>
                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("viaPiazza");
                      }}
                      maxLength={25}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ viaPiazza: text });
                      }}
                      value={this.state.viaPiazza}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>Civico</Text>

                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("civico");
                      }}
                      maxLength={25}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ civico: text });
                      }}
                      value={this.state.civico}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>Comune</Text>

                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("comune");
                      }}
                      maxLength={25}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ comune: text });
                      }}
                      value={this.state.comune}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>CAP</Text>
                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("cap");
                      }}
                      maxLength={15}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ cap: text });
                      }}
                      value={this.state.cap}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>{Strings.Province}</Text>

                  <View style={styles.textInpuWrapper}>
                    <TouchableOpacity style={styles.textInpuWrapper}>
                      <TextInput
                        onFocus={() => {
                          this.textOnFoxus("provincia");
                        }}
                        maxLength={15}
                        style={[styles.textLabel, styles.textLabelInput]}
                        onChangeText={text => {
                          this.setState({ provincia: text });
                        }}
                        value={this.state.provincia}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>{Strings.State}</Text>

                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("stato");
                      }}
                      maxLength={80}
                      style={[styles.textLabel, styles.leftBox]}
                      onChangeText={text => {
                        this.setState({ stato: text });
                      }}
                      value={this.state.stato}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>Scala</Text>

                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("scala");
                      }}
                      maxLength={25}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ scala: text });
                      }}
                      value={this.state.scala}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>Piano</Text>

                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("piano");
                      }}
                      maxLength={25}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ piano: text });
                      }}
                      value={this.state.piano}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>Interno</Text>

                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      onFocus={() => {
                        this.textOnFoxus("interno");
                      }}
                      maxLength={25}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ interno: text });
                      }}
                      value={this.state.interno}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>Citofono</Text>
                  <View style={styles.twoOptions}>
                    <TouchableOpacity style={styles.textInpuWrapper}>
                      <TextInput
                        onFocus={() => {
                          this.textOnFoxus("citofono");
                        }}
                        maxLength={25}
                        style={[styles.textLabel, styles.leftBox]}
                        onChangeText={text => {
                          this.setState({ citofono: text });
                        }}
                        value={this.state.citofono}
                      />

                      <View style={[styles.rightBox]}>
                        <CheckBox
                          returnKeyType="next"
                          style={styles.rightBox}
                          onClick={() =>
                            this.checkBoxSetting(this.state.predefinito)
                          }
                          checkBoxColor={"#dbdbdb"}
                          rightTextStyle={styles.checkBoxView}
                          isChecked={this.state.isChecked}
                          rightText={Strings.primary_address}
                        />
                        {this.state.isChecked ? (
                          <Text style={[styles.textLabel]}>
                            {Strings.primary_address}
                          </Text>
                        ) : (
                          <Text />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.lineSeparator} />
              </View>
            )}
            {this.props.form_option == "list" && (
              <View style={[styles.addressContainer]}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("EditAddress", {
                          // itemDetails: this.state.primaryaddressDetails
                          onUpdate: () => this.forceUpdate()
                        })
                      }
                    >
                      <Text style={[styles.altriAddress]}>
                        {this.state.username}
                      </Text>
                      <Text style={[styles.altriAddress]}>
                        {this.state.primaryaddressDetails.viaPiazza},
                        {this.state.primaryaddressDetails.civico}
                      </Text>
                      <Text style={[styles.altriAddress]}>
                        {this.state.primaryaddressDetails.cap},
                        {this.state.primaryaddressDetails.comune},
                        {this.state.primaryaddressDetails.provincia}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginEnd: 10
                    }}
                  />
                </View>
              </View>
            )}

            <View style={styles.addButton}>
              {this.props.form_option == "new" ||
              this.props.form_option == "edit" ? (
                <TouchableOpacity
                  style={styles.newAddressLabel}
                  onPress={() =>
                    this.props.form_option == "new"
                      ? this.addNewAddress()
                      : this.saveFieldAddress()
                  }
                >
                  <Text style={[styles.newAddressLabel, { color: "#006400" }]}>
                    {Strings.add_newAddress}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("AddNewAddress")
                  }
                >
                  <Text style={styles.newAddressLabel}>
                    + {Strings.add_address}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
