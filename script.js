const selectGenreEl = document.getElementById("select-genre");
const genreEl = document.querySelectorAll(".genre");
const filteredSongsContainer = document.getElementById("filtered-songs");
const albumCover = document.getElementById("album-cover");
const currentSongTitle = document.getElementById("title");
const currentSongArtist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalDuration = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const newPlaylistNameInput = document.getElementById("playlist-input");
const newPlaylistNameBtn = document.getElementById("submit-button");
const allPlayListEl = document.getElementById("all-playlist");
const currentPlaylistEl = document.getElementById("current-playlist");
const addToPlaylistBtn = document.getElementById("add-to-playlist");
const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const footer = document.getElementById("footer");

// Music
const songs = [
  {
    name: "runway-1",
    displayName: "Runway",
    artist: "ASHAMALUEVMUSIC",
    genre: "Pop",
  },
  {
    name: "fury-2",
    displayName: "Fury",
    artist: "ASHAMALUEVMUSIC",
    genre: "Rock",
  },
  {
    name: "christmas-3",
    displayName: "Christmas Rock",
    artist: "ASHAMALUEVMUSIC",
    genre: "Rock",
  },
  {
    name: "among-the-clouds-4",
    displayName: "Among The Clouds",
    artist: "ASHAMALUEVMUSIC",
    genre: "Electronic",
  },
];

// Array to keep track of added genres
const addedGenres = [];

// Adding a special option for all genres
selectGenreEl.innerHTML +=
  '<option value="all" class="genre">All Songs</option>';

// Populating the genre dropdown
songs.forEach((song) => {
  // Check if the genre is already added
  if (!addedGenres.includes(song.genre)) {
    const optionEl = document.createElement("option");
    optionEl.textContent = song.genre;
    optionEl.setAttribute("value", song.genre.toLowerCase());
    selectGenreEl.appendChild(optionEl);
    // Add genre to the array of added genres
    addedGenres.push(song.genre);
    optionEl.classList.add("genre");
  }
});

// Function to load all songs
function loadAllSongs() {
  displayFilteredSongs(songs);
}

// Function to display filtered songs
function displayFilteredSongs(filteredSongs) {
  // Clear existing content
  filteredSongsContainer.innerHTML = "";

  // Display each song in filteredSongs
  filteredSongs.forEach((song, index) => {
    const songContainer = document.createElement("div");
    songContainer.classList.add("song-container");
    const songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.innerHTML = `
      <h3>${song.displayName}</h3>
      <p>${song.artist}</p>
    `;

    const singleSongContainer = document.querySelectorAll(".song-container");

    // Add click event listener to play the song
    songContainer.addEventListener("click", () => {
      // Load and play the clicked song
      // Update songIndex based on filteredSongs
      songIndex = songs.findIndex((s) => s.name === song.name);
      loadSong(songs[songIndex]);
      playSong();
    });

    filteredSongsContainer.appendChild(songContainer);
    songContainer.appendChild(songElement);
  });
}

// Function to filter songs based on genre
function filterSongsByGenre(genre) {
  const filteredSongs =
    genre === "all"
      ? songs
      : songs.filter((song) => song.genre.toLowerCase() === genre);
  displayFilteredSongs(filteredSongs);
}

// Check if Playing a song
let isPlaying = false;

