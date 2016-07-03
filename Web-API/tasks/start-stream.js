var python = require('python-shell');

module.exports = function (grunt) {
  var startScriptPath = '../../Video-Stream/my_script.py';

  grunt.registerTask('start-stream', 'Start Streaming from Camera', function () {
    python.run(startScriptPath, function (err) {
      if (err) throw err;
      console.log('finished');
    });
  }
}



