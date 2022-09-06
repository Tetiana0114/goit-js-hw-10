import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";
import { fetchCountries } from './js/fetchCountries';
import { makeCountryListMarkup, makeCountryInfoMarkup } from './js/createCountriesMarkup';
import getRefs from './js/getRefs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function clearCountriesData() {
  refs.listEl.innerHTML = '';
  refs.infoEl.innerHTML = '';
}

function buildListOnPage(e) {
  const list = makeCountryListMarkup(e);
  refs.listEl.insertAdjacentHTML("beforeend", list);
}

function buildInfoOnPage(e) {
  const info = makeCountryInfoMarkup(e);
  refs.infoEl.insertAdjacentHTML("beforeend", info);
}

function onInputSearch(event) {
  clearCountriesData();
    let searchName = event.target.value.trim();
  if (!searchName) {
    return;
  }
  fetchCountries(searchName)
    .then(el => {
      if (el.length > 10) {
        return countriesLengthCheck();
      }
      if (el.length > 1 && el.length <= 10) {
        clearCountriesData();
        buildListOnPage(el);
      } else {
        clearCountriesData();
        buildInfoOnPage(el);
      }
    })
    .catch(onFetchError);
}

function countriesLengthCheck() {
  return Notify.info('Too many matches found. Please enter a more specific name.');
}

function onFetchError() {
  return Notify.failure("Oops, there is no country with that name");
}