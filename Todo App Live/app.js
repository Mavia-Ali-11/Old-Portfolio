// Code of Date, Time & Day used in Todo List UI

var d = new Date();
var date = d.getDate();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var month = months[d.getMonth()];
var year = d.getFullYear();
var day = days[d.getDay()];

var todayDate = document.getElementById("todayDate");
var todayMonth = document.getElementById("todayMonth");
var todayYear = document.getElementById("todayYear");
var dateText = document.createTextNode(date);
var monthText = document.createTextNode(month);
var yearText = document.createTextNode(year);
todayDate.appendChild(dateText);
todayMonth.appendChild(monthText);
todayYear.appendChild(yearText);
var todayDay = document.getElementById("day");
var dayText = document.createTextNode(day);
todayDay.appendChild(dayText);

if(day == "Wednesday" || day == "Thursday" || day == "Saturday") {
    todayDay.style.paddingLeft = "80px";
}

else if (day == "Friday") {
    todayDay.style.paddingLeft = "100px";
}

else {
    todayDay.style.paddingLeft = "90px";
}

// Code of Add Todo Button

var input = document.getElementById("todo");

function addTodo() {
    if(input.value == "") {
        alert("Can't be empty!\nPlease enter something");
    }
    else {
        var key = firebase.database().ref('todoList').push().key;
        var data = {
        item: input.value,
        key: key
        }
        firebase.database().ref('todoList/' + key).set(data);
        return data;
    }    
}

input.onkeypress = function() {
    if(event.keyCode == 13) {
        addTodo();
    }
}

// Code of getting data from FireBase to display in Todo App 

function getData() {
    firebase.database().ref('todoList').on('child_added',function(data){
        var input = document.getElementById("todo");
        var taskList = document.getElementById("taskList");
        input.value = "";
        taskList.innerHTML += `<li>
        <div>
            <input type="text" id="task" value='${data.val().item}' spellcheck="false" disabled>
        </div><div>
            <i class="fa fa-pencil" id="editBtn" onclick="editTask('${data.val().key}',this)"></i>
            <i class="fa fa-minus" id="deleteBtn" onclick="deleteTask('${data.val().key}',this)"></i>
        </div>
    </li> `        
    });
}

getData();

// Code of Delete Todo Item Button

function deleteTask(key,element) {
    firebase.database().ref('todoList').child(key).remove();
    element.parentElement.parentElement.remove();
}

// Code of Edit Todo Item Button

function editTask(key,element) {
    if(element.getAttribute("class") == "fa fa-pencil") {
        pencil(element);
    }
    else if(element.getAttribute("class") == "fa fa-check") {
        check(key,element);
    }
}


function pencil(element) {
    var innerInp = element.parentElement.previousSibling.childNodes[1];
    innerInp.disabled = false;
    innerInp.focus();
    innerInp.selectionStart = innerInp.selectionEnd = innerInp.value.length;
    innerInp.setAttribute('class', 'edit');
    element.setAttribute("class","fa fa-check");
    element.style.backgroundColor = "royalblue";
    element.style.padding = '6px';
}

function check(key,element) {
    var innerInp = element.parentElement.previousSibling.childNodes[1];
    if(innerInp.value == "") {
        alert("Can't be empty!\nPlease enter something");    
    }
    else {
        firebase.database().ref('todoList').child(key).set({
            item: innerInp.value,
            key: key
        });
        innerInp.disabled = true;
        innerInp.removeAttribute('class');
        element.setAttribute("class","fa fa-pencil");
        element.style.backgroundColor = "seagreen";
        element.style.padding = '6px 8px';
    }   
}

// Coding of Delete All Todo Item Button

function deleteAll() {
    firebase.database().ref('todoList').remove();
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
}