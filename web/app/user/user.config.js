(function () {
    angular.module('app.user').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    setURLS();

    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false
        });

        $stateProvider
            .state('sys.user', {
            url: "/user",
            templateUrl: "app/user/user.html",
            data: {pageTitle: 'Example User'},
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
        InspiniaURLs.setURLS('app.user', urls);
    }
})();