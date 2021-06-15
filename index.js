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



//callback function in fetch request from the above function (line 21). 
//should display first 20 image results from Met API objects associated with the searched keyword
function displaySearchResults(data){
    data.objectIDs.slice(0,20).forEach(objectID => fetchImage(objectID));
}

// //callback function for above function. Needs to display the images from the objects in the above results
function fetchImage(objectID) {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    .then(results => results.json())
    .then(data => displayImage(data))
};

//save search results container as a variable in order to refer to it in callback function below for displaying results
const searchResultsList = document.querySelector("#search-results-container")

// callback function referenced in above fetch function (line35). Display search result images 
//in search result container, display like button. Add event listener to <3 button.
function displayImage(data){
    // console.log(data)
    const imgURL = data.primaryImage;
    const createImgDiv = document.createElement('div')
    createImgDiv.innerHTML = `<div class="search-results"><img class="image-results" src=${imgURL}></div><div class="like-button-div"><button class="like-button">♥️</button></div>`
    
    createImgDiv.querySelector(".like-button").addEventListener('click', () => saveToGallery(data));
    searchResultsList.append(createImgDiv);
    
    
}

//save gallery container as a variable in order to save liked works there
const galleryGrid = document.querySelector("#gallery-container")

//define function referenced in line 50
//add saved images to the gallery container
//add an "x" delete button next to the work
//attach event listener to delete button so that it functions when clicked (define below)
function saveToGallery(data){
    const saveImage = document.createElement('div');
    const imgURL = data.primaryImage;
    saveImage.innerHTML = `<img class="saved-images" src=${imgURL}></div><div class="delete-button-div"><button class="delete-button">✖️</button>`
    //use querySelector WITHIN the new innerHTML to search for the button element with the class "delete-button", to attach evenListener to that button:
    saveImage.querySelector(".delete-button").addEventListener('click', () => deleteImg(saveImage));
    galleryGrid.append(saveImage)
}

//defining above function (line 65). Deletes images when event listener triggered by user clicking X delete button.
function deleteImg(saveImage){
    saveImage.remove();
}

