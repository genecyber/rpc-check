var BigNumber = require('bignumber.js');
var request = require('sync-request');

function runCheck(cli) {
  var program = cli.program;

  var url = program.args[0]
  var res = request('POST', url);

  var version = {
    api: cli.web3.version.api,
    node: cli.web3.version.node,
    network: cli.web3.version.network
  }

  var mining = cli.web3.eth.mining;
  var accounts = cli.web3.eth.accounts;
  accounts = accounts.map(function(accountId) {
    return [accountId, cli.web3.fromWei(cli.web3.eth.getBalance(accountId), "ether").toString()]
  })


  var gasPrice = new BigNumber(cli.web3.eth.gasPrice).toNumber();
  var lastBlock = cli.web3.eth.blockNumber;


  var peerCount = cli.web3.net.peerCount;
  var listening = cli.web3.net.listening;
  var host = program.args[0];

  var syncing = cli.web3.eth.syncing;
  var hashrate = cli.web3.eth.hashrate;
  var coinbase = cli.web3.eth.coinbase;

  var results = {
    version,
    host: {
      host,
      headers: res.headers
    },
    accounts,
    net: {
      peerCount,
      listening
    },
    eth: {
      coinbase,
      gasPrice,
      lastBlock,
      syncing,
      hashrate,
      mining
    }
  };

  if (program.block) {
    var lastBlockContent = cli.web3.eth.getBlock(lastBlock);
    results.lastBlock = lastBlockContent;
  }

  var keys = Object.keys(results);
  if (!program.json) {
    keys.map(function(key) {
      console.log(key, results[key]);
    });
  } else {
    console.log(JSON.stringify(results))
  }
}


module.exports = runCheck;
