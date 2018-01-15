/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */

(function () {
    angular.module('frontend').config(config)
        .run(run);
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        setURLs();
        $urlRouterProvider.otherwise("/index/main");

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: false
        });

        $stateProvider.state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "app/common/templates/content.html",
        })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/main/main.html",
                data: { pageTitle: 'Example view' }
            })
            .state('index.minor', {
                url: "/minor",
                templateUrl: "app/minor/minor.html",
                data: { pageTitle: 'Example view' }
            })
        function setURLs() {
            urls = {
                login: WEBURLs.createUrl('api/web/login'),
                logout: WEBURLs.createUrl('api/web/logout'),
                changeLocale: WEBURLs.createUrl('api/web/common/changeLocale')
            };
            WEBURLs.setURLS('app', urls);
        }
    }
    run.$inject = ['$rootScope','$state']
    function run($rootScope, $state) {
       $rootScope.$state = $state;
    }

})();

