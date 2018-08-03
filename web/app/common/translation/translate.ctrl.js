(function() {
    angular.module('app.common').controller('translateCtrl', translateCtrl);

    translateCtrl.$inject = ['$translate', '$scope', 'translationService', 'applicationSettings', '$rootScope'];

    function translateCtrl($translate, $scope, translationService, applicationSettings, $rootScope) {
        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
            window.localStorage.lang=langKey;
            applicationSettings.getSettings().language = langKey;
            // translationService.changeLocale(langKey).then(
            //     function(data) {
            //         $rootScope.$broadcast('languageChanged');
            //     },
            //     function(error) {
            //         console.log("error while changing locale");
            //     }
            // );
        };
    }
})();
