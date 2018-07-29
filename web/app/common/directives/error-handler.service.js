(function() {
    angular.module('app.common').service('errorHandlerService', errorHandlerService);

    errorHandlerService.$inject = ['$parse'];

    function errorHandlerService($parse) {
        this.handleError = handleError;
        this.removeError = removeError;
        this.addFieldMessage = addFieldMessage;

        function handleError(response, form, currentScope) {
            if (response.data.status && response.data.status == "ERROR" && response.data.errorCode && response.data.errorCode == "VALIDATION_ERROR") {
                var fieldMessages = response.data.data.fieldMessages;
                if (form.serverErrors) {
                    for (var i = 0; i < form.serverErrors.length; i++) {
                        form.$setValidity(form.serverErrors[i], true, form);
                        form[form.serverErrors[i]].$setValidity("serverMessage", true);
                    }
                    form.serverErrors = [];
                } else {
                    form.serverErrors = [];
                }
                for (var i = 0; i < fieldMessages.length; i++) {
                    var message = fieldMessages[i];
                    fieldName = message.field;
                    var serverMessage = $parse(form.$name + '["' + fieldName + '"].$error.serverMessage');
                    form.$setValidity(fieldName, false, form);
                    if (form[fieldName]) {
                        form[fieldName].$setValidity("serverMessage", false);
                        form.serverErrors.push(fieldName);
                    }
                    serverMessage.assign(currentScope, message.message);
                }
            }
        }
        
        function removeError(form, currentScope){
        	if (form.serverErrors) {
                for (var i = 0; i < form.serverErrors.length; i++) {
                    form.$setValidity(form.serverErrors[i], true, form);
                    form[form.serverErrors[i]].$setValidity("serverMessage", true);
                }
                form.serverErrors = [];
            } else {
                form.serverErrors = [];
            }
        }
        
        function addFieldMessage(fieldName, message, form, currentScope){
        	if(!form.serverErrors){
        		form.serverErrors = [];
        	}
        	var serverMessage = $parse(form.$name + '["' + fieldName + '"].$error.serverMessage');
            form.$setValidity(fieldName, false, form);
            if (form[fieldName]) {
                form[fieldName].$setValidity("serverMessage", false);
                form.serverErrors.push(fieldName);
            }
            serverMessage.assign(currentScope, message);
        }
    }
})();
