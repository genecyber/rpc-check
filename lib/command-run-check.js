var BigNumber = require('bignumber.js');
var request = require('sync-request');
var prettyjson = require('prettyjson');

function runCheck(cli) {
  var program = cli.program;

  var url = program.args[0];
  var postData = '{}';
  var res = request('POST', url, {
    json: JSON.parse(postData)
  });

  var api;
  try {
    api = cli.web3.version.api;
  } catch (e) {
    api = 'error: ' + e.message;
  }

  var node;
  try {
    node = cli.web3.version.node;
  } catch (e) {
    node = 'error: ' + e.message;
  }

  var network;
  try {
    network = cli.web3.version.network;
  } catch (e) {
    network = 'error: ' + e.message;
  }

  var version = {
    api: api,
    node: node,
    network: network
  }
  var mining;
  try {
    mining = cli.web3.eth.mining;
  } catch (e) {
    mining = 'error: ' + e.message;
  }
  var accounts = cli.web3.eth.accounts;
  accounts = accounts.map(function(accountId) {
    return [accountId, cli.web3.fromWei(cli.web3.eth.getBalance(accountId), "ether").toString()]
  })

  var gasPrice = new BigNumber(cli.web3.eth.gasPrice).toNumber();

  var lastBlock;
  try {
    lastBlock = cli.web3.eth.blockNumber;
  } catch (e) {
    lastBlock = 'error: ' + e.message;
  }

  var peerCount;
  try {
    peerCount = cli.web3.net.peerCount;
  } catch (e) {
    peerCount = 'error: ' + e.message;
  }

  var listening;
  try {
    listening = cli.web3.net.listening;
  } catch (e) {
    listening = 'error: ' + e.message;
  }

  var syncing;
  try {
    syncing = cli.web3.net.syncing;
  } catch (e) {
    syncing = 'error: ' + e.message;
  }

  var hashrate;
  try {
    hashrate = cli.web3.net.hashrate;
  } catch (e) {
    hashrate = 'error: ' + e.message;
  }

  var coinbase;
  try {
    coinbase = cli.web3.net.coinbase;
  } catch (e) {
    coinbase = 'error: ' + e.message;
  }

  var host = program.args[0];
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
    console.log(prettyjson.render(results, {}));
  } else {
    console.log(JSON.stringify(results))
  }
}


module.exports = runCheck;
