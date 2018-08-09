(function () {
    angular.module('app.forgetPassword').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
    setURLS();

    function configure($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false
        });

        $stateProvider.state('sys.forgetPassword', {
            url: "/forgetPassword",
            templateUrl: "app/common/templates/content.html",
            data: {
                pageTitle: 'Forget Password'
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        }
                    ]);
                }
            }
        }).state('sys.forgetPassword.wizard', {
            url: "/wizard",
            templateUrl: "app/forgetPassword/forgetPassword.html",
            data: {pageTitle: 'Forget Password'},
            resolve: {
            }
        }).state('sys.forgetPassword.wizard.step_one', {
            url: "/step_one",
            templateUrl: "app/forgetPassword/step_one.html",
            data: {pageTitle: 'Step one'},
        }).state('sys.forgetPassword.wizard.step_two', {
            url: "/step_two",
            templateUrl: "app/forgetPassword/step_two.html",
            data: {pageTitle: 'Step two'},
        }).state('sys.forgetPassword.wizard.step_three', {
            url: "/step_three",
            templateUrl: "app/forgetPassword/step_three.html",
            data: {pageTitle: 'Step three'},
        });
    }

    function setURLS() {
        urls = {

        };
        InspiniaURLs.setURLS('app.forgetPassword', urls);
    }

})();