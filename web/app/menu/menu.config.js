(function () {
    angular.module('app.menu').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    setURLS();

    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false
        });

        $stateProvider.state('menu', {
            url: "/menu",
            templateUrl: "app/common/templates/content.html",
            data: {
                pageTitle: 'Menu'
            }
        }).state('menu.list', {
            url: "/list",
            templateUrl: "app/menu/menu.html",
            data: {pageTitle: 'Menu'},
            resolve: {
                loadDependancies: loadDependancies
            }
        });
    }

    loadDependancies.$inject = ['DataTableSettings'];

    function loadDependancies(DataTableSettings) {
        return DataTableSettings.loadDependancies();
    }

    function setURLS() {
        urls = {

        };
        InspiniaURLs.setURLS('app.menu', urls);
    }
})();