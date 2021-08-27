import './styles/app';
import axios from 'axios';
import Title from './components/Title';
import Spinner from './components/Spinner';
import CasinosItem from './components/CasinosItem';
import ErrorMessage from './components/ErrorMessage';
// import Navigation from './components/Navigation';

const appItem = document.getElementById('app');
const carouselArea = appItem.querySelector('.carousel');
const titleItem = appItem.querySelector('.title');
const incrementButton = appItem.querySelector('.increment-button');
const decrementButton = appItem.querySelector('.decrement-button');
const casinosNavButton = appItem.querySelector('.navigation__block-casinos');
const bonusesNavButton = appItem.querySelector('.navigation__block-bonuses');
const slotsNavButton = appItem.querySelector('.navigation__block-slots');

let casinos = [];
let casinosInHtml;
const itemsPerPage = 5;
let firstIndex = 0;
let lastIndex = firstIndex + itemsPerPage;

const setCasinos = (data) => {
  casinos = data;
};

const setCasinosInHtml = (casinos) => {
  casinosInHtml = casinos;
};

const showItems = (firstIndex = 0, lastIndex = 5) => {
  const template = casinos
    .slice(firstIndex, lastIndex)
    .map((casino) => {
      return CasinosItem(
        casino.background_color,
        casino.logo,
        casino.rating,
        casino.title,
        casino.url
      );
    })
    .join('');
  setCasinosInHtml(template);
  if (firstIndex === 0 || casinos.length <= 0) {
    decrementButton.style.display = 'none';
  } else {
    decrementButton.style.display = 'block';
  }
  if (firstIndex + itemsPerPage === casinos.length || casinos.length == 0) {
    incrementButton.style.display = 'none';
  } else {
    incrementButton.style.display = 'block';
  }
};

const showLastIndex = () => {
  lastIndex = firstIndex + itemsPerPage;
};

const increment = () => {
  if (firstIndex + itemsPerPage < casinos.length) {
    incrementButton.style.display = 'block';
    firstIndex++;
    showLastIndex();
    showItems(firstIndex, lastIndex);
    carouselArea.innerHTML = casinosInHtml;
  }
};

const decrement = () => {
  if (firstIndex > 0) {
    decrementButton.style.display = 'block';
    firstIndex--;
    showLastIndex();
    showItems(firstIndex, lastIndex);
    carouselArea.innerHTML = casinosInHtml;
  }
};

incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);

const toggleCasinoNavigation = () => {
  casinosNavButton.classList.add('navigation__block-item--active');
  slotsNavButton.classList.remove('navigation__block-item--active');
  bonusesNavButton.classList.remove('navigation__block-item--active');
  carouselArea.innerHTML = casinosInHtml;
  incrementButton.style.display = 'block';
  decrementButton.style.display = 'block';
};
const toggleBonusesNavigation = () => {
  bonusesNavButton.classList.add('navigation__block-item--active');
  casinosNavButton.classList.remove('navigation__block-item--active');
  slotsNavButton.classList.remove('navigation__block-item--active');
  carouselArea.innerHTML = `<h1>Bonuses</h1>`;
  incrementButton.style.display = 'none';
  decrementButton.style.display = 'none';
};
const toggleSlotsNavigation = () => {
  slotsNavButton.classList.add('navigation__block-item--active');
  casinosNavButton.classList.remove('navigation__block-item--active');
  bonusesNavButton.classList.remove('navigation__block-item--active');
  carouselArea.innerHTML = `<h1>Slots</h1>`;
  incrementButton.style.display = 'none';
  decrementButton.style.display = 'none';
};

casinosNavButton.addEventListener('click', toggleCasinoNavigation);
bonusesNavButton.addEventListener('click', toggleBonusesNavigation);
slotsNavButton.addEventListener('click', toggleSlotsNavigation);

const getCasinos = async () => {
  try {
    const { data, status } = await axios.get(
      'https://retoolapi.dev/RrRljN/casinos'
    );
    if (data && status === 200) {
      setCasinos(data);
      showItems();
      carouselArea.innerHTML = casinosInHtml;
    }
  } catch (error) {
    carouselWraper.innerHTML = ErrorMessage();
    console.log(error);
  }
};

const app = async () => {
  titleItem.innerHTML = Title();
  incrementButton.style.display = 'none';
  decrementButton.style.display = 'none';
  carouselArea.innerHTML = Spinner();
  await getCasinos();
};

app();
