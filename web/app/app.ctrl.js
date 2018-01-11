/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
(function () {
    angular.module('inspinia').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$ocLazyLoad', '$state', '$window'];
    function MainCtrl($ocLazyLoad, $state, $window) {
        var vm = this;
        vm.userName = 'Example user';
        vm.helloText = 'Welcome in SeedProject';
        vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

        vm.navigate = navigate;

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
