(function () {
    angular.module('app.user').controller('UserController', UserController);
    
    UserController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings', '$uibModal', '$filter'];
    
    function UserController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, $uibModal, $filter) {
        var vm = this;
        vm.openUserDetailsPopup = openUserDetailsPopup;
        vm.tableDTOptions = DataTableSettings.buildDefaultTable(DTOptionsBuilder)
            .withOption('initComplete', onTableCreationCompleted)
            .withOption('sDom', '<"top"><"html5buttons"B>rt<"information"i><"bottom"lp>')//sDom选项灵活配置各个特性的位置
            .withButtons([])
            .withOption('ajax', {
                url: 'app/user/user.json',
                type: 'POST',
                error: DataTableSettings.onDataRetrivalError
            })
            .withOption('columnDefs', [{
                "targets": 7,
                "render": getActionColumnContent
            }])
            .withOption("order", [0, 'desc']);

        vm.tableDTColumns = [
            DTColumnBuilder.newColumn('userId'),
            DTColumnBuilder.newColumn('username').withOption("name", "username"),
            DTColumnBuilder.newColumn('email').withOption("name", "email"),
            DTColumnBuilder.newColumn('mobile').withOption("name", "mobile").notSortable(),
            DTColumnBuilder.newColumn('status').withOption("name", "status").notSortable(),
            DTColumnBuilder.newColumn('createUser').withOption("name", "createUser").notSortable(),
            DTColumnBuilder.newColumn('createTime').withOption("name", "createTime").notSortable(),
            DTColumnBuilder.newColumn('action').notSortable()
        ];

        vm.tableDTInstance = {};

        function onTableCreationCompleted() {
            DataTableSettings.configureColumnSearch($scope, vm.tableDTInstance.DataTable);
            configureColumnActions();
        }

        DataTableSettings.applyCustomSettings(vm, '#userTable');

        function getActionColumnContent(data, type, full, meta) {
            var content = "<a class='icon'> <i class='fa fa-eye'></i></a> &nbsp";
            content = content + "<a class='icon'> <i class='fa fa-edit'></i></a>";
            return content;
        }

        function configureColumnActions() {
            EventManager.addEvent($scope, 'click', clickView, $('#userTable tbody'), '.fa-eye');
            EventManager.addEvent($scope, 'click', clickEdit, $('#userTable tbody'), '.fa-edit');

            function clickEdit() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openUserDetailsPopup(Constants.getActions().EDIT,
                    {"user":row.data()});
            }

            function clickView() {
                var tr = $(this).closest('tr');
                var row = vm.tableDTInstance.DataTable.row(tr);
                vm.openUserDetailsPopup(Constants.getActions().VIEW,
                    {"user":row.data()});
            }
        }

        function openUserDetailsPopup(action, data) {
            if (data) {
                openPopUp(action, data);
            } else {
                openPopUp(action, {});
            }

            function openPopUp(action, data) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/user/user-details-popup.html',
                    controller: UserDetailsPopupController,
                    controllerAs: 'userDetailsPopupCtrl',
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
            var creteTest = "<span class='btn btn-primary' >"+$filter('translate')('test.list.title.add.test')+"</span>";
            var buttons = [];
            buttons = [{
                text: creteTest,
                key: '1',
                action: onClickCreateUser
            }];
            tableDTOptions.withButtons(buttons);
        }

        function onClickCreateUser() {
            openUserDetailsPopup(Constants.getActions().ADD, {});
        }
    }

    angular.module('app.user')
        .controller('UserDetailsPopupController', UserDetailsPopupController);
    UserDetailsPopupController.$inject = ['$scope', '$uibModalInstance','transferObject'];
    
    function UserDetailsPopupController($scope, $uibModalInstance, transferObject) {
        var vm = this;
        vm.readOnly = (transferObject.action == Constants.getActions().VIEW);
        vm.user = transferObject.data.user;
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
            // userService.saveUser(user).then(
            //     function(data) {
            //         vm.ok();
            //         transferObject.successCallback(user);
            //     },
            //     function(error) {
            //         errorHandlerService.handleError(error, $scope.userForm, $scope);
            //     }
            // );
        }
    }
})();