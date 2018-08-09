(function () {
    angular.module('app.menu').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    setURLS();

    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false
        });

        $stateProvider
            .state('sys.menu', {
            url: "/menu",
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