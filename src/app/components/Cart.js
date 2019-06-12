import { AsyncStorage } from "react-native";
import { ApiCall } from "../network/RestApi";
import { EventRegister } from "react-native-event-listeners";
import { OkAlert } from "../util/OKAlert/OKAlert";
import Strings from "../../res/strings/Strings";

export async function addToCart(productItem) {
  //check customer order number /set it
  // check storage for customerorderId
  //if orderId ==null :
  //make new create customer order id

  //add product to customer order id
  //update product row and count
  //if product already existed add item count API
  //set cart items count in storage
  //set product list in storage
  updateCart = new Array();
  await setCustomerOrder();
  let cartProds = await AsyncStorage.getItem("cartProducts");
  let orderNum = await AsyncStorage.getItem("customerOrder");
  //alert(JSON.stringify(orderNum));
  /*If customer oder number is not set,it is not possible to add products to cart.
  In this case remove all items in cart and start from the beginning
  SHow an alert something is wrong.
  */
  productItem = {
    ...productItem,
    unitsNumber: 1,
    productId: productItem.id,
    id: null
    //customer order row
  };
  //API to create Row
  let variables = {
    productId: parseInt(productItem.productId),
    customerOrderId: Number(JSON.parse(orderNum))
  };

  let queryString = `mutation createCustomerOrderRow($customerOrderId :Int!,$productId:Int!){
    createCustomerOrderRow(productId: $productId , customerOrderId:$customerOrderId ){
      id
      orderTimestamp
      totalAmount
      customerOrderRows{
       id
       productId
       productName
       photo
       unitsNumber
       total
     }
    }
  }
 `;
  ApiCall(queryString, variables).then(data => {
    var itemcountfinal = 0;
    let dataResponse = data.response;
    if (data.status == 0) {
      //Failed
      alert(data.message);
      return false;
      // alert('Failed to Add Product');
    } else {
      // OkAlert("Added to cart", "");
      // Add 1 quantiy bt default
      OkAlert(Strings.Product_added,"")
      if (cartProds == null) {
        // alert(orderNum + "First Product Adding");
        
        updateCart.push(productItem);
      } else {
         
        console.log(orderNum + " Updating Cart " + productItem.name);
        cartProds = JSON.parse(cartProds);
        console.log("cartProds from Local storage");
        console.log(cartProds);
        let itemExists = 0;
        //check if item already added
        for (cp of cartProds) {
          console.log(cp.productId + " VS " + productItem.productId);
          if (cp.productId == productItem.productId) {
            itemExists = 1;
            console.log("found match");
            break;                                           
          } else {
            console.log("found No match");
          }
        }

        updateCart = cartProds;
        if (itemExists == 0) {
          updateCart.push(productItem);
          
        } else {
          //DO nothing
           
        }
        console.log("Items in cart" + JSON.stringify(updateCart));
      }

      for (
        var i = 0;
        i < dataResponse.createCustomerOrderRow.customerOrderRows.length;
        i++
      ) {
        itemcountfinal =
          itemcountfinal +
          dataResponse.createCustomerOrderRow.customerOrderRows[i].unitsNumber;
        console.log("units", itemcountfinal);
        console.log(
          "units123",
          dataResponse.createCustomerOrderRow.customerOrderRows[i].unitsNumber
        );
      }
      try {
        let itemcount = 0;
        for (itm of updateCart) {
          itemcount++;
        }
        AsyncStorage.setItem("cartItemCount", itemcountfinal.toString());
        AsyncStorage.setItem("cartProducts", JSON.stringify(updateCart));
        EventRegister.emit("productDetailsCart", itemcountfinal);
      } catch (error) {
        alert("Error while adding product: " + JSON.stringify(error));
        console.log(error);
      }
    }
  });
}
// export async function getCustomerOrder() {
//   let orderNum = await AsyncStorage.getItem("customerOrder");
//   return orderNum;
// }

//Function gets the customer order number fetched from API.
//If its null,then create new custimer Order and return it as order number
export async function setCustomerOrder() {
  let orderNum = await AsyncStorage.getItem("customerOrder");
  orderNum = Number(JSON.parse(orderNum));
  
  if (orderNum == null || orderNum == 0) {
    AsyncStorage.removeItem("cartProducts"); //when no oders ,clear the cart items
    //Api for customer order creation
    
    let queryString = `mutation createCustomerOrder{
      createCustomerOrder{
       id
     }
   }
   `;
    await ApiCall(queryString, null).then(data => {
      console.log("New Order Created ",orderNum);
      let respCustomerOrder = data;
      try {
        let orderNum = respCustomerOrder.response.createCustomerOrder.id;
        AsyncStorage.setItem("customerOrder", orderNum.toString());
      } catch (error) {
        AsyncStorage.removeItem("customerOrder");
        alert("Failed to Process" + JSON.stringify(error));
      }
    });
  }
}
