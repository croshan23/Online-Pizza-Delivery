"use strict";

//FORM VALIDATION
function validateData(){
    var validated = true;//for final checking
    var errorMsgs = "";//for errorMsgs

    var quantity = parseInt(document.getElementById("quantity").value);
    //checking quantity
    if(quantity <= 0){
        errorMsgs += "please enter 1 or more in quantity \n";
        validated = false;
    }

    var isSelected = isProductSelected();//this method is below
    //checking if pizza is selected
    if(!isSelected){
        errorMsgs += "Please select a pizza \n";
        validated = false;
    }
    //chekcing if postal and state is valid
    var isStatValidated = isStateValidated();//method is below
    if(!isStatValidated){
        errorMsgs += "Please enter correct Postal Address"
        validated = false;
    }
    //if any error is there
    if(!validated){
        alert(errorMsgs);  

    }else{//if successful with no errors
        //putting everything in sessions
        sessionStorage.setItem("first",document.getElementById("firstname").value);
        sessionStorage.setItem("last",document.getElementById("lastname").value);
        sessionStorage.setItem("phone",document.getElementById("phone").value);
        sessionStorage.setItem("street",document.getElementById("street").value);
        sessionStorage.setItem("suburb",document.getElementById("suburb").value);
        sessionStorage.setItem("state",document.getElementById("state").value);
        sessionStorage.setItem("postal",document.getElementById("postal").value);

        var pizzaNo = parseInt(document.getElementById("quantity").value);
        sessionStorage.setItem("pizzaqty",pizzaNo);//pizza quantity

        //calculating quantity and putting in session
        var qty = 0;
        if(document.getElementById("extra1").checked){qty++;}
        if(document.getElementById("extra2").checked){qty++;}
        if(document.getElementById("extra3").checked){qty++;}
        sessionStorage.setItem("totextra",qty);

        //calculating total price and storing
        var totalprice = 0;
        var prodPrice = parseInt(sessionStorage.getItem("price"));
        console.log("prodPrice: "+prodPrice);
        totalprice = prodPrice * pizzaNo + qty*2;
        sessionStorage.setItem("totalprice",totalprice);

    }    
    return validated;    
}

//method that checks if pizza is selected
function isProductSelected(){
    console.log("checking product");
    var product1 = document.getElementById("product1").checked;
    var product2 = document.getElementById("product2").checked;
    var product3 = document.getElementById("product3").checked;
    var product4 = document.getElementById("product4").checked;

    if(product1){
        sessionStorage.setItem("product",document.getElementById("product1").value);
        sessionStorage.setItem("price","11");//storing it in session for calculating price
    }
    else if(product2){
        sessionStorage.setItem("product",document.getElementById("product2").value);
        sessionStorage.setItem("price","12");
    }
    else if(product3){
        sessionStorage.setItem("product",document.getElementById("product3").value);
        sessionStorage.setItem("price","16");
    }
    else if(product4){
        sessionStorage.setItem("product",document.getElementById("product4").value);
        sessionStorage.setItem("price","18");
    }

    if(product1 || product2 || product3 || product4){//if any is selected
        return true;
    }        
    return false;
}

//method that checks if postal code is valid according to state
function isStateValidated(){
    console.log("checking stateValidate");
    var postal = document.getElementById("postal").value;
    var chart = postal.charAt(0);
    var state = document.getElementById("state").value;

    if(state==="VIC"){
        if(chart==='3' || chart==='8')
            return true;
    }else if(state==="NSW"){
        if(chart==='1' || chart==='2')
            return true;
    }else if(state==="QLD"){
        if(chart==='4' || chart==='9')
            return true;
    }else if(state==="NT"){
        if(chart==='0')
            return true;
    }else if(state==="WA"){
        if(chart==='6')
            return true;
    }else if(state==="SA"){
        if(chart==='5')
            return true;
    }else if(state==="TAS"){
        if(chart==='7')
            return true;
    }else{
        if(chart==='0')
            return true;
    }
    return false;
}

window.onload = function(){ 
    var orderform = document.getElementById("orderform");
    orderform.onsubmit  = validateData;
};