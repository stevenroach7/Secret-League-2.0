(function() {




angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope) {


  var leftPad = function(strNum) {
    /* Takes a string and adds a 0 on the left if the string is one character long. */
    if (strNum.length == 1) {
        return ("0"+strNum);
    }
    return strNum;
  };

  var dateToDateString = function(date) {
    /* Takes a Date and returns a dateString in the format MMDDYYYY */
    var month = String(date.getMonth() + 1); // Month is from 0 - 11 so we add one so it is from 1 - 12
    var day = String(date.getDate());
    var year = String(date.getFullYear());
    month = leftPad(month);
    day = leftPad(day);
    var dateString = month + day + year;
    return dateString;
  };

  var currentDate = new Date();
  $scope.currentDateString = dateToDateString(currentDate);


})


.controller('LoginCtrl', function($scope) {})


.controller('CalendarCtrl', function($scope) {})



.controller('FindGameCtrl', function($scope, TestProfileData, TestGamesData, DateService, $stateParams) {

  $scope.date = DateService.dateStringToDate($stateParams.dateString);

  $scope.games = TestGamesData.getGamesByDate($scope.date);

  $scope.getNextDateString = function() {
    /* Returns the date string for the next date. */
    var nextDate = DateService.getNextDate($scope.date);
    return DateService.dateToDateString(nextDate);
  };

  $scope.getLastDateString = function() {
    /* Returns the date string for the previous date. */
    var lastDate = DateService.getLastDate($scope.date);
    return DateService.dateToDateString(lastDate);
  };

  var getPlayersByID = function(playerIDs) {
    /* Helper function that takes an array of playerIDs and returns a corresponding array of athletes. */
    var players = [];
    for (var i = 0; i < playerIDs.length; i++) {
      var athlete = TestProfileData.getAthlete(playerIDs[i]);
      players.push(athlete);
    }
    return players;
  };

  $scope.getPlayersInGame = function(gameID) {
    /* Takes a gameID and returns the players registered for that game. */
    var game = TestGamesData.getGame(gameID);
    var players = getPlayersByID(game.playerIDs);
    return players;
  };

})


.controller('CreateGameCtrl', function($scope, $location, TestGamesData, TestProfileData, DateService, ionicTimePicker, $ionicPopup) {

  $scope.athlete = TestProfileData.getAthlete(0); // TODO: Change 0 to userID of authenticated user.

  var currentDate = new Date();

  var roundToNextHour = function(seconds) {
    /* Helper function that takes a time in seconds and returns the time of the upcoming whole hour in seconds. */
    var hours = Math.floor(seconds / 3600);
    return (hours + 1) * 3600;
  };

  var resetGameOptions = function() {
    $scope.gameOptions = {
      id: (currentDate.getHours() * 3600) + (currentDate.getMinutes() * 60) + currentDate.getSeconds(), // TODO: Create Auto Id generator function or do this elsewhere.
      date: currentDate,
      time: roundToNextHour((currentDate.getHours() * 3600) + (currentDate.getMinutes() * 60) + currentDate.getSeconds()), // Current time in seconds
      sport: null,
      place: null,
      skillLevel: $scope.athlete.skillLevel,
      minPlayers: null,
      maxPlayers: null,
      playerIDs: [0]
    };
  };

  resetGameOptions();


  // TODO: Test for bugs
  // https://github.com/rajeshwarpatlolla/ionic-timepicker
  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.gameOptions.time = selectedTime.getUTCHours() * 3600 + selectedTime.getUTCMinutes() * 60 + selectedTime.getUTCSeconds();
      }
    },
    inputTime: $scope.gameOptions.time,   //Optional
    format: 12,         //Optional
    step: 1,           //Optional
    setLabel: 'Set'    //Optional
  };


  $scope.chooseTime = function() {
    ipObj1.inputTime = $scope.gameOptions.time; // Refresh default time on timepicker options object.
    ionicTimePicker.openTimePicker(ipObj1);
  };

  // https://github.com/angular-slider/angularjs-slider
  $scope.slider = {
    min: 5,
    max: 15,
    options: {
      floor: 2,
      ceil: 20
    }
  };

  $scope.games = TestGamesData.getGames();

  var showAlert = function(message) {
    var alertPopup = $ionicPopup.alert({
      title: 'Invalid Input',
      template: message
    });
  };

  var isDateValid = function(date) {
    /* Takes a date and returns a boolean for if the date is valid. A date is valid if is it on or after the current date (Does not use time to compare) but not more than a year after. */
    var currentDate = new Date();
    var currentDateNoTimeUTC = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    var dateNoTimeUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateNoTimeUTC < currentDateNoTimeUTC) { // Check date isn't before current date.
      return false;
    }
    var MS_PER_DAY = 1000 * 60 * 60 * 24;
    var DAYS_IN_YEAR = 365;
    var daysDifference = Math.floor((dateNoTimeUTC - currentDateNoTimeUTC) / MS_PER_DAY);
    return (daysDifference < 365);
  };

  $scope.createGame = function() {

    $scope.gameOptions.minPlayers = $scope.slider.min;
    $scope.gameOptions.maxPlayers = $scope.slider.max;

    // Check gameOptions for valid input.
    if (!$scope.gameOptions.date || !$scope.gameOptions.time || !$scope.gameOptions.sport || !$scope.gameOptions.place || !$scope.gameOptions.skillLevel) {
      showAlert("Please fill out all fields.");
    } else if (!isDateValid($scope.gameOptions.date)) { // Check to make sure date entered is valid. 
      showAlert("Please choose a valid date.");
    } else { // Input is valid.
      $scope.games.push($scope.gameOptions); // add newly created game to games array.

      // Get date String of newly created game so we can redirect to that date
      var date = $scope.gameOptions.date;
      var dateString = DateService.dateToDateString(date);

      // Clear game options so form resets when user returns to this tab
      resetGameOptions();
      $location.path('tab/find-game/' + dateString); // Direct to date of recently created game
    }
  };
})


.controller('ProfileCtrl', function($scope, TestProfileData, $ionicPopup, $stateParams) {

  $scope.athlete = TestProfileData.getAthlete($stateParams.userID);

  $scope.showProfilePopup = function(athlete) {

    $scope.data = {}; // Temporary variable used to get workoutNotes input data.
    $scope.data.name = athlete.name;
    $scope.data.bio = athlete.bio;
    $scope.data.skillLevel = athlete.skillLevel;
    $scope.data.favAthlete = athlete.favAthlete;


    var editProfilePopup = $ionicPopup.show({
      template: 'Name: <input type="text" ng-model="data.name"> Bio: <input type="text" ng-model="data.bio"> Skill Level: <br /><ion-item class="item item-select"><select ng-model="data.skillLevel"><option>Casual</option><option>Competitive</option><option>Casual/Competitive</option></select></ion-item> <br />Favorite Athlete: <input type="text" ng-model="data.favAthlete">',
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
        // Check to make user name is not blank
        if (res.name) {
          athlete.name = res.name;
          athlete.bio = res.bio;
          athlete.skillLevel = res.skillLevel;
          athlete.favAthlete = res.favAthlete;
        }
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
