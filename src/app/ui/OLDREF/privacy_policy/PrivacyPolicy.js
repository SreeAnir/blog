import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { LogoHeader } from "../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let _this = null;
export default class PrivacyPolicy extends Component {
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
    this.state = { isActive: false };
  }
  componentDidMount() {
    _this = this;
  }
  render() {
    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView style={styles.parentContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.privacy_policy}</Text>
            <View style={styles.profileDetailWrapper}>
            <Text style={styles.paragraph}>Sed quis metus at elit dapibus semper. Phasellus tellus mi. placerat at luctus non. pellentesque viverra urna. Maecenas vel lobords libero. non sollicitudin leo. Nunc id ex eget ex faucibus rhoncus eget sit amet elit. Class aptent tacid sociosqu ad litora torquent per conubia nostra. per inceptos himenaeos. Praesent ultricies odio at velit faucibus. id posuere leo tempus. Nulla facilisis mi mi. non elementum erat condimentum ac. Mauris feugiat metus nec odio
 maximus. eget condimentum massa placerat. 
 </Text>
 <Text style={styles.paragraph}>
Morbi consectetur leo a sem pellentesque. a venenads urna tempor. Maecenas auctor quam lobortis rutrum imperdiet. Nunc porttitor urna euismod. mattis tellus id. accumsan est. Quisque massa mi. facilisis efhcitur posuere sit amet. lacinia sed augue. In facilisis lacus elit. sed gravida dui sollicitudin in. Fusce venenads dolor nec dicturn faucibus. Duis tempus odio sit amet libero fringilla pulvinar. Ut vehicula sapien quis turpis pulvinar tempus. Suspendisse ornare pulvinar tellus. Integer mattis mi in est varius. luctus volutpat mauris commodo. 
</Text>
 <Text style={styles.paragraph}>
Nunc venenatis nisi quis sapien pellentesque predum. Suspendisse et ante vulputate. bibendum diam sed,
</Text>

            </View>
            <View />
          </View>
        </KeyboardAwareScrollView>
        
      </View>
    );
  }
}
