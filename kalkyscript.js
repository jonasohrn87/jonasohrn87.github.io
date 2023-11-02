
function updateDisplay(number) {
    document.getElementById("display").value += number;
}

function clr() { 
    document.getElementById("display").value = "" 
} 

function solve(){

    let x = document.getElementById('display').value

    let y = eval(x);

    document.getElementById('display').value = y

    return y;
}

function removeNumber(){
    let display = document.getElementById("display");
    display.value = display.value.slice(0,-1);
}

function squareRoot(){
    let sqrRoot = document.getElementById("display").value;
    let sumOfSqr = Math.sqrt(sqrRoot);
    document.getElementById('display').value = sumOfSqr
    
    return sumOfSqr;
}

function mathSinus(){
    let sinus = document.getElementById("display").value;
    let sumSinus = Math.sin(sinus);
    document.getElementById('display').value = sumSinus
    
    return sumSinus;
}

function mathCos(){
    let cosinus = document.getElementById("display").value;
    let sumCos = Math.cos(cosinus);
    document.getElementById('display').value = sumCos
    
    return sumCos;
}