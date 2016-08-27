(function() {

  var servMod = angular.module('starter.services', []); // Assigning the module to a variable makes it easy to add new factories.

  servMod.factory('TestProfileData', function() {

    var athletes =
    [
      {
      userID: 0,
      name: "Joe Trier",
      gradYear: "2018",
      pic: "img/Trier_Joe.png",
      skillLevel: "Competitive",
      favAthlete: "Byron Leftwich",
      bio: "Always ready to play."
    },
    {
      userID: 1,
      name: "Vivi Gregorich",
      gradYear: "2018",
      pic: "img/Trier_Joe.png",
      skillLevel: "Both",
      favAthlete: "David Garrard",
      bio: "Ball is life."
    },
    {
      userID: 2,
      name: "Ben Sydel",
      gradYear: "2018",
      pic: "img/Trier_Joe.png",
      skillLevel: "Both",
      favAthlete: "Chad Henne",
      bio: "Tired of losing."
    },
    {
      userID: 3,
      name: "Steven Roach",
      gradYear: "2018",
      pic: "img/Steven.png",
      skillLevel: "Both",
      favAthlete: "Rafael Nadal",
      bio: "Game, Set, Match."
    }

  ];

    return {
      getAthlete: function(id) { // TODO: Rewrite to be more efficient.
        for (var i = 0; i < athletes.length; i++) {
          if (athletes[i].userID == id) {
            return athletes[i];
          }
        }
        return null;
      },
      getAthletes: function() {
        return athletes;
      }
    };

  });

  servMod.factory('TestGamesData', function() {

    var games =
    [
      {
        id: 0,
        date: new Date(),
        time: 7000, // Current time in seconds
        sport: "Basketball",
        place: "Leonard Center Field House",
        skillLevel: "Both",
        minPlayers: 5,
        maxPlayers: 15,
        playerIDs: [0,1,2]
      },
      {
        id: 1,
        date: new Date(),
        time: 3000, // Current time in seconds
        sport: "Basketball",
        place: "Leonard Center Alumni Gym",
        skillLevel: "Casual",
        minPlayers: 5,
        maxPlayers: 15,
        playerIDs: [1,3]
      }

    ];


    return {
      getGames: function() {
        return games;
      },
      getGamesByDate: function(date) {
        var currentGames = [];
        for (var game in games) {
          if (game.date) { // TODO: If game.date has same month, day and year as input date
            currentGames.push(game);
          }
        }
        //return currentGames;
        return games;
      },
      getGame: function(gameID) {// TODO: Rewrite to be more efficient.
        for (var i = 0; i < games.length; i++) {
          if (games[i].id === gameID) {
            return games[i];
          }
        }
        return null;
      }
    };



  });





}());
