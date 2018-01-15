/**
 * Created by weijiang
 * data : 2018/1/15.
 * version :v1.0.0
 */
(function() {
    angular.module('app.common').directive('securedApplication', securedApplication);

    securedApplication.$inject = ['toaster'];

    function securedApplication(toaster) {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                //once Angular is started, remove class:
                elem.removeClass('waiting-for-angular');

                var login = elem.find('#login-holder');
                var main = elem.find('#content');

                login.hide();

                scope.$on('event:auth-loginRequired', function() {
                    login.slideDown('slow', function() {
                        main.hide();
                    });
                });
                scope.$on('event:auth-loginConfirmed', function() {
                    main.show();
                    login.slideUp();
                });
                scope.$on('event:auth-forbidden', function() {
                    toaster.clear();
                    toaster.pop({
                        type: 'error',
                        body: "You are not autherized to perform this operation. Please contact system administrator",
                        showCloseButton: true,
                        timeout: 500000
                    });
                });
            }
        };
    }
})();
