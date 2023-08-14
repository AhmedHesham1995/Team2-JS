let start = function () {
   let name = prompt('what is your name?');
    if(name==null||name==""){
        document.querySelector(".start .hello span").innerHTML= "خضر كراويتة";
    }
    else  {
        document.querySelector(".start .hello span").innerHTML= name;
    }

    document.querySelector(".start-game").remove();
    document.getElementById("song").play();
    }

    document.querySelector("button").addEventListener("click",function(){
    window.location.reload("refresh");
    
 })
 

let duration = 1000;

let block = document.querySelector(".gameBlocks");

let blocks = Array.from(block.children);

let orderArray = Array.from(Array.from(block.children).keys());


document.querySelector(".start-game span").addEventListener("click",function(){

    start();

    blocks.forEach((block) => {
        block.classList.add("is-flipped");
    });
    
       
    setTimeout(()=>{
    
        blocks.forEach((block) => {
            block.classList.remove("is-flipped");
        });
    
    },3000)
})

random(orderArray);

blocks.forEach((block,index) => {
    block.style.order = orderArray[index];
    block.addEventListener("click",function(){
        flip(block);
        
    })
});

function random(array){
    let current = array.length;
    while(current > 0){
        let random = Math.floor(Math.random()*current);
        let store;
        current--;
        store = array[current];
        array[current] = array[random];
        array[random] = store;
    }
    return array;
}

function flip(ele){
    ele.classList.add("is-flipped");
    let flippedCards = blocks.filter(e=>e.classList.contains("is-flipped"));
    if (flippedCards.length==2){
        noFlip();
        checkCards(flippedCards[0],flippedCards[1]);
    }
}

function noFlip(){
    block.classList.add("no-flip");
    setTimeout(()=>{
        block.classList.remove("no-flip");
    },duration);
    
}

function checkCards(firstBlock,secondBlock){
    let Wrong =  document.querySelector(".start .tries span");
    if(firstBlock.dataset.soccer===secondBlock.dataset.soccer){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("matched");
        secondBlock.classList.add("matched");
        document.getElementById("success").play();
    }

    else {
       Wrong.innerHTML = parseInt(Wrong.innerHTML)+1;
       setTimeout(()=>{
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
       },duration)
       document.getElementById("fail").play();
    }
   
    finish(Wrong.innerHTML);

}

function finish(score){
if(document.querySelectorAll(".matched").length==20){
    let end = document.createElement("div");
    end.classList.add("end-game");

    
    let congSpan = document.createElement("span");

    congSpan.className = "cong";

    let HighScore = 20-score;

    if (score == 0){
        
        congSpan.appendChild(document.createTextNode(`Your score is ${HighScore}.. Perfection!
         (Apple AirPods Pro) are for U`));
       
    }

    else if (score <= 5){
       
        congSpan.appendChild(document.createTextNode(`Your score is ${HighScore}.. Well done!
         (A Designer handbag) is for U`));
        
    }

    else if (score<=10){
       
        congSpan.appendChild(document.createTextNode(`Your score is ${HighScore}.. Not Bad!
         (Stylish sunglasses) are for U`));
        
    }

    else {
        
        congSpan.appendChild(document.createTextNode(`Your score is ${HighScore}.. Sorry! try Again`));
       
    }

    let tryAgain = document.createElement("span");
    tryAgain.className = "span";
    tryAgain.appendChild(document.createTextNode("Try Again"));
    
    end.appendChild(congSpan);
    end.appendChild(tryAgain);

    document.body.appendChild(end);

    document.querySelector(".end-game .span").addEventListener("click",function(){
       window.location.reload("refresh");
       
    })

    }
}
