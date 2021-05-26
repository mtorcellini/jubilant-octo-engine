$(document).ready(() => {

  let player;

  // initialize empty game state
  let gameState = {
    player_one : [],
    player_two : []
  };
  let gameId;

  // hide gameboard initially
  //$('#gameboard').hide();

  // hide idText initially
  //$('#idText').hide();

  // function for making a new Game, server sets a session var with current game ID
  const makeNewGame = () => {
    player = "player_one";

    fetch('/api/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(response => {

      // set gameId according to response
      gameId = response.id;

      $('#player-one').text(response.player_one);

      // show id text
      $('#gameIdSpan').text(gameId);
      $('#idText').show();

      // show gameboard
      $('#gameboard').show();

      // hide startgame button
      $('#makeNew').hide();
    })
  }


  // GET GAME DATA
  const getGameData = () => {
    fetch(`/api/game`)
      .then(response => response.json())
      .then(response => {

        console.log(response);

        const gameData = response.gameData;

        // MARK BOARD
        if (gameData) {
          markSquares(gameData.state);
        }

        // WHO AM I
        console.log('player: ', response.player);
        player = response.player;

        // display game ID
        $('#gameIdSpan').text(gameData.id);
        $('#idText').show();

        // IF PLAYER TWO IN ROOM, UPDATE DISPLAY
        if (gameData.player_one) {
          $('#player-one').text(gameData.player_one);
        }
        if (gameData.player_two) {
          $('#player-two').text(gameData.player_two);
        }
      })
  }

  // MARK THE SQUARES
  const markSquares = data => {
    if (data) {
      if (data.player_one) {
        data.player_one.forEach(xmark => {
          const xCoord = xmark[0];
          const yCoord = xmark[1];
          $(`.row${yCoord} .col${xCoord}`).css({ background: "darkblue", color: "white" });
        });
      }
      if (data.player_two) {
        data.player_two.forEach(omark => {
          const xCoord = omark[0];
          const yCoord = omark[1];
          $(`.row${yCoord} .col${xCoord}`).css({ background: "purple", color: "white" });
        })
      }
    }
  }

  // function for submitting data of a new move 
  const makeMove = (gameState) => {

    // send gameState to server
    fetch(`/api/game`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameState)
    })

      // get newest data from server and mark squares
      .then(() => {
        getGameData();
      })
  }

  
  // click listener on gameboard
  $("#gameboard").on("click", async (event) => {
    const xcoord = parseInt(event.target.getAttribute("data"));
    const ycoord = parseInt(event.target.parentElement.getAttribute("data"));
    const coords = [xcoord, ycoord];

    // update local game state
    gameState[player].push(coords);

    // send gamestate to server
    makeMove(gameState);
  })

  $('#leaveGame').on('click', () => {

    // delete current game
    fetch('/api/game', {
      method: 'DELETE'
    })
      .then(() => {
        location.href = "/"
      })
  })

  $("#test").on('click', getGameData);
  $('#makeNew').on('click', makeNewGame);



// run this function to get a game if there is a session variable set
getGameData();

const timer = setInterval(getGameData, 5000);



})