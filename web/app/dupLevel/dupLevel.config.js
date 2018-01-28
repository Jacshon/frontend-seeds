/**
 * Created by Administrator on 2018/1/28.
 */
(function () {
    angular.module('app.dupLevel').config(configure)
        .run(run);

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        setURLs();
        $ocLazyLoadProvider.config({
            debug: false
        });
        $stateProvider.state('dupLevel', {
            url: "/dupLevel",
            templateUrl: "app/common/templates/content.html",
            data: {
                pageTitle: 'Role'
            }
        }).state('dupLevel.dupLevel1', {
            url: "/dupLevel1",
            templateUrl: "app/role/role.html",
            data: {
                pageTitle: 'Role List'
            },resolve: {
                loadDependancies: loadDependancies
            }
        }).state('dupLevel.dupLevel2',{
            url:"/dupLevel2",
            templateUrl:"app/user/user.html",
            data: {
                pageTitle: "User List"
            },resolve: {
                loadDependancies: loadDependancies
            }
        });

        function setURLs() {
            urls = {
                searchUserList:WEBURLs.createUrl('api/web/role/searchRoles'),
                saveUser:WEBURLs.createUrl('api/web/role/saveRole'),
                getUserDetails:WEBURLs.createUrl('api/web/role/getRoleDetail/{id}'),
                deleteUser:WEBURLs.createUrl('api/web/role/deleteRole/{id}')
            }
            WEBURLs.setURLS('app.dupLevel',urls);
        }
    }

    loadDependancies.$inject = ['DataTableSettings'];

    function loadDependancies(DataTableSettings) {
        return DataTableSettings.loadDependancies();
    }

    run.$inject = ['$rootScope', '$state'];

    function run($rootScope, $state) {
        $rootScope.$state = $state;
    }
})();