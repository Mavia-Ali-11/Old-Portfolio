// Swapping

var state = 'close';
function openScientific() {
    var chevron = document.getElementById('chevron');
    var card1 = document.getElementById('card1');
    var card2 = document.getElementById('card2');
    var functions = document.getElementById('functions');
    if (state == 'close') {
        chevron.removeAttribute('class');
        chevron.setAttribute('class', 'fa fa-chevron-up');
        card1.style.transform = 'translateY(0px)';
        card2.style.transform = 'translateY(0px)';
        functions.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.5)';
        state = 'open';
    }
    else {
        chevron.removeAttribute('class');
        chevron.setAttribute('class', 'fa fa-chevron-down');
        card1.style.transform = 'translateY(-140px)';
        card2.style.transform = 'translateY(-140px)';
        functions.style.boxShadow = 'none';
        state = 'close';
    }
}


// Operations

var output = document.getElementById('output');
function getInput(inp) {
    var currentVal = output.value;
    if (inp == 'C') {
        output.value = 0;
    }
    else if ((inp == '0' || inp == '00') && output.value == '0') {
        output.value = 0;
    }
    else if (inp == '.' && currentVal.charAt(currentVal.length - 1) == '.') {
        output.value = output.value;
    }
    else if ((inp == '+' || inp == '-' || inp == '×' || inp == '÷' || inp == '%') &&
        ((currentVal.charAt(currentVal.length - 1) == '+') || (currentVal.charAt(currentVal.length - 1) == '-') ||
            (currentVal.charAt(currentVal.length - 1) == '×') || (currentVal.charAt(currentVal.length - 1) == '÷') ||
            (currentVal.charAt(currentVal.length - 1) == '%'))) {
        output.value = currentVal.slice(0, currentVal.lastIndexOf(currentVal.charAt(currentVal.length - 1))) + inp;
    }
    else if (inp == null) {
        if (output.value == '0') {
            output.value = 0;
        }
        else {
            output.value = currentVal.slice(0, currentVal.lastIndexOf(currentVal.charAt(currentVal.length - 1)));
        }
    }
    else if ((inp == '1' || inp == '2' || inp == '3' || inp == '4' || inp == '5'
        || inp == '6' || inp == '7' || inp == '8' || inp == '9') && output.value == '0') {
        output.value = '';
        output.value = inp;
    }
    else {
        output.value += inp;
    }
}

function result() {
    var calculate = output.value;
    var mapObj = {
        '×': "*",
        '÷': "/",
        // '^': "**",
    };
    calculate = calculate.replace(/×|÷/gi, function (matched) {
        return mapObj[matched];
    });

    output.value = eval(calculate);
}