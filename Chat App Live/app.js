function diplayUsers() {
    var status = sessionStorage.getItem("status");
    var startingPage = document.getElementById("startingPage");
    if (status == "online") {
        getUsers();
        getMessages();
        startingPage.style.opacity = "0.2";
    }
    else if (status == "offline") {
        closeChat();
    }
}

function signIn() {
    var users = document.getElementById("users");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var username = document.getElementById("username");

    if (email.value == "" || password.value == "") {
        email.setAttribute('class', 'error');
        password.setAttribute('class', 'error');
        username.setAttribute('class', 'error');
        setTimeout(function () {
            email.removeAttribute('class');
            password.removeAttribute('class');
            username.removeAttribute('class');
            alert("Empty input fields detected!\nPlease, fulfill all the requirements for signing in.");
        }, 300);
    }
    else {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then((result) => {
                sessionStorage.setItem("email", email.value);
                users.innerHTML = "";
                getUsers();
                getMessages();
                sessionStorage.removeItem("status");
                sessionStorage.setItem("status", "online");
                alert("SignIn Successfully!");
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
}

function signUp() {
    var users = document.getElementById("users");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var username = document.getElementById("username");

    if (email.value == "" || password.value == "" || username.value == "") {
        email.setAttribute('class', 'error');
        password.setAttribute('class', 'error');
        username.setAttribute('class', 'error');
        setTimeout(function () {
            email.removeAttribute('class');
            password.removeAttribute('class');
            username.removeAttribute('class');
            alert("Empty input fields detected!\nPlease, fulfill all the requirements for signing up.");
        }, 300);
    }

    else {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((result) => {
                var key = firebase.database().ref('Friends').push().key;
                var data = {
                    key: key,
                    name: username.value,
                    email: email.value,
                    password: password.value
                }
                firebase.database().ref('Friends/' + key).set(data);
                sessionStorage.setItem("email", email.value);
                users.innerHTML = "";
                getUsers();
                getMessages();
                sessionStorage.removeItem("status");
                sessionStorage.setItem("status", "online");
                alert("SignUp Successfully!");
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
}

function getUsers() {
    email.disabled = true;
    signin.disabled = true;
    signup.disabled = true;
    password.disabled = true;
    username.disabled = true;
    firebase.database().ref('Friends').on('child_added', function (data) {
        var addFriend = `<li class="list-group-item list-group-item-action" onclick="startChat()" style="cursor: pointer;">
            <div class="row">
                <div class="col-2 col-md-2">
                    <i class="fa fa-user-circle" id="friends"></i>
                </div>
                <div class="col-10 col-md-10">
                    <div id="name">${data.val().name}</div>
                    <div id="getEmail">${data.val().email}</div>
                </div>
            </div>
        </li>`
        if (sessionStorage.getItem("email") == data.val().email) {
            var usernameHere = document.getElementById("usernameHere");
            usernameHere.innerHTML = data.val().name;
            sessionStorage.setItem("key",data.val().key);
        }
        var users = document.getElementById("users");
        users.innerHTML += addFriend;
        var startingPage = document.getElementById("startingPage");
        startingPage.hidden = true;
        var letsChat = document.getElementById("letsChat");
        letsChat.hidden = false;
        var friendList = document.getElementById("friendList");
        friendList.style.opacity = "1";
        friendList.removeAttribute("onclick");
        var searchInput = document.getElementById("searchInput");
        searchInput.removeAttribute("disabled");
        var signout = document.getElementById("signout");
        signout.removeAttribute("disabled");
        var chatRoom = document.getElementById("chatRoom");
        chatRoom.setAttribute("onclick", "startChat()");
        showFriends();
    });
}

function notSignIn() {
    alert("You are not logged in!\nPlease signin / signup first to continue.")
}

function startChat() {
    hideFriends();
    var letsChat = document.getElementById("letsChat");
    var chatPage = document.getElementById("chatPage");
    letsChat.classList.remove("d-md-block");
    chatPage.hidden = false;
    var messages = document.getElementById("messages");
    messages.scrollTo(0, messages.scrollHeight);
}

function showFriends() {
    var friendList = document.getElementById("friendList");
    friendList.classList.remove("d-none", "d-md-block");
}

function friendsAgain() {
    var friendList = document.getElementById("friendList");
    var chatPage = document.getElementById("chatPage");
    chatPage.classList.add("d-none", "d-md-block");
    friendList.classList.remove("d-none", "d-md-block");
}

function hideFriends() {
    var friendList = document.getElementById("friendList");
    var chatPage = document.getElementById("chatPage");
    friendList.classList.add("d-none", "d-md-block");
    chatPage.classList.remove("d-none", "d-md-block");
    chatInput.focus();
}

function closeChat() {
    var users = document.getElementById("users");
    var usernameHere = document.getElementById("usernameHere");
    sessionStorage.removeItem("name");
    users.innerHTML = "";
    usernameHere.innerHTML = "";
    var startingPage = document.getElementById("startingPage");
    var chatPage = document.getElementById("chatPage");
    startingPage.setAttribute("style", "visiblity:visible");
    chatPage.hidden = true;
}

function signout() {
    sessionStorage.removeItem("status");
    sessionStorage.removeItem("email");
    sessionStorage.setItem("status", "offline");
    location.reload();
}

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup",function(e) {
    var searchItem = e.target.value.toLowerCase();
    var liItems = document.querySelectorAll("#friendsBody #name")
    liItems.forEach(function(item) {
        if(item.textContent.toLowerCase().indexOf(searchItem) != -1) {
            item.closest("li").style.display = "block";
        }
        else {
            item.closest("li").style.display = "none";
        }
    })
})

function checkInput() {
    var chatInput = document.getElementById("chatInput");
    var lastseen = document.getElementById("lastSeen");
    if (chatInput.value != "") {
        lastseen.innerHTML = "typing...";
    }
    else {
        lastseen.innerHTML = "online";
    }
}

function onEnter(event) {
    if (event.which == 13 && chatInput.value != "") {
        sendMessage();
    }
}

var today = new Date();
var hours = ["00", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var dateToday = ((today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());

function sendMessage() {
    var chatInput = document.getElementById("chatInput");
    if (chatInput.value != "") {
        if (today.getHours < 12) {
            var time = hours[today.getHours()] + ":" + today.getMinutes() + " AM";
        }
        else {
            if (today.getMinutes() < 10) {
                var time = hours[today.getHours()] + ":" + "0" + today.getMinutes() + " PM";
            }
            else {
                var time = hours[today.getHours()] + ":" + today.getMinutes() + " PM";
            }
        }
        var lastseen = document.getElementById("lastSeen");
        lastseen.innerHTML = "online";
        var usernameHere = document.getElementById("usernameHere");
        var key = firebase.database().ref('Messages').push().key;
        var message = {
            record: time,
            date: dateToday,
            text: chatInput.value,
            name: usernameHere.innerHTML,
            uniqueKey: sessionStorage.getItem("key")
        }
        firebase.database().ref('Messages/' + key).set(message);
        var messages = document.getElementById("messages");
        var emoji = document.getElementById("emoji");
        emoji.setAttribute("style", "display:none;");
        messages.innerHTML = "";
        getMessages();
        chatInput.value = "";
        chatInput.focus();
    }
}

function getMessages() {
    var messages = document.getElementById("messages");
    var textMessage = "";
    firebase.database().ref('Messages').on('child_added', function (message) {
        if (message.val().uniqueKey != sessionStorage.getItem("key")) {
            textMessage += `<div class="row">
            <div class="col-2 col-sm-1 col-md-1">
                <i class="fa fa-user-circle" id="chatFriend"></i>
            </div>
            <div class="col-8 col-sm-6 col-md-6">
                <span id="senderName">${message.val().name}</span><br/>
                <p id="recieve">${message.val().text}</p>
                <div class="mr-2" id="time">${message.val().date}, ${message.val().record}</div>
            </div>
        </div>`
        }
        else {
            textMessage += `<div class="row justify-content-end">
                <div class="col-8 col-sm-6 col-md-6">
                    <span class="float-right" id="selfName">${message.val().name}</span><br>
                    <p class="float-right" id="sent">${message.val().text}</p>
                    <div class="float-right" id="sendTime">${message.val().date}, ${message.val().record}</div>
                </div>
                <div class="col-2 col-sm-1 col-md-1">
                    <i class="fa fa-user-circle" id="chatFriend"></i>
                </div>
            </div>`
        }
        var lastText = document.getElementById("lastText");
        if (message.val().text.length > 25) {
            lastText.innerHTML = message.val().name + ": " + message.val().text.slice(0, 20) + "...";
        }
        else {
            lastText.innerHTML = message.val().name + ": " + message.val().text;
        }
        messages.innerHTML = textMessage;
        messages.scrollTo(0, messages.scrollHeight);
    });
}

function emojiPanel() {
    var emoji = document.getElementById("emoji");
    if (emoji.hasAttribute("style") == true) {
        emoji.removeAttribute("style");
    }
    else {
        emoji.setAttribute("style", "display:none;");
    }
}

function getEmoji(control) {
    var chatInput = document.getElementById("chatInput");
    chatInput.value += control.innerHTML;
}

function loadEmojis() {
    var emoji = "";
    for(var x = 128512; x <= 128580; x++) {
        emoji += `<a href="#" onclick="getEmoji(this)">&#${x}</a>`;
    }
    for(var x = 129296; x <= 129327; x++) {
        emoji += `<a href="#" onclick="getEmoji(this)">&#${x}</a>`;
    }
    for(var x = 128147; x <= 128158; x++) {
        emoji += `<a href="#" onclick="getEmoji(this)">&#${x}</a>`;
    }

    document.getElementById("smiley").innerHTML += emoji;
}

loadEmojis();
