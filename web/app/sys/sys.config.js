/**
 * Created by Administrator on 2018/1/28.
 */
(function(){
    angular.module('app.sys').config(config).run(run);
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        setURLs();
        $ocLazyLoadProvider.config({
            debug: false
        });
        $stateProvider.state('sys', {
            url: "/sys",
            templateUrl: "app/common/templates/content.html",
            data: {
                pageTitle: 'User'
            }
        }).state('sys.user', {
            url: "/userList",
            templateUrl: "app/sys/user.html",
            data: {
                pageTitle: 'User List'
            },
            resolve: {
                loadDependancies: loadDependancies
            }
        }).state('sys.role', {
            url: "/roleList",
            templateUrl: "app/sys/role.html",
            data: {
                pageTitle: 'Role List'
            },
            resolve: {
                loadDependancies: loadDependancies
            }
        }).state('sys.privilege', {
            url: "/privilegeList",
            templateUrl: "app/sys/role.html",
            data: {
                pageTitle: 'Role List'
            },
            resolve: {
                loadDependancies: loadDependancies
            }
        });

        function setURLs() {
            urls = {
                searchUserList:WEBURLs.createUrl('api/web/user/searchUsers'),
                saveUser:WEBURLs.createUrl('api/web/user/saveUser'),
                getUserDetails:WEBURLs.createUrl('api/web/user/getUserDetail/{id}'),
                deleteUser:WEBURLs.createUrl('api/web/user/deleteUser/{id}')
            }
            WEBURLs.setURLS('app.user',urls);
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