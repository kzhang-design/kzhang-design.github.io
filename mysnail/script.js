
var debug = document.querySelector("#debug");





var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = .8; //How fast the character moves in pixels per frame

let lastX;
let lastY;

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   
   //Limits (gives the illusion of walls)
   var leftLimit = -10;
   var rightLimit = (16 * 11)+10;
   var topLimit = -8 + 32;
   var bottomLimit = (16 * 7);

var waterrightLimit = (16 * 7)+10;
var waterbottomLimit = (16 * 5.3);

var waterleftLimit = (16 * 1.5)+10;
var waterleftbottomLimit = (16 * 6.7);

var waterleft2Limit = 5;
var waterleft2bottomLimit = (16 * 6);

var mushroomrightLimit = (16 * 8)+10;
var mushroombottomLimit = (16 * 3.2);

   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }


   if (x >= waterrightLimit && y >= waterbottomLimit) {
      x = lastX; y = lastY;
   }

   if (x <= waterleftLimit && y >= waterleftbottomLimit) {
      x = lastX; y = lastY;
   }
      if (x <= waterleft2Limit && y >= waterleft2bottomLimit) {
      x = lastX; y = lastY;
   }

   if (x >= mushroomrightLimit && y <= mushroombottomLimit) {
      x = lastX; y = lastY;
   }


   
   var camera_left = pixelSize * 66;
   var camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
      lastX = x;
      lastY = y;
   })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));



//------------------------------



// Get the elements with class="character_spritesheet"
var elements = document.getElementsByClassName("character_spritesheet");

// Declare a loop variable
var i;

// Two images side by side
function red() {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.filter = "hue-rotate(180deg)";
  }
}

// five images side by side
function blue() {
  for (i = 0; i < elements.length; i++) {
   elements[i].style.filter = "hue-rotate(60deg)";
  }
}

// 10 images side by side
function green() {
  for (i = 0; i < elements.length; i++) {
   elements[i].style.filter = "hue-rotate(0)";
}
}



let inputElement = document.querySelector("#input");

let result = document.querySelector("#result");

// Detect when key is pressed in the text box
inputElement.addEventListener("keydown", function(event){
  
  //Check if enter key is pressed
  if (event.key == "Enter"){
    
    // Let's show the text on the page!
    console.log(inputElement.value);
    
    // Set what we typed to the inside of the result paragraph
    result.innerText = inputElement.value;
    
    // Reset the value inside the text box
    inputElement.value = "";
  }
});




// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
