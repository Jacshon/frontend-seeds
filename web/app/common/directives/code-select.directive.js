(function() {
    angular.module('app.common').directive('codeSelect', codeSelect);

    codeSelect.$inject = ['codeSelectService'];

    function codeSelect(codeSelectService) {

        var scope = {
            model: '=',
            readOnly: '@',
            codeType: '@',
            name: '@',
            cssClass: '@'
        };

        var link = function(scope, iElm, iAttrs) {
            function loadData() {
                codeSelectService.getAllCommonCodes().then(function(response) {
                    scope.codes = response;
                }, function(response) {
                    console.log("error in codeSelect");
                });
            }
            scope.$on('languageChanged', loadData);
            loadData();
        };

        function getTemplate() {
            return '<select name="{{name}}" ng-model="model"  ng-disabled="{{readOnly}}" class={{cssClass}}>' +
            	'<option value=""> </option>' +
                '<option ng-repeat="code in codes | filter : codeType" value="{{code.code}}">{{code.description}}</option>' +
                '</select>';
        }

        return {
            restrict: 'EA',
            scope: scope,
            template: getTemplate,
            link: link
        };
    }
})();
