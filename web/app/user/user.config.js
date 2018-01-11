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
            }
        });
    }

    run.$inject = ['$rootScope', '$state'];

    function run($rootScope, $state) {
        $rootScope.$state = $state;
    }
})();