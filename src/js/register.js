import { loadHeaderFooter } from './utils.mjs';
import RegisterProcess from "./RegisterProcess.mjs";

loadHeaderFooter();

const myRegister = new RegisterProcess();
myRegister.init();