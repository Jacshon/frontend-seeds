(function() {
    angular.module('app.common').service('loginService', loginService);

    loginService.$inject = ['$http', '$q'];

    function loginService($http, $q) {
        this.login = login;
        this.logout = logout;

        var deferred = $q.defer();

        function login(loginId, password) {
            var postRequest = {
                method: 'POST',
                url: InspiniaURLs.getURLS('app').login,
                data: {
                    "loginId": loginId,
                    "password": password
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: formDataTransformer
            };
            return $http(postRequest)
                .then(function(response) {
                    deferred.resolve(response.data);
                    return deferred.promise;
                }, function(response) {
                    deferred.reject(response);
                    return deferred.promise;
                });
        }

        function logout() {
            var postRequest = {
                method: 'POST',
                url: InspiniaURLs.getURLS('app').logout,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: formDataTransformer
            };
            return $http(postRequest)
                .then(function(response) {
                    deferred.resolve(response.data);
                    return deferred.promise;
                }, function(response) {
                    deferred.reject(response);
                    return deferred.promise;
                });
        }
    }

})();
