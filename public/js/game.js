$(document).ready(() => {

  // GLOBALS //
  let PLAYER;
  let GAMEID;
  let GAMESTATE = {
    player_one: [],
    player_two: []
  };


  // MAKE NEW GAME
  const makeNewGame = () => {
    PLAYER = "player_one";

    fetch('/api/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(response => {

        GAMEID = response.id;

        $('#player-one').text(response.player_one);
        $('#gameIdSpan').text(GAMEID);
        $('#idText').show();
        $('#gameboard').show();
        $('#makeNew').hide();
      })
  }


  // GET GAME DATA
  const getGameData = () => {
    fetch(`/api/game`)
      .then(response => response.json())
      .then(response => {
        const gameData = response.gameData;
        // WHO AM I
        PLAYER = response.player;

        // UPDATE LOCAL GAMESTATE
        if (gameData.state) {
          GAMESTATE.player_one = gameData.state.player_one;
          GAMESTATE.player_two = gameData.state.player_two;
          console.log('GAMESTATE', GAMESTATE)
        }

        // MARK BOARD
        if (gameData) {
          $('#gameboard').show()
          markSquares(gameData.state);
        }

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
          $(`.row${yCoord} .col${xCoord}`).css({
            background: "darkblue",
            color: "white"
          });
        });
      }
      if (data.player_two) {
        data.player_two.forEach(omark => {
          const xCoord = omark[0];
          const yCoord = omark[1];
          $(`.row${yCoord} .col${xCoord}`).css({
            background: "purple",
            color: "white"
          });
        })
      }
    }
  }

  // SEND MOVE REQUEST
  const makeMove = (gameState) => {
    fetch(`/api/game`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameState)
      })
      .then(() => {
        getGameData();
      })
  }


  // CLICK LISTENER ON GAMEBOARD
  $("#gameboard").on("click", async (event) => {
    const xcoord = parseInt(event.target.getAttribute("data"));
    const ycoord = parseInt(event.target.parentElement.getAttribute("data"));
    const coords = [xcoord, ycoord];

    // UPDATE LOCAL GAMESTATE
    GAMESTATE[PLAYER].push(coords);

    // SEND PUT REQUEST
    makeMove(GAMESTATE);
  })

  // DELETE GAME ON LEAVE-BUTTON
  $('#leaveGame').on('click', () => {
    fetch('/api/game', {
        method: 'DELETE'
      })
      .then(() => {
        location.href = "/"
      })
  })

  $('#gameboard').hide();
  $('#idText').hide();
  $("#test").on('click', getGameData);
  $('#makeNew').on('click', makeNewGame);
  const timer = setInterval(getGameData, 2500);

})