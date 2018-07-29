(function() {
    angular.module('app.common').directive('iboxTools', iboxTools);


    /**
     * iboxTools - Directive for iBox tools elements in right corner of ibox
     */

    iboxTools.$inject = ['$timeout'];

    function iboxTools($timeout) {

        iboxToolsController.$inject = ['$scope', '$element'];

        function iboxToolsController($scope, $element) {
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
                if ($scope.onClose) {
                    $scope.onClose();
                }
            };
        }

        return {
            restrict: 'A',
            scope: {
                onClose: '&'
            },
            templateUrl: 'app/common/templates/ibox_tools.html',
            controller: iboxToolsController
        };

    }
})();
