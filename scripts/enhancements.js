"use strict";

//Enhancement 1
//On payment.html, pre-load the ’Name on Credit Card’ as a concatenation of the firstname and lastname, 
//into the input field, to enable a user to change the value. 
function enhancement1(){
        if(document.getElementById("nameInCard")!=null){
        var finame = sessionStorage.getItem("first");
        var liname = sessionStorage.getItem("last");
        var nameOnCard = document.getElementById("nameInCard");
        nameOnCard.value = finame+" "+liname;                
    }
}

//Enhancement 2
//On product.html, have all your products/services as variables in JavaScript and dynamically 
//display them on the product page
window.onload = function(){

    if(document.getElementById("prod1")!=null){
        var item1 = "Mushroom Pizza";
        var item2 = "Paneer Pizza";
        var item3 = "Chicken Pizza";
        var item4 = "Mutton Pizza";

        var prodt1 = document.getElementById("prod1");
        prodt1.appendChild(document.createTextNode(item1));

        var prodt2 = document.getElementById("prod2");
        prodt2.appendChild(document.createTextNode(item2));
        
        var prodt3 = document.getElementById("prod3");
        prodt3.appendChild(document.createTextNode(item3));

        var prodt4 = document.getElementById("prod4");
        prodt4.appendChild(document.createTextNode(item4));
    }
};