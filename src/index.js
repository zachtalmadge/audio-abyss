// GLOBAL VARIABLES
const URL = "http://localhost:3000/songs"
const songDisplayCards = document.querySelector('#card-container')

//! WESLEY'S CODE
const fetchSongs = () => {
    fetch(URL)
    .then(response => response.json())
    .then(songsArray => displayRandomSongs(songsArray))
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
    


fetchSongs()
//! TIANA'S CODE







//! ZACH'S CODE