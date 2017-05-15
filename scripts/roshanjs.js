window.onload = function(){ 

    var div1 = document.getElementById("div1");
    div1.style.cursor = 'pointer';
    div1.onclick = function() {
        alert("div1");
    };

    var div2 = document.getElementById("div2");
    div2.style.cursor = 'pointer';
    div2.onclick = function() {
        alert("div2");
    };    

    var div3 = document.getElementById("div3");
    div3.style.cursor = 'pointer';
    div3.onclick = function() {
        alert("div3");
    };    
};