
import { setData, removeData } from "../data/PreferenceData";
import { ApiCall } from "../../network/RestApi";

export async function storeCustomerData() {
    console.log("Emergency Upate for Customer Data");
    const queryString = ` query {
      profile {
      trenordCardNumber,
      birthDate,
      codiceFiscale,
      email,
      familyName,
      firstName,
      gender,
      iban,
      id, 
      indirizzoTelematico,
      trenordDiscountOption,
      occupation,
      partitaIva,
      phoneNumber,
      }   
      } `;

    return await ApiCall(queryString, null).then(data => {
      let profileData = data.response.profile;
      if (data.status == 1) {
          setData("profile",profileData);  
      } else {
        this.logOutOnSessionExpired();
          removeData("profile");
      }
    });
  }