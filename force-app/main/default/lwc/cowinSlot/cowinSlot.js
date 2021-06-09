import { LightningElement } from 'lwc';

export default class CowinSlot extends LightningElement {

    connectedCallback(){
        fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=250002&date=22-05-2021', // End point URL
        {
            // Request type
            method:"GET",
            
        })
        .then((response) => {
            console.log(JSON.stringify(response));
            console.log((response));
            return response.json(); // returning the response in the form of JSON

        })
    }
}