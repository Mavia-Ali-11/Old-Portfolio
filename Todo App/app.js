function addTodo() {
    var input = document.getElementById("todo");
    if(input.value == "") {
        alert("Can't be empty!\nPlease enter something");
    }
    else {
        var list = document.getElementById("list");
        var elem = document.createElement("input");
        elem.setAttribute("id","task");
        elem.setAttribute("spellcheck","false");
        elem.disabled = true;
        elem.value = input.value;
        list.appendChild(elem);
        var dltBtn = document.createElement("i");
        var editBtn = document.createElement("i");
        dltBtn.setAttribute("id","dltBtn");
        editBtn.setAttribute("id","editBtn");
        dltBtn.setAttribute("onclick","dltTask(this)");
        editBtn.setAttribute("onclick","editTask(this)");
        dltBtn.setAttribute("class","fa fa-trash");
        editBtn.setAttribute("class","fa fa-pencil");
        list.appendChild(dltBtn);
        list.appendChild(editBtn);
        input.value = "";
    }    
}

function deleteAll() {
    var list = document.getElementById("list");
    list.innerHTML = "";
}

function dltTask(x) {
    x.previousSibling.remove();
    x.nextSibling.remove();
    x.remove();
}

function pencil(y) {
    var innerInp = y.previousSibling.previousSibling;
    innerInp.disabled = false;
    innerInp.focus();
    y.removeAttribute("class","fa fa-pencil");
    y.setAttribute("class","fa fa-check");
    y.style.backgroundColor = "dodgerblue";
    innerInp.style.borderBottom = "2px solid dodgerblue";
}

function check(y) {
    var innerInp = y.previousSibling.previousSibling;
    if(innerInp.value == "") {
        alert("Can't be empty!\nPlease enter something");    
    }
    else {
        innerInp.disabled = true;
        y.removeAttribute("class","fa fa-check");
        y.setAttribute("class","fa fa-pencil");
        y.style.backgroundColor = "slateblue";
        innerInp.style.borderBottom = "2px solid steelblue";
    }   
}

function editTask(y) {
    if(y.getAttribute("class") == "fa fa-pencil") {
        pencil(y)
    }
    else if(y.getAttribute("class") == "fa fa-check") {
        check(y)
    }
}

