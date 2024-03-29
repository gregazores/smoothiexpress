import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const productId = getParam('product');
const category = getParam('category');
// console.log('category', category)
const product = new ProductDetails(productId, dataSource, category);
product.init();
