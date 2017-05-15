"use strict";

window.onload = function(){
//GETTING DATA FROM SESSIONS AND PUTTING IT IN HTML TAGS
    console.log("Initiating...");
    var fname = sessionStorage.getItem("first");
    var lname = sessionStorage.getItem("last");
    var name = document.getElementById("fullName");
    name.appendChild(document.createTextNode(fname+" "+lname));
    
    enhancement1();

    var phoneno = sessionStorage.getItem("phone");
    var phone = document.getElementById("forPhone");
    phone.appendChild(document.createTextNode(phoneno));

    var street = sessionStorage.getItem("street");
    var sub = sessionStorage.getItem("suburb");
    var state = sessionStorage.getItem("state");
    var postal = sessionStorage.getItem("postal");
    var add = document.getElementById("forAdd");
    add.appendChild(document.createTextNode(street+", "+sub+", "+state+", "+postal));

    var pizza = sessionStorage.getItem("product");
    var qty = sessionStorage.getItem("pizzaqty");
    var extra = sessionStorage.getItem("totextra");
    var price = sessionStorage.getItem("totalprice");

    var forPizza = document.getElementById("forPizza");
    forPizza.appendChild(document.createTextNode(pizza));
    var forQty = document.getElementById("forQty");
    forQty.appendChild(document.createTextNode(qty));
    var forExt = document.getElementById("forExt");
    forExt.appendChild(document.createTextNode(extra));
    var forPrice = document.getElementById("forPrice");
    forPrice.appendChild(document.createTextNode(price));   

//for validation
    var paymentForm = document.getElementById("paymentform");
    paymentForm.onsubmit = validatePaymentForm;       
//for cancellation
    var cancelButton = document.getElementById("onCancel");  
    cancelButton.onclick = cancelTransaction;

};

//if cancel is clicked
function cancelTransaction(){
    sessionStorage.clear();//clearing session data
    window.location.replace("index.html");//redirecting to home page
}

//FORM VALIDATION STARTS HERE
function validatePaymentForm(){
    
    var errorMsgs = "";//variable to store errors
    var isValidated = false;//for final validation
 
        //getting boolean value for which card is clicked
        var card1 = document.getElementById("cardType1").checked;
        var card2 = document.getElementById("cardType2").checked;
        var card3 = document.getElementById("cardType3").checked;
        var cc = document.getElementById("cardNumber").value;//getting card value

    //checking credit card selected or not
    var cardChecked = (function() {

        if(card1 || card2 || card3){
            return true;
        }else{
            errorMsgs += "Please check the card type\n";
            return false;
        }        
    })();      

    //checking credit card format
    var ccFormat = (function(){
        
        if(cc.length < 15 || cc.length > 16){//checking length
            errorMsgs += "Credit Card number length is invalid\n";
            return false;
        }
        //checking if cc number contains only number
        for(var i=0; i<cc.length; i++){
            if(!(cc.charAt(i)>=0 && cc.charAt(i)<=9)){            
                errorMsgs += "Credit card number can only contain numbers (0-9)\n";
                return false;
            }
        }
        return true;
    })();

    //checking expiry date
    var expDateOk = (function(){
        var expDate = document.getElementById("expiryDate").value;
        if(expDate.charAt(2) != '-'){//checking if - is present in between
            errorMsgs += "Please enter expiry date in mm-yy format\n";
            return false;
        }
        //checking if only number is entered
        for(var j=0; j<expDate.length; j++){
            if(j != 2){
                if(!(expDate.charAt(j)>=0 && expDate.charAt(j)<=9)){     
                    errorMsgs += "Please enter valid expiry date in mm-yy format\n";       
                    return false;
                }
            }
        }    
        var month = parseInt(expDate.substring(0,2));//getting month
        var year = parseInt(expDate.substring(3));//getting year
        var newYear = parseInt(new Date().getFullYear().toString().substring(2));//current year
        var newMonth = new Date().getMonth()+1;//current month
        
        if(month<1 || month >12){//check if month is between 1-12
            errorMsgs += "Please enter month of expiry date between 1-12\n";
            return false;
        }
        if(year <= newYear){//check if its expired or not
            if(year < newYear){
                errorMsgs += "Please enter Active Card, Yours is expired\n";
                return false;                
            }
            else if(month < newMonth){
                errorMsgs += "Please enter Active Card, Yours is expired\n";
                return false;                
            }
        }

        return true;        
    })();

    //Credit card numbers must be checked against the selected card type according to the following rules: 
    var specificCardCheck = (function(){

        if(card1){//if visa is selected
            if(cc.charAt(0)!=4 || cc.length != 16){
                errorMsgs += "Please Enter valid Visa Card number\n";
                return false;
            }
        }
        else if(card2){//if master card is selected
            if(cc.length != 16){
                errorMsgs += "Please Enter valid Master Card number\n";
                return false;
            }
            var first2Digit = parseInt(cc.substring(0,2));
            if(first2Digit<51 || first2Digit>55){
                errorMsgs += "Please Enter valid Master Card number\n";
                return false;                
            }
        }//if american express is selected
        else if(card3){
            if(cc.length != 15){
                errorMsgs += "Please Enter valid American Express Card number\n";
                return false;
            }
            var first2 = parseInt(cc.substring(0,2));
            if(first2!=34 && first2!=37){
                errorMsgs += "Please Enter valid American Express Card number\n";
                return false;                
            }
        }
        return true;
    })();

    //Checking CVV format for specific card
    var checkCCV = (function(){
        var ccv = document.getElementById("cvv").value;       
        if(card1 || card2){            //for visa and master card
            if(ccv.length != 3){
                errorMsgs += "Please enter 3 digit ccv number \n";
                return false;
            }
        }else if(card3){            //for american express
            if(ccv.length != 4){
                errorMsgs += "Please enter 4 digit ccv number \n";
                return false;
            }
        }
        for(var j=0; j<ccv.length; j++){    //checking if data is number
            if(!(ccv.charAt(j)>=0 && ccv.charAt(j)<=9)){            
                errorMsgs += "CCV number can only contain numbers (0-9)\n";
                return false;
            }
        }                     
        return true;
    })();

//FINALLY checking, if all chekcing is good
    if(cardChecked && ccFormat && expDateOk && specificCardCheck && checkCCV){
        isValidated = true;
    }else{//if not good then
        alert(errorMsgs);
    }
    return isValidated;
}
