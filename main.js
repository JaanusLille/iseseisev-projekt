/*jshint esversion: 6*/
window.onload = function (){
let distance;
let time;
let height;
let weight;
let speed;
let calories;

let x;
let y;
let z;

  distance = document.getElementById("distance");
  distance.addEventListener("input", findData);

  time = document.getElementById("time");
  time.addEventListener("input", findData);

  height = document.getElementById("height");
  height.addEventListener("input", findData);

  weight = document.getElementById("weight");
  weight.addEventListener("input", findData);

  speedLabel = document.getElementById("speed");

  caloriesLabel = document.getElementById("calories");

  findData();

}

var num = 5.56789;
var n = num.toFixed(2);

function findData() {
  speed = (distance.value/time.value);

  speed1 = speed.toFixed(3);

  x = (0.035 * weight.value);
  y = (speed * speed);
  z = (y/height.value);
  calories = (((x + z) * 0.029) * time.value);

  calories1 = calories.toFixed(3);


  speedLabel.innerHTML = speed1;
  caloriesLabel.innerHTML = calories1;
}
