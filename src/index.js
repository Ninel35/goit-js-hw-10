import { fetchBreeds, fetchCatByBreed } from "./cat-api";
const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');

fetchBreeds()
    .then(resp => resp.json())
    .then((data) => {
        const optionsMarkup = data.map(elem => `<option value="${elem.id}">${elem.name}</option>`).join('');
        select.insertAdjacentHTML("afterbegin", optionsMarkup);
    })
    .catch();

select.addEventListener('change', handlerBreed);
function handlerBreed(evt) {
    fetchCatByBreed(evt.target.value)
        .then(response => response.json())
        .then((data) => {
            const imagesMarkup = data.map(elem => {
                console.log(elem.breeds[0]);
                return `<img src="${elem.url}" width="400" alt="${elem.breeds[0].name}">
                <div class="cat-container">
      <h2>${elem.breeds[0].name}</h2>
      <p class="desc">${elem.breeds[0].description}</p>
      <p>${elem.breeds[0].temperament}</p></div>`
            })
            div.insertAdjacentHTML("afterbegin", imagesMarkup);
        })
        .catch();
}

