import { BASE_URL } from "./ApiTools";
import { fetchData } from "../util/data/PreferenceData";
import { GraphQLClient } from "graphql-request";
import { EventRegister } from "react-native-event-listeners";
import { NetInfo } from "react-native";
import { OkAlert } from "../util/OKAlert/OKAlert";
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
export async function ApiCall(queryString, variables) {
  NetInfo.isConnected.fetch().then(isConnected => {
    if (!isConnected) {
      OkAlert("No internet.", "Try turning on mobile data or Wi-Fi.");
      loaderHandler.hideLoader();
      return false;
    }
  });

  let _this = this;
  let result = { result: 0, message: "", response: "" };

  const bearer = await fetchData("Bearer").then(bearer => {
    return JSON.parse(bearer);
  });
  const client = new GraphQLClient(BASE_URL, {
    headers: {
      Authorization: "Bearer " + bearer,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
     console.log("bearer" + bearer);
     console.log("variables",variables);
    if (variables != null) {
    return client
      .request(queryString, variables)
      .then(async function(responseData) {
          console.log("responseData",responseData);
        result.status = 1;
        result.message = "Success";
        result.response = responseData;
        return result;
      })
      .catch(function(error) {
        result.response = [];
        result.message = "Failed";
        console.log("responseData",result);
        if (typeof error.response.errors != "undefined") {
          if (typeof error.response.errors[0].message == "string") {
            if (error.response.errors[0].message == "Not Authorized") {
              EventRegister.emit("logOutCall");
            } else {
            }
            result.message = error.response.errors[0].message;
          }
        }
        result.response = error.response;
        result.status = 0;

        return result;
      });
  } else {
    return client
      .request(queryString)
      .then(async function(responseData) {
       console.log("responseData",responseData);
        result.status = 1;
        result.message = "Success";
        result.response = responseData;
        return result;
      })
      .catch(function(error) {
        result.response = [];
        if (typeof error.response.errors[0].message == "string") {
          if (error.response.errors[0].message == "Not Authorized") {
            EventRegister.emit("logOutCall");
          } else {
            //  OkAlert(Strings.password + ": 4 " + Strings.minimum_char, "");
            //alert(error.response.errors[0].message);
            result.message = error.response.errors[0].message;
          }
          result.response = error.response;
          result.status = 0;
        }
        return result;
      });
  }
}
