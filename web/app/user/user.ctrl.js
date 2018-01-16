/**
 * Created by weijiang
 * data : 2018/1/11.
 * version :v1.0.0
 */
(function () {
    angular.module('app.user').controller('UserController',UserController)
    UserController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DataTableSettings','userService'];

    function UserController($scope, DTOptionsBuilder, DTColumnBuilder, DataTableSettings, userService) {
        var vm = this;
        vm.tableDTOptions = DataTableSettings.buildDefaultTable(DTOptionsBuilder)
            .withOption('initComplete', onTableCreationCompleted)
            .withOption('sDom', '<"top"><"html5buttons"B>rt<"information"i><"bottom"lp>')
            .withOption('ajax', {
                url: WEBURLs.getURLS('app.user').searchUserList,
                type: 'POST',
                error: DataTableSettings.onDataRetrivalError
            }).withButtons([])
            .withOption('columnDefs', [ {
                "targets": [4],
                "render": getActionColumnContent
            }]).withOption("order", [0, 'desc']);

        vm.tableDTColumns = [
            DTColumnBuilder.newColumn('userId'),
            DTColumnBuilder.newColumn('loginId'),
            DTColumnBuilder.newColumn('realName'),
            DTColumnBuilder.newColumn('email'),
            DTColumnBuilder.newColumn('action').notSortable()
        ];

        vm.tableDTInstance = {};

        function getActionColumnContent(data, type, full, meta) {
            var content = "<a class='icon'> <i class='fa fa-eye'></i></a> &nbsp";
            content = content + "<a class='icon'> <i class='fa fa-edit'></i></a>";
            return content;
        }

        function onTableCreationCompleted(settings, json) {
        }

    }
})();