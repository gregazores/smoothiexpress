import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import AccountProcess from './AccountProcess.mjs';
import { doc } from 'prettier';

loadHeaderFooter();

const cart = new AccountProcess('.product-list-wrapper');

cart.init();


