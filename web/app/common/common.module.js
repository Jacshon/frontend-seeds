(function() {
    angular.module('app.common', [
        'ui.router', // Routing
        'oc.lazyLoad', // ocLazyLoad
        'ui.bootstrap', // Ui Bootstrap,
        'pascalprecht.translate',
        'http-auth-interceptor',
        'angular-cache'
    ]);
})();
