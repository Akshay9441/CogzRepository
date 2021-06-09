import { LightningElement, track, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import KnowledgeArticles from '@salesforce/apex/GetKnowledgeArticles.getArticleByCategory';
import RecentKnowledgeArticles from '@salesforce/apex/GetKnowledgeArticles.getArticleByRecentlyViewed';
export default class Rew_ShowAuthKnowledgeArticles  extends NavigationMixin(LightningElement) {
    @track article;
    @track articleList = [];
    @track isSearchExecuting=false;
    @track searchInput ='';
    @track allArticles=[];
    @track results
    @track recentArticles=[];
    @track resultLength=true;
    //@track cible = 'Tous';
    @track isKeyWordSearchExecuting=false
    @track rt = 'All';
    @track rtList = [];

    @api displayCard;
    @api recordType;
    @track articles=[];
    @track articlesToShow =[];
    @track showsearchResult=false;

    

    redirectToArticle(event) {
            event.preventDefault();
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: event.currentTarget.dataset.toto,
                    objectApiName: 'Knowledge__kav',
                    actionName: 'view'
                }
            });
            this.showsearchResult=false;
    }
    connectedCallback(){
        KnowledgeArticles({recordType:this.recordType}).then(result=>{
            
            console.log({result});
            var resultarr=[];
            resultarr=result;
            this.articles=result;
            this.allArticles=result;
            if(result.length>1){
                this.resultLength=false;
            }else{
                this.resultLength=true;
            }
            var count=1;
            resultarr.forEach(article => {
                console.log("art",article);
                if(count<=3){
                    this.articlesToShow.push(article);
                }
                count++;
            });
            console.log("articlesToShow",this.articlesToShow);
        }).catch(error=>{
            
            console.log({error});
        });
    }
    showdefault(event){
        this.recentArticles=[];
        if(event.target.value==null||event.target.value==undefined||event.target.value=="")   
        {
            this.isSearchExecuting= false;  
            this.searchInput=event.target.value; 
            this.showsearchResult=true;
            RecentKnowledgeArticles({recordType:this.recordType}).then(result=>{          
            var resultarr=[];
            resultarr=result; 
            this.recentArticles=[];
            this.recentArticles=result;           
            }).catch(error=>{
                console.log({error});
            });
        }
        else{            
            this.searchInput=event.target.value;
            this.showsearchResult=true;
            this.isSearchExecuting= true;
            RecentKnowledgeArticles({recordType:this.recordType,searchInput:this.searchInput}).then(result=>{
            var resultarr=[];
            resultarr=result; 
            this.recentArticles=[];
            this.recentArticles=result;
            console.log("recentArticles",this.recentArticles);
            }).catch(error=>{
                 console.log({error});
            });
            
        }
        
        
    }
    hideResults(){       
        this.showsearchResult=false;   
        this.isSearchExecuting= false;  
        this.recentArticles=[];     
    }
    handleSearch(event){     
        if(event.target.value==null||event.target.value==undefined||event.target.value=="")   
        {
            this.isSearchExecuting= false;  
            this.searchInput=event.target.value;  
            this.showsearchResult=true;  
            this.isSearchExecuting= false;  
            this.searchInput=event.target.value; 
            this.showsearchResult=true;
            RecentKnowledgeArticles({recordType:this.recordType}).then(result=>{          
            var resultarr=[];
            resultarr=result; 
            this.recentArticles=[];
            this.recentArticles=result;           
            }).catch(error=>{
                console.log({error});
            });       
        }
        else
        {
            this.isSearchExecuting= true;
            this.searchInput=event.target.value;
            this.showsearchResult=true;
            RecentKnowledgeArticles({recordType:this.recordType,searchInput:this.searchInput}).then(result=>{
            
                console.log({result});
                var resultarr=[];
                resultarr=result;                
                  
                console.log(result);
                this.recentArticles=[];
                this.recentArticles=result;
                
                console.log("recentArticles",this.recentArticles);
            }).catch(error=>{
               
                console.log({error});
            });
        }
      
    }
    searchByKeyWord(){
        
        if(this.searchInput!=null&&this.searchInput!=undefined&&this.searchInput!=""){            
            this.isKeyWordSearchExecuting=true;
            this.showsearchResult=true;
            this.isSearchExecuting= false;
            RecentKnowledgeArticles({recordType:this.recordType,searchInput:this.searchInput}).then(result=>{
            
            var resultarr=[];
            resultarr=result; 
            this.articles=[];
            this.articles=result;
            if(result.length>1){
                this.resultLength=false;
            }else{
                this.resultLength=true;
            }
            //console.log("recentArticles",this.recentArticles);
            }).catch(error=>{
                 console.log({error});
            });
            
        }

    }
    showAllArticles(){
        this.isKeyWordSearchExecuting=false;
        this.article=this.allArticles;
    }
    getKnowledgeByCategory(inputKey){

    }
}