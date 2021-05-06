//This data could come from a CMS/editor/any nicer UI for editing game events
var scenarios = [
    {
       //No Things
       "required": [],
       "bypass": ["OneThing"],
       "text": "Let's have a picnic! We need a mat"
    },
    {
       //Just one Thing: the leaf
       "required": ["Leaf"],
       "bypass": ["TwoThings"],
       "text": "Nice! How about let's get something to drink?"
    },
    {
      //Just one Thing: the cap
      "required": ["Cap"],
      "bypass": ["TwoThings"],
      "text": "Nice! How about let's get something for you to eat?"
   },
   {
      //Just one Thing: the Berry
      "required": ["Berry"],
      "bypass": ["TwoThings"],
      "text": "Nice! Can you find me my favorite food?"
   },
   {
      //Just one Thing: the mushroom
      "required": ["Mushroom"],
      "bypass": ["TwoThings"],
      "text": "Nice! How about let's get something for you to eat?"
   },
    {
       //Any two but no Berry 
       "required": ["TwoThings"],
       "bypass": ["Berry", "ThreeThings"],
       "text": "We're getting there! How about something for you to eat?",
    },
    {
      //Any two but no Cap 
      "required": ["TwoThings"],
      "bypass": ["Cap", "ThreeThings"],
      "text": "We're getting there! How about something to drink?",
   },
   {
      //Any two but no leaf 
      "required": ["TwoThings"],
      "bypass": ["Leaf", "ThreeThings"],
      "text": "Nice! We still need something to put everything on, like a mat",
   },
    {
       //Three no leaf
       "required": ["Cap", "Berry", "Mushroom"],
       "bypass": ["FourThings"],
       "text": "We just need something to put everything on, like a mat!",
    },
    {
      //Three no cap
      "required": ["Leaf", "Berry", "Mushroom"],
      "bypass": ["FourThings"],
      "text": "Now we just need something to drink!",
   },
   {
      //Three no berry
      "required": ["Leaf", "Cap", "Mushroom"],
      "bypass": ["FourThings"],
      "text": "Now we just need something for you to eat!",
   },
   {
      //Three no mushroom
      "required": ["Leaf", "Berry", "Cap"],
      "bypass": ["FourThings"],
      "text": "Now we just need something for me to eat!",
   },
    {
       //All four!
       "required": ["FourThings"],
       "bypass": [],
       "text": "Yay! We have the perfect picnic!",
    },  
 ]
 
 var computedStoryPoints = {
    "requires": [ "Leaf", "Cap", "Mushroom", "Berry" ],
    "quantities": [
       [1, "OneThing"],
       [2, "TwoThings"],
       [3, "ThreeThings"],
       [4, "FourThings"]
    ]
 }
 
 //Functionality for click binding to add/remove story points
 var things = document.querySelectorAll(".thing");
 things.forEach(thing => {
    thing.addEventListener("click", () => {
       thing.classList.toggle("rescued");
       toggleStoryPoint( thing.getAttribute("story-point") )
       refreshScenario();
    })
 });
 
 
 //---------------------- Story Points ---------------------------
 
 //Story point state mechanism
 var storyPoints = {};
 
 function toggleStoryPoint(incomingStoryPoint) {
    //Remove if we had it
    if (storyPoints[incomingStoryPoint]) {
       delete storyPoints[incomingStoryPoint]
    } else {
       //Otherwise, add it
       storyPoints[incomingStoryPoint] = true;
    }
 }
 
 function getAllKnownStoryPoints() { 
    
    //Figure out the computed story points we also own
    var acquiredCount = computedStoryPoints.requires.filter(sp => {
       return storyPoints[sp]
    }).length; //EX: 3
    
    var computed = {};
    computedStoryPoints.quantities.forEach(q => {
       if (acquiredCount >= q[0]) {
          computed[q[1]] = true;
       }
    })
    
    //Combine with all known story points
    return {
       ...storyPoints,
       ...computed
    }
 }
 
 //Update the view
 function refreshScenario() {
    var known = getAllKnownStoryPoints();
    var scenario = scenarios.find(s => {
    
       //Validate that we don't have any bypassers
       for (var i=0; i<=s.bypass.length; i++) {
          if ( known[s.bypass[i]] ) {
             return false;
          }
       }
       
       //Validate that we have all of them
       return s.required.every(entry => known[entry])
    })
    
    document.querySelector(".js-text").textContent = scenario.text;
 }