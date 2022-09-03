import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";
import { fetchCountries } from './fetchCountries';

// Notify.info("Too many matches found. Please, enter a more specific name.");


const DEBOUNCE_DELAY = 300;
const refs = {
    inputEl: document.querySelector('#search-box'),
}
refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();
    const searchName = refs.inputEl.value;
    
fetchCountries(searchName)
.then(country => {
    console.log(country);})
.catch(onFetchError)
// .finally(() => {
//     .reset();
// })
}

function onFetchError() {
    Notify.failure("Oops, there is no country with that name");
}