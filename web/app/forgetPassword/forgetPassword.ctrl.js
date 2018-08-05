(function () {
    angular.module('app.forgetPassword').controller('ForgetPasswordController', ForgetPasswordController);

    ForgetPasswordController.$inject = [];
    
    function ForgetPasswordController() {
        var vm = this;
        vm.formData = {};

        vm.processForm = function() {
            alert('Wizard completed');
        };
    }
})();