//This is how to create a module
(function() {

  var FlashCardController = function($scope, $timeout) {

    $scope.showFinalScore = false;
    let clickMessage = "Click the correct note";
    let pauseTime = 2000;//milliseconds
    $scope.showNextWrong = false;
    $scope.showNextRight = false;
    let pauseBeforeContinue = true;
    
    $scope.filterIncorrect = function(e){
      return e.isCorrect==0 ? true : false;
    }
    $scope.filterCorrect = function(e){
      return e.isCorrect==1 ? true : false;
    }    
    
    //Start button click
    $scope.onStartClick = function() {

    $scope.flashCards = shuffle([
      {note:'C', octave:2, staff:0, isCorrect:0, octaveName:'Low'},
      {note:'D', octave:2, staff:0, isCorrect:0, octaveName:'Low'},
      {note:'E', octave:2, staff:0, isCorrect:0, octaveName:'Low'},
      {note:'F', octave:2, staff:0, isCorrect:0, octaveName:'Low'},
      {note:'G', octave:2, staff:0, isCorrect:0, octaveName:'Low'},
      {note:'A', octave:2, staff:0, isCorrect:0, octaveName:'Low'},
      {note:'B', octave:2, staff:0, isCorrect:0, octaveName:'Low'},
      {note:'C', octave:3, staff:0, isCorrect:0, octaveName:'Bass'},
      {note:'D', octave:3, staff:0, isCorrect:0, octaveName:'Bass'},
      {note:'E', octave:3, staff:0, isCorrect:0, octaveName:'Bass'},
      {note:'F', octave:3, staff:0, isCorrect:0, octaveName:'Bass'},
      {note:'G', octave:3, staff:0, isCorrect:0, octaveName:'Bass'},  
      {note:'A', octave:3, staff:0, isCorrect:0, octaveName:'Bass'},
      {note:'B', octave:3, staff:0, isCorrect:0, octaveName:'Bass'},  
      {note:'C', octave:4, staff:1, isCorrect:0, octaveName:'Middle'},
      {note:'D', octave:4, staff:1, isCorrect:0, octaveName:'Middle'},
      {note:'E', octave:4, staff:1, isCorrect:0, octaveName:'Middle'},
      {note:'F', octave:4, staff:1, isCorrect:0, octaveName:'Middle'},
      {note:'G', octave:4, staff:1, isCorrect:0, octaveName:'Middle'},
      {note:'A', octave:4, staff:1, isCorrect:0, octaveName:'Middle'},
      {note:'B', octave:4, staff:1, isCorrect:0, octaveName:'Middle'},
      {note:'C', octave:5, staff:1, isCorrect:0, octaveName:'Treble'},
      {note:'D', octave:5, staff:1, isCorrect:0, octaveName:'Treble'},
      {note:'E', octave:5, staff:1, isCorrect:0, octaveName:'Treble'},
      {note:'F', octave:5, staff:1, isCorrect:0, octaveName:'Treble'},
      {note:'G', octave:5, staff:1, isCorrect:0, octaveName:'Treble'},
      {note:'A', octave:5, staff:1, isCorrect:0, octaveName:'Treble'},
      {note:'B', octave:5, staff:1, isCorrect:0, octaveName:'Treble'},
      {note:'C', octave:6, staff:1, isCorrect:0, octaveName:'High'},
    ]);
    
    $scope.correctNoteList = 
      $scope.flashCards.filter(function(e){return e.isCorrect==1}).map(function(x)
        
        {
            return x.note + x.octave;
        }        
        
      ).join(', ');

      $scope.currentFlashCard = 0;
      $scope.message="Try " + ($scope.currentFlashCard + 1) +
        " of " + $scope.flashCards.length +",";
      $scope.correctNote = "";  
      
      $scope.score = 0;
      drawStaff($scope.flashCards, $scope.currentFlashCard);

      $scope.showNoteButtons = true;
      
      $scope.customStyle = {};

      $scope.correctNote = clickMessage;
       
      //setup number transitioning
      let num = document.querySelectorAll('.number');
      num.forEach(i => i.addEventListener('transitionend', removeTransition));
    };

    //Next button click
    $scope.onNextClick = function() {
      $scope.correctNote = "";    
      if($scope.currentFlashCard == $scope.flashCards.length - 1){
        $scope.message="Done";
        $scope.showFinalScore = true;
        return;
      }
      
      $scope.currentFlashCard++;
      
      $scope.message="Try " + ($scope.currentFlashCard + 1) +
        " of " + $scope.flashCards.length + ",";
      
      angular.element(document.querySelectorAll('.number'))
        .removeClass('selected-correct')
        .removeClass('selected-wrong')
        .removeClass('selected-pressing');
        
      $scope.noteDisabled = false;
      drawStaff($scope.flashCards, $scope.currentFlashCard);
      $scope.showNextButton = false;
      $scope.correctNote = clickMessage;
    };
    
    let showCorrectMessage = function(e){
        e.target.classList.add("selected-correct");
        e.target.classList.add('selected-pressing');
        $scope.correctNote = "You are right!  The correct answer is: " +
          $scope.flashCards[$scope.currentFlashCard].note.toUpperCase(); 
    }
    
    let showIncorrectMessage = function(e){
        e.target.classList.add("selected-wrong");
        e.target.classList.add('selected-pressing');
        $scope.correctNote = "Oops... the correct answer is: " +
        $scope.flashCards[$scope.currentFlashCard].note.toUpperCase();  
    }
    
    //Notes buttons click
    $scope.onNoteClick = function(e,v){
      $scope.noteDisabled = true;

      if(v==$scope.flashCards[$scope.currentFlashCard].note.toUpperCase()){
        $scope.score++;
        $scope.flashCards[$scope.currentFlashCard].isCorrect = 1;
        if($scope.showNextRight){
          $scope.showNextButton = true;
          showCorrectMessage(e);   
          
          return;
        }
        
        if(pauseBeforeContinue){
          showCorrectMessage(e); 
          $timeout($scope.onNextClick, pauseTime);
          return;
        }
        e.target.classList.add('selected-pressing');
        $scope.onNextClick();
        return;
      }
      
      if($scope.showNextWrong){//Show wrong answer
        $scope.showNextButton = true;
        showIncorrectMessage(e);
        return;
      }
      
      if(pauseBeforeContinue){
        showIncorrectMessage(e); 
        $timeout($scope.onNextClick, pauseTime);
        return;
      }      
      
      $scope.onNextClick();
        return;
    };
  };

  app.controller("FlashCardController", FlashCardController);

}());

function removeTransition(e){
  if(e.propertyName !== 'transform') return;
  this.classList.remove('selected-pressing');
  
}



      
      