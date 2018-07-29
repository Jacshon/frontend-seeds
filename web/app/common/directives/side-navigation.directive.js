(function() {
    angular.module('app.common').directive('sideNavigation', sideNavigation);
    /**
     * sideNavigation - Directive for run metsiMenu on sidebar navigation
     */

    sideNavigation.$inject = ['$timeout'];

    function sideNavigation($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function() {
                    element.metisMenu();
                });
            }
        };
    }
})();
