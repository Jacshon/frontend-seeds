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
        vm.userName = 'Weijiang';
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

        vm.accessMenuList = [
            {
                "moduleId":1,
                "name":"权限管理",
                "code":"sys",
                "state":"sys",
                "icon":"fa fa-user",
                "type":"0",
                "childList":[
                    {
                        "moduleId":2,
                        "name":"用户管理",
                        "code":"app.user",
                        "state":"sys.user",
                        "icon":"fa fa-user",
                        "type":"0"
                    },
                    {
                        "moduleId":3,
                        "name":"角色管理",
                        "code":"app.role",
                        "state":"sys.role",
                        "icon":"fa fa-user",
                        "type":"0"
                    },
                    {
                        "moduleId":4,
                        "name":"权限管理",
                        "code":"app.privilege",
                        "state":"sys.privilege",
                        "icon":"fa fa-user",
                        "type":"0"
                    },
                    {
                        "moduleId":6,
                        "name":"模块管理",
                        "code":"app.module",
                        "state":"sys.module",
                        "icon":"fa fa-user",
                        "type":"0"
                    }
                ]
            }
        ]

        function changeTheme(theme) {
            vm.theme = theme;
        }
    };
})();
