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

    // sass
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '.tmp/assets/styles/main.css': 'client/styles/main.scss'
        }
      },
      build: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= project.dist %>/public/assets/styles/main.css': '<%= project.client %>/styles/main.scss'
        }
      }
    },

    less: {
      options: {
        paths: [
          '<%= project.client %>/bower_components',
          // '<%= project.client %>/app',
          '<%= project.client %>/assets/styles'
        ]
      },
      server: {
        files: {
          '<%= project.tmp %>/assets/styles/main.css' : '<%= project.client %>/styles/main.less'
        }
      },
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.tmp %>',
          src: '{,*/}*.css',
          dest: '<%= project.tmp %>'
        }]
      }
    },

    // watch
    watch: {
      options: {
        livereload: true,
      },
      less: {
        files: ['<%= project.client %>/assets/styles/**/*.less'],
        tasks: ['less', 'autoprefixer']
      },
      script: {
        files: ['client/app/**/*.js'],
        tasks: ['concat:dev']
      },
      express: {
        files:  [ 'server/server.js',
                  'client/app/**/*.js',
                  'client/**/*.html',
                  '.tmp/styles/**/*.scss' ],
        tasks: ['express:dev'],
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
        }
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
      dist: {
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
            'index.html'
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

  // Default task(s).
  grunt.registerTask( 'default', [
    'clean:dev',
    'clean:build',
    'less',
    'autoprefixer',
    'concat:dev',
    'express:dev',
    'open:dev',
    'watch'
  ]);

  grunt.registerTask( 'build', [
    'clean:dev',
    'clean:build',
    'copy',
    'less',
    'autoprefixer',
    'concat:build',
    'express:prod',
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
