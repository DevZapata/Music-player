const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuflleButton= document.getElementById('shuffle');
const repeatButton= document.getElementById('repeat');

const fixYou = {
    songName : 'Fix You',
    artist : 'Cold Play',
    file : 'Fix You'

};


const vivaLaVida = {
  songName : 'Viva La Vida',
  artist : 'Cold Play',
  file : 'Viva la Vida'
  

};

const paradise= {
  songName : 'Paradise',
  artist : 'Cold Play',
  file : 'paradise'

};


let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaysList = [ fixYou, vivaLaVida, paradise];
let sortedPlaysList = [...originalPlaysList];
let index = 0;


function playSong(){
    play.querySelector('.fa').classList.remove('fa-circle-play');
    play.querySelector('.fa').classList.add('fa-circle-pause');
    song.play();
    isPlaying = true;

}

function pauseSong(){
  play.querySelector('.fa').classList.add('fa-circle-play');
  play.querySelector('.fa').classList.remove('fa-circle-pause');
  song.pause();
  isPlaying = false;
}

function playPauseDecider (){
    if (isPlaying === true){
      pauseSong();
    }
  else {
      playSong();
  }  


} 

function initializeSong(){
cover.src = `images/${sortedPlaysList[index].file}.jpeg`;
song.src = `songs1/${sortedPlaysList[index].file}.mp3`;
songName.innerText = sortedPlaysList[index].songName; 
bandName.innerText = sortedPlaysList[index].artist;

}

function previousSong(){
  if(index === 0){
    index = sortedPlaysList.length - 1;
  
}
else {
  index -= 1;
}
initializeSong();
playSong();


}

function nextSong(){
    if (index === sortedPlaysList.length -1){
          index =0;
    }
else {
  index += 1;
}
initializeSong();
playSong();

}

function updateProgressBar(){
  const barWidth = (song.currentTime/song.duration)*100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event){
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition/width)* song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
  const size = preShuffleArray.length;
  let currentIndex = size -1;
  while(currentIndex > 0){
    let randomIndex = Math.floor(Math.random()* size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked(){
  if(isShuffled === false){
    isShuffled = true;
    shuffleArray(sortedPlaysList);
    shuflleButton.classList.add('button-active');  
  }
  else {
    isShuffled = false;
    sortedPlaysList = [...originalPlaysList];
    shuflleButton.classList.remove('button-active');
  }
  
}

function repeatButtonClicked() {
  if (repeatOn === false){
    repeatOn = true;
    repeatButton.classList.add('button-active');
  }
  else {
      repeatOn = false;
      repeatButton.classList.remove('button-active');
    }
    
    
}

function nextOrRepeat(){
  if (repeatOn === false) {
    nextSong ();
  }
  else {
    playSong();
  }

}
initializeSong();


play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuflleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
