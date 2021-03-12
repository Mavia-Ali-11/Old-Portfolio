var msec = 0;
var sec = 0;
var min = 0;
var hour = 0;

var hours = 0;
var minutes = 0;
var seconds = 0;
var milliseconds = 0;

function stopWatch() {
    msec++;
    if(msec > 99) {
        msec = 0;
        sec++;

        if(sec > 59) {
            sec = 0;
            min++;
        }

        if(min > 59) {
            min = 0;
            hour++;
        }
    }

    if(msec < 10) {
        milliseconds = "0" + msec.toString();
    }
    else {
        milliseconds = msec;
    }

    if(sec < 10) {
        seconds = "0" + sec.toString();
    }
    else {
        seconds = sec;
    }

    if(min < 10) {
        minutes = "0" + min.toString();
    }
    else {
        minutes = min;
    }

    if(hour < 10) {
        hours = "0" + hour.toString();
    }
    else {
        hours = hour;
    }
    var watch = document.getElementById("watch");
    watch.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

var interval;
var button = document.getElementById("control");

function startStop() {
    if(button.innerHTML === "Start") {
        interval = setInterval(stopWatch,10);
        button.innerHTML = "Stop";
        button.style.border = '1px solid mediumseagreen';
        button.style.background = 'linear-gradient(45deg, lightseagreen, mediumseagreen)';
    }
    else {
        clearInterval(interval);
        button.innerHTML = "Start";
        button.style.border = '1px solid #ff88fb';
        button.style.background = 'linear-gradient(45deg, #ff88fb,#ff00ec)';
    }
}

function out() {
    if(button.innerHTML === "Start") {
        button.style.background = 'linear-gradient(45deg, #ff88fb, #ff00ec)';
    }
    else {
        button.style.background = 'linear-gradient(45deg, mediumseagreen, lightseagreen)';
    }
}

function over() {
    if(button.innerHTML === "Start") {
        button.style.background = 'linear-gradient(45deg, #ff00ec, #ff88fb)';
    }
    else {
        button.style.background = 'linear-gradient(45deg, lightseagreen, mediumseagreen)';
    }
}

function reset() {
    clearInterval(interval);
    min = 0;
    sec = 0;
    msec = 0;
    hour = 0;
    document.getElementById("watch").innerHTML = "00:00:00:00";
    document.getElementById("control").innerHTML = "Start";
    button.style.border = '1px solid #ff88fb';
    button.style.background = 'linear-gradient(45deg, #ff88fb,#ff00ec)';
}