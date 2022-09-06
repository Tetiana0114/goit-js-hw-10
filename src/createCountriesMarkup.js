export function makeCountryListMarkup(countries) {
    return countries
      .map(country => {
        return `<li class="country-list__item">
          <img src="${country.flags.svg}" alt="${country.name.official}" width="100">
            <h1 class="country-list__item-name">${country.name.common}</h1>
          </li>`;
      }).join('');
  }

export function makeCountryInfoMarkup(countries) {
    return countries
     .map(country => {
      return `<li class="country-info__item"> <img  src="${country.flags.svg}" alt="${country.name.official}" width="300"/>
      <h1 class="country-info__item-name">${country.name.official}</h1>
      <p class="country-info__item-text">Capital: ${country.capital}</p>
      <p class="country-info__item-text">Population: ${country.population}</p>
      <p class="country-info__item-text">Languages: ${Object.values(country.languages)}</p></li>`
    }).join('');
  }