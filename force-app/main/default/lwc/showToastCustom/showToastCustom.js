import { LightningElement, track, api } from 'lwc';

export default class ShowToastCustom extends LightningElement {
    @api errorMessage;
    @track showToastDiv=true;
    handleVerifiedClick(){        
        this.errorMessage=this.label.basicDetailErrorLabel;
        this.showToastDiv=true;
        setTimeout(() => {
            this.showToastDiv = false;
        }, 20000 );
    }
    closeToast(){
        this.showToastDiv = false;
    }
}