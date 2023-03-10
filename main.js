const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results')
const gameWinOverDisplay = document.querySelector('.game-win-over')
let currentShooterIndex = 203;
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0
var levelSpeed = 250

/* -------------------- */

// var test;
// function changeSpeed(){
//      switch (document.getElementById("lvl").value){
//           case "400":
//                test=400;
//                break;
//           case "250":
//                test=250;
//                break;
//           case "150":
//                test=150;
//                break;
//      }
// }

// test=levelSpeed;
// console.log(levelSpeed);

/* -------------------- */

for (let i = 0; i < 225; i++) {
     const square = document.createElement('div');
     grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const alienInvaders = [
     0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
     15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
     30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
     for (let i = 0; i < alienInvaders.length; i++)
     {
          if (!aliensRemoved.includes(i))
          {
               squares[alienInvaders[i]].classList.add('invader');
          }
     }
}

draw()

function remove()
{
     for (let i = 0; i < alienInvaders.length; i++)
     {
          squares[alienInvaders[i]].classList.remove('invader');
     }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
     squares[currentShooterIndex].classList.remove('shooter')
     switch(e.key)
     {
          case 'ArrowLeft':
               if (currentShooterIndex % width!==0) currentShooterIndex-=1
               break
          case 'ArrowRight':
               if (currentShooterIndex % width<width-1) currentShooterIndex+=1
               break
     }
     squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvaders()
{
     const leftEdge = alienInvaders[0]%width===0
     const rightEdge = alienInvaders[alienInvaders.length-1]%width===width-1
     remove()

     if (rightEdge && goingRight)
     {
          for (let i=0; i<alienInvaders.length; i++)
          {
               alienInvaders[i]+=width
               direction=-1
               goingRight=false
          }
     }

     if (leftEdge && !goingRight)
     {
          for (let i=0; i<alienInvaders.length; i++)
          {    
               alienInvaders[i]+=width
               direction=1
               goingRight=true
          }
     }

     for (let i=0; i<alienInvaders.length; i++)
     {
          alienInvaders[i]+=direction
     }

     draw()

     if (squares[currentShooterIndex].classList.contains('invader', 'shooter'))
     {
          console.log("Game Over!")
          gameWinOverDisplay.innerHTML="Game Over!"
          clearInterval(invadersId)
     }

     for (let i=0; i<alienInvaders.length; i++)
     {
          if (alienInvaders[i]>=210)
          {
               console.log("Game Over!")
               gameWinOverDisplay.innerHTML="Game Over!"
               clearInterval(invadersId)
          }
     }

     if (aliensRemoved.length===alienInvaders.length)
     {
          gameWinOverDisplay.innerHTML="VICTORY!"
          clearInterval(invadersId)
     }
}

// Game speed
invadersId = setInterval(moveInvaders, levelSpeed);

function shoot(e){
     let laserId
     let currentLaserIndex = currentShooterIndex

     function moveLaser(){
          squares[currentLaserIndex].classList.remove('laser')
          currentLaserIndex-=width
          squares[currentLaserIndex].classList.add('laser')

          if (squares[currentLaserIndex].classList.contains('invader')){
               squares[currentLaserIndex].classList.remove('laser')
               squares[currentLaserIndex].classList.remove('invader')
               squares[currentLaserIndex].classList.add('boom')

               setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
               clearInterval(laserId)

               const alienRem=alienInvaders.indexOf(currentLaserIndex)
               aliensRemoved.push(alienRem)
               results++
               resultsDisplay.innerHTML=results
               console.log(aliensRemoved)
          }
     }
     
     switch (e.key)
     {
          case 'ArrowUp':
               // Laser speed
               laserId = setInterval(moveLaser, 100)
     }
}

document.addEventListener('keydown', shoot)