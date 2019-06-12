import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform
} from "react-native";

export default class Landing extends Component {
  constructor() {
    super();
  }
 componentDidMount() { 
   setTimeout(function(){
    this.props.navigation.navigate("Home", {})
   });
  }
   
  render() {
    return (
      <View><Text>fkjhgkfjhg</Text></View>
    );
  }
}
