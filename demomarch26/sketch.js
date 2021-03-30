
  let poemFragments = {
    'noun': ["a mountain","Leaf","a grandma","a field","a cup","a horse","an ocean","a walnut","a desert","a cat","a branch","a diaper","socks","a cupcake","a pillow","a coffee","cat","girl","a cherry"],
    'adjective': ["Tiring","rotund","hideous","breakable","sparkly","smooth","fluffy","fragile","delicious","lovely","hot","strange","smooth","ample","warm","colossal","rough","tiny","dark"],
    'verb': ["Overthinking","thinking of","bouncing on","sculpting","waiting for","wanting","napping","thinking","hoping for","wanting","dancing","sleeping","frustra","brightening","skipping","looking for","swimming","thinking of","making"],
    'emotion': ["sorrowful","Anxious","confused","yearning","angry","frustrated","melancholy","overwhelm","anxious","excited ","sleepy","triggered","excited","tired","joyful","disturbed","happy","delighted","upset"]
  };


function swapText(event) {
 let itemClass = event.target.className;

 if (itemClass == 'noun') {
   event.target.innerText = poemFragments['noun'][Math.floor(Math.random() * poemFragments['noun'].length)];
 }

}







let poem = document.querySelector('#poem');

poem.addEventListener('mouseover', swapText);


console.log('hello');