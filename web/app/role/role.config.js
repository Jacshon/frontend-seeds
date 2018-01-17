/**
 * Created by weijiang
 * data : 2018/1/16.
 * version :v1.0.0
 */
(function () {
    angular.module('app.role').config(configure)
        .run(run);

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        setURLs();
        $ocLazyLoadProvider.config({
            debug: false
        });
        $stateProvider.state('role', {
            url: "/role",
            templateUrl: "app/common/templates/content.html",
            data: {
                pageTitle: 'Role'
            }
        }).state('role.roleList', {
            url: "/roleList",
            templateUrl: "app/role/role.html",
            data: {
                pageTitle: 'Role List'
            }
        });

        function setURLs() {
            urls = {
                searchUserList:WEBURLs.createUrl('api/web/role/searchRoles'),
                saveUser:WEBURLs.createUrl('api/web/role/saveRole'),
                getUserDetails:WEBURLs.createUrl('api/web/role/getRoleDetail/{id}'),
                deleteUser:WEBURLs.createUrl('api/web/role/deleteRole/{id}')
            }
            WEBURLs.setURLS('app.role',urls);
        }
    }

    run.$inject = ['$rootScope', '$state'];

    function run($rootScope, $state) {
        $rootScope.$state = $state;
    }
})();