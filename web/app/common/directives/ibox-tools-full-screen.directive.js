(function() {
    angular.module('app.common').directive('iboxToolsFullScreen', iboxToolsFullScreen);

    /**
     * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
     */

    iboxToolsFullScreen.$inject = ['$timeout'];

    function iboxToolsFullScreen($timeout) {

        iboxToolsFullScreenController.$inject = ['$scope', '$element'];

        function iboxToolsFullScreenController($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function() {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function() {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function() {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function() {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            };
        }


        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'app/common/templates/ibox_tools_full_screen.html',
            controller: iboxToolsFullScreenController
        };
    }
})();
