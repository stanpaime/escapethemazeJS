var header = document.getElementById("startHeader");
var id = null;
var ex = 0;
var ey = 0;
var elem = document.getElementById("gamePiece");
var obs = document.getElementById("obs");
var obs1 = document.getElementById("obs1");
var obs2 = document.getElementById("obs2");
var obstacles = [obs, obs1, obs2];
var keypress = null;

function startGame() {
  gameArea.start();
}

var gameArea = {
  start: function () {
    console.log("GAME START");
    clearInterval(id);
    id = setInterval(frame, 20);
    window.addEventListener("keydown", function (e) {
      keypress = e.key;
      console.log(keypress);
    });
    console.log(obstacles);
    header.append("GAME START");
  },
  stop: function () {
    keypress = "";
    clearInterval(id);
    header.innerHTML = "GAME OVER";
  }
};

function reset() {
  count = 0;
  ex = 0;
  ey = 0;
  elem.style.top = ey + "px";
  elem.style.left = ex + "px";
  keypress = "";
  mvmt = "";
  id = setInterval(frame, 20);
}

function frame() {
  for (i = 0; i < obstacles.length; i++) {
    switch (keypress) {
      case "ArrowRight":
        if (crash(obstacles[i]) || ex == 350) {
          console.log("CRASHED!");
          gameArea.stop();
        } else {
          ex++;
          elem.style.left = ex + "px";
        }
        break;
      case "ArrowLeft":
        if (crash(obstacles[i]) || ex == 0) {
          console.log("CRASHED!");
          gameArea.stop();
        } else {
          ex--;
          elem.style.left = ex + "px";
        }
        break;
      case "ArrowDown":
        if (crash(obstacles[i]) || ey == 350) {
          console.log("CRASHED!");
          gameArea.stop();
        } else {
          ey++;
          elem.style.top = ey + "px";
        }
        break;
      case "ArrowUp":
        if (crash(obstacles[i]) || ey == 0) {
          console.log("CRASHED!");
          gameArea.stop();
        } else {
          ey--;
          elem.style.top = ey + "px";
        }
        break;
    }
  }
}

function crash(otherobj) {
  var myleft = ex;
  var myright = ex + 50;
  var mytop = ey;
  var mybottom = ey + 50;
  // console.log("My left:" + myleft);
  var otherleft = otherobj.offsetLeft;
  var otherright = otherobj.offsetLeft + otherobj.clientWidth;
  var othertop = otherobj.offsetTop;
  var otherbottom = otherobj.offsetTop + otherobj.clientHeight;
  // console.log("Other left:" + otherleft);

  var crash = true;
  if (
    mybottom < othertop ||
    mytop > otherbottom ||
    myright < otherleft ||
    myleft > otherright
  ) {
    crash = false;
  }
  return crash;
}

// function myMove() {
//   elem.classList.add("spin");
// }

// elem.addEventListener("animationend", () => {
//   elem.classList.remove("spin");
// });
