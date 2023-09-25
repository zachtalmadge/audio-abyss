//global variables (Tiana)
const addSongForm = document.querySelector('#submit-new-song')
//Tiana Code
const addSongEventListener = () => {
  addSongForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log('clicked')
    addSongForm.reset();
  })
}
addSongEventListener();
