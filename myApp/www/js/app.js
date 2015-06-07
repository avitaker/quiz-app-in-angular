// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quizApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).controller("MainController",['$scope','$filter',function($scope,$filter){
  $scope.quizObjectRaw=[{"question": "Grand Central Terminal, Park Avenue, New York is the world's", "choices": ["largest railway station","highest railway station","longest railway station","None of the above"], "correctAnswer":0},
  {"question": "Entomology is the science that studies", "choices": ["Behavior of human beings","Insects","The origin and history of technical and scientific terms","the formation of rocks"], "correctAnswer":1},
  {"question": "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of", "choices": ["Asia","Europe","Africa","Australia"], "correctAnswer":2},
  {"question": "Garampani sanctuary is located in the Indian town of", "choices": ["Diphu, Assam","Junagarh, Gujarat","Gangtok, Sikkim","Kohima, Nagaland"], "correctAnswer":0},
  {"question": "For which of the following disciplines is Nobel Prize awarded?", "choices": ["Physics and Chemistry","Literature, Peace and Economics","Physiology or Medicine","All of the above"], "correctAnswer":3},
  {"question": "Hitler's party, which came into power in 1933, is known as", "choices": ["Ku-Klux-Klan","Labour Party","Democratic Party","Nazi Party"], "correctAnswer":3},
  {"question": "Galileo was an Italian astronomer who", "choices": ["discovered four satellites of Jupiter","discovered that the movement of pendulum produces a regular time measurement","developed the telescope","All of the above"], "correctAnswer":3},
  {"question": "Exposure to sunlight helps a person improve his health because", "choices": ["resistance power increases","the ultraviolet rays convert skin oil into Vitamin D","the infrared light kills bacteria in the body","the pigment cells in the skin get stimulated and produce a healthy tan"], "correctAnswer":1},
  {"question": "First China War was fought between", "choices": ["China and Britain","China and France","China and Egypt","China and Greece"], "correctAnswer":0},
  {"question": "Famous Indian sculptures depicting art of love built some time in 950 AD - 1050 AD are at", "choices": ["Mahabalipuram temples","Jama Masjid","Khajuraho temples","Sun temple"], "correctAnswer":2}, 
  {"question":"In economics, dumping is","choices":["selling of goods abroad at a price well below the production cost at the home market price","the process by which the supply of a manufacture's product remains low in the domestic market, which batches him better price","prohibited by regulations of GATT","All of the above"],"correctAnswer":3},
  {"question":"Friction can be reduced by changing from","choices":["sliding to rolling","rolling to sliding","potential energy to kinetic energy","dynamic to static"],"correctAnswer":0},
  {"question":"During World War II, when did Germany attack France?","choices":["1915","1940","1943","1962"],"correctAnswer":1},
  {"question":"The ozone layer restricts which of the following types of radiation?","choices":["Visible light","Infrared radiation","X-rays and gamma rays","Ultraviolet radiation"],"correctAnswer":3},
  {"question":"During World War II, when did Germany attack France?","choices":["1915","1940","1943","1962"],"correctAnswer":1},
  {"question":"Eugenics is the study of","choices":["people of European origin","different races of mankind","altering human beings by changing their genetic components","genetics of plants"],"correctAnswer":2},
  {"question":"Escape velocity of a rocket fired from the earth towards the moon is a velocity to get rid of the","choices":["Moon's gravitational pull","Earth's gravitational pull","Centripetal force due to the earth's rotation","Pressure of the atmosphere"],"correctAnswer":1},
  {"question":"Hamid Karzai was chosen president of Afghanistan in","choices":["2002","1978","2010","1899"],"correctAnswer":0},
  {"question":"Headquarters of UNO are located at","choices":["Geneva (Switzerland)","Paris (France)","Hague (Netherlands)","New York (USA)"],"correctAnswer":3},
  {"question":"For seeing objects at the surface of water from a submarine under water, the instrument used is","choices":["telescope","spectroscope","periscope","noScope 360"],"correctAnswer":2}];
  $scope.quizObjectJSON=[];
  $scope.eliminateDuplicates=function (arr) {
  	var i,
  	len=arr.length,
  	out=[],
  	obj={};

  	for (i=0;i<len;i++) {
  		obj[arr[i]]=0;
  	}
  	for (i in obj) {
  		out.push(i);
  	}
  	return out;
  }
  $scope.returnArray=[];
  while ($scope.returnArray.length<11){
  	$scope.randomNum=Math.floor(Math.random()*($scope.quizObjectRaw.length))+0;
  	$scope.returnArray.push($scope.randomNum);
  	$scope.eliminateDuplicates($scope.returnArray);
  }
  for (var l=0;l<$scope.returnArray.length-1;l++){
  	$scope.thisOne=$scope.returnArray[l];
  	$scope.quizObjectJSON.push($scope.quizObjectRaw[$scope.thisOne]);
  }
  $scope.answeredQuiz=$scope.quizObjectJSON;
  $scope.title="Avi's quiz";
  $scope.questionNumber=-1;
  $scope.hideWelcomeDiv=false;
  $scope.isQuizActive=false;
  $scope.scoreQuizNow=false;
  $scope.quizIsDone=false;
  $scope.finalScore=0;
  $scope.anyWrong=false;
  $scope.anyMissed=false;
  $scope.perfectQuiz=false;
  $scope.wrongAnswers=[];
  $scope.notAnswereds=[];
  /*$scope.showConfirm = function() {
  	var confirmPopup = $ionicPopup.confirm({
  		title: 'No answer selected',
  		template: 'Are you sure you want to continue without choosing an answer?'
  		cancelText: 'No', // String (default: 'Cancel'). The text of the Cancel button.
  		cancelType: 'button-stable', // String (default: 'button-default'). The type of the Cancel button.
  		okText: 'Yes', // String (default: 'OK'). The text of the OK button.
  		okType: 'button-light'
  	});
  	confirmPopup.then(function(res) {
  		if(res) {
  			$scope.questionNumber++; goOn=true;
  		} else {}
  	});
  };*/
  $scope.nextButtonOnclick=function(){
    var goOn=false;
    $scope.hideWelcomeDiv=true;
    $scope.isQuizActive=true;
    if ($scope.questionNumber===-1){
      $scope.questionNumber++;
    }
    else { 
      if (!$scope.answeredQuiz[$scope.questionNumber].userAnswer){
        if ($scope.answeredQuiz[$scope.questionNumber].userAnswer===0){
          $scope.questionNumber++;
          goOn=true;
        }
        else {
          var noAnswer=window.confirm('Are you sure you want to continue without choosing an answer?');
          if (noAnswer===true){$scope.questionNumber++; goOn=true;}
        }
      }
      else {$scope.questionNumber++;goOn=true;}
    }
    return goOn;
  }
  $scope.backButtonOnclick=function(){
    $scope.questionNumber=0;
  }
  $scope.finishButtonOnclick=function(){
    if ($scope.nextButtonOnclick()){
      $scope.isQuizActive=false;
      for (var i=0;i<$scope.answeredQuiz.length;i++){
        if ($scope.answeredQuiz[i].userAnswer===$scope.answeredQuiz[i].correctAnswer){
          $scope.finalScore+=1;
        }
        else if ($scope.answeredQuiz[i].userAnswer!=$scope.answeredQuiz[i].correctAnswer && $scope.answeredQuiz[i].userAnswer!=null|undefined){
          $scope.wrongAnswers.push($scope.answeredQuiz[i]);
          $scope.anyWrong=true;
        }
        else {
          $scope.notAnswereds.push($scope.answeredQuiz[i]);
          $scope.anyMissed=true;
        }
      }
      $scope.scoreQuizNow=true;
      $scope.isQuizDone=true;
      if ($scope.finalScore===10){$scope.perfectQuiz=true;}
    }
  }
}]).directive('questionDiv',function(){
  return{
    restrict:'E',
    replace:true,
    //scope:{questionNumber:'='},
    templateUrl:'questionDivInline.html',
  }
})

