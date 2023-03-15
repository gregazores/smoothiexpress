import { getLocalStorage } from "./utils.mjs";
//import { deleteItem } from "./deleteItem.js"; 



function cartItemTemplate(item, baseURL) {
  //calculate the subtotal of each item rendered -- Natalia
  let discountPercent = 10
  let discountDollars = (item.price * ((100-discountPercent)/100)).toFixed(2)
  const subtotal = (item.quantity * discountDollars).toFixed(2)

  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item._id}&category=${/*category*/1}" class="cart-card__image">
      <img
        src="${baseURL}/${item.image}"
        alt="${item.alt}"
      />
    </a>
    <a href="/product_pages/index.html?product=${item._id}&category=${/*category*/1}">
      <h2 class="card__name">${item.name}</h2>
    </a>
    <p class="cart-card__color">${item.ingredients}</p>
    <div class="remove-btn">
    <button class="cart-remove__item" data-id=${item._id}>X</></button></div>
    <div class="cart_qty">
    <button class="decrease_units" data-id=${item._id}>-</button>
    <p class="cart-card__quantity">${item.quantity}</p>
    <button class="increase_units" data-id=${item._id}>+</button>
    </div>
    <p class="cart-card__unit_price">Unit Price: $${discountDollars}</p>
    <p class="cart-card__total_price">Total: $${subtotal}</p>
    </li>`;
      return newItem;
      //document.querySelector(".cart-remove__item").addEventListener('click', deleteProduct);
      //deleteProduct();
  }

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
        this.total = 0;
        this.list = [];
        this.baseURL = 'https://smoothiexpress-api.onrender.com'
    }

    async init() {
      this.list = getLocalStorage(this.key) || [];
      this.calculateListTotal(this.list);
      this.renderCartContents(this.list);
    }

    renderCartContents() {
        //const cartItems = getLocalStorage(this.key) || [];
        const htmlItems = this.list.map((item) => cartItemTemplate(item, this.baseURL));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        document.querySelector(".list-total").innerText += ` $${this.total.toFixed(2)}`;
    }
    
    //compute the sub-total price of the cart
    calculateListTotal(list) {
      //price for each item is computed by finalPrice times quantity
      const amounts = list.map((item) => item.FinalPrice * item.quantity);
      //execute the code below if amounts array is not empty
      if (amounts.length) {
        this.total = amounts.reduce((sum, item) => sum + item);
      }
    }

}


  
  
 