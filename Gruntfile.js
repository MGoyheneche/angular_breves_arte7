module.exports = function(grunt) {

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
          // '<%= project.client %>/app',
          '<%= project.client %>/assets/styles'
        ]
      },
      dev: {
        options: {
          // sourceMap: true,
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
        // tasks: ['wait'],
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
            // return '/* '+filepath+' */\n'+src+'\n\n';
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
        // tasks: ['wait'],
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
      test: {
        // options: {
        //   script: 'path/to/test/server.js'
        // }
      }
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
            // 'assets/images/{,*/}*.{webp}',
            // 'assets/fonts/',
            'assets/**/*',
            'index.html',
            'app/**/*'
          ]
        }, {
        //   expand: true,
        //   cwd: '<%= project.tmp %>/images',
        //   dest: '<%= project.dist %>/public/assets/images',
        //   src: ['generated/*']
        // }, {
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
        src: '<%= project.dist %>/public/index.html'
      }
    },

    usemin: {
      build: {
        src: '<%= project.dist %>/public/index.html'
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

    imagemin: {                          // Task
      // static: {                          // Target
      //   options: {                       // Target options
      //     optimizationLevel: 3,
      //     svgoPlugins: [{ removeViewBox: false }],
      //     use: [mozjpeg()]
      //   },
      //   files: {                         // Dictionary of files
      //     'dist/img.png': 'src/img.png', // 'destination': 'source'
      //     'dist/img.jpg': 'src/img.jpg',
      //     'dist/img.gif': 'src/img.gif'
      //   }
      // },
      build: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'dist/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          // dest: 'dist/'                  // Destination path prefix
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


  // Default task(s).
  grunt.registerTask( 'default', [
    'clean:dev',
    'clean:build',
    'less:dev',
    'concat:dev',
    'express:dev',
    // 'open:dev',
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
    'usemin:build',
    'htmlmin:build',
    'imagemin:build',
    // 'compress:build',
  ]);

  // - dist/
// Update server environment to modify path
  //   - server/
  //     - server.js
  //     - youtube_movies.js

  //   - public/
  //     - app/
  //       - app.min.js
  //       - main.min.css
  //       views/
  //         - ...
  //     - assets/
  //       - images/
  //         - ...
  //       - fonts/
  //         - ...
  //     - bower_components/
  //       - ...

};
