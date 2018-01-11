var TransferObject = function(data, action, successCallback) {
    this.data = data;
    this.successCallback = successCallback;
    this.action = action;
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

var WEBURLs = (function() {
    var url = {};
    var prefix = "";
    if (!Constants.isPackagedAsWar()) {
        prefix = 'http://localhost:8080/';
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
