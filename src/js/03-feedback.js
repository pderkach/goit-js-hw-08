import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageTextarea = form.querySelector('[name="message"]');

const LS_KEY = 'feedback-form-state';

const savedFormState = JSON.parse(localStorage.getItem(LS_KEY));
if (savedFormState) {
  emailInput.value = savedFormState.email;
  messageTextarea.value = savedFormState.message;
}

const updateLocalStorage = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(formState));
}, 500);

form.addEventListener('input', updateLocalStorage);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  localStorage.removeItem(LS_KEY);
  emailInput.value = '';
  messageTextarea.value = '';
  console.log('Форму відправлено з такими даними:', {
    email: emailInput.value,
    message: messageTextarea.value,
  });
});
