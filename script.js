const createContainer = (tag, style) => {
  const retag = document.createElement(tag);
  retag.classList.add(style);
  return retag;
};

let widthscreen = 600;
if(document.documentElement.clientWidth <768){
  widthscreen = 300;
}

const audio = new Audio("");

let currentsize = 3;
let arr = [];
let linearr = [];
let currentarr = [];
let moves = 0;
let minute = 0;
let second = 0;
let inter;
let onoff = false;
let load = false;


createarray(currentsize);


document.body.append(createContainer("div","content"));
let content = document.getElementsByClassName("content")[0];
content.append(createContainer("div","navigation"));
content.append(createContainer("div","information"));
content.append(createContainer("div","field"));
content.append(createContainer("p","size"));
content.append(createContainer("p","size"));

let navigation = document.getElementsByClassName("navigation")[0];
navigation.append(createContainer("input","navigation-button"));
navigation.append(createContainer("input","navigation-button"));
navigation.append(createContainer("input","navigation-button"));
navigation.append(createContainer("input","navigation-button"));
navigation.childNodes[0].type = "button";
navigation.childNodes[1].type = "button";
navigation.childNodes[2].type = "button";
navigation.childNodes[3].type = "button";
navigation.childNodes[0].value = "Shuffle and start";
navigation.childNodes[1].value = "Stop";
navigation.childNodes[2].value = "Save";
navigation.childNodes[3].value = "Results";
navigation.childNodes[0].onclick = function(){
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  createarray(currentsize, "new");
  createfield(currentsize);
  minute = 0;
  second = 0;
  information.childNodes[1].textContent = `Time: ${minute}m : ${second}s`;
  clearInterval(inter);
  uptime();
}
navigation.childNodes[1].onclick = function(){
  if(navigation.childNodes[1].style.background == "gray"){
    navigation.childNodes[1].style = "";
    uptime();
  }else{
    stop();
  }
}
navigation.childNodes[2].onclick = function(){
  save();
}

let information = document.getElementsByClassName("information")[0];
information.append(createContainer("span","span-text"));
information.append(createContainer("span","span-text"));

information.childNodes[0].textContent = `Moves: ${moves}`;
information.childNodes[1].textContent = `Time: ${minute}m : ${second}s`;

createfield(currentsize);

let size = document.getElementsByClassName("size");
size[0].textContent = `Frame size: ${currentsize} x ${currentsize}`;
size[1].textContent = "Other sizes: ";
size[1].append(createContainer("a","link-sizes"));
size[1].append(createContainer("a","link-sizes"));
size[1].append(createContainer("a","link-sizes"));
size[1].append(createContainer("a","link-sizes"));
size[1].append(createContainer("a","link-sizes"));
size[1].append(createContainer("a","link-sizes"));
let sizeall = document.getElementsByClassName("link-sizes");
sizeall[0].textContent = "3x3";
sizeall[1].textContent = "4x4";
sizeall[2].textContent = "5x5";
sizeall[3].textContent = "6x6";
sizeall[4].textContent = "7x7";
sizeall[5].textContent = "8x8";
sizeall[0].href = "#";
sizeall[1].href = "#";
sizeall[2].href = "#";
sizeall[3].href = "#";
sizeall[4].href = "#";
sizeall[5].href = "#";
sizeall[0].onclick = function() {
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  currentsize = 3;
  createarray(currentsize, "new");
  createfield(currentsize);
  size[0].textContent = `Frame size: ${currentsize} x ${currentsize}`;
}

sizeall[1].onclick = function() {
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  currentsize = 4;
  createarray(currentsize, "new");
  createfield(currentsize);
  size[0].textContent = `Frame size: ${currentsize} x ${currentsize}`;
}

sizeall[2].onclick = function() {
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  currentsize = 5;
  createarray(currentsize, "new");
  createfield(currentsize);
  size[0].textContent = `Frame size: ${currentsize} x ${currentsize}`;
}

sizeall[3].onclick = function() {
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  currentsize = 6;
  createarray(currentsize, "new");
  createfield(currentsize);
  size[0].textContent = `Frame size: ${currentsize} x ${currentsize}`;
}

sizeall[4].onclick = function() {
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  currentsize = 7;
  createarray(currentsize, "new");
  createfield(currentsize);
  size[0].textContent = `Frame size: ${currentsize} x ${currentsize}`;
}

sizeall[5].onclick = function() {
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  currentsize = 8;
  createarray(currentsize, "new");
  createfield(currentsize);
  size[0].textContent = `Frame size: ${currentsize} x ${currentsize}`;
}

