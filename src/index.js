import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    listEl: document.querySelector('.country-list'),
    infoEl: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

// trim() ???

function onInputSearch(event) {
    event.preventDefault();
    let searchName = event.target.value;
    if (searchName.length === 0) {
        return;
    }
fetchCountries(searchName)
   .then(countries => renderMarkup(countries))
   .catch(onFetchError)
//    .finally(() => .reset()) ???
}

function onFetchError(error) {
    Notify.failure("Oops, there is no country with that name");
}

function renderMarkup(countries) {
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please, enter a more specific name.');
      return;
    }
    if (countries.length === 1) {
    makeCountryInfoMarkup(countries);
    return;
  } else {
    makeCountryListMarkup(countries);
    }
  }

  function makeCountryListMarkup(countries) {
    const markupList = countries
      .map(el => {
        return `<li class="country-list__item">
          <img src="${el.flags.svg}" alt="${el.name.official}" width="80">
            <h1 class="country-list__item-text">${el.name.official}</h1>
          </li>`;
      }).join('');
    refs.listEl.insertAdjacentHTML('beforeend', markupList);
  }

  function makeCountryInfoMarkup(countries) {
    const markupInfo = countries
      .map(el => {
        return `<div class="country-info__item">
          <img src="${el.flags.svg}" alt="${el.name.official}" width="80">
            <h1 class="country-info__item-text>Official name: ${el.name.official}</h1>
            <li>
            <p>Capital: ${el.capital}</p>
            <p>Population: ${el.population}</p>
            <p>Languages: ${Object.values(el.languages)}</p>
            </li>
          </div>`;
      }).join('');
      refs.infoEl.insertAdjacentHTML('beforeend', markupInfo);
  }
