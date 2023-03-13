import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices();
console.log('dataSource', dataSource)
const productId = getParam('product');
console.log('productID', productId)
const category = getParam('category');
// console.log('category', category)
const product = new ProductDetails(productId, dataSource, category);
product.init();