content.append(createContainer("div","musicdiv"));
let musicdiv = document.getElementsByClassName("musicdiv");
musicdiv[0].append(createContainer("input","music"));


let music = document.getElementsByClassName("music");
music[0].type = "checkbox";
music[0].name = "checkbox";
music.checked = true;
music[0].onclick = function(){
  if (music[0].checked) {
    audio.src = "assets/audio/large-button-depress_z10ogpnd.mp3";
  }
  else {
    audio.src = "";
  }
}


musicdiv[0].append(createContainer("label","labelmusic"));
let labelmusic = document.getElementsByClassName("labelmusic");
labelmusic[0].for = "checkbox";
labelmusic[0].textContent = "    music on/off";


function createfield(size) {
  let field = document.getElementsByClassName("field")[0];
  field.style.gridTemplateColumns = `repeat(${size}, ${widthscreen/size}px)`;
  field.style.gridTemplateRows = `repeat(${size}, ${widthscreen/size}px)`;
  for(let i = 0; i<size*size; i++){
    field.append(createContainer("div","cell"));
    let cell = document.getElementsByClassName("cell");
    cell[i].style.width = `${widthscreen/size-2}px`;
    cell[i].style.height = `${widthscreen/size-2}px`;
    cell[i].onclick = function(){
      //console.log("cell click");
      selectcell(cell[i].textContent, size, cell[i]);
      //audio.stop();
    }
    if(i<size*size){cell[i].textContent = linearr[i].toString(); cell[i].style.background = "white"; if(cell[i].textContent == ""){cell[i].style.background = "gray";}}
  }
  moves = 0;
  if(load == true){
    moves = parseInt(localStorage.getItem("moves"));
    minute = parseInt(localStorage.getItem("minute"));
    second = parseInt(localStorage.getItem("second"));
    information.childNodes[1].textContent = `Time: ${minute}m : ${second}s`;
    load = false;
  }
  information.childNodes[0].textContent = `Moves: ${moves}`;
}

function selectcell(text, size, cell){
  //console.log(typeof(arr[0][1]));
  //console.log(typeof(text));
  //console.log(size);
  let temp = "";
  for(let i = 0; i<size; i++){
    for(let k = 0; k<size; k++){
      if(arr[i][k] == text){
        if(k+1 < size && arr[i][k+1] == ""){console.log("right"); audio.play(); cell.style.animation = "slideright 0.3s ease-in"; temp = arr[i][k]; arr[i][k] = arr[i][k+1]; arr[i][k+1] = temp; swapcell(); setTimeout(refield, 300); break;};
        if(i-1 >= 0 && arr[i-1][k] == ""){console.log("down"); audio.play(); cell.style.animation = "slidedown 0.3s ease-in"; temp = arr[i][k]; arr[i][k] = arr[i-1][k]; arr[i-1][k] = temp; swapcell(); setTimeout(refield, 230); break;};
        if(k-1 >= 0 && arr[i][k-1] == ""){console.log("left"); audio.play(); cell.style.animation = "slideleft 0.3s ease-in"; temp = arr[i][k]; arr[i][k] = arr[i][k-1]; arr[i][k-1] = temp; swapcell(); setTimeout(refield, 300); break;};
        if(i+1 < size && arr[i+1][k] == ""){console.log("top"); audio.play(); cell.style.animation = "slidetop 0.3s ease-in"; temp = arr[i][k]; arr[i][k] = arr[i+1][k]; arr[i+1][k] = temp; swapcell(); setTimeout(refield, 230); break;};
      }
    }
    if(temp != ""){break;}
  }
  compareresult();
}

function swapcell(){
  let c = 0;
  for(let i = 0; i<currentsize; i++){
    for(let k = 0; k<currentsize; k++){
      linearr[c] = arr[i][k];
      c+=1;
    }
  }
}

function refield(){
  let coun = 0;
  content.childNodes[2].remove();
  information.after(createContainer("div","field"));
  let field = document.getElementsByClassName("field")[0];
  field.style.gridTemplateColumns = `repeat(${currentsize}, ${widthscreen/currentsize}px)`;
  field.style.gridTemplateRows = `repeat(${currentsize}, ${widthscreen/currentsize}px)`;
  for(let i = 0; i<currentsize*currentsize; i++){
    field.append(createContainer("div","cell"));
    let cell = document.getElementsByClassName("cell");
    cell[i].style.width = `${widthscreen/currentsize-2}px`;
    cell[i].style.height = `${widthscreen/currentsize-2}px`;
    //console.log("refield");
    cell[i].onclick = function(){
      selectcell(cell[i].textContent, currentsize, cell[i]);
    }
    if(i<currentsize*currentsize){cell[i].textContent = linearr[i].toString(); cell[i].style.background = "white"; if(cell[i].textContent == ""){cell[i].style.background = "gray";}}
  }
  moves +=1;
  information.childNodes[0].textContent = `Moves: ${moves}`;
}

