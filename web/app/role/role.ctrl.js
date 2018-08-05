/**
 * Created by wangwjw
 * Date: 2018/7/30.
 * Version : v1.0.0
 */
(function () {
    angular.module('app.role').controller('RoleController', RoleController);

    RoleController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings', '$uibModal', '$filter'];

    function RoleController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, $uibModal, $filter) {
        var vm = this;
        vm.openRoleDetailsPopup = openRoleDetailsPopup;
        vm.tableDTOptions = DataTableSettings.buildDefaultTable(DTOptionsBuilder)
            .withOption('initComplete', onTableCreationCompleted)
            .withOption('sDom', '<"top"><"html5buttons"B>rt<"information"i><"bottom"lp>')//sDom选项灵活配置各个特性的位置
            .withOption('ajax', {
                url: 'app/role/role.json',
                type: 'POST',
                error: DataTableSettings.onDataRetrivalError
            })
            .withOption('columnDefs', [{
                "targets": 3,
                "render": getActionColumnContent
            }])
            .withOption("order", [0, 'desc']);

        vm.tableDTColumns = [
            DTColumnBuilder.newColumn('roleId'),
            DTColumnBuilder.newColumn('roleName').withOption("name", "roleName"),
            DTColumnBuilder.newColumn('remark').withOption("name", "remark"),
            DTColumnBuilder.newColumn('action').notSortable()
        ];

        vm.tableDTInstance = {};

        function onTableCreationCompleted() {
            DataTableSettings.configureColumnSearch($scope, vm.tableDTInstance.DataTable);
            configureColumnActions();
        }

        DataTableSettings.applyCustomSettings(vm, '#roleTable');

        function getActionColumnContent(data, type, full, meta) {
            var content = "<a class='icon'> <i class='fa fa-eye'></i></a> &nbsp";
            content = content + "<a class='icon'> <i class='fa fa-edit'></i></a>";
            return content;
        }

        function configureColumnActions() {
            EventManager.addEvent($scope, 'click', clickView, $('#roleTable tbody'), '.fa-eye');
            EventManager.addEvent($scope, 'click', clickEdit, $('#roleTable tbody'), '.fa-edit');

            function clickEdit() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openRoleDetailsPopup(Constants.getActions().EDIT,
                    {"user":row.data()});
            }

            function clickView() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openRoleDetailsPopup(Constants.getActions().VIEW,
                    {"user":row.data()});
            }
        }

        function openRoleDetailsPopup(action, data) {
            if (data) {
                openPopUp(action, data);
            } else {
                openPopUp(action, {});
            }

            function openPopUp(action, data) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/role/role-details-popup.html',
                    controller: RoleDetailsPopupController,
                    controllerAs: 'roleDetailsPopupCtrl',
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
        generateButtons(vm.tableDTOptions);

        function generateButtons(tableDTOptions) {
            var creteRole = "<span class='btn btn-primary' >"+ "增加角色" +"</span>";
            var buttons = [];
            buttons = [{
                text: creteRole,
                key: '1',
                action: onClickCreateRole
            }];
            tableDTOptions.withButtons(buttons);
        }

        function onClickCreateRole() {
            openRoleDetailsPopup(Constants.getActions().ADD, {});
        }
    }

    angular.module('app.role')
        .controller('RoleDetailsPopupController', RoleDetailsPopupController);
    RoleDetailsPopupController.$inject = ['$scope', '$uibModalInstance','transferObject'];

    function RoleDetailsPopupController($scope, $uibModalInstance, transferObject) {
        var vm = this;
        vm.readOnly = (transferObject.action == Constants.getActions().VIEW);
        vm.role = transferObject.data.role;
        vm.cancel = cancel;
        vm.saveRole = saveRole;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {
            $uibModalInstance.close();
        }

        function saveRole(role) {
            ok();
        }
    }
})();