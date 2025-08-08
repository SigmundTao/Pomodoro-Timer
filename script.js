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
const pauseBtn = document.getElementById('pause-btn');
const timerTypeTitle = document.getElementById('timer-type-title');
const saveBtn = document.getElementById('save-settings-btn');
const pomodoroLengthSetting = document.getElementById('pomodoro-length-setting');
const shortBreakLengthSetting = document.getElementById('short-break-length-setting');
const longBreakLengthSetting = document.getElementById('long-break-length-setting');
const themeSelect = document.getElementById('theme-select');
const playBtn = document.getElementById('play-btn');
const endBtn = document.getElementById('end-btn');
const closeTaskListBtn = document.getElementById('close-tasks-btn');
const pomodoroRepeatSettting = document.getElementById('pomodoro-repeat-select');
const alarmAudio = document.getElementById('alarm');

document.addEventListener('DOMContentLoaded', () => {
    settingsModal.close();
    updateTimer();
});

const closeTasks = () => {
    taskList.style.display = 'none';
    taskBtn.style.display = 'block';
}

const openTasks = () => {
    taskList.style.display = 'flex';
    taskBtn.style.display = 'none';
}

const saveSettings = () => {
    settings.pomodoro_length = pomodoroLengthSetting.value;
    settings.short_break_length = shortBreakLengthSetting.value;
    settings.long_break_length = longBreakLengthSetting.value;
    settings.theme = themeSelect.value;
    selectPomodoro();
    closeSettings();
}

const openSettings = () => {
    pomodoroLengthSetting.value = settings.pomodoro_length;
    shortBreakLengthSetting.value = settings.short_break_length;
    longBreakLengthSetting.value = settings.long_break_length;
    pomodoroRepeatSettting.value = settings.pomodoroRepeat;
    themeSelect.value = settings.theme;
    settingsModal.showModal();
}

const endPomodoro = () => {
    selectPomodoro();
    startBtn.style.display = 'block';
    endBtn.style.display = 'none';
    playBtn.style.display = 'none';
}

settingsModal.open === undefined ? 'No dialog support' : 'Dialog supported'

const settings = {
    selected_countdown_length : 25,
    pomodoro_length : 25,
    short_break_length : 5,
    long_break_length : 15,
    theme : 'default',
    pomodoroRepeat : 4,
    pomodoroRepeatCount : 0,
}

const updateTimer = () => {
    formatTime(settings.selected_countdown_length * 60);
}

const selectPomodoro = () => {
    if(!isTimerPaused){
        pauseTimer();
        endBtn.style.display = 'none';
        playBtn.style.display = 'none';
        startBtn.style.display = 'block';
    }
    seconds = undefined;
    settings.selected_countdown_length = settings.pomodoro_length;
    timerTypeTitle.innerHTML = `Pomodoro`;
    updateTimer();
}

const selectLongBreak = () => {
    if(!isTimerPaused){
        pauseTimer();
        endBtn.style.display = 'none';
        playBtn.style.display = 'none';
        startBtn.style.display = 'block';
    }
    seconds = undefined;
    settings.selected_countdown_length = settings.long_break_length;
    timerTypeTitle.innerHTML = `Long Break`;
    updateTimer();
}

const selectShortBreak = () => {
    if(!isTimerPaused){
        pauseTimer();
        endBtn.style.display = 'none';
        playBtn.style.display = 'none';
        startBtn.style.display = 'block';
    }
    seconds = undefined;
    settings.selected_countdown_length = settings.short_break_length;
    timerTypeTitle.innerHTML = `Short Break`;
    updateTimer();
}

let isTimerPaused = false;
let seconds;
let intervalId;

const pauseTimer = () => {
    isTimerPaused = true;
    clearInterval(intervalId);
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'inline-block';
    endBtn.style.display = 'inline-block';
}

const countdown = () => {
    isTimerPaused = false;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    playBtn.style.display = 'none';
    endBtn.style.display = 'none';

    if(!seconds){
        seconds = settings.selected_countdown_length * 60;
    }

    intervalId = setInterval(() => {
      if(isTimerPaused){
        clearInterval(intervalId);
        return;
      }
      seconds--;
      formatTime(seconds);

      if(seconds <= 0){
        settings.pomodoroRepeatCount++
        alarmAudio.play();
        clearInterval(intervalId);
        if(timerTypeTitle.innerHTML == `Pomodoro`){
            if(settings.pomodoroRepeatCount === settings.pomodoroRepeat){
                selectLongBreak();
                countdown();
            } else {
                selectShortBreak();
                countdown();
            };
        } else if(timerTypeTitle.innerHTML == `Short Break`){
            selectPomodoro();
            countdown();
        } else if(timerTypeTitle.innerHTML == `Long Break`) {
            selectPomodoro();
            countdown();
            settings.pomodoroRepeatCount = 0;
        }
}
    }, 1000);
}

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60;

    const formattedString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
saveBtn.addEventListener('click', saveSettings);
pauseBtn.addEventListener('click', pauseTimer);
playBtn.addEventListener('click', countdown);
endBtn.addEventListener('click', endPomodoro);
closeTaskListBtn.addEventListener('click', closeTasks);
taskBtn.addEventListener('click', openTasks);