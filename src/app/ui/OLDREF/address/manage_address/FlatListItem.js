// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   FlatList
// } from "react-native";
// import { OkAlert } from "../../../util/OKAlert/OKAlert";
// import CheckBox from "react-native-check-box";
// import moment from "moment";
// import { ApiCall } from "../../../network/RestApi";
// import { EventRegister } from 'react-native-event-listeners'
// import styles from "./Style";
// import Strings from "../../../../res/strings/Strings";
// import { LogoHeader } from "../../../components/Header";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import Swipeout from "react-native-swipeout";
// let _this = null;

// export default class FlatListItem extends Component {
//   constructor() {
//     super();
//     this.state = {
//       activeRowKey: null,
//       userId: 0,
//       serviceDetail: {}
//     };
//   }

//   render() {
//     let swipeSettings = {
//       autoClose: true,
//       onClose: (secId, rowId, direction) => {
//         if (this.state.activeRowKey != null) {
//           this.setState({ activeRowKey: null });
//         }
//       },
//       onOpen: (secId, rowId, direction) => {
//         this.setState({ activeRowKey: this.props.item.id });
//       },
//       right: [
//         {
//           onPress: () => {
//             const deletingRow = this.state.activeRowKey;
//             Alert.alert(
//               "Alert",
//               "Are you sure to delete this address?",
//               [
//                 {
//                   text: "No",
//                   onPress: () => console.log("cancel"),
//                   style: "cancel"
//                 },
//                 {
//                   text: "Yes",
//                   onPress: () => {
//                     global.isAddressDeleted = false
//                     EventRegister.emit('serviceDeletedSuccessfull', { item: this.props.item })
//                   }
//                 }
//               ],
//               { cancelable: false }
//             );
//           },
//           text: "Delete",
//           type: "delete"
//         }
//       ],
//       rowId: this.props.index,
//       sectionId: 1
//     };

//     return (
//       <Swipeout {...swipeSettings}>
//         <View
//           style={[
//             styles.addressContainer,
//             { borderBottomWidth: 1, borderBottomColor: "#c9c6c6" }
//           ]}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between"
//             }}
//           >
//             <View>
//               <TouchableOpacity  style={{
//               marginTop:5 ,marginBottom:5
//             }}
//                 onPress={() =>
//                   this.props.navigation.navigate("EditAddress", {
//                     itemDetails: this.props.item
//                   })
//                 }
//               >
//                 <Text style={[styles.altriAddress]}>
//                   {this.state.username}
//                 </Text>
//                 <Text style={[styles.altriAddress]}>
//                    {this.props.item.viaPiazza} {this.props.item.civico}
//                 </Text>
//                 <Text style={[styles.altriAddress]}>
//                 {this.props.item.comune},{this.props.item.cap},{this.props.item.stato}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginEnd: 10
//               }}
//             />
//           </View>
//         </View>
//       </Swipeout>
//     );
//   }
// }

// export default class AddressForm2 extends Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       headerStyle: styles.headerStyle,
//       headerTitleStyle: styles.headerTitleStyle,
//       headerLeft: (
//         <View>
//           <LogoHeader navigation={navigation} />
//         </View>
//       )
//     };
//   };

//   constructor() {
//     super();
//     this.state = {
//       username: "",
//       viaPiazza: null,
//       provincia: null,
//       cap: null,
//       stato: null,
//       comune: null,
//       civico: null,
//       citofono: null,
//       scala: null,
//       piano: null,
//       interno: null,
//       predefinito: false,
//       primary_address: 0,
//       isChecked: false,
//       editId: 0,
//       addressList: [],
//       primaryaddressDetails: {}
//     };
//     this._radioButtonPress = this._radioButtonPress.bind(this);
//   }
//   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

//   _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

//   _handleDatePicked = date => {
//     var dt = date;

//     var DateFormat = moment(date).format("DD/MM/YYYY");
//     this.setState({
//       dob: DateFormat
//     });
//     this._hideDateTimePicker();
//     this.textOnFoxus("dob");
//   };

