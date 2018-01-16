/**
 * Created by weijiang
 * data : 2018/1/11.
 * version :v1.0.0
 */
(function () {
    angular.module('app.user').config(config)
        .run(run);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        setURLs();
        $ocLazyLoadProvider.config({
            debug: false
        });
        $stateProvider.state('user', {
            url: "/user",
            templateUrl: "app/common/templates/content.html",
            data: {
                pageTitle: 'User'
            }
        }).state('user.userList', {
            url: "/userList",
            templateUrl: "app/user/user.html",
            data: {
                pageTitle: 'User List'
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