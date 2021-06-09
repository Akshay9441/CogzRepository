import { LightningElement,track,api } from 'lwc';
import getLookupData from '@salesforce/apex/rew_HighlightPanelLookupFieldController.getLookupValue';
import { NavigationMixin } from 'lightning/navigation';
export default class Rew_GenericHeaderFields  extends NavigationMixin(LightningElement) {
    @api fieldLabel;
    @api fieldValue;
    @api fieldType;
    @api objectApiName;
    @track phoneType=false;
    @track urlType=false;
    @track stringType=true;
    @track lookupType=true;
    @track lookupName;
    @track lookupId;

    connectedCallback(){
        var fLabel=this.fieldLabel+'';
        //alert(fLabel.includes(' '));
        if(this.fieldLabel+''.includes(' ')){
            this.fieldLabel=this.fieldLabel.replace(' ID','');
        }
        if(this.fieldType=='PHONE'){
            this.phoneType=true;
            this.urlType=false;
            this.stringType=false;
            this.lookupType=false;
        }else if(this.fieldType=='URL'){
            this.phoneType=false;
            this.urlType=true;
            this.stringType=false;
            this.lookupType=false;
        }else if(this.fieldType=='REFERENCE'){
            getLookupData({recordId:this.fieldValue}).then(result=>{
                this.lookupType=true;
                this.phoneType=false;
                this.urlType=false;
                this.stringType=false;
                
                console.log('result look',result);
                this.lookupName=result.Name;
                this.lookupId=result.Id;
            }).catch(error=>{
                alert('No');
            });
        }else{
            this.phoneType=false;
            this.urlType=false;
            this.stringType=true;
            this.lookupType=false;
        }
    }
    redirectToRecord(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.toto,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        });
        this.showsearchResult=false;
}
}