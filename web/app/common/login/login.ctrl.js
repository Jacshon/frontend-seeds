(function() {
    angular.module('app.common').controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$http', 'authService', 'loginService', '$window'];

    function loginCtrl($scope, $http, authService, loginService, $window) {
        var vm = this;
        vm.user = {};
        vm.login = function() {
            loginService.login(vm.user.loginId, vm.user.password)
                .then(
                    function(data) {
                        authService.loginConfirmed();
                    },
                    function(error) {
                        console.log(error);
                        console.log('error in login');
                    });
        };

        vm.logout = function() {
            loginService.logout(vm.user.loginId, vm.user.password)
                .then(
                    function(data) {
                        $window.location.reload();
                    },
                    function(error) {
                        $window.location.reload();
                    });
        };
    }
})();
