import { getLocalStorage, returnCartTotalQuantities, alertMessage, removeAllAlerts, setLocalStorage, formDataToJSON} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// takes a form element and returns an object where the key is the "name" of the form input.
//transferring this to utils since I will use this on login process
// function formDataToJSON(formElement) {
//   const formData = new FormData(formElement),
//     convertedJSON = {};

//   formData.forEach(function (value, key) {
//     convertedJSON[key] = value;
//   });

//   return convertedJSON;
// }

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      return {
        _id: item._id,
        alt: item.alt,
        calories: item.calories,
        category: item.category,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      };
    });
    return simplifiedItems;
  }

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
    init() {
      //if local storage is empty, give an empty array instead. this is to prevent error
      //because this.list is expecting an array
      this.list = getLocalStorage(this.key) || [];

      if(this.list.length == 0) {
        document.querySelector('#checkout-form').innerHTML = "<h2>It looks like you forgot to place an order. Click (<a href='/product-listing/index.html?search='>here</a>) for our full menu</h2>"
      }

      if(this.list.length && document.querySelector('#checkout-form')){
          this.calculateItemSummary();

          document
            .querySelector("#email")
              .addEventListener("blur", this.calculateOrdertotal.bind(this));
          // listening for click on the button
          document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
            e.preventDefault();
            var myForm = document.forms["checkout"];

            //Forms have a method called checkValidity that will return false 
            //if it finds anything in the form data that goes against our validation rules.
            var chk_status = myForm.checkValidity();
            //We can also manually trigger the messages that 
            //the browser will add to the page when something is wrong.
            myForm.reportValidity();

            if(chk_status) this.checkout(myForm);
          });

      }



    }
    calculateItemSummary() {

        // calculate and display the total amount of the items in the cart, and the number of items.
      const summaryElement = document.querySelector(
        this.outputSelector + " #cartTotal"
        // console.log('test', outputSelector)
      );

      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items"
      );
      //itemNumElement.innerText = this.list.length;
      
      itemNumElement.innerText = `${returnCartTotalQuantities('so-cart')} items`;
         // calculate the total of all the items in the cart
      const amounts = this.list.map((item) => item.price * item.quantity);
      this.itemTotal = amounts.reduce((sum, item) => sum + item);
      summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    }
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      //this.shipping = 10 + (this.list.length - 1) * 2;
      this.shipping = 10 + (returnCartTotalQuantities('so-cart') - 1) * 2;
      this.tax = (this.itemTotal * 0.06).toFixed(2);
      this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
      ).toFixed(2);

      // display the totals.
      this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
      const shipping = document.querySelector(this.outputSelector + " #shipping");
      const tax = document.querySelector(this.outputSelector + " #tax");
      const orderTotal = document.querySelector(
        this.outputSelector + " #orderTotal"
      );
      shipping.innerText = "$" + this.shipping;
      tax.innerText = "$" + this.tax;
      orderTotal.innerText = "$" + this.orderTotal;
      
    }
    async checkout(myForm) {
      //const formElement = document.forms["checkout"];
      const formElement = myForm;
      const json = formDataToJSON(formElement);
      // add totals, and item details
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      json.user = getLocalStorage('user');
      console.log('checkout CheckoutProcess',json);
      try {
        const res = await services.checkout(json);
        console.log('res',res);
        setLocalStorage("so-cart", []);
        //location.assign("/checkout/success.html");
      } catch (err) {
        // get rid of any preexisting alerts.
        removeAllAlerts();
        if(err.message == "Sorry you must be logged in! No authorization") {
          alertMessage(`Sorry you must be logged in! Click <a href="../accounts/login.html">Here</a>`)
        }

        else {
          alertMessage(err.message)
        }
  
        console.log(err);

      }
    }
  }