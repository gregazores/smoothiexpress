
import { loadHeaderFooter, getLocalStorage, removeAllAlerts, alertMessage } from './utils.mjs';
import ExternalServices from "./ExternalServices.mjs";
const services = new ExternalServices();

export default class LogoutProcess {
    constructor() {

    }

    async init() {

        try {
            localStorage.setItem('user', null)
            const res = await services.logout(json);
            
            
        } catch (err) {
        
                    // get rid of any preexisting alerts.
                    removeAllAlerts();
                    if(err.message == "Sorry you must be logged in! No authorization") {
                      alertMessage(`Sorry you must be logged in! Click <a href="../accounts/login.html">Here</a>`)
                    }
            
                    else {
                      //alertMessage(err.message)
                    }
              
                    console.log(err);
            
        }

    }

}
