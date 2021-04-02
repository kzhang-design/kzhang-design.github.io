/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
// console.log(Airtable);

// use the airtable librar to get a variable using API key
var base = new Airtable({ apiKey: "key5A9hAaqS9Pb2Xy" }).base(
  "apprlGFKNWApWgqDV"
);

//get the collection base select all the rows and specify functions that will recieve the data
base("portraits").select({}).eachPage(gotPageOfPhotos, gotAllPhotos);

//an empty array to hold our data
var photos = [];

// callback function that recieves our data
function gotPageOfPhotos(records, fetchNextPage) {
  console.log("gotPageOfPhotos()");
  // add the records from this page to our books array
  photos.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllPhotos(err) {
  console.log("gotAllPhotos()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogPhotos();
  showPhotos();
}

// just loop through the books and console.log them
function consoleLogPhotos() {
  console.log("consoleLogPhotos()");
  photos.forEach((photo) => {
    console.log("Photo:", photo);
  });
}

// loop through airtable data, create elements
function showPhotos() {
  console.log("showPhotos()");
  photos.forEach((photo) => {
    

// creating a new div container
//this is where our photo will go
var photoContainer = document.createElement("div");
photoContainer.classList.add("photo-container");
document.querySelector(".container").append(photoContainer);

// add photo titles to the containers
var photoTitle = document.createElement("h1");
photoTitle.classList.add("photo-title");
photoTitle.innerText = photo.fields.portrait_title;
photoContainer.append(photoTitle);

// add description to  container
var photoDescription = document.createElement("h1");
photoDescription.classList.add("photo-description");
photoDescription.innerText = photo.fields.description;
photoContainer.append(photoDescription);


// image to container
var photoImage = document.createElement("img");
photoImage.classList.add("photo-image");
photoImage.src = photo.fields.photo_image[0].url;
photoContainer.append(photoImage);


// add event listener 
// when user clicks on container, image will appear or dissapear
photoContainer.addEventListener("click", function(){
  photoImage.classList.toggle("active");

})


  });
}








//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));
	
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "mydiv")) {
  document.getElementById(elmnt.id + "mydiv").onmousedown = dragMouseDown;
  } else {
  elmnt.onmousedown = dragMouseDown;
  }
  

  function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
  /* stop moving when mouse button is released:*/
  document.onmouseup = null;
  document.onmousemove = null;
  }
}