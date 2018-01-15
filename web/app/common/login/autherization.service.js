/**
 * Created by weijiang
 * data : 2018/1/15.
 * version :v1.0.0
 */
(function() {
    angular.module('app.common').service('authorizationService', authorizationService);

    authorizationService.$inject = ['serverAPI', 'applicationSettings', 'CacheFactory', '$q'];

    function authorizationService(serverAPI, applicationSettings, CacheFactory, $q) {
        var vm = this;
        vm.isAutherized = isAutherized;
        vm.userAccessList = null;
        getUserAccessList();
        
        vm.getUserDetails = getUserDetails;

        function getUserAccessList() {
            serverAPI.getCashedData(WEBURLs.getURLS('app.common').getUserAccessList, {}).then(function(response) {
                vm.userAccessList = response;
            }, function(response) {
                console.log("error in getUserAccessList");
            });
        }

        function isAutherized(objectCode, field, value) {
            if (vm.userAccessList) {
                for (var i = 0; i < vm.userAccessList.length; i++) {
                    var accessObject = vm.userAccessList[i];
                    if (objectCode == accessObject.object && field == accessObject.field) {
                        for (var j = 0; j < accessObject.actvalueList.length; j++) {
                            if (isMatching(value, accessObject.actvalueList[j])) {
                                return true;
                            }
                        }
                    }
                }
            } else {
                return false;
            }
            return false;
        }

        function isMatching(value, str) {
            var match = value.match(str.replace("*", ".*"));
            return match !== null;
        }
        
        function getUserDetails(){
        	return serverAPI.getCashedData(WEBURLs.getURLS('app.common').getUserDetails, {});
        }
    }

})();
