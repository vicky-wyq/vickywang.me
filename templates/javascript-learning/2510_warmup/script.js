"use strict";


function createVotingBox() {
  let votes = 0;

  return {
    upvote: function () {
      if (votes<10){
      votes++;
      };
      console.log(`Votes: ${votes}`);
    },
    downvote: function () {
      votes--;
      console.log(`Votes: ${votes}`);
    },
    getVotes: function () {
      return votes;
    },
    reset: function () {
      votes = 0;
      console.log('Votes reset to 0');
    }
  };
}

const postVotes = createVotingBox();

postVotes.upvote();   // Votes: 1
postVotes.upvote();   // Votes: 2
postVotes.downvote(); // Votes: 1

console.log(postVotes.getVotes()); // 1

postVotes.reset();    // Votes reset to 0






//============================================


// function createScoreTracker(step = 1) {
//   let score = 0;

//   return {
//     addPoints: function () {
//       score += step;
//       console.log(`Score: ${score}`);
//     },
//     getScore: function () {
//       return score;
//     },
//     resetScore: function () {
//       score = 0;
//       console.log('Score has been reset.');
//     }
//   };
// }

// const player1 = createScoreTracker(5); // each score adds 5
// player1.addPoints(); // Score: 5
// player1.addPoints(); // Score: 10
// console.log(player1.getScore()); // 10
// player1.resetScore(); // Score has been reset.

// const player2 = createScoreTracker(2);
// player2.addPoints(); // Score: 2




//============================================

// function createCounter(step) {
//   let count = 0;

//   return function () {
//     count+= step;
//     console.log(count);
//   };
// }

// const counter = createCounter();

// counter(); // 1
// counter(); // 2

//============================================

// const byFive = createCounter(5);
// byFive(); // why here = 1? the 5 not an argument? why 5 not pass in?

// byFive(); // 10

// const byTwo = createCounter(2);
// byTwo(); // 2
// byTwo(); // 4