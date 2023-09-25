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


    console.log('clicked')
    addSongForm.reset();
  })
}
//Call functions
addSongEventListener();


//! ZACH'S CODE
