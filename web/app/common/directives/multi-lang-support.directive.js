(function() {
    angular.module('app.common').directive('multiLangSupport', function() {

        var scope = {
            collection: '=',
            object: '=',
            field: '@',
            readOnly: '@',
            labelName: '@',
            inputType: '@'
        };

        var link = function(scope, iElm, iAttrs) {
            scope.formName = getFormName(iAttrs.$$element.context.parentElement);
            scope.collectionNameLong = iAttrs.collection;
            if (scope.collectionNameLong.lastIndexOf('.') >= 0) {
                scope.collectionName = scope.collectionNameLong.substring(scope.collectionNameLong.lastIndexOf('.') + 1);
            } else {
                scope.collectionName = scope.collectionNameLong;
            }

            if (!scope.collection) {
                scope.collection = [];
                scope.collection.push({
                    languageCode: 'en'
                });
                scope.collection.push({
                    languageCode: 'zh'
                });
            }

            for (var i = 0; i < scope.collection.length; i++) {
                if (scope.collection[i].languageCode == 'en') {
                    scope.englishObject = scope.collection[i];
                    scope.englishIndex = i;
                    scope.englishFieldName = scope.collectionName + "[" + i + "]." + scope.field;
                } else if (scope.collection[i].languageCode == 'zh') {
                    scope.chineseObject = scope.collection[i];
                    scope.chineseIndex = i;
                    scope.chineseFieldName = scope.collectionName + "[" + i + "]." + scope.field;
                }
            }

            if (scope.inputType == 'textarea') {
                scope.isTextArea = true;
            } else {
                scope.isTextArea = false;
            }

            scope.englishTabId = scope.collectionNameLong.replace(/\./g, '_') + '_' + scope.field + "_en";
            scope.chieneseTabId = scope.collectionNameLong.replace(/\./g, '_') + '_' + scope.field + "_cn";
        };

        function getFormName(element) {
            if (element === null) {
                return;
            } else if ("FORM" === element.tagName.toUpperCase()) {
                return element.name;
            } else {
                return getFormName(element.parentElement);
            }
        }

        function getTemplate() {
            return '<div>' +
                '<label style="float:left;margin-right:10px">{{labelName}}</label>' +
                '<ul style="float:left" class="nav nav-tabs multiLanguageSuppFormItem">' +
                '<li class="active">' +
                '<a data-toggle="tab" data-target="#{{englishTabId}}" ng-class="{\'error-label\': $parent[formName][englishFieldName].$error.serverMessage}"  >{{\'common.english\' | translate}}</a>' +
                '</li>' +
                '<li>' +
                '<a data-toggle="tab" data-target="#{{chieneseTabId}}" ng-class="{\'error-label\': $parent[formName][chineseFieldName].$error.serverMessage}"  >{{\'common.chinese\' | translate}}</a>' +
                '</li>' +
                '</ul>' +
                '</div>' +

                '<div class="tab-content">' +
                '<div id="{{englishTabId}}" class="tab-pane fade in active">' +
                '<div class="form-group">' +
                '<input ng-if="!isTextArea" tooltip-placement="top" uib-tooltip="{{\'common.inChinese\' | translate}} : {{chineseObject[field]}}"  ' +
                ' type="text" name="{{englishFieldName}}" placeholder="{{labelName}} {{\'common.inEnglish\' | translate}}" class="form-control" data-ng-model="englishObject[field]" ng-readonly="{{readOnly}}">' +
                '<textarea ng-if="isTextArea" tooltip-placement="top" uib-tooltip="{{\'common.inChinese\' | translate}} : {{chineseObject[field]}}"  ' +
                ' type="text" name="{{englishFieldName}}" placeholder="{{labelName}} {{\'common.inEnglish\' | translate}}" class="form-control" data-ng-model="englishObject[field]" ng-readonly="{{readOnly}}"></textarea>' +
                '<span ng-show="$parent[formName][englishFieldName].$error.serverMessage" class="server-error ng-binding ng-hide">{{$parent[formName][englishFieldName].$error.serverMessage}}</span>' +
                '</div>' +
                '</div>' +
                '<div id="{{chieneseTabId}}" class="tab-pane fade">' +
                '<div class="form-group">' +
                '<input ng-if="!isTextArea" tooltip-placement="top" uib-tooltip="{{\'common.inEnglish\' | translate}} : {{englishObject[field]}}" ' +
                ' type="text" name="{{chineseFieldName}}" placeholder="{{labelName}} {{\'common.inChinese\' | translate}}" class="form-control" data-ng-model="chineseObject[field]" ng-readonly="{{readOnly}}">' +
                '<textarea ng-if="isTextArea" tooltip-placement="top" uib-tooltip="{{\'common.inEnglish\' | translate}} : {{englishObject[field]}}" ' +
                ' type="text" name="{{chineseFieldName}}" placeholder="{{labelName}} {{\'common.inChinese\' | translate}}" class="form-control" data-ng-model="chineseObject[field]" ng-readonly="{{readOnly}}"></textarea>' +
                '<span ng-show="$parent[formName][chineseFieldName].$error.serverMessage" class="server-error ng-binding ng-hide">{{$parent[formName][chineseFieldName].$error.serverMessage}}</span>' +
                '</div>' +
                '</div>' +
                '</div>';
        }




        return {
            restrict: 'EA',
            scope: scope,
            template: getTemplate,
            link: link
        };
    });
})();
