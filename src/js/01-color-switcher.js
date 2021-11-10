const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
}


TIME_DURATION = 1000;


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

let timerId = null;

function changeFonOnClick() {
    if(timerId) return
    timerId = setInterval(() =>{
        refs.body.style.backgroundColor = getRandomHexColor()
    },TIME_DURATION)
}

function stopChangeColorOnClick() {
    clearInterval(timerId)
    timerId = null;
}

refs.btnStart.addEventListener('click', changeFonOnClick)
refs.btnStop.addEventListener('click', stopChangeColorOnClick)
