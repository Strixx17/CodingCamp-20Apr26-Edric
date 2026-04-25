// ================= TIME =================

function updateTime() {

const now = new Date();

document.getElementById("time")
.innerText = now.toLocaleTimeString();

document.getElementById("date")
.innerText = now.toDateString();

const hour = now.getHours();

let greeting = "Hello";

if (hour < 12)
greeting = "Good Morning";

else if (hour < 18)
greeting = "Good Afternoon";

else
greeting = "Good Evening";

const name =
localStorage.getItem("name") || "";

document.getElementById("greeting")
.innerText =
`${greeting} ${name}`;

}

updateTime();

setInterval(updateTime,1000);


// ================= NAME =================

const nameInput =
document.getElementById("nameInput");

nameInput.value =
localStorage.getItem("name") || "";

nameInput.oninput = () => {

localStorage.setItem(
"name",
nameInput.value
);

};


// ================= THEME =================

function toggleTheme() {

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
);

}

if (
localStorage.getItem("theme") === "true"
) {

document.body.classList.add("dark");

}


// ================= TIMER =================

let timer = null;

let timeLeft =
localStorage.getItem("pomodoro") * 60
|| 1500;

function setPomodoro() {

const minutes =
document.getElementById("pomodoroInput").value;

if (!minutes) return;

timeLeft = minutes * 60;

localStorage.setItem(
"pomodoro",
minutes
);

updateTimer();

}

function startTimer() {

if (timer) return;

timer = setInterval(() => {

timeLeft--;

if (timeLeft <= 0) {

clearInterval(timer);

timer = null;

alert("Time's up!");

}

updateTimer();

},1000);

}

function stopTimer() {

clearInterval(timer);

timer = null;

}

function resetTimer() {

stopTimer();

timeLeft =
localStorage.getItem("pomodoro") * 60
|| 1500;

updateTimer();

}

function updateTimer() {

let m = Math.floor(timeLeft/60);

let s = timeLeft%60;

document.getElementById("timer")
.innerText =
`${m}:${s<10?"0":""}${s}`;

}

updateTimer();


// ================= TASK =================

let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

function saveTasks() {

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}

function renderTasks() {

const list =
document.getElementById("taskList");

list.innerHTML="";

tasks.forEach((task,i)=>{

const li =
document.createElement("li");

li.innerHTML=`

<span class="${task.done?"done":""}">
<input type="checkbox"
${task.done?"checked":""}
onclick="toggleTask(${i})">

${task.text}

</span>

<button onclick="deleteTask(${i})">
Delete
</button>

`;

list.appendChild(li);

});

}

function addTask() {

const input =
document.getElementById("taskInput");

const text =
input.value.trim();

if (!text) return;

// prevent duplicate
if (
tasks.some(t=>t.text===text)
) {

alert("Task already exists!");

return;

}

tasks.push({

text:text,

done:false

});

input.value="";

saveTasks();

renderTasks();

}

function deleteTask(i){

tasks.splice(i,1);

saveTasks();

renderTasks();

}

function toggleTask(i){

tasks[i].done =
!tasks[i].done;

saveTasks();

renderTasks();

}


// ================= SORT =================

function sortTasks(){

const type =
document.getElementById("sortSelect").value;

if (type==="az"){

tasks.sort(
(a,b)=>a.text.localeCompare(b.text)
);

}

else if (type==="done"){

tasks.sort(
(a,b)=>b.done-a.done
);

}

saveTasks();

renderTasks();

}

renderTasks();


// ================= LINKS =================

let links =
JSON.parse(localStorage.getItem("links"))
|| [];

function saveLinks(){

localStorage.setItem(
"links",
JSON.stringify(links)
);

}

function renderLinks(){

const container =
document.getElementById("links");

container.innerHTML="";

links.forEach(link=>{

const btn =
document.createElement("button");

btn.innerText=
link.name;

btn.onclick=
()=>window.open(link.url);

container.appendChild(btn);

});

}

function addLink(){

const name=
document.getElementById("linkName").value;

const url=
document.getElementById("linkURL").value;

if(!name||!url) return;

links.push({name,url});

saveLinks();

renderLinks();

}

renderLinks();