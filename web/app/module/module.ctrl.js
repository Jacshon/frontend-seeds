(function () {
    angular.module('app.module').controller('ModuleController', ModuleController);

    ModuleController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings', '$uibModal'];
    
    function ModuleController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, $uibModal) {
        var vm = this;
        vm.showPrivileges = true;
        vm.openModuleDetailsPopup = openModuleDetailsPopup;
        vm.tableDTOptions = DataTableSettings.buildDefaultTable(DTOptionsBuilder)
            .withOption('initComplete', onTableCreationCompleted)
            .withButtons([])
            .withOption('ajax', {
                url: 'app/module/module.json',
                type: 'POST',
                error: DataTableSettings.onDataRetrivalError
            })
            .withOption('columnDefs', [{
                "targets": 7,
                "render": getActionColumnContent
            }])
            .withOption("order", [0, 'desc']);

        vm.tableDTColumns = [
            DTColumnBuilder.newColumn('menuId'),
            DTColumnBuilder.newColumn('name').withOption("name", "name"),
            DTColumnBuilder.newColumn('parentName').withOption("name", "parentName"),
            DTColumnBuilder.newColumn('code').withOption("name", "code").notSortable(),
            DTColumnBuilder.newColumn('state').withOption("name", "state").notSortable(),
            DTColumnBuilder.newColumn('type').withOption("name", "type").notSortable(),
            DTColumnBuilder.newColumn('icon').withOption("name", "icon").notSortable(),
            DTColumnBuilder.newColumn('action').notSortable()
        ];

        vm.tableDTInstance = {};

        function onTableCreationCompleted() {
            DataTableSettings.configureColumnSearch($scope, vm.tableDTInstance.DataTable);
            configureColumnActions();
        }

        DataTableSettings.applyCustomSettings(vm, '#moduleTable');

        function getActionColumnContent(data, type, full, meta) {
            var content = "<a class='icon'> <i class='fa fa-eye'></i></a> &nbsp";
            content = content + "<a class='icon'> <i class='fa fa-edit'></i></a>";
            return content;
        }

        // vm.privilegeList = [
        //     {
        //         "privilegeId":1,
        //         "code":"user:list",
        //         "name":"进入用户管理页面",
        //         "moduleId":"2",
        //         "perms":"sys:user:list",
        //         "status":"1",
        //         "priority":"0",
        //         "remark":""
        //     },
        //     {
        //         "privilegeId":2,
        //         "code":"user:info",
        //         "name":"查看用户明细",
        //         "moduleId":"2",
        //         "perms":"sys:user:info",
        //         "status":"1",
        //         "priority":"1",
        //         "remark":""
        //     },
        //     {
        //         "privilegeId":3,
        //         "code":"user:add",
        //         "name":"增加用户",
        //         "moduleId":"2",
        //         "perms":"sys:user:add",
        //         "status":"1",
        //         "priority":"2",
        //         "remark":""
        //     },
        //     {
        //         "privilegeId":4,
        //         "code":"user:edit",
        //         "name":"修改用户信息",
        //         "moduleId":"2",
        //         "perms":"sys:user:edit",
        //         "status":"1",
        //         "priority":"3",
        //         "remark":""
        //     },
        //     {
        //         "privilegeId":5,
        //         "code":"user:delete",
        //         "name":"删除用户",
        //         "moduleId":"2",
        //         "perms":"sys:user:delete",
        //         "status":"1",
        //         "priority":"4",
        //         "remark":""
        //     }
        // ];

        function configureColumnActions() {
            EventManager.addEvent($scope, 'click', clickView, $('#moduleTable tbody'), '.fa-eye');
            EventManager.addEvent($scope, 'click', clickEdit, $('#moduleTable tbody'), '.fa-edit');
            function clickEdit() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openModuleDetailsPopup(Constants.getActions().EDIT,
                    {"menu":row.data()});
            }

            function clickView() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openModuleDetailsPopup(Constants.getActions().VIEW,
                    {"module":row.data()});
            }
        }

        function openModuleDetailsPopup(action, data) {
            if (data) {
                openPopUp(action, data);
            } else {
                openPopUp(action, {});
            }

            function openPopUp(action, data) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/module/module-details-popup.html',
                    controller: ModuleDetailsPopupController,
                    controllerAs: 'moduleDetailsPopupCtrl',
                    resolve: {
                        transferObject: function() {
                            return new TransferObject(data, action, function(module) {
                                vm.tableDTInstance.DataTable.ajax.reload();
                            });
                        }
                    }
                });
            }
        }
    }

    angular.module('app.module')
        .controller('ModuleDetailsPopupController', ModuleDetailsPopupController);
    ModuleDetailsPopupController.$inject = ['$scope', '$uibModalInstance','transferObject'];
    
    function ModuleDetailsPopupController($scope, $uibModalInstance, transferObject) {
        var vm = this;
        vm.readOnly = (transferObject.action == Constants.getActions().VIEW);
        vm.module = transferObject.data.module;
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