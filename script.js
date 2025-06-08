var questions = [
    {
        question: "worlds lorgest contry?",
        options: ["africa", "amarica", "asia", "china"],
        correct: "asia"
    },
    {
        question: "how many colors using in traffic signal lights ?",
        options: ["3", "1", "6", "4"],
        correct: "3"
    },
    {
        question: "worlds lorgest river?",
        options: ["ganga", "brama buthra", "kaveri", "nile"],
        correct: "nile"
    },
    {
        question: "which is lorgest number?",
        options: ["98", "4", "23", "65"],
        correct: "98"
    },
    {
        question: "india's national bird?",
        options: ["peacock", "swang", "parrot", "ken"],
        correct: "peacock"
    }
]
var currentQuesIndex = 0;
var score = 0;

var forms = document.getElementById("form-id");
var questionEl = document.getElementById("questionele");
var submitBtn = document.getElementById("sub-btn");
var nextBtn = document.getElementById("next-btn");
var quesCount=document.getElementById("quescount")

//prgrsbar
var hprgrscont=document.getElementById("hprgrs-container");
var hprgrsbar=document.getElementById("hprgrs-bar")

//timer
var timer=document.getElementById("timer");

var timeInterval;
var interval=15;
showTime();
function showTime(){
    clearInterval(timeInterval);
    interval=15;
    timer.textContent=`Timer Left ${interval}`;
    
    timeInterval=setInterval(()=>{
    interval--;
    timer.textContent=`Timer Left ${interval}`;
    if(interval<=0){
        clearInterval(timeInterval)
        autonext();
    }

    },1000 );

}

function autonext(){
       submitBtn.style.display="none";
       nextBtn.style.display="block";

}

function showQuestion() {
    clearInterval(interval);
    showTime();
    var randIndex = Math.floor(Math.random() * questions.length);
    var currQues = questions.splice(randIndex, 1)[0];

    var curruntquestion=currQues.question;
    var quesNum = currentQuesIndex + 1;
    quesCount.innerHTML=`${quesNum} of ${questions.length} Questions`;
    
    questionEl.innerText = quesNum + "." + curruntquestion;
//show buttons
    forms.innerHTML = "";

    for (let i = 0; i < currQues.options.length; i++) {
        const option = currQues.options[i];
        const html = `<input type="radio"  id="${i}" name="option" value="${option}"><label for="option${i}">${option}</label>`;
        forms.innerHTML += html;
    }
   submitBtn.style.display="block";
   nextBtn.style.display="none";

    }
    //when user selecting button
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var selected = document.querySelector('input[name="option"]:checked');
    
    if(!selected){
        alert("plese select ur answer");
    }
      var answer=selected.value;
 
         if( answer===questions[currentQuesIndex].correct){
        console.log("masss");
       
    score++;
 prgrssbaar();
      } 

   else{

    console.log("not correct")
    }
   clearInterval(interval);
submitBtn.style.display="none";
nextBtn.style.display="block";
});
function prgrssbaar(){
 var scrper=(score/questions.length)*100;
hprgrsbar.style.width=scrper+"%";
hprgrsbar.textContent=Math.round(scrper)+"%";
console.log(scrper)
}


function next(){
currentQuesIndex++;
if(currentQuesIndex<questions.length){
showQuestion();
}

else{
alert("successfully finished");
hprgrsbar.style.display="none";
showScore();
}}

function showScore(){
    
     questionEl.innerHTML=`your score is${score}out of ${questions.length}`;
      
      var pers=(score/questions.length)*100;

      var prgrscontainer=document.createElement("div");
      
      var prgrsbar=document.createElement("div");
      prgrsbar.style.width=pers+"%";
      prgrsbar.textContent=Math.round(pers)+"%";
      
    


     var percentele=document.createElement("h4");
     percentele.innerHTML=`Your percentage is${pers}`;
   
      questionEl.appendChild(percentele);
    
     var remark=document.createElement("h4");

     if(pers>70){
          prgrsbar.style.backgroundColor="green";
     remark.innerText="good work";
     remark.style.color="green";
    }
else{
      prgrsbar.style.backgroundColor="red";
    remark.innerText="fine";
     remark.style.color="red";
    }
     questionEl.appendChild(remark);
prgrscontainer.appendChild(prgrsbar);
questionEl.appendChild(prgrscontainer)
     
     
     forms.style.display="none";
     
     nextBtn.style.display="none";
      
     var playagnbtn=document.createElement("button");
     playagnbtn.style.backgroundColor="pink";
     playagnbtn.innerText="Play Again";
     playagnbtn.style.padding="5px";
     playagnbtn.style.marginTop="2px";
     questionEl.appendChild(playagnbtn);

     playagnbtn.addEventListener("click", function(){
        currentQuesIndex=0;
        forms.style.display="block";
        prgrsbar.style.display="block"
          showQuestion();
     })
     

     
}

window.onload = function() {
    showQuestion();
}


    
    //const selected = document.querySelector('input[name="option"]:checked');



