// Code of Date, Time & Day used in Todo List UI

var d = new Date();
var date = d.getDate();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var month = months[d.getMonth()];
var year = d.getFullYear();
var day = days[d.getDay()];

var todayDate = document.getElementById("date");
var todayMonth = document.getElementById("month");
var todayYear = document.getElementById("year");
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

function addTodo() {
    var input = document.getElementById("todo");

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

// Code of getting data from FireBase to display in Todo App 

function getData() {
    firebase.database().ref('todoList').on('child_added',function(data){
        var input = document.getElementById("todo");
        var list = document.getElementById("list");
        var key = document.createElement("p");
        var keyText = document.createTextNode(data.val().key);
        key.appendChild(keyText);
        var elem = document.createElement("input");
        elem.setAttribute("id","task");
        elem.setAttribute("spellcheck","false");
        elem.disabled = true;
        elem.value = data.val().item;
        list.appendChild(elem);
        list.appendChild(key);
        key.hidden = true;
        var dltBtn = document.createElement("i");
        var editBtn = document.createElement("i");
        dltBtn.setAttribute("id","dltBtn");
        editBtn.setAttribute("id","editBtn");
        var i = data.val().item;
        dltBtn.setAttribute("onclick","dltTask(this)");
        editBtn.setAttribute("onclick","editTask(this)");
        dltBtn.setAttribute("class","fa fa-trash");
        editBtn.setAttribute("class","fa fa-pencil");
        list.appendChild(dltBtn);
        list.appendChild(editBtn);
        input.value = "";
    });
}

getData();

// Code of Delete Todo Item Button

function dltTask(x) {
    firebase.database().ref('todoList').child(x.previousSibling.innerHTML).remove();
    x.previousSibling.previousSibling.remove();
    x.previousSibling.remove();
    x.nextSibling.remove();
    x.remove();
}

// Code of Edit Todo Item Button

function editTask(y) {
    if(y.getAttribute("class") == "fa fa-pencil") {
        pencil(y)
    }
    else if(y.getAttribute("class") == "fa fa-check") {
        check(y)
    }
}

function pencil(y) {
    var innerInp = y.previousSibling.previousSibling.previousSibling;
    innerInp.disabled = false;
    innerInp.focus();
    y.removeAttribute("class","fa fa-pencil");
    y.setAttribute("class","fa fa-check");
    y.style.backgroundColor = "dodgerblue";
    innerInp.style.borderBottom = "2px solid slateblue";
}

function check(y) {
    var innerInp = y.previousSibling.previousSibling.previousSibling;
    if(innerInp.value == "") {
        alert("Can't be empty!\nPlease enter something");    
    }
    else {
        firebase.database().ref('todoList').child(y.previousSibling.previousSibling.innerHTML).set({
            item: innerInp.value,
            key: y.previousSibling.previousSibling.innerHTML
        });
        innerInp.disabled = true;
        y.removeAttribute("class","fa fa-check");
        y.setAttribute("class","fa fa-pencil");
        y.style.backgroundColor = "green";
        innerInp.style.borderBottom = "2px solid dodgerblue";
    }   
}

// Coding of Delete All Todo Item Button

function deleteAll() {
    firebase.database().ref('todoList').remove();
    var list = document.getElementById("list");
    list.innerHTML = "";
}