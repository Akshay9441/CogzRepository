import { LightningElement, track, api } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import customCSS from '@salesforce/resourceUrl/customAuthenticationCSS';
export default class Rew_Authentication extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track isModalOpen = false;
    @track isMainPageShown = true;
    @track isUnverifiedModalOpen = false;
    selectedMode = '';
    selectedDecision = '';  
    @api displayVerificationButtons=false 
    @track styleCss =  customCSS + '/customAuthenticationCSS/css/authenticationCSS.css';
    get optionsVerification() {
        return [
            { label: 'Phone 0470575122', value: 'phone' },
            { label: 'Email tomob57599@aprimail.com', value: 'email' },
        ];
    }
    get optionsDecision() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
        ];
    }
    renderedCallback(){        
        Promise.all([
            loadStyle(this,this.styleCss)]);
        
    }
   
    handleGenerateOTPClick() {        
        this.isModalOpen = true;
    }
    closeModal() {       
        this.isModalOpen = false;
        this.isUnverifiedModalOpen = false;
    }
    handleUnverifiedClick(){
        this.isUnverifiedModalOpen = true;
    }
    unverifiedYesClickHandled() {        
        this.isUnverifiedModalOpen = false;
        this.isMainPageShown=false;
    }
    handleBack(){
        this.isMainPageShown=true;
    }
    handleSelectCard(event){
        alert(event.detail);
        this.displayVerificationButtons=event.detail;
    }
}