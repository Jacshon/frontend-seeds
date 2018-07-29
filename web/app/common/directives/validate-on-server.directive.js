(function() {
    angular.module('app.common').directive('validateOnServer', function() {
        function link(scope, element, attrs) {}

        function compile(tElement, tAttrs, transclude) {
            console.log("compile");
            var children = tElement.children();
            var formName = tElement.attr('name');
            for (var i = 0; i < children.length; i++) {
                addServerErrorContainer(children[i], formName);
            }
        }

        function addServerErrorContainer(element, formName) {
            var inputElements = element.querySelectorAll('select, input, tags-input, code-select');
            var fieldName = null;
            if (inputElements) {
                for (var i = 0; i < inputElements.length; i++) {
                    var inputElement = inputElements[i];
                    fieldName = inputElement.getAttribute("name");
                    if (fieldName !== null) {
                        var errorAttrbute = formName + '["' + fieldName + '"].$error.serverMessage';
                        var errorNode = document.createElement('span');
                        errorNode.setAttribute('ng-show', errorAttrbute);
                        errorNode.setAttribute('class', 'server-error');

                        errorNode.appendChild(document.createTextNode('{{' + errorAttrbute + '}}'));
                        inputElement.parentElement.appendChild(errorNode);
                    } else {
                        console.warn("please add name property of input element bound to " + inputElement.getAttribute("data-ng-model") + " correctly to show validation outputs");
                    }
                }

            }

        }

        return {
            compile: compile
        };
    });
})();
