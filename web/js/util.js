var TransferObject = function(data, action, successCallback) {
    this.data = data;
    this.successCallback = successCallback;
    this.action = action;
    // if (typeof successCallback != 'undefined') {
    //     successCallback.call(data, action);
    // }
};

var Constants = (function() {
    var actions = {
        VIEW: 'view',
        EDIT: 'edit',
        ADD: 'add',
        DELETE: 'delete'
    };
    var useConcatFiles = false;
    var useMinfiedFiles = false;
    var isPackagedAsWar = false;
    return {
        getActions: function() {
            return actions;
        },
        useConcatFiles: function() {
            return useConcatFiles;
        },
        useMinfiedFiles: function() {
            return useMinfiedFiles;
        },
        isPackagedAsWar: function() {
            return isPackagedAsWar;
        }
    };
})();

var InspiniaURLs = (function() {
    var url = {};
    var prefix = "";
     if (!Constants.isPackagedAsWar()) {
         prefix = 'http://localhost:8080/happy/birds/';
     } else {
         prefix = '../';
     }
    return {
        setURLS: function(moduleName, URLs) {
            url[moduleName] = URLs;
        },
        getURLS: function(moduleName) {
            return url[moduleName];
        },
        createUrl: function(url) {
            return prefix + url;
        }
    };
}());

var formDataTransformer = function(obj) {
    var query = '',
        name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        } else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        } else if (value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
};

EventManager = (function() {
    return {
        addEvent: addEvent
    };

    function addEvent(currnetScope, event, eventFunction, jquerryElement, selector) {
        if (selector) {
            jquerryElement.on(event, selector, eventFunction);
        } else {
            jquerryElement.on(event, eventFunction);
        }
        currnetScope.$on('$destroy', function() {
            jquerryElement.off();
        });
    }
}());

var tagTransformer = (function() {
    return {
        tagsToString: tagsToString,
        stringToTags: stringToTags
    };

    function stringToTags(valueString) {
        var tagList = [];
        if (valueString) {
            var array = valueString.split(';');
            for (var i = 0; i < array.length; i++) {
                tagList.push({
                    "text": array[i]
                });
            }
        }
        return tagList;
    }

    function tagsToString(tagList) {
        var valueString = null;
        if (tagList) {
            for (var i = 0; i < tagList.length; i++) {
                if (valueString) {
                    valueString = valueString + ';' + tagList[i].text;
                } else {
                    valueString = tagList[i].text;
                }
            }
        }
        return valueString;
    }
}());
