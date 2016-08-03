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

.controller('CreateGameCtrl', function($scope, ionicTimePicker) {



  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set'    //Optional
  };


  $scope.chooseTime = function() {
    ionicTimePicker.openTimePicker(ipObj1);
  };


  $scope.slider = {
    value: 10,
    options: {
      floor: 2,
      ceil: 30
    }
  };





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



});