function createarray(size, tag) {
  let counter = 0;
  arr = [];
  linearr = [];
  let con = 0;
  for(let i = 1; i<size*size; i++){
    linearr[con] = i.toString();
    con +=1;
  }
  linearr[size*size-1] = '';
  shuffle(linearr);

  if(localStorage.getItem('check') == 'true' && tag != "new"){
    linearr = localStorage.getItem("savearr").split(",");
    currentsize = localStorage.getItem("currentsize");
    size = currentsize;
    load = true;
  }

  for(let i = 0; i<size; i++){
    arr[i] = [];
    for(let k = 0; k<size; k++){
      arr[i][k] = linearr[counter];
      counter +=1;
      if(arr[i][k] == undefined){arr[i][k]="";}
    }
  }
  for(let i = 0; i<currentsize*currentsize; i++){
    currentarr[i] = linearr[i];
  }
  currentarr.sort();
  currentarr.shift();
  currentarr.push("");
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}



function compareresult() {
  if(linearr.join('') == currentarr.join('')){
    document.body.append(createContainer("div","modalsave"));
    let modalsave = document.getElementsByClassName("modalsave")[0];
    modalsave.append(createContainer("p","modalheader"));
    modalsave.append(createContainer("p","username"));
    modalsave.append(createContainer("input","idusername"));
    modalsave.append(createContainer("input","usernamesubmit"));
    let modalheader = document.getElementsByClassName("modalheader")[0];
    modalheader.textContent = `Hooray! You solved the puzzle in ${minute}:${second} and ${moves} moves!`;
    let username = document.getElementsByClassName("username")[0];
    username.textContent = "Enter name:";
    let idusername = document.getElementsByClassName("idusername")[0];
    idusername.type = "text";
    idusername.maxlength = "10";
    idusername.value = "balaxon";
    let usernamesubmit = document.getElementsByClassName("usernamesubmit")[0];
    usernamesubmit.type = "button";
    usernamesubmit.value = "save";
    usernamesubmit.onclick = function(){
      resultat(idusername.value);
      modalsave.style.visibility = "hidden";
      for(let i = 0; i<currentsize*currentsize; i++){
        let cell = document.getElementsByClassName("cell");
        cell[i].onclick = function(){
        }
      }
    }
  }
}

uptime();

function uptime() {
    inter = setInterval(tick,1000);
}

function tick() {
  second+=1;
  if(second == 60){second = 0;minute += 1;}
  information.childNodes[1].textContent = `Time: ${minute}m : ${second}s`;
}

function save(){
  if(onoff == false){
    localStorage.setItem('savearr', linearr);
    localStorage.setItem('check', 'true');
    localStorage.setItem('currentsize', currentsize);
    localStorage.setItem('moves', moves);
    localStorage.setItem('minute', minute);
    localStorage.setItem('second', second);
    onoff = true;
  }else{
    
  }
}

function stop() {
  for(let i = 0; i<currentsize*currentsize; i++){
    let cell = document.getElementsByClassName("cell");
    cell[i].onclick = function(){
    }
  }
  navigation.childNodes[1].style.background = "gray";
  clearInterval(inter);
}

function resultat(name) {
  let result = {
    name: [],
    moves: [],
    minute: [],
    second: [],
    size: []
  }
  let currentresstring = `${name}+${moves}+${minute}+${second}+${currentsize}x${currentsize}`;

  if(localStorage.getItem("result") != null){
    let res = getresult();
    console.log(res);
    if(res.length<10){
      
    }else{

    }
  }else{
    localStorage.setItem("result",currentresstring);
  }
}

function getresult() {
  let test = [];
  let test2 = [];
  
  test = localStorage.getItem("result").split(";;");
  test2 = test[0].split("+");
  let res = [];
  for(let i = 0; i<test.length;i++){
    test2 = test[i].split("+");
    res[i] = [];
    for(let k = 0; k<test2.length; k++){
      res[i][k] = test2[k].split("+").toString();
    }
  }
  //test2 = test[0].split("+");
  console.log(test);
  console.log(test2);
  console.log(res);
  return res;
}