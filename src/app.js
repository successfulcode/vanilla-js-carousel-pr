import './styles/app';
import Title from './components/Title';
import Spinner from './components/Spinner';
import CasinosItem from './components/CasinosItem';
import axios from 'axios';
import ErrorMessage from './components/ErrorMessage';

const appItem = document.getElementById('app');
const carouselArea = appItem.querySelector('.carousel');
const titleItem = appItem.querySelector('.title');
const incrementButton = appItem.querySelector('.increment-button');
const decrementButton = appItem.querySelector('.decrement-button');

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
