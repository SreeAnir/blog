import React, { Component } from "react";
import {
  View,
  Text,
  ListView
} from "react-native";
 import { Text, ListView, StyleSheet } from 'react-native'  

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
    posts:[]
    };
  }
 componentDidMount() { 
    this.loadHomeJson();
  }
  loadHomeJson(){
    console.log("loadHomeJson");
    fetch('https://techsols.000webhostapp.com/wp-json/wp/v2/posts', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then((response) => response.json())
.then((responseJson) => {
   console.log(responseJson);
   this.setState({posts:responseJson});
})
.catch((error) => {
  console.error(error);
});;
  }
  render() {
    return (
      <View><Text>Home</Text>
      <ListView  
                dataSource={this.state.posts}  
                renderRow={  
                    (rowData) =>  
                        <Text style={{fontSize: 20}}>{rowData}</Text>}  
            />  
            </View>
    );
  }
}
