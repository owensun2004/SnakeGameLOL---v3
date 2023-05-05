var slider=  document.getElementById("myRange");
var output= document.getElementById("demo");

var snakeSpeed=0;
function changeSpeed(){
  slider=  document.getElementById("myRange");
  output = document.getElementById("demo");
  output.innerHTML = slider.value;
  snakeSpeed=1000-output.innerHTML;
  console.log(snakeSpeed);
  
}
console.log("after:"+snakeSpeed);
/*
slider.oninput = function() {
  output.innerHTML = this.value;
  snakeSpeed=1000-output.innerHTML;
  
}



function slider_set(){
    output.innerHTML  = slider.value;   
     
}
slider.addEventListener('input', slider_set);
snakeSpeed=1000-output.innerHTML;
console.log(snakeSpeed);


*/