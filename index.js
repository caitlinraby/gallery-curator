//Grab Search Form (where user will search by keyword) & Save as a Variable
const searchForm = document.querySelector("input#search-by-keyword")


//save user's input value from the search form (so it can be used to fetch related objects)
const searchedKeyWord = searchForm.value


//add event listener to search form, so that when it is submitted a function executes showing the search results
searchForm.addEventListener('submit', fetchObjectsByKeyword);





//callback function from event listener on the searchForm above. To fetch the search results:
function fetchObjectsByKeyword(e) {
    //prevent page from reloading when form is submitted
    e.preventDefault();


    //fetch list of objects returned by a search for this keyword in the API:
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=s${searchedKeyWord}`)
    .then(results => results.json())
    // .then(data => displaySearchResults(data));
    .then(data => console.log(data));
}


//callback function in fetch request from the above function^
function displaySearchResults(data){
    data.forEach(object => displayObjectImage(object))
}

//callback function for above function. Needs to display the images from the objects within the 
//  search results on the page.
function displayObjectImages(object){
    const galleryList = document.querySelector("#gallery-list")
    const imgURL = object.primaryImage;
    const addDiv = document.createElement('div');
    addDiv.innerHTML = `<img src=${imageURL}></img>`
    galleryList.append(addDiv);
}







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