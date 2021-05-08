//Variables and sound
let inputDir ={x:0,y:0};
const foodSound=new Audio('food.ogg');
const moveSound=new Audio('bgm.mp3');
const gameOverSound=new Audio('die.ogg');
let speed =5;
let score=0;
// let mx=0;
let lastPaintTime =0;
let snakeArr = [
    {x:13,y:15}
]
food ={x:8,y:5};
// let board =document.getElementById('board');


//Game Fun
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {return;
    }
    lastPaintTime =ctime;
    gameEngine();
}
function isCollide(snake)
{
   //if you have bump into yourself
   for (let i = 1; i < snakeArr.length; i++) {
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y )
       {
           return true;
       }
    }
       if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y <= 0)
       {return true;

       }
  
       return false;
   }
   

function gameEngine(){
    //Part 1 updating snake array
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        moveSound.pause();
        inputDir={x:0,y:0};
        alert("game over press any key  To Play again");
        snakeArr=[{
            x:13,y:15
        }]
        moveSound.play();
        score=0;
        scoreBox.innerHTML = "Score :" +score;

    }
    //if eaten regenerate the food and increment the score
    if(snakeArr[0].y ===food.y && snakeArr[0].x === food.x)
    {   let a=2;
        let b=16;
        score +=1;
        if(score > hiscoreval)
        {
         hiscoreval =score;
         localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
         hiscoreBox.innerHTML = "High-Score: "+hiscoreval;
        
        }
      
        // if(score>mx)
        // mx=score;
        scoreBox.innerHTML = "Score :" +score;
        // maxBox.innerHTML = "Max-Score :" +mx;
        
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        food ={x: Math.round(a +(b-a)*Math.random()),y:Math.round(a+ (b-a)*Math.random())};
    }
    //mooving the snake
    for (let i = snakeArr.length -2; i >=0; i--){
        snakeArr[i+1]={...snakeArr[i]};
     
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //Part 2 display  the snake and food
    //display snake
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart = e.x;
        if( index === 0)
        snakeElement.classList.add('head');
        else
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
//Display the food
foodElement = document.createElement('div');
foodElement.style.gridRowStart =food.y;
foodElement.style.gridColumnStart = food.x;
board.appendChild(foodElement);
foodElement.classList.add('food');


}











//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
    // hiscoreBox.innerHTML = "High-Score: "+hiscore;
}
else
{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High-Score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x:0,y:1}//start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("AU");
            inputDir.x=0 ;
            inputDir.y=-1;
            break;
            case "ArrowDown":
                   console.log("AD");
                   inputDir.x=0 ;
                   inputDir.y=1;
                break;
            case "ArrowLeft":
                    console.log("AL");
                    inputDir.x=-1 ;
                    inputDir.y=0;
                    break;
            case "ArrowRight":
                    console.log("AR");
                    inputDir.x=1 ;
                    inputDir.y=0;
            break;
    
        default:
            break;
    }

})
