import { fetchBreeds, fetchCatByBreed } from "./cat-api";
const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorDisp = document.querySelector('.error');
errorDisp.style.display = "none";
 loader.style.display = "none";

fetchBreeds()
    .then(resp => {
        if (!resp.ok) {
            errorDisp.style.display = "block";
            throw new Error(resp.status);
        }
        return resp.json();
})
    .then((data) => {
   
        const optionsMarkup = data.map(elem => `<option value="${elem.id}">${elem.name}</option>`).join('');
        select.insertAdjacentHTML("afterbegin", optionsMarkup);
    })
    .catch((error) => {
            errorDisp.style.display = "block";
            console.log(error); 
        });

select.addEventListener('change', handlerBreed);
function handlerBreed(evt) {
    loader.style.display = "block";
    fetchCatByBreed(evt.target.value)
        .then(response => {
            if (!response.ok) {
                 errorDisp.style.display = "block";
                 throw new Error(response.status);
            }
            loader.style.display = "none";
            return response.json();
        })
        .then((data) => {
            const imagesMarkup = data.map(elem => {
                return `<img src="${elem.url}" width="400" alt="${elem.breeds[0].name}">
                <div class="cat-container">
      <h2>${elem.breeds[0].name}</h2>
      <p class="desc">${elem.breeds[0].description}</p>
      <p>${elem.breeds[0].temperament}</p></div>`
            })
            div.innerHTML = imagesMarkup;
        })
        .catch(() => {
            errorDisp.style.display = "block";
        });
}

