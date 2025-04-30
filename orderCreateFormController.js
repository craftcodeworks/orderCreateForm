({ 
      
      
    SiblingOption1 : function(component, event, helper) {
     var result2='False';
       var result='True';
       var SiblingLeadId= component.get('v.SiblingLeadId' );
        var OpenLeadaid;
             component.set('v.option1',result);
         component.set('v.AddSib',result2);
        
        var tes= component.find("harjeet").get("v.value");
          component.set('v.AccId',tes); 
    //     alert('Acc Id '+ component.get('v.AccId' ));
    
        var AccId= component.get("v.AccId");
      helper.AccList1(component, event, helper,AccId);
    },  
    
    ChooseSibling : function(component, event, helper) {
 var AddSibling= event.getParam("value");
     
    //  alert('Id '+ component.get("v.id1"));
    //  alert(id1.toString());
 
		if(AddSibling =='ExistingSiblings')
        {   var result='True';
     
          component.set('v.IsExisting',result); 
        helper.AccList(component, event, helper);
        }
        if(AddSibling=='NewSiblingSamePhone')
        {
                var result2='False';
            var result='True';
          
             component.set("v.IsSamePhone",result);
          component.set('v.IsExisting',false); 
                    }
          if(AddSibling=='NewSiblingDifferentPhone')
        {
            
            var result='True';
             component.set("v.IsDifferentPhone",result);
                          var result2='False';
                         component.set('v.IsExisting',false); 
            component.set('v.IsSamePhone',false); 
          //   alert('IsDifferentPhone '+ component.get('v.IsDifferentPhone' ));
        }
	},
    
    
    AddSiblingOption :function(component, event, helper) { 
    
      
     
       
          var LeadId= id1.toString();
         var  TotalSib;
        var action=component.get('c.SiblingCount');
                   action.setParams({
                 
                
                       "LeadId": LeadId
              });

        action.setCallback(this,function(response){
        var responseValue=response.getReturnValue();
            var state = response.getState();
            
              if(state=='SUCCESS'){  
       TotalSib=responseValue;
                // alert(TotalSib+ ' total no of siblings');
                    component.set("v.SiblingKey",TotalSib);
                //  alert( component.get("v.SiblingKey")+' SiblingKey');
                          if(TotalSib>=5){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Cant add more than 5 siblings"
                });
                toastEvent.fire();
                  component.set("v.AddSib",false);
            }
              else
              {
                    component.set("v.AddSib",true);
                    component.set("v.onlyfirst",false);
              }
                  
              }
        });

        $A.enqueueAction(action);
         
      helper.updatelead(component,event,helper);

       
    }, 
    
    
     // for 1 condition 
    addsibling2 :function(component, event, helper) {
           
        
    
      
        
        var Country =  component.get("v.acc.Country__c");
        var SchoolName =  component.get("v.acc.School_Name__c");
       var secondaryno=  component.get("v.acc.Secondary_Mobile_Number__c");                   
       var mobilenum= component.get("v.acc.Phone");
        var countrycode= component.get("v.acc.countrycode__c");
        var emailacc = component.get("v.acc.Alternate_Email__c");
        var email = component.get("v.acc.Email__c");
         var Firstname = component.get("v.acc.Name");
        var Lastname = component.get("v.acc.Name");
    var ParentName = component.get("v.acc.Guardian_Name__c");
       
       
            if(countrycode=='+91'){
            
          if(secondaryno.length!=10  ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter a valid alternate no according to country code"
                });
                toastEvent.fire();
           }       
        }
          
         if (ParentName == '' || ParentName == undefined) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter Parent Name"
                });
                 toastEvent.fire();
               
            }
         if (email == '' || email == undefined || email == ' ') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter Email"
                });
                 toastEvent.fire();
               
            }
        
   


 if(SchoolName!= undefined && SchoolName != ''&& ParentName!= undefined && ParentName != '' && email != '' && email != undefined && email != ' ')
          
 {
    
       
            var AccId= component.find("harjeet").get("v.value");
               var SiblingLeadId  = id1.toString();
           
           var OpenLeadid;
           
         var action2=component.get('c.getLeadStatus');
   //  alert(AccId + ' AccId');
     // alert(SiblingLeadId +' SiblingLeadId');
     
        action2.setParams({
            "AccId": AccId,
            "SiblingLeadId": SiblingLeadId
        });
         
        action2.setCallback(this,function(response){
        var responseValue=response.getReturnValue();
            var state = response.getState();
          //  alert(response+'response');
             //  alert(state+'state');
              if(state=='SUCCESS'){  
                 // alert(responseValue);
                 OpenLeadid= responseValue;
                 // alert(OpenLeadid +'  OpenLeadid');
                  
     
      
      if( OpenLeadid != null )
       {  
           
                //  alert('3');
           
               var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "success",
                    "message":'Open Lead already exist '
                });
                toastEvent.fire();
           
           
            helper.getClassPicklistValues(component,event,helper);
            helper.getsiblingrecord(component,event,helper);
            helper.getLeadrecord(component,event,helper); 
         
     component.set("v.truthy5", true); 
         //  alert(component.get("v.truthy5")+ ' truthy5');
            component.set("v.truthy1", true); 
                     // alert(component.get("v.truthy1")+ ' truthy1');
          component.set("v.truthy4", false);
                     // alert(component.get("v.truthy4") +' truthy4');
            component.set("v.siblingshow", false); 
                     // alert(component.get("v.siblingshow")+' siblingshow');
                 component.set("v.option1", false); 
                       
           
           
        } 
     
    if(OpenLeadid == null)
     {
        // alert('2');
       var action=component.get('c.SiblingLead');
                   action.setParams({
                  "AccId":AccId,
                  "SiblingLeadId": SiblingLeadId
              });

        action.setCallback(this,function(response){
        var responseValue=response.getReturnValue();
            var state = response.getState();
            // alert(responseValue +' response');
              if(state=='SUCCESS'){  
        console.log('responseValue ',responseValue);
                            
                   {
                      
                       
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "success",
                    "message":'Lead Created sucessfull '
                });
                toastEvent.fire();
                       
                       
                    helper.getClassPicklistValues(component,event,helper);
            helper.getsiblingrecord(component,event,helper);
            helper.getLeadrecord(component,event,helper); 
         
        component.set("v.truthy5", true); 
          // alert(component.get("v.truthy5")+' truthy5');
            component.set("v.truthy1", true); 
                     // alert(component.get("v.truthy1")+' truthy1');
          component.set("v.truthy4", false);
                     // alert(component.get("v.truthy4")+' truthy4');
            component.set("v.siblingshow", false); 
                     // alert(component.get("v.siblingshow")+' siblingshow');
             component.set("v.option1", false); 
                       
                       
                 }
              component.set("v.SiblingLeadId",responseValue);
                            var result=true;
                 component.set("v.truthy1",result);                 
            }
        });

        $A.enqueueAction(action);
    }         
                   
       }
        });
  $A.enqueueAction(action2); 
        }
        
        
        
     
 
        
        
        
       },
    
    
    

    // for option 2 and option 3
    // 
    
    
addsiblingsave :function(component, event, helper) { 
    //  alert('Shipraaa');
      var SiblingLeadId= id1.toString();
         var editdata= component.get("v.editdata");
         var IsDifferentPhone= component.get("v.IsDifferentPhone");
          var IsSamePhone= component.get("v.IsSamePhone"); 
       var Firstname= component.find("leadFirstName").get("v.value");
        var countrycode = component.find("leadISDCODE").get("v.value");

        var SchoolName = component.find("leadSchoolName").get("v.value");
          
       var  mobilenumlenght= component.find("leadMobileName").get("v.value");
       var Country = component.find("leadCountry").get("v.value");
       var emailacc = component.find("leadAltEmail").get("v.value");
    
        var email = component.find("leadEmailName").get("v.value");        
        var Lastname = component.find("leadLastName").get("v.value");
    var ParentName = component.find("leadParentName").get("v.value");  
    var SchoolCode= component.find("city-records").get("v.selectedOption");
      var City= component.find("city-record").get("v.selectedOption");
           var altermobilenumlenght= component.find("leadAlternateNumber").get("v.value");    
    var mobilenum=mobilenumlenght.toString();
     var secondaryno =altermobilenumlenght.toString();
   // alert(mobilenum.length + ' mobilenum.length');
   // alert(secondaryno.length + ' mobilenum.length' );
     var  SiblingKey;
         // alert('Shipraaa'); 
         // alert( component.get("v.SiblingKey")+' SiblingKey');
    
    if(IsSamePhone == 'True')
    {
    var RandomNo =Math.floor(1000000 * Math.random());
    //    var RandomNo = Math.random();
   // alert(RandomNo+' RandomNo');
    }
    
       component.set("v.toggleSpinner3", false);    
    
         if( Firstname == undefined || Firstname == '' ){
       
            
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message":'Please Enter the Firstname '
                });
                toastEvent.fire();
                
            
        }
    
         if( Lastname == undefined || Lastname == ''){
       
             
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message":'Please Enter the last name '
                });
                toastEvent.fire();
        } 
        
    
        if (ParentName == '' || ParentName == undefined ) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter Parent Name"
                });
                 toastEvent.fire();
               
            }
    
           if (SchoolName == '' || SchoolName == undefined ) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter SchoolName "
                });
                 toastEvent.fire();
               
            }

           if (City == '' || City == undefined ) {
             //  alert(City + 'cityblank');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter City "
                });
                 toastEvent.fire();
               
            }
    
            
     
    
        if (mobilenum == '' || mobilenum == undefined ) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter mobile number"
                });
                 toastEvent.fire();
               
            }
    
     // alert(IsDifferentPhone +' IsDifferentPhone');  
    if(IsDifferentPhone=='True')
    { 
    // alert(IsDifferentPhone +' IsDifferentPhone');  
        if(LeadPh==mobilenum)
        {
           var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter new number"
                });
                toastEvent.fire();  
        }
      }
    
   
   if(mobilenum!='')
   {    
  
         if(countrycode=='+91'){ 
            
            if(mobilenum.length!=10){
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter a valid number according to Country code"
                });
                toastEvent.fire();
                
            }         
        }
    
     if(countrycode=='+971'){

            if(mobilenum.length!=9){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter a valid number according to Country code"
                });
                toastEvent.fire();
                
            }
       }
   }
   
    if(  secondaryno!='' && secondaryno!= undefined ){ 
        
        
     if(countrycode=='+91'){
          
          if(secondaryno.length !=10  ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter a valid alternate no according to country code"
                });
                toastEvent.fire();
             }  
            }    
         if(countrycode=='+971'){
        
            if(secondaryno.length!=9   )
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter a valid alternate no according to Country code"
                });
                toastEvent.fire();                
            }     
        }
    }
   
    
    var flag1=0;     
  
    if(  secondaryno!='' && secondaryno!= undefined ){ 
        if(countrycode=='+91'){
          
           
            
            if(secondaryno.length==10  ){
                
                flag1=1;
                //alert('flag1 '+flag1);
            }
        }
        if(countrycode=='+971'){
            
            if(secondaryno.length==9  ){
                 flag1=1;
                // alert('flag1 '+flag1);
            }
        }
    }
    else
    {
        flag1=1;
        // alert('flag1 '+flag1);
    }
   
    
    
           
      if( email == undefined || email == ''){
                    
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message":'Please Enter the Email '
                });
                toastEvent.fire();
                            
        }   
    
       var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       // var reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;                
                
    
        if(email !='' && email !=null){
          //  alert(' not null email');
        
            if (reg.test(email) == false) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please  enter a valid email format "
                });
                toastEvent.fire();
               
            }
        }
        	 var flag2=0;
        if(emailacc !='' && emailacc !=null && emailacc !=undefined){
          // alert('alt email is not null');
           
            if (reg.test(emailacc) == false) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "please enter valid email format for alternate email"
                });
                 toastEvent.fire();
               
            }
            else
            {
                flag2=1;
            }
        }  
 else
            {
                flag2=1;
            }
 

  

    
        
         
    
       
    
        if (countrycode == '' || countrycode == undefined ) 
           {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter countrycode "
                });
                 toastEvent.fire();
             }

            
    var flag=0;
    
         if(IsDifferentPhone=='True')
    {    
        if(LeadPh!=mobilenum)
        {
            flag=1;
           // alert(flag );
           // alert(IsDifferentPhone+'IsDifferentPhone' );
       
        }
    }  
    if(IsDifferentPhone!='True')
    {    
        if(LeadPh==mobilenum)
        {
            flag=1;
         //  alert(flag);
          // alert(IsDifferentPhone+'IsDifferentPhone' );
        }
    }    
     
    // alert( component.get("v.SiblingKey")+' SiblingKey');
   // alert( 'flag '+ flag + ' flag1'+ flag1 +' flag2 '+ flag2 );
       
          
    if( ((countrycode=='+971' && mobilenum.length==9) ||(countrycode=='+91' && mobilenum.length==10)) && flag2==1 && flag1==1 && flag==1 && reg.test(email) == true     && SchoolName != undefined && SchoolName != null && SchoolName != ''  && mobilenum != undefined && mobilenum != '' && countrycode != undefined && countrycode!= '' && email != undefined && email != '' && Firstname!= undefined && Firstname != '' && ParentName != undefined && ParentName !=  '' && City != undefined && City != ''){
     
    component.set("v.toggleSpinner3", true);          
     // alert('Insideif');
    
          var action=component.get("c.CreateSibLead");
 
                   action.setParams({
                         Firstname:Firstname,
                       Country :Country,
                       SchoolName:SchoolName,
                       secondaryno:secondaryno,
                       mobilenum:mobilenum,
                       countrycode:countrycode,
                       emailacc:emailacc,
                         email:email,
                         Lastname:Lastname,
                        ParentName:ParentName,
                       SiblingLeadId:SiblingLeadId,
                       City: City,
                       SchoolCode :SchoolCode, 
                       SiblingKey : SiblingKey,
                       RandomNo: RandomNo
              });
    action.setCallback(this,function(response){
      
        var responseValue=response.getReturnValue();
            var state = response.getState();
        
        // alert(responseValue+' LeadId');    
       // alert(state+' state')
              if(state=='SUCCESS'){  
              
                    var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "success",
                    "message":'Lead Created sucessfull '
                });
                toastEvent.fire();
                  
                 
               helper.getClassPicklistValues(component,event,helper);
          helper.updatelead(component,event,helper);
            helper.getsiblingrecord(component,event,helper);
            helper.getLeadrecord(component,event,helper);
         
      component.set("v.truthy5", true); 
            component.set("v.truthy1", true); 
          component.set("v.truthy4", false);
            component.set("v.siblingshow", false); 
              
              
              
              
              };
        
    })
    
  $A.enqueueAction(action);

      }
   
    
    },
    
    
    
    AdjustableAmountfun:function(component, event,helper)
    {
        var AdjustableAmountfunvalue = event.getSource().get("v.checked"); 
      //  alert(AdjustableAmountfunvalue+'k mehra');
         var PaymentMode = component.get("v.PaymentMode");
      //  alert(PaymentMode.Adjust.isSelected+'PaymentMode.Adjust.isSelected');
        if(AdjustableAmountfunvalue==true)
        {
           PaymentMode.Adjust.isSelected=true;
            component.set('v.AdjustableAmountcheckbox','true'); 
        }
        else
        {
             PaymentMode.Adjust.isSelected=false;
             PaymentMode.Adjust.amount = 0;
            component.set('v.AdjustableAmountcheckbox','false');   
        }
       //   alert(PaymentMode.Adjust.isSelected+'PaymentMode.Adjust.isSelected');
         component.set("v.PaymentMode",PaymentMode);
    },
     DownAdjustableAmountfun:function(component, event,helper)
    {
        
        var downPaymentWrapper = component.get("v.downPaymentWrapper");
        var AdjustableAmountfunvalue = event.getSource().get("v.checked"); 
       
        if(AdjustableAmountfunvalue==true)
        {
           downPaymentWrapper.Adjust.isSelected=true;
            component.set('v.AdjustableAmountcheckbox1','true'); 
        }
        else
        {
             downPaymentWrapper.Adjust.isSelected=false;
             downPaymentWrapper.Adjust.amount = 0;
            component.set('v.AdjustableAmountcheckbox1','false');   
        }
        //  alert(downPaymentWrapper.Adjust.isSelected+'downPaymentWrapper.Adjust.isSelected'+downPaymentWrapper.Adjust.amount+'down');
         component.set("v.downPaymentWrapper",downPaymentWrapper);
    },
    
    
    
    
    MatchingRefrenceid:function(component, event, helper){
        
        var firstvalue1=component.get("v.referenceId");
        // alert(firstvalue1+'firstvalue1');
        var firstvalue2=component.get('v.confirmrefrenceid');
        if(firstvalue1=='' ||firstvalue1==null || firstvalue1=='undefined' ||firstvalue1==undefined)
        {
            // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Please Reference Id is First..',
                    duration:'100',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                
        }
         
    
    if(firstvalue1!='')
        {
        
        for(var index=0; index < firstvalue2.length; index++)
        {
              
            if( firstvalue2.length<=firstvalue1.length) 
            {
                 
                  if(firstvalue2[index]==firstvalue1[index])
            {
               
                if(firstvalue2.length==firstvalue1.length && firstvalue2==firstvalue1)
                {  
                    component.set('v.refrenceidforAllLoan','Yes');
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     title : 'Success',
                     message: 'Reference Id Match Succesfully..',
                     duration:'100',
                     key: 'info_alt',
                     type: 'success',
                     mode: 'pester'
                 });
                 toastEvent.fire();
                }
                
                
            }
            else
            {
             
                        component.set('v.refrenceidforAllLoan','No');
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'100',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                     
                 
             
                
            }
                
            }
          
       
            
            
            
        }
             console.log(firstvalue2.length+'firstvalue2.length');
                        console.log(firstvalue1.length+'firstvalue1.length');
