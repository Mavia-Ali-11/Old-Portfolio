var msec = 0;
var sec = 0;
var min = 0;
var hour = 0;

var hours = 0;
var minutes = 0;
var seconds = 0;
var milliseconds = 0;

var hourNow = document.getElementById("hour");
var minNow = document.getElementById("minute");
var secNow = document.getElementById("second");
var milliNow = document.getElementById("milliSec");

function stopWatch() {
    milliNow.style.opacity = '1';
    msec++;

    if (msec > 99) {
        msec = 0;
        secNow.style.opacity = '1';
        sec++;

        if (sec > 59) {
            sec = 0;
            minNow.style.opacity = '1';
            min++;
        }

        if (min > 59) {
            min = 0;
            hourNow.style.opacity = '1';
            hour++;
        }
    }

    if (msec < 10) {
        milliseconds = "0" + msec.toString();
    }
    else {
        milliseconds = msec;
    }

    if (sec < 10) {
        seconds = "0" + sec.toString();
    }
    else {
        seconds = sec;
    }

    if (min < 10) {
        minutes = "0" + min.toString();
    }
    else {
        minutes = min;
    }

    if (hour < 10) {
        hours = "0" + hour.toString();
    }
    else {
        hours = hour;
    }
    hourNow.innerHTML = hours;
    minNow.innerHTML = minutes;
    secNow.innerHTML = seconds;
    milliNow.innerHTML = milliseconds;
}


var interval;
var control = document.getElementById("control");
var timerCircle = document.getElementById('timerCircle');

function startStop() {
    if (control.getAttribute('class') === "fa fa-play") {
        interval = setInterval(stopWatch, 10);
        control.setAttribute('class', 'fa fa-pause');
        timerCircle.classList.add('addAnimation');
        timerCircle.style.animationPlayState = 'running';
    }
    else {
        clearInterval(interval);
        control.setAttribute('class', 'fa fa-play');
        timerCircle.style.animationPlayState = 'paused';
    }
}

var counter = 0;
var laps = document.getElementById('laps');

function reset() {
    clearInterval(interval);
    min = 0; sec = 0; msec = 0; hour = 0;
    timerCircle.removeAttribute('class');
    control.setAttribute('class', 'fa fa-play');
    deleteLaps();
    var units = ['hour', 'minute', 'second', 'milliSec'];
    for (var x = 0; x <= units.length; x++) {
        document.getElementById(units[x]).innerHTML = '00';
        document.getElementById(units[x]).style.opacity = '0.5';
    }
}

function checkCutter() {
    var cutter = document.getElementById('cutter');
    if (control.getAttribute('class') === "fa fa-play") {
        cutter.style.cursor = 'not-allowed';
    }
    else {
        cutter.style.cursor = 'pointer';
    }
}

function lap() {
    if (control.getAttribute('class') == 'fa fa-pause') {
        counter = counter + 1;
        laps.innerHTML +=
            `<li>
                <h6>
                    <span>${counter}</span>
                    <span id="cutTime"><span>${hourNow.innerHTML}</span>:<span>${minNow.innerHTML}</span>:<span>${secNow.innerHTML}</span>:<span>${milliNow.innerHTML}</span></span>
                </h6>
            <li>`
        laps.scrollTo(0, laps.clientHeight - laps.scrollHeight);
    }
}

function deleteLaps() {
    laps.innerHTML = "";
    counter = 0;
}