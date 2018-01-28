/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
(function () {
    angular.module('frontend').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$rootScope', '$ocLazyLoad', '$state', '$window', 'applicationSettings', 'translationService'];
    function MainCtrl($rootScope, $ocLazyLoad, $state, $window, applicationSettings, translationService) {
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
        // getUserAccessMenuList();
        function changeTheme(theme) {
            vm.theme = theme;
        }

        vm.menuList = [
            {
                "state":"user.userList",
                "icon":"fa fa-bank",
                "name":"用户管理",
                "code":"app.user",
                "module":"user"
            },
            {
                "state":"role.roleList",
                "icon":"fa fa-list-alt",
                "name":"角色管理",
                "code":"app.role",
                "module":"role"
            },
            {
                "state":"privilege.privilegeList",
                "icon":"fa fa-desktop",
                "name":"app.privilege",
                "code":"sys.privilege"
            },
            {
                "state":"operate.operateList",
                "icon":"fa fa-laptop",
                "name":"app.operate",
                "code":"sys.operate"
            }
        ];

        vm.accessMenuList = [
            {
                "code":"dupLevel",
                "icon":"fa fa-fire",
                "name":"DupLevel sample",
                "menuList":[
                    {
                        "code":"dupLevel1",
                        "state":"dupLevel.dupLevel1",
                        "icon":"fa fa-bank",
                        "name":"app.dupLevel"
                    },
                    {
                        "state":"dupLevel.dupLevel2",
                        "icon":"fa fa-list-alt",
                        "name":"app.dupLevel",
                        "code":"dupLevel2"
                    },
                    {
                        "state":"privilege.privilegeList",
                        "icon":"fa fa-desktop",
                        "name":"app.privilege",
                        "code":"sys.privilege"
                    },
                    {
                        "state":"operate.operateList",
                        "icon":"fa fa-laptop",
                        "name":"app.operate",
                        "code":"sys.operate"
                    }
                ]
            },
            {
                "code":"dashboard",
                "state":"dashboard",
                "icon":"fa fa-fire",
                "name":"Index",
                "menuList":[
                    {
                        "state":"dashboard.index.home",
                        "icon":"fa fa-desktop",
                        "name":"Dashboard",
                        "code":""
                    }
                ]
            }
        ];

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

        function getUserAccessMenuList() {
            authorizationService.getUserAccessMenuList().then(
                function (data) {
                    vm.accessMenuList = data;
                },
                function (error) {
                    console.log("error in getUserAccessMenuList");
                }
            );
        }
    };



})();
