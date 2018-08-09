(function () {
    angular.module('app.module').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    setURLS();

    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false
        });

        $stateProvider
            .state('sys.module', {
            url: "/module",
            templateUrl: "app/module/module.html",
            data: {pageTitle: 'Module'},
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
        InspiniaURLs.setURLS('app.menu', urls);
    }
})();