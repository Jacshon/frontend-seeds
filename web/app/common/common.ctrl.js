(function() {
    angular.module('app.common')
        .controller('CommonController', CommonController);

    CommonController.$inject = ['$ocLazyLoad', '$state', '$scope'];

    function CommonController($ocLazyLoad, $state, $scope) {

    }
})();
