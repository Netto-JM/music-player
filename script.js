const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progressBarWidth = progressContainer.offsetWidth;
const progress = document.getElementById('progress');
const currentTimeEl =document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
let isPlaying = false;
let songIndex = 0;
let currentTime = 0;
let duration = 0;

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chili Machine',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-3',
    displayName: 'Godnight, Disco Queen',
    artist: 'Jacinto Design'
  },
  {
    name: 'metric-1',
    displayName: 'Front Row Remix',
    artist: 'Metric/Jacinto Design'
  }
];

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

const loadSong = song => {
  image.src = `img/${song.name}.jpg`;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
};

const prevSong = () => {
  songIndex = songIndex === 0 ? songs.length - 1 : --songIndex;
  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex = songIndex === songs.length - 1 ? 0 : ++songIndex;
  loadSong(songs[songIndex]);
  playSong();
};

const calculateDurationDisplay = () => {
  duration = music.duration;
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = (duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : Math.floor(duration % 60);
  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
};

const calculateCurrentDisplay = () => {
  currentTime = music.currentTime;
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = (currentTime % 60) < 10 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60);
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
};

const updateProgressBar = () => {
  const progressPercent = currentTime / duration * 100;
  progress.style.width =`${progressPercent}%`;
};

const setCurrentTime = e => {
  music.currentTime = e.offsetX / progressBarWidth * duration;
};

// Load song to get metadata
music.load();

// Event Listeners
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('loadedmetadata', calculateDurationDisplay);
music.addEventListener('timeupdate', calculateCurrentDisplay);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setCurrentTime);