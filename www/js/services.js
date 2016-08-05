(function() {

  var servMod = angular.module('starter.services', []); // Assigning the module to a variable makes it easy to add new factories.

  servMod.factory('TestProfileData', function() {

    var athlete = {
      name: "Brett Graham",
      gradYear: "2018",
      pic: "img/Graham_Brett.jpg",
      skillLevel: "Competitive",
      favAthlete: "Byron Leftwich",
      bio: "Ready to play."

    };

    return {
      getAthlete: function() {
        return athlete;
      }
    };

  });

  servMod.factory('TestGamesData', function() {


    var games = [];


    return {
      getGames: function() {
        return games;
      }
    };



  });





}());
