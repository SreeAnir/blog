/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Landing from "./src/app/ui/landing/Landing";
import Home from "./src/app/ui/home/Home";

import { createStackNavigator, createAppContainer } from "react-navigation";
 
const AppNavigator = createStackNavigator({
  Home: {
    screen: Landing ,
  },
  Home: {
    screen: Home ,
  },
});
export default createAppContainer(AppNavigator);
