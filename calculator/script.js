const numbers =document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const clearBtn = document.querySelectorAll('.clear-btn');
const point = document.querySelector('#decimal');
console.log(display.value);


let currentOperation='';
let currentSum=0;
let newValue = false;

numbers.forEach(number=>{
    number.addEventListener("click",(e)=>printNumber(e.target.outerText));
})
operators.forEach(operator=>{
    operator.addEventListener("click",(e)=>operation(e.target.outerText));
})
clearBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>clear(e.target.outerText));
})
point.addEventListener("click",()=>decimal())

function printNumber(number){
    if(newValue){
        newValue=false;
        display.value=number;
        
    }else{
        if(display.value==='0') display.value=number;
        else display.value+=number;
    }
}
function operation(operator){
    console.log(currentOperation);
    if(operator==="√"){
        if(display.value.indexOf("-")!=-1){
            alert("Калькулятор не умеет брать корень отрицательного числа!!!")
            currentSum=0;
            display.value="0";
            currentOperation="";
            
        } else{
            currentSum = Math.pow(+display.value,0.5);
            display.value = currentSum;
            currentOperation="";
        }
    }
    else if(operator==="-" && display.value.indexOf("-")===-1){
        currentSum=parseFloat(display.value);
        newValue=false;
        display.value="-";
    }
    else if(operator==="-" && display.value.indexOf("-")!=-1 &&display.value.length>1){
        currentSum=parseFloat(display.value);
        newValue=false;
        display.value="-";
    }
    else { 
        if(newValue){
        display.value=currentSum;
    } else if(currentOperation!="-"){
        newValue=true;
        if(display.value.indexOf("-")!=-1 && currentOperation=="" ) currentOperation="-";
        console.log(currentOperation);
        switch(currentOperation){
        case("-"):
            currentSum += parseFloat(display.value);
            break;
        case("+"): 
            currentSum += parseFloat(display.value);
            break;
        case("/"): 
            currentSum /= parseFloat(display.value);
            break; 
        case("*"):
            currentSum *= parseFloat(display.value);
            break;
        case("^"):
            currentSum = Math.pow(currentSum,parseFloat(display.value));
            break;
        default: 
            currentSum = parseFloat(display.value);
        }
        
        display.value = +currentSum.toFixed(8);
        if(operator!="=") currentOperation=operator;
        else currentSum=0;
    }
    }
    
}
function decimal(){
    if(newValue){
        display.value="0."
        newValue = false;
    }else{
        if(display.value.indexOf(".")===-1) {
            if(display.value.indexOf("-")!=-1)
                display.value="-0."
            else
            display.value+=".";
        }
    }

}
function clear(btn){
    if(btn==="C"){
        display.value ="0"; 
        currentOperation='';
        currentSum=0;
        newValue = true;
    } else{
        display.value ="0";
        newValue = true;
    }

}