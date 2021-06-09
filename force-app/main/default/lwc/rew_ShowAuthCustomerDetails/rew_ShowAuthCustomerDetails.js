import { LightningElement ,api, track, wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
export default class Rew_ShowAuthCustomerDetails extends LightningElement {  
    @api recordId;    
    @track record;
    @track error;
    @track isFollwing;
    @track selectedCards=[];
    @track displayVerificationButtons=false;
    @wire(getRecord, { recordId: '$recordId', layoutTypes: ['Full'], modes: ['View'] })
    wiredAccount({ error, data }) {
        if (data) { 
            console.log('Data:',JSON.stringify(data.childRelationships));
            this.record = data.fields;
            this.error = undefined;
        } else if (error) {
            console.log('Yess Err',error);
            this.error = error;
            this.record = undefined;
        }
    }

    handleSelect(event){        
        console.log("event",event);
        console.log("target",event.target);
        
        var targetName=event.target.dataset.targetId;
        var iconId=targetName+'0';
        var elem=this.template.querySelector('[data-id="'+iconId+'"]');
        
        if(elem.classList.value.includes('hideSuccessIcon')){
            elem.classList.remove('hideSuccessIcon');
            elem.classList.add('showSuccessIcon');
            this.selectedCards.push(targetName);
        }else{
            elem.classList.remove('showSuccessIcon');
            elem.classList.add('hideSuccessIcon');
            const index = this.selectedCards.indexOf(targetName);
            var newselect=[];
            this.selectedCards.forEach(elem=>{
                if(elem!=targetName){
                    newselect.push(elem);
                }
            });
            this.selectedCards=newselect;
            
        }
        
        console.log(this.selectedCards);
        if(this.selectedCards.length>2){
            this.displayVerificationButtons=true;
            const selectEvent = new CustomEvent('cardselect', {
                detail: true
            });
           this.dispatchEvent(selectEvent);
        }else{
            this.displayVerificationButtons=true;
            const selectEvent = new CustomEvent('cardselect', {
                detail: false
            });
            this.dispatchEvent(selectEvent);
        }
        console.log("classLogs",elem.classList.value);
        console.log("elem",elem);
    }
  
}
