import ErrorImage from '../assets/oops.png';

const ErrorMessage = () => {
  const template = `<div class="error-message">
  <p>Something went wrong...</p>
  <img src="${ErrorImage}" alt="Error" />
  </div>`;
  return template;
};

export default ErrorMessage;
