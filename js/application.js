$('.close').on('click', () => {
  $(this)
    .closest('.message')
    .transition('fade')
})

$('#submit').on('click', () => updateMessage())
