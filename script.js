const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const taskBtn = document.getElementById('task-btn');
const taskList = document.getElementById('task-list');
const mainElm = document.getElementById('main-element');
const startBtn = document.getElementById('start-btn');
const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const controlBtnDiv = document.getElementById('ctrl-btn-div');
const timeElement = document.getElementById('timer');

document.addEventListener('DOMContentLoaded', () => {
    settingsModal.close();
});

settingsModal.open === undefined ? 'No dialog support' : 'Dialog supported'

const settings = {
    selected_countdown_length : 25,
    pomodoro_length : 25,
    short_break_length : 5,
    long_break_length : 15,
    theme : 'default'
}

const updateTimer = () => {
    timeElement.innerHTML = settings.selected_countdown_length;
}

const selectPomodoro = () => {
    mainElm.style.backgroundColor = 'gold';
    settings.selected_countdown_length = settings.pomodoro_length;
    updateTimer();
}

const selectLongBreak = () => {
    mainElm.style.backgroundColor = 'red';
    settings.selected_countdown_length = settings.long_break_length;
    updateTimer();
}

const selectShortBreak = () => {
    mainElm.style.backgroundColor = 'blue';
    settings.selected_countdown_length = settings.short_break_length;
    updateTimer();
}

let isTimerPaused = false;
let seconds;
let invervalId;

const pauseTimer = () => {
    isTimerPaused = true;
}

const countdown = () => {
    seconds = settings.selected_countdown_length * 60;

    intervalId = setInterval(() => {
      if(isTimerPaused){
        clearInterval(invervalId);
        return;
      }
      seconds--;
      formatTime(seconds);

      if(seconds <= 0){
        clearInterval(invervalId);
      }
    }, 1000);
}

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60;

    const formattedString = `${minutes}:${seconds}`;
    timeElement.innerHTML = formattedString;
    return;
}

const themes = {
    'default' : {
        background_img : '',
        font_color : '',
        border_color : '',
        background_color : '',
    },
}

const openSettings = () => {
    settingsModal.showModal();
}

const closeSettings = () => {
    settingsModal.close()
}

settingsModal.addEventListener('keydown', key => {
    if (key.key === 'Escape'){
        closeSettings();
    }
})

settingsBtn.addEventListener('click', openSettings);
closeSettingsBtn.addEventListener('click', closeSettings)
startBtn.addEventListener('click', countdown);
shortBreakBtn.addEventListener('click', selectShortBreak);
longBreakBtn.addEventListener('click', selectLongBreak);
pomodoroBtn.addEventListener('click', selectPomodoro);