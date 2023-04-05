import { getLocalStorage, returnCartTotalQuantities, alertMessage, removeAllAlerts, setLocalStorage, formDataToJSON} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { doc } from "prettier";
//import { deleteItem } from "./deleteItem.js"; 
const services = new ExternalServices();


function cartItemTemplate(item, baseURL) {
  //calculate the subtotal of each item rendered -- Natalia
  let discountPercent = 10
  let discountDollars = (item.price * ((100-discountPercent)/100)).toFixed(2)
  const subtotal = (item.quantity * discountDollars).toFixed(2)

  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item._id}&category=${item.category}" class="cart-card__image">
      <img
        src="${baseURL}/${item.image}"
        alt="${item.alt}"
      />
    </a>
    <a href="/product_pages/index.html?product=${item._id}&category=${item.category}">
      <h2 class="card__name">${item.name}</h2>
    </a>
    <div class="remove-btn">
    <a href="/product_pages/index.html?product=${item._id}&category=${item.category}" class="cart-remove__item" data-id=${item._id}>Buy Again</></a></div>
    <p class="cart-card_quantity">Quantity: ${item.quantity}</p>
    <p class="cart-card__unit_price">Unit Price: $${discountDollars}</p>
    <p class="cart-card__total_price">Sub Total: $${subtotal}</p>
    </li>`;
      return newItem;
      //document.querySelector(".cart-remove__item").addEventListener('click', deleteProduct);
      //deleteProduct();
  }

export default class AccountProcess {
    constructor(parentSelector) {
      this.parentSelector = parentSelector;
      this.total = 0;
      this.list = [];
      this.accountsGreeting = document.querySelector(".account-section .accounts-greeting")
    }
    
    async init() {
      const user = getLocalStorage('user')
      if(user) {
        try {
          this.list = await services.getOrders(user);

          console.log("this.list", this.list)
          this.list.forEach((orderList) => {
            console.log("orderList", orderList)

            const orderHTML = `
            <div class='product-list-order-wrapper'>
              <h3 class="order-number">Order# ${orderList._id} </h3>
              <ul class='product-list'>
                ${this.renderCartContents(orderList)}
              </ul>
              <h3>Order Total Price ${orderList.orderTotal} </h3>
            </div>
            `

            document.querySelector(this.parentSelector).insertAdjacentHTML("beforeend", orderHTML);
            
          } )
          
        } catch (err) {
            // get rid of any preexisting alerts.
            removeAllAlerts();
            if(err.message == "Sorry you must be logged in! No authorization") {
              alertMessage(`Sorry you must be logged in! Click <a href="../accounts/login.html">Here</a>`)
            }

            else {
              //alertMessage(err.message)
            }
      
            console.log(err);
        }
      } else {

          this.accountsGreeting.innerHTML = `Welcome To Smoothie Express! <br> <span>You must be logged in to view your orders. Click <a href="../accounts/login.html">Here</a></span>`
        
      }


      


    }


    renderCartContents(orderList) {
      return orderList.items.map((item) => cartItemTemplate(item, services.baseURL));
  }
  
    
  }