// Play Song
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause event listener

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update the DOM with songs
function loadSong(song) {
  currentSongTitle.textContent = song.displayName;
  currentSongArtist.textContent = song.artist;
  music.src = `music1/${song.name}.mp3`;
  albumCover.src = `images/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Load song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    // Calculate display for the current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    // Calculate display for the  duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching the duration element to avoid NaN
    if (durationSeconds) {
      totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
  }
}

// Set Progress Bar
function setProgressBar(event) {
  const width = this.clientWidth;
  const pointOfClick = event.offsetX;
  const { duration } = music;
  const moveToPosition = Math.round((pointOfClick / width) * duration);
  music.currentTime = moveToPosition;
}

// Add new Playlist to the All Playlist div
function addNewPlaylist(event) {
  // Prevent form submission and page refresh
  event.preventDefault();

  let name = newPlaylistNameInput.value.trim();
  if (name === "") {
    return;
  }
  const newPlaylist = document.createElement("div");
  newPlaylist.classList.add("playlist");

  // Create the <p> element for playlist name
  const pElement = document.createElement("p");
  pElement.textContent = name;
  newPlaylist.appendChild(pElement);

  // Create the <i> element for the icon
  const iconElement = document.createElement("i");
  iconElement.classList.add("fas", "fa-xmark", "delete-playlist");
  newPlaylist.appendChild(iconElement);

  // Append newPlaylist to allPlayListEl
  allPlayListEl.appendChild(newPlaylist);
  // Clear input field
  newPlaylistNameInput.value = "";
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
selectGenreEl.addEventListener("change", function () {
  const selectedGenre = this.value;
  filterSongsByGenre(selectedGenre);
});
newPlaylistNameBtn.addEventListener("click", addNewPlaylist);
allPlayListEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-playlist")) {
    event.target.parentElement.remove();
  }
});

// Initial load of all songs
loadAllSongs();

const playlistSongsMap = new Map();

// Function to play the selected song
const playSelectedSong = (song) => {
  songIndex = songs.findIndex((s) => s.name === song.name);
  loadSong(songs[songIndex]);
  playSong();
};

// Function to handle playlist click
const handlePlaylistClick = (event) => {
  playlistDivs = document.querySelectorAll(".playlist");
  const clickedEl = event.target;

  if (clickedEl.classList.contains("playlist")) {
    if (!clickedEl.classList.contains("active")) {
      deactivateAllPlaylists();
      activatePlaylist(clickedEl);
      showPlaylistSongs(clickedEl);
    }
  }
};

// Function to deactivate all playlists
const deactivateAllPlaylists = () => {
  playlistDivs.forEach((div) => div.classList.remove("active"));
};

// Function to activate the selected playlist
const activatePlaylist = (playlist) => {
  playlist.classList.add("active");
};

// Function to display songs in the selected playlist
const showPlaylistSongs = (playlist) => {
  const playlistContainer = document.getElementById("current-playlist");
  playlistContainer.innerHTML = "<h3>Current Playlist</h3>";

  const songs = playlistSongsMap.get(playlist) || [];
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("playlist");
    songDiv.innerHTML = `<h3>${song.displayName}</h3>`;

    // Add delete icon
    const iconElement = document.createElement("i");
    iconElement.classList.add("fas", "fa-xmark", "delete-song");
    songDiv.appendChild(iconElement);

    // Add click event to play the song
    songDiv.addEventListener("click", (event) => {
      if (!event.target.classList.contains("delete-song")) {
        playSelectedSong(song);
      }
    });

    // Add click event to delete the song
    iconElement.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the parent click event from firing
      removeSongFromPlaylist(song, playlist);
      songDiv.remove();
    });

    playlistContainer.appendChild(songDiv);
  });
};

// Function to remove a song from the specified playlist
const removeSongFromPlaylist = (song, playlist) => {
  const playlistSongs = playlistSongsMap.get(playlist) || [];
  const updatedSongs = playlistSongs.filter((s) => s.name !== song.name);
  playlistSongsMap.set(playlist, updatedSongs);
};

// Function to add the current song to the active playlist
const addToActivePlaylist = () => {
  playlistDivs = document.querySelectorAll(".playlist");
  const activePlaylist = Array.from(playlistDivs).find((div) =>
    div.classList.contains("active")
  );

  if (!activePlaylist) {
    alert("Please select a playlist before adding songs.");
    return;
  }

  addSongToPlaylist(activePlaylist);
};

// Function to add the current song to the specified playlist
const addSongToPlaylist = (playlist) => {
  const currentSong = songs[songIndex];
  const playlistSongs = playlistSongsMap.get(playlist) || [];

  if (playlistSongs.find((song) => song.name === currentSong.name)) {
    alert("This song is already in the playlist.");
    return;
  }

  playlistSongs.push(currentSong);
  playlistSongsMap.set(playlist, playlistSongs);
  showPlaylistSongs(playlist);
};

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  playlistDivs = document.querySelectorAll(".playlist");

  // Event listeners
  allPlayListEl.addEventListener("click", handlePlaylistClick);
  addToPlaylistBtn.addEventListener("click", addToActivePlaylist);
});

// Toggle Dark/Light Mode
// Theme constants
const darkTheme = "dark";
const lightTheme = "light";

// Apply styles based on the theme
function setStyle(theme) {
  const isDark = theme === darkTheme;
  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  footer.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";

  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
  toggleIcon.children[1].classList.replace(
    isDark ? "fa-sun" : "fa-moon",
    isDark ? "fa-moon" : "fa-sun"
  );
}

// Switch theme based on the toggle switch state
function switchTheme(event) {
  const theme = event.target.checked ? darkTheme : lightTheme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  setStyle(theme);
}

// Add event listener for theme toggle switch
toggleSwitch.addEventListener("change", switchTheme);

// Check local storage for the current theme and apply it
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  const theme = currentTheme === darkTheme ? darkTheme : lightTheme;
  document.documentElement.setAttribute("data-theme", theme);
  toggleSwitch.checked = theme === darkTheme;
  setStyle(theme);
}

// Footer navigation to change containers for mobile devices
const containers = {
  genreContainerElement: document.querySelector(".genre-container"),
  playerContainerElement: document.querySelector(".player-container"),
  playlistContainerElement: document.querySelector(".playlist-container"),
};

const buttons = {
  activateGenreContainer: document.getElementById("genre-container-slide"),
  activatePlayerContainer: document.getElementById("player-container-slide"),
  activatePlaylistContainer: document.getElementById(
    "playlist-container-slide"
  ),
};

function showContainer(containerToShow) {
  Object.keys(containers).forEach((key) => {
    const container = containers[key];
    container.style.display = "none";
    if (key === containerToShow) {
      container.style.display = "flex";
    }
  });
}

buttons.activateGenreContainer.addEventListener("click", () =>
  showContainer("genreContainerElement")
);
buttons.activatePlayerContainer.addEventListener("click", () =>
  showContainer("playerContainerElement")
);
buttons.activatePlaylistContainer.addEventListener("click", () =>
  showContainer("playlistContainerElement")
);
