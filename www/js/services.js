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
      skillLevel: "Casual/Competitive",
      favAthlete: "David Garrard",
      bio: "Ball is life."
    },
    {
      userID: 2,
      name: "Ben Sydel",
      gradYear: "2018",
      pic: "img/Trier_Joe.png",
      skillLevel: "Casual/Competitive",
      favAthlete: "Chad Henne",
      bio: "Tired of losing."
    },
    {
      userID: 3,
      name: "Steven Roach",
      gradYear: "2018",
      pic: "img/Steven.png",
      skillLevel: "Casual/Competitive",
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

  servMod.factory('DateService', function() {

    return {
      dateStringToDate: function(dateString) {
        /* Takes a String in the format MMDDYYYY and returns a corresponding date object. */
        var month = dateString.substring(0,2);
        var day = dateString.substring(2,4);
        var year = dateString.substring(4,9);
        var date = new Date(month+"/"+day+"/"+year);
        return date;
      },
      dateToDateString: function(date) {
        /* Takes a Date and returns a dateString in the format MMDDYYYY */
        var month = String(date.getMonth() + 1); // Month is from 0 - 11 so we add one so it is from 1 - 12
        var day = String(date.getDate());
        var year = String(date.getFullYear());
        var leftPad = function(strNum) {
          /* Takes a string and adds a 0 on the left if the string is one character long. */
          if (strNum.length == 1) {
              return ("0"+strNum);
          }
          return strNum;
        };
        month = leftPad(month);
        day = leftPad(day);
        var dateString = month + day + year;
        return dateString;
      },
      getNextDate: function(date) {
        /* Takes a Date and returns a dateString for the next day in the format MMDDYYYY */
        var nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate;
      },
      getLastDate: function(date) {
        /* Takes a Date and returns a dateString for the day before in the format MMDDYYYY */
        var lastDate = new Date(date);
        lastDate.setDate(lastDate.getDate() - 1);
        return lastDate;
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
        skillLevel: "Casual/Competitive",
        minPlayers: 5,
        maxPlayers: 15,
        gameCreatorID: 0,
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
        gameCreatorID: 1,
        playerIDs: [1,3]
      }

    ];


    return {
      getGames: function() {
        return games;
      },
      getGamesByDate: function(date) {
        var gamesByDate = [];
        var isDateEqual = function(date1, date2) { // TODO: Test this.
          /* Returns boolean for if the two dates have the same day, month, and year. */
          return (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear());
        };
        for (var i = 0; i < games.length; i++) {
          if (isDateEqual(games[i].date, date)) { // If game.date has same month, day and year as input date
            gamesByDate.push(games[i]);
          }
        }
        return gamesByDate;
      },
      getGame: function(gameID) { // TODO: Rewrite to be more efficient.
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
