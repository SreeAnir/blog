import { ApiCall } from "../network/RestApi";
import Strings from "../../res/strings/Strings";
import { OkAlert } from "../util/OKAlert/OKAlert";
import { fetchData } from "../util/data/PreferenceData";
export async function paymentTimeSlot() {
  const queryString = ` query{
    getDeliveryOptions{
      date
      dateLabel
      timeSlots
    }
  } `;
  return await ApiCall(queryString, null).then(data => {
    getDeliveryOptions = data.response.getDeliveryOptions;
    console.log("getDeliveryOptions",getDeliveryOptions);
    if (data.status == 1) {
      return getDeliveryOptions;
    } else {
      OkAlert(Strings.failSlot, data.message);
      return false;
    }
  });
}
export async function setSlotData(_this, fixTs, FixDate) {
  let customerOrderId = await fetchData("customerOrder");
 
  customerOrderId = JSON.parse(customerOrderId);
  if (JSON.parse(customerOrderId) < 0) {
    OkAlert(Strings.Invalid_Order, Strings.Try_again);
    return false;
  }
  let variables = {
    id: parseInt(customerOrderId),
    deliveryDate: FixDate,
    deliveryTimeSlot: fixTs
  };
  console.log("variables setSlotData",variables);
  let queryString = `
  mutation ($id: String!,$deliveryDate:String! ,$deliveryTimeSlot :String!){
    setDeliveryOptions(
      id:$id,
     deliveryDate: $deliveryDate,
    deliveryTimeSlot:$deliveryTimeSlot
    ) {  id 
      state
     }
  }
  `;
  
  return await ApiCall(queryString, variables).then(data => {
    setDeliveryOptions = data.response.setDeliveryOptions;
    console.log(data);
    console.log("setDeliveryOptions",variables);
    if (data.status == 1) {
      return setDeliveryOptions;
    } else {
      OkAlert(Strings.failSlot, data.message);
      return false;
    }
  });
}
