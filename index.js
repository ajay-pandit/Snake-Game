let initvel={x:0,y:0};
let lastRender=0;
const speed=9;
const gameover=new Audio('sound/gameOver.mp3');
const foodsound= new Audio('sound/food.mp3');
const turn=new Audio('sound/move.mp3');
let newscore=0;
//functions
let food={x:10,y:10};
let snakelen=[{x:26,y:33},{x:26,y:34}];

iscolide=(snakelen)=>{
    //if snake collide with itself
    for(let i=1;i<snakelen.length;i++){
        if(snakelen[i].x==snakelen[0].x && snakelen[i].y==snakelen[0].y){
            if(initvel.x!=0 || initvel.y!=0){
            return true;
            }
            else{
            return false;
        }
        
    }
    }
    if(snakelen[0].x>41 || snakelen[0].x<0 || snakelen[0].y>41 || snakelen[0].y<0)
    return true;
    return false;
}

gameloop=()=>{
    

    //what happend when snake eat food
    if(food.x==snakelen[0].x && food.y==snakelen[0].y){
        foodsound.play();
        newscore=newscore+1;
        console.log(newscore);
        document.getElementById("score1").innerHTML="SCORE "+newscore;
        //place food to other position

        //increase the lenth of the snake
        snakelen.unshift({x:snakelen[0].x+initvel.x,y:snakelen[0].y+initvel.y});
        food={x:Math.round(1+(40-1)*Math.random()),y:Math.round(1+(40-1)*Math.random())}

    }

    board.innerHTML="";
    snakelen.forEach((ele,ind)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=ele.y;
        snakeElement.style.gridColumnStart=ele.x;
        if(ind==0)
        snakeElement.classList.add('head');
        else
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    foodElement=document.createElement('div');
    foodElement.style.gridColumnStart=food.x;
    foodElement.style.gridRowStart=food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    //moving snake
    // for(let i=snakelen.length-2;i>=0;i--){
    //     snakelen[i+1]={...snakelen[i]};
    // }
    // snakelen[0].x+=initvel.x;
    // snakelen[0].y+=initvel.y;
    
    snakelen.unshift({x:snakelen[0].x+initvel.x,y:snakelen[0].y+initvel.y});
    snakelen.pop();

    //game over
    if(iscolide(snakelen)){
        alert("GAME OVER");
        // board.innerHTML="GAME OVER";
        gameover.play();
        newscore=0;
        initvel={x:0,y:0};
        food={x:10,y:10};
        snakelen=[{x:26,y:33},{x:26,y:34}];
        

    }

}
 main=(currentTime)=>{
    window.requestAnimationFrame(main);
    if((currentTime-lastRender)/1000<1/speed)
    return;
    
    lastRender=currentTime;
    gameloop();
}



//game logic

//initial snake
// snakeElement=document.createElement('div');
//         snakeElement.style.gridRowStart=13;
//         snakeElement.style.gridColumnStart=13;
//         snakeElement.classList.add('head');
//         board.appendChild(snakeElement);

// //initial food
// foodElement=document.createElement('div');
//     foodElement.style.gridColumnStart=10;
//     foodElement.style.gridRowStart=10;
//     foodElement.classList.add('food');
//     foodElement.classList.add('ig');
//     board.appendChild(foodElement);

window.requestAnimationFrame(main);

window.addEventListener("keydown",(e)=>{
    console.log(e.key);
    if(e.key=="ArrowUp"){
        // console.log(e.key);
        if(initvel.y!=1){
            if(initvel.y!=-1){
                turn.play();
                }
        initvel.y=-1;
        initvel.x=0;
        }
    }
    if(e.key=="ArrowDown"){
        // console.log(e.key);
        if(initvel.y!=-1){
            if(initvel.y!=1){
                turn.play();
                }
        initvel.y=1;
        initvel.x=0;
        }

    }
    if(e.key=="ArrowLeft"){
        // console.log(e.key);
        if(initvel.x!=1){
            if(initvel.x!=-1){
                turn.play();
                } 
            initvel.x=-1;
        initvel.y=0;
        }
    }
    if(e.key=="ArrowRight"){
        // console.log(e.key);
        if(initvel.x!=-1){
            if(initvel.x!=1){
            turn.play();
            }
        initvel.x=1;
        initvel.y=0;
        }
    }
})

