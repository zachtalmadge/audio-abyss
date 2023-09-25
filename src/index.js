// GLOBAL VARIABLES
const URL = "http://localhost:3000/songs"
const songDisplayCards = document.querySelector('#card-container')
const addSongForm = document.querySelector('#submit-new-song')
const refreshButton = document.querySelector('#refresh-button')
// song detail modal nodes
const songDetailName = document.querySelector('#songDetailName')
const songDetailArtist = document.querySelector('#songDetailArtist')
const songDetailAlbum = document.querySelector('#songDetailAlbum')
const songDetailReleaseYear = document.querySelector('#songDetailReleaseYear')
const songDetailGenre = document.querySelector('#songDetailGenre')
const songDetailAlbumArt = document.querySelector('#songDetailAlbumArt')

//! WESLEY'S CODE
const fetchSongs = () => {
    fetch(URL)
    .then(response => response.json())
    .then(songsArray => displayRandomSongs(songsArray))
    .catch(error => alert(error))
}

const renderSongCard = (song) => {

    const colContent = `
    <div class="col-md-4">
      <div class="card">
        <img class="card-img-top" src="${song.image}" alt="${song.song}">
        <div class="card-body">
          <h5 class="card-title">${song.song}</h5>
          <p class="card-text">
          Artist: ${song.artist} <br>
          Album: ${song.album} <br>
          </p>
          <button data-name="${song.song}" class="btn btn-primary details" data-toggle="modal" data-target="#songDetailModal">Details</button>
          <button class="btn btn-outline-danger"><i class="far fa-heart"></i></button>
        </div>
      </div>
    </div>
    `

    songDisplayCards.innerHTML += colContent
}

function displayRandomSongs(songsArray) {
    // Randomly select 6 songs
    const selectedSongs = [];
    // while the length is less than 6
    while (selectedSongs.length < 6) {
      const randomIndex = Math.floor(Math.random() * songsArray.length);
      // if the selected songs array does not have the song already in it
      if (!selectedSongs.includes(songsArray[randomIndex])) {
        selectedSongs.push(songsArray[randomIndex]);
      }
    }
    selectedSongs.forEach(song => renderSongCard(song))
    //attach event listener
    document.querySelectorAll('.details').forEach(node => {
      node.addEventListener('click', (e) => {
        displaySongDetails(e.target.dataset.name)
      })
    })
}


//remove all children of element
const clearElement = (element) => {
  let child = element.lastElementChild
  while (child) {
    element.removeChild(child)
    child = element.lastElementChild
  }
}
//refresh button event listener
  const refreshSongs = () => {
    refreshButton.addEventListener('click', () => {
      clearElement(songDisplayCards)
      fetchSongs()
    })
  }

//Call functions
fetchSongs()
refreshSongs()

//! TIANA'S CODE

const addSongEventListener = () => {
  addSongForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let titleInput = event.target['song-title'].value
    let artistInput = event.target.artist.value
    let albumInput = event.target.album.value
    let albumImgUrl = event.target['album-img-url'].value
    let genreInput = event.target.genre.value
    let releaseYearInput = event.target['release-year'].value
    //function to open modal with new song info

    //fetch to do a Post request
    fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          song: titleInput,
          artist: artistInput,
          album: albumInput,
          likes: 0,
          releaseYear: releaseYearInput,
          genre: genreInput,
          image: albumImgUrl
        })
      })
      .then(resp => resp.json())
      .then(() => { displaySongDetails(titleInput) })
      .catch(error => alert(error))
    addSongForm.reset();
  })
}
//Call functions
addSongEventListener();

//! ZACH'S CODE

// add functionality to display song details

async function displaySongDetails(name){
    // attach song details
    let response = await fetch(URL)
    let songsArray = await response.json()
    console.log(name)
    let song = songsArray.find(x => x.song === name)
    console.log(song)

    songDetailName.textContent = song.song
    songDetailArtist.textContent = `Artist: ${song.artist}`
    songDetailAlbum.textContent = `Album: ${song.album}`
    songDetailReleaseYear.textContent = `Release year: ${song.releaseYear}`
    songDetailGenre.textContent = `Genre: ${song.genre}`
    songDetailAlbumArt.src = song.image
 
}

// like button functionality

// color changing thing

// hover effect