//   _radioButtonPress = itemVal => {
//     //this.setState({ key: itemVal });
//   };

//   componentDidMount() {
//     _this = this;
//     this.listener = EventRegister.addEventListener('serviceDeletedSuccessfull', (data) => {
//       if (!global.isAddressDeleted)
//         this.deleteAddress(data.item);
//     })

//     if (this.props.form_option == "new") {
//       this.setState({ editId: 0 });
//     }
//     if (this.props.form_option == "edit") {
//       this.setState(this.props.address_data);
//       if (this.props.address_data.predefinito == true) {
//         this.setState({
//           isChecked: true
//         });
//       }
//       this.setState({ editId: Number(this.props.address_data.id) });
//     }
//     if (this.props.form_option == "list") {
//       this.setState({ username: this.props.username });
//       global.listShippingAddress = this.props.address_data
//       this.updateList(this.props.address_data);
//       var primaryaddressArray = this.props.address_data.filter(function (data) {
//         return data.predefinito == true;
//       });
//       if (primaryaddressArray.length == 0) {
//         this.setState({ primaryaddressDetails: this.props.address_data[0] });
//       } else {
//         this.setState({ primaryaddressDetails: primaryaddressArray[0] });
//       }
//     }
//     const radio_props = [
//       { label: Strings.female, value: 0 },
//       { label: Strings.male, value: 1 }
//     ];
//   }
//   updateList(address_data) {
//     let address_param = address_data;
//     let secondList = [];
//     let primary_address_count = 0;
//     this.setState(address_data[0]); // just initialising,
//     for (addItem of address_param) {
//       if (addItem.predefinito && primary_address_count == 0) {
//         primary_address_count = 1;
//         this.setState(addItem);
//         this.setState({ isChecked: true });
//         this.setState({ editId: Number(addItem.id) });
//       } else {
//         secondList.push(addItem);
//       }
//     }

//     this.setState({ addressList: secondList });
//     this.forceUpdate();
//   }

//   changeTelematico(option_checked) {
//     //check_telematico
//     this.setState({ check_telematico: !option_checked });
//   }
//   selectAddress(item) {
//     this.props.navigation.navigate("paymentOption");
//   }
//   deleteElement(item) {
//     for (var i = 0; i < this.state.addressList.length; i++) {
//       if (this.state.addressList[i].id == item.id) {
//         delete this.state.addressList[i];
//         this.setState({});
//       }
//     }
//   }
//   deleteAddress(item) {
//     EventRegister.removeEventListener('serviceDeletedSuccessfull')
//     global.isAddressDeleted = true
//     ////OkAlert(Strings.address_deletd , "");
//     let variables = {
//       id: parseInt(item.id)
//     };
//     let queryString = `mutation deleteShippingAddress($id:Int!){
//       deleteShippingAddress(id:$id ){
//       id
//     }
//   }
//  `;

//     ApiCall(queryString, variables).then(data => {
//       let dataResponse = data.response;

//       //alert("df");
//       if (data.status == 1) {
//         // this.props.update()
//         //save updated count
//         ///// alert(item.viaPiazza + " Deleted");
//         // OkAlert("oooo", " Was Removed");
//         //this._loadCartApi();
//         let deletedId = dataResponse.deleteShippingAddress.id;
//         let curData = _this.state.addressList;
//         for (var i = 0; i < curData.length; i++) {
//           if (parseInt(curData[i].id) == parseInt(deletedId)) {
//             curData.splice(i, 1);
//             this.updateList(curData);
//             break;
//           }
//         }
//       } else {
//       }
//     });
//     //address_data=[];
//     //this.updateList(address_data);
//   }
//   closeButton() {
//     if (this.state.show == 1) {
//       return (
//         <TouchableOpacity
//           onPress={() => {
//             this.saveField();
//           }}
//           style={styles.closeCrossWrapper}
//         >
//           <Text style={styles.closeCross}>X</Text>
//         </TouchableOpacity>
//       );
//     } else {
//       return <Text />;
//     }
//   }
//   textOnFoxus(field) {
//     this.setState({ show: field });
//   }
//   saveField() {
//     // this.textOnFoxus("primary_address");
//     this.UpdateAddress();
//     this.setState({ show: null });
//   }
//   textOnFoxusOut() {
//     this.setState({ show: 0 });
//   }
//   checkBoxSetting() {

