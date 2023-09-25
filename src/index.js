// GLOBAL VARIABLES
const URL = "http://localhost:3000/songs"
const songDisplayCards = document.querySelector('#card-container')
const addSongForm = document.querySelector('#submit-new-song')
const refreshButton = document.querySelector('#refresh-button')

//! WESLEY'S CODE
const fetchSongs = () => {
    fetch(URL)
    .then(response => response.json())
    .then(songsArray => displayRandomSongs(songsArray))
    .catch(error => alert(error))
}

const renderSongCard = (song) => {
    const songImage = document.createElement("img")
    songImage.src = song.image
    songImage.alt = song.song
    // Append created elements to the targeted card-container element
    songDisplayCards.append(songImage)
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
    // Create a Bootstrap row
    const row = document.createElement('div');
    row.className = 'row';
    songDisplayCards.appendChild(row)
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
      .then(newSongObj => console.log(newSongObj))
      .catch(error => alert(error))
    addSongForm.reset();
  })
}
//Call functions
addSongEventListener();

//! ZACH'S CODE