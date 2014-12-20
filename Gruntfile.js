module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded'
          },
          files: {                         // Dictionary of files
            '.tmp/styles/main.css': 'app/styles/main.scss'       // 'destination': 'source'
          }
        }
      }
    });


    // Load the plugin that provides the "sass" task.
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['sass']);

};
