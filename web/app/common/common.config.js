(function() {
    angular.module('app.common')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

        setURLS();

        function setURLS() {
            urls = {
                getCodesByType: InspiniaURLs.createUrl('api/web/syscode/getCodesByType'),
                getAllCodes: InspiniaURLs.createUrl('api/web/syscode/getAllCodes'),
                getUserAccessList: InspiniaURLs.createUrl('api/web/security/getUserAccessList')
            };
            InspiniaURLs.setURLS('app.common', urls);
        }
    }
})();
