import { LightningElement,api,track } from 'lwc';
//import {NavigationMixin} from 'lightning/Navigation';
import getMetaData from '@salesforce/apex/rew_Highlight_Panel_Controller.getMetaData';
import followUnfollowService from '@salesforce/apex/rew_Highlight_Panel_Controller.followUnfollowService';
// import getTitleInfo from '@salesforce/apex/HighlightsPanelController.getFieldInfo';
// import updateSubscription from '@salesforce/apex/HighlightsPanelController.toggleSubscription';
// import setSubscriptionStatus from '@salesforce/apex/HighlightsPanelController.fetchSubscriptionStatus';
// import USER_ID from '@salsforce/user/Id';

export default class Rew_GenericHeader extends LightningElement {
   @api recordId;
   @api objectApiName;
   @api prop1;
   @api prop2;
   @track recordData=[];
   @track firstRowFields=[];
   @track secondRowFields=[];
   @track titleValue;
   @track secondRow;
   @track iconName;
   @track firstFieldData={};
   @track isFollowing;
    @track followIcon;
    @track followUnfollow;
   connectedCallback()
   {   
       
       getMetaData({recordId: this.recordId})
       .then(result =>{ 
           console.log('Header Result:',result);
           var resultData= JSON.parse(result);       
           console.log({resultData});
           
           this.iconName=resultData.iconName;
           this.recordData=resultData.recordData;
           this.isFollowing=resultData.isFollowing;
           if(this.isFollowing){
            this.followIcon="utility:check";
            this.followUnfollow="Following";
           }
           console.log('recordData:',this.recordData);
           
           for(var i=0;i<this.recordData.length;i++)
           {
              if(i==0){
                  var data={};
                  data.fieldLabel=this.recordData[i][1];
                  data.fieldValue=this.recordData[i][2];
                  data.fieldType=this.recordData[i][3];
                  this.firstFieldData=data;
              }
              if(this.recordData[i][0]=='name'){
                this.titleValue=this.recordData[i][2];
              }else if(i!=-0){
                  var data={};
                  data.fieldLabel=this.recordData[i][1];
                  data.fieldValue=this.recordData[i][2];
                  data.fieldType=this.recordData[i][3];
                  this.firstRowFields.push(data);
              }
            }
       })
       .catch(error =>{
        
        console.log({error});
       });
   }
   changeToUnfollow(){
      
    this.followIcon="utility:close";
    this.followUnfollow="Unfollow";

   }
   changeToFollow(){
    
    this.followIcon="utility:check";
    this.followUnfollow="Following";
   }
   handleFollowUnfollow(){
    var followButtons=this.template.querySelector('[data-id="followButton"]');
    console.log('followButons',followButtons);
    followButtons.disabled=true;
    
    
    if(this.isFollowing){
        followUnfollowService({isFollow:false,recId:this.recordId}).then(result=>{
            if(result=='Success'){
                this.isFollowing=false;
            }else{
                alert(result);
            }
            followButtons.disabled=false;
        }).catch(error=>{
            alert(error);
            console.log({error});
            followButtons.disabled=false;
        });
        
    }else{
        followUnfollowService({isFollow:true,recId:this.recordId}).then(result=>{
            if(result=='Success'){
                this.isFollowing=true;
                this.changeToFollow();
            }else{
                alert(result);
            }
            followButtons.disabled=false;
        }).catch(error=>{
            alert(error);
            console.log({error});
            followButtons.disabled=false;
        });
    }
    console.log('followStateElem',followStateElem);
   }

}