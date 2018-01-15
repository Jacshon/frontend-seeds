/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
(function () {
    angular.module('frontend').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$ocLazyLoad', '$state', '$window', 'applicationSettings', 'translationService'];
    function MainCtrl($ocLazyLoad, $state, $window, applicationSettings, translationService) {
        var vm = this;

        var defaultLanguage = window.localStorage.lang || 'en_US';
        applicationSettings.getSettings().language = defaultLanguage;

        $.fn.datepicker.defaults.language = defaultLanguage;

        translationService.changeLocale(defaultLanguage).then(
            function(data) {
                $rootScope.$broadcast('languageChanged');
            },
            function(error) {
                console.log("error while changing locale");
            }
        );

        vm.userName = 'Example user';
        vm.helloText = 'Welcome in SeedProject';
        vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

        vm.navigate = navigate;
        vm.changeTheme = changeTheme;
        vm.theme = "default";

        function changeTheme(theme) {
            vm.theme = theme;
        }

        function navigate(moduleName, status) {
            return $ocLazyLoad.load([{
                serie: true,
                name: moduleName,
                files: FileLoader.getFiles(moduleName)
            }]).then(function() {
                $state.go(status);
            }, function(error) {
                console.log(error);
                $window.location.reload();
            });
        }
    };



})();
