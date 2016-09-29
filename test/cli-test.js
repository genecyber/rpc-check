'use strict';
const assert = require('chai').assert;
var exec = require('child-process-promise').exec;

var commands =[
  './bin/rpc-check -h',
];

describe('rpc-check', function() {

  it('executes help', function(done) {

    function execAndDone(command){
      return exec(command).catch(done);
    }

    commands = commands.map(execAndDone);
    Promise
      .all(commands)
      .then(function (result) {
          result.map(assert.ok);
          done();
      }).catch(done);
  }).timeout(5000);
});
