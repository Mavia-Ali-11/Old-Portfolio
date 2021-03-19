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
    if (inp == 'C' || inp == 'Delete') {
        output.value = 0;
    }
    else if ((inp == '0' || inp == '00') && output.value == '0') {
        console.log(inp)
        output.value = 0;
    }
    else if ((inp == '.') && output.value.charAt(output.value.length - 1) == '.') {
        output.value = output.value;
    }
    else if ((inp == '+' || inp == '-' || inp == '×' || inp == '÷' || inp == '%' || inp == '*' || inp == '/') &&
        ((output.value.charAt(output.value.length - 1) == '+') || (output.value.charAt(output.value.length - 1) == '-') || 
        (output.value.charAt(output.value.length - 1) == '×') || (output.value.charAt(output.value.length - 1) == '÷') ||
        (output.value.charAt(output.value.length - 1) == '%'))) {
            if(inp == '*') {
                inp = inp.replace('*','×');
            }
            else if (inp == '/') {
                inp = inp.replace('/','÷');
            }
            output.value = output.value.slice(0, output.value.length - 1) + inp;
    }
    else if (inp == null || inp == 'Backspace') {
        if (output.value == '0') {
            output.value = 0;
        }
        else {
            output.value = output.value.slice(0, output.value.length - 1);
        }
    }
    else if ((inp == '1' || inp == '2' || inp == '3' || inp == '4' || inp == '5' || inp == '6' ||
        inp == '7' || inp == '8' || inp == '9' || inp == '(' || inp == ')') && output.value == '0') {
        output.value = '';
        output.value = inp;
    }
    else {
        if(inp == '*') {
            inp = inp.replace('*','×')
            output.value += inp;
        }
        else if(inp == '/') {
            inp = inp.replace('/','÷')
            output.value += inp;
        }
        else {
            output.value += inp;
        }
    }
}

function simpleFunc(func) {
    if (func == 'sq') {
        output.value = Math.pow(output.value, 2);
    }
    else if (func == 'sqrt') {
        output.value = Math.sqrt(output.value);
    }
    else {
        var arr = [];
        for (var x = output.value; x >= 1; x--) {
            arr.push(x);
        }
        var ans = 1;
        for (var y = 0; y < arr.length; y++) {
            ans = ans * arr[y];
        }
        output.value = ans;
    }
}

function getResult() {
    var exp = output.value;
    if (exp.includes('^')) {
        output.value = Math.pow(exp.slice(0, exp.indexOf('^')), exp.slice(exp.indexOf('^') + 1), -1);
    }
    else {
        var mapObj = {
            '×': "*",
            '÷': "/",
        };
        exp = exp.replace(/×|÷/gi, function (matched) {
            return mapObj[matched];
        });

        output.value = eval(exp);
    }
}


document.addEventListener('keydown', function (event) {
    if(event.key == 'Enter') {
        getResult();
    }
    else if(event.key == 'Delete' || event.key == 'Backspace' || event.key == '0' || event.key == '1' || event.key == '2' 
    || event.key == '3' || event.key == '4' || event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' 
    || event.key == '9' || event.key == '.' || event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/' 
    || event.key == '%' || event.key == '('  || event.key == ')' || event.key == '^') {
        getInput(event.key);
    }
});