// API Docs at:
// https://developer.spotify.com/web-api/search-item/
var resultTerm = ''
var resultsList = ''

function searchByArtist(keyword, offset = 0) {
  var url = `https://api.spotify.com/v1/search?q=${keyword}&limit=20&offset=${offset}&type=artist`;
  $.getJSON(url).done((result) => {
    result.artists.items.forEach((item) => {
      $('#results').append(`<li>${item.name}</li>`)
    })
    resultTerm = keyword
    resultsList = 'artists'
  }).fail((result) => {
    console.log(result)
  })
}


function searchByTrack(keyword, offset = 0) {
  var url = `https://api.spotify.com/v1/search?q=${keyword}&limit=20&offset=${offset}&type=track`;
  $.getJSON(url).done((result) => {
    result.tracks.items.forEach((item) => {
      $('#results').append(`<li>${item.name}</li>`)
    })
    resultTerm = keyword
    resultsList = 'tracks'
  }).fail((result) => {
    console.log(result)
  })
}


$('#submit').on('click', (event) => {
  event.preventDefault()
  var searchTerm = $('#search-keyword').val()
  var searchType = $('#search-type').val()
  $('#results').html('')
  if(searchType == 'artist') {
    searchByArtist(searchTerm)
  } else if(searchType == 'track') {
    searchByTrack(searchTerm)
  } else {
    console.log("unknown search type")
  }
})

$('#next').on('click', () => {
  var resultCount = $('ul').children().length
  if(resultsList == 'artists') {
    searchByArtist(resultTerm, resultCount)
  } else if(resultsList == 'tracks') {
    searchByTrack(resultTerm, resultCount)
  } else {
    console.log('error')
  }
})
