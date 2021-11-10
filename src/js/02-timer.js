import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    btnStartTimer: document.querySelector('[data-start'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.btnStartTimer.setAttribute('disabled', 'true')


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date().getTime();
        const selectedDate = selectedDates[0].getTime();
        selectedDate > currentDate 
            ? disabledInputAndButn()
            : Notiflix.Notify.failure("Please choose a date in the future");
    },
  };

function disabledInputAndButn() {
    refs.btnStartTimer.removeAttribute('disabled')
    refs.inputDate.setAttribute('disabled', 'false')
}
  
const calendar = flatpickr(refs.inputDate, options)

let indexOfInterval = null;
let dataTimeout = null;

function onClickStartBtn() {
        refs.btnStartTimer.setAttribute('disabled', 'true')
        indexOfInterval = setInterval(() => {
        const selectedDate = calendar.selectedDates[0].getTime()
        const currentDate = Date.now()
        dataTimeout = selectedDate - currentDate
            if(dataTimeout < 1000) {
                stopTimer()
            }
        const timer = convertMs(dataTimeout)
        refs.days.textContent = addLeadingZero(timer.days)
        refs.hours.textContent = addLeadingZero(timer.hours)
        refs.minutes.textContent = addLeadingZero(timer.minutes)
        refs.seconds.textContent = addLeadingZero(timer.seconds)
    }, 1000)
}


function stopTimer() {
    clearInterval(indexOfInterval)
    refs.inputDate.removeAttribute('disabled')
}


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
      return value.toString().padStart(2, '0')
  }

  refs.btnStartTimer.addEventListener('click', onClickStartBtn)
