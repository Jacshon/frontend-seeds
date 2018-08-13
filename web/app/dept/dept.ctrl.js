(function () {
    angular.module('app.dept').controller('DeptController', DeptController);

    DeptController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings', '$uibModal', '$filter'];
    
    function DeptController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, $uibModal, $filter) {
        var vm = this;
        vm.openDeptDetailsPopup = openDeptDetailsPopup;
        vm.tableDTOptions = DataTableSettings.buildDefaultTable(DTOptionsBuilder)
            .withOption('initComplete', onTableCreationCompleted)
            .withOption('sDom', '<"top"><"html5buttons"B>rt<"information"i><"bottom"lp>')//sDom选项灵活配置各个特性的位置
            .withButtons([])
            .withOption('ajax', {
                url: 'app/dept/dept.json',
                type: 'POST',
                error: DataTableSettings.onDataRetrivalError
            })
            .withOption('columnDefs', [{
                "targets": 4,
                "render": getActionColumnContent
            }])
            .withOption("order", [0, 'desc']);

        vm.tableDTColumns = [
            DTColumnBuilder.newColumn('deptId'),
            DTColumnBuilder.newColumn('name').withOption("name", "name"),
            DTColumnBuilder.newColumn('parentDept').withOption("name", "parentDept"),
            DTColumnBuilder.newColumn('level').withOption("name", "level").notSortable(),
            DTColumnBuilder.newColumn('action').notSortable()
        ];

        vm.tableDTInstance = {};

        function onTableCreationCompleted() {
            DataTableSettings.configureColumnSearch($scope, vm.tableDTInstance.DataTable);
            configureColumnActions();
        }

        DataTableSettings.applyCustomSettings(vm, '#deptTable');

        function getActionColumnContent(data, type, full, meta) {
            var content = "<a class='icon'> <i class='fa fa-eye'></i></a> &nbsp";
            content = content + "<a class='icon'> <i class='fa fa-edit'></i></a>";
            return content;
        }

        function configureColumnActions() {
            EventManager.addEvent($scope, 'click', clickView, $('#deptTable tbody'), '.fa-eye');
            EventManager.addEvent($scope, 'click', clickEdit, $('#deptTable tbody'), '.fa-edit');

            function clickEdit() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openUserDetailsPopup(Constants.getActions().EDIT,
                    {"dept":row.data()});
            }

            function clickView() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openUserDetailsPopup(Constants.getActions().VIEW,
                    {"dept":row.data()});
            }
        }

        function openDeptDetailsPopup(action, data) {
            if (data) {
                openPopUp(action, data);
            } else {
                openPopUp(action, {});
            }

            function openPopUp(action, data) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/dept/dept-details-popup.html',
                    controller: DeptDetailsPopupController,
                    controllerAs: 'deptDetailsPopupCtrl',
                    resolve: {
                        transferObject: function() {
                            return new TransferObject(data, action, function(dept) {
                                vm.tableDTInstance.DataTable.ajax.reload();
                            });
                        }
                    }
                });
            }
        }
        generateButtons(vm.tableDTOptions);

        function generateButtons(tableDTOptions) {
            var creteTest = "<span class='btn btn-primary' >Add Dept</span>";
            var buttons = [];
            buttons = [{
                text: creteDept,
                key: '1',
                action: onClickCreateDept
            }];
            tableDTOptions.withButtons(buttons);
        }

        function onClickCreateDept() {
            openDeptDetailsPopup(Constants.getActions().ADD, {});
        }
    }

    angular.module('app.dept')
        .controller('DeptDetailsPopupController', DeptDetailsPopupController);
    DeptDetailsPopupController.$inject = ['$scope', '$uibModalInstance','transferObject'];
    
    function DeptDetailsPopupController($scope, $uibModalInstance, transferObject) {
        var vm = this;
        vm.readOnly = (transferObject.action == Constants.getActions().VIEW);
        vm.dept = transferObject.data.dept;
        vm.cancel = cancel;
        vm.saveDept = saveDept;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {
            $uibModalInstance.close();
        }

        function saveDept(user) {
            ok();
        }
    }
})();