
import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();
  
//New register modal --- Natalia //
const visit = getLocalStorage('currentVisit');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');

if (!visit) {
    modal.showModal();
    setLocalStorage('currentVisit', 'firstVisit');
    };
    
    closeModal.addEventListener('click', () =>{
    modal.close();
})

//End of new register modal //
