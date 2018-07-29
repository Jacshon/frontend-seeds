(function() {
    angular.module('app.common').directive('minimalizaSidebar', minimalizaSidebar);

    /**
     * minimalizaSidebar - Directive for minimalize sidebar
     */

    minimalizaSidebar.$inject = ['$timeout'];

    function minimalizaSidebar($timeout) {

        minimalizaSidebarController.$inject = ['$scope', '$element'];

        function minimalizaSidebarController($scope, $element) {
            $scope.minimalize = function() {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass(
                        'body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function() {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')) {
                    $('#side-menu').hide();
                    setTimeout(
                        function() {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            };
        }

        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2" href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: minimalizaSidebarController
        };
    }
})();
