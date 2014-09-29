module.exports = function(grunt) {
  // Do grunt-related things in here

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: ['test/**/*.html']
    },
    watch: {
        files: ['temp.js'],
        tasks: 'qunit'
    }
  });

  //
  grunt.loadNpmTasks('grunt-contrib-qunit');
};
