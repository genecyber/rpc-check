var Web3 = require('web3');
var url = require('url');
var getHttpProvider = require('upchain-web3-http-provider');
var parse = require('url').parse;

class Cli {
  constructor(program) {
    this.program = program;
    var parsedUrl = parse(program.args[0]);
    if (parsedUrl.auth && parsedUrl.auth !== null) {
        var user = parsedUrl.auth.split(':')[0];
        var password = parsedUrl.auth.split(':')[1];
    }
    var UpchainProvider = getHttpProvider(Web3.providers.HttpProvider);
    var provider = new UpchainProvider(program.args[0], {}, user, password);
    this.provider = provider;
    this.web3 = new Web3(provider);
  }
  run(cb) {
    cb(this)
  }
}
module.exports = Cli;
