import { ApiCall } from "../network/RestApi";
import Strings from "../../res/strings/Strings";
import { OkAlert } from "../util/OKAlert/OKAlert";
export async function walletPay(itemData, Response) {
  console.log(parseInt(Response.id));
  let variables = {
    orderId: parseInt(Response.id)
  };
  let queryString = `mutation 
  walletPayment ($orderId: Int!){
    walletPayment(
      orderId:$orderId
    ) {  id 
      state
     }
  }
  `;
  return await ApiCall(queryString, variables).then(data => {
    let walletPayment = data.response.walletPayment;
    if (data.status == 1) {
      return walletPayment;
    } else {
      OkAlert(Strings.failWalltetPay, data.message);
      return false;
    }
  });
}
