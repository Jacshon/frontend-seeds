(function () {
    angular.module('app.menu').controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings', '$uibModal'];
    
    function MenuController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, $uibModal) {
        var vm = this;
        vm.openMenuDetailsPopup = openMenuDetailsPopup;
        vm.tableDTOptions = DataTableSettings.buildDefaultTable(DTOptionsBuilder)
            .withOption('initComplete', onTableCreationCompleted)
            .withButtons(DataTableSettings.buttons)
            .withOption('ajax', {
                url: 'app/menu/menu.json',
                type: 'POST',
                error: DataTableSettings.onDataRetrivalError
            })
            .withOption('columnDefs', [{
                "targets": 8,
                "render": getActionColumnContent
            }])
            .withOption("order", [0, 'desc']);

        vm.tableDTColumns = [
            DTColumnBuilder.newColumn('menuId'),
            DTColumnBuilder.newColumn('parentId').withOption("name", "parentId"),
            DTColumnBuilder.newColumn('name').withOption("name", "name"),
            DTColumnBuilder.newColumn('url').withOption("name", "url").notSortable(),
            DTColumnBuilder.newColumn('perms').withOption("name", "perms").notSortable(),
            DTColumnBuilder.newColumn('type').withOption("name", "type").notSortable(),
            DTColumnBuilder.newColumn('icon').withOption("name", "icon").notSortable(),
            DTColumnBuilder.newColumn('orderNumber').withOption("name", "orderNumber").notSortable(),
            DTColumnBuilder.newColumn('action').notSortable()
        ];

        vm.tableDTInstance = {};

        function onTableCreationCompleted() {
            DataTableSettings.configureColumnSearch($scope, vm.tableDTInstance.DataTable);
            configureColumnActions();
        }

        DataTableSettings.applyCustomSettings(vm, '#menuTable');

        function getActionColumnContent(data, type, full, meta) {
            var content = "<a class='icon'> <i class='fa fa-eye'></i></a> &nbsp";
            content = content + "<a class='icon'> <i class='fa fa-edit'></i></a>";
            return content;
        }

        function configureColumnActions() {
            EventManager.addEvent($scope, 'click', clickView, $('#menuTable tbody'), '.fa-eye');
            EventManager.addEvent($scope, 'click', clickEdit, $('#menuTable tbody'), '.fa-edit');

            function clickEdit() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openMenuDetailsPopup(Constants.getActions().EDIT,
                    {"menu":row.data()});
            }

            function clickView() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openMenuDetailsPopup(Constants.getActions().VIEW,
                    {"menu":row.data()});
            }
        }

        function openMenuDetailsPopup(action, data) {
            if (data) {
                openPopUp(action, data);
            } else {
                openPopUp(action, {});
            }

            function openPopUp(action, data) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/menu/menu-details-popup.html',
                    controller: MenuDetailsPopupController,
                    controllerAs: 'menuDetailsPopupCtrl',
                    resolve: {
                        transferObject: function() {
                            return new TransferObject(data, action, function(user) {
                                vm.tableDTInstance.DataTable.ajax.reload();
                            });
                        }
                    }
                });
            }
        }
    }

    angular.module('app.menu')
        .controller('MenuDetailsPopupController', MenuDetailsPopupController);
    MenuDetailsPopupController.$inject = ['$scope', '$uibModalInstance','transferObject'];
    
    function MenuDetailsPopupController($scope, $uibModalInstance, transferObject) {
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