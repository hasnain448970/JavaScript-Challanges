// Selecting DOM elements
let songItems = document.querySelectorAll(".song-item");
let songIndex = 0;
let audioElement = new Audio(`song01.mp3`);
let pauseBtn = document.querySelector(".bottom i.pauseBtn");
const next = document.querySelector("i.next");
const previous = document.querySelector("i.previous");
let progressBar = document.querySelector("input.progress-bar");
let gif = document.querySelector(".bottom img");
let song_info = document.querySelector("span.playing-song");

// Array of song information
let songs = [
  { id: 0, filePath: "songs/1.mp3", cover: "covers/1.jpg", title: "tu ha to mujh or kia chaiye" },
  {id:1,filePath:"songs/2.mp3",cover:"covers/2.jpg" , title:"tum saath ho"},
  {id:2,filePath:"songs/3.mp3",cover:"covers/3.jpg",  title:"ay zindagi to bta"},
  {id:3,filePath:"songs/4.mp3",cover:"covers/4.jpg" , title:"jag ghomiyan thare jaisa na koi"},
  {id:3,filePath:"songs/5.mp3",cover:"covers/5.jpg" , title:"ma jahan rahoon"},
  {id:3,filePath:"songs/6.mp3",cover:"covers/6.jpg" , title:"tu rang sharbatoon ka"},
  {id:3,filePath:"songs/7.mp3",cover:"covers/7.jpg" , title:"na jeen tera sang"},
  {id:3,filePath:"songs/8.mp3",cover:"covers/8.jpg" , title:"dil ka arman ansoon ma bha gay"},
  {id:3,filePath:"songs/9.mp3",cover:"covers/9.jpg" , title:"gulabi ankhoon na maar dala"},
  {id:3,filePath:"songs/10.mp3",cover:"covers/10.jpg" , title:"shab-e-gham poori nahi hoti"}

];

// Creating audio objects for each song
let audioElements = songs.map((song) => new Audio(song.filePath));

// Load songs
songItems.forEach((song, i) => {
  song.querySelector("img").src = songs[i].cover;
  song.querySelector(".song-info").innerHTML = songs[i].title;
  song.querySelector("i.masterPlay").dataset.id = songs[i].id;
  song.querySelector("span.time-stamp").dataset.set = songs[i].id;
});

// Listening to click events on play buttons
document.querySelectorAll("i.masterPlay").forEach((playBtn) => {
  playBtn.addEventListener("click", playOrPauseSong);
});

// Function to play or pause a song
function playOrPauseSong(e) {
  songIndex = parseInt(e.target.dataset.id);
  audioElement = audioElements[songIndex];

  if (!audioElement.paused && audioElement.currentTime > 0) {
    // Pausing the audio
    audioElement.pause();
    e.target.classList.add("fa-play");
    e.target.classList.remove("fa-pause");
    pauseBtn.classList.add("fa-circle-play");
    pauseBtn.classList.remove("fa-pause");
    gif.classList.remove("show");
  } else {
    // Playing the audio
    makeAllPlay();
    audioElement.play();
    audioElement.addEventListener("timeupdate", updateSeekbar);
    e.target.classList.add("fa-pause");
    e.target.classList.remove("fa-play");
    pauseBtn.classList.add("fa-pause");
    pauseBtn.classList.remove("fa-circle-play");
    gif.classList.add("show");
    song_info.innerHTML = songs[songIndex].title;
  }
}

// Function to make all play buttons show "play" icon
function makeAllPlay() {
  document.querySelectorAll("i.masterPlay").forEach((playBtn) => {
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause");
  });
}

// Updating time stamp display
setInterval(() => {
  document.querySelector(`span[data-set="${songIndex}"]`).innerHTML = formatTime(audioElement.currentTime);
}, 1000);

// Function to format time in "min:sec" format
function formatTime(current_time) {
  let min = Math.floor(current_time / 60);
  let remainingSeconds = Math.floor(current_time % 60);
  if (min > 0) return `${min}:${remainingSeconds}`;
  return `0:${Math.floor(current_time)}`;
}

// Handling click on play/pause button in the bottom bar
pauseBtn.addEventListener("click", () => {
  audioElement = audioElements[songIndex];
  if (!audioElement.paused && audioElement.currentTime > 0) {
    // Pausing the audio
    audioElement.pause();
    pauseBtn.classList.add("fa-circle-play");
    pauseBtn.classList.remove("fa-pause");
    document.querySelector(`i[data-id="${songIndex}"]`).classList.add("fa-play");
    document.querySelector(`i[data-id="${songIndex}"]`).classList.remove("fa-pause");
    gif.classList.remove("show");
  } else {
    // Playing the audio
    makeAllPlay();
    audioElement.play();
    audioElement.addEventListener("timeupdate", updateSeekbar);
    pauseBtn.classList.add("fa-pause");
    pauseBtn.classList.remove("fa-circle-play");
    document.querySelector(`i[data-id="${songIndex}"]`).classList.remove("fa-play");
    document.querySelector(`i[data-id="${songIndex}"]`).classList.add("fa-pause");
    gif.classList.add("show");
    song_info.innerHTML = songs[songIndex].title;
  }
});

// Function to play audio
function playAudio() {
  audioElement = audioElements[songIndex];
  audioElement.currentTime = 0;
  makeAllPlay();
  audioElement.play();
  document.querySelector(`i[data-id="${songIndex}"]`).classList.remove("fa-play");
  document.querySelector(`i[data-id="${songIndex}"]`).classList.add("fa-pause");
  pauseBtn.classList.add("fa-pause");
  pauseBtn.classList.remove("fa-circle-play");
  audioElement.addEventListener("timeupdate", updateSeekbar);
  gif.classList.add("show");
  song_info.innerHTML = songs[songIndex].title;
}

// Event listeners for next and previous buttons
next.addEventListener("click", () => {
  songIndex < 9 ? songIndex++ : (songIndex = 0);
  playAudio();
});

previous.addEventListener("click", () => {
  songIndex > 0 ? songIndex-- : songIndex;
  playAudio();
});

// Function to update the seekbar
function updateSeekbar() {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  progressBar.value = progress;
}

// Event listener for changes in the progress bar
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});
