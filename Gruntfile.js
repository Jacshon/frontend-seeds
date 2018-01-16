module.exports = function(grunt) {
    var settings = grunt.file.readJSON('settings.json');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {},
        uglify: {},
        copy: {
            selective: {
                files: [{
                    expand: true,
                    cwd: 'src/web/',
                    src: ['**/*.*', '!**/app/**', '!**/node_modules/**'],
                    dest: 'target/web/'
                }]
            },
            dataFiles: {
                files: [{
                    expand: true,
                    cwd: 'src/web/app/',
                    src: ['*/data/*.*'],
                    dest: 'target/web/app'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/web/app/',
                    src: ['**/*.html'],
                    dest: 'target/web/app'
                }]
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'src/web/',
                    src: ['**/*.*', '!**/node_modules/**'],
                    dest: 'target/web/'
                }]
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'target/web'
            }
        },
        usemin: {
            html: ['target/web/index.html']
        },
        clean: {
            target: ['target/'],
            concatFiles: ['target/web/**/**.concat.js']
        },
        replace: {
            html: {
                src: ['target/web/index.html'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: "app/notification/notification.min.js",
                    to: "app/notification/notification.concat.js"
                }, {
                    from: "app/app.min.js",
                    to: "app/app.concat.js"
                }, {
                    from: "app/common/common.min.js",
                    to: "app/common/common.concat.js"
                }]
            },
            concat: {
                src: ['target/web/js/util.js'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: "var useMinfiedFiles = true;",
                    to: "var useMinfiedFiles = false;"
                }, {
                    from: "var useConcatFiles = false;",
                    to: "var useConcatFiles = true;"
                }]
            },
            minify: {
                src: ['target/web/js/util.js'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: "var useMinfiedFiles = false;",
                    to: "var useMinfiedFiles = true;"
                }, {
                    from: "var useConcatFiles = true;",
                    to: "var useConcatFiles = false;"
                }]
            },
            debug: {
                src: ['target/web/js/util.js'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: "var useMinfiedFiles = true;",
                    to: "var useMinfiedFiles = false;"
                }, {
                    from: "var useConcatFiles = true;",
                    to: "var useConcatFiles = false;"
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');

    if(settings.debug){
    	grunt.registerTask('default', ['clean', 'copy:all', 'replace:debug']);
    }else{
    	if (settings.useMinfiedFiles) {
            grunt.registerTask('default', ['clean', 'copy:selective','copy:html','copy:dataFiles', 'useminPrepare', 'prepareConcat', 'concat', 'prepareUglify', 'uglify', 'usemin', 'clean:concatFiles', 'replace:minify']);
        } else {
            grunt.registerTask('default', ['clean', 'copy:selective','copy:html','copy:dataFiles', 'useminPrepare', 'prepareConcat', 'concat', 'usemin', 'replace:html', 'replace:concat']);
        }
    }
    

    grunt.registerTask("prepareUglify", "Finds and prepares modules for uglification.", function() {
        var uglify = grunt.config.get('uglify') || {};
        uglify.min = {
            files: grunt.file.expandMapping(grunt.file.expand("target/web/app/**/*.concat.js"), '.', {
                rename: function(destBase, destPath) {
                    return destPath.replace('concat.js', 'min.js');
                }
            })
        };
        grunt.config.set('uglify', uglify);
    });

    grunt.registerTask("prepareConcat", "Finds and prepares modules for concatenation.", function() {
        // get all module directories
        grunt.file.expand("src/web/app/*/").forEach(function(dir) {
            // get the module name from the directory name
            var arr = dir.split('/');
            var dirName = arr[arr.length - 2];
            // get the current concat object from initConfig
            var concat = grunt.config.get('concat') || {};
            // create a subtask for each module, find all src files
            // and combine into a single js file per module
            concat[dirName] = {
                src: [dir + '/**/*.module.js', dir + '/**/*.config.js', dir + '/**/*.service.js', dir + '/**/*.ctrl.js', dir + '/**/*.js'],
                dest: 'target/web/app/' + dirName + '/' + dirName + '.concat.js'
            };

            // add module subtasks to the concat task in initConfig
            grunt.config.set('concat', concat);
        });

        var concat = grunt.config.get('concat') || {};
        concat['app'] = {
            src: ['src/web/app/*.module.js', 'src/web/app/*.config.js', 'src/web/app/*.service.js', 'src/web/app/*.ctrl.js', 'src/web/app/*.js'],
            dest: 'target/web/app/app.concat.js'
        };
        grunt.config.set('concat', concat);
    });
};
