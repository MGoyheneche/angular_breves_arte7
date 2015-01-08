module.exports = function(grunt) {

  var mozjpeg = require('imagemin-mozjpeg');


  // Project configuration.
  grunt.initConfig({

    // vars
    project: {
      client: 'client',
      server: 'server',
      dist: 'dist',
      tmp: '.tmp'
    },

    less: {
      options: {
        paths: [
          '<%= project.client %>/bower_components',
          '<%= project.client %>/app',
          '<%= project.client %>/assets/styles'
        ]
      },
      dev: {
        options: {
          // sourceMap: false,
          // sourceMapFilename: 'main.map'
        },
        files: {
          '<%= project.tmp %>/assets/styles/main.css' : '<%= project.client %>/styles/main.less'
        }
      },
      build: {
        files: {
          '<%= project.dist %>/public/assets/styles/main.css' : '<%= project.client %>/styles/main.less'
        }
      },
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        // browsers: ['last 1 version']
      },
      build: {
        options: {
            diff: true
        },
        src: '<%= project.dist %>/public/assets/styles/main.css',
        dest: '<%= project.dist %>/public/assets/styles/main-prefixed.css'
      }
    },

    // watch
    watch: {
      options: {
        livereload: true,
      },
      less: {
        files: ['<%= project.client %>/styles/**/*.less'],
        tasks: ['less:dev', 'autoprefixer']
      },
      script: {
        files: ['client/app/**/*.js'],
        tasks: ['concat:dev']
      },
      express: {
        files:  [ 'server/server.js',
                  'client/app/**/*.js',
                  'client/**/*.html',
                  '.tmp/assets/styles/main.css' ],
        options: {
          spawn: false // without this option specified express won't be reloaded
        }
      }
    },

    concat: {
      dev: {
        options : {
          banner : '\'use strict\';\n\n',
          process : function (src, filepath){
            return '/* '+filepath+' */\n(function(){\n\n'+src+'\n\n})();';
          }
        },
        src: [
          'client/app/**/*.js',
        ],
        dest: '.tmp/app/combined-scripts.js'
      },
      build: {
        options : {
          banner : '\'use strict\';\n\n',
          process : function (src, filepath){
            return '/* '+filepath+' */\n(function(){\n\n'+src+'\n\n})();';
          }
        },
        src: [
          '<%= project.client %>/bower_components/angular/angular.js',
          '<%= project.client %>/bower_components/angular-resource/angular-resource.js',
          '<%= project.client %>/bower_components/angular-route/angular-route.js',
          '<%= project.client %>/bower_components/jquery/dist/jquery.js',
          '<%= project.client %>/app/**/*.js',
        ],
        dest: '<%= project.dist %>/public/app/combined-scripts.js'
      }
    },

    // clean
    clean: {
      dev: ['.tmp'],
      build: ['dist'],
    },

    // express
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server/server.js'
        },
      },
      prod: {
        options: {
          script: 'dist/server/server.js',
          node_env: 'production'
        }
      },
    },

    // open
    open: {
      dev: {
        path: 'http://localhost:3000',
        app: 'Google Chrome'
      }
    },

    // copies files
    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.client %>',
          dest: '<%= project.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            'bower_components/**/*',
            'assets/**/*',
            'index.html',
            'app/**/*'
          ]
        }, {
          expand: true,
          dest: '<%= project.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      build: {
        files: {
          '<%= project.dist %>/public/app/app.min.js': '<%= project.dist %>/public/app/combined-scripts.js'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          '<%= project.dist %>/public/assets/styles/main.min.css': '<%= project.dist %>/public/assets/styles/main.css'
        }
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= project.dist %>/public',
          src: '**/*.html',
          dest: '<%= project.dist %>/public'
        }]
      }
    },

    useminPrepare: {
      build: {
        src: '<%= project.dist %>/public/index.html',
            options: {
        dest: '<%= project.dist %>/public/index.html'
    }
      }
    },

    filerev: {
      options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 8
      },
      build: {
        files: [{
          src: [
              // '<%= project.dist %>/public/index.html',
              '<%= project.dist %>/public/assets/styles/main.min.css',
              '<%= project.dist %>/public/app/app.min.js'
          ]
        }]
      }
    },

    usemin: {
      build: {
        // html: ['<%= project.dist %>/public/index.html'],
        // css: ['<%= project.dist %>/public/assets/styles/main.min.css'],
        // js: ['<%= project.dist %>/public/app/app.min.js'],
        src: '<%= project.dist %>/public/index.html',
        options: {
              // dirs: ['<%= project.dist %>/public/**'],

          assetsDirs: [ '<%= project.dist %>',
                        '<%= project.dist %>/',
                        '<%= project.dist %>/public',
                        '<%= project.dist %>/public/app',
                        '<%= project.dist %>/public/app/',
                        '<%= project.dist %>/public/assets',
                        '<%= project.dist %>/public/assets/',
                        '<%= project.dist %>/public/assets/styles',
                        '<%= project.dist %>/public/assets/styles/',
                        '<%= project.dist %>/public/'],
          // blockReplacements: {
          // css: function (block) {
          //     grunt.log.debug(JSON.stringify(block.dest));
          //     grunt.log.debug(JSON.stringify(grunt.filerev.summary));

          //     return '<script src="'+block.dest+'"></script>';
          //   }
          // }
        }
        // html: ['<%= project.dist %>/public/*.html'],
        // css: ['<%= project.dist %>/public/assets/assets/styles/main.min.css'],
        // js: ['<%= project.dist %>/public/app/app.min.js'],
        // options: {
        //   dirs: ['<%= project.dist %>/public/'],
        //   assetsDirs: ['<%= project.dist %>/public/'],
        //   patterns: {
        //     js: [
        //         [/["']([^:"']+\.(?:png|gif|jpe?g))["']/img, 'Image replacement in js files']
        //     ]
        //   }
        // }
      }
    },

    compress: {
      build: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: '<%= project.dist %>/public',
        src: ['**/*'],
        dest: '<%= project.dist %>/public'
      }
    },

    imagemin: {
      build: {
        options: {
          optimizationLevel: 5,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()]
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    }

  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  // Load plugins that provides tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-filerev');


  // Default task(s).
  grunt.registerTask( 'default', [
    'clean:dev',
    'clean:build',
    'less:dev',
    'concat:dev',
    'express:dev',
    'open:dev',
    'watch'
  ]);

  grunt.registerTask( 'build', [
    'clean:dev',
    'clean:build',
    'less:build',
    'cssmin:build',
    'autoprefixer:build',
    'concat:build',
    'uglify:build',
    'copy:build',
    'useminPrepare:build',
    // 'filerev:build',
    'usemin:build',
    'htmlmin:build',
    'imagemin:build',
    // 'compress:build',
  ]);

};
