/**
 * Created by wangwjw
 * Date: 2018/7/30.
 * Version : v1.0.0
 */
(function () {
    angular.module('app.role').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    setURLS();

    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false
        });

        $stateProvider
            .state('sys.role', {
            url: "/role",
            templateUrl: "app/role/role.html",
            data: {pageTitle: 'Example Role'},
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
        InspiniaURLs.setURLS('app.role', urls);
    }
})();