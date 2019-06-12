import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";

import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { PaymentView } from "../../../components/Header";
import { EventRegister } from "react-native-event-listeners";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ApiCall } from "../../../network/RestApi";
import { OkAlert } from "../../../util/OKAlert/OKAlert";
import { fetchData ,setData } from "../../../util/data/PreferenceData";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
let _this = null;

export default class ViewAddress extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <PaymentView navigation={navigation} />
        </View>
      )
    };
  };

  constructor() {
    super();
    this.state = {
      addressObj: [],
      dropPointObj: [],
      addressCount:0
    };
  }
  async fetchDataAddress() {
    const queryString = ` query {
      profile {
        firstName,
        familyName
      shippingAddresses{
        id,
        cap,
      citofono,
      civico,
      comune,
      interno,
      piano,
      predefinito,
      provincia,
      scala,
      stato,
      viaPiazza
      }
      }   
      } `;

    let returnData = ApiCall(queryString, null).then(data => {
      loaderHandler.hideLoader();
      ProfileData = data.response.profile;
      console.log("res", ProfileData);
      if (data.status == 1) {
        console.log("res1", ProfileData);
        if (ProfileData != null) {
          // loaderHandler.hideLoader();
          this.setState({
            username: ProfileData.firstName + " " + ProfileData.familyName
          });
          
          setData( "addressCount" , ProfileData.shippingAddresses.length);
          this.setState({ addressObj: ProfileData.shippingAddresses });
        } else {
          setData("addressCount" , 0);
          OkAlert("Failed", "");
        }
      } else {
        OkAlert("Failed", "");
        setData( "addressCount" , 0 );
      }
    });
  }
  async fetchDataDropPoints() {
    const queryString = `query {
      listDropPoints{
        id
        nome
        viaPiazza
        cap
        comune
        provincia
        telefono
        
      }
    }`;

    let returnData = ApiCall(queryString, null).then(data => {
      dropData = data.response.listDropPoints;
      console.log("res", dropData);
      if (data.status == 1) {
        if (dropData != null) {
          // loaderHandler.hideLoader();
          this.setState({ dropPointObj: dropData });
        } else {
          OkAlert("Failed", "");
        }
      } else {
        OkAlert("Failed", "");
      }

      loaderHandler.hideLoader();
    });
  }

  async componentDidMount() {
    _this = this;
    loaderHandler.showLoader(Strings.Processing); //
    await this.fetchDataAddress();
    await this.fetchDataDropPoints();
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  selectDropLocation(item) {
    this.setAddressChosen(item.id, 1);
  }
  selectAddress(item) {
    this.setAddressChosen(item.id, 0);
  }
  async setAddressChosen(itemID, typeOfLocation) {
    let customerOrderId = await fetchData("customerOrder");
    customerOrderId = JSON.parse(customerOrderId);
    let variables = {
      id: parseInt(customerOrderId),
      shippingAddressId: Number(itemID),
      dropPointDelivery: Boolean(typeOfLocation)
    };
    const queryString = ` mutation setCustomerOrderShipping
    ( $id :Int!,$shippingAddressId: Int!,$dropPointDelivery: Boolean!)
    {setCustomerOrderShipping
      (id:$id, shippingAddressId:$shippingAddressId ,dropPointDelivery:$dropPointDelivery ) 
    { id,
      state }
    } `;

    ApiCall(queryString, variables).then(data => {
      loaderHandler.showLoader(Strings.Processing);
      if (data.status == 1) {
        if (typeOfLocation == 0) {
          this.props.navigation.navigate("DefaultTimeSlot", {
            selectedAdd: itemID,
            dropLocation: 0,
            onAddressUpdate: () => this.setSelectedAddress(itemID, 0)
          });
        } else {
          this.props.navigation.navigate("TimeSlotMain", {
            selectedAdd: itemID,
            dropLocation: 1,
            onAddressUpdate: () => this.setSelectedAddress(itemID, 1)
          });
        }
      } else {
        OkAlert(data.message, "");
      }
    });
  }
  setSelectedAddress(itemID, dropLocation) {
    //if prev dates to be set
    console.log("setSelectedAddress" + itemID + "Drop" + dropLocation);
  }
  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  render() {
    console.log("listitem", this.state.addressObj);
    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView style={styles.parentContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.delivery_address}</Text>

            <View style={styles.flatListContainer}>
              <FlatList
                data={this.state.addressObj}
                extraData={this.state}
                keyExtractor={(x, i) => i.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  //styles.selectedAddress
                  <View
                    id={item.id}
                    style={[
                      item.predefinito == true ? styles.selectedAddress : "",
                      styles.addresstContainer
                    ]}
                  >
                    <View style={[styles.addressContainer]}>
                      <TouchableOpacity
                        onPress={() => this.selectAddress(item)}
                      >
                        <Text
                          style={[
                            item.predefinito == true
                              ? styles.fontBright
                              : styles.fontFade,
                            styles.altriAddress
                          ]}
                        >
                          {this.state.username}
                        </Text>
                        <Text
                          style={[
                            item.predefinito == true
                              ? styles.fontBright
                              : styles.fontFade,
                            styles.altriAddress
                          ]}
                        >
                          {item.viaPiazza} {item.civico}
                        </Text>
                        <Text
                          style={[
                            item.predefinito == true
                              ? styles.fontBright
                              : styles.fontFade,
                            styles.altriAddress
                          ]}
                        >
                          {item.cap} {item.comune} {item.provincia}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={styles.labelLight}
                  onPress={() =>
                    this.props.navigation.navigate("AddNewAddressFromPayment", {
                      onUpdateAddAddress: () => this.fetchDataAddress()
                    })
                  }
                >
                  + {Strings.add_address}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* drop location start */}

          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.dropLocations}</Text>
            <View style={styles.flatListContainer}>
              <FlatList
                data={this.state.dropPointObj}
                extraData={this.state}
                keyExtractor={(x, i) => i.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    id={item.id}
                    style={[
                      item.predefinito == true ? styles.selectedAddress : "",
                      styles.addresstContainer
                    ]}
                  >
                    <View style={[styles.addressContainer]}>
                      <TouchableOpacity
                        onPress={() => this.selectDropLocation(item)}
                      >
                        <Text style={[styles.altriAddress]}>{item.nome}</Text>
                        <Text style={[styles.altriAddress]}>
                          {item.viaPiazza}
                        </Text>
                        <Text style={[styles.altriAddress]}>
                          {item.cap} {item.comune} ({item.provincia})
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>

          {/* drop location end */}
        </KeyboardAwareScrollView>
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
        <View style={styles.footerContainer}>
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
