({  
      MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000,      //Chunk Max size 750Kb 
   
    
    
    checkrefrenceid : function(component, event, helper) 
    {
        const self = this;
        var referenceId= component.get("v.referenceId");
       // alert(referenceId+'referenceId');
        var action=component.get("c.checkrefrenceid");
        action.setParams({
            "ref_id" :referenceId
         });
       
        action.setCallback(this, function(response) 
          {                
            var state = response.getState();
           // alert(state+'state');
               var q =response.getReturnValue();
            if(q=='0')
              {
               // alert('ottttttttttthelooreduplicate');  
              }
            else
            {
                //alert('helooreduplicate');
                 component.set('v.emloan', true);
               self.getrefreceidforemloan(component, event, helper);   
            }
                   
        });
        $A.enqueueAction(action);
      
        
    },
    
    
    AccList : function(component, event, helper) {
       var LeadId=id1.toString();
        var action=component.get('c.getAccList2');
        action.setParams({
            "LeadId": LeadId
        });

        action.setCallback(this,function(response){
        var responseValue=response.getReturnValue();
            var state = response.getState();
              if(state=='SUCCESS'){  
        component.set('v.accountList1',responseValue)            
              }
        });

        $A.enqueueAction(action);
    },
    
    AccList1 : function(component, event, helper,AccId) {
        var action=component.get('c.getAccList1');
        action.setParams({
            "AccId": AccId
        });

        action.setCallback(this,function(response){
        var responseValue=response.getReturnValue();
            var state = response.getState();
              if(state=='SUCCESS'){  
        component.set('v.acc',responseValue)            
              }
        });

        $A.enqueueAction(action);
    },
    
    
    
    
    
    
    
    
    
       showToast : function(component, event, helper) {
    var toastEvent = $A.get("e.force:showToast");
    toastEvent.setParams({
        "title": "error!",
        "message": "enter a valid number.",
         "type": "error"
    });
    toastEvent.fire();
},
    
    getrefreceidforemloan :function(component, event,helper)
  {
       const self = this;
        //('onside integartion loop');
       // alert('kkkk123');
        var action=component.get("c.getrefreceidforemloan");
       
        action.setCallback(this, function(response) {                
            var state = response.getState();
               var q =response.getReturnValue();
            if( state=='SUCCESS')
            {
                 component.set('v.refrenceidforAllLoan','Yes');
                 component.set("v.referenceId",q);
                component.set("v.confirmrefrenceid",q);
                self.checkrefrenceid(component, event,helper);
            }
          
            //(state+'orderintegartion api');               
        });
        $A.enqueueAction(action);
     
      
    },
    
    // Abhilash getTotalMinimumAmtForHardware
    getTotalMinimumAmtForHardware :function(component, event,dataformrpandmop)
    {    
        var totalAmt = 0;
        for(var i=0;i<dataformrpandmop.length;i++)
        {
            //alert(dataformrpandmop[i].hardwareproduct+'dataformrpandmop[i].hardwareproduct ==> '+ dataformrpandmop[i].Productname);
            
            if(dataformrpandmop[i].hardwareproduct==='true')
            {
                var action=component.get("c.getMinimumAmtForHardware");
                action.setParams({
                    "ProductName" :dataformrpandmop[i].Productname
                });
                action.setCallback(this, function(response) {                
                    var state = response.getState();
                    var q =response.getReturnValue();
                    if( state=='SUCCESS')
                    {
                        //console.log('MIN Amt==> '+ q);
                        totalAmt += parseInt(q);
                        console.log('MIN Amt total==> '+ totalAmt);
                        component.set('v.totalMinimumAmtForHardware',parseInt(totalAmt));
                    }
                    
                });
                $A.enqueueAction(action);
            }
        }
        
    },
   
    
    
    
    orderintegartionapi:function(component, event,helper){
        
        //('onside integartion loop');
        var leadid=id1.toString();
        var action=component.get("c.callPushOrder");
        action.setParams({
            "leadId" :leadid,
            "discountidis":discountidis
            
        });
        action.setCallback(this, function(response) {                
            var state = response.getState();
            
            //(state+'orderintegartion api');               
        });
        $A.enqueueAction(action);
    },
    
    getBatchAndDateForProducts:function(component, event,helper,productId){
        component.set("v.BatchAndLang",true);
        console.log("productId"+productId);
        var action=component.get("c.getBatchAndLanguage");
        action.setParams({
            "productId": productId
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state=='SUCCESS'){
                console.log("response_wrapperList0---> "+JSON.stringify(response.getReturnValue()));
                var batchLanguages = [];
                for(var i in response.getReturnValue()){
                    if(!batchLanguages.includes(response.getReturnValue()[i].section_language))
                        batchLanguages.push(response.getReturnValue()[i].section_language);
                }
                component.set("v.batchLanguages",batchLanguages);
                component.set("v.BatchAndDateForProducts",response.getReturnValue());
               // if(response.getReturnValue().length>0)
                   
            }else{
               console.log("Error in APEX "); 
            }
        });
        $A.enqueueAction(action);
        
    },
    
     
     updatelead:function(component, event,helper){
        
   // alert('heloo');
   var alternateno = component.get('v.Leadobject.Secondary_Mobile_Number__c');
        // alert(alternateno+'heloo');
        var firstname=component.get('v.Leadobject.FirstName')
         var lastname=component.get('v.Leadobject.LastName')
        var email=component.get("v.Leadobject.Email");
        var alemail=component.get("v.Leadobject.Alternate_Email__c");
        var MobilePhone=component.get("v.Leadobject.MobilePhone");
        var School_Name=component.get("v.Leadobject.School_Name__c");
        var Medium= component.get("v.Leadobject.Medium__c");
        component.set("v.Leadobject.Language__c" ,' ');
        var School_Code =component.get("v.Leadobject.School_Code__c");
         var City =component.find("city-record").get("v.selectedOption");
      // alert(City+' City')
        
        var parname=component.get("v.Leadobject.Parent_Name__c");
        var leadid=id1.toString();
        var Schoolcode=component.find("city-records").get("v.selectedOption");
        component.set("v.Leadobject.School_Code__c" ,Schoolcode);
        /*component.set('v.Leadobject.Id',leadid);*/
      
 
 
       /* var aat= component.get('v.Leadobject.Id');
        var  Leadobject= component.get('v.Leadobject');
        alert(JSON.stringify(Leadobject));
        console.log(JSON.stringify(Leadobject)+'kkkkkkkkkkkkkkkkkkkkk');*/
     
        var selectedLanguage =component.get("v.selectedGenreList");
        var selectedLanguageString = '';
        for(var i in selectedLanguage){
            if(selectedLanguageString==''){
                selectedLanguageString += selectedLanguage[i];
            }else{
                selectedLanguageString += ';'+selectedLanguage[i];
            }
        }
            
     console.log("laguageeeee--> "+component.get("v.selectedGenreList"));
     var action=component.get("c.Leadobject");
     action.setParams({
         "City":City,
         "languagesKnown": selectedLanguageString,
         "firstname":firstname,
         "lastname":lastname,
         "email":email,
         "alemail":alemail,
         "MobilePhone":MobilePhone,
         "School_Name":School_Name,
         "Medium":Medium,
         "School_Code":Schoolcode,
         "parname":parname,
         "leadid":leadid,
         "alternateno":alternateno
         
     });
     
     action.setCallback(this, function(response) {
         
            var state = response.getState();
          // alert(state);  
        
        });
        $A.enqueueAction(action);
                
    },
    
  
    uploadHelper: function(component, event,helper) {
        ////('helper');
        component.set("v.showLoadingSpinner", true);
        var file = f;
        var self = this;
        // check the selected file size, if select file size greter then MAX_FILE_SIZE,
        // then show a // msg to user,hide the loading spinner and return from function  
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", '// : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
            return;
        }
        
        // Convert file content in Base64
        var objFileReader = new FileReader();
        objFileReader.onload = $A.getCallback(function() {
            var fileContents = objFileReader.result;
            var base64 = 'base64,';
            var dataStart = fileContents.indexOf(base64) + base64.length;
            fileContents = fileContents.substring(dataStart);
            self.uploadProcess(component, file, fileContents);
        });
        
        objFileReader.readAsDataURL(file);
    },
    
    uploadHelper1: function(component, event,helper) {
        let toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            "type" : "success",
            "message" : "File Uploaded Successfully"
        });
        toastEvent.fire();
        //var fileInput = component.find("fuploader1").get("v.files");
        var fileInput = event.getSource().get("v.files");
        var title = event.getSource().get("v.title");
        console.log('fileInputssssss--> '+JSON.stringify(component.get("v.anyFile")));
        var file = fileInput[0];
        var self = this;
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.fileName", '// : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
            return;
        }
        var objFileReader = new FileReader();
        objFileReader.onload = $A.getCallback(function() {
            var fileContents = objFileReader.result;
            var base64 = 'base64,';
            var dataStart = fileContents.indexOf(base64) + base64.length;
            fileContents = fileContents.substring(dataStart);
            self.uploadProcess1(component, file, fileContents,title);
        });
        objFileReader.readAsDataURL(file);
    },
    uploadProcess1: function(component, file, fileContents,title) {
        var startPosition = 0;
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        this.uploadInChunk1(component, file, fileContents, startPosition, endPosition, '',title);
        console.log("endPosition----->"+endPosition);
        console.log("CHUNK_SIZE----->"+this.CHUNK_SIZE);
    },
    uploadInChunk1: function(component, file, fileContents, startPosition, endPosition, attachId,title) {
        var getchunk = fileContents.substring(startPosition, endPosition);
        var acc= component.get("v.anyFile");
        acc.push({'parentId':component.get("v.recordId"),'fileName':file.name,'base64Data':encodeURIComponent(getchunk),'contentType':file.type,'fileId':attachId,'title':title});
        component.set("v.anyFile",acc);
        

    },
    getPaymentModeWrapper : function(component, event,helper) { 
        
        try{
            var action=component.get("c.returnPaymentModeWrapper");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if(state === 'SUCCESS'){
                    var result = response.getReturnValue();
                    console.log('payment Mode Wrapper--> '+JSON.stringify(result));
                    component.set("v.PaymentMode",result);
                }
            });
            $A.enqueueAction(action);
           }catch(Err){
               console.log(Err);
           }
    }, 
    
    uploadProcess: function(component, file, fileContents) {
        ////('helperprocess');
        // set a default size or startpostiton as 0 
        var startPosition = 0;
        // calculate the end size or endPostion using Math.min() function which is return the min. value   
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        
        // start with the initial chunk, and set the attachId(last parameter)is null in begin
        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
    },
    
    
    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        var self = this;
        ////(payidis);
        ////('inside save image loop');
        // call the apex method 'saveFile'
        var getchunk = fileContents.substring(startPosition, endPosition);
        ////(getchunk);
        var action = component.get("c.saveFile");
        action.setParams({
            // Take current object's opened record. You can set dynamic values here as well
            parentId: payidis, 
            fileName: file.name,
            base64Data: encodeURIComponent(getchunk),
            contentType: file.type,
            fileId: attachId
        });
        
        // set call back 
        action.setCallback(this, function(response) {
            attachId = response.getReturnValue();
            var state = response.getState();
            if (state === "SUCCESS") {
                // //(state);
                // update the start position with end postion
                startPosition = endPosition;
                endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                if (startPosition < endPosition) {
                    this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);
                } else {
                    this.showMessage('your File is uploaded successfully',true);
                    component.set("v.showLoadingSpinner", false);
                    component.set("v.FilesUploaded", '');
                    
                    
                    
                }
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
                this.showMessage("From server: " + response.getReturnValue(),false);
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    showMessage : function(message,isSuccess) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": isSuccess?"Success!":"Error!",
            "type":isSuccess?"success":"error",
            "message": message
        });
        toastEvent.fire();
    },    
    
    OnsubmittingPaymentloan:function(component, event, result)
    {
        var action=component.get("c.insertpaymentmode");
        action.setParams({
            "Paymentobj" : loan,
            "leadid":leadid
            
        });
        ////('kkkkkkkkkkkkkkkkkkkkk');
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            
            
        });
        $A.enqueueAction(action);
        
    },
    
    
    
    
    submitallproductrecords: function(component, event, helper) {
        // //('ooo');
        const self = this;
        // //('helooproduct');
        if (self.validateProductList(component, event)) 
        {
            Console.log('ok');
            
            // this is save fucntion to save multiple order line items at one time self.saveproductList(component, event);
        }
    },

    
    getleadfordetailpage : function(component, event, text1) {
        // //('lllllllllllllllllllllllllmmmmmmmmmmmmmm');
        ////(text1);
        window.diffrentidfordiffrentlead=text1.toString();
        
        var action = component.get("c.getLeadData"); 
        // method name i.e. getEntity should be same as defined in apex class
        // params name i.e. entityType should be same as defined in getEntity method
        action.setParams({
            "Leadid" : diffrentidfordiffrentlead
        });
        action.setCallback(this, function(a){
            var state = a.getState();
            ////(state);
            
            var q =a.getReturnValue();
            console.log('q---->'+q);
            
            component.set("v.LeadMap1", q);
            var q1=component.get("v.LeadMap1");
            
            window.differentAccountids=q1[0].accountids;
            ////(differentAccountids+'hellllllllllllllllloooooooooooooooooooooooiddddddddddddddd');
            component.set("v.Leadobject.FirstName" ,q1[0].FirstName);
            //student number  component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);
            // Parent Contact Number component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);
            // Address component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);
            component.set("v.Leadobject.LastName" ,q1[0].LastName);
            
            
            component.set("v.Leadobject.Email" ,q1[0].Email);
            component.set("v.Leadobject.Alternate_Email__c" ,q1[0].AlternateEmail);
            component.set("v.Leadobject.MobilePhone" ,q1[0].StuMobilePhone);
            component.set("v.Leadobject.School_Name__c" ,q1[0].Schoolname);
            //component.set("v.Leadobject.Medium__r.name" ,q1[0].Medium);
            component.set("v.Leadobject.Language__c" ,q1[0].Language);
            
            component.set("v.Leadobject.Country__c" ,q1[0].Country);
            
            
            component.set("v.Leadobject.Board__c" ,q1[0].Boardid);
            
            component.set("v.Leadobject.Classs__c" ,q1[0].StuClassid);
            
            component.set("v.Leadobject.Medium__c" ,q1[0].Mediumid);
            
            component.set("v.Leadobject.MobilePhone" ,q1[0].StuMobilePhone);
            
            component.set("v.Leadobject.Street__c" ,q1[0].Street);
            
            component.set("v.Leadobject.Zip_Postal_Code__c" ,q1[0].Pincode);
            
            component.set("v.Leadobject.City__c" ,q1[0].Cityid);
            
            component.set("v.Leadobject.States__c" ,q1[0].Stateid);
            component.set("v.siblingshow",false);
            component.set("v.detailspageforbasicsnaap",true);
            
            
            
            
        });
        $A.enqueueAction(action);
        
        
        
        
    },
    
    
    validateProductList: function(component, event) {
        //Validate all account records
        var isValid = true;
        var accountList = component.get("v.accountList");
        for (var i = 0; i < accountList.length; i++) {
            if (accountList[i].Class__c == '') {
                isValid = false;
                ////('productlist updated ' + (i + 1));
            }
        }
        return isValid;
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /* validateProductList: function(component, event) {
         //('helooproduct2');
        //Validate all product records
        var isValid = true;
        var productList = component.get("v.orderlineobject");
         console.log(productList);
         //(productList);
         var prosize=productList.length;
         //(prosize);
        for (var i = 0; i < productList.length; i++) {
            //('inside for loop');
            if (productList[i].Class__c == '' && productList[i].Board__c == '' && productList[i].Order__c == '' ) 
                
            {
                isValid = false;
                //('Required cannot be blank on row number ' + (i + 1));
            }
        }
         //(isValid);
        return isValid;
    },*/
    
    saveproductList: function(component, event, helper) {
        //Call Apex class and pass product list parameters
        var getdatais=component.get("v.accountList");
        
        
        
        var action = component.get("c.saveAccounts");
        action.setParams({
            "accList": component.get("v.accountList")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            ////(state);
            if (state === "SUCCESS") {
                component.set("v.accountList", []);
                //('orderline items records saved successfully');
            }
        }); 
        $A.enqueueAction(action);
    },
    
    
    
    
    /* saveproductList: function(component, event, helper) {
        //('helooproduct3');
        var data =component.get("v.orderlineobject");
        console.log(data+'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
        //Call Apex class and pass saveproductList parameters
        var action = component.get("c.saveproductList");
        action.setParams({
            "productList": data
        });
        action.setCallback(this, function(response) 
                           {
            var state = response.getState();
                               //(state);
            if (state === "SUCCESS") {
                component.set("v.orderlineobject", []);
                //('saveproductList records saved successfully');
            }
        }); 
        $A.enqueueAction(action);
    }, */
    
    
    
    
    
    getsiblingfordetailpage : function(component, event,text1) {
        ////('getsiblingfordetailpage');
        // //(text1);
        window.siblingid=text1.toString();
        // //(siblingid); 
        
        var action=component.get("c.gerSiblingwrapperData");
        action.setParams({
            "Siblingid" : siblingid 
        });
        
        action.setCallback(this, function(response){
            var state=response.getState();
            ////(state);
            if(state === "SUCCESS"){
                var q=response.getReturnValue();
                console.log(q);
                
                component.set("v.SiblingMap", q);
                var q1=component.get("v.SiblingMap");
                console.log(q1+'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');
                ////(q1);
                var firstandlastname =q1[0].Name.split(' ');
                // //(firstandlastname);
                
                var first=firstandlastname[0];
                // //(first);
                var last= firstandlastname[1];
                // //(last);
                //  //(q1[0].Mobile_Number);
                
                component.set("v.Leadobject.FirstName" ,first);
                
                component.set("v.Leadobject.LastName" ,last);
                
                window.Siblingaccountid=q1[0].Account;
                console.log()
                window.Siblingleadid=q1[0].Lead_Name
                window.parentyesorno=q1[0].parent_Yes_No;
                
                // component.set("v.Leadobject.Email" ,q1[0].Email_Id);
                component.set("v.Leadobject.Alternate_Email__c" ,q1[0].Alternate_Email_id);
                component.set("v.Leadobject.MobilePhone" ,q1[0].Mobile_Number);
                component.set("v.Leadobject.School_Name__c" ,q1[0].School_Name);
                component.set("v.Leadobject.Medium__c" ,q1[0].Medium);
                component.set("v.Leadobject.Language__c" ,q1[0].Language);
                component.set("v.Leadobject.Country__c" ,q1[0].Country);
                
                
                component.set("v.Leadobject.Board__c" ,'');
                
                component.set("v.Leadobject.Classs__c" ,'');
                
                component.set("v.Leadobject.Medium__c" ,'');
                
                
                component.set("v.Leadobject.Street__c" ,'');
                
                component.set("v.Leadobject.Zip_Postal_Code__c" ,'');
                
                component.set("v.Leadobject.City__c" ,'');
                
                component.set("v.Leadobject.States__c" ,'');
                
                component.set("v.siblingshow",false);
                component.set("v.detailspageforbasicsnaap",true);
                
                
            }
        });
        $A.enqueueAction(action);
        
    },
    
    
    
    ///listview showing
    getorderlistrecord : function(component, event) {
        // //("value...");
        var leadid=id1.toString();
        //        //(leadid); 
        
        var action=component.get("c.Orderlistview");
        action.setParams({
            "orderleadid" : leadid
        });
        action.setCallback(this, function(response){
            var state=response.getState();
            // //(state);
            if(state === "SUCCESS"){
                console.log('heloo');
                //var siblinglistdata1 = component.get("v.orderlistdata");
                var q=response.getReturnValue();
                
                console.log(JSON.stringify(q)+'jaihoooooooooooooooooooooooooooooooooooooooooooooooo');
                component.set("v.OrderlistviewWrapper",q); 
                
               
            }
        });
        $A.enqueueAction(action);
        
    },
    ///listview showing
    getsiblingrecord : function(component, event) {
        var leadid=id1.toString();
        
        var action=component.get("c.Siblingrecord");
        action.setParams({
            "Leadid" : leadid 
        });
        action.setCallback(this, function(response){
            var state=response.getState();
            if(state === "SUCCESS"){
                var q=response.getReturnValue();
                component.set("v.Siblingwrapperdata",q); 
                component.set("v.siblingshow",true);
                console.log("Sibling ----> " +JSON.stringify(q));
            }
        });
        $A.enqueueAction(action);
        
    },
    getClassPicklistValues : function(component,event,helper){
        var leadId  = id1.toString();
       //("STATE");
        var action=component.get("c.getClassValues");
        action.setParams({
            "lead_Id":leadId
        });
        //////('kk');
        action.setCallback(this, function(response) {
            var state = response.getState();
            //("STATE" +state);
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                //////(state);
                console.log(result)
                
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: result[key].Id, value:result[key].Name});
                    
                    ////////(result[key]);
                }
                //('flagMap'+flagMap);
                console.log("flagMap--------->asdas"+flagMap);
                component.set("v.flagMap", flagMap);
            }
        });
        $A.enqueueAction(action);  
    },
    
    
    ///listview showing
    getLeadrecord : function(component, event) {
        var leadid=id1.toString();
        // //(leadid); 
        component.set('v.Parentleaid',leadid);
        var action=component.get("c.Leadrecord");
        action.setParams({
            "Leadid" : leadid 
        });
        action.setCallback(this, function(response){
            var state=response.getState();
            if(state === "SUCCESS"){
                console.log('heloo');
                //  var siblinglistdata1 = component.get("v.leadlistdata");
                
                var q=response.getReturnValue();
                
                console.log(JSON.stringify(q)+'k');
                // var leadwrapper=component.get('v.Leadwrapperdata')
                //component.set("v.leadlistdata",q); 
                component.set("v.Leadwrapperdata",q); 
                
                
                //var siblinglistdata1 = component.get("v.leadlistdata");
                // console.log(siblinglistdata1);
                // var index=event.getSource().get('v.value');
                // console.log(index);
                
                
                /* var paymentwrapperdata =component.get('v.Callingpaymentmodeapi');
         var index=event.getSource().get('v.value');
         console.log(index);
         //console.log(paymentwrapperdata.payment[index]);
         leadlistdata.Leadid[index].expanded = !leadlistdata.payment[index].expanded;//True and false condition*/
                
                
                
                
                component.set("v.siblingshow",true);
            }
        });
        $A.enqueueAction(action);
        
    },
    getClasses: function(component, event) {
        // //('classes');
        var action = component.get("c.getClass");
        ////()
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result)
                // console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap", flagMap);
            }
        });
        $A.enqueueAction(action);
    }, 
    
    /* getClass1 : function(component, event) {
        var action = component.get("c.data");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if(result=='System.QueryException: List has no rows for assignment to SObject')
                {
                    //('noduplicate lead');
                    
                }
                else
                {
                    //('duplicate lead');
                }
                
                component.set("v.flagMap", flagMap);
            }
        });
        $A.enqueueAction(action);
    },*/
    getBoard: function(component, event) {
          
        var action = component.get("c.getBoard");
        action.setCallback(this, function(response) {
            var state = response.getState();
         
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap1", flagMap);
              
            }
        });
        $A.enqueueAction(action);
    },
    
    getMedium : function(component, event) {
        var action = component.get("c.getMedium");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap2", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    getCity : function(component, event) {
        var action = component.get("c.getCity");
        action.setParams({
            LeadId : component.get("v.oppRecordId") 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap3", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    getState: function(component, event) {
        var action = component.get("c.getState");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap4", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    getwardiq: function(component, event) {
        var action = component.get("c.getwardiq");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap5", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    getexp: function(component, event) {
        var action = component.get("c.getexp");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap6", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    getCurrentlygoingtoanytuition: function(component, event) {
        var action = component.get("c.getCurrentlygoingtoanytuition");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap7", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    LanguageKnown: function(component, event) {
        var action = component.get("c.LanguageKnown");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.LanguageKnown", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    
    
    School: function(component, event) {
        var action = component.get("c.School");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.schoolmap", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    getDidthestudenttaketuition: function(component, event) {
        var action = component.get("c.getDidthestudenttaketuition");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap8", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    Reasonsforlookingatalternateoptions: function(component, event) {
        var action = component.get("c.Reasonsforlookingatalternateoptions");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////(result[key]);
                }
                component.set("v.flagMap9", flagMap);
            }
        });
        $A.enqueueAction(action);
    },
    getAllreadyPaidAmount: function(component, event) {
        //alert('aaaa'+component.get("v.oppRecordId"));
        /* Abhilash*/
        var paidPayment = 0;
        var paidPreLoanPayment = 0;
        var totalEmiForEducationLoan = 0;
         var EDPayID = '';
        var Allpayments = [];
        var action = component.get("c.getAllreadyPaidAmount");
        action.setParams({
            LeadId : component.get("v.oppRecordId") 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('paidPayment=> '+JSON.stringify(result));
                for(var key in result){
                    result[key].Id;
                    if(result[key].Online_Mode__c == 'Extramarks Payment Link'){
                    	paidPayment = paidPayment+result[key].Amount_Received__c;    
                    }
                    if(result[key].Online_Mode__c == 'ED Pay'){
                    	paidPreLoanPayment = paidPreLoanPayment+result[key].Amount_Received__c; 
                        totalEmiForEducationLoan = result[key].No_of_EMI__c;
                        EDPayID = result[key].Id;
                    }
                   Allpayments.push({
                      Id: result[key].id,
                      Amount: result[key].Amount_Received__c,
                      Mode: result[key].Online_Mode__c,
                      Status: result[key].Payment_Status__c
                    });
                }
                component.set("v.paidPayment", paidPayment);
                component.set("v.paidPreLoanPayment", paidPreLoanPayment);
                component.set("v.allreadyPaid",true);
                component.set("v.allreadyPaidPayments",Allpayments);
                component.set("v.allreadyPaidPaymentList",result);
                component.set("v.totalEmiForEducationLoan",totalEmiForEducationLoan);
                component.set("v.EDPayID",EDPayID);
                
                component.set("v.allreadyPaidPaymentColumns", [
                    { label: "Payment Mode", fieldName: "Mode", type: "text" },
            
                    { label: "Amount", fieldName: "Amount", type: "text" },
                    { label: "Status", fieldName: "Status", type: "text" }
                  ]);
            }
        });
        $A.enqueueAction(action);
        
    },
    getMinimumPercantage: function(component, event) {
        /*Abhilash*/
        var action = component.get("c.getMinimumPercantage");
        action.setParams({
            LeadId : component.get("v.oppRecordId") 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                for(var key in result){
                    if(result[key].category__c == 'with emloan'){
                        component.set("v.minimumPercantageValueWithEmloan", result[key].value__c);
                        component.set("v.minimumPercantageTypeWithEmloan", result[key].type__c);
                    }else{
                        component.set("v.minimumPercantageValue", result[key].value__c);
                        component.set("v.minimumPercantageType", result[key].type__c);
                    }
               }
            }
        });
        $A.enqueueAction(action); 
        
    },
    
    
    savenonaccountinsibling: function(component, event, leadid)
    { ////('savenonaccountinsibling account');
        var leadid1=leadid.toString();
        ////(leadid1);
        
        var Any_Siblings__c= component.get("v.Leadobject.Any_Siblings__c");
        var Email= component.get("v.Leadobject.Email");
        var Alternate_Email__c= component.get("v.Leadobject.Alternate_Email__c");
        var School_Name__c= component.get("v.Leadobject.School_Name__c");
        
        var firstname= component.get("v.Leadobject.FirstName");
        ////(firstname+"firstname");
        var Lastname= component.get("v.Leadobject.LastName");
        //(Lastname+"lastname");
        var Board__c= component.get("v.Leadobject.Board__c");
        ////(Board__c +"Board__c");
        var Classs__c= component.get("v.Leadobject.Classs__c");
        ////(Classs__c+"Classs__c");
        var Medium__c= component.get("v.Leadobject.Medium__c");
        ////(Medium__c+"Medium__c");
        var MobilePhone= component.get("v.Leadobject.MobilePhone");
        ////(MobilePhone+"MobilePhone");
        var Sibling_Name__c= component.get("v.Leadobject.Sibling_Name__c");
        // //(Sibling_Name__c+"Sibling_Name__c");
        var Sibling_Classs__c= component.get("v.Leadobject.Sibling_Classs__c");
        ////(Sibling_Classs__c+"Sibling_Classs__c");
        //sibilng board missing
        var Country__c= component.get("v.Leadobject.Country__c");
        // //(Country__c+"Country__c");
        var Street__c= component.get("v.Leadobject.Street__c");
        // //(Street__c+"Street__c");
        var Zip_Postal_Code__c= component.get("v.Leadobject.Zip_Postal_Code__c");
        ////(Zip_Postal_Code__c+"Zip_Postal_Code__c");
        var City__c= component.get("v.Leadobject.City__c");
        ////(City__c+"City__c");
        var States__c= component.get("v.Leadobject.States__c");
        ////(States__c+"States__c");
        ///account fields
        var Father_Name__c= component.get("v.accountobject.Father_Name__c");
        // //(Father_Name__c+"Father_Name__c");
        var Father_s_Occupation__c= component.get("v.accountobject.Father_s_Occupation__c");
        // //(Father_s_Occupation__c+"Father_s_Occupation__c");
        var Father_s_Private_Business_Designation__c= component.get("v.accountobject.Father_s_Private_Business_Designation__c");
        ////(Father_s_Private_Business_Designation__c+"Father_s_Private_Business_Designation__c");
        var Father_s_Educational_Qualification__c= component.get("v.accountobject.Father_s_Educational_Qualification__c");
        ////(Father_s_Educational_Qualification__c+"Father_s_Educational_Qualification__c");
        var Any_Family_Member_in_Education_field__c= component.get("v.accountobject.Any_Family_Member_in_Education_field__c");
        ////( Any_Family_Member_in_Education_field__c+"Any_Family_Member_in_Education_field__c");
        var Word_IQ_Level__c= component.get("v.accountobject.Word_IQ_Level__c");
        ////(Word_IQ_Level__c+"Word_IQ_Level__c");
        var Expectation__c= component.get("v.accountobject.Expectation__c");
        // //( Expectation__c+" Expectation__c");
        var Previous_Class_Performance_Aggregate__c= component.get("v.accountobject.Previous_Class_Performance_Aggregate__c");
        // //(Previous_Class_Performance_Aggregate__c+"Previous_Class_Performance_Aggregate__c");
        var Olympiad_Participation__c=  component.get("v.testBoolean1");
        //(Olympiad_Participation__c+"Olympiad_Participation__c");
        var Did_the_student_take_tuition__c= component.get("v.accountobject.Did_the_student_take_tuition__c");
        // //(Did_the_student_take_tuition__c+"Did_the_student_take_tuition__c");
        var Currently_going_to_any_tuition__c= component.get("v.accountobject.Currently_going_to_any_tuition__c");
        ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        var Reasons_for_looking_at_alternate_options__c= component.get("v.accountobject.Reasons_for_looking_at_alternate_options__c");
        ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        
        //  var diffrentidfordiffrentlead1=differentAccountids.toString();                                     
        
        
        
        component.set('v.siblingobject.Alternate_Email_id__c',Alternate_Email__c);
        component.set('v.siblingobject.Any_Family_Member_in_Education_Field__c',Any_Family_Member_in_Education_field__c); 
        component.set('v.siblingobject.Board__c',Board__c); 
        component.set('v.siblingobject.City__c', City__c); 
        component.set('v.siblingobject.Class__c',Classs__c);
        component.set('v.siblingobject.Country__c',Country__c); 
        // component.set('v.siblingobject.Education_Qualification__c',Sibling_Name__c); 
        component.set('v.siblingobject.Email_Id__c',Email); 
        component.set('v.siblingobject.Father_Name__c',Father_Name__c);
        
        component.set('v.siblingobject.Lead_Name__c',leadid1); 
        
        
        
        component.set('v.siblingobject.Medium__c', Medium__c);
        component.set('v.siblingobject.Mobile_Number__c',MobilePhone); 
        component.set('v.siblingobject.Occupation__c',Father_s_Occupation__c); 
        // component.set('v.siblingobject.Parent_Guardian_s_Name__c', Classs__c); 
        component.set('v.siblingobject.Pin_code__c',Zip_Postal_Code__c.toString());
        component.set('v.siblingobject.Previous_Class_Performance_Aggregate_pe__c	',Previous_Class_Performance_Aggregate__c); 
        // component.set('v.siblingobject.Private_Business_Designation__c',Sibling_Name__c); 
        component.set('v.siblingobject.School_Code__c',Street__c); 
        component.set('v.siblingobject.School_Name__c', School_Name__c);
        
        component.set('v.siblingobject.Name',firstname+Lastname); 
        
        component.set('v.siblingobject.State__c',States__c);
        component.set('v.siblingobject.Street__c',Street__c); 
        component.set('v.siblingobject.Ward_IQ_Level__c', Word_IQ_Level__c); 
        
        
        
        
        var aja= component.get('v.siblingobject');
        var action = component.get("c.savenonaccountinsibling"); 
        
        action.setParams({
            "siblingobj" : aja 
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            //// //("nonaccount"+state);
            
            
        });
        $A.enqueueAction(action);
        
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Saveaccount: function(component, event, accountsides)
    { //('account'+accountsides);
     
     
     var Any_Siblings__c= component.get("v.Leadobject.Any_Siblings__c");
     var Email= component.get("v.Leadobject.Email");
     var Alternate_Email__c= component.get("v.Leadobject.Alternate_Email__c");
     var School_Name__c= component.get("v.Leadobject.School_Name__c");
     
     var firstname= component.get("v.Leadobject.FirstName");
     ////(firstname+"firstname");
     var Lastname= component.get("v.Leadobject.LastName");
     //(Lastname+"lastname");
     var Board__c= component.get("v.Leadobject.Board__c");
     ////(Board__c +"Board__c");
     var Classs__c= component.get("v.Leadobject.Classs__c");
     ////(Classs__c+"Classs__c");
     var Medium__c= component.get("v.Leadobject.Medium__c");
     ////(Medium__c+"Medium__c");
     var MobilePhone= component.get("v.Leadobject.MobilePhone");
     ////(MobilePhone+"MobilePhone");
     var Sibling_Name__c= component.get("v.Leadobject.Sibling_Name__c");
     // //(Sibling_Name__c+"Sibling_Name__c");
     var Sibling_Classs__c= component.get("v.Leadobject.Sibling_Classs__c");
     ////(Sibling_Classs__c+"Sibling_Classs__c");
     //sibilng board missing
     var Country__c= component.get("v.Leadobject.Country__c");
     // //(Country__c+"Country__c");
     var Street__c= component.get("v.Leadobject.Street__c");
     // //(Street__c+"Street__c");
     var Zip_Postal_Code__c= component.get("v.Leadobject.Zip_Postal_Code__c");
     ////(Zip_Postal_Code__c+"Zip_Postal_Code__c");
     var City__c= component.get("v.Leadobject.City__c");
     ////(City__c+"City__c");
     var States__c= component.get("v.Leadobject.States__c");
     ////(States__c+"States__c");
     ///account fields
     var Father_Name__c= component.get("v.accountobject.Father_Name__c");
     // //(Father_Name__c+"Father_Name__c");
     var Father_s_Occupation__c= component.get("v.accountobject.Father_s_Occupation__c");
     // //(Father_s_Occupation__c+"Father_s_Occupation__c");
     var Father_s_Private_Business_Designation__c= component.get("v.accountobject.Father_s_Private_Business_Designation__c");
     ////(Father_s_Private_Business_Designation__c+"Father_s_Private_Business_Designation__c");
     var Father_s_Educational_Qualification__c= component.get("v.accountobject.Father_s_Educational_Qualification__c");
     ////(Father_s_Educational_Qualification__c+"Father_s_Educational_Qualification__c");
     var Any_Family_Member_in_Education_field__c= component.get("v.accountobject.Any_Family_Member_in_Education_field__c");
     ////( Any_Family_Member_in_Education_field__c+"Any_Family_Member_in_Education_field__c");
     var Word_IQ_Level__c= component.get("v.accountobject.Word_IQ_Level__c");
     ////(Word_IQ_Level__c+"Word_IQ_Level__c");
     var Expectation__c= component.get("v.accountobject.Expectation__c");
     // //( Expectation__c+" Expectation__c");
     var Previous_Class_Performance_Aggregate__c= component.get("v.accountobject.Previous_Class_Performance_Aggregate__c");
     // //(Previous_Class_Performance_Aggregate__c+"Previous_Class_Performance_Aggregate__c");
     var Olympiad_Participation__c=  component.get("v.testBoolean1");
     //(Olympiad_Participation__c+"Olympiad_Participation__c");
     var Did_the_student_take_tuition__c= component.get("v.accountobject.Did_the_student_take_tuition__c");
     // //(Did_the_student_take_tuition__c+"Did_the_student_take_tuition__c");
     var Currently_going_to_any_tuition__c= component.get("v.accountobject.Currently_going_to_any_tuition__c");
     ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
     var Reasons_for_looking_at_alternate_options__c= component.get("v.accountobject.Reasons_for_looking_at_alternate_options__c");
     ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
     
     //  var diffrentidfordiffrentlead1=differentAccountids.toString();                                     
     
     
     var leadid=accountsides.toString();
     //(leadid);
     var action = component.get("c.accountRecord"); 
     action.setParams({
         "accountid":leadid,
         
         "Email" : Email, 
         "Alternate_Email": Alternate_Email__c,
         "Board":Board__c,
         "Classs": Classs__c,
         "Medium":Medium__c,
         "School_Name":School_Name__c,
         "Sibling_Name":Sibling_Name__c,
         "Sibling_Classs" :Sibling_Classs__c,
         "Country": Country__c,
         "Street":Street__c,
         "Zip_Postal_Code":Zip_Postal_Code__c.toString(),
         "City":City__c,
         "States":States__c,
         
         "Father_Name":Father_Name__c,
         "Father_s_Occupation" :Father_s_Occupation__c, 
         "Father_s_Private_Business_Designation": Father_s_Private_Business_Designation__c,
         "Father_s_Educational_Qualification":Father_s_Educational_Qualification__c,
         " Any_Family_Member_in_Education_field":  Any_Family_Member_in_Education_field__c,
         "Word_IQ_Level":Word_IQ_Level__c,
         " Expectation": Expectation__c,
         "Previous_Class_Performance_Aggregate":Previous_Class_Performance_Aggregate__c,
         "Olympiad_Participation" :Olympiad_Participation__c,
         "Did_the_student_take_tuition": Did_the_student_take_tuition__c,
         "Currently_going_to_any_tuition":Currently_going_to_any_tuition__c,
         "Reasons_for_looking_at_alternate_options":Reasons_for_looking_at_alternate_options__c,
         
         
         
     });
     action.setCallback(this, function(a){
         var state = a.getState(); // get the response state
         //("account"+state);
         
         
     });
     $A.enqueueAction(action);
     
    },
    OrderCreate1: function(component, event, leadid,accountsides) {
        
        if(accountsides!='null')
        {
            component.set('v.orderobject.AccountId',accountsides);
        }
        var Any_Siblings__c= component.get("v.Leadobject.Any_Siblings__c");
        var Email= component.get("v.Leadobject.Email");
        var Alternate_Email__c= component.get("v.Leadobject.Alternate_Email__c");
        var School_Name__c= component.get("v.Leadobject.School_Name__c");
        
        var firstname= component.get("v.Leadobject.FirstName");
        ////(firstname+"firstname");
        var Lastname= component.get("v.Leadobject.LastName");
        var Board__c= component.get("v.Leadobject.Board__c");
        ////(Board__c +"Board__c");
        var Classs__c= component.get("v.Leadobject.Classs__c");
        ////(Classs__c+"Classs__c");
        var Medium__c= component.get("v.Leadobject.Medium__c");
        ////(Medium__c+"Medium__c");
        var MobilePhone= component.get("v.Leadobject.MobilePhone");
        ////(MobilePhone+"MobilePhone");
        var Sibling_Name__c= component.get("v.Leadobject.Sibling_Name__c");
        // //(Sibling_Name__c+"Sibling_Name__c");
        var Sibling_Classs__c= component.get("v.Leadobject.Sibling_Classs__c");
        ////(Sibling_Classs__c+"Sibling_Classs__c");
        //sibilng board missing
        var Country__c= component.get("v.Leadobject.Country__c");
        // //(Country__c+"Country__c");
        var Street__c= component.get("v.Leadobject.Street__c");
        // //(Street__c+"Street__c");
        var Zip_Postal_Code__c= component.get("v.Leadobject.Zip_Postal_Code__c");
        ////(Zip_Postal_Code__c+"Zip_Postal_Code__c");
        var City__c= component.get("v.Leadobject.City__c");
        ////(City__c+"City__c");
        var States__c= component.get("v.Leadobject.States__c");
        ////(States__c+"States__c");
        ///account fields
        var Father_Name__c= component.get("v.accountobject.Father_Name__c");
        // //(Father_Name__c+"Father_Name__c");
        var Father_s_Occupation__c= component.get("v.accountobject.Father_s_Occupation__c");
        // //(Father_s_Occupation__c+"Father_s_Occupation__c");
        var Father_s_Private_Business_Designation__c= component.get("v.accountobject.Father_s_Private_Business_Designation__c");
        ////(Father_s_Private_Business_Designation__c+"Father_s_Private_Business_Designation__c");
        var Father_s_Educational_Qualification__c= component.get("v.accountobject.Father_s_Educational_Qualification__c");
        ////(Father_s_Educational_Qualification__c+"Father_s_Educational_Qualification__c");
        var Any_Family_Member_in_Education_field__c= component.get("v.accountobject.Any_Family_Member_in_Education_field__c");
        ////( Any_Family_Member_in_Education_field__c+"Any_Family_Member_in_Education_field__c");
        var Word_IQ_Level__c= component.get("v.accountobject.Word_IQ_Level__c");
        ////(Word_IQ_Level__c+"Word_IQ_Level__c");
        var Expectation__c= component.get("v.accountobject.Expectation__c");
        // //( Expectation__c+" Expectation__c");
        var Previous_Class_Performance_Aggregate__c= component.get("v.accountobject.Previous_Class_Performance_Aggregate__c");
        // //(Previous_Class_Performance_Aggregate__c+"Previous_Class_Performance_Aggregate__c");
        var Olympiad_Participation__c= component.get("v.testBoolean1");
        // //(Olympiad_Participation__c+"Olympiad_Participation__c");
        var Did_the_student_take_tuition__c= component.get("v.accountobject.Did_the_student_take_tuition__c");
        // //(Did_the_student_take_tuition__c+"Did_the_student_take_tuition__c");
        var Currently_going_to_any_tuition__c= component.get("v.accountobject.Currently_going_to_any_tuition__c");
        ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        var Reasons_for_looking_at_alternate_options__c= component.get("v.accountobject.Reasons_for_looking_at_alternate_options__c");
        ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        
        
        //('123');
        
        var leadid=leadid.toString();
        //(leadid); 
        
        component.set('v.orderobject.Parent_Order_Name__c',parentorderiscreated); 
        
        component.set('v.orderobject.Lead_ID__c',leadid); 
        component.set('v.orderobject.Board__c',Board__c); 
        component.set('v.orderobject.Class__c', Classs__c); 
        component.set('v.orderobject.Sibling_Class__c',Sibling_Classs__c);
        component.set('v.orderobject.Medium__c',Medium__c); 
        component.set('v.orderobject.Sibling_Name__c',Sibling_Name__c); 
        component.set('v.orderobject.Street__c',Street__c); 
        component.set('v.orderobject.Pin_Code__c',Zip_Postal_Code__c.toString());
        
        component.set('v.orderobject.States__c',States__c); 
        component.set('v.orderobject.City__c',City__c); 
        component.set('v.orderobject.EffectiveDate','01/06/2020'); 
        component.set('v.orderobject.Status','Drafted'); 
        
        
        var aja= component.get('v.orderobject');
        // //(aja);
        console.log(aja);
        var action = component.get("c.createorder"); 
        action.setParams({
            "orderobj" : aja 
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            //( state+'kya huammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
            if(state=='SUCCESS')
            { 
                // component.set("v.aftercreateofparentrecord",true); 
                var a= a.getReturnValue();
                //("order"+state);
            }
            
        });
        
        $A.enqueueAction(action);
        
    },  
    
    
    OrderCreate: function(component, event, leadid,accountsides) {
        //('heloooooooooooooooooooooooooooo');
        //(accountsides);
        if(accountsides!='null')
        {
            component.set('v.orderobject.AccountId',accountsides);
        }
        var Any_Siblings__c= component.get("v.Leadobject.Any_Siblings__c");
        var Email= component.get("v.Leadobject.Email");
        var Alternate_Email__c= component.get("v.Leadobject.Alternate_Email__c");
        var School_Name__c= component.get("v.Leadobject.School_Name__c");
        
        var firstname= component.get("v.Leadobject.FirstName");
        ////(firstname+"firstname");
        var Lastname= component.get("v.Leadobject.LastName");
        //(Lastname+"lastname");
        var Board__c= component.get("v.Leadobject.Board__c");
        ////(Board__c +"Board__c");
        var Classs__c= component.get("v.Leadobject.Classs__c");
        ////(Classs__c+"Classs__c");
        var Medium__c= component.get("v.Leadobject.Medium__c");
        ////(Medium__c+"Medium__c");
        var MobilePhone= component.get("v.Leadobject.MobilePhone");
        ////(MobilePhone+"MobilePhone");
        var Sibling_Name__c= component.get("v.Leadobject.Sibling_Name__c");
        // //(Sibling_Name__c+"Sibling_Name__c");
        var Sibling_Classs__c= component.get("v.Leadobject.Sibling_Classs__c");
        ////(Sibling_Classs__c+"Sibling_Classs__c");
        //sibilng board missing
        var Country__c= component.get("v.Leadobject.Country__c");
        // //(Country__c+"Country__c");
        var Street__c= component.get("v.Leadobject.Street__c");
        // //(Street__c+"Street__c");
        var Zip_Postal_Code__c= component.get("v.Leadobject.Zip_Postal_Code__c");
        ////(Zip_Postal_Code__c+"Zip_Postal_Code__c");
        var City__c= component.get("v.Leadobject.City__c");
        ////(City__c+"City__c");
        var States__c= component.get("v.Leadobject.States__c");
        ////(States__c+"States__c");
        ///account fields
        var Father_Name__c= component.get("v.accountobject.Father_Name__c");
        // //(Father_Name__c+"Father_Name__c");
        var Father_s_Occupation__c= component.get("v.accountobject.Father_s_Occupation__c");
        // //(Father_s_Occupation__c+"Father_s_Occupation__c");
        var Father_s_Private_Business_Designation__c= component.get("v.accountobject.Father_s_Private_Business_Designation__c");
        ////(Father_s_Private_Business_Designation__c+"Father_s_Private_Business_Designation__c");
        var Father_s_Educational_Qualification__c= component.get("v.accountobject.Father_s_Educational_Qualification__c");
        ////(Father_s_Educational_Qualification__c+"Father_s_Educational_Qualification__c");
        var Any_Family_Member_in_Education_field__c= component.get("v.accountobject.Any_Family_Member_in_Education_field__c");
        ////( Any_Family_Member_in_Education_field__c+"Any_Family_Member_in_Education_field__c");
        var Word_IQ_Level__c= component.get("v.accountobject.Word_IQ_Level__c");
        ////(Word_IQ_Level__c+"Word_IQ_Level__c");
        var Expectation__c= component.get("v.accountobject.Expectation__c");
        // //( Expectation__c+" Expectation__c");
        var Previous_Class_Performance_Aggregate__c= component.get("v.accountobject.Previous_Class_Performance_Aggregate__c");
        // //(Previous_Class_Performance_Aggregate__c+"Previous_Class_Performance_Aggregate__c");
        var Olympiad_Participation__c= component.get("v.testBoolean1");
        // //(Olympiad_Participation__c+"Olympiad_Participation__c");
        var Did_the_student_take_tuition__c= component.get("v.accountobject.Did_the_student_take_tuition__c");
        // //(Did_the_student_take_tuition__c+"Did_the_student_take_tuition__c");
        var Currently_going_to_any_tuition__c= component.get("v.accountobject.Currently_going_to_any_tuition__c");
        ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        var Reasons_for_looking_at_alternate_options__c= component.get("v.accountobject.Reasons_for_looking_at_alternate_options__c");
        ////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        
        
        
        
        var leadid=leadid.toString();
        //(leadid); 
        
        
        component.set('v.orderobject.Lead_ID__c',leadid); 
        component.set('v.orderobject.Board__c',Board__c); 
        component.set('v.orderobject.Class__c', Classs__c); 
        component.set('v.orderobject.Sibling_Class__c',Sibling_Classs__c);
        component.set('v.orderobject.Medium__c',Medium__c); 
        component.set('v.orderobject.Sibling_Name__c',Sibling_Name__c); 
        component.set('v.orderobject.Street__c',Street__c); 
        component.set('v.orderobject.Pin_Code__c',Zip_Postal_Code__c.toString());
        
        component.set('v.orderobject.States__c',States__c); 
        component.set('v.orderobject.City__c',City__c); 
        component.set('v.orderobject.EffectiveDate','01/06/2020'); 
        component.set('v.orderobject.Status','Drafted'); 
        
        
        var aja= component.get('v.orderobject');
        // //(aja);
        console.log(aja);
        var action = component.get("c.createorder"); 
        action.setParams({
            "orderobj" : aja 
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            //( state+'ordercreatedsuccessfully');
            if(state=='SUCCESS')
            { 
                component.set("v.aftercreateofparentrecord",true); 
                
                //("order"+state);
                Window.parentorderiscreated = a.getReturnValue();
            }
            
        });
        
        $A.enqueueAction(action);
        
    },  
    
    
    
    
  siblingCreate: function(component, event, helper) {
        const self = this;
        //('heloo sibling create');
        var leadid=id1.toString();
        //(leadid); 
         var alternateno = component.get("v.Leadobject.Secondary_Mobile_Number__c");  
        var firstname=  component.get("v.Leadobject.FirstName");
        
       // //(firstname);
        var lastname=component.get("v.Leadobject.LastName");
       // //(lastname);
        
        var email=  component.get("v.Leadobject.Email");
       // //(email);
        var alternateEmail=  component.get("v.Leadobject.Alternate_Email__c");
       // //(alternateEmail);
        var mobilenum= component.get("v.Leadobject.MobilePhone");
        ////(mobilenum);
        var schoolname=    component.get("v.Leadobject.School_Name__c");
       // //(schoolname);
        var medium=  component.get("v.Leadobject.Medium__c");
      //  //(medium);
        var lang= component.get("v.Leadobject.Language__c");
       // //(lang);
        var part=component.get("v.Leadobject.Parent_Name__c");
        
        var City= component.get("v.Leadobject.City__c");
        
        var Schoolcodes=component.find("city-records").get("v.selectedOption");
        var cityidis=component.find("city-record").get("v.selectedOption");
     // alert(cityidis)
        
      	var School_Code= component.get("v.Leadobject.School_Code__c");
        
        component.set('v.siblingobject.FirstName__c', firstname); 
        component.set('v.siblingobject.City__c', cityidis); 
        component.set('v.siblingobject.Secondary_Mobile_no__c', alternateno); 
        
        component.set('v.siblingobject.School_Code__c', Schoolcodes); 
       // //('schoolnamis'+schoolname);
        //  //('city is  '+city);
        
        component.set('v.siblingobject.Language__c', lang);
        component.set('v.siblingobject.Parent_Guardian_s_Name__c', part);
        
        component.set('v.siblingobject.LastName__c', lastname);
        component.set('v.siblingobject.Email_Id__c',email); 
        component.set('v.siblingobject.Alternate_Email_id__c',alternateEmail); 
        component.set('v.siblingobject.Mobile_Number__c',mobilenum); 
        component.set('v.siblingobject.School_Name__c',schoolname);
        component.set('v.siblingobject.Medium__c',medium); 
        component.set('v.siblingobject.parent_Yes_No__c','No');
        /*component.set('v.siblingobject.Sibling_Name__c',Sibling_Name__c); 
          component.set('v.siblingobject.Street__c',Street__c); 
           component.set('v.siblingobject.Pin_Code__c',Zip_Postal_Code__c);
  */
        
        // component.set('v.siblingobject.Account__c',accountid1); 
        component.set('v.siblingobject.Lead_Name__c', leadid);
        
        
        var aja= component.get('v.siblingobject');
        ////(aja);
        console.log(aja);
        var action = component.get("c.createSibling"); 
        action.setParams({
            "siblingobj" : aja,
            "ides" :leadid,
            "mobnum": mobilenum
        });
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            //("sibling"+state);
             component.set("v.toggleSpinner3",false);
            
            var result = a.getReturnValue();
            //(result);
            self.getLeadrecord(component, event);
            self.getsiblingrecord(component, event);
            
        });
        // window.location.reload();
        component.set("v.truthy5", true); 
        component.set("v.truthy1", true);
        component.set("v.siblingshow", true);
        component.set("v.truthy4", false);
        
        
        $A.enqueueAction(action);
        
    },  
    
    
    LeadCreate: function(component, event, helper) {
        const self = this;
       // //('heloo lead create');
        var leadid=id1.toString();
       // //(leadid); 
        ///var accountid1=accountid.toString();
      var countrycode=component.get('v.totallengthofphnnumber');
        //alert(countrycode+'testte')
        if(countrycode==9)
        {
         component.set("v.Leadobject.Country_Code__c",'+971');   
        }
        if(countrycode==10)
        {
         component.set("v.Leadobject.Country_Code__c",'+91');   
        }
        
        ////(accountid1);
       var alternateno = component.get("v.Leadobject.Secondary_Mobile_Number__c");  
        var firstname=  component.get("v.Leadobject.FirstName");
       // var City= component.get("v.Leadobject.City__c");
                                 
       // //(firstname);
        var lastname=component.get("v.Leadobject.LastName");
      //  //(lastname);
        var fullname = firstname.concat(lastname);
      //  //(fullname);
        var email=  component.get("v.Leadobject.Email");
       // //(email);
        var alternateEmail=  component.get("v.Leadobject.Alternate_Email__c");
       // //(alternateEmail);
        var mobilenum= component.get("v.Leadobject.MobilePhone");
      //  //(mobilenum);
        var schoolname=    component.get("v.Leadobject.School_Name__c");
      //  //(schoolname);
        var medium=  component.get("v.Leadobject.Medium__c");
      //  //(medium);
        var lang= component.get("v.Leadobject.Language__c");
     //   //(lang);
        
        var Parent_Name__c = component.get("v.Leadobject.Parent_Name__c");
        
           var Schoolcodes=component.find("city-records").get("v.selectedOption");
        var cityidis=component.find("city-record").get("v.selectedOption");
        component.set('v.Leadobject.Parent_Name__c ',Parent_Name__c );
        component.set('v.Leadobject.FirstName',firstname);
        component.set('v.Leadobject.LastName',lastname);
        
        component.set('v.Leadobject.Email',email); 
        component.set('v.Leadobject.Alternate_Email__c',alternateEmail); 
        component.set('v.Leadobject.MobilePhone',mobilenum); 
        component.set('v.Leadobject.School_Name__c',schoolname);
        component.set('v.Leadobject.Medium__c',medium); 
        component.set('v.Leadobject.School_Code__c',Schoolcodes);
        component.set('v.Leadobject.City__c',cityidis); 
         component.set('v.Leadobject.Secondary_Mobile_Number__c', alternateno);
        //component.set('v.Leadobject.LeadSource','Reference'); 
        //component.set('v.Leadobject.Sub_Source__c','Customer Reference'); 
        //component.set('v.Leadobject.Source_Product__c','OMS'); 
        //alert(accountid);
        // component.set('v.Leadobject.Customer_Reference_ID1__c',accountid); 
        		
        
      
        /*  component.set('v.siblingobject.Street__c',Street__c); 
           component.set('v.siblingobject.Pin_Code__c',Zip_Postal_Code__c);
  */
        
        //component.set('v.Leadobject.AccountName__c',accountid1); 
       
        component.set('v.Leadobject.Lead_by_Parent__c', leadid);
        component.set('v.Leadobject.Company', 'Student');
        
        var aja= component.get('v.Leadobject');
         //alert(JSON.stringify(aja));
        // //(aja);
        console.log(aja);
      //  //('aaaaaaaaaaaaajjaaaaaaaaaaa');
        var action = component.get("c.createLead"); 
        action.setParams({
            "Leadobj" : aja,
            "mobnum": mobilenum,
            "parentid":leadid
        });
        ////('kyahuaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            component.set("v.toggleSpinner3",false);
            self.getLeadrecord(component, event);
            self.getsiblingrecord(component, event);
            var result = a.getReturnValue();
            ////("New lead created"+state);
            
            
        });
        // window.location.reload();
        
        component.set("v.truthy5", true); 
        component.set("v.truthy1", true);
        component.set("v.siblingshow", true);
        component.set("v.truthy4", false);
        
        
        
        /*component.set('v.siblingobject.Sibling_Name__c',Sibling_Name__c); 
          component.set('v.siblingobject.Street__c',Street__c); 
           component.set('v.siblingobject.Pin_Code__c',Zip_Postal_Code__c);
  */
        
        //component.set('v.Leadobject.AccountName__c',accountid1); 
        // component.set('v.Leadobject.Lead_by_Parent__c', leadid);
        
        $A.enqueueAction(action);
        
    },    
    
    
    
    CreateOrderlineitem:function(component, event, helper){  
       // alert('kkkk');
        component.set("v.disableValidate",false);
      // var validate = false;
        ////(productselectedforpayment);
        // var  selectproducts=productselectedforpayment;
         
        var leadid=id1.toString();
        //alert('leadid'+leadid);
        ////(JSON.stringify(productselectedforpayment));
        var data=JSON.stringify(productselectedforpayment);
        var wrapperdata = component.get("v.wrapperdata");       
        console.log("productselectedforpayment----> "+data);
        console.log("wrapperdata----> "+JSON.stringify(wrapperdata));
        
        var action=component.get("c.createorderlineitem");
        action.setParams({
            'productdatatable' :productselectedforpayment,
            'wrapDataString':JSON.stringify(wrapperdata),
            'leadid':leadid
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state+'please select orderline  again');
            if(state=='SUCCESS')
            {
                //alert('kgr');
              window.validateorderidididdd=true;
              
               component.set("v.lineItemsCreated",true);
              component.set("v.toggleSpinner",false); 
                
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "error!",
                    "message": "please select orderline  again",
                    "type": "error"
                });
                toastEvent.fire();  
                 component.set("v.toggleSpinner",false);
            }
            
            //("response--->  "+response.getReturnValue());
            
            
           
        });
        $A.enqueueAction(action); 
      
    },    
      //Added By Amit
     checkLoanAmount : function(component, event, helper,PaymentMode){ 
        
         console.log("LOAN AMOUNT CHECK---> "+JSON.stringify(PaymentMode));
        //LOAN Popup
        var hasTakenLoan = component.get("v.hasTakenLoan");
        var loanAmountTotal = 0;
        var loanObjectForPopup = [];
        console.log("hasTakenLoan ---> "+hasTakenLoan); 
       // var PaymentMode = component.get("v.PaymentMode");
         
         if(hasTakenLoan){
             //Calling Apex Class to get the Payment Method for Downpayment
             for(var i in PaymentMode.loanPaymentsWrapper){
                 if(PaymentMode.loanPaymentsWrapper[i].isSelected == true){
                     loanAmountTotal += parseInt(PaymentMode.loanPaymentsWrapper[i].downPayment);
                     var loanObj = 'Down Payment for '+PaymentMode.loanPaymentsWrapper[i].name+' is '+parseInt(PaymentMode.loanPaymentsWrapper[i].downPayment);
                     loanObjectForPopup.push(loanObj);
                 }
             }
             if(parseInt(loanAmountTotal)==0){
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     message: 'Please Enter Loan Amount',
                     type: 'error',
                 });
                 toastEvent.fire();
                 return;
             }
             console.log("loanObjectForPopup---> "+loanObjectForPopup); 
            component.set("v.loanObjectForPopup",loanObjectForPopup);
            component.set("v.loanAmountTotal",loanAmountTotal);
             
            //new code - start
             var action3 = component.get("c.returndownPaymentWrapper"); 
             
             action3.setCallback(this, function(a){
                 var state = a.getState(); // get the response state
                 var result = a.getReturnValue();
                 console.log("downPaymentWrapper--> "+result);
                 component.set("v.downPaymentWrapper",result);
                 
                 //to remove uploaded files
                 var allFiles =component.get("v.anyFile");
                 var tempList = [];
                 console.log(allFiles.length);
                 for(var i in allFiles){
                     //console.log('###' + i);
                     if(allFiles[i].title.indexOf('Down') == -1){
                         console.log(i);
                         tempList.push(allFiles[i]);
                     }
                 }
                 console.log(allFiles.length);
                 component.set("v.anyFile",tempList)
                 component.set("v.LoanPaymentModal",true);
             });
             $A.enqueueAction(action3);           
             
            //new code - end
        }
         
         else{
            var downPaymentWrap = component.get("v.downPaymentWrapper");
             
             var paymentModeWrapper =  component.get("v.PaymentMode"); 
             /* ABhilash*/
             var amt= component.get('v.paidPayment');
             var totalamountpaidforadjust=parseInt(downPaymentWrap.Adjust.amount)+parseInt(paymentModeWrapper.Adjust.amount);
             if(parseInt(totalamountpaidforadjust) > parseInt(amt)){
                 helper.showToast(component, event, helper,'error','Adjustable amount cannot be greater than already paid amount');
                 return;
             }
             if(parseInt(totalamountpaidforadjust) < parseInt(amt)){
                 helper.showToast(component, event, helper,'error','Adjustable amount cannot be less than already paid amount');
                 return;
             } 
            helper.finalProceedPayment(component, event, helper);
        }  
    },
      pushOrder: function(component, event, helper) {
         console.log('testorder');
          //debugger;
          component.set("v.disableValidate",false);
          ////('hello');
       // //("inside order push");
        // var Leadwrapperdata =component.get('v.Leadwrapperdata');
        ////(productselectedforpayment);
        var couponobj=component.get("v.Applycoupon");
        var couponName =component.get("v.ordercoupon");
        var couponName=component.find("PicklistId").get("v.value");
        ////(couponName);
        //var siblingwrap =component.get("v.Siblingwrapperdata");
        var totalamountmrp=component.get("v.totalmrp")
        console.log(totalamountmrp);
          var GSTno=component.get("v.GSTno")
         // alert(GSTno);
          var PANno=component.get("v.PANno")
         // alert(PANno);
        var totalmop=component.get("v.totalmop");
        console.log(totalmop);
        var customersp=component.get("v.customerSP22");
          console.log(customersp);
          
          var couponwrap=[];
          window.discountidis=0;//discountid
          window.discountcode=0;//discountcode
          window.dis_value=0;//for flat we are sending this
          window.coupontype=0;
          window.couponname='';
           window.couponnamelable='';
         // console.log(JSON.stringify(couponobj.coupan));
          if(couponobj){
              for(var i=0;i<couponobj.coupan.length;i++){
                if(couponobj.coupan[i].name==couponName){
                    console.log('kkkk');
                    window.discountidis=couponobj.coupan[i].id;//discountid
                    window.couponname=couponobj.coupan[i].name;//discountid
                    window.couponnamelable=couponobj.coupan[i].coupan;
                    console.log(couponname);
                    console.log(discountidis+'1');
                    window.discountcode=couponobj.coupan[i].coupan;//discountcode
                    console.log(discountcode+'2');
                    window.dis_value=couponobj.coupan[i].dis_value;//for flat we are sending this
                    console.log(dis_value+'3');
                    window.coupontype=couponobj.coupan[i].type;
                    console.log(coupontype+'4333333333333333333333333333');                    
                }
            } 
        }
        console.log('1762');
        var finalamountforpercentage = 0;
        var leadid=id1.toString();
          //console.log('1765'+finaldiscount);
          if(component.get("v.couponSelected")){
            finalamountforpercentage=finaldiscount;
          }
        console.log('1767');
          var Minimum_Amount = component.get("v.Minimum_Amount");
        var action=component.get("c.callPushOrders");
        action.setParams({
            "leadId":leadid,
            "totalmrp":totalamountmrp,
            "totalmop":totalmop,
             "GSTno":GSTno,
               "PANno":PANno,
            "couponnamelab":couponnamelable,
            "customersp":customersp,
            "discountidis":discountidis,
            "discountcode":discountcode,
            "dis_value":dis_value,
            "coupontype":coupontype,
            "finalamountforpercentage":finalamountforpercentage,
             "couponname":couponname,
            "Minimum_Amount":Minimum_Amount
        });
        
        action.setCallback(this, function(response)
                           {                
                               var state = response.getState();
                               console.log(state+'pushorder1');
                            //   alert(state);
                               if(state=='SUCCESS'){
                                   component.set('v.afterorderisplaced',true);
                                   helper.orderintegartionapi(component, event, helper);
                                   var result = response.getReturnValue();
                                   component.set("v.disableValidate",false);
                                   let toastEvent = $A.get('e.force:showToast');
                                   toastEvent.setParams({
                                       "type" : "success",
                                       "message" : "Order Pushed Successfully"
                                   });
                                   toastEvent.fire();
                                   component.set("v.toggleSpinner", false);
                                   
                                   //refresh Component
                         /*         setTimeout(function(){
                                       var leadId = id1.toString();
                                       //Redirect CODE
                                       var evt = $A.get("e.force:navigateToComponent");
                                       evt.setParams({
                                           componentDef:"c:OrderSummary",
                                           componentAttributes:{
                                               oppRecordId:leadId,
                                               orderId : component.get("v.orderId")
                                           }
                                       }); 
                                       evt.fire();     
                                      
                                   }, 500); 
                      */           
                           
                         /*
                      var urlEvent = $A.get("e.force:navigateToURL");
                      urlEvent.setParams({
                     "url": 'https://extramarks--extramarks.lightning.force.com/lightning/o/Order/list?filterName=00B2x0000065NvhEAE '
                      });
                      urlEvent.fire(); */
                                   
                                   var urlEvent = $A.get("e.force:navigateToURL");
                                   urlEvent.setParams({
                                       "url": '/lightning/o/Order/list?filterName=00B2x0000065NvhEAE'
                                   });
                                   urlEvent.fire();

                                   
                                   
                                   
                               }else{
                                    component.set('v.afterorderisplaced',false);
                                   component.set("v.disableValidate",true);
                                   let toastEvent = $A.get('e.force:showToast');
                                   toastEvent.setParams({
                                       "type" : "error",
                                       "message" : "Error in pushing Order"
                                   });
                                   toastEvent.fire();
                               }
                           });
        $A.enqueueAction(action);
    }, 
      finalProceedPayment : function(component, event, helper)
    { 
        
       
        try{
            
            var daa=component.set('v.whatsapp', true);
             var downPaymentWrap = component.get("v.downPaymentWrapper");
            let sellingprice = component.get("v.sellingprice");
            console.log('sellingprice  : '+sellingprice);
               var paymentModeWrapper =  component.get("v.PaymentMode");
                var customerSP = component.get("v.customerSP22");  
            var wrapperdata = component.get("v.wrapperdata"); 
           // alert(component.get('v.whatsapp'));
            var confirmation=component.get('v.afterconfirmwhatsapp');
           // alert(confirmation);
           if(confirmation==true)
            {
                component.set('v.whatsapp', false);
            component.set("v.disableValidate",false);
            //component.set("v.truthy3",false);
            component.set("v.LoanPaymentModal",false);
           // var downPaymentWrap = component.get("v.downPaymentWrapper");
            component.set('v.Loan.Payment_Mode__c','Loan');
            let loanDetails =  component.get("v.Loan");
            console.log('loanDetails  : '+JSON.stringify( loanDetails));
            
           // let sellingprice = component.get("v.sellingprice");
            console.log('sellingprice  : '+sellingprice);
            
            let  schemeDetails = component.get("v.selectschm");
            console.log('schemeDetails  : '+JSON.stringify(schemeDetails));
            
            let onlineDebitCreditAmountDirectValue =  component.get("v.onlineDebitCreditAmount");
            console.log('onlineDebitCreditAmountDirectValue   : '+onlineDebitCreditAmountDirectValue);
            
            let leadId = component.get("v.recordId");
            var leadid= id1.toString();
           // var paymentModeWrapper =  component.get("v.PaymentMode");
            var fList = JSON.stringify(component.get("v.anyFile"));
          //  var customerSP = component.get("v.customerSP22");  
            
            console.log('leadid  : '+leadid);
            console.log(' fList  : '+fList);
            console.log(' paymentModeWrapper  : '+paymentModeWrapper);
            console.log(' customerSellingPrice  : '+customerSP);
            console.log(' downPaymentWrapper  : '+JSON.stringify(downPaymentWrap));
            component.set("v.toggleSpinner", true);
            
            var leadid=id1.toString();
        //alert('leadid Ankit'+leadid);
        ////(JSON.stringify(productselectedforpayment));
        var data=JSON.stringify(productselectedforpayment);
       // var wrapperdata = component.get("v.wrapperdata");       
        console.log("productselectedforpayment----> "+data);
        console.log("wrapperdata----> "+JSON.stringify(wrapperdata));
        
         
               var action=component.get("c.createorderlineitem");
             action.setParams({
            'productdatatable' :productselectedforpayment,
            'wrapDataString':JSON.stringify(wrapperdata),
            'leadid':leadid
        });
        action.setCallback(this, function(response) { 
             var state = response.getState();
            var responseValueorderli = response.getReturnValue();
            //alert(responseValueorderli);
              if(responseValueorderli=='Order Line Items Created Successfully')
               {    
            var uaepay=component.get('v.Uaepayment')
            var action=component.get("c.insertpaymentmode1");
            action.setParams({
                "leadid":leadid,
                "paymentModeWrapper":paymentModeWrapper,
                "customerSellingPrice":customerSP,
                "downPaymentWrapper" :downPaymentWrap
               
            });
                 //  alert(uaepay+'ughiuhgu')
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state == 'SUCCESS'){            
                    let responseValue = response.getReturnValue();
                    console.log('responseValue : '+responseValue);
                    /*component.set("v.loadPaymentId",responseValue);
                    //component.set('v.Proceed',false);
                    let toastEvent = $A.get('e.force:showToast');
                    toastEvent.setParams({
                        "type" : "success",
                        "message" : "Payment Made Successfully"
                    });
                    
                    toastEvent.fire();
                    */
                    
                    this.pushFilerecords(component, event, helper,responseValue,true,0);
                    
                }
                else if( state == 'ERROR'){
                    component.set('v.afterconfirmwhatsapp',false);
                    
                    //code for delete duplicate orderliṇes
                    //alert(leadid+'leadid');
                    var action8 = component.get("c.deleteorderlineitem"); 
                    action8.setParams({
                        'deleteleadid' :leadid
                    });
                    action8.setCallback(this, function(a){
                        var state = a.getState(); // get the response state
                        //alert(state);
                        var result = a.getReturnValue();
                    });
                    $A.enqueueAction(action8);
    				  component.set("v.disableValidate",true);
                    let errors = response.getError();
                    console.log('errors  : '+JSON.stringify(errors));
                    let toastEvent = $A.get('e.force:showToast');
                    toastEvent.setParams({
                        "type" : "error",
                        "message" : "Please Enter Unique Reference Id for Each Payment"
                    });
                    toastEvent.fire();
                    component.set("v.toggleSpinner", false);
                }
                
            });
            $A.enqueueAction(action);
            
            
            component.set('v.Loan.Payment_Mode__c','Online Payment');
            component.set('v.Loan.Total_Amount__c',onlineDebitCreditAmountDirectValue);
            let onlinePaymentDeatils = component.get("v.Loan");
            console.log('onlinePaymentDeatils   : '+JSON.stringify(onlinePaymentDeatils));
                  
                  
                  
                  
                  
              }
           else
            {
                component.set("v.disableValidate",true);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "error!",
                    "message": "please select orderline  again",
                    "type": "error"
                });
                toastEvent.fire();  
                 component.set("v.toggleSpinner",false);
            }
            
            
            
            
		 
        }); 
        $A.enqueueAction(action); 
         
        } 
        }
        
        catch(err){
            console.log("Final Error---> "+err);
        }
    },
       pushFilerecords : function(component, event, helper, paymentRecordMap,recursionFlag,index){
        debugger;
        //alert('File start');
        if(recursionFlag == true){
            //var fList = JSON.stringify(component.get("v.anyFile"));
            var fList = component.get("v.anyFile");
            var singleFile1 = JSON.stringify(fList[index]);
            //alert('File start size' +fList.length);
            if(fList.length > 0){
                try{
                    var action=component.get("c.insertpaymentmode2");
                    action.setParams({
                        singleFile: singleFile1,
                        paymentObjectsMap: paymentRecordMap
                    });
                    action.setCallback(this, function(response){
                        var state = response.getState();
                        //alert(state + 'file upload result');
                        if(state == 'SUCCESS'){            
                            index++;
                            //alert(index+'File start size' +fList.length);
                            debugger;
                            if(index < fList.length){
                                this.pushFilerecords(component, event, helper,paymentRecordMap,true,index);
                                
                            }else{
                                let toastEvent = $A.get('e.force:showToast');
                                toastEvent.setParams({
                                    "type" : "success",
                                    "message" : "Payment Made Successfully"
                                });
                                toastEvent.fire();
                                helper.pushOrder(component, event, helper);
                                component.set("v.disableValidate",false);
                                
                            }
                        }
                      else if( state == 'ERROR'){
                        //code for delete duplicate orderliṇes
                          var leadid=id1.toString();
                          
                          var action8 = component.get("c.deleteorderlineitem"); 
                          action8.setParams({
                              'deleteleadid':leadid
                          });
                          action8.setCallback(this, function(a){
                              var state = a.getState(); // get the response state
                              var result = a.getReturnValue();
                          });
                          $A.enqueueAction(action8);
                   component.set("v.disableValidate",true);
                    let errors = response.getError();
                    console.log('errors  : '+JSON.stringify(errors));
                    let toastEvent = $A.get('e.force:showToast');
                    toastEvent.setParams({
                        "type" : "error",
                        "message" : "'Please Enter Unique Reference Id for Each Payment'"
                    });
                    toastEvent.fire();
                    component.set("v.toggleSpinner", false);
                }
				
                    });
                    
                    $A.enqueueAction(action);
                }catch(e){
                    //alert(e);
                    }
            }else{
                let toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({
                    "type" : "success",
                    "message" : "Payment Made Successfully"
                });
                toastEvent.fire();
                helper.pushOrder(component, event, helper);
                component.set("v.disableValidate",false);
                component.set("v.toggleSpinner", false);
            }
        }
    },
    validateFormInputs : function(component, event, helper) {
        var isFormValid = true;
        var requiredFormInputs = ['leadFirstName', 'leadLastName', 'leadEmail', 'leadSchoolName', 'leadMedium', 'leadLanguages', 'leadCity'];
        for(var fieldIndex in requiredFormInputs) {
            var inputCmp = component.find(requiredFormInputs[fieldIndex]);
            console.log(inputCmp.get("v.value") + ": " + (inputCmp.get("v.value") === ""));
            if(inputCmp.get("v.value") == null || inputCmp.get("v.value") === "") {
                isFormValid = false;
                try{
                    inputCmp.set("v.errors", [{message:"Complete this field."}]);
                } catch(e){}
            }
        }
        
        return isFormValid;
    },
    
    validateBasicSnapFormInputs : function(component, event, helper) {
        var isFormValid = true;
        var requiredFormInputs = ['leadFirstName', 'leadLastName', 'leadEmail', 'leadSchoolName', 'leadMedium', 'leadLanguages', 'leadCity'];
        for(var fieldIndex in requiredFormInputs) {
            var inputCmp = component.find(requiredFormInputs[fieldIndex]);
            console.log(inputCmp.get("v.value") + ": " + (inputCmp.get("v.value") === ""));
            if(inputCmp.get("v.value") == null || inputCmp.get("v.value") === "") {
                isFormValid = false;
                try{
                    inputCmp.set("v.errors", [{message:"Complete this field."}]);
                } catch(e){}
            }
        }
        
        return isFormValid;
    },
    showToast : function(component, event, helper,type,message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": type,
            "message": message
        });
        toastEvent.fire();
    },
    handleError : function( component,event, helper, auraId, errorMessage){
        component.find(auraId).setCustomValidity(errorMessage);
        component.find(auraId).reportValidity();
    },
    validateInput : function( component,event, helper){
      //(":: validateInput :: ");
    
      var leadFirstName = component.find("leadFirstName").get("v.value");
      //(":: leadFirstName :: "+leadFirstName);
      var leadLastName = component.find("leadLastName").get("v.value");
      console.log(":: leadLastName :: "+leadLastName);
      
     var leadMobileName = component.find("leadMobileName").get("v.value");
       
        console.log(mobileNumberSet+'mobileNumberSetmobileNumberSet');
        set1.add(leadMobileName);
         
        var Schoolcode=component.find("city-record").get("v.selectedOption");
      //var leadMedium = component.find("leadMedium").get("v.value");
     // var leadCity = component.find("leadCity").get("v.value");
  
      var leadSchoolName = component.find("leadSchoolName").get("v.value");
      var alteremail=component.find("leadAltEmail").get("v.value");
        var validate = true;
        //alert('dan'+Schoolcode+'test')
      if(Schoolcode!= "" && Schoolcode!= undefined)
      {
          //alert('befote')
        /* if(!mobileNumberSet.includes(leadMobileName))
        {
            //alert('contain');
        mobileNumberSet.push(leadMobileName);
        }
        else
        {
            validate = false;
          this.displayErr(component, event,helper, "Please Enter new Number.");
        } */ 
      }
        
        
        
        
        
      
      if(leadFirstName.trim() == "" || leadFirstName.trim() == null){
          validate = false;
          //("showing err...");
          var msg = "Enter First Name";
          this.displayErr(component, event,helper, "Enter First Name");
      }
        else if(leadLastName.trim() == "" || leadLastName.trim() == null){
          validate = false;
          this.displayErr(component, event,helper, "Enter Last Name");
          
          
      }
        
        /*
       else if(leadMobileName.trim()==testmobile  ){
            if(Schoolcode!= "" || Schoolcode != undefined)
            {
              validate = false;
          this.displayErr(component, event,helper, "Please Enter new  Number.");  
            }
          
          
          
      }*/
        //end by gopal 
        
        
        
        
         else if(Schoolcode== "" || Schoolcode == undefined){
          validate = false;
          this.displayErr(component, event,helper, "Enter the city");
          
          
      }
            else if(leadMobileName.trim() == "" || leadMobileName.trim() == null){
          validate = false;
          this.displayErr(component, event, "Enter Email Name");
      }else if(leadSchoolName.trim() == "" || leadSchoolName.trim() == null){
          validate = false;
          this.displayErr(component, event, helper, "Enter enter school name");
      }
          
 else if(alteremail.trim()!= '' && alteremail.trim()!= null){
            var regExpEmailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
            if(!alteremail.match(regExpEmailformat)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Please Enter a Valid Email Address',
                    type: 'error',
                });
                toastEvent.fire();
                return;
            }
        }
          
          
     
      return validate;
  },
  displayErr : function( component,event, helper, msg){
      var toastEvent = $A.get("e.force:showToast");
      toastEvent.setParams({
          title : 'Error Message',
          message: msg,
          duration:' 5000',
          key: 'info_alt',
          type: 'error',
          mode: 'pester'
      });
      toastEvent.fire();
  },
      displayErr1 : function( component,event, msg){
         // alert(msg);
      var toastEvent = $A.get("e.force:showToast");
      toastEvent.setParams({
          title : 'Error Message',
          message: msg,
          duration:' 5000',
          key: 'info_alt',
          type: 'error',
          mode: 'pester'
      });
      toastEvent.fire();
  },
  displaySuccess : function( component,event, helper, msg){
      var toastEvent = $A.get("e.force:showToast");
      toastEvent.setParams({
          title : 'Success Message',
          message: msg,
          duration:' 5000',
          key: 'info_alt',
          type: 'success',
          mode: 'pester'
      });
      toastEvent.fire();
  },
     checkSiblingOrder:function(component, event, helper){   
      ////(":: checkSiblingOrder :: ");
      // var  selectproducts=productselectedforpayment;
      var siblingwrapperdata=component.get('v.Siblingwrapperdata');
      ////(JSON.stringify(siblingwrapperdata));
      
      var action=component.get("c.checkOrderOnSibling");
      action.setParams({
          'listSibling' :siblingwrapperdata
      });
      
      action.setCallback(this, function(response) {
          var state = response.getState();
          
          //(state); 
          var validateOrder = response.getReturnValue();
          ////(":: validateOrder :: ");
          if(validateOrder == "Order created"){
              
              component.set("v.ORDERLISTVIEW",true);
              component.set("v.truthy1",false);
              var leadid=id1.toString();
              var wrapperdata=component.get('v.wrapperdata');
              console.log('wrapperdatawrapperdatawrapperdata'+wrapperdata);
              
              var action=component.get("c.getClassforproductpage");
              action.setParams({
                  "orderleadid":leadid
              });
              
              action.setCallback(this, function(response) {
                  var state = response.getState();
                  if (state === "SUCCESS") {
                      var q=response.getReturnValue();
                      //(q);
                      console.log(q+'kkkkkkklklklllllllllllllllllllllllmmmmmmmmmmm');
                      console.log(JSON.stringify(q));
                      component.set("v.wrapperdata",q);                
                  }
              });
              $A.enqueueAction(action);
              // component.set("v.ORDERLISTVIEW",false);
              component.set("v.truthy",true);
              
          }else{
              var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                  title : 'Error Message',
                  message: 'Please save sibling records to continue.',
                  duration:' 5000',
                  key: 'info_alt',
                  type: 'error',
                  mode: 'pester'
              });
              toastEvent.fire();
          }
          
      });
      $A.enqueueAction(action);
  }, 
    showSpinner : function(component,event,helper){
      // display spinner when aura:waiting (server waiting)
        component.set("v.toggleSpinner", true);  
      },
    hideSpinner : function(component,event,helper){
   // hide when aura:downwaiting
        component.set("v.toggleSpinner", false);
        
    },
    
    multipicklist: function(component, event, helper) {
        var action = component.get("c.getPiklistValues");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var result = response.getReturnValue();
                var plValues = [];
                for (var i = 0; i < result.length; i++) {
                    plValues.push({
                        label: result[i],
                        value: result[i]
                    });
                }
                component.set("v.GenreList", plValues);
            }
        });
        $A.enqueueAction(action);
    },
    getAssignedValue : function(component, event, helper){ 
    	const cmps = component.find("amountAuraId");
        var x = 0;
        debugger;
        if (cmps){ 
            if ($A.util.isArray(cmps)) {
                debugger;
                cmps.forEach(cmp => {
                   console.log(cmp.get('v.value'));
                    if(isNaN(cmp.get('v.value')) == false){
                    	x = x + parseFloat(cmp.get('v.value'));
                	}
                })
                } else {
                    if(isNaN(cmps.get('v.value')) == false){
                       console.log(cmps);
                        x = x + parseFloat(cmps.get('v.value'));
                    }
                }
		}
		debugger;
		return x;
    },
                    calculateBalancePaymentMode: function(component, event, helper){ 
                        setTimeout(function(){
                            debugger;
                         // calculate total amount start
                            var sp= component.get("v.customerSP22");
                            var customerSP = component.get("v.customerSP225");
                            var amountdeduct = helper.getAssignedValue(component, event, helper);
                            
                            //Loan amount check
                            var PaymentMode = component.get("v.PaymentMode");
            				console.log("PaymentMode--> "+ JSON.stringify(PaymentMode));
                            for(var i in PaymentMode.loanPaymentsWrapper){
                                if(PaymentMode.loanPaymentsWrapper[i].isSelected==true){
                                    amountdeduct+=parseInt(PaymentMode.loanPaymentsWrapper[i].amount); 
                                }
                            }
                            var finlamt = sp-amountdeduct;
                            console.log('cfinlamt'+finlamt);
                            if(isNaN(finlamt))
                                component.set("v.customerSP225",sp);
                            else
                                component.set("v.customerSP225",finlamt);
                            
                            // calculate total amount end
                        },300);
                    }
})