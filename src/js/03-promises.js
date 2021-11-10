import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form')

}

function onClickCreatePromise(e) {
  e.preventDefault()
  const {delay, step, amount} = Object.fromEntries(new FormData(refs.form))

  let selectedDelay = Number(delay)
  let selectedStep = Number(step)
  let selectedAmount = Number(amount)

  for (let i = 1; i <= selectedAmount; i++) {
    createPromise(i, selectedDelay)
    .then(onSuccsesPromise)
    .catch(onFailedPromise)
    selectedDelay += selectedStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    },delay)
  })
}

function onSuccsesPromise({position, delay}) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onFailedPromise({position, delay}) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}


refs.form.addEventListener('submit', onClickCreatePromise)