         window.addEventListener('load', function() {
            if (typeof web3 !== 'undefined') {
              window.web3 = new Web3(web3.currentProvider);
            } else {
              window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            }
            startApp()
          })

         function startApp() {
           if (!web3.isConnected()) { console.error('CANT CONNECT TO PARITY') }

            var abiString = `[{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"setMessage","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMessage","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_fee","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"UpdateMessage","type":"event"}]`
         var abi = JSON.parse(abiString)
         var address = '0xaD98e5f4d62d0cE3E57C1b7DBFD50846d649b9Db'
         window.contract = web3.eth.contract(abi).at(address)

         contract.UpdateMessage().watch(function (error, message) {
           contract.message(function (error, result) { alert(result) })
         })

             var account = web3.eth.accounts[0];
         var accountInterval = setInterval(function() {
           if (web3.eth.accounts[0] !== account) {
             populateAccounts(web3.eth.accounts);
           }
         }, 100);
         }

         function populateAccounts(accounts){
             var opts = "";
             for(var i in accounts) {
                 // TODO GET SELECTE OPTIONS AND SET AGAIN
                 opts += '<option>'+accounts[i]+'</option>';
             }
             document.getElementById('accounts_list').innerHTML = opts
         }

         function setMessage() {
             var selectedAccount = document.getElementById('accounts_list').value
             if (!selectedAccount) { console.error('no account selected'); return }

             var messageInput = document.getElementById('messageInput').value
             contract.fee(function(error, fee){
                 contract.setMessage(messageInput, {value: fee, from: selectedAccount }, function (error, result) {
                     if (error) { console.error(error); return }
                     alert('posted')
                 })
             })
         }

