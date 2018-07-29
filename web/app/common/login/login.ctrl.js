(function() {
    angular.module('app.common').controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$http', 'authService', 'loginService', '$window'];

    function loginCtrl($scope, $http, authService, loginService, $window) {
        $scope.login = function() {
            loginService.login($scope.loginId, $scope.password)
                .then(
                    function(data) {
                        authService.loginConfirmed();
                    },
                    function(error) {
                        console.log(error);
                        console.log('error in login');
                    });
        };

        $scope.logout = function() {
            loginService.logout($scope.loginId, $scope.password)
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
