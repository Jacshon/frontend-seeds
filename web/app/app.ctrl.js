/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
(function () {
    angular.module('inspinia').controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$ocLazyLoad', '$state', '$window', '$scope', 'authorizationService', 'applicationSettings', '$translate', '$rootScope'];
    function MainCtrl($ocLazyLoad, $state, $window, $scope, authorizationService, applicationSettings, $translate, $rootScope) {
        var vm = this;
        vm.userName = 'Example user';
        vm.helloText = 'Welcome in SeedProject';
        vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
        vm.navigate = navigate;
        vm.changeTheme = changeTheme;
        vm.changeLanguage = changeLanguage;
        vm.theme = "default";

        $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {
            console.log('file loaded', module);
        });

        $scope.$on('ocLazyLoad.moduleLoaded', function(e, module) {
            console.log('module loaded', module);
        });

        function changeLanguage(langKey) {
            $translate.use(langKey);
            window.localStorage.lang=langKey;
            applicationSettings.getSettings().language = langKey;
        };

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
