({
    // Constants
    TOAST_DURATION: 500,
    COUNTRY_CODES: {
        INDIA: '+91',
        UAE: '+971'
    },

    // Utility function to show toast
    showToast: function(type, message) {
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            type,
            message,
            duration: this.TOAST_DURATION,
            mode: 'pester',
            key: 'info_alt'
        });
        toastEvent.fire();
    },

    // Validation Helpers
    isValidPhoneNumber: function(phone, code) {
        const expectedLength = code === this.COUNTRY_CODES.INDIA ? 10 : code === this.COUNTRY_CODES.UAE ? 9 : null;
        return expectedLength !== null && phone && phone.length === expectedLength;
    },

    isValidEmail: function(email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    },

    addsibling2: function(component, event, helper) {
        const acc = component.get("v.acc");
        const {
            Country__c: country,
            School_Name__c: schoolName,
            Secondary_Mobile_Number__c: secondaryNo,
            Phone: mobile,
            countrycode__c: countryCode,
            Alternate_Email__c: altEmail,
            Email__c: email,
            Name: firstName,
            Guardian_Name__c: parentName
        } = acc;

        if (countryCode === this.COUNTRY_CODES.INDIA && secondaryNo.length !== 10) {
            this.showToast('error', 'Please enter a valid alternate number according to country code');
            return;
        }

        if (!parentName) {
            this.showToast('error', 'Please enter Parent Name');
            return;
        }

        if (!email || email.trim() === '') {
            this.showToast('error', 'Please enter Email');
            return;
        }

        if (!schoolName || !parentName || !email) return;

        const accId = component.find("harjeet").get("v.value");
        const siblingLeadId = id1.toString();

        const action2 = component.get('c.getLeadStatus');
        action2.setParams({ AccId: accId, SiblingLeadId: siblingLeadId });
        action2.setCallback(this, response => {
            if (response.getState() !== 'SUCCESS') return;

            const openLeadId = response.getReturnValue();

            if (openLeadId) {
                this.showToast('success', 'Open Lead already exists');
                helper.getClassPicklistValues(component, event, helper);
                helper.getsiblingrecord(component, event, helper);
                helper.getLeadrecord(component, event, helper);
                component.set("v.truthy5", true);
                component.set("v.truthy1", true);
                component.set("v.truthy4", false);
                component.set("v.siblingshow", false);
                component.set("v.option1", false);
                return;
            }

            const action = component.get('c.SiblingLead');
            action.setParams({ AccId: accId, SiblingLeadId: siblingLeadId });
            action.setCallback(this, res => {
                if (res.getState() !== 'SUCCESS') return;
                const responseValue = res.getReturnValue();
                this.showToast('success', 'Lead Created successfully');
                helper.getClassPicklistValues(component, event, helper);
                helper.getsiblingrecord(component, event, helper);
                helper.getLeadrecord(component, event, helper);
                component.set("v.truthy5", true);
                component.set("v.truthy1", true);
                component.set("v.truthy4", false);
                component.set("v.siblingshow", false);
                component.set("v.option1", false);
                component.set("v.SiblingLeadId", responseValue);
            });
            $A.enqueueAction(action);
        });

        $A.enqueueAction(action2);
    },

    addsiblingsave: function(component, event, helper) {
        const getValue = id => component.find(id).get("v.value");
        const siblingLeadId = id1.toString();

        const data = {
            Firstname: getValue("leadFirstName"),
            Lastname: getValue("leadLastName"),
            ParentName: getValue("leadParentName"),
            SchoolName: getValue("leadSchoolName"),
            City: getValue("city-record"),
            SchoolCode: getValue("city-records"),
            countrycode: getValue("leadISDCODE"),
            mobilenum: getValue("leadMobileName"),
            secondaryno: getValue("leadAlternateNumber"),
            email: getValue("leadEmailName"),
            emailacc: getValue("leadAltEmail")
        };

        if (!data.Firstname || !data.Lastname || !data.ParentName || !data.SchoolName || !data.City || !data.mobilenum || !data.email || !data.countrycode) {
            this.showToast('error', 'Please fill all required fields');
            return;
        }

        if (!this.isValidPhoneNumber(data.mobilenum, data.countrycode)) {
            this.showToast('error', 'Invalid mobile number based on country code');
            return;
        }

        if (data.secondaryno && !this.isValidPhoneNumber(data.secondaryno, data.countrycode)) {
            this.showToast('error', 'Invalid alternate number based on country code');
            return;
        }

        if (!this.isValidEmail(data.email)) {
            this.showToast('error', 'Please enter a valid email address');
            return;
        }

        if (data.emailacc && !this.isValidEmail(data.emailacc)) {
            this.showToast('error', 'Please enter a valid alternate email address');
            return;
        }

        component.set("v.toggleSpinner3", true);
        const siblingKey = component.get("v.SiblingKey");
        const randomNo = component.get("v.IsSamePhone") === 'True' ? Math.floor(1000000 * Math.random()) : null;

        const action = component.get("c.CreateSibLead");
        action.setParams({ ...data, SiblingLeadId: siblingLeadId, SiblingKey: siblingKey, RandomNo: randomNo });
        action.setCallback(this, response => {
            if (response.getState() !== 'SUCCESS') return;
            this.showToast('success', 'Lead Created successfully');
            helper.getClassPicklistValues(component, event, helper);
            helper.updatelead(component, event, helper);
            helper.getsiblingrecord(component, event, helper);
            helper.getLeadrecord(component, event, helper);
            component.set("v.truthy5", true);
            component.set("v.truthy1", true);
            component.set("v.truthy4", false);
            component.set("v.siblingshow", false);
        });
        $A.enqueueAction(action);
    }
})
