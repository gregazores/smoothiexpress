import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product, baseURL, category) {

    //computing the discount in amount and percentage -GREG
    let discountPercent = 10
    let discountDollars = product.price * ((100-10)/100)
    
    // I have also included the discount details in the template -GREG
    return `
        <li class="product-card">
            <a href="/product_pages/index.html?product=${product._id}&category=${category}">
                <img src="	${baseURL}/${product.image}" width="500" alt="Image of ${product.alt}" />
                <h2 class="card__name">${product.name}</h2>
                <p class="product-card__price"><strong>$${discountDollars.toFixed(2)}</strong> &nbsp; <span class="disc-ind">-${discountPercent}%
                <p class="product-card__suggested"><em>$${product.price}</em></p>
            </a>
            <div class="product-detail__add quick-view-container">
                <button class="quick-view-button button1 product-details-button1">Quick View</button>
            </div>
        </li>
  `;
  
}

function productModalTemplate(product) {
    return `
    <h2 class="divider">${product.NameWithoutBrand}</h2>
  
    <picture class="divider">
      <source media="(min-width:850px)" srcset="${product.Images.PrimaryMedium}">
      <source media="(min-width:500px)" srcset="${product.Images.PrimarySmall}">
      <img src="${product.Images.PrimaryExtraLarge}">
    </picture>
  
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
  
    <div class="close-button-container">
      <button id="close-button">X</button>
    </div>
    
    `
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
    //   const modalContainer = document.querySelector('.product-detail.quick-view .product-detail-wrapper')
      // our dataSource will return a Promise...so we can use await to resolve it.
      //const list = await this.dataSource.getData();
      const list = await this.dataSource.getData(this.category);
      // render the list 
      this.renderList(list);

      //Manually set the breadcrumbs -Greg
    //   const breadcrumbsHome = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.home');
    //   breadcrumbsHome.innerHTML = `<a href="/">Home</a>`;
    //   const breadcrumbsCategory = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.category');
    //   breadcrumbsCategory.innerHTML = `${this.category.charAt(0).toUpperCase() + this.category.slice(1)} (${list.length} items)`;

    //   //add event listener to quick view buttons
    //   this.addQuickViewListener(list, modalContainer);
    }

    renderList(list) {
        // renderListWithTemplate(productCardTemplate, this.listElement, list);
        renderListWithTemplate((product) => {
            return productCardTemplate(product, this.dataSource.baseURL, this.category)
        }, this.listElement, list);
    }//productCardTemplate: The template function we will use is hard coded

    addQuickViewListener(list, modalContainer) {
      //adding event listeners for each quick view buttons
      const quickViewButtons = document.querySelectorAll('.quick-view-button')
      quickViewButtons.forEach((button) =>{ 
        button.addEventListener('click', (e) => {
          //extracting the  href value
          //after extracting the href value, extract the product id
          const prodId = e.target.parentNode.querySelector('a').href.split('=')[1];

          //call the displayModal function to render the html
          this.displayModal(list, prodId, modalContainer)
        })
      })
    } 
    
    displayModal(list, prodId, modalContainer) {
      //let's do promises to ensure that the listItem is returned
      //before we proceed to the next steps
      let promise = new Promise(function(resolve, reject) {
        //experimenting on promises and delaying the completion of the 
        //tast to see if promises really work
        // setTimeout(() => {
              //return the list item based on the product Id
        //   resolve(list.find(listItem => listItem.Id == prodId ))
        // }, 5000)

        //return the list item based on the product Id
        resolve(list.find(listItem => listItem.Id == prodId ))
        
      })
      
      //once list item is returned, proceed to the next steps
      promise.then(
        function(result) {
          //add classname to the modalContainer to display
          modalContainer.parentNode.classList.add('show-modal')
          //render the HTML content
          renderListWithTemplate(productModalTemplate, modalContainer, [result]);
          //add an eventListener to the close button
          const closeBtn = document.querySelector('.close-button-container');
          closeBtn.addEventListener('click', () => {
            modalContainer.parentNode.classList.remove('show-modal')
            modalContainer.innerHTML = ""
          })

        }
      )
    }
}

   


  