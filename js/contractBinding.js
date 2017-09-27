window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  startApp()
})

function startApp() {
  loadContract()
  subscribeEvents()
  loadAccounts()
}

function loadContract() {
   if (!web3.isConnected()) {
    console.error('CANT CONNECT TO PARITY')
     $('#no-web3-modal').modal('show')
    return
  }

  var abiString = `[{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"setMessage","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMessage","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_fee","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"UpdateMessage","type":"event"}]`
  var abi = JSON.parse(abiString)
  var address = '0xaD98e5f4d62d0cE3E57C1b7DBFD50846d649b9Db'
  window.contract = web3.eth.contract(abi).at(address)
}

function subscribeEvents() {
  contract.UpdateMessage((error, result) => {
    getMessage()
    document.getElementById('dimmer').classList.remove('active')
  })
}

function loadAccounts() {
  account = web3.eth.accounts[0];
  var accountInterval = setInterval(() => {
    if (web3.eth.accounts[0] !== account) {
      populateAccounts(web3.eth.accounts);
      getMessage()
    }
  }, 100);
}

function populateAccounts(accounts) {
  var opts = accounts.reduce((acc, currentAccount) => {
    acc += `<option>${currentAccount}</option>`
    return acc
  }, "")
  document.getElementById('accounts_list').innerHTML = opts
  account = web3.eth.accounts[0] // set first account
}

function getMessage() {
  contract.message((error, message) => {
    if (error) {
      console.error(`an error has happened ${error}`)
      return
    }

    document.getElementById('message').textContent = message
    $('#message').transition('tada')
  })
}

function updateMessage() {
  var selectedAccount = document.getElementById('accounts_list').value
  account = selectedAccount
  if (!selectedAccount) {
    console.error('no account selected');
    return
  }

  var messageInput = document.getElementById('messageInput').value
  contract.fee(function(error, fee) {
    contract.setMessage(messageInput, {
      value: fee,
      from: selectedAccount
    }, function(error, result) {
      if (error) {
        console.error(error);
        return
      }

      // UI Config
      document.getElementById('postedMessage').classList.remove('hidden')
      document.getElementById('dimmer').classList.add('active')
    })
  })
}

