// GLOBAL VARIABLES
const URL = "http://localhost:3000/songs"
const songDisplayCards = document.querySelector('#card-container')
const addSongForm = document.querySelector('#submit-new-song')
const refreshButton = document.querySelector('#refresh-button')
const dropdown = document.querySelector('#genreDropdown')


// song detail modal nodes
const songDetailName = document.querySelector('#songDetailName')
const songDetailArtist = document.querySelector('#songDetailArtist')
const songDetailAlbum = document.querySelector('#songDetailAlbum')
const songDetailReleaseYear = document.querySelector('#songDetailReleaseYear')
const songDetailGenre = document.querySelector('#songDetailGenre')
const songDetailAlbumArt = document.querySelector('#songDetailAlbumArt')

//! WESLEY'S CODE
//function to change hover effect based on genre
const genreColorChange = (element, songObj) => {
  element.addEventListener('mouseover', () => {

    switch (songObj.genre) {
    case "House":
      element.classList.add('card-glow-house')
      break;
    case "Pop":
      element.classList.add('card-glow-pop')
      break;
    case "Dubstep":
      element.classList.add('card-glow-dubstep')
      break;
    case "Rock":
      element.classList.add('card-glow-rock')
      break;
    case "Metal":
      element.classList.add('card-glow-metal')
      break;
    case "Crunk":
      element.classList.add('card-glow-crunk')
      break;
    case "Alternative":
      element.classList.add('card-glow-alternative')
      break;
    case "K-Pop":
      element.classList.add('card-glow-kpop')
      break;
    case "Original Score":
      element.classList.add('card-glow-originalscore')
      break;
    default:
      console.log('New genre added')
  }
  })

}

const renderSongCard = (song) => {
  let div1 = document.createElement('div')
    div1.className = "col-md-4"
  let div2 = document.createElement('div')
    div2.className = "card"

  let img = document.createElement('img')
    img.className = "card-img-top"
    img.src = song.image
    img.alt = song.song
  let divBody = document.createElement('div')
    divBody.className = "card-body"

  let h5 = document.createElement('h5')
    h5.className = "card-title d-inline-block"
    h5.textContent = song.song
  let p = document.createElement('p')
    p.className = "card-text"
  p.innerHTML =
      `Artist: ${ song.artist } <br>
      <span class="album-text d-inline-block">Album: ${song.album} <br>`

    let heartButton = document.createElement('button')
    heartButton.className = "btn btn-outline-danger btn-block"
    heartButton.id = "like-btn"
      let i = document.createElement('i')
      i.className = "far fa-heart"
      heartButton.appendChild(i)

    divBody.append(h5, p)
    divBody.innerHTML += `<button data-name="${song.song}" class="btn btn-primary details btn-block" data-toggle="modal" data-target="#songDetailModal">Details</button>`
    divBody.append(heartButton)

    div2.append(img, divBody)
    div1.append(div2)
    songDisplayCards.append(div1)


    // add mouseover event listener
    genreColorChange(div2, song)

    div2.addEventListener('mouseout', () => {
      div2.classList = "card" //reset classList to card
    })


    clickHeart(heartButton, song);
}

//function to add event listener on details button
const detailEventListener = () => {
  document.querySelectorAll('.details').forEach((element) => {
    element.addEventListener('click', (event) => {
      displaySongDetails(event.target.dataset.name)
    })
  })
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
    detailEventListener();
}

const fetchSongs = () => {
    fetch(URL)
    .then(response => response.json())
    .then(songsArray => displayRandomSongs(songsArray))
    .catch(error => alert(error))
}

//remove all children of element
const clearElement = (element) => {
  let child = element.lastElementChild
  while (child) {
    element.removeChild(child)
    child = element.lastElementChild
  }
}

//reset the dropdown selector
const resetDropdown = () => {
  dropdown.disabled = false
  dropdown.value = dropdown.options[0].value
}
//refresh button event listener
  const refreshSongs = () => {
    refreshButton.addEventListener('click', () => {
      clearElement(songDisplayCards)
      fetchSongs()
      resetDropdown();
    })
  }

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

//patch request function
const patchRequest = (operatorString, songObj) => {
  switch (operatorString) {
    case '+':
      fetch(`http://localhost:3000/songs/${songObj.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ likes: songObj.likes += 1 })
      })
        .then(resp => resp.json())
        .then(likeUpdate => console.log(likeUpdate))
        .catch(error => alert(error))
        break;
    case '-':
      fetch(`http://localhost:3000/songs/${songObj.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ likes: songObj.likes - 1 })
      })
        .then(resp => resp.json())
        .then(likeUpdate => console.log(likeUpdate))
        .catch(error => alert(error))
        break;
      default:
        console.log('Add appropriate math expression')
  }
}

//clickHeart function using element targeting
const clickHeart = (element, songObj) => {
  element.addEventListener('click', () => {
    console.log(songObj)
    element.className === "btn btn-outline-danger btn-block" ? element.className = "btn btn-danger btn-block": element.className = "btn btn-outline-danger btn-block"

    if (element.className === "btn btn-danger btn-block") {
      patchRequest('+', songObj)
    }
    else {
      patchRequest('-', songObj)
    }
  })
}

//function to filter by genre
const filterByGenre = (genre) => {
  fetch(URL)
  .then(resp => resp.json())
  .then(songArray => {
    let filteredArray = songArray.filter((songObj) => {
    return songObj.genre === genre
  })
  clearElement(songDisplayCards)
  filteredArray.forEach((songObj) => renderSongCard(songObj))
  detailEventListener();
  })
  .catch(error => alert(error))
}

//dropdown event listener function
const selectDropdown = () => {
  dropdown.addEventListener('change', (event) => {
    let genreValue = event.target.value
    filterByGenre(genreValue)
  })
}
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

//Calling Functions
fetchSongs()
refreshSongs()
addSongEventListener();
selectDropdown();
