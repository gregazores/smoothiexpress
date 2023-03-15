import { getLocalStorage, setLocalStorage } from '../js/utils.mjs';

function productDetailsTemplate(product, baseURL) {
  let discountPercent = 10
  let discountDollars = product.price * ((100-discountPercent)/100)
  return `
        <h2 class="pageTitle">${product.name}</h2>
        <section class="about">
            <div class="product-image">
                <picture><img src="${baseURL}/${product.image}" alt="${product.alt}" loading="lazy"></picture>
            </div>
            <div class="aboutBF">
                <h2 class="inline-block-layout">Price: </h2>
                <p class="inline-block-layout"> $${discountDollars.toFixed(2)}</p>
                <br>
                <h2 class="inline-block-layout">Calories: </h2>
                <p class="inline-block-layout"> ${product.calories} cal</p>
                <h2>Ingredients</h2>
                <p>${product.ingredients}</p>
            </div>
        </section>

        <div class="product-detail__add">
            <button class="button1 product-details-button1" id="addToCart" data-id="${product._id}">ADD TO CART</button>
        </div>
    </div>
    `;
}

export default class ProductDetails {
  constructor(productId, dataSource, category) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.category = category;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.category, this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails('.product-detail');
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // setLocalStorage("so-cart", this.product);
    //code below prevents duplication
    let Data = getLocalStorage('so-cart');
    if (Data) {
      let tent = 1;
      for (let i = 0; i < Data.length; i++) {
        //if the same item is already listed in the cart,
        //just iterate the quantity
        if (Data[i]._id == this.productId) {
          
          Data[i].quantity++;
          tent = 0;
        }
      }
      if (tent == 1) {
        this.product.quantity = 1;
        Data.push(this.product);
      }
    } else {
      Data = [];
      this.product.quantity = 1;
      Data.push(this.product);
    }
    setLocalStorage('so-cart', Data);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    console.log("this.product", this.product)
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product, this.dataSource.baseURL)
    );
  }
}