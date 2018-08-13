(function () {
    angular.module('app.privilege').controller('PrivilegeController', PrivilegeController);

    PrivilegeController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings', '$uibModal'];
    
    function PrivilegeController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, $uibModal) {
        var vm = this;
        vm.openPrivilegeDetailsPopup = openPrivilegeDetailsPopup;
        vm.tableDTOptions = DataTableSettings.buildDefaultTable(DTOptionsBuilder)
            .withOption('initComplete', onTableCreationCompleted)
            .withButtons(DataTableSettings.buttons)
            .withOption('ajax', {
                url: 'app/privilege/privilege.json',
                type: 'POST',
                error: DataTableSettings.onDataRetrivalError
            })
            .withOption('columnDefs', [{
                "targets": 5,
                "render": getActionColumnContent
            }])
            .withOption("order", [0, 'desc']);

        vm.tableDTColumns = [
            DTColumnBuilder.newColumn('privilegeId'),
            DTColumnBuilder.newColumn('name').withOption("name", "name"),
            DTColumnBuilder.newColumn('moduleName').withOption("name", "moduleName"),
            DTColumnBuilder.newColumn('perms').withOption("name", "perms").notSortable(),
            DTColumnBuilder.newColumn('status').withOption("name", "status").notSortable(),
            DTColumnBuilder.newColumn('action').notSortable()
        ];

        vm.tableDTInstance = {};

        function onTableCreationCompleted() {
            DataTableSettings.configureColumnSearch($scope, vm.tableDTInstance.DataTable);
            configureColumnActions();
        }

        DataTableSettings.applyCustomSettings(vm, '#privilegeTable');

        function getActionColumnContent(data, type, full, meta) {
            var content = "<a class='icon'> <i class='fa fa-eye'></i></a> &nbsp";
            content = content + "<a class='icon'> <i class='fa fa-edit'></i></a>";
            return content;
        }

        function configureColumnActions() {
            EventManager.addEvent($scope, 'click', clickView, $('#privilegeTable tbody'), '.fa-eye');
            EventManager.addEvent($scope, 'click', clickEdit, $('#privilegeTable tbody'), '.fa-edit');
            function clickEdit() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openPrivilegeDetailsPopup(Constants.getActions().EDIT,
                    {"privilege":row.data()});
            }

            function clickView() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openPrivilegeDetailsPopup(Constants.getActions().VIEW,
                    {"privilege":row.data()});
            }
        }

        function openPrivilegeDetailsPopup(action, data) {
            if (data) {
                openPopUp(action, data);
            } else {
                openPopUp(action, {});
            }

            function openPopUp(action, data) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/privilege/privilege-details-popup.html',
                    controller: PrivilegeDetailsPopupController,
                    controllerAs: 'privilegeDetailsPopupCtrl',
                    resolve: {
                        transferObject: function() {
                            return new TransferObject(data, action, function(privilege) {
                                vm.tableDTInstance.DataTable.ajax.reload();
                            });
                        }
                    }
                });
            }
        }
    }

    angular.module('app.privilege')
        .controller('PrivilegeDetailsPopupController', PrivilegeDetailsPopupController);
    PrivilegeDetailsPopupController.$inject = ['$scope', '$uibModalInstance','transferObject'];
    
    function PrivilegeDetailsPopupController($scope, $uibModalInstance, transferObject) {
        var vm = this;
        vm.readOnly = (transferObject.action == Constants.getActions().VIEW);
        vm.privilege = transferObject.data.privilege;
        vm.cancel = cancel;
        vm.savePrivilege = savePrivilege;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {
            $uibModalInstance.close();
        }

        function savePrivilege(privilege) {
            ok();
        }
    }
})();