//     // if (this.props.form_option != "list") {
//     //this.saveField();
//     // }
//   }
//   UpdateAddress() {
//     //   //when in listing page,it is not possible to uncheck primary address option,
//     //   // But always user can make it to a primary address my making the chkbox true
    
//     if (typeof this.state.show != "string") {
//       this.setState({
//         isChecked: true
//       });
//     }
//     if (
//       this.state.viaPiazza != null &&
//       this.state.comune != null &&
//       this.state.provincia != null &&
//       this.state.cap != null &&
//       this.state.civico != null &&
//       this.state.citofono != null &&
//       this.state.scala != null &&
//       this.state.piano != null &&
//       this.state.interno != null &&
//       this.state.stato != null &&
//       this.state.editId != null
//     ) {
//       const variables = {
//         viaPiazza: this.state.viaPiazza,
//         comune: this.state.comune,
//         id: Number(this.state.editId),
//         provincia: this.state.provincia,
//         cap: this.state.cap,
//         civico: this.state.civico,
//         citofono: this.state.citofono,
//         scala: this.state.scala,
//         piano: this.state.piano,
//         predefinito: this.state.isChecked,
//         interno: this.state.interno,
//         stato: this.state.stato
//       };

//       const queryString = ` mutation updateShippingAddress($viaPiazza: String!,
//             $comune: String!,
//             $id:Int!,
//             $provincia: String!,
//             $cap: String!,
//             $civico: String!,
//             $citofono:String!,
//             $scala:String!,
//             $piano:String!,
//             $predefinito:Boolean!,
//             $interno:String!,
//             $stato:String!,)
//           {updateShippingAddress(viaPiazza:$viaPiazza,
//             comune: $comune,
//             id:$id,
//             provincia:$provincia,
//             cap:$cap,
//             civico:$civico,
//             citofono: $citofono,
//             scala: $scala,
//             piano: $piano,
//             predefinito: $predefinito,
//             interno: $interno,
//             stato: $stato) 
//           {viaPiazza,comune,provincia,cap,civico,citofono,scala,piano,predefinito,interno,stato,id}} `;
//       ApiCall(queryString, variables).then(data => {
//         let responseRegister = data;
//         if (responseRegister.status == 1) {
//           this.props.navigation.goBack()
//         }
//       });
//       this.setState({ show: null });
//     } else {
//       alert("Please Enter All Field");
//     }
//   }
//   addNewAddress() {
//     if (
//       this.state.viaPiazza != null &&
//       this.state.comune != null &&
//       this.state.provincia != null &&
//       this.state.cap != null &&
//       this.state.civico != null &&
//       this.state.citofono != null &&
//       this.state.scala != null &&
//       this.state.piano != null &&
//       this.state.interno != null &&
//       this.state.stato != null
//     ) {
//       const variables = {
//         viaPiazza: this.state.viaPiazza,
//         comune: this.state.comune,
//         provincia: this.state.provincia,
//         cap: this.state.cap,
//         civico: this.state.civico,
//         citofono: this.state.citofono,
//         scala: this.state.scala,
//         piano: this.state.piano,
//         predefinito: this.state.isChecked,
//         interno: this.state.interno,
//         stato: this.state.stato
//       };
//       const queryString = ` mutation createShippingAddress($viaPiazza: String!,
//            $comune: String!,
//             $provincia: String!,
//             $cap: String!,
//             $civico: String!,
//             $citofono:String!,
//             $scala:String!,
//             $piano:String!,
//             $predefinito:Boolean!,
//             $interno:String!,
//             $stato:String!,)
//           {createShippingAddress(viaPiazza:$viaPiazza,
//             comune: $comune,
//             provincia:$provincia,
//             cap:$cap,
//             civico:$civico,
//             citofono: $citofono,
//             scala: $scala,
//             piano: $piano,
//             predefinito: $predefinito,
//             interno: $interno,
//             stato: $stato) 
//           {viaPiazza,comune,provincia,cap,civico,citofono,scala,piano,predefinito,interno,stato}} `;
//       ApiCall(queryString, variables).then(data => {
//         let responseRegister = data;
//         OkAlert(Strings.new_address_added);
//         this.props.navigation.goBack()
//         let curData = _this.state.addressList;
//         this.updateList(curData);
//       });
//       this.setState({ show: null });
//     } else {
//       alert("Please Enter All Field");
//     }
//   }
//   render() {

