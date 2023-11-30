import '../scss/main.scss';
import init from './render';

const DEFAULT_LOCATE = 'Saint-Petersburg';
const submitButtonElement = document.querySelector('[data-js-submit-button]');
const inputElement = document.querySelector('[data-js-input]');
init(DEFAULT_LOCATE);

submitButtonElement.addEventListener('click', () => {
  const { value } = inputElement;
  init(value);
});
