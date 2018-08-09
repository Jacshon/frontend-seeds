(function () {
    angular.module('app.module').controller('ModuleController', ModuleController);

    ModuleController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings', '$uibModal'];
    
    function ModuleController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, $uibModal) {
        var vm = this;

    }

    angular.module('app.module')
        .controller('ModuleDetailsPopupController', ModuleDetailsPopupController);
    ModuleDetailsPopupController.$inject = ['$scope', '$uibModalInstance','transferObject'];
    
    function ModuleDetailsPopupController($scope, $uibModalInstance, transferObject) {
        var vm = this;
        vm.readOnly = (transferObject.action == Constants.getActions().VIEW);
        vm.menu = transferObject.data.menu;
        vm.cancel = cancel;
        vm.saveUser = saveUser;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {
            $uibModalInstance.close();
        }

        function saveUser(user) {
            ok();
        }
    }
})();