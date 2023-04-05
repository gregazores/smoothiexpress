import { getLocalStorage, returnCartTotalQuantities, alertMessage, removeAllAlerts, setLocalStorage, formDataToJSON} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const extservices = new ExternalServices();

export default class LoginProcess {
    constructor() {

      }

      init() {

            document.querySelector("#login-button").addEventListener("click", (e) => {
                e.preventDefault();
                var myForm = document.forms["login"];

                //Forms have a method called checkValidity that will return false 
                //if it finds anything in the form data that goes against our validation rules.
                var chk_status = myForm.checkValidity();
                //We can also manually trigger the messages that 
                //the browser will add to the page when something is wrong.
                myForm.reportValidity();
                if(chk_status) this.login(myForm);
            });

      }

      async login(myForm) {
            const formElement = myForm;
            const usercreds = formDataToJSON(formElement);
            console.log('login formElement', formElement)
            console.log('login formElement json', usercreds)

            try {
                const resp = await extservices.loginRequest(usercreds);
                location.assign("/accounts/account.html");
            } catch (err) {
                // get rid of any preexisting alerts.
                removeAllAlerts();
                const jsonResponse = await err.message; 
                for (let message in jsonResponse) {
                alertMessage(jsonResponse[message]);
                }
          }

      }

}