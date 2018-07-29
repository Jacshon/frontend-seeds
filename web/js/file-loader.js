var InspiniaFileLoader = (function() {

    this.fileMapping = {
        'app.dashboard_1':function(){
            return[
                'app/dashboard_1/dashboard_1.module.js',
                'app/dashboard_1/dashboard_1.ctrl.js',
                'app/dashboard_1/dashboard_1.service.js',
                'app/dashboard_1/dashboard_1.config.js'
            ]
        },
        'app.user':function(){
            return [
                'app/user/user.module.js'
                ,'app/user/user.ctrl.js'
                ,'app/user/user.service.js'
                ,'app/user/user.config.js'
            ]
        },
        'app.role': function() {
            return [
                'app/role/role.module.js',
                'app/role/role.config.js',
                'app/role/role.service.js',
                'app/role/role.ctrl.js'
            ];
        },
        'app.menu': function() {
            return [
                'app/menu/menu.module.js',
                'app/menu/menu.config.js',
                'app/menu/menu.service.js',
                'app/menu/menu.ctrl.js'
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
        return files;
    }

    return {
        getFiles: getFiles
    };

}());
