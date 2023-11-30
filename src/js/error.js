const errorElement = document.querySelector('[data-js-error]');

const showError = () => {
  errorElement.classList.add('show');

  setTimeout(() => {
    errorElement.classList.remove('show');
  }, 3000);
};

export default showError;
