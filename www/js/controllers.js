(function() {




angular.module('starter.controllers', [])



.controller('LoginCtrl', function($scope) {})


.controller('CalendarCtrl', function($scope) {})



.controller('FindGameCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('CreateGameCtrl', function($scope, $location, TestGamesData, ionicTimePicker) {

  var currentDate = new Date();
  console.log((currentDate.getHours() * 3600) + (currentDate.getMinutes() * 60) + currentDate.getSeconds());

  $scope.gameOptions = {
    date: null,
    time: (currentDate.getHours() * 3600) + (currentDate.getMinutes() * 60) + currentDate.getSeconds(), // Current time in seconds
    sport: null,
    place: null,
    skillLevel: null,
    minPlayers: null,
    maxPlayers: null
  };



  // TODO: Test for bugs and possibly switch to a different time picker
  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.gameOptions.time = selectedTime + 3600;
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      }
    },
    inputTime: $scope.gameOptions.time - 3600,   //Optional
    // inputTime: 2569 + 3600,   //Optional

    format: 12,         //Optional
    step: 1,           //Optional
    setLabel: 'Set'    //Optional
  };

  $scope.chooseTime = function() {
    ionicTimePicker.openTimePicker(ipObj1);
  };

  $scope.slider = {
    min: 5,
    max: 15,
    options: {
      floor: 2,
      ceil: 20
    }
  };

  $scope.games = TestGamesData.getGames();

  $scope.createGame = function() {

    $scope.gameOptions.minPlayers = $scope.slider.min;
    $scope.gameOptions.maxPlayers = $scope.slider.max;



    // Check gameOptions for valid input.
    if (!$scope.gameOptions.date || !$scope.gameOptions.time || !$scope.gameOptions.sport || !$scope.gameOptions.place || !$scope.gameOptions.skillLevel) {
      console.log('invalid input'); // TODO: Create invalid input popup

    } else {
      $scope.games.push($scope.gameOptions);
      $location.path('tab/find-game');
    }


  };

  console.log($scope.games);





})


.controller('ProfileCtrl', function($scope, TestProfileData, $ionicPopup) {

  $scope.athlete = TestProfileData.getAthlete();



    $scope.showProfilePopup = function(athlete) {

      $scope.data = {}; // Temporary variable used to get workoutNotes input data.
      $scope.data.name = athlete.name;
      $scope.data.bio = athlete.bio;
      $scope.data.skillLevel = athlete.skillLevel;
      $scope.data.favAthlete = athlete.favAthlete;


      var editProfilePopup = $ionicPopup.show({
        template: 'Name: <input type="text" ng-model="data.name"> Bio: <input type="text" ng-model="data.bio"> Skill Level: <br /><select ng-model="data.skillLevel"><option>Casual</option><option>Competitive</option><option>Both</option></select> <br />Favorite Athlete: <input type="text" ng-model="data.favAthlete">',

        title: 'Edit Profile',
        subTitle: '',
        scope: $scope,
        buttons: [{
          text: 'Cancel'
        }, {
          text: 'Submit',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.data;
          }
        }]
      });

      editProfilePopup.then(function(res) {
        if (res) {
          //TODO: Check to make user input is valid.
          athlete.name = res.name;
          athlete.bio = res.bio;
          athlete.skillLevel = res.skillLevel;

        }

      });
    };

  })

  // Angular Filters
  .filter('secondsToTime', function($filter) {
    return function(sec) {
      // TODO: Test this
      var date = new Date(0, 0, 0);
      date.setSeconds(sec);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    };
  });

}());
