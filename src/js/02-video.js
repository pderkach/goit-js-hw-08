import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerElement = document.getElementById('vimeo-player');

const player = new Player(playerElement);

const STORAGE_KEY = 'videoplayer-current-time';

const savedTime = localStorage.getItem(STORAGE_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime);
}

const updateAndStoreTime = throttle(async () => {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem(STORAGE_KEY, currentTime);
}, 1000); 

player.on('timeupdate', updateAndStoreTime);
