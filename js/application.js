$('.close').on('click', () => {
  $(this)
    .closest('.message')
    .transition('fade')
})

$('#submit').on('click', () => updateMessage())

// // Tip button
var tipButton = document.querySelector('#tip')
tipButton.addEventListener('click', function() {
  if (typeof window.web3 === 'undefined' || !window.web3.isConnected()) {
    $('#no-web3-modal').modal('show')
  }

  var user_address = web3.eth.accounts[0]
  web3.eth.sendTransaction({
    to: '0x00Df8e77d5fA0630144e147cCDB0B504F9C05A8D',
    from: user_address,
    value: web3.toWei('0.1', 'finney')
  }, function (err, transactionHash) {
    if (err) return alert('Oh no!: ' + err.message)

    // If you get a transactionHash, you can assume it was sent,
    // or if you want to guarantee it was received, you can poll
    // for that transaction to be mined first.
    $('#thanks-modal').modal('show')
  })
})
