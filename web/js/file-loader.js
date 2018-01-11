var FileLoader = (function() {
    this.dependancies = {

    };

    this.fileMapping = {
        'app.user': function() {
            return [
                'app/user/user.module.js',
                'app/user/user.config.js',
                'app/user/user.service.js',
                'app/user/user.ctrl.js'
            ];
        }
    };

    function getFiles(moduleName) {
        var folderName = moduleName.substr(moduleName.lastIndexOf('\.') + 1);
        var files = null;
        if (Constants.useMinfiedFiles()) {
            files = ['app/' + folderName + '/' + folderName + '.min.js'];
        } else if (Constants.useConcatFiles()) {
            files = ['app/' + folderName + '/' + folderName + '.concat.js'];
        } else {
            files = fileMapping[moduleName]();
        }
        var dependancyArray = dependancies[moduleName];
        if (dependancyArray) {
            for (var i = 0; i < dependancyArray.length; i++) {
                files = files.concat(getFiles(dependancyArray[i]));
            }
        }
        return files;
    }

    return {
        getFiles: getFiles
    };

}());
