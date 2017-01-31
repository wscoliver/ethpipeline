module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015','stage-0'],
        plugins: [
          ["transform-runtime", {
            "polyfill": false,
            "regenerator": true
          }]
        ]
      },
      dist: {
        files: [
          {
            "expand": true,
            "cwd": "src/",
            "src": ["**/*.js"],
            "dest": "dist/",
            "ext": ".js"
          }
        ]
      }
    },
    copy: {
      Fixture: {
        expand: true,
        cwd: 'src/fixtures/',
        src: '**',
        dest: 'dist/fixtures/'
      },
    }
  });
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default',['babel','copy']); 
};
