import { loadHeaderFooter } from './utils.mjs';
import LoginProcess from "./LoginProcess.mjs";

loadHeaderFooter();

const myLogin = new LoginProcess();
myLogin.init();