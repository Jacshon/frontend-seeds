(function () {
    angular.module('app.privilege').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    setURLS();

    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false
        });

        $stateProvider
            .state('sys.privilege', {
            url: "/privilege",
            templateUrl: "app/privilege/privilege.html",
            data: {pageTitle: 'Privilege'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/jsTree/themes/default/style.min.css','js/plugins/jsTree/jstree.js']
                        },
                        {
                            name: 'ngJsTree',
                            files: ['js/plugins/jsTree/ngJsTree.min.js']
                        }
                    ]);
                },
                loadDependancies : loadDependancies
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
        InspiniaURLs.setURLS('app.privilege', urls);
    }
})();