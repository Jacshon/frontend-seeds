/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
(function () {
    angular
        .module('inspinia')
        .config(config)
        .run(function ($rootScope, $state) {
            $rootScope.$state = $state;
        })

    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        setURLS();
        $urlRouterProvider.otherwise("/index/main");

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: false
        });

        $stateProvider

            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "app/common/templates/content.html",
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/main/main.html",
                data: {pageTitle: 'Example view'}
            })
            .state('index.minor', {
                url: "/minor",
                templateUrl: "app/minor/minor.html",
                data: {pageTitle: 'Example view'}
            })
            .state('index.role', {
                url: "/role",
                templateUrl: "app/role/role.html",
                data: {pageTitle: 'Example Role'}
            })
            .state('index.privilege', {
                url: "/privilege",
                templateUrl: "app/privilege/privilege.html",
                data: {pageTitle: 'Example Privilege'}
            })

        function setURLS() {
            urls = {
                login: InspiniaURLs.createUrl('api/web/common/login'),
                logout: InspiniaURLs.createUrl('api/web/common/logout'),
                changeLocale: InspiniaURLs.createUrl('api/web/common/changeLocale'),
            };
            InspiniaURLs.setURLS('app', urls);
        }
    }
})();

