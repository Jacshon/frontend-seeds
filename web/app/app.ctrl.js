/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
(function () {
    angular.module('inspinia').controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$ocLazyLoad', '$state', '$window', '$scope', 'authorizationService', 'applicationSettings', 'translationService', '$rootScope'];
    function MainCtrl($ocLazyLoad, $state, $window, $scope, authorizationService, applicationSettings, translationService, $rootScope) {
        var vm = this;
        vm.userName = 'Example user';
        vm.helloText = 'Welcome in SeedProject';
        vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
        vm.navigate = navigate;
        vm.changeTheme = changeTheme;
        vm.theme = "default";

        $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {
            console.log('file loaded', module);
        });

        $scope.$on('ocLazyLoad.moduleLoaded', function(e, module) {
            console.log('module loaded', module);
        });

        var defaultLanguage = window.localStorage.lang || 'en_US';
        applicationSettings.getSettings().language = defaultLanguage;

        translationService.changeLocale(defaultLanguage).then(
            function(data) {
                $rootScope.$broadcast('languageChanged');
            },
            function(error) {
                console.log("error while changing locale");
            }
        );

        function navigate(moduleName, status) {
            $scope.testSearchStatus = null;
            return $ocLazyLoad.load([{
                serie: true,
                name: moduleName,
                files: InspiniaFileLoader.getFiles(moduleName)
            }]).then(function() {
                $state.go(status);
            }, function(error) {
                console.log(error);
                $window.location.reload();
            });
        }

        function changeTheme(theme) {
            vm.theme = theme;
        }
    };
})();
