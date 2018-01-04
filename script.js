
function shuffleArray(array) {
   var temp = [];
   var len=array.length;
   while(len){
      temp.push(array.splice(Math.floor(Math.random()*array.length),1)[0]);
      len--;
   }
   return temp;
}

function shuffle(array) {
  var elementsRemaining = array.length, temp, randomIndex;
  while (elementsRemaining > 1) {
    randomIndex = Math.floor(Math.random() * elementsRemaining--);
    if (randomIndex != elementsRemaining) {
      temp = array[elementsRemaining];
      array[elementsRemaining] = array[randomIndex];
      array[randomIndex] = temp;
    }
  }
  return array;
}   


   