//     if (this.props.form_option == "list") {
//       addressList = this.state.addressList;
//     } else {
//       let addressList = this.state;
//     }
//     return (
//       <KeyboardAwareScrollView style={styles.parentContainer}>
//         <View style={styles.container}>
//           <Text style={styles.headerText}>{Strings.ADDRESS}</Text>
//           {this.state.primary_address == 1 ? (
//             <Text style={[styles.altriText, styles.subhead]}>
//               Indirizzo predefinito
//             </Text>
//           ) : (
//               <Text />
//             )}

//           <View style={styles.profileDetailWrapper}>
//             {this.props.form_option != "list" && (
//               <View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>Via/Viale/Piazza</Text>
//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("viaPiazza");
//                       }}
//                       maxLength={25}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ viaPiazza: text });
//                       }}
//                       value={this.state.viaPiazza}
//                     />
//                     {/*this.state.show == "viaPiazza" &&
//                       this.props.form_option != "new" ? (
//                         <TouchableOpacity
//                           onPress={() => {
//                             this.saveField();
//                           }}
//                           style={styles.closeCrossWrapper}
//                         >
//                           <Text style={styles.closeCross}>X</Text>
//                         </TouchableOpacity>
//                       ) : (
//                         <Text />
//                       )*/}
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>Comune</Text>

//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("comune");
//                       }}
//                       maxLength={25}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ comune: text });
//                       }}
//                       value={this.state.comune}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>{Strings.Province}</Text>

//                   <View style={styles.textInpuWrapper}>
//                     <TouchableOpacity style={styles.textInpuWrapper}>
//                       <TextInput
//                         onFocus={() => {
//                           this.textOnFoxus("provincia");
//                         }}
//                         maxLength={15}
//                         style={[styles.textLabel, styles.textLabelInput]}
//                         onChangeText={text => {
//                           this.setState({ provincia: text });
//                         }}
//                         value={this.state.provincia}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>CAP</Text>
//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("cap");
//                       }}
//                       maxLength={15}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ cap: text });
//                       }}
//                       value={this.state.cap}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>Civico</Text>

//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("civico");
//                       }}
//                       maxLength={25}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ civico: text });
//                       }}
//                       value={this.state.civico}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>Citofono</Text>

//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("citofono");
//                       }}
//                       maxLength={25}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ citofono: text });
//                       }}
//                       value={this.state.citofono}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>Scala</Text>

//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("scala");
//                       }}
//                       maxLength={25}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ scala: text });
//                       }}
//                       value={this.state.scala}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>Piano</Text>

//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("piano");
//                       }}
//                       maxLength={25}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ piano: text });
//                       }}
//                       value={this.state.piano}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>Interno</Text>

