module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // sass
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          '.tmp/styles/main.css': 'client/styles/main.scss'
        }
      }
    },

    // connect
    connect: {
      server: {
        options: {
          port: 5678,
          base: ['client', '.tmp'],
          open: true,
          hostname: 'localhost',
          livereload: true
        }
      }
    },

    // watch
    watch: {
      css: {
        files: ['client/styles/**/*.scss'],
        tasks: ['sass'],
      },
      script: {
        files: [
          'client/app/**/*.js',
        ],
        tasks: ['concat:scripts']
      },
      livereload: {
        files: ['.tmp/styles/main.css', 'client/**/*.html', 'client/**/*.js'],
        options: {
          livereload: true
        }
      }
    },

    concat :{
      scripts : {

        options : {
          banner : '\'use strict\';\n\n',
          process : function (src, filepath){
            return '/* '+filepath+' */\n(function(){\n\n'+src+'\n\n})();';
          }
        },
        src: [
          // 'client/app/app.js',
          'client/app/**/*.js',
          // '!{<%= project.tmp %>,<%= project.client %>}/app/**/*.spec.js',
          // '!{<%= project.tmp %>,<%= project.client %>}/app/**/*.mock.js',
        ],
        dest: '.tmp/app/combined-scripts.js'
      }
    },

    // clean
    clean: {
      dev: ['.tmp']
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
        // options: {
        //   script: 'path/to/prod/server.js',
        //   node_env: 'production'
        // }
      },
      test: {
        // options: {
        //   script: 'path/to/test/server.js'
        // }
      }
    }


  });


  // Load plugins that provides tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express-server');

  // Default task(s).
  grunt.registerTask('default', ['clean:dev' ,'sass', 'concat:scripts', 'express:dev','watch']);
  

  // unused tasks
  // connect

};
