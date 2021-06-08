const button = document.querySelector("#button");

button.addEventListener('click', fetchArt);

const objectID = "1668"

function fetchArt(){
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    .then(result => result.json())
    .then(data => displayFunction(data));
};



function displayFunction(data) {
    const galleryList = document.querySelector("#gallery-list")
    const displayImageURL = data.primaryImage;
    const addLi = document.createElement('li');
    addLi.innerHTML = `<img src=${displayImageURL}></img>`
    galleryList.append(addLi);
    
}