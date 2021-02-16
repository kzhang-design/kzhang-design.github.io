window.onload = function(){
  var bsDiv = document.getElementById("cursor");


  var x, y;






// On mousemove use event.clientX and event.clientY to set the location of the div to the location of the cursor:
  window.addEventListener('mousemove', function(event){
      x = event.clientX;
      y = event.clientY;                    
      if ( typeof x !== 'undefined' ){
          bsDiv.style.left = x + "px";
          bsDiv.style.top = y + "px";
      }
  }, false);
}


