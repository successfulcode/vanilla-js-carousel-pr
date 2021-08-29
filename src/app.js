import './styles/app';
import axios from 'axios';
import Title from './components/Title';
import Spinner from './components/Spinner';
import CasinoItem from './components/CasinoItem';
import ErrorMessage from './components/ErrorMessage';
import Slots from './components/Slots';
import Bonuses from './components/Bonuses';

const appItem = document.getElementById('app');
const carouselArea = appItem.querySelector('.carousel');
const titleItem = appItem.querySelector('.title');
const incrementButton = appItem.querySelector('.increment-button');
const decrementButton = appItem.querySelector('.decrement-button');
const casinosNavButton = appItem.querySelector('.navigation__block-casinos');
const bonusesNavButton = appItem.querySelector('.navigation__block-bonuses');
const slotsNavButton = appItem.querySelector('.navigation__block-slots');
const counterLink = document.querySelector('.counter-link');

const CASINO_ITEMS_PER_PAGE_LENGTH = 5;

let casinos = [];

let firstIndex = 0;
let lastIndex = firstIndex + CASINO_ITEMS_PER_PAGE_LENGTH;

const displayTitle = () => {
  titleItem.innerHTML = Title();
};

const displayError = () => {
  carouselArea.innerHTML = ErrorMessage();
};

const displayLoading = () => {
  incrementButton.style.display = 'none';
  decrementButton.style.display = 'none';

  carouselArea.innerHTML = Spinner();
};

const switchButton = (button, hide = false) => {
  if (!hide) {
    button.style.display = 'none';
  } else {
    button.style.display = 'block';
  }
};

const displayIncrementButton = () => {
  if (
    firstIndex + CASINO_ITEMS_PER_PAGE_LENGTH === casinos.length ||
    casinos.length == 0
  ) {
    switchButton(incrementButton, false);
  } else {
    switchButton(incrementButton, true);
  }
};

const displayDecrementButton = () => {
  if (firstIndex === 0 || casinos.length <= 0) {
    switchButton(decrementButton, false);
  } else {
    switchButton(decrementButton, true);
  }
};

const removeDisplayAllCasinosMode = () => {
  carouselArea.classList.remove('casino__show-all');
};

const displayCasinos = (casinosItems) => {
  removeDisplayAllCasinosMode();
  const casinosHtml = casinosItems
    .map((casino) => {
      return CasinoItem(
        casino.background_color,
        casino.logo,
        casino.rating,
        casino.title,
        casino.url
      );
    })
    .join('');

  carouselArea.innerHTML = casinosHtml;
  counterLink.innerHTML = `<span>Show all(${casinos.length})</span>`;
  displayIncrementButton();
  displayDecrementButton();
};

const displayAllcasinos = () => {
  displayCasinos(casinos);

  switchButton(incrementButton, false);
  switchButton(decrementButton, false);
  carouselArea.classList.add('casino__show-all');
  counterLink.innerHTML = '';
};

const setCasinos = (data) => {
  casinos = data;
};

const moveCarousel = (condition) => {
  if (condition) {
    displayCasinos(casinos.slice(firstIndex, lastIndex));
  }

  displayIncrementButton();
};

const setLastIndex = () => {
  lastIndex = firstIndex + CASINO_ITEMS_PER_PAGE_LENGTH;
};

const increment = () => {
  const condition = firstIndex + CASINO_ITEMS_PER_PAGE_LENGTH < casinos.length;
  if (condition) {
    firstIndex++;
    setLastIndex();
  }

  moveCarousel(condition);
};

const decrement = () => {
  const condition = firstIndex > 0;
  if (condition) {
    firstIndex--;
    setLastIndex();
  }

  moveCarousel(condition);
};

incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);

const toggleCasinosNavigation = () => {
  casinosNavButton.classList.add('navigation__block-item--active');
  slotsNavButton.classList.remove('navigation__block-item--active');
  bonusesNavButton.classList.remove('navigation__block-item--active');

  if (casinos.length > 0) {
    displayCasinos(casinos.slice(0, CASINO_ITEMS_PER_PAGE_LENGTH));
  } else {
    displayError();
  }
};

const toggleBonusesNavigation = () => {
  bonusesNavButton.classList.add('navigation__block-item--active');
  casinosNavButton.classList.remove('navigation__block-item--active');
  slotsNavButton.classList.remove('navigation__block-item--active');

  carouselArea.innerHTML = Bonuses();
  counterLink.innerHTML = '';
  removeDisplayAllCasinosMode();
  switchButton(incrementButton, false);
  switchButton(decrementButton, false);
};

const toggleSlotsNavigation = () => {
  slotsNavButton.classList.add('navigation__block-item--active');
  casinosNavButton.classList.remove('navigation__block-item--active');
  bonusesNavButton.classList.remove('navigation__block-item--active');

  carouselArea.innerHTML = Slots();
  counterLink.innerHTML = '';
  removeDisplayAllCasinosMode();
  switchButton(incrementButton, false);
  switchButton(decrementButton, false);
};

casinosNavButton.addEventListener('click', toggleCasinosNavigation);
bonusesNavButton.addEventListener('click', toggleBonusesNavigation);
slotsNavButton.addEventListener('click', toggleSlotsNavigation);
counterLink.addEventListener('click', displayAllcasinos);

const fetchCasinos = async () => {
  try {
    displayLoading();

    const { data, status } = await axios.get(
      'https://retoolapi.dev/RrRljN/casinos'
    );

    if (data && status === 200) {
      setCasinos(data);
      displayCasinos(data.slice(0, CASINO_ITEMS_PER_PAGE_LENGTH));
    } else {
      throw new Error('Could not fetch casinos');
    }
  } catch (error) {
    console.log(error);

    displayError();
  }
};

const app = async () => {
  displayTitle();

  await fetchCasinos();
};

app();
