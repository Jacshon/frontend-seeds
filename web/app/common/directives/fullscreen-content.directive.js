(function() {
    angular.module('app.common').directive('fullscreenContent', fullscreenContent);

    /**
     * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
     */

    fullscreenContent.$inject = ['$timeout'];

    function fullscreenContent($timeout) {

        fullscreenContentController.$inject = ['$scope', '$element'];

        function fullscreenContentController($scope, $element) {

            // $('body').toggleClass('fullscreen-ibox-mode');
            $element.toggleClass('fullscreen');
            // Function for close ibox
            $scope.closebox = function() {
                $('body').toggleClass('fullscreen-ibox-mode');
                $element.toggleClass('fullscreen');
            };

        }


        return {
            restrict: 'A',
            scope: true,
            controller: fullscreenContentController
        };
    }
})();
