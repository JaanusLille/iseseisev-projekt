/*jshint esversion:6*/
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

class Exercise{
  constructor(distance, time, height, weight, speed1, calories1, date){
    this.distance = distance;
    this.time = time;
    this.height = height;
    this.weight = weight;
    this.speed1 = speed1;
    this.calories1 = calories1;
    this.date = date;
    this.done = false;
  }
}

class Element{
  constructor(){
    this.exerciseLog = JSON.parse(window.localStorage.getItem('exerciseLog')) || [];

    document.querySelector('#addButton').addEventListener('click', () => this.addElement());

    this.render();
  }

  render(){
    if(document.querySelector('.board')){
      document.body.removeChild(document.querySelector('.board'));
    }

    const ul = document.createElement('ul');
    ul.className = 'board';

    this.exerciseLog.forEach((jog, jogIndex)=>{
      const li = document.createElement('li');
      const removeThis = document.createElement('div');
      const removeIcon = document.createTextNode('\u00D7');

      li.classList.add('jog');
      removeThis.className = "delete";

      li.addEventListener('click', (event)=>{

        if(jog.done){
          jog.done = false;
        }else{
          jog.done = true;
        }

        this.saveInLocalStorage();
        this.render();
      });

      removeThis.addEventListener('click', ()=>{
        ul.removeChild(li);
        this.exerciseLog = this.exerciseLog.slice(0, jogIndex).concat(this.exerciseLog.slice(jogIndex + 1, this.exerciseLog.length));
        this.saveInLocalStorage();
      });

      if(jog.done){
        li.style.backgroundColor = "CornflowerBlue ";
        li.style.textDecoration = "line-through";
      }

      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }

      today = yyyy + '-' + mm + '-' + dd;
      if(jog.date == today){
        li.style.border = "2px solid red";
      }

      removeThis.appendChild(removeIcon);
      li.innerHTML = `${jog.distance} <br> ${jog.time} <br> ${jog.height} <br> ${jog.weight} <br> ${jog.speed1} <br> ${jog.calories1} <br> ${jog.date}`;
      li.appendChild(removeThis);
      ul.appendChild(li);

    });

    document.body.appendChild(ul);
  }

  addElement(){
    const distanceValue = document.querySelector('#distance').value  + " - - - - - - - - - - meetrit (m)";
    const timeValue = document.querySelector('#time').value  + " - - - - - - - - - - minutit (min)";
    const heightValue = document.querySelector('#height').value  + " - - - - - - - - - - sentimeetrit (cm)";
    const weightValue = document.querySelector('#weight').value  + " - - - - - - - - - - kilogrammi (kg)";
    const dateValue = document.querySelector('#date').value  + " - - - - - - - - - - kuupäev";
    const speed1Value = speed1 + " - - - - - - - - - - meetrit minutis (m/min)";
    const calories1Value = calories1  + " - - - - - - - - - - kilokalorit (kcal)";

    this.exerciseLog.push(new Exercise(distanceValue, timeValue, heightValue, weightValue, speed1Value, calories1Value, dateValue));

    this.saveInLocalStorage();

    this.render();
  }

  saveInLocalStorage(){
    window.localStorage.setItem('exerciseLog', JSON.stringify(this.exerciseLog));
  }
}

const newJog = new Element();
