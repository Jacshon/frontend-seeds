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
            .withButtons([])
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

        function onClickCreateRole() {
            openRoleDetailsPopup(Constants.getActions().ADD, {});
        }

        vm.treeConfig = {
            'plugins' : [ 'types', 'dnd','checkbox' ],
            'types' : {
                'default' : {
                    'icon' : 'fa fa-folder'
                },
                'menu' : {
                    'icon' : 'fa fa-file-code-o'
                },
                'operate' : {
                    'icon' : 'fa fa-file-picture-o'
                }
            },
            'checkbox' : {
                "tie_selection " : false
            }
        };

        vm.treeData = [
            {
                "id": "1",
                "parent": "#",
                "text": "Sys Management",
                "state": {
                    "opened": true
                },
                "__uiNodeId": 1
            }, {
                "id": "2",
                "parent": "1",
                "text": "User Management",
                "state": {
                    "opened": true,
                    "selected":true
                },
                "type":"menu",
                "__uiNodeId": 2
            }, {
                "id": "3",
                "parent": "1",
                "text": "Role Management",
                "state": {
                    "opened": true
                },
                "type": "menu",
                "__uiNodeId": 3
            },
            {
                "id": "4",
                "parent": "1",
                "text": "Privilege Management",
                "state": {
                    "opened": true,
                    "selected":true
                },
                "type": "menu",
                "__uiNodeId": 4
            }
        ]

        vm.getSelectedPrivileges = getSelectedPrivileges;
        function getSelectedPrivileges() {
            var selected_nodes = $scope.treeInstance.jstree(true).get_selected();
            console.log(selected_nodes);
        }
        
        vm.save = save ;

        function save() {
            console.log(vm.treeData);
            var selected_nodes = vm.treeInstance.jstree(true).get_selected();
            console.log(selected_nodes);
            console.log(vm.treeData )
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