//                   <TouchableOpacity style={styles.textInpuWrapper}>
//                     <TextInput
//                       onFocus={() => {
//                         this.textOnFoxus("interno");
//                       }}
//                       maxLength={25}
//                       style={[styles.textLabel, styles.textLabelInput]}
//                       onChangeText={text => {
//                         this.setState({ interno: text });
//                       }}
//                       value={this.state.interno}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.profileRow}>
//                   <Text style={styles.textLabel}>{Strings.State}</Text>
//                   <View style={styles.twoOptions}>
//                     <TouchableOpacity style={styles.textInpuWrapper}>
//                       <TextInput
//                         onFocus={() => {
//                           this.textOnFoxus("stato");
//                         }}
//                         maxLength={80}
//                         style={[styles.textLabel, styles.leftBox]}
//                         onChangeText={text => {
//                           this.setState({ stato: text });
//                         }}
//                         value={this.state.stato}
//                       />
//                       <View style={[styles.rightBox]}>
//                         <CheckBox
//                           returnKeyType="next"
//                           style={styles.rightBox}
//                           onClick={() => this.saveField()}
//                           checkBoxColor={"#dbdbdb"}
//                           rightTextStyle={styles.checkBoxView}
//                           isChecked={this.state.isChecked}
//                           rightText={Strings.primary_address}
//                         />
//                         {this.state.isChecked ? (
//                           <Text style={[styles.textLabel]}>
//                             {Strings.primary_address}
//                           </Text>
//                         ) : (
//                             <Text />
//                           )}
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//                 <View style={styles.lineSeparator} />
//               </View>
//             )}
//             {this.props.form_option == "list" && (
//               <View style={[styles.addressContainer]}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between"
//                   }}
//                 >
//                   <View>
//                     <TouchableOpacity
//                       onPress={() =>
//                         this.props.navigation.navigate("EditAddress", {
//                           onUpdate: () => this.forceUpdate()
//                         })
//                       }
//                     >
//                       <Text style={[styles.altriAddress]}>
//                         {this.state.username} 
//                        </Text>
//                        <Text style={[styles.altriAddress]}>
//                        {this.state.primaryaddressDetails.viaPiazza},
//                         {this.state.primaryaddressDetails.civico}
//                        </Text>
//                       <Text style={[styles.altriAddress]}>
//                       {this.state.primaryaddressDetails.cap},
//                         {this.state.primaryaddressDetails.comune},
//                         {this.state.primaryaddressDetails.provincia}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View
//                     style={{
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginEnd: 10
//                     }}
//                   />
//                 </View>
//               </View>
//             )}

//             {addressList.length != 0 && addressList.length > 0 ? (
//               <View>
//                 <View style={styles.profileRow}>
//                   {this.state.addressList.length != 0 &&
//                     this.state.addressList.length > 0 ? (
//                       <Text style={styles.altriText}>
//                         {Strings.alter_address}
//                       </Text>
//                     ) : (
//                       <Text />
//                     )}
//                 </View>
//                 <View>
//                   <FlatList
//                     data={this.state.addressList}
//                     extraData={this.state}
//                     keyExtractor={(x, i) => i.toString()}
//                     numColumns={1}
//                     showsVerticalScrollIndicator={false}
//                     renderItem={({ item, i }) =>
//                       item.predefinito == false ? (
//                         <View style={[styles.addressContainer]}>
//                           <FlatListItem
//                             navigation={this.props.navigation}
//                             FlatListItem={this.state.addressList}
//                             item={item}
//                             userId={this.state.userId}
//                             index={i}
//                             parentFlatList={this}
//                           />
//                         </View>
//                       ) : (
//                           <View />
//                         )
//                     }
//                   />
//                 </View>
//                 <View style={styles.lineSeparator} />
//               </View>
//             ) : (
//                 <View />
//               )}
//             <View style={styles.addButton}>
//               {(this.props.form_option == "new") || (this.props.form_option == "edit") ? (
//                 <TouchableOpacity
//                   style={styles.newAddressLabel}
//                   onPress={() => (this.props.form_option == "new") ? this.addNewAddress() : this.saveField()}
//                 >
//                   <Text style={[styles.newAddressLabel, { color: "#006400" }]}>
//                     {Strings.add_newAddress}
//                   </Text>
//                 </TouchableOpacity>
//               ) : (
//                   <TouchableOpacity
//                     onPress={() =>
//                       this.props.navigation.navigate("AddNewAddress")
//                     }
//                   >
//                     <Text style={styles.newAddressLabel}>
//                       + {Strings.add_address}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//             </View>
//           </View>
//           <View />
//         </View>
//       </KeyboardAwareScrollView>
//     );
//   }
// }
