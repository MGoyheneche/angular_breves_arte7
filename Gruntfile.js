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

    // watch
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['client/styles/**/*.scss'],
        tasks: ['sass']      },
      script: {
        files: ['client/app/**/*.js'],
        tasks: ['concat:scripts']
      },
      express: {
        files:  [ 'server/server.js', 'client/index.html', '.tmp/styles/main.scss' ],
        tasks: ['express:dev'],
        options: {
          spawn: false // without this option specified express won't be reloaded
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
          'client/app/**/*.js',
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
    },

    // open 
    open : {
      dev : {
      path: 'http://localhost:3000',
        app: 'Google Chrome'
      }
    }

  });

  // Load plugins that provides tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('default', ['clean:dev' ,'sass', 'concat:scripts', 'express:dev', 'open', 'watch']);

};
