var python = require('python-shell');

module.exports = function (grunt) {
  var startScriptPath = '../Video-Stream/start-script.py';

  grunt.registerTask('stream', 'Start Streaming from Camera', function () {
    python.run(startScriptPath, function (err) {
      if (err) throw err;
      console.log('finished');
    });
  })
}



