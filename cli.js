var Web3 = require('web3');
var url= require('url');
class Cli {
  constructor(program) {
    this.program = program;
    var provider = new Web3.providers.HttpProvider(program.args[0]);
    this.web3 = new Web3(provider);
  }
  run(cb) {
    cb(this)
  }
}
module.exports = Cli;
