import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList
} from "react-native";
import { ApiCall } from "../../../network/RestApi";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { EventRegister } from "react-native-event-listeners";
let _this = null;
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import Swipeout from "react-native-swipeout";

export class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      userId: 0,
      serviceDetail: {},
      username: this.props.extraData
    };
  }

  editAddressSuccessful() {
    EventRegister.emit("editAddressSuccessful");
  }

  render() {
    let swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.id });
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              "Alert",
              "Are you sure to delete this address?",
              [
                {
                  text: "No",
                  onPress: () => console.log("cancel"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: () => {
                    global.isAddressDeleted = false;
                    EventRegister.emit("serviceDeletedSuccessfull", {
                      item: this.props.item
                    });
                  }
                }
              ],
              { cancelable: false }
            );
          },
          text: "Delete",
          type: "delete",
          backgroundColor: "#fff",
          color: "#000",
          component: (
            <View
              style={{
                height: 50,
                width: 50,
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <Image
                style={{ height: 25, width: 25, alignSelf: "center" }}
                source={require("../../../../res/images/dustbin.png")}
              />
              <Text
                style={{ width: 50, textAlign: "center", alignSelf: "center" }}
              >
                Delete
              </Text>
            </View>
          )
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };

    return (
      <Swipeout {...swipeSettings}>
        <View
          style={[
            styles.addressContainer,
            { borderBottomWidth: 1, borderBottomColor: "#c9c6c6" }
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={styles.addressRow}>
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  marginBottom: 5
                }}
                onPress={() =>
                  this.props.navigation.navigate("EditAddress", {
                    itemDetails: this.props.item,
                    onUpdateAddress: () => this.editAddressSuccessful()
                  })
                }
              >
                {/* <Text style={[styles.altriAddress]}>
                  {this.state.username} c/o {this.props.item.viaPiazza}
                </Text>
                <Text style={[styles.altriAddress]}>
                  Via {this.props.item.provincia}-{this.props.item.cap}{" "}
                  {this.props.item.stato}
                </Text> */}

                <Text style={[styles.altriAddress]}>{this.state.username}</Text>
                <Text style={[styles.altriAddress]}>
                  {this.props.item.viaPiazza} {this.props.item.civico}
                </Text>
                <Text style={[styles.altriAddress]}>
                  {this.props.item.cap},{this.props.item.comune},
                  {this.props.item.provincia}
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
      </Swipeout>
    );
  }
}
export default class AddressList extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      addressObj: [],
      responseCheck: false,
      username: "",
      primaryData: []
    };
  }

  fetchData() {
    loaderHandler.showLoader();
    console.log("fetchData");
    const queryString = `query {
      profile {
      familyName,
      firstName,
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
      }`;

    let returnData = ApiCall(queryString, null).then(data => {
      ProfileData = data.response.profile;

      if (data.status == 1) {
        loaderHandler.hideLoader();
        if (ProfileData != null) {
          let addObList = ProfileData.shippingAddresses;
          console.log("addObList " ,addObList);
          _this.setState({
            username: ProfileData.firstName + " " + ProfileData.familyName,
            addressObj: ProfileData.shippingAddresses,
            responseCheck: true
          });

          let secondList = [];
          let primary_address_count = 0;
          for (addItem of addObList) {
            if (addItem.predefinito && primary_address_count == 0) {
              this.setState({ primaryData: addItem });
              primary_address_count = 1;
            } else {
              secondList.push(addItem);
            }
          }
          this.setState({ addressObj: secondList });
          return true;
        } else {
          alert("Failed");
          return false;
        }
      } else {
        alert(" Failed");
        return false;
      }
      alert("Please check");
    });
  }

  componentWillMount() {}
  componentDidMount() {
    _this = this;
    this.listener = EventRegister.addEventListener(
      "editAddressSuccessful",
      data => {
        console.log("testfetchdata");

        this.fetchData();
      }
    );
    this.listener = EventRegister.addEventListener(
      "serviceDeletedSuccessfull",
      data => {
        if (!global.isAddressDeleted) this.deleteAddress(data.item);
      }
    );
    this.fetchData();
    loaderHandler.showLoader(Strings.please_wait);
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
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
      console.log(this.state);
      if (data.status == 1) {
        this.fetchData();
        //this.setState({});
      } else {
      }
    });
    //address_data=[];
    //this.updateList(address_data);
  }
  // ListUpdate(address_data) {
  //   let address_param = address_data;
  //   let secondList = [];
  //   let primary_address_count = 0;
  //   this.setState(address_data[0]); // just initialising,
  //   for (addItem of address_param) {
  //     if (addItem.predefinito && primary_address_count == 0) {
  //       primary_address_count = 1;
  //     } else {
  //       secondList.push(addItem);
  //     }
  //   }
  //   this.setState({ addressList: secondList });
  //   this.forceUpdate();
  // }
  editAddressSuccessful() {
    EventRegister.emit("editAddressSuccessful");
  }
  render() {
    let primaryData = this.state.primaryData;
    return (
      <View style={styles.parentContainer}>
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
        <ScrollView style={{ paddingBottom: 20, marginBottom: 75 }}>
          {this.state.primaryData.length != 0 ? (
            <View
              style={[
                styles.addressContainer,
                { borderBottomWidth: 1, borderBottomColor: "#c9c6c6" }
              ]}
            >
              <View style={styles.itemDetails}>
                <Text style={styles.profileRowTitle}>
                  {Strings.primary_address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.addressRow}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("EditAddress", {
                        itemDetails: primaryData,
                        onUpdateAddress: () => this.editAddressSuccessful()
                      })
                    }
                  >
                    <Text style={[styles.altriAddress]}>
                      {this.state.username}
                    </Text>
                    <Text style={[styles.altriAddress]}>
                      {primaryData.viaPiazza} {primaryData.civico}
                    </Text>
                    <Text style={[styles.altriAddress]}>
                      {primaryData.cap},{primaryData.comune},
                      {primaryData.provincia}
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
          ) : (
            <Text />
          )}
          {this.state.addressObj.length != 0 &&
          this.state.addressObj.length > 0 ? (
            <View>
              {this.state.addressObj.length != 0 &&
              this.state.addressObj.length > 0 ? (
                <Text style={styles.addressRowTwo}>
                  {Strings.alter_address}
                </Text>
              ) : (
                <Text />
              )}

              <FlatList
                data={this.state.addressObj}
                extraData={this.state}
                keyExtractor={(x, i) => i.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, i }) =>
                  item.predefinito == false ? (
                    <View style={styles.addressContainer}>
                      <FlatListItem
                        navigation={this.props.navigation}
                        FlatListItem={this.state.addressObj}
                        extraData={this.state.username}
                        item={item}
                        userId={this.state.userId}
                        index={i}
                        parentFlatList={this}
                      />
                    </View>
                  ) : (
                    <View />
                  )
                }
              />
            </View>
          ) : (
            <View />
          )}
          <View style={styles.lineSeparator} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("AddNewAddress", {
                onUpdateAddAddress: () => this.fetchData()
              })
            }
          >
            <Text style={styles.newAddressLabel}>+ {Strings.add_address}</Text>
          </TouchableOpacity>
          {/* {this.state.responseCheck && (
          <AddressForm
            form_option={"list"}
            {...this.props}
            address_data={this.state.addressObj}
            username={this.state.username}
            action={this.fetchData}
            onDeleteUpdate={this.fetchData}
          />
        )} */}
        </ScrollView>
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
