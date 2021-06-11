//Grab Search Form (where user will search by keyword) & Save as a Variable
const searchForm = document.querySelector("#search-form")


//save user's input value from the search form (so it can be used to fetch related objects)
const searchTerm = document.querySelector("input#search-by-keyword")


//add event listener to search form, so that when it is submitted a function executes showing the search results
searchForm.addEventListener('submit', fetchObjectIDsByKeyword);


//callback function from event listener on the searchForm above. To fetch a list/array of Object IDs associated with the searchTerm:
function fetchObjectIDsByKeyword(e) {
    //prevent page from reloading when form is submitted
    e.preventDefault();

    //fetch list of object IDs returned by a search for this keyword in the API:
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm.value}`)
    .then(results => results.json())
    .then(data => displaySearchResults((data)))
};



// //callback function in fetch request from the above function^
function displaySearchResults(data){
    data.objectIDs.slice(0,5).forEach(objectID => fetchImage(objectID));
}

// //callback function for above function. Needs to display the images from the objects in the above results
function fetchImage(objectID) {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    .then(results => results.json())
    .then(data => displayImage(data))
};

const galleryList = document.querySelector("#gallery-list")

function displayImage(data){
    console.log(data)
    const imgURL = data.primaryImage;
    const createImgLi = document.createElement('li')
    createImgLi.innerHTML = `<img src=${imgURL}><button class="like-button"><3</button>`
    galleryList.append(createImgLi);
}

// function displayObjectImages(object){
//     const galleryList = document.querySelector("#gallery-list")
//     const imgURL = object.primaryImage;
//     const addDiv = document.createElement('div');
//     addDiv.innerHTML = `<img src=${imageURL}></img>`
//     galleryList.append(addDiv);
// }







// const objectID = "1668"

// function fetchArt(){
//     fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
//     .then(result => result.json())
//     .then(data => displayFunction(data));
// };



// function displayFunction(data) {
//     const galleryList = document.querySelector("#gallery-list")
//     const displayImageURL = data.primaryImage;
//     const addLi = document.createElement('li');
//     addLi.innerHTML = `<img src=${displayImageURL}></img>`
//     galleryList.append(addLi);
    
// }