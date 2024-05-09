var score = 5000;
var percenage = 1000;
// простой кликер
    function addToScore (amount) {
        score = score + amount;
        document.getElementById("tblc").innerHTML=score;
        percenage = percenage - amount;
        document.getElementById("percenage").innerHTML=percenage;
    }
    // конец
