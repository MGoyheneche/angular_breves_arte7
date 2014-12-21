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
          '.tmp/styles/main.css': 'app/styles/main.scss'
        }
      }
    },

    // connect
    connect: {
      server: {
        options: {
          port: 5678,
          base: ['app', '.tmp'],
          open: true,
          hostname: 'localhost',
          livereload: true
        }
      }
    },

    // watch
    watch: {
      css: {
        files: ['app/styles/**/*.scss'],
        tasks: ['sass'],
      },
      livereload: {
        files: ['.tmp/styles/main.css', 'app/index.html'],
        options: {
          livereload: true
        }
      }
    },

    // clean
    clean: {
      dev: ['.tmp']
    }


  });


  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['clean:dev' ,'sass', 'connect','watch']);

};
