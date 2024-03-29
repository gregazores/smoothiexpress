import { getLocalStorage, setLocalStorage, returnCartTotalQuantities, renderCartSuperscript} from '../js/utils.mjs';

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
                <p class="inline-block-layout original-old-price"><span class="final_price"><strong>$${discountDollars.toFixed(2)}</strong></span>&nbsp; &nbsp;<span class="suggested_price">$${product.price.toFixed(2)}</span></p>
                <br>
                <h2 class="inline-block-layout">You saved: </h2>
                <p class="inline-block-layout discount_indicator"><span class="discount-amount">$${(product.price - discountDollars).toFixed(2)} (${discountPercent.toFixed(2)}%)</span></p>
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
      //upon changing the selector, we will need to remove 
    //<section class='product-detail'> opening and  </section> closing 
    //in the productDetailsDisplay function 
    // NOTES FROM GREG ABOVE

    //Manually set the breadcrumbs -Greg
    const breadcrumbsHome = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.home');
    breadcrumbsHome.innerHTML =`<a href="/">Home</a>`;

    const breadcrumbsCategory = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.category');
    breadcrumbsCategory.innerHTML = `<a href="/product-listing/index.html?category=${this.category}">${this.category.charAt(0).toUpperCase() + this.category.slice(1)}</a>`;

    const breadcrumbsProductName = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.product-name');
    breadcrumbsProductName.innerHTML = this.product.name;



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
    flyToCart()
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product, this.dataSource.baseURL)
    );
  }

}



function flyToCart() {
  const cartElement = document.querySelector('.basket-icon');
  const productImg = document.querySelector('.product-image > picture > img');
  const boundingCart = cartElement.getBoundingClientRect();
  const boundingImage = productImg.getBoundingClientRect();
  const xDistance = boundingCart.left - boundingImage.left;
  const yDistance = boundingImage.top - boundingCart.top;
  //const cartQuantity = returnCartItems(['so-cart', 'do-cart']).length;

  //clone the image
  const imageClone = productImg.cloneNode();
  imageClone.classList.add('flying-img');
  cartElement.appendChild(imageClone);
  cartElement.classList.add('shake');
  //set var
  imageClone.style.cssText = `
    --width : ${boundingImage.width.toFixed(2)}px;
    --left : -${xDistance.toFixed(2)}px;
    --top : ${yDistance.toFixed(2)}px;
  `;

  setTimeout(() => {
    cartElement.removeChild(imageClone);
    cartElement.classList.remove('shake');
    renderCartSuperscript(returnCartTotalQuantities('so-cart'));
    //renderCartSuperscript(cartQuantity)
}, 2000);

}