//alert(firstvalue1.length+'firstvalue1.length');
            //alert(firstvalue2.length+'firstvalue2.length');
            
                     
            if(firstvalue2.length>firstvalue1.length)
            {
                 component.set('v.refrenceidforAllLoan','No');
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'100',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
            }
        
}
    },
    
    
    
    
    
    
    
    
    
    
    MatchingrefrenceidNEFT:function(component, event, helper)
    {         
       window.PaymentMode='';
       var checkdownpaymentyesornot = event.getSource().get("v.name");
    // alert(checkdownpaymentyesornot+'checkdownpaymentyesornot');
     if(checkdownpaymentyesornot=='Downpayment')
     {
       PaymentMode=component.get("v.downPaymentWrapper");  
     }
     if(checkdownpaymentyesornot!='Downpayment')
     {
         PaymentMode = component.get("v.PaymentMode");
        console.log("PaymentMode.NeftWrap---> "+JSON.stringify(PaymentMode.NeftWrap)); 
     }
     
//alert(JSON.stringify(PaymentMode.NeftWrap)+'heloo');       
        var indexvaueofneft = event.getSource().get("v.title");
           
        //alert(indexvaueofneft+'indexvaueofneft');
        for(var i=0;i<PaymentMode.NeftWrap.NeftList.length;i++)
        {
            if(indexvaueofneft==i)
            {
                var firstvalue1=PaymentMode.NeftWrap.NeftList[i].referenceId;
                var firstvalue2=PaymentMode.NeftWrap.NeftList[i].Confirmrefrenceid;
                 console.log("PaymentMode.NeftWrap---> "+PaymentMode.NeftWrap.NeftList[i].referenceId);
                
                
                if(firstvalue1=='' ||firstvalue1==null || firstvalue1=='undefined' ||firstvalue1==undefined)
        {
            // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Please Reference Id is First..',
                    duration:'100',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                
        }  
                
                
                
                
              if(firstvalue1!='' )  
                
                
              {
                
                
                
                
                
                   for(var index=0; index < firstvalue2.length; index++)
        {
             
            if( firstvalue2.length<=firstvalue1.length) 
            {
             
                
                  if(firstvalue2[index]==firstvalue1[index])
            {
                
                 
                if(firstvalue2.length==firstvalue1.length && firstvalue1==firstvalue2)
                { 
                    
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     title : 'Success',
                     message: 'Reference Id Match Succesfully..',
                     duration:'100',
                     key: 'info_alt',
                     type: 'success',
                     mode: 'pester'
                 });
                 toastEvent.fire();
                }
                
                
            }
            else
            {
                
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'100',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                     
                 
             
                
            }
                
            }
          
       
            
            
            
        }
             console.log(firstvalue2.length+'firstvalue2.length');
                        console.log(firstvalue1.length+'firstvalue1.length');
 
            
            if(firstvalue2.length>firstvalue1.length)
            {
 
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'100',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
            }
                
            }
           
            }
            
            
            
        }
       
    }
    , 
    
      MatchingrefrenceidPaytm:function(component, event, helper)
    {
       // alert('okis');
         window.PaymentMode='';
       var checkdownpaymentyesornot = event.getSource().get("v.name");
    // alert(checkdownpaymentyesornot+'checkdownpaymentyesornot');
     if(checkdownpaymentyesornot=='Downpayment')
     {
       PaymentMode=component.get("v.downPaymentWrapper");  
     }
     if(checkdownpaymentyesornot!='Downpayment')
     {
         PaymentMode = component.get("v.PaymentMode");
        console.log("PaymentMode.NeftWrap---> "+JSON.stringify(PaymentMode.PaytmWrap)); 
     }
     
        //var PaymentMode = component.get("v.PaymentMode");
        console.log("PaymentMode.PaytmWrap---> "+JSON.stringify(PaymentMode.PaytmWrap));
        var indexvaueofneft = event.getSource().get("v.title");
           
        //alert(indexvaueofneft+'indexvaueofneft');
        for(var i=0;i<PaymentMode.PaytmWrap.PaytmList.length;i++)
        {
            if(indexvaueofneft==i)
            {
                var firstvalue1=PaymentMode.PaytmWrap.PaytmList[i].referenceId;
                var firstvalue2=PaymentMode.PaytmWrap.PaytmList[i].Confirmrefrenceid;
                 console.log("PaymentMode.PaytmWrap---> "+PaymentMode.PaytmWrap.PaytmList[i].referenceId);
                
                  if(firstvalue1=='' ||firstvalue1==null || firstvalue1=='undefined' ||firstvalue1==undefined)
        {
            // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Please Reference Id is First..',
                    duration:'100',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                
        }  
                
                
           if(firstvalue1!='')
           {
             
                   for(var index=0; index < firstvalue2.length; index++)
        {
             
            if( firstvalue2.length<=firstvalue1.length) 
            {
             
                
                  if(firstvalue2[index]==firstvalue1[index])
            {
                
                 
                if(firstvalue2.length==firstvalue1.length && firstvalue1==firstvalue2)
                { 
                    
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     title : 'Success',
                     message: 'Reference Id Match Succesfully..',
                     duration:'500',
                     key: 'info_alt',
                     type: 'success',
                     mode: 'pester'
                 });
                 toastEvent.fire();
                }
                
                
            }
            else
            {
                
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'500',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                     
                 
             
                
            }
                
            }
          
       
            
            
            
        }
             console.log(firstvalue2.length+'firstvalue2.length');
                        console.log(firstvalue1.length+'firstvalue1.length');
 
            
            if(firstvalue2.length>firstvalue1.length)
            {
 
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'500',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
            }
                
            }
           
            }
            
            
            
        }
       
    }
    , 
    
    MatchingrefrenceidSwipe:function(component, event, helper)
    {
            window.PaymentMode='';
       var checkdownpaymentyesornot = event.getSource().get("v.name");
    // alert(checkdownpaymentyesornot+'checkdownpaymentyesornot');
     if(checkdownpaymentyesornot=='Downpayment')
     {
       PaymentMode=component.get("v.downPaymentWrapper");  
     }
     if(checkdownpaymentyesornot!='Downpayment')
     {
         PaymentMode = component.get("v.PaymentMode");
        console.log("PaymentMode.NeftWrap---> "+JSON.stringify(PaymentMode.SwipeWrap)); 
     }
     
        console.log("PaymentMode.PaytmWrap---> "+JSON.stringify(PaymentMode.SwipeWrap));
        var indexvaueofneft = event.getSource().get("v.title");
           
        //alert(indexvaueofneft+'indexvaueofneft');
        for(var i=0;i<PaymentMode.SwipeWrap.SwipeList.length;i++)
        {
            if(indexvaueofneft==i)
            {
                var firstvalue1=PaymentMode.SwipeWrap.SwipeList[i].referenceId;
                var firstvalue2=PaymentMode.SwipeWrap.SwipeList[i].Confirmrefrenceid;
                 console.log("PaymentMode.PaytmWrap---> "+PaymentMode.SwipeWrap.SwipeList[i].referenceId);
                
                if(firstvalue1=='' ||firstvalue1==null || firstvalue1=='undefined' ||firstvalue1==undefined)
                {
                    // alert('Not matched value');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error',
                        message:'Please Reference Id is First..',
                        duration:'100',
                        key: 'info_alt',
                        type: 'error',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                    
                }    
                
                
                if(firstvalue1!='')
                
                
                {
             
                
                
                   for(var index=0; index < firstvalue2.length; index++)
        {
             
            if( firstvalue2.length<=firstvalue1.length) 
            {
             
                
                  if(firstvalue2[index]==firstvalue1[index])
            {
                
                 
                if(firstvalue2.length==firstvalue1.length && firstvalue1==firstvalue2)
                { 
                    
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     title : 'Success',
                     message: 'Reference Id Match Succesfully..',
                     duration:'500',
                     key: 'info_alt',
                     type: 'success',
                     mode: 'pester'
                 });
                 toastEvent.fire();
                }
                
                
            }
            else
            {
                
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'500',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                     
                 
             
                
            }
                
            }
          
       
            
            
            
        }
             console.log(firstvalue2.length+'firstvalue2.length');
                        console.log(firstvalue1.length+'firstvalue1.length');
 
            
            if(firstvalue2.length>firstvalue1.length)
            {
 
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'500',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
            }
                
            }
           
 
            
            }   
            
        }
       
    }
    , 
     MatchingrefrenceidZestMoney:function(component, event, helper)
    {
       
            window.PaymentMode='';
       var checkdownpaymentyesornot = event.getSource().get("v.name");
    // alert(checkdownpaymentyesornot+'checkdownpaymentyesornot');
     if(checkdownpaymentyesornot=='Downpayment')
     {
       PaymentMode=component.get("v.downPaymentWrapper");  
     }
     if(checkdownpaymentyesornot!='Downpayment')
     {
         PaymentMode = component.get("v.PaymentMode");
        console.log("PaymentMode.NeftWrap---> "+JSON.stringify(PaymentMode.ZestMoney)); 
     }
     
        console.log("PaymentMode.PaytmWrap---> "+JSON.stringify(PaymentMode.ZestMoney));
        
                var firstvalue1=PaymentMode.ZestMoney.referenceId;
                var firstvalue2=PaymentMode.ZestMoney.Confirmrefrenceid;
                 console.log("PaymentMode.PaytmWrap---> "+PaymentMode.ZestMoney.referenceId);
        
        
        
        
        
           if(firstvalue1=='' ||firstvalue1==null || firstvalue1=='undefined' ||firstvalue1==undefined)
                {
                    // alert('Not matched value');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error',
                        message:'Please Reference Id is First..',
                        duration:'100',
                        key: 'info_alt',
                        type: 'error',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                    
                }    
                
        
         if(firstvalue1!='')
        
         {
        
        
                
                   for(var index=0; index < firstvalue2.length; index++)
        {
             
            if( firstvalue2.length<=firstvalue1.length) 
            {
             
                
                  if(firstvalue2[index]==firstvalue1[index])
            {
                
                 
                if(firstvalue2.length==firstvalue1.length && firstvalue1==firstvalue2)
                { 
                    
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     title : 'Success',
                     message: 'Reference Id Match Succesfully..',
                     duration:'500',
                     key: 'info_alt',
                     type: 'success',
                     mode: 'pester'
                 });
                 toastEvent.fire();
                }
                
                
            }
            else
            {
                
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'500',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                     
                 
             
                
            }
                
            }
          
       
            
            
            
        }
             console.log(firstvalue2.length+'firstvalue2.length');
                        console.log(firstvalue1.length+'firstvalue1.length');
 
            
            if(firstvalue2.length>firstvalue1.length)
            {
 
                
                // alert('Not matched value');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Reference Id is not same..',
                    duration:'500',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
            }
                
            
           
         }
            
            
            
        
       
    }
    , 
    
    
    handleComponentEvent : function(component, event,helper) {
     //   alert('handleComponentEvent')
        var message = event.getParam("message");
 //alert(message+'parent component');
        // set the handler attributes based on event data
        component.set("v.afterconfirmwhatsapp", message);
        helper.finalProceedPayment(component, event, helper);
        
    },
    
    
    radioButtonGrouphandleChange: function (component, event) {
        var changeValue = event.getParam("value");
        component.set('v.manualAutomatic',changeValue);
        //alert(component.get('v.manualAutomatic'));
        //alert(changeValue);
    }
    
    ,
    
    
    
    
    
    
    
    getparentisdcode:function(component,event,helper)
    {
      var isdcode = event.getSource().get("v.value");
       // alert(isdcode)
        if(isdcode=='+91')
        {
        component.set('v.totallengthofphnnumber1',10)    
        }
        if(isdcode=='+971')
        {
                component.set('v.totallengthofphnnumber1',9)    
    
        }

    },
    
    
    
    
    
    
    
    
    
   changedownpayent : function(component, event, helper) {
         var amountvalue = event.getSource().get("v.value");
      // alert(amountvalue);
      // alert(extramarksresdwonpay);
   
       if(extramarksresdwonpay>amountvalue)
       {
           //alert('ifloop');
           console.log(extramarksresdwonpay);
          
           
       }
       else
       {
           component.set('v.downPayment',amountvalue); 
            var curretvalueemi=parseInt(component.get("v.totalEmi"));
         var loanamouint = parseInt(component.get('v.amount'));
        var downpaY =parseInt(component.get('v.downPayment'));
        var totaldeduct=loanamouint-downpaY;
           
            component.set('v.monthlyEmiDeduction', (totaldeduct/ curretvalueemi).toFixed(2)); 
           
   		
       }
    
    
    
    },
    
    
    
    
    
    
    emichangenum : function(component, event, helper) {
         var pincode = event.getSource().get("v.value");
        //alert(pincode); 
          
            var curretvalueemi=parseInt(component.get("v.totalEmi"));
        //alert(curretvalueemi+'cccccccccccccc');
        //alert(emiCount+'eeeeeeeeeeeeeee');
        var emiCount12=parseInt(emiCount);
        var loanamouint = parseInt(component.get('v.amount'));
        var downpaY =parseInt(component.get('v.downPayment'));
        var totaldeduct=loanamouint-downpaY;
       // alert(totaldeduct);
        
        if(curretvalueemi > emiCount12)
        {
            component.set("v.totalEmi",7);
             var toastEvent = $A.get("e.force:showToast");
    toastEvent.setParams({
        "title": "error!",
        "message": "enter a number less than"+ emiCount12,
        "type": "error"
    });
    toastEvent.fire();
        
        } 
        if(curretvalueemi <=emiCount12)
        {
        component.set('v.monthlyEmiDeduction', (totaldeduct/ curretvalueemi).toFixed(2)); 
         
                      }
        if(isNaN(parseInt(pincode))){
            event.getSource().set("v.value",'');
        }
        else
        {
            event.getSource().set("v.value",parseInt(pincode));
        }
        },
    
    getschemeforemloan: function(component, event, helper) 
    {
       
        //('onside integartion loop');
        //('kkkk12323355');
       // alert(component.get('v.amount'));
        var action=component.get("c.getschemeforemloan1");
        action.setParams({
            "mrp_mop" :productselectedforpayment,
            "amount" : component.get('v.amount')
        });
        action.setCallback(this, function(response) {                
            var state = response.getState();
            var q =response.getReturnValue();
          // alert(q.payment_error+'uuuu');
            
            window.emiCount = q.emiCount;
           // alert(q.payment_error+'tesr');
            if(q.payment_error!=null && q.payment_error!='' && q.payment_error!='undefined')
            {
                //alert('test error');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "error!",
                    "message": q.payment_error,
                     "type": "error"
                });
                toastEvent.fire();
            }
             if(q.payment_error ==null || q.payment_error=='' || q.payment_error=='undefined' )
             {
                 //alert('data not test error');
               extramarksresdwonpay=q.downpayment;
                 //alert(extramarksresdwonpay);
                  component.set('v.totalEmi', q.emiCount);
            component.set('v.downPayment', q.downpayment);
                 
                 
                 var loanamouint = parseInt(component.get('v.amount'));
                 var downpaY =parseInt(component.get('v.downPayment'));
                 var totaldeduct=loanamouint-downpaY;
                 //alert(totaldeduct);
                 
                 
            component.set('v.monthlyEmiDeduction', (totaldeduct / q.emiCount).toFixed(2)); 
                 
             }
               
            
            //(state+'orderintegartion api');               
        });
        $A.enqueueAction(action);
        
        
    },
    
    valueChangeValidation : function(component, event, helper) {
         var pincode = event.getSource().get("v.value");
             if(isNaN(parseInt(pincode))){
            event.getSource().set("v.value",'');
        }else{
            event.getSource().set("v.value",parseInt(pincode));
        }
        
    },
    
    valueChangeValidation1 : function(component, event, helper) {
        var pincode = event.getSource().get("v.value");
//alert(pincode);
             if(isNaN(parseInt(pincode))){
            event.getSource().set("v.value",'');
        }else{
            event.getSource().set("v.value",parseInt(pincode));
        }
     },
    clearBatchDate: function(component, event, helper){
        component.set("v.BatchDate",'');
    },
    //code for uploading image
    activateNextClass: function(component, event, helper){
        var streamName = event.getSource().get("v.value");
        var productIndex = event.getSource().get("v.name");
        var packageIndex = event.getSource().get("v.title");
        component.set("v.changesMade",true);
        console.log("v.streamName-->"+streamName);
        console.log("v.packageIndex-->"+packageIndex);
        console.log("v.productIndex-->"+productIndex);
        var wrapperdata = component.get("v.wrapperdata");
        var checkboxvalue = wrapperdata[productIndex].selectproductlist[packageIndex].checkbox;
        console.log("checkboxvalue-----> "+checkboxvalue);
        var baseClassIndex =0;
        for(var i in wrapperdata[productIndex].selectproductlist){
            if(wrapperdata[productIndex].selectproductlist[i].isBaseClass==true){
                baseClassIndex = i;
                break; 
            }
        }
        console.log("baseClassIndex--> "+baseClassIndex);
        //if Subject is below Base class
        if(parseInt(packageIndex)>baseClassIndex ){
            if(checkboxvalue==true){
                if(parseInt(packageIndex)+1<wrapperdata[productIndex].selectproductlist.length)
                    wrapperdata[productIndex].selectproductlist[parseInt(packageIndex)+1].disabledtrue=false;
            }else{
                for(var i=parseInt(packageIndex)+1;i<wrapperdata[productIndex].selectproductlist.length;i++){
                    console.log("i---> "+i);
                    wrapperdata[productIndex].selectproductlist[i].disabledtrue =true;
                    wrapperdata[productIndex].selectproductlist[i].checkbox =false;
                }
                
            }
            //if Subject is above the base class
        }else{
            if(checkboxvalue==true){
                if(parseInt(packageIndex)-1>=0)
                    wrapperdata[productIndex].selectproductlist[parseInt(packageIndex)-1].disabledtrue=false;
            }else{
                for(var i=0;i<parseInt(packageIndex);i++){
                    console.log("i---> "+i);
                    wrapperdata[productIndex].selectproductlist[i].disabledtrue =true;
                    wrapperdata[productIndex].selectproductlist[i].checkbox =false;
                }
            }
        } 
        
        //Enabling Classes after and before base Class
        if(baseClassIndex==0){
            wrapperdata[productIndex].selectproductlist[parseInt(baseClassIndex)+1].disabledtrue =false;
        }else{
            wrapperdata[productIndex].selectproductlist[parseInt(baseClassIndex)-1].disabledtrue =false;
            if(parseInt(baseClassIndex)+1<wrapperdata[productIndex].selectproductlist.length){
                wrapperdata[productIndex].selectproductlist[parseInt(baseClassIndex)+1].disabledtrue =false;
            }
        } 
        component.set("v.wrapperdata",wrapperdata);
       // helper.calculateBalancePaymentMode(component, event, helper);
    },
    
    streamSeleted: function(component, event, helper){
        var streamName = event.getSource().get("v.value");
        var productIndex = event.getSource().get("v.name");
        var packageIndex = event.getSource().get("v.title");
        
        console.log("v.streamName-->"+streamName);
        console.log("v.packageIndex-->"+packageIndex);
        console.log("v.productIndex-->"+productIndex);
        var wrapperdata = component.get("v.wrapperdata");
        var streamWrapper =  component.get("v.StreamsAndSubjectsForHigherClass");
        var subjects = [];
        for(var i in streamWrapper){
            if(streamWrapper[i].stream.Id==streamName )
                subjects = streamWrapper[i].subjects;
        }
        var subjectsObject = [];
        for(var i in subjects){
            // var subObj = {label:+subjects[i].Name+',value:'+subjects[i].Id+};
            subjectsObject.push({
                label:subjects[i].Name
                ,value:subjects[i].Id});
        }
        var emptyList = [];
        //Setting Subjects Values
        wrapperdata[productIndex].selectproductlist[packageIndex].subjects = subjectsObject;
        wrapperdata[productIndex].selectproductlist[packageIndex].selectedSubjects = emptyList;
        console.log("Wrapper-->"+JSON.stringify(wrapperdata[productIndex].selectproductlist[packageIndex].subjects));
        console.log("Selected Subjects-->"+JSON.stringify(wrapperdata[productIndex].selectproductlist[packageIndex].selectedSubjects));
        console.log("Class Name-->"+JSON.stringify(wrapperdata[productIndex].selectproductlist[packageIndex].classname));
        console.log("Selected Stream-->"+JSON.stringify(wrapperdata[productIndex].selectproductlist[packageIndex].selectedstream));
        console.log("productname-->"+JSON.stringify(wrapperdata[productIndex].selectproductlist[packageIndex].productname));
        
        component.set("v.wrapperdata",wrapperdata);
    },
    subStreamSeleted: function(component, event, helper) {
   
      var streamName = event.getSource().get("v.value");
      component.set("v.selectedStream",streamName);
	   var wrapperdata = component.get("v.wrapperdata");
      var productIndex = event.getSource().get("v.name");
      /// alert('productIndex '+productIndex);
      var packageIndex = event.getSource().get("v.title");
      var classID = wrapperdata[productIndex].selectproductlist[packageIndex].classid;
      var boardID = wrapperdata[productIndex].selectproductlist[packageIndex].boardid;
      var productId = wrapperdata[productIndex].selectproductlist[packageIndex].productname;
        //alert('classID=> '+ classID + ' boardID=> '+ boardID+ ' productId=> '+ productId);
       var action = component.get("c.getStreamsForHigherClassnew");
        action.setParams({
          	stremid: streamName,
            boardID: boardID, 
            classID: classID,
            productId: productId
        });

        action.setCallback(this, function(response) {
          var state = response.getState();
          if (state === "SUCCESS") {
            var q1 = response.getReturnValue();
            var emptyList = [];
            var SubStreams = [];
            //console.log('AAAA==>'+q1+"Service PRoduct Wrapper" + JSON.stringify(q1));
              for (var SubStreamName in q1){
                  
                  SubStreams.push({
                      label: q1[SubStreamName],	//name
                      value: SubStreamName		// id
                  });
              }
              wrapperdata[productIndex].selectproductlist[packageIndex].SubStreams = q1;
              wrapperdata[productIndex].selectproductlist[packageIndex].SubStreamSubjects = emptyList;
              wrapperdata[productIndex].selectproductlist[packageIndex].subjects = emptyList;
                 //component.set("v.SubStreams",q1);
             // component.set("v.selectedSubStream1",q1);
              //component.set("v.SubStreamSubjects",Null);
              component.set("v.wrapperdata", wrapperdata);
            
          }else{
              console.log(state+'error')
          }
        });
        $A.enqueueAction(action);
  },
  subStreamSubject: function(component, event, helper) {
  var streamNamesub = event.getSource().get("v.value");
      component.set("v.selectedSubStream",streamNamesub);
      var productIndex = event.getSource().get("v.name");
         /// alert('productIndex '+productIndex);
        var packageIndex = event.getSource().get("v.title");
          // alert('productIndex '+productIndex);
    
        console.log("v.streamNamesub-->" + streamNamesub);
        console.log("v.packageIndex-->" + packageIndex);
        console.log("v.productIndex-->" + productIndex);
      var wrapperdata = component.get("v.wrapperdata");
      	var classID = wrapperdata[productIndex].selectproductlist[packageIndex].classid;
        var boardID = wrapperdata[productIndex].selectproductlist[packageIndex].boardid;
        var productId = wrapperdata[productIndex].selectproductlist[packageIndex].productname;
      //alert('classID=> '+ classID + ' boardID=> '+ boardID+ ' productId=> '+ productId);
          
         //gopalstream
       var action = component.get("c.getsubStreamSubjects");
        action.setParams({
          	stramSub: streamNamesub,
            boardID: boardID, 
            classID: classID,
            productId: productId
        });

        action.setCallback(this, function(response) {
          var state = response.getState();
          if (state === "SUCCESS") {
            var q1 = response.getReturnValue();
              var subjectName = [];
              var subjectIDs = [];
              var subjectsObject = [];
              for (var subjectID in q1){
                  subjectIDs.push(subjectID);
                  subjectName.push(q1[subjectID]);
                  
                  subjectsObject.push({
                      label: q1[subjectID],	//name
                      value: subjectID		// id
                  });
              }
              console.log('subjectName==>'+JSON.stringify(subjectName)+" subjectIDs " + JSON.stringify(subjectIDs));
            
              component.set("v.SubStreamSubjects",subjectName);
              var emptyList = [];
              //Setting Subjects Values
              console.log('Abhilash=> '+ subjectIDs);
              wrapperdata[productIndex].selectproductlist[packageIndex].subjects = subjectsObject;
              wrapperdata[productIndex].selectproductlist[packageIndex].selectedSubjects = subjectIDs;
              wrapperdata[productIndex].selectproductlist[packageIndex].SubStreamSubjects = subjectName;
			  wrapperdata[productIndex].selectproductlist[packageIndex].subjects = emptyList;
              component.set("v.wrapperdata", wrapperdata);
          }else{
              console.log(state+'error');
          }
        });
        $A.enqueueAction(action);
        
      //endgopal 
      
  },
    removeSameCodeProduct :function(component, event, helper){
        try{
            var streamName = event.getSource().get("v.value");
            var selectedTabID = component.set("v.selectedTabID");
            var selectedTabIndex = component.set("v.selectedTabIndex");
            var productIndex = event.getSource().get("v.name");
           // alert(productIndex+'productIndex');
            var packageIndex = event.getSource().get("v.title");
           // alert(packageIndex+'packageIndex');
            component.set("v.productIndex",productIndex);
            component.set("v.packageIndex",packageIndex);
            var wrapperdata = component.get("v.wrapperdata");
            //Disabling TAB in all Pickist
            var tabSelected = false;
            var productName  = ''
            var tabIds = [];
            var emptyList = [];
            //Getting Tab Ids
            for(var i in wrapperdata){
                for(var j in wrapperdata[i].selectproductlist){
                    for(var k in wrapperdata[i].selectproductlist[j].productlist){
                        //gopal
                      if(wrapperdata[i].selectproductlist[j].productlist[k].key == streamName ){
                        if(wrapperdata[i].selectproductlist[j].productlist[k].IsHardware == true){
                            component.set("v.showSubjectSection", true);
                            if(wrapperdata[productIndex].selectproductlist[packageIndex].classXIXII == true){
                                //var elements = document.getElementsByClassName(productIndex+'-'+packageIndex);
                                //elements[0].style.display = 'contents';
                                wrapperdata[productIndex].selectproductlist[packageIndex].showSubjectSection = true;
                            }
                            wrapperdata[productIndex].selectproductlist[packageIndex].hardwareSelected = true;
                            wrapperdata[productIndex].selectproductlist[packageIndex].subjects = emptyList;
                          }
                          else{
                              if(wrapperdata[productIndex].selectproductlist[packageIndex].classXIXII == true){
                                  //var elements = document.getElementsByClassName(productIndex+'-'+packageIndex);
                                  //elements[0].style.display = 'none';
                                  wrapperdata[productIndex].selectproductlist[packageIndex].showSubjectSection = false;
                              }
                              var emptyList = [];
                              
                              wrapperdata[productIndex].selectproductlist[packageIndex].hardwareSelected = false;
                              
                              //component.set("v.SubStreams",emptyList);
                              //component.set("v.SubStreamSubjects",emptyList);
                              
                          }
                          wrapperdata[productIndex].selectproductlist[packageIndex].selectedstream = "";
                          wrapperdata[productIndex].selectproductlist[packageIndex].subjects = emptyList;
                          wrapperdata[productIndex].selectproductlist[packageIndex].selectedSubjects = emptyList;
                          wrapperdata[productIndex].selectproductlist[packageIndex].SubStreams = emptyList;
                          wrapperdata[productIndex].selectproductlist[packageIndex].selectedSubStream1 = "";
                          wrapperdata[productIndex].selectproductlist[packageIndex].SubStreamSubjects = emptyList;
                      }
                      
                      //gopal
                        if(wrapperdata[i].selectproductlist[j].productlist[k].value=="TAB" || wrapperdata[i].selectproductlist[j].productlist[k].value=="TAB+SD CARD" )
                            tabIds.push(wrapperdata[i].selectproductlist[j].productlist[k].key);
                    }                
                }
            }
            
            component.set("v.selectedTabID",streamName);
            component.set("v.selectedTabIndex",productIndex+'/'+packageIndex);
            
            console.log("productName--->" +productName);
            var packIndex = [];
            
            for(var i in wrapperdata){
                for(var j in wrapperdata[i].selectproductlist){
                    if(tabIds.includes(wrapperdata[i].selectproductlist[j].productname)){
                        packIndex.push(i);
                    }                    
                }
            }
            console.log("DIsabled Packages --> "+packIndex);
            
            //Disabling TAB in all Pickist
            for(var i in packIndex){
                for(var j in wrapperdata[parseInt(packIndex[i])].selectproductlist){
                    for(var k in wrapperdata[parseInt(packIndex[i])].selectproductlist[j].productlist){
                        if(wrapperdata[parseInt(packIndex[i])].selectproductlist[j].productlist[k].value=="TAB" || wrapperdata[parseInt(packIndex[i])].selectproductlist[j].productlist[k].value=="TAB+SD CARD")
                            wrapperdata[parseInt(packIndex[i])].selectproductlist[j].productlist[k].isDisabled = true;
                    }                
                }
            }
            
            
            //Enabling All Tab Values
            if(packIndex.length>0){
                for(var p in wrapperdata){
                    if(!packIndex.includes(p)){
                        for(var j in wrapperdata[p].selectproductlist){
                            for(var k in wrapperdata[p].selectproductlist[j].productlist){
                                if(wrapperdata[p].selectproductlist[j].productlist[k].value=="TAB" || wrapperdata[p].selectproductlist[j].productlist[k].value=="TAB+SD CARD")
                                    wrapperdata[p].selectproductlist[j].productlist[k].isDisabled = false;
                            }                
                        }
                    }
                }
            }else{
                for(var p in wrapperdata){
                    for(var j in wrapperdata[p].selectproductlist){
                        for(var k in wrapperdata[p].selectproductlist[j].productlist){
                            if(wrapperdata[p].selectproductlist[j].productlist[k].value=="TAB" || wrapperdata[p].selectproductlist[j].productlist[k].value=="TAB+SD CARD")
                                wrapperdata[p].selectproductlist[j].productlist[k].isDisabled = false;
                        }                
                    }
                }
            }
            
            
            
            
            var courseType = '';
            var liveClass = false;
            var TerritoryBassed = false;
            for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].productlist){
                if(streamName == wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].key){
                    courseType = wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].courseType;
                    liveClass =  wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].liveClass;
                    TerritoryBassed =wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].IsTerritoryBassed;
                }  
            }
            
            //alert(liveClass);
            if(liveClass==true &&(courseType != 'NULL' || courseType != '' || courseType != null))
            {
                for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct){
                    if(wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].courseType == courseType
                       && wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].liveClass==true )
                    {
                        wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].isDisabled = true;
                    }else{
                        wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].isDisabled = false;
                    }
                }
            }
            //code add for new requirment
            if(liveClass==false)
            {
                 for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct)
                 {
                     
                        wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].isDisabled = false;
                    
                }
                
            }
            
            if((courseType == 'NULL' || courseType == null) && courseType!='' && liveClass==true){
                for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct){
                    wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].isDisabled = false;
                }
            }
            
            /* territory code start */
            //alert('here==> '+ TerritoryBassed);
            for (var i in wrapperdata) {
                for (var j in wrapperdata[i].selectproductlist) {
                    for (var k in wrapperdata[i].selectproductlist[j].productlist) {
                        if (TerritoryBassed == true) {
                            if(wrapperdata[i].selectproductlist[j].productlist[k].IsTerritoryBassed == false){
                                wrapperdata[i].selectproductlist[j].productlist[k].isDisabled = true;
                            }
                        }
                        else if (TerritoryBassed == false) {
                            if(wrapperdata[i].selectproductlist[j].productlist[k].IsTerritoryBassed == true){
                                wrapperdata[i].selectproductlist[j].productlist[k].isDisabled = true;
                            }
                        }
                        
                    }
                    
                    for (var k in wrapperdata[i].selectproductlist[j].serviceproduct) {
                        if (TerritoryBassed == true) {
                            if(wrapperdata[i].selectproductlist[j].serviceproduct[k].IsTerritoryBassed == false){
                                wrapperdata[i].selectproductlist[j].serviceproduct[k].isDisabled = true;
                            }
                        }
                        else if (TerritoryBassed == false) {
                            if(wrapperdata[i].selectproductlist[j].serviceproduct[k].IsTerritoryBassed == true){
                                wrapperdata[i].selectproductlist[j].serviceproduct[k].isDisabled = true;
                            }
                        }
                        
                    }
                }
            }
            /* end */
            
           //requiremt for live class 2.2 realese
                //   console.log("Class Name-->"+JSON.stringify(wrapperdata[productIndex].selectproductlist[packageIndex].classname));
 //alert(wrapperdata[productIndex].selectproductlist[packageIndex].isBaseClass+'wrapperdata[productIndex].isBaseClass==true');
            ///SHOWING POPUP FOR LIVE CLASS WITH DATE AND BATCH
            if(liveClass==true && wrapperdata[productIndex].selectproductlist[packageIndex].isBaseClass==true ){
                ////("LIVE CLASS");
                component.set("v.productTypeSelectedBatch","Product");
                wrapperdata[productIndex].selectproductlist[packageIndex].batch='';
                wrapperdata[productIndex].selectproductlist[packageIndex].batchDate='';
                wrapperdata[productIndex].selectproductlist[packageIndex].batchId='';
                var productId = wrapperdata[productIndex].selectproductlist[packageIndex].productname;
                helper.getBatchAndDateForProducts(component, event, helper,productId);
            }
            
            
            
            
            
            
            
            
            
            
            component.set("v.wrapperdata",wrapperdata);
        }catch(err){
            console.log(err);
        }
    },
    removeSameCodeServiceProduct :function(component, event, helper){
        try{
            var streamName = event.getSource().get("v.value");
            var selectedTabID = component.set("v.selectedTabID");
            var selectedTabIndex = component.set("v.selectedTabIndex");
            var productIndex = event.getSource().get("v.name");
            var packageIndex = event.getSource().get("v.title");
            component.set("v.productIndex",productIndex);
            component.set("v.packageIndex",packageIndex);
            var wrapperdata = component.get("v.wrapperdata");
            //Disabling TAB in all Pickist
            var tabSelected = false;
            var productName  = ''
            var tabIds = [];
            
            var courseType = '';
            var liveClass = false;
            var TerritoryBassed = false;
            for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct){
                if(streamName == wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].key){
                    courseType = wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].courseType;
                    liveClass =  wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].liveClass;
                    TerritoryBassed =wrapperdata[productIndex].selectproductlist[packageIndex].serviceproduct[i].IsTerritoryBassed;
                }  
            }
            
            
            if(liveClass==true &&(courseType != 'NULL' || courseType != '' || courseType != null)){
                for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].productlist){
                    if(wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].courseType == courseType && wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].liveClass==true){
                        wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].isDisabled = true;
                    }else{
                        wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].isDisabled = false;
                    }
                }
            }
            
             if(liveClass==false){
                for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].productlist)
             {
                     
                        wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].isDisabled = false;
                    
                }
            }
            
            
            
            
            
            
            
            if((courseType == 'NULL' || courseType == null) && courseType!='' && liveClass==true){
                for(var i in wrapperdata[productIndex].selectproductlist[packageIndex].productlist){
                    wrapperdata[productIndex].selectproductlist[packageIndex].productlist[i].isDisabled = false;
                }
            }
            
            /* territory code start */
            //alert('here==> '+ TerritoryBassed);
            for (var i in wrapperdata) {
                for (var j in wrapperdata[i].selectproductlist) {
                    for (var k in wrapperdata[i].selectproductlist[j].productlist) {
                        if (TerritoryBassed == true) {
                            if(wrapperdata[i].selectproductlist[j].productlist[k].IsTerritoryBassed == false){
                                wrapperdata[i].selectproductlist[j].productlist[k].isDisabled = true;
                            }
                        }
                        else if (TerritoryBassed == false) {
                            if(wrapperdata[i].selectproductlist[j].productlist[k].IsTerritoryBassed == true){
                                wrapperdata[i].selectproductlist[j].productlist[k].isDisabled = true;
                            }
                        }
                        
                    }
                    
                    for (var k in wrapperdata[i].selectproductlist[j].serviceproduct) {
                        if (TerritoryBassed == true) {
                            if(wrapperdata[i].selectproductlist[j].serviceproduct[k].IsTerritoryBassed == false){
                                wrapperdata[i].selectproductlist[j].serviceproduct[k].isDisabled = true;
                            }
                        }
                        else if (TerritoryBassed == false) {
                            if(wrapperdata[i].selectproductlist[j].serviceproduct[k].IsTerritoryBassed == true){
                                wrapperdata[i].selectproductlist[j].serviceproduct[k].isDisabled = true;
                            }
                        }
                        
                    }
                }
            }
            // end */
           
            ///SHOWING POPUP FOR LIVE CLASS WITH DATE AND BATCH
            if(liveClass==true && wrapperdata[productIndex].selectproductlist[packageIndex].isBaseClass==true ){
                ////("LIVE CLASS");
                component.set("v.productTypeSelectedBatch","Service");
                wrapperdata[productIndex].selectproductlist[packageIndex].batchforService='';
                wrapperdata[productIndex].selectproductlist[packageIndex].batchDateForService='';
                wrapperdata[productIndex].selectproductlist[packageIndex].batchIdForService='';
                var productId = wrapperdata[productIndex].selectproductlist[packageIndex].productnameforservice;
                helper.getBatchAndDateForProducts(component, event, helper,productId);
            }
            component.set("v.wrapperdata",wrapperdata);
        }catch(err){
            console.log(err);
        }
    },
    closeBatchModal: function(component, event, helper){
        component.set("v.BatchAndLang",false);
        component.set("v.BatchDate",'');
        component.set("v.BatchLanguage",'');
        component.set("v.productTypeSelectedBatch",'');
    },
    saveBatch: function(component, event, helper){
        
        var wrapperdata = component.get("v.wrapperdata");
        var productIndex = component.get("v.productIndex");
        var packageIndex = component.get("v.packageIndex");        
        var BatchLanguage = component.get("v.BatchLanguage");
        var BatchDate = component.get("v.BatchDate");
        var batchId = '';
        var BatchAndDateForProducts = component.get("v.BatchAndDateForProducts");
        console.log("v.BatchAndDateForProducts"+ JSON.stringify(BatchAndDateForProducts));
        for( var i in BatchAndDateForProducts){
            if(BatchAndDateForProducts[i].section_language==BatchLanguage && BatchAndDateForProducts[i].section_start_date==BatchDate){
                batchId = BatchAndDateForProducts[i].id;
                // //(batchId);
                break;
            }
        }
        console.log("batchId--->"+batchId);
        if(BatchDate==''|| BatchLanguage==''){
            let toastEvent = $A.get('e.force:showToast');
            toastEvent.setParams({
                "type" : "error",
                "message" : "Please Select Values"
            });
            toastEvent.fire();
            return;
        }
        console.log("productIndex"+productIndex);
        console.log("packageIndex"+packageIndex);
        
        var productTypeSelectedBatch = component.get("v.productTypeSelectedBatch");
        if(productTypeSelectedBatch=='Product'){
            wrapperdata[parseInt(productIndex)].selectproductlist[parseInt(packageIndex)].batch = BatchLanguage;
            wrapperdata[parseInt(productIndex)].selectproductlist[parseInt(packageIndex)].batchDate = BatchDate;
            wrapperdata[parseInt(productIndex)].selectproductlist[parseInt(packageIndex)].batchId = batchId;
        }else if(productTypeSelectedBatch=='Service'){
            wrapperdata[parseInt(productIndex)].selectproductlist[parseInt(packageIndex)].batchforService = BatchLanguage;
            wrapperdata[parseInt(productIndex)].selectproductlist[parseInt(packageIndex)].batchDateForService = BatchDate;
            wrapperdata[parseInt(productIndex)].selectproductlist[parseInt(packageIndex)].batchIdForService = batchId;
        }
        
        console.log("Saved Batch Data ----> ",JSON.stringify(wrapperdata[parseInt(productIndex)].selectproductlist[parseInt(packageIndex)]));
        component.set("v.productTypeSelectedBatch",'');
        component.set("v.BatchAndLang",false);
        component.set("v.BatchDate",'');
        component.set("v.BatchLanguage",'');
        component.set("v.wrapperdata",wrapperdata);
    },
    /*  pushOrder: function(component, event, helper){
        var recordId = id1.toString();
        console.log("recordId--> "+recordId);
        
        var action=component.get("c.callPushOrder");
        action.setParams({
            "leadId" :recordId
        });
        action.setCallback(this, function(response) {                
            var state = response.getState();
            if(state=='SUCCESS'){ 
                //('OREDER PUSH '+response.getReturnValue());
                if(response.getReturnValue()=='success'){
                    //(state);
                    component.set("v.disableValidate",true);
                    let toastEvent = $A.get('e.force:showToast');
                    toastEvent.setParams({
                        "type" : "success",
                        "message" : "Order Pushed Successfully"
                    });
                    toastEvent.fire();
                    //refresh Component
                     setTimeout(function(){ 
                     $A.get('e.force:refreshView').fire();}, 2000); 
                }else{
                    let toastEvent = $A.get('e.force:showToast');
                    toastEvent.setParams({
                        "type" : "error",
                        "message" : "Error in pushing Order"
                    });
                    toastEvent.fire();
                }
                
                
            }                
        });
        $A.enqueueAction(action);
    },*/
    
    
    pushOrder: function(component, event, helper) {
        // //('kkkkkkkkkkk');
        /////('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
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
        var totalmop=component.get("v.totalmop");
        console.log(totalmop);
                
    
          var GSTno=component.get("v.GSTno")
         // alert(GSTno);
         var PANno=component.get("v.PANno")
         // alert(PANno);
        var customersp=component.get("v.customerSP22");
        console.log(customersp);
        
        var couponwrap=[];
        window.discountidis=0;//discountid
        window.discountcode=0;//discountcode
        window.dis_value=0;//for flat we are sending this
        window.coupontype=0;
        window.couponname='';
        
        if(couponobj){
            for(var i=0;i<couponobj.coupan.length;i++){
                if(couponobj.coupan[i].name==couponName){
                    console.log('kkkk');
                    window.couponname=couponobj.coupan[i].name;//couponname
                    
                    window.discountidis=couponobj.coupan[i].id;//discountid
                    console.log(discountidis+'1');
                    window.discountcode=couponobj.coupan[i].coupan;//discountcode
                    console.log(discountcode+'2');
                    window.dis_value=couponobj.coupan[i].dis_value;//for flat we are sending this
                    console.log(dis_value+'3');
                    window.coupontype=couponobj.coupan[i].type;
                    console.log(coupontype+'4');                    
                }
            } 
        }
        /////(finaldiscount);
        var finalamountforpercentage = 0;
        var leadid=id1.toString();
        if(component.get("v.couponSelected"))
            
            finalamountforpercentage=finaldiscount;
        
        
        var action=component.get("c.callPushOrders");
        action.setParams({
            "leadId":leadid,
            "totalmrp":totalamountmrp,
            "totalmop":totalmop,
             "GSTno":GSTno,
             "PANno": PANno,
            "customersp":customersp,
            "discountidis":discountidis,
            "discountcode":discountcode,
            "dis_value":dis_value,
            "coupontype":coupontype,
            "finalamountforpercentage":finalamountforpercentage,
            "couponname":couponname
        });
        
        action.setCallback(this, function(response)
                           {                
                               var state = response.getState();
                               console.log(state+'pushorder1');
                               // //(state);
                               if(state=='SUCCESS'){
                                   helper.orderintegartionapi(component, event, helper);
                                   var result = response.getReturnValue();
                                   component.set("v.disableValidate",true);
                                   let toastEvent = $A.get('e.force:showToast');
                                   toastEvent.setParams({
                                       "type" : "success",
                                       "message" : "Order Pushed Successfully"
                                   });
                                   toastEvent.fire();
                                   //refresh Component
                                   setTimeout(function(){
                                       var leadId = id1.toString();
                                       //Redirect CODE
                                       /* var evt = $A.get("e.force:navigateToComponent");
                                       evt.setParams({
                                           componentDef:"c:OrderSummary",
                                           componentAttributes:{
                                               oppRecordId:leadId,
                                               orderId : component.get("v.orderId")
                                           }
                                       }); 
                                       evt.fire();   */  
                                       var navEvt = $A.get("e.force:navigateToSObject");
                                       navEvt.setParams({
                                           "recordId": component.get("v.orderId"),
                                           "slideDevName": "detail"
                                       });
                                       navEvt.fire();
                                       //Redirect CODE
                                   }, 1000); 
                               }else{
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
    show : function(component, event, helper) {
         
        var GST= event.getParam("value");;
      // alert(GST);
        if(GST=='Yes')
        {
            var result=true;
     
      component.set("v.IsGST",result);
        //     alert('value of isGST is' +result);
        }
        else
        {
            var resut=false;
                component.set("v.IsGST",result);
        }
	},
    deleteLoanDetails: function(component, event, helper){
        var checkbox = event.getSource().get("v.value");
        //alert( checkbox);
      
//alert('kkkk1234');          
        var loan_Provider = event.getSource().get("v.name");
       // alert('kkkk1234'+loan_Provider); 
        if(loan_Provider == 'EMLOAN' )
        {
            var Callingpaymentmodeapi = component.get('v.Callingpaymentmodeapi');
            for(var i=0;i<Callingpaymentmodeapi.payment.length;i++)
            { if(Callingpaymentmodeapi.payment[i].p_name == 'E NACH')
            {
                Callingpaymentmodeapi.payment[i].isdis= checkbox;
               
            } 
            }
            component.set("v.Callingpaymentmodeapi",Callingpaymentmodeapi);
            
        }
        console.log("loan_Provider---> "+loan_Provider);
        var PaymentMode = component.get("v.PaymentMode");
        if(checkbox==false){
            component.set('v.truthy7',false);
            for(var i in PaymentMode.loanPaymentsWrapper){
                if(PaymentMode.loanPaymentsWrapper[i].name == loan_Provider){
                    var empty= [];
                    PaymentMode.loanPaymentsWrapper[i].downPayment = 0;
                    PaymentMode.loanPaymentsWrapper[i].monthlyEmiDeduction = 0;
                    PaymentMode.loanPaymentsWrapper[i].amount = 0;
                    PaymentMode.loanPaymentsWrapper[i].referenceId = '';
                    PaymentMode.loanPaymentsWrapper[i].totalEmi = 0;
                    PaymentMode.loanPaymentsWrapper[i].selectedDocuments = empty;
                    PaymentMode.loanPaymentsWrapper[i].isSelected = false;
                    break;
                }
            }
            
        }else if(checkbox==true){
            for(var i in PaymentMode.loanPaymentsWrapper){
                if(PaymentMode.loanPaymentsWrapper[i].name == loan_Provider){
                    PaymentMode.loanPaymentsWrapper[i].isSelected = true;
                    break;
                }
            }
        }
        component.set("v.PaymentMode",PaymentMode);
        helper.calculateBalancePaymentMode(component, event, helper);
    }, 
    savepayment: function(component, event, helper){
        
        var Emandatory = component.get("v.Emandatory");
        
          var refrenceidforAllLoan1= component.get('v.refrenceidforAllLoan');
        if(refrenceidforAllLoan1=='Yes')
        {
        
        
        
        var loan_Provider = event.getSource().get("v.title");
        var amountvalue = component.get("v.downPayment");
        
     
        if(loan_Provider != 'EMLOAN')
        {
           
           extramarksresdwonpay=0; 
            
        }
           
        if(extramarksresdwonpay>amountvalue && loan_Provider == 'EMLOAN')
        { 
           
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "error!",
                "message": "Amount cannot be less than"+ extramarksresdwonpay,
                "type": "error"
            });
            toastEvent.fire();
            
        }
        else
        {
           
             var PaymentMode = component.get("v.PaymentMode");
        console.log("loan_Provider---> "+loan_Provider);
        var docList = component.get("v.selectedDocuments");
        console.log("docList--> "+docList);
        
        var documents=[];
        
        for(var i in PaymentMode.loanPaymentsWrapper){
            if(PaymentMode.loanPaymentsWrapper[i].name === loan_Provider){
                documents = PaymentMode.loanPaymentsWrapper[i].selectedDocuments;
                break;
            }
        }
        
        if(documents.length<2 && docList.length<2){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "message": "Please Select atleast two document"
            });
            toastEvent.fire();
            return;
        }
        var allFiles = component.get("v.anyFile");
        var count = 0;
        for(var i in allFiles){
            if(loan_Provider == allFiles[i].title){
                 
                 count++
                if(count==2)
                {
                    
                   break;   
                }
            }  
        }
        if(count<2){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "message": "Please Upload atleast two Document"
            });
            toastEvent.fire();
            return;
        }
        console.log("BEFORE");
        var findatatemp = component.get('v.findata');
        if(!findatatemp || findatatemp.length == 0){
            findatatemp = [];
        }
        console.log("After");
        var selectschm = component.get("v.selectschm");
        var schemeid='';
        var schemewraper=component.get("v.selectLoanScheme");
        for( var i=0; i<schemewraper.length;i++)
        {
            if(schemewraper[i].ps_name==selectschm)
            {
                schemeid=schemewraper[i].ps_id;
                
            }
        }
        //var selectschm = component.get("v.selectschm");
        var confirmrefrenceid= component.get("v.confirmrefrenceid");
        var amount = component.get("v.amount");
        var downPayment = component.get("v.downPayment");
        var monthlyEmiDeduction = component.get("v.monthlyEmiDeduction");
        var referenceId = component.get("v.referenceId");
        var totalEmi = component.get("v.totalEmi");
        var documentsList = component.get("v.selectedDocuments");
        if(loan_Provider == 'EMLOAN'){
            selectschm = '1';
        }
        if(selectschm == undefined || selectschm == '' 
           || amount == ''|| amount == undefined){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "message": "Please fill all the details"
            });
            toastEvent.fire();
            return;
        }
       
         var valueForEmloan=component.get('v.manualAutomatic');
        
        for(var i in PaymentMode.loanPaymentsWrapper){
            if(PaymentMode.loanPaymentsWrapper[i].name === loan_Provider){
                PaymentMode.loanPaymentsWrapper[i].downPayment  =  downPayment;
                PaymentMode.loanPaymentsWrapper[i].monthlyEmiDeduction =  monthlyEmiDeduction;
                PaymentMode.loanPaymentsWrapper[i].amount =  amount;
                PaymentMode.loanPaymentsWrapper[i].referenceId =  referenceId;
                PaymentMode.loanPaymentsWrapper[i].totalEmi = totalEmi;
                PaymentMode.loanPaymentsWrapper[i].schemeid=schemeid;
                PaymentMode.loanPaymentsWrapper[i].schemeName=selectschm;
                PaymentMode.loanPaymentsWrapper[i].Emandatory=Emandatory;
                PaymentMode.loanPaymentsWrapper[i].Confirmrefrenceid=confirmrefrenceid;
                if(loan_Provider == 'EMLOAN'){
                    PaymentMode.loanPaymentsWrapper[i].loanmode=valueForEmloan;
                }
                else
                {
                   PaymentMode.loanPaymentsWrapper[i].loanmode='Not An Emloan';  
                }
                if(documents.length==0)
                    PaymentMode.loanPaymentsWrapper[i].selectedDocuments = docList;
            }
        }
        var emptyList = [];
        component.set("v.selectedDocuments",emptyList);
        component.set("v.PaymentMode",PaymentMode);
        console.log("PaymentMode-->checkLoanAmount "+JSON.stringify(PaymentMode));
        
        console.log('loan_Provider---> '+ loan_Provider);
        var tempobj = {};
        tempobj.Payment__c = component.get("v.Loan");
        if (component.find("fileId")) {
            var s = component.get("v.FilesUploaded");
            var fileName = "";
            var fileType = "";
            var fileCount=0;
            if (fileCount > 0) {
                for (var i = 0; i < fileCount; i++) 
                {
                    
                }
            }
        }
        component.set('v.truthy7',false);
        component.set('v.emloan',false);
        component.set('v.uploaddoc',true);
        component.set('v.Proceed',true);
        component.set('v.submitallpaymentdetails',true);
        component.set("v.amount",'');
        component.set("v.downPayment",'');
        component.set("v.monthlyEmiDeduction",'');
        component.set("v.referenceId",'');
        component.set("v.totalEmi",'');
             component.set("v.LoanMode",'');
        helper.calculateBalancePaymentMode(component, event, helper);
            
            
            
        }
        }
        else
        {
             var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'Error',
                message:'Reference id are not Same..',
                duration:'1500',
                key: 'info_alt',
                type: 'error',
                mode: 'pester'
        });
        toastEvent.fire(); 
        }
        
       
    },
    handleFilesChange: function(component, event, helper) {
        var fileName = "No File Selected..";
        var fileCount=component.find("fileId").get("v.files").length;
        var files='';
        if (fileCount > 0) {
            for (var i = 0; i < fileCount; i++){
                fileName = component.find("fileId").get("v.files")[i]["name"];
                files=files+','+fileName;
            }
        }
        else
        {
            files=fileName;
        }
        component.set("v.fileName", files);
    },
    
    handleFilesChange1: function(component, event, helper) {
        try{
            var fileName = component.get("v.fileName");
            var fileNameToShow = component.get("v.fileNameToShow");
            ////(fileNameToShow);
            var MAX_FILE_SIZE =5000000; //Max file size 5 MB 
            var CHUNK_SIZE =750000;
            var fileInput = event.getSource().get("v.files");
            ////( fileInput);
            var file = fileInput[0];
            
            var self = this;
            console.log("fileName--> "+fileName);
            if (file.size > MAX_FILE_SIZE) {
                let toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({
                    "type" : "erroe",
                    "message" : "File size exceeds 5MB"
                });
                toastEvent.fire();
                
                return;
            }else{
                var fileName = component.get("v.fileName");
                if (event.getSource().get("v.files").length > 0) {
                    component.set("v.showFile",true);
                    var name = event.getSource().get("v.files")[0]['name'];
                    var f;
                    if(name.length>15){
                        f= name.substring(0,15);
                    }else{
                        f=name;
                    }
                    fileNameToShow.push(f);                   
                    fileName.push(name);
                }
                component.set("v.fileNameToShow", fileNameToShow);
                component.set("v.fileName", name);
                helper.uploadHelper1(component, event,helper);
            }
        }catch(err)
        {
            console.log(err.message);
        }
    },
    
    
    showPreviewOne:function (component,event,helper){
       // alert('ok')
        console.log(event.target+'helooooooooooo');
       //alert(event.target.value)
        var loan_Provider = event.getSource().get("v.name");
        //alert(loan_Provider+'loan_Provider')
       console.log(URL.createObjectURL(event.getSource().get("v.files")[0]))
      //  var fileInput = event.getSource().get("v.files");
          //  	console.log('file input testing'+JSON.stringify(fileInput));
       // alert(event.target.files[0])
       // alert(URL.createObjectURL(event.target.files[0]))
       // alert(event.getSource().get("v.files").length )
      
       // let src = URL.createObjectURL(event.target.files[0]);
        //console.log(src+'src')
        let preview = document.getElementById(loan_Provider);
        console.log(preview+'preview')
         // alert('dan singh')
        preview.src = URL.createObjectURL(event.getSource().get("v.files")[0]);
        preview.style.display = "block";
        
         try{
            var fileName = component.get("v.fileName");
            var fileNameToShow = component.get("v.fileNameToShow");
            ////(fileNameToShow);
            var MAX_FILE_SIZE =5000000; //Max file size 5 MB 
            var CHUNK_SIZE =750000;
            var fileInput = event.getSource().get("v.files");
            	console.log('file input testing'+JSON.stringify(fileInput));
            var file = fileInput[0];
            console.log('Line 1653 '+JSON.stringify(file));
            var self = this;
            console.log("fileName--> "+fileName);
            if (file.size > MAX_FILE_SIZE) {
                let toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({
                    "type" : "erroe",
                    "message" : "File size exceeds 5MB"
                });
                toastEvent.fire();
                
                return;
            }else{
                var fileName = component.get("v.fileName");
                if (event.getSource().get("v.files").length > 0) {
                    component.set("v.showFile",true);
                    var name = event.getSource().get("v.files")[0]['name'];
                    console.log('line no 1670 '+name)
                    var f;
                    if(name.length>15){
                        console.log('if')
                        f= name.substring(0,15);
                    }else{
                        console.log('else')
                        f=name;
                    }
                    fileNameToShow.push(f);                   
                    fileName.push(name);
                }
                console.log(f+'line num ')
                component.set("v.fileNameToShow", fileNameToShow);
                component.set("v.fileName", name);
                helper.uploadHelper1(component, event,helper);
            }
        }catch(err)
        {
            console.log(err.message);
        }
        
        
       
    },
    paymnetModeObject: function(component, event,helper) {
        component.get("v.PaymentMode");
    },
    
    // uploaddoc
    
    uploadFiles: function(component, event,helper) {
        // ////('jkjkjk');
        // var paymentidis= component.get('v.paymentidis');
        //////('kk');
        
        if(component.find("fileId").get("v.files")==undefined)
        {
            helper.showMessage('Select files',false);
            return;
        }
        if (component.find("fileId").get("v.files").length > 0) {
            var s = component.get("v.FilesUploaded");
            var fileName = "";
            var fileType = "";
            var fileCount=component.find("fileId").get("v.files").length;
            if (fileCount > 0) {
                for (var i = 0; i < fileCount; i++) 
                {
                    helper.uploadHelper(component, event,component.find("fileId").get("v.files")[i]);
                }
            }
        } else {
            helper.showMessage("Please Select a Valid File",false);
        }
    },
    
    
    
    
    ///////////
    selectSchoolCode: function(component, event, helper)
    {
        var picklistName = event.getSource().get("v.value");
        var picklistIndex = event.getSource().get("v.title");
        console.log("picklistName---> "+picklistName);
        console.log("picklistIndex---> "+picklistIndex);
        
        var Siblingwrapperdata=component.get('v.Siblingwrapperdata');
        
        var index=event.getSource().get('v.value');
        const autoCompleteComponent = component.find("city-records");
        const selectedOption = autoCompleteComponent.get("v.selectedOption");
        
        var schoolcode =component.get('v.Leadobject.School_Code__c');
        var action=component.get("c.getschoolname");
        action.setParams({
            "schoolcode" :selectedOption
            
        });
        action.setCallback(this, function(response) {                
            var state = response.getState();
            if(state=='SUCCESS'){       
                var schoolname = response.getReturnValue();
                component.set('v.Leadobject.School_Name__c',schoolname);
                console.log('----');
                var lead33 = component.get("v.LeadMap");
                var autoCompleteComponent = component.find("city-records");
                //const selectedOption = autoCompleteComponent.get("v.selectedOption");
                lead33.SchoolCodeName = autoCompleteComponent.get("v.inputValue");
                lead33.SchoolCodeId = autoCompleteComponent.get("v.selectedOption");
                schoolName = lead33.SchoolCodeName;
                console.log('----'+autoCompleteComponent.get("v.selectedOption"));
                console.log('----'+autoCompleteComponent.get("v.inputValue"));
                component.set("v.LeadMap",lead33);
            }                
        });
        $A.enqueueAction(action);
        
    },
    
    
    
    OnsubmittingPaymentloan:function(component, event, helper)
    {
        component.set("v.fileName", 'No File Selected..');
        var leadid= id1.toString();
        
        var ordermenu=paymentfororder;
        ////(paymentfororder);
        if(paymentfororder=='Loan'){
            component.set('v.Loan.Payment_Mode__c','Loan')
            var loan=component.get("v.Loan");
            console.log(JSON.stringify( loan));
            var schm=component.get("v.selectschm");
            var action=component.get("c.insertpaymentmode");
            action.setParams({
                "Paymentobj" : loan,
                "leadid":leadid
            });
            action.setCallback(this, function(response) {                
                var state = response.getState();
                ////(state);
                if(state=='SUCCESS')
                {       
                    component.set("v.uploaddoc", true);    
                    var result = response.getReturnValue();
                    window.payidis=result;
                    var loan_1=component.get("v.Loan");
                    loan_1.Id = result;
                    component.set("v.Loan",loan_1);
                    console.log(JSON.stringify(loan_1));
                    component.set('v.Proceed',false);
                    component.set('v.submitallpaymentdetails',true);                    
                }                
            });
            $A.enqueueAction(action);
        }
        if(paymentfororder=='Online(Credit/Debit card/UPI/QR Code)')
        {
            var loan=component.get("v.Loan");
            component.set('v.Loan.Payment_Mode__c','Online Payment')
            
            var action=component.get("c.insertpaymentmode");
            action.setParams({
                "Paymentobj" : loan,
                "leadid":leadid
                
            });
            //////('kkkkkkkkkkkkkkkkkkkkk');
            action.setCallback(this, function(response) {
                
                var state = response.getState();
                ////(state);
                var result = response.getReturnValue();
                ////(result);
                
            });
            $A.enqueueAction(action);
        }
        
        if(paymentfororder=='Cheque')
        {
            var loan=component.get("v.Loan");
            component.set('v.Loan.Payment_Mode__c','Cheque')
            
            var action=component.get("c.insertpaymentmode");
            action.setParams({
                "Paymentobj" : loan,
                "leadid":leadid
                
            });
            //////('kkkkkkkkkkkkkkkkkkkkk');
            action.setCallback(this, function(response) {
                
                var state = response.getState();
                ////(state);
                var result = response.getReturnValue();
                ////(result);
                
            });
            $A.enqueueAction(action);
        }
        
        if(paymentfororder=='Cash')
        {
            var loan = component.get("v.Loan");
            component.set('v.Loan.Payment_Mode__c','Cash')
            
            var action=component.get("c.insertpaymentmode");
            action.setParams({
                "Paymentobj" : loan,
                "leadid":leadid
                
            });
            //////('kkkkkkkkkkkkkkkkkkkkk');
            action.setCallback(this, function(response) {
                
                var state = response.getState();
                ////(state);
                var result = response.getReturnValue();
                ////(result);
                
            });
            $A.enqueueAction(action);
        }
    },
    
    Onselectingscheme:function(component, event, helper)
    {
      //  alert(id+'uyui')
        
        if(id=='Bajaj Finserv'|| id=='Financepeer'||id=='Credenc'||id=='Techfino Capital'||id=='Propelled'|| id=='NACH')
        {
            var amount=component.get('v.amount');
            console.log('amount--> '+JSON.stringify(amount));
            var schm=component.get("v.selectschm");
            if(schm!='' && schm!=undefined && schm!=null)
            {
         /*   var amount=component.get('v.amount');
            console.log('amount--> '+JSON.stringify(amount));
            var schm=component.get("v.selectschm");*/
            var schmsplit=schm.split('/');
            var totalmonth= parseInt(schmsplit[0]);
            var paidofloanofinitialmonth=parseInt(schmsplit[1]);
            var NumberofEMI=Math.round(parseInt(totalmonth)-parseInt(paidofloanofinitialmonth));
            var MonthlyEMIDeduction = (parseInt(amount)/parseInt(totalmonth)).toFixed(2);
            var downpayment=Math.round((MonthlyEMIDeduction)*parseInt(paidofloanofinitialmonth));
            console.log("downpayment"+downpayment);
            console.log("downpayment"+NumberofEMI);
            console.log("downpayment"+MonthlyEMIDeduction);
            
            component.set('v.downPayment',downpayment);
            component.set('v.totalEmi',NumberofEMI);
            
            component.set('v.monthlyEmiDeduction', MonthlyEMIDeduction);
            }
            else
                {
                     component.set('v.downPayment',' ');
            component.set('v.totalEmi','Select Scheme');
            
            component.set('v.monthlyEmiDeduction', ' ');
                }
            
        }
        
        
        
    },
    gotoaddsiblingpage:function(component, event, helper)
    {//////('fill again');
        /////('hhhhhhhhh');
        //helper.updatelead(component,event,helper);
         component.set("v.toggleSpinner3", false); 
        
        component.set('v.disableOnLoad' ,true );
        component.set('v.truthy11' ,true );
         component.set('v.truthy12' ,false );
        //     //('kkekke');
        var fethAddress = component.get('c.doInit');
        // //(fethAddress);
        $A.enqueueAction(fethAddress);
        
        var q1=component.get("v.LeadMap");
        console.log(q1);
        component.set('v.Leadobject.Parent_Name__c ',q1[0].Parent_Name );
        component.set('v.Leadobject.FirstName',q1[0].FirstName);
        component.set('v.Leadobject.LastName',q1[0].LastName);
        
        component.set('v.Leadobject.Email',q1[0].Email); 
        component.set('v.Leadobject.Alternate_Email__c',q1[0].AlternateEmail); 
        component.set('v.Leadobject.MobilePhone',q1[0].StuMobilePhone); 
        component.set('v.Leadobject.School_Name__c',q1[0].Schoolname);
        component.set('v.Leadobject.Medium__c',q1[0].Mediumid);
        component.set("v.truthy5",false); 
        component.set("v.truthy4",true);
        component.set("v.editdata",true);
        /*    window.setTimeout(
            $A.getCallback(function() {
                var schoolCodeComp =component.find("city-records");
                console.log('---'+schoolCodeComp);
                schoolCodeComp.set("v.inputValue", q1[0].SchoolCodeName);
                schoolCodeComp.set("v.selectedOption", q1[0].SchoolCodeId);
            }), 2000
        );*/
        var schoolCodeComp =component.find("city-records");	
        console.log('---'+schoolCodeComp);	
        schoolCodeComp.set("v.inputValue", q1[0].SchoolCodeName);	
        schoolCodeComp.set("v.selectedOption", q1[0].SchoolCodeId);
        
        
    },
    
    onCancel:function(component, event, helper) 
    {
        window.history.back();
    },
    onCancelofsibling:function(component, event, helper) 
    {
        
        component.set("v.truthy12",false);  
        component.set("v.truthy11",true);
        window.location.reload();
        
    },
    
    updatedwrappercode:function(component, event, helper) {      
       // alert('testt Shipraa')
        var leadid=id1.toString();
    
      
        var getupdatedwrapperlead=component.get('v.Leadwrapperdata');
     //   alert(getupdatedwrapperlead + ' getupdatedwrapperlead');
     //   alert(component.get('v.Leadwrapperdata') + ' Leadwrapperdata');
        var index=event.getSource().get('v.value');
        console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
        
        console.log( JSON.stringify(getupdatedwrapperlead)+'');
        var leadOBJEC = getupdatedwrapperlead[index]
      
        //leadOBJEC.Zip_Postal_Code__c.toString();
        console.log("leadOBJEC--->"+JSON.stringify(leadOBJEC));
        var countrycode = component.get('v.countrycode');
        console.log('countrycode=> '+ countrycode);
        //alert(leadOBJEC.Medium__c+'leadOBJEC.Street__c=leadOBJEC.Street__c=');
        if(leadOBJEC.Street__c=='' || leadOBJEC.Street__c==undefined || leadOBJEC.City__c=='' || leadOBJEC.FirstName=='' ||leadOBJEC.LastName=='' ||leadOBJEC.Board__c==undefined ||leadOBJEC.Board__c=='' 
           ||leadOBJEC.School_Name__c=='' || leadOBJEC.Classs__c==''|| leadOBJEC.Classs__c==undefined|| (leadOBJEC.Zip_Postal_Code__c=='' && countrycode == '+91')||leadOBJEC.Parent_Contact_Number__c=='' || leadOBJEC.Parent_Contact_Number__c==undefined ||
                    leadOBJEC.Parent_ISD_Code__c=='' || leadOBJEC.Parent_ISD_Code__c==undefined||  leadOBJEC.Medium__c=='' || leadOBJEC.Medium__c==undefined){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                message: 'Please fill all the required fields',
                type: 'error',
            });
            toastEvent.fire();
            return;
        }
        
        
        
        var pincode = '';
        pincode += leadOBJEC.Zip_Postal_Code__c
        leadOBJEC.Zip_Postal_Code__c = pincode;
        console.log('...');
        
          if(pincode.length !=6 && pincode!= '' ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                      duration:' 100',
                    "message": "Please enter 6 digit PIN Code"
                });
                toastEvent.fire();               
            }
        
        
        var FlagContact=0;
        
           if(leadOBJEC.Parent_ISD_Code__c=='+91'){            
            if(leadOBJEC.Parent_Contact_Number__c.length!=10){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                      duration:' 100',
                    "message": "Please enter a valid phone number according to ISD code "
                });
                toastEvent.fire();    
                FlagContact=0;
            }       
              else 
              {
                 FlagContact=1; 
              }
        } 
        
          if(leadOBJEC.Parent_ISD_Code__c=='+971'){            
            if(leadOBJEC.Parent_Contact_Number__c.length!=9){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                      duration:' 100',
                    "message": "Please enter a valid phone number according to ISD code "
                });
                toastEvent.fire();     
                FlagContact=0;
            }       
              else
              {
                  FlagContact=1;
              }
        } 
        
        
        
        
        
        var parentcont=leadOBJEC.Parent_Contact_Number__c.length;
       // alert(parentcont)
        if(parseInt(parentcont)<9)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                message: 'Enter valid parent contact according to ISD code',
                type: 'error',
            });
            toastEvent.fire();
            return;
            
        }
        
        if(parseFloat(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c)>100){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                message: 'Aggregate percentage cannot be more than 100',
                type: 'error',
            });
            toastEvent.fire();
            return;
        }
        console.log(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c);
        if(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c != '' && leadOBJEC.Previous_Class_Performance_Aggregate_pe__c != null){
            //var regExpEmailformat =/^\d+\.\d{1,2}$/;
            console.log('...');
            var regExpEmailformat = /\d{1,2}\.?\d{1,2}/;
            console.log('...');
            var matchRegex = leadOBJEC.Previous_Class_Performance_Aggregate_pe__c;
            console.log(matchRegex);
            if(!matchRegex.toString().match(regExpEmailformat)){
                console.log('...');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Please Enter a Valid Aggregate percentage',
                    type: 'error',
                });
                toastEvent.fire();
                return;
            }
            console.log('...');
        }
        
        console.log(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c);
        ////(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c);
        if(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c != '' && leadOBJEC.Previous_Class_Performance_Aggregate_pe__c != null){
            var countDecimals = function(value) {
                if (Math.floor(value) !== value)
                    return value.toString().split(".")[1].length || 0;
                return 0;
            }
            console.log('...');
            console.log(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c.toString().includes('.'));
            var checkDecimal = leadOBJEC.Previous_Class_Performance_Aggregate_pe__c.toString().includes('.');
            var lengthDecimal = 0;
            if(checkDecimal == true)
                lengthDecimal = countDecimals(leadOBJEC.Previous_Class_Performance_Aggregate_pe__c);
            console.log('...w');
            if(lengthDecimal > 2){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Aggregate percentage must be upto 2 decimal places',
                    type: 'error',
                });
                toastEvent.fire();
                return;
            }
        }
        if(leadOBJEC.Alternate_Email__c != '' && leadOBJEC.Alternate_Email__c != null){
            var regExpEmailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
            if(!leadOBJEC.Alternate_Email__c.match(regExpEmailformat)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Please Enter a Valid Email Address',
                    type: 'error',
                });
                toastEvent.fire();
                return;
            }
        }
        if(pincode.length ==6 && FlagContact==1) { 
      //alert( ' leadidharjeet');
     //   alert(leadOBJEC + ' leadOBJEC');
        component.set("v.toggleSpinner1",true);
        var action=component.get("c.abcLead");
        action.setParams({
            "leadobj" :leadOBJEC,
            "parentid" :leadid
        });
        //////('kkkkkkkkkkkkkkkkkkkkk');
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            var result = response.getReturnValue();
            ////(response.getReturnValue());
         //   alert(state + ' stateee' );
       //     alert(response.getReturnValue() + ' response.getReturnValue');
       //     alert(component.get("v.Siblingwrapperdata").length + ' SiblingwrapperdataLength');
            
            if(state=="SUCCESS" && response.getReturnValue()!=null){
         //       alert('SHIiiiiiiiiiipraaa');
                if(!component.get("v.Siblingwrapperdata").length>0)
                    component.set("v.OrderSaved",true);
          //      alert('SHIiiiiiiiiiipraaa');
             
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Order Saved Successfully',
                    type: 'success',
                });
                toastEvent.fire();
                component.set("v.toggleSpinner1",false);
            }else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Order Not Saved',
                    type: 'error',
                });
                toastEvent.fire();
                component.set("v.toggleSpinner1",false);
            }
        });
        $A.enqueueAction(action);
        
        }
        
    },
    

    CheckPincode:function(component, event, helper){
        var pincode = event.getSource().get("v.value");
        //(pincode);
        var check = parseInt(pincode);
        
        if(isNaN(parseInt(pincode))){
            event.getSource().set("v.value",'');
        }else{
            event.getSource().set("v.value",parseInt(pincode));
        }
    }, 
    Numericnumber:function(component, event, helper){
       
           
        var Numbers = event.getSource().get("v.value");
     
        var check = parseInt(Numbers);
        
        if(isNaN(parseInt(Numbers))){
            event.getSource().set("v.value",'');
        }else{
            event.getSource().set("v.value",parseInt(Numbers));
        }
        
      
        
    },
    
 
    
    
    Siblingwrapperdata:function(component, event, helper) 
    {
        
        ////('heloooooo');
        var leadid=id1.toString();
        
        var Siblingwrapperdata=component.get('v.Siblingwrapperdata');
        
        var index=event.getSource().get('v.value');
        
        console.log("Siblingwrapperdata[index]---> "+JSON.stringify(Siblingwrapperdata[index]));
        
        //Checking Mandatory Fields
        var siblingData = Siblingwrapperdata[index];
        if(siblingData.Street__c ==undefined ||siblingData.Street__c =='' ||siblingData.FirstName__c =='' ||siblingData.Mobile_Number__c =='' ||
           siblingData.School_Name__c =='' ||siblingData.Pin_code__c =='' ||siblingData.City__c =='' ||
           siblingData.Board__c ==undefined ||  siblingData.Board__c =='' ||siblingData.Class__c =='' ||siblingData.Class__c ==undefined ||siblingData.Medium__c ==undefined ||siblingData.Medium__c ==''){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                message: 'Please fill all the required fields',
                type: 'error',
            });
            toastEvent.fire();
            return;
        }
        
        
        
        
        if(parseFloat(siblingData.Previous_Class_Performance_Aggregate_pe__c)>100){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                message: 'Aggregate percentage cannot be more than 100',
                type: 'error',
            });
            toastEvent.fire();
            return;
        }
        if(siblingData.Previous_Class_Performance_Aggregate_pe__c != '' && siblingData.Previous_Class_Performance_Aggregate_pe__c != null){
            //var regExpEmailformat =/^\d+\.\d{1,2}$/;
            var regExpEmailformat = /\d{1,2}\.?\d{1,2}/;
            if(!siblingData.Previous_Class_Performance_Aggregate_pe__c.toString().match(regExpEmailformat)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Please Enter a Valid Aggregate percentage',
                    type: 'error',
                });
                toastEvent.fire();
                return;
            }
        }
        
        if(siblingData.Previous_Class_Performance_Aggregate_pe__c != '' && siblingData.Previous_Class_Performance_Aggregate_pe__c != null){
            var countDecimals = function(value) {
                if (Math.floor(value) !== value)
                    return value.toString().split(".")[1].length || 0;
                return 0;
            }
            var checkDecimal = siblingData.Previous_Class_Performance_Aggregate_pe__c.toString().includes('.');
            var lengthDecimal = 0;
            if(checkDecimal == true)
                lengthDecimal = countDecimals(siblingData.Previous_Class_Performance_Aggregate_pe__c);
            if(lengthDecimal > 2){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Aggregate percentage must be upto 2 decimal places',
                    type: 'error',
                });
                toastEvent.fire();
                return;
            }
        }
       // alert('harjeetsb');
        var siblingOrderSavedCount = component.get("v.siblingOrderSavedCount");
        component.set("v.toggleSpinner2",true);
        var action=component.get("c.abcSibling");
        
        action.setParams({
            "siblingobj" :Siblingwrapperdata[index],
            "parentid" :leadid
        });
        
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            var result = response.getReturnValue();
            ////("SIBLING00--> "+result);
            if(result=='place parent order first'){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Order Not Create : Please Place Parent Order First',
                    type: 'error',
                });
                toastEvent.fire();
                component.set("v.toggleSpinner2",false);
                component.set("v.OrderSaved",true);
            }else if(result=='ordersucess'){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Order Saved Successfully',
                    type: 'success',
                });
                toastEvent.fire();
                component.set("v.toggleSpinner2",false);
                siblingOrderSavedCount += 1;
                console.log("siblingOrderSavedCount------> " +siblingOrderSavedCount);
                if(siblingOrderSavedCount == Siblingwrapperdata.length)
                    component.set("v.OrderSaved",true);
                component.set("v.siblingOrderSavedCount",siblingOrderSavedCount);
            }else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Order Not Saved',
                    type: 'error',
                });
                toastEvent.fire();
                component.set("v.OrderSaved",false);
            }
            
        });
        $A.enqueueAction(action);
    }
    ,
    
    
    dropdown:function(component, event, helper) 
    {
        var Leadwrapperdata =component.get('v.Leadwrapperdata');
        var index=event.getSource().get('v.value');
        //////(index+'kk');
        console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
        Leadwrapperdata[index].expanded = !Leadwrapperdata[index].expanded;    //True and false condition
        component.set('v.Leadwrapperdata',Leadwrapperdata);
        
    },
    
    dropdown1:function(component, event, helper) 
    {
        var Siblingwrapperdata =component.get('v.Siblingwrapperdata');
        var index=event.getSource().get('v.value');
        //////(index);
        console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
        
        
        Siblingwrapperdata[index].expanded = !Siblingwrapperdata[index].expanded;    //True and false condition
        component.set('v.Siblingwrapperdata',Siblingwrapperdata);
        
    },
    
    
    dropdownforproductlist:function(component, event, helper) 
    {
        var wrapperdata =component.get('v.wrapperdata');
        var index=event.getSource().get('v.value');
        //////(index);
        console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
        
        
        wrapperdata[index].expanded = !wrapperdata[index].expanded;    //True and false condition
        component.set('v.wrapperdata',wrapperdata);
        
    },  
    
    Deletedatasibling:function(component, event, helper) 
    {
        ////('heloooo89');
        var Siblingwrapperdata =component.get('v.Siblingwrapperdata');
        ////(Siblingwrapperdata+'1');
        var index=event.getSource().get('v.value');
        ////(index);
        var siblingdata = Siblingwrapperdata[index];  
        ////(siblingdata+'lllllllllllllllllllllllllllllllllllllllllllllll');
        //////(updatedlistofSiblingwrapperdata);
        
        var action=component.get("c.Deletesibling");
        action.setParams({
            'siblingdelete': siblingdata
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            //var Siblingwrapperdata123=Siblingwrapperdata.splice(index,1);
            //component.set('v.Siblingwrapperdata',Siblingwrapperdata.splice(index,1));
            
            //Adding Sibling data again
            helper.getsiblingrecord(component,event,helper);            
        });
        
        $A.enqueueAction(action);   
        
        
    },
    
  
    Deletedataforlead:function(component, event, helper) 
    {
        var Leadwrapperdata =component.get('v.Leadwrapperdata');
        var index=event.getSource().get('v.value');
        //////(index);
        if(index>=1)
        {
            //////(index+'insideifloop');
            var leaddata= Leadwrapperdata[index];  
            var action=component.get("c.Deletelead");
            action.setParams({
                'Deletelead': leaddata
                
            });
        }
        action.setCallback(this, function(response) {
            var state = response.getState();
            helper.getLeadrecord(component,event,helper);
            //var Leadwrapperdata1235=Leadwrapperdata.splice(index, 1);
            //component.set('v.Leadwrapperdata', Leadwrapperdata.splice(index, 1));
            
            //////(state);
            
        });
        
        $A.enqueueAction(action);   
        
        
    }, 
    
    
    
    dropdown3:function(component, event, helper) 
    {
        //////('he;lppppppppppppppp');
        var OrderlistviewWrapper =component.get('v.OrderlistviewWrapper');
        var index=event.getSource().get('v.value');
        //////(index);
        console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
        
        
        OrderlistviewWrapper[index].expanded = !OrderlistviewWrapper[index].expanded;    //True and false condition
        //component.set('v.Siblingwrapperdata',Siblingwrapperdata);
        
    },
    
    
    gotobasicsnaap:function(component, event, helper) 
    {
        component.set("v.truthy5", true); 
        component.set("v.truthy1", true);
        component.set("v.truthy", false); 
        component.set("v.ORDERLISTVIEW", false); 
        component.set("v.siblingshow", true);
        component.set("v.detailspageforbasicsnaap", false);
        component.set("v.truthy", false); 
        component.set("v.ORDERLISTVIEW", false); 
        component.set("v.siblingshow", true);  
        component.set("v.truthy6", false);
        component.set("v.truthy2", false);
        component.set("v.truthy3", false);
    }
    ,
    
    toggle : function(component, event, helper) {
        var toggleText = component.find("text");
        $A.util.toggleClass(toggleText, "slds-hide");
    },
    
    
    
    toggle : function(component, event, helper) {
        
        
        
        //var selectedItem = event.currentTarget; // Get the target object
        //var index = selectedItem.dataset.record; // Get its value i.e. the index
        // var index = event.target.dataset.index;
        var target = event.target;
        
        var dataEle = target.getAttribute("data-record");
        
        //////(dataEle);
        //var toggleText = component.find("text");
        // $A.util.toggleClass(index, "slds-hide");
    },
    
    
    removeRow: function(component, event, helper) {
        //Get the product list
        var accountList = component.get("v.accountList");
        
        var clsid=classidforselectingproduct;
        var size1=accountList.length;
        //////(size1+'beforedelete');
        for(var i=0; i<accountList.length; i++) {
            
            if (accountList[i].Class__c ==clsid) {
                accountList.splice(i, 1);
                component.set("v.accountList", accountList); 
                
            }
            
        } 
        var size2=accountList.length;
        //////(size2+'afterdelete');
        
        
        
    },
    
    
    /*addproductRecord: function(component, event) {
        //get the account List from component  
        var productList = component.get("v.orderlineobject");
        //////(classidforselectingproduct);
 
        //Add New Account Record
        productList.push({
            'sobjectType': 'Order_Lines__c',
            'Class__c': classidforselectingproduct,
            'Product_Id__c': '01t1s000000f2f2AAA',
            'Board__c': getboardid,
            'Order__c':getorderid
        });
        component.set("v.orderlineobject", productList);
    },*/
    
    addproductRecord: function(component, event) {
        //get the account List from component  
        var counter = component.get("v.counter_uniq");
        counter=counter+1;
        component.set("v.counter_uniq",counter);
        var counter = component.get("v.counter_uniq");
        //////(counter);
        var accountList = component.get("v.accountList");
        var mrpproduct = component.get("v.mrpproduct");
        var pro=component.get("v.accountList.Product_Id__c");
        //Add New Account Record
        accountList.push({
            'sobjectType': 'Order_Lines__c',
            'Class__c': classidforselectingproduct,
            'Product_Id__c':pro,
            'Board__c': getboardid,
            'Order__c':getorderid,
            'unique_id_c__c' :counter
        });
        //--------------------------------
        //////(classidforselectingproduct+pro+getboardid+getorderid);
        var action=component.get("c.productsectionfor_mrp_mop");
        action.setParams({
            'Class_id': classidforselectingproduct,
            'Product_Id':pro,
            'Board': getboardid,
            'Order':getorderid
        });
        //////('hello');
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            //////(state);
            component.set("v.mrpproduct", response.getReturnValue());
            var mrp_wrapper=component.get("v.mrpproduct");
            //////( mrp_wrapper[0].unique_id);
            
            mrpproduct.push({
                'unique_id' :counter,
                'product_id' : mrp_wrapper[0].product_id,
                'board_id' : mrp_wrapper[0].board_id,
                'class_id' : mrp_wrapper[0].class_id,
                'medium' :mrp_wrapper[0].medium 
            });
            console.log(mrpproduct) ; 
            component.set("v.mrpproduct", []);  
            component.set("v.mrpproduct", mrpproduct);
            //////(JSON.stringify(component.get("v.mrpproduct")));
        });
        
        component.set("v.accountList", []); 
        component.set("v.accountList", accountList);
        //////(JSON.stringify(component.get("v.accountList")));
        $A.enqueueAction(action);  
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    basisonboardselectclass:function(component, event, helper)
    {   var Leadwrapperdata =component.get('v.Leadwrapperdata');
     ////('Leadwrapperdata--->'+JSON.stringify(Leadwrapperdata));
     var index=event.getSource().get('v.value');
     //   //(index);
     //console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
     
     // var getboard=  Leadwrapperdata[index].Board__c;
     //  //////(getboard);
     
     var action=component.get("c.getClass");
     action.setParams({
         "boardid":index
     });
     //////('kk');
     action.setCallback(this, function(response) {
         var state = response.getState();
         //////(state);
         if (state === "SUCCESS") {
             var result = response.getReturnValue();
             //////(state);
             console.log(result)
             
             var flagMap = [];
             for(var key in result){
                 flagMap.push({key: key, value: result[key]});
                 
                 ////////(result[key]);
             }
             component.set("v.flagMap", flagMap);
         }
     });
     $A.enqueueAction(action);
     
     
    },
    
    basisonclassselectproduct:function(component, event, helper)
    { 
        window.classidforselectingproduct   = event.getSource().get("v.name");
        
        var classproduct= component.get("v.wrapperdata");                
        
        
        //////( classidforselectingproduct);
        //var getboard=component.get("v.orderlineobject.Product_Id__c");
        
        
        
        var action=component.get("c.basisonclassselect");
        action.setParams({
            "classid": classidforselectingproduct 
        });
        //////('hello');
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            //////(state);
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result)
                // console.log(result);
                var flagMap = [];
                for(var key in result){
                    flagMap.push({key: key, value: result[key]});
                    
                    ////////(result[key]);
                }
                //component.set("v.orderlineobjectflagMap9", flagMap);
                
                
                for(var i=0;i<classproduct.length;i++)
                {
                    if(classidforselectingproduct==classproduct[i].idis)
                    {
                        classproduct[i].productlist=flagMap ;
                        
                    }
                }
                component.set("v.wrapperdata", classproduct); 
                
                console.log(JSON.stringify(classproduct)+'classproductclassproductclassproduct');
                
            }
        });
        $A.enqueueAction(action);
        
        
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    gotoorderlistview:function(component, event, helper)
    {//////("function");
        helper.getorderlistrecord(component, event, helper);
        
        component.set("v.ORDERLISTVIEW",true);
        
        component.set("v.truthy1",false);
    },
    
    gotoorderlistview1:function(component, event, helper)
    {//////("function");
        helper.getorderlistrecord(component, event, helper);
        
        component.set("v.ORDERLISTVIEW",true);
        
        component.set("v.truthy2",false);
        
        component.set("v.truthy1",false);
    },
    
    selectorderlineitems:function(component, event, helper){
        
        var leadid1=id1.toString();
        ////(leadid1);
        var action7=component.get("c.ordersaveornot");
        action7.setParams({
            "leadid":leadid1
        });
        
        action7.setCallback(this, function(response) {
            var state = response.getState();
            ////(state);
            window.qord=response.getReturnValue();
            //(qord);
            var str = qord;
            var res = str.split(" ");
            
            window.parordlead=res[0]; 
            // //(parordlead);
            var qord1=res[1]+' '+res[2]+' '+res[3]; 
            ////(qord+'testt');
            if(qord1==='all orders placed')
            {
                
                // //('insidedata');
                component.set("v.ORDERLISTVIEW",true);
                
                component.set("v.truthy1",false);
                var leadid=id1.toString();
                //////(leadid+'lllllllllllllllllllllllllllllllllllllll'); 
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
                        console.log('Service PRoduct Wrapper'+JSON.stringify(q));              
                        component.set("v.wrapperdata",q);                
                    }
                });
                $A.enqueueAction(action);
                
                //Getting the List of Streams for 11th and 12th Class
                var action1=component.get("c.getStreamsForHigherClass");
                action1.setCallback(this, function(response) {
                    var state = response.getState();
                    //////(state)
                    if (state === "SUCCESS"){
                        var streamsSub = response.getReturnValue();
                        console.log("streamsSub---> "+JSON.stringify(streamsSub));
                        component.set("v.StreamsAndSubjectsForHigherClass",streamsSub);
                        var streamList = [];
                        for(var i in streamsSub){
                            var stream =  streamsSub[i].stream;
                            console.log("stream--> "+stream);
                            streamList.push(streamsSub[i].stream);
                        }
                        component.set("v.StreamsForHigherClass",streamList);
                    }
                });
                $A.enqueueAction(action1);
                // component.set("v.ORDERLISTVIEW",false);
                component.set("v.truthy",true);
                
                
            }
            if(qord==='ordernotplaced')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    message: 'Please Save Your Order',
                    type: 'error',
                });
                toastEvent.fire();
                return;
            }
            
        });
        $A.enqueueAction(action7);
        
        
        
        
        
    },
    backtoorderlistview:function(component, event, helper)
    {
        
        //////('hello');
        helper.getorderlistrecord(component, event, helper);
        component.set("v.ORDERLISTVIEW",true);
        component.set("v.truthy",false);
    },
    gotopage3:function(component, event, helper)
    {
        component.set("v.ORDERLISTVIEW",false);
        component.set("v.truthy1",false);  
        component.set("v.truthy6",true);  
        
    },
    
    backtoselectprouductlist:function(component, event, helper)
    {
        component.set("v.ORDERLISTVIEW",false);
        component.set("v.truthy1",false);  
        component.set("v.truthy6",false);
        component.set("v.truthy",true); 
        component.set("v.truthy2",false); 
    },
    
    
    
    gotopagefour1:function(component, event, helper){       
        ////('gotopagefour1');
        var wrp=component.get('v.wrapperdata');
        component.set("v.Applycoupon",'');
        component.set('v.DiscountPrice',0);
        console.log("wrpwrpwrpwrp---> "+JSON.stringify(wrp));
        //Validation for Empty products
        for(var i in wrp){
            for(var j in wrp[i].selectproductlist){
                if(wrp[i].selectproductlist[j].checkbox== true){
                    console.log("Products-->> "+JSON.stringify(wrp[i].selectproductlist[j]));
                    if(wrp[i].selectproductlist[j].productname==""){
                        if(wrp[i].selectproductlist[j].productnameforservice==""){
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                message: 'Please Enter Product for the Selected Classes',
                                type: 'error',
                            });
                            toastEvent.fire();
                            return;
                        }  
                    }
                    // Start Abhilash
                    
                        if(wrp[i].selectproductlist[j].classXIXII == true && wrp[i].selectproductlist[j].selectedstream == '' && wrp[i].selectproductlist[j].hardwareSelected==true){
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                message: 'Please select stream and subject',
                                type: 'error',
                            });
                            toastEvent.fire();
                            return;
                        }
                        if(wrp[i].selectproductlist[j].classXIXII == true  && wrp[i].selectproductlist[j].hardwareSelected==true && wrp[i].selectproductlist[j].selectedSubjects.length == 0){
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                message: 'Please select stream and subject',
                                type: 'error',
                            });
                            toastEvent.fire();
                            return;
                        }
                    // Abhilash
                    
                    //Cheking Batch Class and date
                    if(wrp[i].selectproductlist[j].productname !=''){
                        for(var k in wrp[i].selectproductlist[j].productlist){
                            if(wrp[i].selectproductlist[j].isBaseClass==true)
                            {
                            if(wrp[i].selectproductlist[j].productname == wrp[i].selectproductlist[j].productlist[k].key){
                                if(wrp[i].selectproductlist[j].productlist[k].liveClass==true && (wrp[i].selectproductlist[j].batch==''
                                                                                                  || wrp[i].selectproductlist[j].batchDate=='')){
                                    var toastEvent = $A.get("e.force:showToast");
                                    toastEvent.setParams({
                                        message: 'Please Enter Details for Batch Class',
                                        type: 'error',
                                    });
                                    toastEvent.fire();
                                    return;
                                }
                            }
                            }
                        }
                        console.log("wrp[i].selectproductlist[j].productnameforservice---> ",wrp[i].selectproductlist[j].productnameforservice);
                    }
                    if(wrp[i].selectproductlist[j].productnameforservice != ''){
                        console.log("Service Product test");
                        for(var k in wrp[i].selectproductlist[j].serviceproduct){
                             if(wrp[i].selectproductlist[j].isBaseClass==true)
                            {
                            if(wrp[i].selectproductlist[j].productnameforservice == wrp[i].selectproductlist[j].serviceproduct[k].key){
                                console.log("MATCH")
                                if(wrp[i].selectproductlist[j].serviceproduct[k].liveClass==true && (wrp[i].selectproductlist[j].batchforService==''
                                                                                                     || wrp[i].selectproductlist[j].batchDateForService==''))
                                {  var toastEvent = $A.get("e.force:showToast");
                                 toastEvent.setParams({
                                     message: 'Please Enter Details for Batch Class',
                                     type: 'error',
                                 });
                                 toastEvent.fire();
                                 return;
                                }
                            }
                            }
                        }
                    }
                }
            }
        }
        
        component.set("v.ORDERLISTVIEW",false);
        component.set("v.truthy1",false);  
        component.set("v.truthy6",false);
        component.set("v.truthy",false); 
        component.set("v.truthy2",true); 
        var mapwrp=[];
        var mapwrp1=[];
        console.log("WRAPPPPERRR   "+JSON.stringify(wrp));
        
        for(var j=0;j<wrp.length;j++){
            for(var i=0;i<wrp[j].selectproductlist.length;i++){
                console.log("electedproductList --> "+JSON.stringify(wrp[j].selectproductlist));
                if(wrp[j].selectproductlist[i].checkbox==true){
                    mapwrp.push(wrp[j].selectproductlist[i]);
                    if(wrp[j].selectproductlist[i].disabledtrue==true)
                    {
                        mapwrp1.push(wrp[j]);
                    }
                    console.log(wrp[j].selectproductlist[i].productnameforservice);
                } 
            }
        }
        console.log('MapWrarr'+JSON.stringify(mapwrp));
        console.log('MapWrarr1'+JSON.stringify(mapwrp1));
        ////(JSON.stringify(mapwrp));
        var orderisforall=[];
        
        //(wrp.length);
        for(var j=0;j<wrp.length;j++)
        {
            //('ll');
            orderisforall.push(wrp[j].orderid);
        }
       // alert(id1+'kkkkkkkkkkkkk')
        //(orderisforall);
        //(JSON.stringify(orderisforall));
        var action=component.get('c.method1');
        /* action.setParams({
            'wrapperproductdata' :mapwrp
        });*/
        action.setParams({
            'response' :JSON.stringify(mapwrp),
            'response1' :JSON.stringify(mapwrp1),
            'leadId':id1,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('success--->'+state);
            //  //('state--->'+state); 
            var q=response.getReturnValue();
            ////(q);
            console.log(JSON.stringify(q)+'jkjkjkjkjkjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
            console.log(q);
            window.productselectedforpayment=q;
            component.set('v.incomes',[]);              
            
            
            // Defining the columns to be used in lightning:datatable
            component.set('v.mycolumns', [
                {label: 'Class', fieldName: 'classname', type: 'text'},
                {label: 'Item Name', fieldName: 'Productname', type: 'text'},
                
                {label: 'MRP', fieldName: 'ProductMrp', type: 'text'},
                {label: 'MOP', fieldName: 'ProductMop', type: 'text'}
            ]);
            // Setting the incomes object with initial data to be included in datatable
            // Note tht fieldName in columns above are used as key values while inserting records
            
            
            //component.set('v.incomes',  q);
            
            
            component.set('v.mycolumns1', [
                {label: 'Class', fieldName: 'classname', type: 'text'},
                {label: 'Item Name', fieldName: 'Productname', type: 'text'},
                
                {label: 'MRP', fieldName: 'ProductMrp', type: 'text'},
                {label: 'MOP', fieldName: 'ProductMop', type: 'text'}
            ]);
            
            // Setting the incomes object with initial data to be included in datatable
            // Note tht fieldName in columns above are used as key values while inserting records
            
            // component.set('v.incomes', q);
            
            var dataformrpandmop=q;
            //  //(parordlead);
            console.log(parordlead);
            var father=[];
            var child=[];
            var child1=[];
            var child2=[];
            var child3=[];
            //1,2,3 
            
            //(orderisforall.length);           
            for(var i=0;i<orderisforall.length;i++){
                for(var i=0;i<dataformrpandmop.length;i++)
                {
                    
                    if(dataformrpandmop[i].orderid==orderisforall[0])
                    {
                        father.push({ProductMop:dataformrpandmop[i].ProductMop,
                                     ProductMrp:dataformrpandmop[i].ProductMrp,
                                     Productname:dataformrpandmop[i].Productname,
                                     classname:dataformrpandmop[i].classname
                                    });
                        component.set('v.ordername1', dataformrpandmop[i].ordername); 
                        //alert(component.get('v.ordername1'));
                        
                       
                    }
                    if(dataformrpandmop[i].orderid==orderisforall[1])
                    {
                        component.set('v.sib1', true);
                        child.push({ProductMop:dataformrpandmop[i].ProductMop,
                                    ProductMrp:dataformrpandmop[i].ProductMrp,
                                    Productname:dataformrpandmop[i].Productname,
                                    classname:dataformrpandmop[i].classname
                                   });
                        component.set('v.ordername2', dataformrpandmop[i].ordername);   
                    }
                    if(dataformrpandmop[i].orderid==orderisforall[2])
                    {
                        component.set('v.sib2', true);
                        child1.push({ProductMop:dataformrpandmop[i].ProductMop,
                                     ProductMrp:dataformrpandmop[i].ProductMrp,
                                     Productname:dataformrpandmop[i].Productname,
                                     classname:dataformrpandmop[i].classname
                                    });
                        component.set('v.ordername3', dataformrpandmop[i].ordername);   
                    }
                    if(dataformrpandmop[i].orderid==orderisforall[3])
                    {
                        component.set('v.sib3', true);
                        child2.push({ProductMop:dataformrpandmop[i].ProductMop,
                                     ProductMrp:dataformrpandmop[i].ProductMrp,
                                     Productname:dataformrpandmop[i].Productname,
                                     classname:dataformrpandmop[i].classname
                                    });
                        component.set('v.ordername4', dataformrpandmop[i].ordername);   
                    }
                    
                    
                    
                     if(dataformrpandmop[i].orderid==orderisforall[4])
                    {
                        component.set('v.sib4', true);
                        child3.push({ProductMop:dataformrpandmop[i].ProductMop,
                                     ProductMrp:dataformrpandmop[i].ProductMrp,
                                     Productname:dataformrpandmop[i].Productname,
                                     classname:dataformrpandmop[i].classname
                                    });
                        component.set('v.ordername5', dataformrpandmop[i].ordername);   
                    }
                    
                    
                }
            }
            console.log('fathersss'+JSON.stringify(father));
            console.log('childssss'+JSON.stringify(child));
            component.set('v.incomes', father);
            component.set('v.incomes1', child);
            component.set('v.incomes2', child1);
            component.set('v.incomes3', child2);
            component.set('v.incomes4', child3);
            
            var dataformrpandmop=q;
            var totalMRP = 0;
            var totalMOP = 0;
             var totalHardwareMOP = 0;
            // Calculating the total income by adding the amount of each income record
            for(var i=0;i<dataformrpandmop.length;i++)
            {
                
                //alert(dataformrpandmop[i].hardwareproduct+'dataformrpandmop[i].hardwareproduct')
                totalMRP += parseInt(dataformrpandmop[i].ProductMrp);
                if(dataformrpandmop[i].hardwareproduct==='false')
                {
                    totalMOP += parseInt(dataformrpandmop[i].ProductMop);
                   // alert('test'+totalMOP);
                }
                 else
                 {
                    
                    totalHardwareMOP += parseInt(dataformrpandmop[i].ProductMop);
                   // alert('test'+totalHardwareMOP);
                }
                
                
            }
            component.set('v.mopForHardwareProduct',parseInt(totalHardwareMOP));
            
            helper.getTotalMinimumAmtForHardware(component, event,  dataformrpandmop); // Abhilash  minimum amt to be collected in case of hardware product
            
            component.set('v.totalmrp',totalMRP);
            component.set('v.totalmop',totalMOP);
           // component.set('v.customerSP22',0);
           component.set('v.customerSP22','Enter Selling price...');
            component.set('v.couponSelected',false);
            
            
        });
        $A.enqueueAction(action); 
    }, 
    
    
    
    //applycode
    
    applycode:function(component, event, helper)
    {
        var coupansl= component.get("v.couponSelected");
       
        if(!coupansl)
        {
            component.set("v.Applycoupon",'');
        }
        
        
        var tmrp=component.get("v.totalmrp");
        var tmop=component.get("v.totalmop"); 
        var tsell=component.get("v.customerSP22");
        var costofhardwaremop=component.get("v.mopForHardwareProduct");
        var totalmopofhardwareandsoftware=parseInt(costofhardwaremop)+parseInt(tmop);
        
        var copan
        var leadid=id1.toString();
        if(tsell !='' && tsell !='0' && tsell !=0 ){
            var action=component.get("c.Applycoupon");
            action.setParams({
                'tmrp': tmrp,
                'tmop':totalmopofhardwareandsoftware,
                'tsell':tsell,
                'parentid':leadid
            });
            //////('hello');
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                
                //////(state); 
                var q=response.getReturnValue();
                //////(q);
                if(!coupansl)
                {
                     
                    component.set("v.Applycoupon",q);
                } ////(JSON.stringify(q));
                console.log(JSON.stringify(q));
                
            }); 
            $A.enqueueAction(action);  
        }
    },
    
    selectcoupon:function(component, event, helper)
    
    {
        var couponis= component.get("v.Applycoupon"); 
       
        //var couponnumberis=component.get("v.ordercoupon");
        var deltmrp=component.get("v.totalmrp");
        var couponnumberis=component.find("PicklistId").get("v.value");
         
        if(couponnumberis == ''){
            component.set("v.couponSelected",false);
            component.set("v.customerSP22",deltmrp);
            component.set("v.Applycoupon",'');
            component.set('v.DiscountPrice',0);
        }else{
            component.set("v.couponSelected",true);
        }
        
        var al=couponis.coupan.length;
        ////(al);
        for(var i=0;i<couponis.coupan.length;i++)
        {////(couponnumberis+'lll');
            ////(couponis.coupan[i].coupan);
            if(couponis.coupan[i].name==couponnumberis)
            { 
                if(couponis.coupan[i].type=='Percentage')
                {  //(couponis.coupan[i].type);
                    //alert('ok percentage')
                    window.couponid=couponis.coupan[i].id;
                    window.coponlabel=couponis.coupan[i].coupan;
                    var valueforfindingper=100;
                    var totalmrp=component.get('v.totalmop');
                    var discountvalue=parseInt(couponis.coupan[i].dis_value); 
                    var afterdiscount=discountvalue/valueforfindingper;
                    //(afterdiscount);
                    window.finaldiscount=afterdiscount*totalmrp;
                    
                    var finaldiscountis=Math.round(totalmrp-finaldiscount);
                    component.set('v.DiscountPrice',finaldiscountis);
                    //(finaldiscountis);
                    var mopForHardwareProduct=component.get('v.mopForHardwareProduct');
                    if(mopForHardwareProduct==0)
                    {
                        component.set('v.customerSP22',finaldiscountis);
                        component.set('v.customerSP24',finaldiscountis);  
                    }
                    else
                    {
                          component.set('v.customerSP22',finaldiscountis+parseInt(mopForHardwareProduct));
                        component.set('v.customerSP24',finaldiscountis+parseInt(mopForHardwareProduct)); 
                    }
                    
                    
                    
                }
                
                if(couponis.coupan[i].type=='Flat')
                { 
                    //alert('ok flat');
                    window.couponid=couponis.coupan[i].id;
                 window.coponlabel=couponis.coupan[i].coupan;
                 var discountvalue=parseInt(couponis.coupan[i].dis_value); 
                 var totalmrp=component.get('v.totalmop');
                 
                 if(parseInt(discountvalue)>parseInt(totalmrp))
                 {
                     
                      component.set("v.couponSelected",false);
            component.set("v.customerSP22",deltmrp);
            component.set("v.Applycoupon",'');
                    // component.set("v.ordercoupon",'');
                     
            component.set('v.DiscountPrice',0);
                      var toastEvent = $A.get("e.force:showToast");
                                 toastEvent.setParams({
                                     message: 'Offer is not applicable for this Mop',
                                     type: 'error',
                                 });
                                 toastEvent.fire();
                                 return;
                                
                 }
                 
                               
                 var finalamountafterdiscount=Math.round(totalmrp-discountvalue);
                   component.set('v.DiscountPrice',finalamountafterdiscount);
                 window.finaldiscount = 0; 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 var mopForHardwareProduct=component.get('v.mopForHardwareProduct');
                    if(mopForHardwareProduct==0)
                    {
                       component.set('v.customerSP22',finalamountafterdiscount);
                 component.set('v.customerSP24',finalamountafterdiscount);  
                    }
                 else
                 {
                      component.set('v.customerSP22',finalamountafterdiscount+parseInt(mopForHardwareProduct));
                 component.set('v.customerSP24',finalamountafterdiscount+parseInt(mopForHardwareProduct));
                 }
                
                 
                }
                break;
                /* ////(totalmrp)
             ////(discountvalue);

        var typeofcoupon= couponis.coupan[i].type;
                ////(typeofcoupon);*/
            }     
            
        }
        
    } ,
    
    /*  gotopagefour:function(component, event, helper)
    {
         component.set("v.ORDERLISTVIEW",false);
        component.set("v.truthy1",false);  
        component.set("v.truthy6",false);
        component.set("v.truthy",false); 
        component.set("v.truthy2",true); 
       
         //helper.submitallproductrecords(component, event, helper);
        //////('ooo');
        //----------------------------get mrp mop response
        
        //ambuj sir
       //var wrp=component.get('v.wrapperdata');
        var productlist=component.get("v.mrpproduct");
        //////(JSON.stringify(component.get("v.mrpproduct")));
        var productid=component.get("addproductRecord");
        var action=component.get("c.mrp_mop");
        action.setParams({
            'ob': productlist,
            'pid':productid
        });
        //////('hello');
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            //////(state); 
             var q=response.getReturnValue();
            //////(q);
            console.log(q);
  component.set('v.incomes',[]);               
        // Defining the columns to be used in lightning:datatable
        component.set('v.mycolumns', [
            {label: 'SNo.', fieldName: 'Productuniqueid', type: 'text'},
            {label: 'Product Name', fieldName: 'Productname', type: 'text'},
            {label: 'MRP', fieldName: 'ProductMrp', type: 'text'},
             {label: 'MOP', fieldName: 'ProductMop', type: 'text'}
        ]);
        // Setting the incomes object with initial data to be included in datatable
        // Note tht fieldName in columns above are used as key values while inserting records
     
        component.set('v.incomes',  q);
            	var incomes = component.get('v.incomes');
		var totalMRP = 0;
            var totalMOP = 0;
		// Calculating the total income by adding the amount of each income record
		for(var i=0;i<incomes.length;i++) {
			totalMRP += parseInt(incomes[i].ProductMrp);
            totalMOP += parseInt(incomes[i].ProductMop);
		}
            component.set('v.totalmrp',totalMRP);
                        component.set('v.totalmop',totalMOP);

            
            //////(totalMRP +'totalMRP ');
            //////(totalMOP+'totalMOP ' );
            
            
            
        });
        $A.enqueueAction(action);  
        
    },*/
    
    
    
    deleteSlctd : function(component,event,helper) {
        // var getCheckAllId = component.find("cboxRow");
        var selctedRec = [];
        
        
        
        
        
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            //////("You selected: " + selectedRows[i].Productuniqueid);
        }
        /*for (var i = 0; i < incomes.length; i++) {
            
            if(incomes[i].Productuniqueid == true )
            {
                selctedRec.push(incomes[i].Productuniqueid); 
            }
        }
         //////(selctedRec);*/
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    openrecordform:function(component, event, helper)
    {//////('kkkk');
        var label= event.target.id;
        //////(label);
        var label1=label.toString();
        var text1=label1.split('*');
        //////(text1.length);
        //////(text1[0]);
        window.labelsoflist=text1[0];
        
        
        
        
        var leadid=id1.toString();
        //////(leadid); 
        
        if (text1[1]=='lead')
        {
            
            
            //////('leadfffffffffffffffffffffffffffffffffffffff');
            
            helper.getleadfordetailpage(component, event,  text1[0]);
            
        }
        if(text1[1]=='siblingrecord')
        {
            //////('hello');
            helper.getsiblingfordetailpage(component, event, text1[0]);
        }  
        
        
        
        
        
        
        
        
        
        
        
        
        ////////(select);
        
        //  var siblingid== event.target.text;
        //  //////(siblingid+'siblingid'); 
        
        // var  = component.find("checkbox");
        ////////(checkboxes);
        //var label=checkbox.get("v.label");
        //  //////(label+'label');
        /* var siblingid=checkbox.get("v.text");*/
        
        
        
    },
    
    
    addsibling :function(component, event, helper) {
          component.set("v.AddSib",false);
        var lead = component.get("v.Leadobject");
        var IsError = false;
        
        //schoolCodeComp.set("v.inputValue", q1[0].SchoolCodeName);
        //    schoolCodeComp.set("v.selectedOption", q1[0].SchoolCodeId);
        if( lead.FirstName == undefined || lead.FirstName == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadFirstName",'Please Enter the First Name');
            IsError = true;
        }else if( lead.LastName == undefined || lead.LastName == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadLastName",'Please Enter the Last Name');
            IsError = true;
        }else if( lead.MobilePhone == undefined || lead.MobilePhone == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadMobileName",'Please Enter the Mobile Number');
            IsError = true;
        }else if( lead.School_Name__c == undefined || lead.School_Name__c == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadSchoolName",'Please Enter the school name');
            IsError = true;
        } 
            else if( lead.Email == undefined || lead.Email == '' ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please Fill Mandatory Fields"
                });
                toastEvent.fire();
                console.log("lead.FirstName ERR");
                helper.handleError(component,event,helper,"leadEmailName",'Please enter Email');
                IsError = true;
                return;
            }
        if(lead.Alternate_Email__c !='' && lead.Alternate_Email__c!=null){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(lead.Alternate_Email__c) == false) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter a valid email format"
                });
                toastEvent.fire();
                return;
            }
        }
        
        
        
        if(IsError==true){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "message": "Please Fill Mandatory Fields"
            });
            toastEvent.fire();
            return;
        }
        
        helper.updatelead(component,event,helper);
        //////('jjjjjjjjj');
        var counting=1;
        var countsibling= component.get("v.count");
        //////(countsibling+'countsib');
        
        
        var total=countsibling+counting;
        //////(total+'total');    
        component.set("v.count",total);
        
        component.set("v.editdata",false);
        
        var data= component.get("v.mapget");
        console.log(data);
        //var name=component.get("v.Leadobject.FirstName");
        component.set("v.Leadobject.FirstName",'');
        // //////(firstname+"firstname");
        component.set("v.Leadobject.LastName",'');
      
        component.set("v.Leadobject.Alternate_Email__c" ,'');
         component.set("v.Leadobject.Secondary_Mobile_Number__c" ,'');
       
         var IsDifferentPhone= component.get("v.IsDifferentPhone");
       
        if(IsDifferentPhone=='True')
         {
             component.set("v.Leadobject.Email" , '');  
              component.set("v.Leadobject.MobilePhone" , '');
         }
         var IsSamePhone= component.get("v.IsSamePhone");
        if(IsSamePhone == 'True')
        {
          //  alert(IsSamePhone +' IsSamePhone');
              component.set("v.Leadobject.Email" , parentemail);  
             component.set("v.Leadobject.MobilePhone" , parentnum); 
        }
        
        component.set("v.Leadobject.School_Name__c" ,'');
        component.set("v.Leadobject.Medium__c" ,'');
        component.set("v.Leadobject.Language__c" ,'');
        component.set("v.Leadobject.School_Code__c" ,'');
        component.set("v.disablecity" ,false);
        //////('jjjjjjjjj1111111111111111111111111');
        
        //component.set("v.Leadobject.School_Name__c" ,' ');
        //component.set("v.Leadobject.Medium__r.name" ,q1[0].Medium);
        component.set("v.Leadobject.Language__c" ,'');
        
        component.set("v.Leadobject.Country__c" ,Country);
        
        
        component.set("v.Leadobject.Board__c" ,'');
        
        component.set("v.Leadobject.Classs__c" ,'');
        
        component.set("v.Leadobject.Medium__c" ,'');
        
        component.set("v.Leadobject.Street__c" ,'');
        
        component.set("v.Leadobject.Zip_Postal_Code__c" ,'');
        
        component.set("v.Leadobject.City__c" ,parcity);
        //////('jjjjjjjjj');
        
        component.set("v.Leadobject.States__c" ,'');
        
        
        component.set("v.Leadobject.Any_Siblings" ,'');
        
        component.set("v.truthy11",false);
        component.set("v.truthy12",true);   
        var cityComp =component.find("city-record");	
        cityComp.set("v.inputValue", '');	
        cityComp.set("v.selectedOption", ''); 
        
        var schoolCodeComp =component.find("city-records");	
        schoolCodeComp.set("v.inputValue", '');	
        schoolCodeComp.set("v.selectedOption", ''); 
        
        
        
        
    },
    
    
    
    
    
    
    
    updatedata1: function(component, event, helper) {
        ////////('hhhh');
        window.updateEmailSibling=component.get("v.Leadobject.Email");
        Window.Upadatemobilenumsibling= component.get("v.Leadobject.MobilePhone");
        
        
    },
    
    
    
    addsibling1 :function(component, event, helper) {
        var mobilenum= component.get("v.Leadobject.MobilePhone");
	var emaillead = component.get("v.Leadobject.Email");
     /*   if(testmobile==mobilenum)
        {
            alert('error plz enter');
        }*/
        var validate = helper.validateInput(component, event, helper);
        ////(":: validate :: "+validate);
        ////("validate "+validate);
     if (validate){
    
         //Added by gopal singh
      if(emaillead != ''){
      var validateemmo = false;
      ///// EMAIL CHECK /////
      var action1 = component.get("c.getleadEmail");
    	  action1.setParams({emaille: emaillead });
      	  action1.setCallback(this, function(response) {
          var stateval = response.getState();
           // alert(stateval+'  stateval');
        if (stateval === "SUCCESS") {
          var resultval = response.getReturnValue();
            //alert(JSON.stringify(resultval)+'  email');
          if(resultval == false){              
			//alert(JSON.stringify(resultval)+'  email already exist ');
              helper.displayErr(component, event, helper, 'Enter New Email');
              validateemmo = false;
          } else {
              
              
              /////     MOBILE CHECK ////
              var action2 = component.get("c.getleadMobileNumber");
    	action2.setParams({lednum: mobilenum});
      	action2.setCallback(this, function(response) {
          var stateval1 = response.getState();
           // alert(stateval1+'  stateval mobile');
            if (stateval1 === "SUCCESS") {
              var resultval1 = response.getReturnValue();
              //alert(resultval1+'  mobile11');
              if(resultval1 == false){ 
                  
               // alert(JSON.stringify(resultval1)+'  mobile already exist ');
                  helper.displayErr(component, event, helper, 'Enter New Mobile Number');
                  validateemmo = false;
              } else {
                  component.set("v.toggleSpinner3", true);
                  var action = component.get("c.data");
                  action.setParams({
                    mobilenum: mobilenum
                  });
            
                  action.setCallback(this, function(response) {
                    var state = response.getState();
                    ////(state);
                    if (state === "SUCCESS") {
                      var result = response.getReturnValue();
                        //alert('result==>'+ result);
                      //if (result == "System.QueryException: List has no rows for assignment to SObject") {
                        ////('noduplicate lead');
                        if(result == "true"){
                        helper.LeadCreate(component, event, helper);
                      } else {
                          helper.displayErr(component, event, helper, 'Enter New Mobile Number');
                          component.set('v.toggleSpinner3',false)
                        //leadexist
                        //helper.siblingCreate(component, event, helper);
                      }
            
                      /* component.set("v.flagMap", flagMap);*/
                    }
                  });
                  $A.enqueueAction(action);
              }
            }
          });
          $A.enqueueAction(action2);
          
          }
        }
      });
      $A.enqueueAction(action1);
     } else {
         //alert('mobile else');
         /////     MOBILE CHECK ////
        var action2 = component.get("c.getleadMobileNumber");
    	action2.setParams({lednum: mobilenum});
      	action2.setCallback(this, function(response) {
          var stateval1 = response.getState();
            //alert(stateval1+'  stateval mobile');
        	if (stateval1 === "SUCCESS") {
              var resultval1 = response.getReturnValue();
                //alert(resultval1+'  mobile2');
              if(resultval1 == false){ 
                  
                //alert(JSON.stringify(resultval1)+'  mobile already exist ');
                  helper.displayErr(component, event, helper, 'Enter New Mobile Number');
                  validateemmo = false;
              } else {
          
              component.set("v.toggleSpinner3", true);
              var action = component.get("c.data");
              action.setParams({
                mobilenum: mobilenum
              });
        
              action.setCallback(this, function(response) {
                var state = response.getState();
                ////(state);
                if (state === "SUCCESS") {
                  var result = response.getReturnValue();
                    //alert('result2==>'+ result);
                  //if (result =="System.QueryException: List has no rows for assignment to SObject") {
                  if(result == "true"){
                    ////('noduplicate lead');
                    //
                    helper.LeadCreate(component, event, helper);
                  } else {
                    //leadexist
                    helper.displayErr(component, event, helper, 'Enter New Mobile Number');
                    component.set('v.toggleSpinner3',false)
                    //helper.siblingCreate(component, event, helper);
                  }
        
                 
                }
              });
              $A.enqueueAction(action);
          }
            }
          });
          $A.enqueueAction(action2);
     }
      
    }
  },
    
    //End by gopal singh
    
  /* addsibling1 : function(component, event) {
        var action = component.get("c.data");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
             if(result=='System.QueryException: List has no rows for assignment to SObject')
    {
    //////('noduplicate lead');
    
}
 else
 {
     //////('duplicate lead');
 }
              
                component.set("v.flagMap", flagMap);
            }
        });
          $A.enqueueAction(action);
      },*/
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    updatedata: function(component, event, helper) {
        
        
        var Any_Siblings__c= component.get("v.Leadobject.Any_Siblings__c");
        //component.set("v.Leadobject.Any_Siblings__c",Any_Siblings__c);
        ////////(Any_Siblings__c);
        var Email= component.get("v.Leadobject.Email");
        var Alternate_Email__c= component.get("v.Leadobject.Alternate_Email__c");
        var School_Name__c= component.get("v.Leadobject.School_Name__c");
        
        
        
        
        var firstname= component.get("v.Leadobject.FirstName");
        ////////(firstname+"firstname");
        var Lastname= component.get("v.Leadobject.LastName");
        ////////(Lastname+"lastname");
        var Board__c= component.get("v.Leadobject.Board__c");
        // //////(Board__c +"Board__c");
        var Classs__c= component.get("v.Leadobject.Classs__c");
        ////////(Classs__c+"Classs__c");
        var Medium__c= component.get("v.Leadobject.Medium__c");
        ////////(Medium__c+"Medium__c");
        var MobilePhone= component.get("v.Leadobject.MobilePhone");
        ////////(MobilePhone+"MobilePhone");
        var Sibling_Name__c= component.get("v.Leadobject.Sibling_Name__c");
        ////////(Sibling_Name__c+"Sibling_Name__c");
        var Sibling_Classs__c= component.get("v.Leadobject.Sibling_Classs__c");
        ////////(Sibling_Classs__c+"Sibling_Classs__c");
        //sibilng board missing
        var Country__c= component.get("v.Leadobject.Country__c");
        ////////(Country__c+"Country__c");
        var Street__c= component.get("v.Leadobject.Street__c");
        ////////(Street__c+"Street__c");
        var Zip_Postal_Code__c= component.get("v.Leadobject.Zip_Postal_Code__c");
        // //////(Zip_Postal_Code__c+"Zip_Postal_Code__c");
        var City__c= component.get("v.Leadobject.City__c");
        ////////(City__c+"City__c");
        var States__c= component.get("v.Leadobject.States__c");
        //  //////(States__c+"States__c");
        ///account fields
        var Father_Name__c= component.get("v.accountobject.Father_Name__c");
        ////////(Father_Name__c+"Father_Name__c");
        var Father_s_Occupation__c= component.get("v.accountobject.Father_s_Occupation__c");
        //  //////(Father_s_Occupation__c+"Father_s_Occupation__c");
        var Father_s_Private_Business_Designation__c= component.get("v.accountobject.Father_s_Private_Business_Designation__c");
        ////////(Father_s_Private_Business_Designation__c+"Father_s_Private_Business_Designation__c");
        var Father_s_Educational_Qualification__c= component.get("v.accountobject.Father_s_Educational_Qualification__c");
        ////////(Father_s_Educational_Qualification__c+"Father_s_Educational_Qualification__c");
        var Any_Family_Member_in_Education_field__c= component.get("v.accountobject.Any_Family_Member_in_Education_field__c");
        ////////( Any_Family_Member_in_Education_field__c+"Any_Family_Member_in_Education_field__c");
        var Word_IQ_Level__c= component.get("v.accountobject.Word_IQ_Level__c");
        ////////(Word_IQ_Level__c+"Word_IQ_Level__c");
        var Expectation__c= component.get("v.accountobject.Expectation__c");
        ////////( Expectation__c+" Expectation__c");
        var Previous_Class_Performance_Aggregate__c= component.get("v.accountobject.Previous_Class_Performance_Aggregate__c");
        // //////(Previous_Class_Performance_Aggregate__c+"Previous_Class_Performance_Aggregate__c");
        var Olympiad_Participation__c= component.get("v.accountobject.Olympiad_Participation__c");
        // //////(Olympiad_Participation__c+"Olympiad_Participation__c");
        var Did_the_student_take_tuition__c= component.get("v.accountobject.Did_the_student_take_tuition__c");
        ////////(Did_the_student_take_tuition__c+"Did_the_student_take_tuition__c");
        var Currently_going_to_any_tuition__c= component.get("v.accountobject.Currently_going_to_any_tuition__c");
        ////////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        var Reasons_for_looking_at_alternate_options__c= component.get("v.accountobject.Reasons_for_looking_at_alternate_options__c");
        ////////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
        /* var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");
        var firstname= component.get("v.Leadobject.FirstName");*/
        
    }, 
    
    editrec: function(component, event, helper) {
        
        
        
        
        if(labelsoflist=='siblingrecord')
        {
            var Any_Siblings__c= component.get("v.testBoolean2");
            //////(Any_Siblings__c);
            
            var firstname= component.get("v.Leadobject.FirstName");
            ////////(firstname+"firstname");
            var Lastname= component.get("v.Leadobject.LastName");
            //////(Lastname+"lastname");
            
            
            var Board__c= component.get("v.Leadobject.Board__c");
            
            //////(Board__c +"         "+"Board__c");
            var Classs__c= component.get("v.Leadobject.Classs__c");
            //////(Classs__c+"Classs__c");
            var Medium__c= component.get("v.Leadobject.Medium__c");
            //////(Medium__c+"Medium__c");
            var MobilePhone= component.get("v.Leadobject.MobilePhone");
            ////////(MobilePhone+"MobilePhone");
            var Sibling_Name__c= component.get("v.Leadobject.Sibling_Name__c");
            // //////(Sibling_Name__c+"Sibling_Name__c");
            var Sibling_Classs__c= component.get("v.Leadobject.Sibling_Classs__c");
            //////(Sibling_Classs__c+"Sibling_Classs__c");
            //sibilng board missing
            var Country__c= component.get("v.Leadobject.Country__c");
            // //////(Country__c+"Country__c");
            var Street__c= component.get("v.Leadobject.Street__c");
            // //////(Street__c+"Street__c");
            var Zip_Postal_Code__c= component.get("v.Leadobject.Zip_Postal_Code__c");
            ////////(Zip_Postal_Code__c+"Zip_Postal_Code__c");
            var City__c= component.get("v.Leadobject.City__c");
            //////(City__c+"City__c");
            var States__c= component.get("v.Leadobject.States__c");
            var Email= component.get("v.Leadobject.Email");
            
            ////////(States__c+"States__c");
            ///account fields
            var Father_Name__c= component.get("v.accountobject.Father_Name__c");
            // //////(Father_Name__c+"Father_Name__c");
            var Father_s_Occupation__c= component.get("v.accountobject.Father_s_Occupation__c");
            // //////(Father_s_Occupation__c+"Father_s_Occupation__c");
            var Father_s_Private_Business_Designation__c= component.get("v.accountobject.Father_s_Private_Business_Designation__c");
            ////////(Father_s_Private_Business_Designation__c+"Father_s_Private_Business_Designation__c");
            var Father_s_Educational_Qualification__c= component.get("v.accountobject.Father_s_Educational_Qualification__c");
            ////////(Father_s_Educational_Qualification__c+"Father_s_Educational_Qualification__c");
            var Any_Family_Member_in_Education_field__c= component.get("v.accountobject.Any_Family_Member_in_Education_field__c");
            ////////( Any_Family_Member_in_Education_field__c+"Any_Family_Member_in_Education_field__c");
            var Word_IQ_Level__c= component.get("v.accountobject.Word_IQ_Level__c");
            ////////(Word_IQ_Level__c+"Word_IQ_Level__c");
            var Expectation__c= component.get("v.accountobject.Expectation__c");
            // //////( Expectation__c+" Expectation__c");
            var Previous_Class_Performance_Aggregate__c= component.get("v.accountobject.Previous_Class_Performance_Aggregate__c");
            // //////(Previous_Class_Performance_Aggregate__c+"Previous_Class_Performance_Aggregate__c");
            var Olympiad_Participation__c= component.get("v.accountobject.Olympiad_Participation__c");
            //////(Olympiad_Participation__c+"Olympiad_Participation__c");
            var Did_the_student_take_tuition__c= component.get("v.accountobject.Did_the_student_take_tuition__c");
            // //////(Did_the_student_take_tuition__c+"Did_the_student_take_tuition__c");
            var Currently_going_to_any_tuition__c= component.get("v.accountobject.Currently_going_to_any_tuition__c");
            ////////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
            var Reasons_for_looking_at_alternate_options__c= component.get("v.accountobject.Reasons_for_looking_at_alternate_options__c");
            ////////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
            //////('hello123444444444444444444444444444444444444444444444444444444');
            
            var leadid=Siblingleadid.toString();
            var leadid1=siblingid.toString();
            //////(leadid1+'leadid1llllllllltesting123');
            //////(leadid+'leadid1llllllllltesting123');
            
            
            //////(Siblingaccountid+'testing123');
            var accountsides=Siblingaccountid.toString();
            
            //////(leadid);
            var action = component.get("c.siblingupdaterecord"); 
            action.setParams({
                "Leadid":leadid1,
                
                "firstname" : firstname, 
                "Lastname": Lastname,
                "Board":Board__c,
                "Classs": Classs__c,
                "Medium":Medium__c,
                "MobilePhone":MobilePhone,
                
                "Country": Country__c,
                "Street":Street__c,
                "Zip_Postal_Code":Zip_Postal_Code__c.toString(),
                "City":City__c,
                "States":States__c,
                "Email":Email, 
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
                //////("sibling"+state);
                //////(Siblingaccountid+'jayaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                if(Siblingaccountid!='null')
                {
                    //////('notnulllsiblingid');
                    helper.Saveaccount(component, event,accountsides);
                }
                
                helper.OrderCreate(component, event,leadid,accountsides);
                
            });
            $A.enqueueAction(action);
            
            
            
        }
        else
        {
            
            //////('LeadSectionsave');
            var Any_Siblings__c= component.get("v.testBoolean2");
            //////(Any_Siblings__c);
            
            var firstname= component.get("v.Leadobject.FirstName");
            ////////(firstname+"firstname");
            var Lastname= component.get("v.Leadobject.LastName");
            //////(Lastname+"lastname");
            
            
            var Board__c= component.get("v.Leadobject.Board__c");
            
            //////(Board__c +"         "+"Board__c");
            var Classs__c= component.get("v.Leadobject.Classs__c");
            //////(Classs__c+"Classs__c");
            var Medium__c= component.get("v.Leadobject.Medium__c");
            //////(Medium__c+"Medium__c");
            var MobilePhone= component.get("v.Leadobject.MobilePhone");
            ////////(MobilePhone+"MobilePhone");
            var Sibling_Name__c= component.get("v.Leadobject.Sibling_Name__c");
            // //////(Sibling_Name__c+"Sibling_Name__c");
            var Sibling_Classs__c= component.get("v.Leadobject.Sibling_Classs__c");
            //////(Sibling_Classs__c+"Sibling_Classs__c");
            //sibilng board missing
            var Country__c= component.get("v.Leadobject.Country__c");
            // //////(Country__c+"Country__c");
            var Street__c= component.get("v.Leadobject.Street__c");
            // //////(Street__c+"Street__c");
            var Zip_Postal_Code__c= component.get("v.Leadobject.Zip_Postal_Code__c");
            ////////(Zip_Postal_Code__c+"Zip_Postal_Code__c");
            var City__c= component.get("v.Leadobject.City__c");
            //////(City__c+"City__c");
            var States__c= component.get("v.Leadobject.States__c");
            var Email= component.get("v.Leadobject.Email");
            
            ////////(States__c+"States__c");
            ///account fields
            var Father_Name__c= component.get("v.accountobject.Father_Name__c");
            // //////(Father_Name__c+"Father_Name__c");
            var Father_s_Occupation__c= component.get("v.accountobject.Father_s_Occupation__c");
            // //////(Father_s_Occupation__c+"Father_s_Occupation__c");
            var Father_s_Private_Business_Designation__c= component.get("v.accountobject.Father_s_Private_Business_Designation__c");
            ////////(Father_s_Private_Business_Designation__c+"Father_s_Private_Business_Designation__c");
            var Father_s_Educational_Qualification__c= component.get("v.accountobject.Father_s_Educational_Qualification__c");
            ////////(Father_s_Educational_Qualification__c+"Father_s_Educational_Qualification__c");
            var Any_Family_Member_in_Education_field__c= component.get("v.accountobject.Any_Family_Member_in_Education_field__c");
            ////////( Any_Family_Member_in_Education_field__c+"Any_Family_Member_in_Education_field__c");
            var Word_IQ_Level__c= component.get("v.accountobject.Word_IQ_Level__c");
            ////////(Word_IQ_Level__c+"Word_IQ_Level__c");
            var Expectation__c= component.get("v.accountobject.Expectation__c");
            // //////( Expectation__c+" Expectation__c");
            var Previous_Class_Performance_Aggregate__c= component.get("v.accountobject.Previous_Class_Performance_Aggregate__c");
            // //////(Previous_Class_Performance_Aggregate__c+"Previous_Class_Performance_Aggregate__c");
            var Olympiad_Participation__c= component.get("v.accountobject.Olympiad_Participation__c");
            //////(Olympiad_Participation__c+"Olympiad_Participation__c");
            var Did_the_student_take_tuition__c= component.get("v.accountobject.Did_the_student_take_tuition__c");
            // //////(Did_the_student_take_tuition__c+"Did_the_student_take_tuition__c");
            var Currently_going_to_any_tuition__c= component.get("v.accountobject.Currently_going_to_any_tuition__c");
            ////////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
            var Reasons_for_looking_at_alternate_options__c= component.get("v.accountobject.Reasons_for_looking_at_alternate_options__c");
            ////////(Currently_going_to_any_tuition__c+"Currently_going_to_any_tuition__c");
            
            var leadid=diffrentidfordiffrentlead.toString();
            var accountsides=differentAccountids.toString();
            //////(leadid);
            var action = component.get("c.Leadrecord"); 
            action.setParams({
                "Leadid":leadid,
                
                "firstname" : firstname, 
                "Lastname": Lastname,
                "Board":Board__c,
                "Classs": Classs__c,
                "Medium":Medium__c,
                "MobilePhone":MobilePhone,
                "Sibling_Name":Sibling_Name__c,
                "Sibling_Classs" :Sibling_Classs__c,
                "Country": Country__c,
                "Street":Street__c,
                "Zip_Postal_Code":Zip_Postal_Code__c.toString(),
                "Any_Siblings":Any_Siblings__c,
                "City":City__c,
                "States":States__c,
                "Email":Email
                
                
            });
            action.setCallback(this, function(a){
                var state = a.getState(); // get the response state
                //////("lead"+state);
                if(differentAccountids=='null')
                {
                    //////('nulllacountid');
                    helper.savenonaccountinsibling(component, event, leadid);
                }
                else
                {
                    //////('else');
                    helper.Saveaccount(component, event,accountsides); 
                    
                }
                var orderlabelvalue="leadorder";
                helper.OrderCreate(component, event, leadid,accountsides);
                
            });
            $A.enqueueAction(action);
            
            
        }
        
        
        
    },
    //pop for laon
    popforloan: function(component, event, helper)
    {                    component.set("v.truthy7", 'true');
     
     var toggleText5 = component.find("text23");
     $A.util.toggleClass(toggleText5, "slds-hide");    
     
    }
    ,
    
    
    toggle : function(component, event, helper) {
        var toggleText = component.find("text");
        $A.util.toggleClass(toggleText, "slds-show");
    },  
    
    cancelonbajajscreen: function(component, event, helper) 
    { 
        component.set("v.truthy7", 'false');
        
        
    }
    ,
    onCheckpayment: function(component, event, helper) {
        
        
        try{
            var paymentwrapperdata =component.get('v.Callingpaymentmodeapi');
            var index=event.getSource().get('v.value');
             /*for(var i=0;i<paymentwrapperdata.payment.length;i++)
                {
             paymentwrapperdata.payment[i].isdis=false;
                }
               component.set('v.Callingpaymentmodeapi',paymentwrapperdata);*/

           var disabledis=event.getSource().get('v.name');
           //alert(disabledis+'kkkkkkkkkkkkkkkk');
            console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
            console.log(paymentwrapperdata.payment[index]);
            window.paymentfororder= paymentwrapperdata.payment[index].p_name;
            ////(paymentfororder);
            var paymentName = paymentwrapperdata.payment[index].p_name;
           // alert(paymentName);
              var eml1=component.get('v.eml1');
           // alert(eml1);
            
            if(paymentName =='E NACH' && eml1 ==true )
            {
                for(var i=0;i<paymentwrapperdata.payment.length;i++)
                {
                    for(var j=0;j<paymentwrapperdata.payment[i].paymenttype.length;j++)
                    { 
                            if(paymentwrapperdata.payment[i].paymenttype[j].pm_name=='EMLOAN')
                            {//alert('klklklk');
                             //alert(paymentwrapperdata.payment[i].paymenttype[j].isdis1+'paymentwrapperdata.payment[i].paymenttype[j].isdis1');
                              paymentwrapperdata.payment[i].paymenttype[j].isdis1=true;
                             component.set('v.eml1',false);
                                  
                            }
                        
                    }
                   
                }
            }
             if(paymentName =='E NACH' && eml1 ==false )
            {
                for(var i=0;i<paymentwrapperdata.payment.length;i++)
                {
                    for(var j=0;j<paymentwrapperdata.payment[i].paymenttype.length;j++)
                    { 
                            if(paymentwrapperdata.payment[i].paymenttype[j].pm_name=='EMLOAN')
                            {//alert('klklklk');
                            // alert(paymentwrapperdata.payment[i].paymenttype[j].isdis1+'paymentwrapperdata.payment[i].paymenttype[j].isdis1');
                              paymentwrapperdata.payment[i].paymenttype[j].isdis1=false;
                             component.set('v.eml1',true);
                                  
                            }
                        
                    }
                   
                }
            }
            
            console.log('paymentName---> '+paymentName);
            
            paymentwrapperdata.payment[index].expanded = !paymentwrapperdata.payment[index].expanded;//True and false condition
            component.set('v.Callingpaymentmodeapi',paymentwrapperdata);
            
            /* var toggleText = component.find("Cheque");
        $A.util.toggleClass(toggleText, "slds-hide");*/
            var PaymentMode = component.get("v.PaymentMode");
            
            if(paymentName=='Loan'){
                component.set("v.hasTakenLoan",paymentwrapperdata.payment[index].expanded )
                if(!paymentwrapperdata.payment[index].expanded){
                    for(var i in PaymentMode.loanPaymentsWrapper){
                        PaymentMode.loanPaymentsWrapper[i].name = '';
                        PaymentMode.loanPaymentsWrapper[i].downPayment = '';
                        PaymentMode.loanPaymentsWrapper[i].monthlyEmiDeduction = '';
                        PaymentMode.loanPaymentsWrapper[i].amount =0;
                        PaymentMode.loanPaymentsWrapper[i].referenceId='';
                        PaymentMode.loanPaymentsWrapper[i].totalEmi='';
                    }
                }
                
            }
            
            if(paymentName=='Extramarks Payment Link'){
                PaymentMode.onlinePayment.isSelected = paymentwrapperdata.payment[index].expanded;
            }
            else if(paymentName=='Paytm QR Code'){
                PaymentMode.PaytmCode.isSelected = paymentwrapperdata.payment[index].expanded;
            }
                else if(paymentName=='Bank Transfer'){
                    PaymentMode.BankTransfer.isSelected = paymentwrapperdata.payment[index].expanded;
                }
                    else if(paymentName=='Cheque'){
                        PaymentMode.chequePaymentsWrap.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='Cash'){
                        PaymentMode.Cash.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='NEFT'){
                        PaymentMode.NeftWrap.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='Paytm'){
                        PaymentMode.PaytmWrap.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='Swipe'){
                        PaymentMode.SwipeWrap.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='Shopse'){
                        PaymentMode.ZestMoney.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='E NACH'){
                        PaymentMode.Enach.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='PDC'){
                        PaymentMode.PDC.isSelected = paymentwrapperdata.payment[index].expanded;
                    }else if(paymentName=='ED Pay'){
                        PaymentMode.EducationLoan.isSelected = paymentwrapperdata.payment[index].expanded;
                    }
            console.log('update---> '+JSON.stringify(PaymentMode));
            component.set('v.PaymentMode',PaymentMode); 
            helper.calculateBalancePaymentMode(component, event, helper);
        }catch(err){
            console.log("Error--- > "+err + "Line---> "+err.line);
        }
        helper.calculateBalancePaymentMode(component, event, helper);
    },  
    
    onCheckDownPayment : function(component, event, helper) {
        
        
        var paymentwrapperdata =component.get('v.downpaymentCallingpaymentmodeapi');
            var index=event.getSource().get('v.value');
           
               component.set('v.downpaymentCallingpaymentmodeapi',paymentwrapperdata);
  
            console.log(index+'valueissssssssssssssssssssssssssssssssssssssssss');
            //alert(index+'rr');
            var paymentName = paymentwrapperdata.dplist[index].downpay_name;
       // alert(paymentName);
      
        //var paymentName = event.getSource().get('v.value');
        var PaymentMode = component.get("v.downPaymentWrapper");
        
        if(paymentName=='Extramarks Payment Link'){
            PaymentMode.onlinePayment.isSelected = !PaymentMode.onlinePayment.isSelected;
        }else if(paymentName=='Cash'){
            PaymentMode.Cash.isSelected = !PaymentMode.Cash.isSelected;
        }else if(paymentName=='NEFT'){
            PaymentMode.NeftWrap.isSelected = !PaymentMode.NeftWrap.isSelected;
        }else if(paymentName=='Paytm'){
            PaymentMode.PaytmWrap.isSelected = !PaymentMode.PaytmWrap.isSelected;
        }else if(paymentName=='Swipe'){
            PaymentMode.SwipeWrap.isSelected = !PaymentMode.SwipeWrap.isSelected;
        }
        else if(paymentName=='Paytm QR Code'){
                PaymentMode.PaytmCode.isSelected = !PaymentMode.PaytmCode.isSelected;
            }
            else if(paymentName=='Bank Transfer'){
                PaymentMode.BankTransfer.isSelected = !PaymentMode.BankTransfer.isSelected;
            }
        console.log('update---> '+JSON.stringify(PaymentMode));
        component.set('v.downPaymentWrapper',PaymentMode);
            paymentwrapperdata.dplist[index].expanded = !paymentwrapperdata.dplist[index].expanded;//True and false condition
            component.set('v.downpaymentCallingpaymentmodeapi',paymentwrapperdata);
    },   
    onCheck3: function(component, event, helper) {
        var toggleText5 = component.find("Cash");
        $A.util.toggleClass(toggleText5, "slds-hide");
    },   
    onCheck4: function(component, event, helper) {
        
        
        var toggleText5 = component.find("NEFT");
        $A.util.toggleClass(toggleText5, "slds-hide");
        
        
    },
    
    onCheck1: function(component, event, helper) {
        
        
        var toggleText5 = component.find("text");
        $A.util.toggleClass(toggleText5, "slds-hide");
        
        
    },   
    
    
    
    
    
    onCheck: function(component, event, helper) {
        var checkCmp =      component.get("v.testBoolean"); 
        if(checkCmp==true){
            component.set("v.truthy7", 'true');
            //pop for loan for filling documents
            // helper.popforloan(component, event, helper);
            
        }
        if(checkCmp==false){
            component.set("v.truthy7", 'false');    
        }
        helper.calculateBalancePaymentMode(component, event, helper);
        //////(checkCmp);
        
    },
    selectFromHeaderStep1: function(component, event, helper){
        component.set("v.truthy5", true); 
        component.set("v.truthy1", true);
        component.set("v.truthy", false); 
        component.set("v.truthy2", false); 
        component.set("v.truthy3", false); 
        
    },  
    
    selectFromHeaderStep1: function(component, event, helper){
        component.set("v.truthy5", true); 
        component.set("v.truthy1", true);
        component.set("v.truthy", false); 
        component.set("v.truthy2", false); 
        component.set("v.truthy3", false); 
        
    }, 
    select: function(component, event, helper){
        component.set("v.truthy5", true); 
        component.set("v.truthy1", false);
        component.set("v.truthy", false); 
        component.set("v.truthy2", true); 
        component.set("v.truthy3", false); 
        component.set("v.truthy6", false); 
        
    },  
    showback: function(component, event, helper){
        component.set("v.truthy5", true); 
        component.set("v.truthy1", true);
        component.set("v.truthy", false); 
        component.set("v.truthy2", false); 
        component.set("v.truthy3", false);
    }, 
    showBack1: function(component, event, helper){
        component.set("v.siblingshow",true);
        component.set("v.truthy1", true);
        component.set("v.detailspageforbasicsnaap",false);
        component.set("v.truthy5", true); 
        
        
        /*component.set("v.truthy5", false); 
                component.set("v.truthy1", false);
                component.set("v.truthy", false); 
     component.set("v.truthy2", false); 
     component.set("v.truthy3", false);
          component.set("v.truthy4", true);*/
    },
    
    showBack2: function(component, event, helper){
        component.set("v.ORDERLISTVIEW",true);
        component.set("v.truthy",false);
    },
    
    cancelonbajajscreen1 : function(component, event, helper) 
    {
        component.set('v.emloan', false);
        
    },
    
    
    toggleSection1 : function(component, event, helper) {
        ////('inside theselectloop');
        component.set('v.Loan.Total_Amount__c',' ');
        component.set('v.confirmrefrenceid',' ');
        
        component.set('v.Loan.Down__c',' ');
        component.set('v.LoanMode',' ');
        component.set('v.Loan.No_of_EMI__c',' ');
        
        component.set('v.Loan.Montly__c',' ');
        
        component.set('v.Loan.Down__c','');
        component.set("v.selectschm",'');
        window.id = event.currentTarget.dataset.id;
        //(id);
        if(id=='EMLOAN')
        {
            //('kk');
            var em=component.get('v.emloan');
            //(em);
            component.set('v.emloan', true);
            var em1=component.get('v.emloan');
            //(em1);
            component.set('v.truthy7', false);
            helper.getrefreceidforemloan(component, event, helper);
            
            
        }
        else
        {//('ll');
         component.set('v.emloan', false);
         component.set('v.truthy7', true);  
        }
        
        var source = event.currentTarget.dataset.id;
       // alert(source);
        var PaymentMode = component.get("v.PaymentMode");
        for(var i in PaymentMode.loanPaymentsWrapper){
            if(PaymentMode.loanPaymentsWrapper[i].name === source){
                component.set("v.downPayment",PaymentMode.loanPaymentsWrapper[i].downPayment);
                component.set("v.monthlyEmiDeduction",PaymentMode.loanPaymentsWrapper[i].monthlyEmiDeduction);
                component.set("v.amount",PaymentMode.loanPaymentsWrapper[i].amount);
                component.set("v.referenceId",PaymentMode.loanPaymentsWrapper[i].referenceId);
                component.set("v.totalEmi",PaymentMode.loanPaymentsWrapper[i].totalEmi);
                component.set("v.selectschm",PaymentMode.loanPaymentsWrapper[i].schemeName);
                 component.set("v.LoanMode",PaymentMode.loanPaymentsWrapper[i].loanmode);
                component.set("v.confirmrefrenceid",PaymentMode.loanPaymentsWrapper[i].Confirmrefrenceid);
                 component.set("v.Emandatory",PaymentMode.loanPaymentsWrapper[i].Emandatory);
                
                
            }
        }
        
        
        var paymentwrapperdata =component.get('v.Callingpaymentmodeapi'); 
        var datais=paymentwrapperdata.payment;
        component.set('v.loansubname',id);
        
        ////(JSON.stringify(datais));
        for( var i=0; i<datais.length;i++)
        {
            if(datais[i].p_name=='Loan')
            {
                for(var j=0; j<datais[i].paymenttype.length;j++)
                {
                    if(datais[i].paymenttype[j].pm_name==id)
                    {
                        component.set('v.selectLoanScheme',datais[i].paymenttype[j].paymentscheme);
                        component.set('v.uploadalldocuments',datais[i].paymenttype[j].document);
                        
                        console.log(datais[i].paymenttype[j].paymentscheme);
                    }
                }
                break;
                
            }
            
        }
        helper.calculateBalancePaymentMode(component, event, helper);
    },
    addDocuments: function(component, event, helper) {
        var isSelected = event.getSource().get("v.value");
       // alert(isSelected);
        var docType = event.getSource().get("v.name");
        //////(docType);
        var docList = component.get("v.selectedDocuments");
        //////(docList);
        console.log("docType--->  "+docType);
        console.log("docList--->  "+docList);
        if(!isSelected){
            const index = docList.indexOf(docType);
            if (index > -1) {
                docList.splice(index, 1);
            }
        }else{
            docList.push(docType);
            component.set("v.selectedDocuments",docList);
        }
        console.log("docList--->  "+docList);
        
    },
    
    
    
    
    
    
    
    
    
    
    
    
    // common reusable function for toggle sections
    toggleSection : function(component, event, helper) {
        // dynamically get aura:id name from 'data-auraId' attribute
        var sectionAuraId = event.target.getAttribute("data-auraId");
        //alert(sectionAuraId);
        ////////(sectionAuraId);
        // get section Div element using aura:id
         //alert(component.find(sectionAuraId));
        var sectionDiv = component.find(sectionAuraId).getElement();
       
       //alert( sectionDiv);
        
        /* The search() method searches for 'slds-is-open' class, and returns the position of the match.
         * This method returns -1 if no match is found.
        */
        var sectionState = sectionDiv.getAttribute('class').search('slds-is-open'); 
        
        // -1 if 'slds-is-open' class is missing...then set 'slds-is-open' class else set slds-is-close class to element
        if(sectionState == -1){
            sectionDiv.setAttribute('class' , 'slds-section slds-is-open');
        }else{
            sectionDiv.setAttribute('class' , 'slds-section slds-is-close');
        }
        
    },
    doInit : function(component, event, helper) {
        var forduplicatenumbercheck=component.get("v.forduplicatenumbercheck");
      // alert('forduplicatenumbercheck '+forduplicatenumbercheck);
        if(forduplicatenumbercheck==true)
        {
            
            window.mobileNumberSet=[];
            window.set1 = new Set(); 
             console.log('gopal windoe   '+JSON.stringify(window.set1));
            component.set("v.forduplicatenumbercheck",false);
        }
       
           window.id1=component.get("v.oppRecordId")
        var action = component.get("c.orderPlacedOrNot");
        action.setParams({ leadid : id1 });
        
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
          
            window.leadstatus=response.getReturnValue();
           // alert(leadstatus+'jhgjikhuuijh');
            
            
              
        if(leadstatus!= "Order Placed")
        {
            
       
        /////('hellooooooooooooooooo');
        window.extramarksresdwonpay=0;
        helper.LanguageKnown(component, event, helper);
        // component.set("v.aftercreateofparentrecord",true);  
        
        window.wrapdate2=[]; 
        helper.School(component, event, helper);
        // helper.getClasses(component, event, helper);
        helper.multipicklist(component, event, helper);
        helper.getBoard(component, event, helper);
        
        helper.getMedium(component, event, helper);
        
        //helper.getCity(component, event, helper);
        
        helper.getState(component, event, helper);
        helper.getwardiq(component, event, helper);
        
        helper.getexp(component, event, helper);
        helper.getDidthestudenttaketuition(component, event, helper);
        
        helper.getCurrentlygoingtoanytuition(component, event, helper);
        helper.Reasonsforlookingatalternateoptions(component, event, helper);
        
        helper.getAllreadyPaidAmount(component, event, helper);
        helper.getMinimumPercantage(component, event, helper);
        
        var url = $A.get('$Resource.PaymentBackground');
        ////////(url);
        component.set('v.backgroundImageURL', url);
        ////////("aagyayaarfinally");
     
        //////(id1+"leadid");	
        
        
        var action = component.get("c.getLeadData"); 
        // method name i.e. getEntity should be same as defined in apex class
        // params name i.e. entityType should be same as defined in getEntity method
        action.setParams({
            "Leadid" : id1 
        });
        action.setCallback(this, function(a){
            var state = a.getState();
            /////(state);
            
            var q =a.getReturnValue();
            ///////(JSON.Stringify(q));
            component.set("v.LeadMap", q);
            var q1=component.get("v.LeadMap");
            
            // //////(q);
            console.log(q); 
            //component.set("v.LeadMap",q);
            //  //////(component.get("v.LeadMap")+'heloo');
            ////////(q1[0].StudentName);
            //
            
            var wrapdate=[]; 
            
            wrapdate.push({
                'firstname':q1[0].FirstName,
                'lastname':q1[0].LastName
                
            });
            
            component.set("v.mapget",wrapdate);
            
            component.set("v.Leadobject.FirstName" ,q1[0].FirstName);
            component.set("v.Leadobject.Secondary_Mobile_Number__c" ,q1[0].SecondryMobilenum);
            //student number  component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);
            // Parent Contact Number component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);
            // Address component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);
            component.set("v.Leadobject.LastName" ,q1[0].LastName);
            window.accountid=q1[0].accountids;
            //////(accountid);
            window.leadid=q1[0].ids;
            //////(leadid+'leadid');
            window.parentemail=q1[0].Email;
            window.parentnum=q1[0].StuMobilePhone;
            window.parcity=q1[0].Cityid;
            window.schoolName=q1[0].Schoolname;
         //   alert(q1[0].CountryCode+' CountryCodeeee' )
             component.set("v.countrycode" ,q1[0].CountryCode);
            if(q1[0].CountryCode=='+91')
            {
                component.set('v.countrycode','+91');
               component.set('v.totallengthofphnnumber',10); 
                component.set('v.Indiapayment',true);
            }
            if(q1[0].CountryCode=='+971')
            {
                //alert('uuuuuaaww')
                component.set('v.countrycode','+971');
              component.set('v.totallengthofphnnumber',9);
                component.set('v.Uaepayment',true);
            }
            //////(parentemail);
            //////(parentnum);
             component.set("v.phonenumber" ,q1[0].StuMobilePhone);
            component.set("v.Leadobject.Email" ,q1[0].Email);
            component.set("v.Leadobject.Alternate_Email__c" ,q1[0].AlternateEmail);
            window.testmobile=q1[0].StuMobilePhone;
            component.set("v.Leadobject.MobilePhone" ,q1[0].StuMobilePhone);
              window.LeadPh=q1[0].StuMobilePhone;
            component.set("v.Leadobject.School_Name__c" ,q1[0].Schoolname);
            //component.set("v.Leadobject.Medium__r.name" ,q1[0].Medium);
            component.set("v.Leadobject.Language__c" ,q1[0].Language);
            
            component.set("v.Leadobject.Country__c" ,q1[0].Country);
            window.Country=q1[0].Country;
            
            component.set("v.Leadobject.Board__c" ,q1[0].Boardid);
            
            component.set("v.Leadobject.Classs__c" ,q1[0].StuClassid);
            
            component.set("v.Leadobject.Parent_Name__c" ,q1[0].Parent_Name);
            
            component.set("v.Leadobject.Medium__c" ,q1[0].Mediumid);
            
            component.set("v.Leadobject.School_Code__c" ,q1[0].SchoolCodeId);
            
            component.set("v.Leadobject.MobilePhone" ,q1[0].StuMobilePhone);
            
            component.set("v.Leadobject.Street__c" ,q1[0].Street);
            
            component.set("v.Leadobject.Zip_Postal_Code__c" ,q1[0].Pincode);
            
            component.set("v.Leadobject.City__c" ,q1[0].Cityid);
            
            component.set("v.Leadobject.States__c" ,q1[0].Stateid);
            //////(q1[0].Stateid);
            
            component.set("v.Leadobject.Any_Siblings" ,q1[0].Any_Siblings);
            component.set("v.selectedGenreList" ,q1[0].selectedLanguages);
            
            /*component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);
            component.set("v.orderobject.Student_Name__c" ,q1[0].StudentName);*/
            //  helper.getClass1(component, event, helper);
            console.log(q1[0].SchoolCodeName);
            console.log(q1[0].SchoolCodeId);
            var schoolCodeComp =component.find("city-records");
            schoolCodeComp.set("v.inputValue", q1[0].SchoolCodeName);
            schoolCodeComp.set("v.selectedOption", q1[0].SchoolCodeId);
            var cityis =component.find("city-record");
            cityis.set("v.inputValue", q1[0].City);
            cityis.set("v.selectedOption", q1[0].Cityid);
            component.set("v.disableOnLoad", false);
             component.set("v.IsSamePhone", true);
            
        });
        $A.enqueueAction(action);
        
        }
        else
        {
          component.set('v.disableOnLoad',true);  
            component.set('v.truthy4',false); 
                        component.set('v.orderisplacedalready',true);  

                      

        }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
       });
        
        
        $A.enqueueAction(action);

    
      
        
        
    },
    
    // function automatic called by aura:waiting event  
    showNext: function(component, event, helper) {
        // make Spinner attribute true for displaying loading spinner 
        component.set("v.truthy", true); 
        component.set("v.truthy1", false); 
        component.set("v.truthy6", false); 
    },
    
    // function automatic called by aura:waiting event  
    showNext1: function(component, event, helper) {
        
        var lead = component.get("v.Leadobject");
        var IsError = false;
        var Schoolcode=component.find("city-record").get("v.selectedOption");
        // //(Schoolcode+'Schoolcode');
        //schoolCodeComp.set("v.inputValue", q1[0].SchoolCodeName);
        //    schoolCodeComp.set("v.selectedOption", q1[0].SchoolCodeId);
        if( lead.FirstName == undefined || lead.FirstName == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadFirstName",'Please Enter the First Name');
            IsError = true;
        }else if( lead.LastName == undefined || lead.LastName == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadLastName",'Please Enter the Last Name');
            IsError = true;
        }else if( lead.MobilePhone == undefined || lead.MobilePhone == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadMobileName",'Please Enter the Mobile Number');
            IsError = true;
        }else if( lead.School_Name__c == undefined || lead.School_Name__c == '' ){
            console.log("lead.FirstName ERR");
            helper.handleError(component,event,helper,"leadSchoolName",'Please Enter the school name');
            IsError = true;
        }
       
        
            else if(Schoolcode == undefined || Schoolcode == '' ){
                //  //(Schoolcode+'Schoolcode');
                console.log("lead.FirstName ERR");
                //helper.handleError(component,event,helper,"leadCity",'Please select the city');
                IsError = true;
            }else if( lead.Email == undefined || lead.Email == '' ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please Fill Mandatory Fields"
                });
                toastEvent.fire();
                console.log("lead.FirstName ERR");
                helper.handleError(component,event,helper,"leadEmailName",'Please enter Email');
                IsError = true;
                return;
            }
        if(lead.Alternate_Email__c !='' && lead.Alternate_Email__c!=null){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(lead.Alternate_Email__c) == false) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please enter a valid email format"
                });
                toastEvent.fire();
                return;
            }
        }
        
        
        
        if(IsError==true){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "message": "Please Fill Mandatory Fields"
            });
            toastEvent.fire();
            return;
        }
        helper.getClassPicklistValues(component,event,helper);
        //("Before Helper-->");
        if( IsError == false ){
            helper.updatelead(component,event,helper);
            helper.getsiblingrecord(component,event,helper);
            helper.getLeadrecord(component,event,helper);
            
            // make Spinner attribute true for displaying loading spinner 
            component.set("v.truthy5", true); 
            component.set("v.truthy1", true);
            component.set("v.truthy4", false);
            component.set("v.siblingshow", false); 
        }
        
    },
     showNext2: function(component, event, helper) {
          helper.getClassPicklistValues(component,event,helper);
          helper.updatelead(component,event,helper);
            helper.getsiblingrecord(component,event,helper);
            helper.getLeadrecord(component,event,helper);
         
      component.set("v.truthy5", true); 
            component.set("v.truthy1", true); 
          component.set("v.truthy4", false);
            component.set("v.siblingshow", false); 
     },
         
         
    save: function(component, event, helper) {
        // make Spinner attribute true for displaying loading spinner 
        component.set("v.truthy", false); 
        component.set("v.truthy1", false); 
        component.set("v.truthy2", true); 
        
    },
    
    
    // Function to toggle Income Form visibility
    toggleIncomeForm: function(component, event, helper) {
        try{
            var customer1SP = component.get('v.customerSP22');
             var mopForHardwareProduct= component.get('v.mopForHardwareProduct')        
            var lineItemsCreated = component.get("v.lineItemsCreated");
            var AllreadyPaid = 0; //component.get("v.paidPayment");
            var EducationLoan = component.get("v.paidPreLoanPayment");
            var customer1SP2 = component.get('v.customerSP24');
            component.set('v.customerSP225',customer1SP);
            
            var totalmop = component.get('v.totalmop');
            var totalmrp = component.get('v.totalmrp');
            var couponSelected = component.get("v.couponSelected");
            if(customer1SP=='undefined'||customer1SP=='Enter Selling price...' 
               ||customer1SP==undefined
               || customer1SP==null || customer1SP==''){
                helper.showToast(component, event, helper,'error','Please enter a valid Customer SP');
                return;
            }
            
             var IsGST= component.get('v.IsGST');
            var value=component.get('v.value');
             
             var GSTno= component.get('v.GSTno');
            
            
            if(GSTno.length != 15 && IsGST != 'undefined' && IsGST != undefined  ){
                
                helper.showToast(component, event, helper,'error','Your GST number should be 15 digits.');
                 return;
            }
             var reg1 = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
            if (reg1.test(GSTno) == false && IsGST != 'undefined' && IsGST != undefined ) {
                helper.showToast(component, event, helper,'error','Invalid format of GST, Please enter the correct format');
                return;              
            }
          
               var PANno= component.get('v.PANno');
                 var  value =component.get('v.value');
                          if(PANno.length!=10 && IsGST != 'undefined' && IsGST != undefined){
                helper.showToast(component, event, helper,'error','Your PAN number should be 10 digits.');
                return;
            }
        var reg2 = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
            if (reg2.test(PANno) == false && IsGST != 'undefined' && IsGST != undefined) {
                helper.showToast(component, event, helper,'error','Invalid format of PAN, Please enter the correct format');
                return;              
            }

            
            if (parseInt(customer1SP) < parseInt(AllreadyPaid)) {
                helper.showToast(
                    component,
                    event,
                    helper,
                    "error",
                    "Customer SP is lower than already paid amount"
                );
                return;
            }
            if (parseInt(customer1SP) < parseInt(EducationLoan)) {
                helper.showToast(component, event, helper, "error","Customer SP is lower than education loan amount");
                return;
            }
            if((parseInt(customer1SP) < (parseInt(totalmop)+parseInt(mopForHardwareProduct))) && !couponSelected){
                helper.showToast(component, event, helper,'error','Customer SP is lower than total MOP');
                return;
            }
            if((parseInt(customer1SP) < parseInt(customer1SP2)) && couponSelected){
                helper.showToast(component, event, helper,'error','Customer SP is lower than Discount Amount');
                return;
            }
            if((parseInt(customer1SP) > (parseInt(totalmop)+parseInt(mopForHardwareProduct))) && couponSelected){
                helper.showToast(component, event, helper,'error','Customer SP is Higher than total MOP');
                return;
            }
         if((parseInt(customer1SP) > (parseInt(totalmop)+parseInt(mopForHardwareProduct))) && couponSelected){
                helper.showToast(component, event, helper,'error','Customer SP is Higher than total MOP');
                return;
            }
            if(parseInt(customer1SP) > parseInt(totalmrp)){
                helper.showToast(component, event, helper,'error','Customer SP is higher than total MRP');
                return;
            }
        }catch(err){
            console.log('err'+err);
        }
        
        helper.getPaymentModeWrapper(component, event, helper);
        
        var minimumPercantageValue = component.get("v.minimumPercantageValue");
        var minimumPercantageType = component.get("v.minimumPercantageType");
        
		var totalMinimumAmtForHardware=component.get('v.totalMinimumAmtForHardware');
        var MinAmtToBeCollected = 0;
        if(minimumPercantageType == 'Percentage'){
            MinAmtToBeCollected = (parseInt(customer1SP)*parseInt(minimumPercantageValue))/100;
        }
        if(minimumPercantageType == 'Flat'){
            MinAmtToBeCollected = parseInt(minimumPercantageValue);
        }
        
        if(parseInt(MinAmtToBeCollected) < parseInt(totalMinimumAmtForHardware)){
            MinAmtToBeCollected = totalMinimumAmtForHardware;
        }
        console.log('MinAmtToBeCollected => '+MinAmtToBeCollected );
        //alert('MinAmtToBeCollected => '+MinAmtToBeCollected);
        
        component.set("v.Minimum_Amount", MinAmtToBeCollected);
        
        /*if(!lineItemsCreated){
            helper.CreateOrderlineitem(component, event, helper);
        }*/
        
       // helper.CreateOrderlineitem(component, event, helper);
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
        
        var action1 = component.get("c.paymentMethodDownpayment"); 
        
        action1.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            var result = a.getReturnValue();
            //alert(JSON.stringify(result));
            console.log('downPaymentWrapper-->'+result);
              component.set("v.downpaymentCallingpaymentmodeapi",result);
            //component.set("v.PaymentModeforDownpayment",result);
        });
        $A.enqueueAction(action1);
        var couponobj=component.get("v.Applycoupon");
        
        
        var couponName=component.find("PicklistId").get("v.value");
        ////('couponName2'+couponName);
        window.discountidis="null";
        
        if(couponobj){
            for(var i=0;i<couponobj.coupan.length;i++){
                if(couponobj.coupan[i].name==couponName){
                    console.log('kkkk');
                    
                    window.discountidis=couponobj.coupan[i].id;//discountid
                    
                    
                    
                }
            } 
        }
        //Show Spinner
        component.set("v.toggleSpinner", true);
     //   alert('okkkkkk')
        try{
            
            var action = component.get("c.paymentmode"); 
            action.setParams({
                
                "discountidis":discountidis
            });           
            action.setCallback(this, function(response) {
                var state = response.getState();
                if(state=='SUCCESS'){
                    var q =response.getReturnValue();
                  // alert(' Payment Mode '+q.payment)
                  //   alert(' Payment Mode '+q.payment[0].p_name)
                    if(q==null){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "error",
                            "message": "Unable to get Payment Modes"
                        });
                        toastEvent.fire(); 
                    }
                    
                    for(var i in q.payment){
                        if(q.payment[i].p_name=='Loan'){
                            for(var j in q.payment[i].paymenttype){
                                q.payment[i].paymenttype[j].isSelected = false;
                                q.payment[i].paymenttype[j].fileUploaded = false;
                            }
                        }
                    }
                    console.log(JSON.stringify(q)+'paymentmode data json');
                    component.set('v.Callingpaymentmodeapi',q);
                    component.set("v.toggleSpinner", false);
                }else{
                    component.set("v.toggleSpinner", false);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "message": "Unable to get Payment Modes"
                    });
                    toastEvent.fire();
                    return;
                    
                }
            });
            $A.enqueueAction(action);    
        }catch(err){
            console.log("Error-->");
            component.set("v.toggleSpinner", false);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "message": "Unable to get Payment Modes"
            });
            toastEvent.fire(); 
        }
        var action3 = component.get("c.returndownPaymentWrapper"); 
        
        action3.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            var result = a.getReturnValue();
            console.log("downPaymentWrapper--> "+result);
            component.set("v.downPaymentWrapper",result);
        });
        $A.enqueueAction(action3);
        component.set("v.truthy3", true); 
        
    },
    cancel: function(component, event, helper) {
        component.set("v.truthy3", false); 
    },
    
    
    orderprocrocess:function(component, event, helper)
    {
        
        var leadid=id1.toString();
        var action=component.get("c.Applycoupon");
        action.setParams({
            'leadid':leadid,
            
        });
        //////('hello');
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            //////(state); 
            var q=response.getReturnValue();
            
            console.log(q);
            
        });
        $A.enqueueAction(action);  
        
    },
    
    /* orderpush: function(component, event, helper) {
         var Leadwrapperdata =component.get('v.Leadwrapperdata');
     ////(productselectedforpayment);
          var couponobj=component.get("v.Applycoupon");
            var couponid =component.get("v.ordercoupon");
           var siblingwrap =component.get("v.Siblingwrapperdata");
          var couponwrap=[];
           
           for(var i=0;i<couponobj.coupan.length;i++)
           {
               if(couponobj.coupan[i].id==c
               ouponid)
               {
          couponwrap.push({
          
              'id': couponid,
                  'coupan':couponobj.coupan[i].coupan,
                      'dis_value':couponobj.coupan[i].dis_value
              
          });
               }
           }
           var leadid=id1.toString();
          var callpayment= component.get('v.Callingpaymentmodeapi');
          var action = component.get("c.paymentmode"); 
        
    },*/
    closeLoanPaymentModal: function(component, event, helper){
        component.set("v.LoanPaymentModal",false);
    },
    
    saveAllPayments: function(component, event, helper){
        var amt= component.get('v.paidPayment'); //
        var PaymentMode = component.get("v.PaymentMode");
        var downPaymentWrapper = component.get("v.downPaymentWrapper");
        var totalamountpaidforadjust=parseInt(downPaymentWrapper.Adjust.amount)+parseInt(PaymentMode.Adjust.amount); //
        console.log(totalamountpaidforadjust+'totalamountpaidforadjust' + amt);
        if(parseInt(totalamountpaidforadjust) > parseInt(amt)){
            helper.showToast(component, event, helper,'error','Adjustable amount cannot be greater than already paid amount');
            return;
        }
        console.log('totalamountpaidforadjust=> '+ totalamountpaidforadjust);
        if(parseInt(totalamountpaidforadjust) < parseInt(amt)){
            helper.showToast(component, event, helper,'error','Adjustable amount cannot be less than already paid amount');
            return;
        }
        
        var totalAmountCount = 0;
        var loanAmountTotal = component.get("v.loanAmountTotal");
     //   alert(referenceIdSet+'referenceIdSet');
       // var hasReferenceId = 0;
        
        var allFiles = component.get("v.anyFile");
        var count = 0;
        //component.set("v.truthy3",false);
        //component.set("v.truthy2",false);
        if(downPaymentWrapper.Adjust.isSelected==true){
            //  alert(downPaymentWrapper.Adjust.amount+'downPaymentWrapper.Adjust.amount');
            totalAmountCount += parseInt(downPaymentWrapper.Adjust.amount);
        }
        
        if(downPaymentWrapper.onlinePayment.isSelected==true){
            
            totalAmountCount+=parseInt(downPaymentWrapper.onlinePayment.amount);
        }
        if(downPaymentWrapper.Cash.isSelected==true){
            totalAmountCount+=parseInt(downPaymentWrapper.Cash.amount);       
        }
        if(downPaymentWrapper.BankTransfer.isSelected==true){
            //('kk');
            totalAmountCount+=parseInt(downPaymentWrapper.BankTransfer.amount); 
            //(totalAmountCount);
        }
        if(downPaymentWrapper.PaytmCode.isSelected==true){
            //('kk11');
            totalAmountCount+=parseInt(downPaymentWrapper.PaytmCode.amount);  
            //(totalAmountCount);
        }
        if(downPaymentWrapper.NeftWrap.isSelected==true){
            for(var i=0;i<downPaymentWrapper.NeftWrap.NeftList.length;i++){
                if(downPaymentWrapper.NeftWrap.NeftList[i].referenceId==''){
                    helper.showToast(component, event, helper,'error','Please enter a reference number for Neft Payment');
                    return;
                }
                 if(downPaymentWrapper.NeftWrap.NeftList[i].referenceId!=downPaymentWrapper.NeftWrap.NeftList[i].Confirmrefrenceid){
                    helper.showToast(component, event, helper,'error','reference id and confirm reference id are same for Neft Payment');
                    return;
                }
                  if(referenceIdSet.includes(downPaymentWrapper.NeftWrap.NeftList[i].referenceId))
                {
                    
                   helper.showToast(component, event, helper,'error','Enter Unique reference id for Neft '+i);
                    return; 
                } 
         
               
                
            }
            var count = 0;
            for(var i in allFiles){
                if(allFiles[i].title.indexOf('Down Neft') != -1){
                    count++;
                }  
            }
            if(count != downPaymentWrapper.NeftWrap.NeftList.length){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please Upload a file for NEFT"
                });
                toastEvent.fire();
                return;
            }
            for(var i=0;i<downPaymentWrapper.NeftWrap.NeftList.length;i++){
                totalAmountCount+=parseInt(downPaymentWrapper.NeftWrap.NeftList[i].amount);      
            }
            //totalAmountCount+=parseInt(downPaymentWrapper.NeftWrap.amount);       
        }
        if(downPaymentWrapper.PaytmWrap.isSelected==true){
            for(var i=0;i<downPaymentWrapper.PaytmWrap.PaytmList.length;i++){
                if(downPaymentWrapper.PaytmWrap.PaytmList[i].referenceId==''){
                    helper.showToast(component, event, helper,'error','Please enter a reference number for Paytm Payment');
                    return;
                }
                if(downPaymentWrapper.PaytmWrap.PaytmList[i].referenceId!=downPaymentWrapper.PaytmWrap.PaytmList[i].Confirmrefrenceid){
                    helper.showToast(component, event, helper,'error','reference id and confirm reference id are same for Paytm Payment');
                    return;
                }
                
                 
                if(referenceIdSet.includes(downPaymentWrapper.PaytmWrap.PaytmList[i].referenceId))
                {
                    
                   helper.showToast(component, event, helper,'error','Enter Unique reference id for paytm '+i);
                    return; 
                }
                
                
                
              
                
                
                
                
                
                
                
                
                
                
                
            }
            var count = 0;
            for(var i in allFiles){
                if(allFiles[i].title.indexOf('Down Paytm') != -1){
                    count++;
                }  
            }
            if(count != downPaymentWrapper.PaytmWrap.PaytmList.length){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please Upload a file for Paytm"
                });
                toastEvent.fire();
                return;
            }
            for(var i=0;i<downPaymentWrapper.PaytmWrap.PaytmList.length;i++){
                totalAmountCount+=parseInt(downPaymentWrapper.PaytmWrap.PaytmList[i].amount);      
            }
            //totalAmountCount+=parseInt(downPaymentWrapper.Paytm.amount);      
        }
        if(downPaymentWrapper.SwipeWrap.isSelected==true){
            for(var i=0;i<downPaymentWrapper.SwipeWrap.SwipeList.length;i++){
                if(downPaymentWrapper.SwipeWrap.SwipeList[i].referenceId==''){
                    helper.showToast(component, event, helper,'error','Please enter a reference number for Swipe Payment');
                    return;
                }
                if(downPaymentWrapper.SwipeWrap.SwipeList[i].referenceId!=downPaymentWrapper.SwipeWrap.SwipeList[i].Confirmrefrenceid){
                    helper.showToast(component, event, helper,'error','reference id and confirm reference id are same for Swipe Payment');
                    return;
                }
                
               if(referenceIdSet.includes(downPaymentWrapper.SwipeWrap.SwipeList[i].referenceId))
                {
                    
                   helper.showToast(component, event, helper,'error','Enter Unique reference id for Swipe '+i);
                    return; 
                } 
            }
            
            var count = 0;
            for(var i in allFiles){
                if(allFiles[i].title.indexOf('Down Swipe') != -1){
                    count++;
                }  
            }
            if(count!=downPaymentWrapper.SwipeWrap.SwipeList.length){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Please Upload a file for Swipe"
                });
                toastEvent.fire();
                return;
            }
            //totalAmountCount+=parseInt(downPaymentWrapper.Swipe.amount);
            for(var i=0;i<downPaymentWrapper.SwipeWrap.SwipeList.length;i++){
                totalAmountCount+=parseInt(downPaymentWrapper.SwipeWrap.SwipeList[i].amount);      
            }
        }
        if(parseInt(totalAmountCount) < parseInt(loanAmountTotal)){
            helper.showToast(component, event, helper,'error','Total Amount is less than Total Downpayment');
            return;
        }
        if(parseInt(totalAmountCount) > parseInt(loanAmountTotal)){
            helper.showToast(component, event, helper,'error','Total Amount is greater than Total Downpayment');
            return;
        }
         
        
        
        
        
        
        
        component.set("v.hasTakenLoan",false);
        component.set("v.hasTakenLoan",false);
        component.set("v.LoanPaymentModal",false);
        helper.finalProceedPayment(component, event, helper);
    },
    finalProceedPaymentController : function(component, event, helper){
        
        try{   
                

                 var fList =component.get("v.anyFile");
            
            var customerSP = component.get("v.customerSP22");
            var PaymentMode = component.get("v.PaymentMode");
            console.log("PaymentMode--> "+ JSON.stringify(PaymentMode));
            
            var allreadyPaidPayment = component.get("v.paidPayment"); //Abhilash 
            var allreadyPaidPayments = component.get("v.allreadyPaidPaymentList");
            var EducationLoanAmt = component.get("v.paidPreLoanPayment");
            
            //let referenceIdSet = [];
           // var hasReferenceId = 0;
            window.referenceIdSet = [];
             window.hasReferenceId = 0;
            
            var minimumPercantageValue = component.get("v.minimumPercantageValue");
            var minimumPercantageType = component.get("v.minimumPercantageType");
            var totalAmountCount = 0;
            var totalMinimumAmt = 0; // sum of all payments (main+down) excluding loan 
            
            if (allreadyPaidPayment > 0) {
                //totalAmountCount += parseInt(allreadyPaidPayment);
                //totalMinimumAmt += parseInt(allreadyPaidPayment);
                PaymentMode.allreadyPaid.isSelected = true;
                PaymentMode.allreadyPaid.paymentList = allreadyPaidPayments
            } 
            if(PaymentMode.Adjust.isSelected==true){
                
                totalAmountCount+=parseInt(PaymentMode.Adjust.amount);
                totalMinimumAmt+=parseInt(PaymentMode.Adjust.amount);
            }
            if(PaymentMode.onlinePayment.isSelected==true){
                
                totalAmountCount+=parseInt(PaymentMode.onlinePayment.amount);
                totalMinimumAmt += parseInt(PaymentMode.onlinePayment.amount);
            }
            if(PaymentMode.BankTransfer.isSelected==true){
                // //('hello11');
                totalAmountCount+=parseInt(PaymentMode.BankTransfer.amount);
                totalMinimumAmt += parseInt(PaymentMode.BankTransfer.amount);
            }
            if(PaymentMode.PaytmCode.isSelected==true){
                // //('hello1122');
                totalAmountCount+=parseInt(PaymentMode.PaytmCode.amount);
                totalMinimumAmt += parseInt(PaymentMode.PaytmCode.amount);
            }
            if(PaymentMode.chequePaymentsWrap.isSelected==true){
                //Upload File validation -- Start
                if(component.find("fuploadercheque").length != undefined){
                    for(var i=0;i<component.find("fuploadercheque").length;i++)
                    {
                        if(component.find("fuploadercheque")[i].get("v.value") == '' || component.find("fuploadercheque")[i].get("v.value") == null) {
                            helper.showToast(component, event, helper,'error','Please select file for Cheque Payment '+i);
                            return;
                        }
                    }
                }else{
                    if(component.find("fuploadercheque").get("v.value") == '' || component.find("fuploadercheque").get("v.value") == null) {
                        helper.showToast(component, event, helper,'error','Please select file for Cheque Payment 0');
                        return;
                    }
                }
                //Upload File validation -- End
                for(var i=0;i<PaymentMode.chequePaymentsWrap.chequePaymentsList.length;i++){
                    if(PaymentMode.chequePaymentsWrap.chequePaymentsList[i].referenceId==''){
                        helper.showToast(component, event, helper,'error','Please enter a reference number for cheque Payment '+i);
                        return;
                    }
                    var chequeNum = PaymentMode.chequePaymentsWrap.chequePaymentsList[i].chequeNumber;
                    if(chequeNum.toString().length < 6){
                        helper.showToast(component, event, helper,'error','Please enter a valid 6 digits cheque number for '+i);
                        return;
                    }
                    /*    if(fList.length==0)
                {
                    helper.showToast(component, event, helper,'error','Please upload a file for Cheque '+i);
                    return;
                }
                else
                    
                {
                    var bypass = true;
                    for(var j=0;j<fList.length;i++)
                    {
                        if(fList[j].title==(i+'Cheque'))
                        {
                            bypass = false;
                        }
                    }
                    if(bypass == true)
                    {
                        helper.showToast(component, event, helper,'error','Please upload a file for Cheque '+i);
                        return;   
                    }
                }*/
                    
                    if(!referenceIdSet.includes(PaymentMode.chequePaymentsWrap.chequePaymentsList[i].chequeNumber))
                        referenceIdSet.push(PaymentMode.chequePaymentsWrap.chequePaymentsList[i].chequeNumber);
                    hasReferenceId++;
                    totalAmountCount+=parseInt(PaymentMode.chequePaymentsWrap.chequePaymentsList[i].chequeAmount); 
                    totalMinimumAmt += parseInt(PaymentMode.chequePaymentsWrap.chequePaymentsList[i].chequeAmount);
                }
            }
            if(PaymentMode.Cash.isSelected==true){
                totalAmountCount+=parseInt(PaymentMode.Cash.amount);  
                totalMinimumAmt += parseInt(PaymentMode.Cash.amount);
            }
            if(PaymentMode.EducationLoan.isSelected==true){
                totalAmountCount+=parseInt(PaymentMode.EducationLoan.amount);  
                //totalMinimumAmt += parseInt(PaymentMode.EducationLoan.amount);
                if(parseInt(EducationLoanAmt) > parseInt(PaymentMode.EducationLoan.amount) || parseInt(EducationLoanAmt) < parseInt(PaymentMode.EducationLoan.amount)){
                    helper.showToast(component, event, helper,'error','Education Loan amount cannot be greater or less than applied loan amount');
                    return;
                } 
                
                PaymentMode.EducationLoan.totalEmi = component.get("v.totalEmiForEducationLoan");
                PaymentMode.EducationLoan.EDPayID = component.get("v.EDPayID");
            }
            if(PaymentMode.NeftWrap.isSelected==true){
                //Upload File validation -- Start
                if(component.find("fuploaderNEFT").length != undefined){
                    for(var i=0;i<component.find("fuploaderNEFT").length;i++){
                        if(component.find("fuploaderNEFT")[i].get("v.value") == '' || component.find("fuploaderNEFT")[i].get("v.value") == null) {
                            helper.showToast(component, event, helper,'error','Please select file for Neft Payment '+i);
                            return;
                        }
                    }
                }else{
                    if(component.find("fuploaderNEFT").get("v.value") == '' || component.find("fuploaderNEFT").get("v.value") == null) {
                        helper.showToast(component, event, helper,'error','Please select file for Neft Payment 0');
                        return;
                    }
                }
                //Upload File validation -- End
                for(var i=0;i<PaymentMode.NeftWrap.NeftList.length;i++)
                {
                    if(PaymentMode.NeftWrap.NeftList[i].referenceId==''){
                        helper.showToast(component, event, helper,'error','Please enter a reference number for Neft Payment '+i);
                        return;
                    }
                    if(PaymentMode.NeftWrap.NeftList[i].referenceId!=PaymentMode.NeftWrap.NeftList[i].Confirmrefrenceid){
                        helper.showToast(component, event, helper,'error','Referenceid and confirm referenceid  are not same for Neft Payment '+i);
                        return;
                    }
                    /*  if(fList.length==0){
                        helper.showToast(component, event, helper,'error','Please upload a file for NEFT '+i);
                        return;
                    }
                    else
                        
                    {////('kk');
                        var bypass = true;
                        for(var j=0;j<fList.length;i++)
                        {////('kkinsidefor');
                            if(fList[j].title==(i+'Neft'))
                            {
                                bypass = false;
                            }
                            ////('heloo');
                        }
                        ////('kk67');
                        if(bypass == true)
                        {
                            helper.showToast(component, event, helper,'error','Please upload a file for NEFT '+i);
                            return;   
                        }
                    }       */             
                    
                    if(!referenceIdSet.includes(PaymentMode.NeftWrap.NeftList[i].referenceId))
                        referenceIdSet.push(PaymentMode.NeftWrap.NeftList[i].referenceId);
                    hasReferenceId++;
                    totalAmountCount+=parseInt(PaymentMode.NeftWrap.NeftList[i].amount); 
                    totalMinimumAmt += parseInt(PaymentMode.NeftWrap.NeftList[i].amount);
                }
            }
            if(component.get('v.Uaepayment')===true)
            {
               // alert('helooooooonnedt')
                PaymentMode.NeftWrap.isSelected=true;
                component.set('v.PaymentMode',PaymentMode)
              for(var i=0;i<PaymentMode.NeftWrap.NeftList.length;i++)
              {
                  
                  
                    
                    if(PaymentMode.NeftWrap.NeftList[i].referenceId!=PaymentMode.NeftWrap.NeftList[i].Confirmrefrenceid){
                        helper.showToast(component, event, helper,'error','Referenceid and confirm referenceid  are not same for Neft Payment ');
                        return;
                    }
                  //Upload File validation -- Start
                if(component.find("fuploaderNEFT").length != undefined){
                    for(var i=0;i<component.find("fuploaderNEFT").length;i++){
                        if(component.find("fuploaderNEFT")[i].get("v.value") == '' || component.find("fuploaderNEFT")[i].get("v.value") == null) {
                            helper.showToast(component, event, helper,'error','Please select file for Neft Payment '+i);
                            return;
                        }
                    }
                }else{
                    if(component.find("fuploaderNEFT").get("v.value") == '' || component.find("fuploaderNEFT").get("v.value") == null) {
                        helper.showToast(component, event, helper,'error','Please select file for Neft Payment 0');
                        return;
                    }
                }
                     
                    
                    if(!referenceIdSet.includes(PaymentMode.NeftWrap.NeftList[i].referenceId))
                    {
                        referenceIdSet.push(PaymentMode.NeftWrap.NeftList[i].referenceId);
                    }
                    //hasReferenceId++;
                    totalAmountCount=0;
                    totalAmountCount+=parseInt(PaymentMode.NeftWrap.NeftList[i].amount); 
                  
              }
            }
            
            if(PaymentMode.PaytmWrap.isSelected==true){
                //Upload File validation -- Start
                if(component.find("fuploaderPaytm").length != undefined){
                    for(var i=0;i<component.find("fuploaderPaytm").length;i++){
                        if(component.find("fuploaderPaytm")[i].get("v.value") == '' || component.find("fuploaderPaytm")[i].get("v.value") == null) {
                            helper.showToast(component, event, helper,'error','Please select file for Paytm Payment '+i);
                            return;
                        }
                    }
                }else{
                    if(component.find("fuploaderPaytm").get("v.value") == '' || component.find("fuploaderPaytm").get("v.value") == null) {
                        helper.showToast(component, event, helper,'error','Please select file for Paytm Payment 0');
                        return;
                    }
                }
                //Upload File validation -- End
                for(var i=0;i<PaymentMode.PaytmWrap.PaytmList.length;i++){
                    if(PaymentMode.PaytmWrap.PaytmList[i].referenceId==''){
                        helper.showToast(component, event, helper,'error','Please enter a reference number for Paytm Payment '+i);
                        return;
                    }
                     if(PaymentMode.PaytmWrap.PaytmList[i].referenceId!=PaymentMode.PaytmWrap.PaytmList[i].Confirmrefrenceid){
                        helper.showToast(component, event, helper,'error','Reference id and Confirm referenceid are not same for Paytm Payment '+i);
                        return;
                    }
                    /*   if(fList.length==0)
                {
                    helper.showToast(component, event, helper,'error','Please upload a file for Paytm '+i);
                    return;
                }
                else
                    
                {////('kk');
                    var bypass = true;
                    for(var j=0;j<fList.length;i++)
                    {////('kkinsidefor');
                        if(fList[j].title==(i+'Paytm'))
                        {
                            bypass = false;
                        }
                        ////('heloo');
                    }
                    ////('kk67');
                    if(bypass == true)
                    {
                        helper.showToast(component, event, helper,'error','Please upload a file for Paytm '+i);
                        return;   
                    }
                } */
                    if(!referenceIdSet.includes(PaymentMode.PaytmWrap.PaytmList[i].referenceId))
                        referenceIdSet.push(PaymentMode.PaytmWrap.PaytmList[i].referenceId);
                    hasReferenceId++;
                    totalAmountCount+=parseInt(PaymentMode.PaytmWrap.PaytmList[i].amount); 
                    totalMinimumAmt += parseInt(PaymentMode.PaytmWrap.PaytmList[i].amount);
                }
            }
            if(PaymentMode.SwipeWrap.isSelected==true){
                //Upload File validation -- Start
                if(component.find("fuploaderSwipe").length != undefined){
                    for(var i=0;i<component.find("fuploaderSwipe").length;i++){
                        if(component.find("fuploaderSwipe")[i].get("v.value") == '' || component.find("fuploaderSwipe")[i].get("v.value") == null) {
                            helper.showToast(component, event, helper,'error','Please select file for Swipe Payment '+i);
                            return;
                        }
                    }
                }else{
                    if(component.find("fuploaderSwipe").get("v.value") == '' || component.find("fuploaderSwipe").get("v.value") == null) {
                        helper.showToast(component, event, helper,'error','Please select file for Swipe Payment 0');
                        return;
                    }
                }
                //Upload File validation -- End
                for(var i=0;i<PaymentMode.SwipeWrap.SwipeList.length;i++){
                    if(PaymentMode.SwipeWrap.SwipeList[i].referenceId==''){
                        helper.showToast(component, event, helper,'error','Please enter a reference number for Swipe Payment '+i);
                        return;
                    }
                    if(PaymentMode.SwipeWrap.SwipeList[i].referenceId!=PaymentMode.SwipeWrap.SwipeList[i].Confirmrefrenceid){
                        helper.showToast(component, event, helper,'error','reference id And confirm referenceid are not same for Swipe Payment '+i);
                        return;
                    }
                    
                    /*     if(fList.length==0)
                     {
                         helper.showToast(component, event, helper,'error','Please upload a file for Swipe '+1);
                         return;
                     }
                     else
                         
                     {////('kk');
                         var bypass = true;
                         for(var j=0;j<fList.length;i++)
                         {////('kkinsidefor');
                             if(fList[j].title==(i+'Swipe'))
                             {
                                 bypass = false;
                             }
                             ////('heloo');
                         }
                         ////('kk67');
                         if(bypass == true)
                         {
                             helper.showToast(component, event, helper,'error','Please upload a file for Swipe '+i);
                             return;   
                         }
                     }    
                     */
                    
                    
                    if(!referenceIdSet.includes(PaymentMode.SwipeWrap.SwipeList[i].referenceId))
                        referenceIdSet.push(PaymentMode.SwipeWrap.SwipeList[i].referenceId);
                    hasReferenceId++;
                    totalAmountCount+=parseInt(PaymentMode.SwipeWrap.SwipeList[i].amount);
                    totalMinimumAmt += parseInt(PaymentMode.SwipeWrap.SwipeList[i].amount);
                }
            }
            if(PaymentMode.ZestMoney.isSelected==true){
                //Upload File validation -- Start
                if(component.find("fuploaderZestMoney").get("v.value") == '' || component.find("fuploaderZestMoney").get("v.value") == null) {
                    helper.showToast(component, event, helper,'error','Please select file for ZestMoney Payment 0');
                    return;
                }
                //Upload File validation -- End
                if(PaymentMode.ZestMoney.referenceId==''){
                    helper.showToast(component, event, helper,'error','Please enter a reference number for ZestMoney Payment');
                    return;
                }
                if(PaymentMode.ZestMoney.referenceId!=PaymentMode.ZestMoney.Confirmrefrenceid){
                    helper.showToast(component, event, helper,'error','reference id And confirm referenceid are not same for ZestMoney Payment');
                    return;
                }
                
                if(fList.length==0)
                {
                    helper.showToast(component, event, helper,'error','Please upload a file');
                    return;
                }
                else
                    
                {////('kk');
                    var bypass = true;
                    for(var i=0;i<fList.length;i++)
                    {////('kkinsidefor');
                        if(fList[i].title=='Shopse')
                        {
                            bypass = false;
                        }
                        ////('heloo');
                    }
                    ////('kk67');
                    if(bypass == true)
                    {
                        helper.showToast(component, event, helper,'error','Please upload a file for ZEST Money');
                        return;   
                    }
                }    
                
                if(!referenceIdSet.includes(PaymentMode.ZestMoney.referenceId))
                    referenceIdSet.push(PaymentMode.ZestMoney.referenceId);
                hasReferenceId++;
                totalAmountCount+=parseInt(PaymentMode.ZestMoney.amount);   
                totalMinimumAmt += parseInt(PaymentMode.ZestMoney.amount);
            }
            if(PaymentMode.Enach.isSelected==true){
                
                if(parseInt(PaymentMode.Enach.amount) < 9000){
                    helper.showToast(component, event, helper,'error','Please enter Enach Amount minimum of 9000');
                    return;
                }
                
                totalAmountCount+=parseInt(PaymentMode.Enach.amount);  
                totalMinimumAmt += parseInt(PaymentMode.Enach.amount);
            }
            if(PaymentMode.PDC.isSelected==true){
                //Upload File validation -- Start
                if(component.find("fuploaderPDC").get("v.value") == '' || component.find("fuploaderPDC").get("v.value") == null) {
                    helper.showToast(component, event, helper,'error','Please select file for PDC Payment 0');
                    return;
                }
                //Upload File validation -- End
                if(PaymentMode.PDC.referenceId==''){
                    helper.showToast(component, event, helper,'error','Please enter a reference number for PDC Payment');
                    return;
                }
                
                if(fList.length==0)
                {
                    helper.showToast(component, event, helper,'error','Please upload a file');
                    return;
                }
                else
                    
                {////('kk');
                    var bypass = true;
                    for(var i=0;i<fList.length;i++)
                    {////('kkinsidefor');
                        if(fList[i].title=='PDC')
                        {
                            bypass = false;
                        }
                        ////('heloo');
                    }
                    ////('kk67');
                    if(bypass == true)
                    {
                        helper.showToast(component, event, helper,'error','Please upload a file for PDC');
                        return;   
                    }
                }    
                
                if(!referenceIdSet.includes(PaymentMode.PDC.referenceId))
                    referenceIdSet.push(PaymentMode.PDC.referenceId);
                hasReferenceId++;
                totalAmountCount+=parseInt(PaymentMode.PDC.amount);        
            }
            
            var isEmloan = 'false';
            for(var i in PaymentMode.loanPaymentsWrapper){
                console.log("PaymentMode.loanPaymentsWrapper[i].isSelected --- > "+JSON.stringify(PaymentMode.loanPaymentsWrapper[i]));
                if(PaymentMode.loanPaymentsWrapper[i].isSelected==true && PaymentMode.loanPaymentsWrapper[i].referenceId==''){
                    helper.showToast(component, event, helper,'error','Please enter a reference number for '+PaymentMode.loanPaymentsWrapper[i].name+' Loan');
                    return;
                }
                
                if(PaymentMode.loanPaymentsWrapper[i].isSelected==true && !PaymentMode.loanPaymentsWrapper[i].referenceId==''){
                    if(!referenceIdSet.includes(PaymentMode.loanPaymentsWrapper[i].referenceId)){
                        referenceIdSet.push(PaymentMode.loanPaymentsWrapper[i].referenceId);
                    hasReferenceId++;  
                    }
                    totalMinimumAmt += parseInt(PaymentMode.loanPaymentsWrapper[i].downPayment);
                    console.log('abh-> '+ PaymentMode.loanPaymentsWrapper[i].downPayment + ' ==> '+ PaymentMode.loanPaymentsWrapper[i].amount);
                    if(PaymentMode.loanPaymentsWrapper[i].name == 'EMLOAN'){
                        isEmloan = 'true';
                    }
                }
                
                totalAmountCount+= parseInt(PaymentMode.loanPaymentsWrapper[i].amount);
            }
            // //("totalAmountCount--> "+totalAmountCount);
            // //("referenceIdSet--> "+JSON.stringify(referenceIdSet));
            // //("length--> "+referenceIdSet.length);
            console.log("hasReferenceId "+hasReferenceId);
            console.log("referenceIdSet --> "+JSON.stringify(referenceIdSet));
               if(component.get('v.Uaepayment')===false)
            {
            if(hasReferenceId > 0 && hasReferenceId != referenceIdSet.length){
               // alert('test id')
                helper.showToast(component, event, helper,'error','Please Enter Unique Reference Id for Each Payment');
                return;
            }
            }
            console.log("totalAmountCount ---> "+totalAmountCount);
            console.log("customerSP ---> "+customerSP);
            
            var amt= component.get('v.paidPayment');
            var PaymentMode = component.get("v.PaymentMode");
            var downPaymentWrapper = component.get("v.downPaymentWrapper");
            var totalamountpaidforadjust=parseInt(downPaymentWrapper.Adjust.amount)+parseInt(PaymentMode.Adjust.amount);
            //Abhilash alert(totalamountpaidforadjust+'totalamountpaidforadjust');
            if(parseInt(totalamountpaidforadjust) > parseInt(amt)){
                helper.showToast(component, event, helper,'error','Adjustable amount cannot be greater than already paid amount');
                return;
            } 
            if(parseInt(totalamountpaidforadjust) < parseInt(amt)){
                //helper.showToast(component, event, helper,'error','Adjustable amount cannot be less than already paid amount');
                //return;
            }
            
            //Condition for total Amount
            if( parseInt(totalAmountCount) < parseInt(customerSP) ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Total Amount is not equal to the customer SP Amount"
                });
                toastEvent.fire();
                return;
            }
            if( parseInt(totalAmountCount) > parseInt(customerSP) ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Total Amount is greater than customer SP Amount"
                });
                toastEvent.fire();
                return;
            }
            //(customerSP);
            if(customerSP=='0'  ){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": "Total Amount not customer SP Amount"
                });
                toastEvent.fire();
                return;
            }
            
            /* Abhilash*/
            var totalMinimumAmtForHardware=component.get('v.totalMinimumAmtForHardware');
            var MinAmtToBeCollected = 0;
            if(isEmloan == 'true'){
                var minimumPercantageValue = component.get("v.minimumPercantageValueWithEmloan");
                var minimumPercantageType = component.get("v.minimumPercantageTypeWithEmloan");    
            }else{
                var minimumPercantageValue = component.get("v.minimumPercantageValue");
                var minimumPercantageType = component.get("v.minimumPercantageType");
            }
            console.log("minimumPercantageValue ---> " + minimumPercantageValue + ' ==> '+ minimumPercantageType);
        	
            if(minimumPercantageType == 'Percentage'){
                MinAmtToBeCollected = (parseInt(customerSP)*parseInt(minimumPercantageValue))/100;
            }
            if(minimumPercantageType == 'Flat'){
                MinAmtToBeCollected = parseInt(minimumPercantageValue);
            }
            
            if(parseInt(MinAmtToBeCollected) < parseInt(totalMinimumAmtForHardware)){
                MinAmtToBeCollected = totalMinimumAmtForHardware;
            }
            console.log('MinAmtToBeCollected => '+MinAmtToBeCollected + ' totalMinimumAmt-> '+ totalMinimumAmt);
            //alert('MinAmtToBeCollected => '+MinAmtToBeCollected);
            
            component.set("v.Minimum_Amount", MinAmtToBeCollected);
            if (parseInt(MinAmtToBeCollected) > parseInt(totalMinimumAmt)) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    type: "error",
                    message: "Minimum amt should be "+MinAmtToBeCollected + " excluding loan amt"
                });
                toastEvent.fire();
                return;
            }
            
            //  //('kkkkkkkkkkkk');
            helper.checkLoanAmount(component, event, helper,PaymentMode);
           
            
    
            }
        catch(err){
            console.log('final Error'+err);
        }
        
    },  
    
    totalamoutmius : function(component, event, helper){ 
        debugger;
        ////(event.getSource().get('v.value'))
        ////();
        try{ 
            var amountdeduct=0;
            var paymentType = event.getSource().get("v.name");
            ////(paymentType );
            var onlinePayment=component.get("v.onlinePayment");
            var fList =component.get("v.anyFile");
            // calculate total amount start
            helper.calculateBalancePaymentMode(component, event, helper);
            // calculate total amount end
            
            
        }catch(err){
            return err;
            console.log('final Error3443'+err);
            
        }
        
        
    },  
    
    
    
    
    checkChequeDate  : function(component, event, helper){
        var date = event.getSource().get("v.value");
        var dt = new Date();
        var fourDaysDate = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate() - 4);
        var selectedDate = new Date(date);
        
        if(selectedDate < fourDaysDate){
            let toastEvent = $A.get('e.force:showToast');
            toastEvent.setParams({
                "type" : "error",
                "message" : "Please enter date not before than 4 days"
            });
            toastEvent.fire();
            
            component.set("v.PaymentMode.chequePaymentsWrapper.chequeDate",'');
            return;
        }
    },
    
    getSelectedGenre : function(component, event, helper){
        //Get selected Genre List on button click 
        var selectedValues = component.get("v.selectedGenreList");
        console.log('Selectd Genre-' + selectedValues);
    },
    handleGenreChange: function (component, event, helper) {
        //Get the Selected values   
        var selectedValues = event.getParam("value");
        
        //Update the Selected Values  
        component.set("v.selectedGenreList", selectedValues);
    },
    closeModel: function(component, event, helper) {
        component.set("v.whatsapp", false);
    },
    addRow : function (component, event, helper) {
        var paymentType = event.getSource().get("v.name");
        console.log(paymentType);
        var PaymentMode = component.get("v.PaymentMode");
        console.log("PaymentMode.NeftWrap---> "+JSON.stringify(PaymentMode.NeftWrap));
        if(paymentType=='Neft'){
            if(PaymentMode.NeftWrap.NeftList.length<3){
                var NeftList =PaymentMode.NeftWrap.NeftList;
                console.log("NeftList--> "+JSON.stringify(NeftList));
                var neftObj = {"amount":0,
                               "isSelected":false,
                               "referenceId":""};
                NeftList.push(neftObj);
                PaymentMode.NeftWrap.NeftList = NeftList;
            }
        }else if(paymentType=='Paytm'){
            if(PaymentMode.PaytmWrap.PaytmList.length<3){
                var PaytmList =PaymentMode.PaytmWrap.PaytmList;
                console.log("PaytmWrap--> "+JSON.stringify(PaytmList));
                var paytmObj = {"amount":0,
                                "isSelected":false,
                                "referenceId":""};
                PaytmList.push(paytmObj);
                PaymentMode.PaytmWrap.PaytmList = PaytmList;
            }
        }else if(paymentType=='Swipe'){
            if(PaymentMode.SwipeWrap.SwipeList.length<3){
                var SwipeList =PaymentMode.SwipeWrap.SwipeList;
                console.log("SwipeList--> "+JSON.stringify(SwipeList));
                var swipeObj = {"amount":0,
                                "isSelected":false,
                                "referenceId":""};
                SwipeList.push(swipeObj);
                PaymentMode.SwipeWrap.SwipeList = SwipeList;
            }
        }else if(paymentType=='Cheque'){
            if(PaymentMode.chequePaymentsWrap.chequePaymentsList.length<3){
                var chequePaymentsList =PaymentMode.chequePaymentsWrap.chequePaymentsList;
                console.log("chequePaymentsList--> "+JSON.stringify(chequePaymentsList));
                var chequeObj = {"chequeAmount":0,
                                 "chequeDate":"",
                                 "chequeNumber":"",
                                 "isSelected":false};
                chequePaymentsList.push(chequeObj);
                PaymentMode.chequePaymentsWrap.chequePaymentsList = chequePaymentsList;
            }
        }
        console.log("PaymentMode.SwipeWrap---> "+JSON.stringify(PaymentMode.SwipeWrap));
        component.set("v.PaymentMode",PaymentMode);
        helper.calculateBalancePaymentMode(component, event, helper);
    },
    deleteRow: function (component, event, helper) {
        var paymentType = event.getSource().get("v.name");
        console.log(paymentType);
        var index = event.getSource().get("v.title");
        console.log("index  "+index);
        var PaymentMode = component.get("v.PaymentMode");
        console.log("PaymentMode.NeftWrap---> "+JSON.stringify(PaymentMode.NeftWrap));
        if(paymentType=='Neft'){
            if(PaymentMode.NeftWrap.NeftList.length>=2){
                var NeftList =PaymentMode.NeftWrap.NeftList;
                console.log("NeftList--> "+JSON.stringify(NeftList));
                NeftList.splice(index,1);
                PaymentMode.NeftWrap.NeftList = NeftList;
            }
        }else if(paymentType=='Paytm'){
            if(PaymentMode.PaytmWrap.PaytmList.length>=2){
                var PaytmList =PaymentMode.PaytmWrap.PaytmList;
                console.log("PaytmList--> "+JSON.stringify(PaytmList));
                PaytmList.splice(index,1);
                PaymentMode.PaytmWrap.PaytmList = PaytmList;
            }
        }else if(paymentType=='Swipe'){
            if(PaymentMode.SwipeWrap.SwipeList.length>=2){
                var SwipeList =PaymentMode.SwipeWrap.SwipeList;
                console.log("SwipeList--> "+JSON.stringify(SwipeList));
                SwipeList.splice(index,1);
                PaymentMode.SwipeWrap.SwipeList = SwipeList;
            }
        }else if(paymentType=='Cheque'){
            if(PaymentMode.chequePaymentsWrap.chequePaymentsList.length>=2){
                var chequePaymentsList =PaymentMode.chequePaymentsWrap.chequePaymentsList;
                console.log("chequePaymentsList--> "+JSON.stringify(chequePaymentsList));
                chequePaymentsList.splice(index,1);
                PaymentMode.chequePaymentsWrap.chequePaymentsList = chequePaymentsList;
            }
        }
        console.log("PaymentMode.NeftWrap---> "+JSON.stringify(PaymentMode.NeftWrap));
        component.set("v.PaymentMode",PaymentMode);
        helper.calculateBalancePaymentMode(component, event, helper);
    },
    addDownRow : function (component, event, helper) {
        var paymentType = event.getSource().get("v.name");
        console.log(paymentType);
        var downPaymentWrapper = component.get("v.downPaymentWrapper");
        console.log("downPaymentWrapper.NeftWrap---> "+JSON.stringify(downPaymentWrapper.NeftWrap));
        if(paymentType=='Neft'){
            if(downPaymentWrapper.NeftWrap.NeftList.length<3){
                var NeftList =downPaymentWrapper.NeftWrap.NeftList;
                console.log("NeftList--> "+JSON.stringify(NeftList));
                var neftObj = {"amount":0,
                               "isSelected":false,
                               "referenceId":""};
                NeftList.push(neftObj);
                downPaymentWrapper.NeftWrap.NeftList = NeftList;
            }
        }else if(paymentType=='Paytm'){
            if(downPaymentWrapper.PaytmWrap.PaytmList.length<3){
                var PaytmList =downPaymentWrapper.PaytmWrap.PaytmList;
                console.log("PaytmWrap--> "+JSON.stringify(PaytmList));
                var paytmObj = {"amount":0,
                                "isSelected":false,
                                "referenceId":""};
                PaytmList.push(paytmObj);
                downPaymentWrapper.PaytmWrap.PaytmList = PaytmList;
            }
        }else if(paymentType=='Swipe'){
            if(downPaymentWrapper.SwipeWrap.SwipeList.length<3){
                var SwipeList =downPaymentWrapper.SwipeWrap.SwipeList;
                console.log("SwipeList--> "+JSON.stringify(SwipeList));
                var swipeObj = {"amount":0,
                                "isSelected":false,
                                "referenceId":""};
                SwipeList.push(swipeObj);
                downPaymentWrapper.SwipeWrap.SwipeList = SwipeList;
            }
        }else if(paymentType=='Cheque'){
            if(downPaymentWrapper.chequePaymentsWrap.chequePaymentsList.length<3){
                var chequePaymentsList =downPaymentWrapper.chequePaymentsWrap.chequePaymentsList;
                console.log("chequePaymentsList--> "+JSON.stringify(chequePaymentsList));
                var chequeObj = {"chequeAmount":0,
                                 "chequeDate":"",
                                 "chequeNumber":"",
                                 "isSelected":false};
                chequePaymentsList.push(chequeObj);
                downPaymentWrapper.chequePaymentsWrap.chequePaymentsList = chequePaymentsList;
            }
        }
        console.log("downPaymentWrapper.SwipeWrap---> "+JSON.stringify(downPaymentWrapper.SwipeWrap));
        component.set("v.downPaymentWrapper",downPaymentWrapper);
        
    },
    deleteDownRow: function (component, event, helper) {
        var paymentType = event.getSource().get("v.name");
        console.log(paymentType);
        var index = event.getSource().get("v.title");
        console.log("index  "+index);
        var downPaymentWrapper = component.get("v.downPaymentWrapper");
        console.log("downPaymentWrapper.NeftWrap---> "+JSON.stringify(downPaymentWrapper.NeftWrap));
        if(paymentType=='Neft'){
            if(downPaymentWrapper.NeftWrap.NeftList.length>=2){
                var NeftList =downPaymentWrapper.NeftWrap.NeftList;
                console.log("NeftList--> "+JSON.stringify(NeftList));
                NeftList.splice(index,1);
                downPaymentWrapper.NeftWrap.NeftList = NeftList;
            }
        }else if(paymentType=='Paytm'){
            if(downPaymentWrapper.PaytmWrap.PaytmList.length>=2){
                var PaytmList =downPaymentWrapper.PaytmWrap.PaytmList;
                console.log("PaytmList--> "+JSON.stringify(PaytmList));
                PaytmList.splice(index,1);
                downPaymentWrapper.PaytmWrap.PaytmList = PaytmList;
            }
        }else if(paymentType=='Swipe'){
            if(downPaymentWrapper.SwipeWrap.SwipeList.length>=2){
                var SwipeList =downPaymentWrapper.SwipeWrap.SwipeList;
                console.log("SwipeList--> "+JSON.stringify(SwipeList));
                SwipeList.splice(index,1);
                downPaymentWrapper.SwipeWrap.SwipeList = SwipeList;
            }
        }else if(paymentType=='Cheque'){
            if(downPaymentWrapper.chequePaymentsWrap.chequePaymentsList.length>=2){
                var chequePaymentsList =downPaymentWrapper.chequePaymentsWrap.chequePaymentsList;
                console.log("chequePaymentsList--> "+JSON.stringify(chequePaymentsList));
                chequePaymentsList.splice(index,1);
                downPaymentWrapper.chequePaymentsWrap.chequePaymentsList = chequePaymentsList;
            }
        }
        console.log("downPaymentWrapper.NeftWrap---> "+JSON.stringify(downPaymentWrapper.NeftWrap));
        component.set("v.downPaymentWrapper",downPaymentWrapper);
    }
})