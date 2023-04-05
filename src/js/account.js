import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import AccountProcess from './AccountProcess.mjs';

loadHeaderFooter();

const cart = new AccountProcess();

cart.init();


