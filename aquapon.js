import data from "./aquaponvalues.json" assert {type: "json"};
const info = document.getElementById("info");
const addInfo = document.getElementById("addInfo");
const desc = document.getElementById("descTab");
const content = document.getElementById("content");
const enter = document.getElementById("valueEnter");
const input = document.getElementById("valueInput");
const output = document.getElementById("valueOutput");
var paraId, fishId;
const buttonPara = document.querySelectorAll('.paralink');
const buttonFish = document.querySelectorAll('.fishlink');
const inputMulti = document.querySelectorAll('.valueInputMulti');
const parameter = ["Temperature", "pH", "Nitrate", "Nitrite", "Ammonia"];


//Checks all fish selection buttons and runs the function based on which one is chosen
document.addEventListener('DOMContentLoaded', function() {
    buttonFish.forEach(fish => {
        fish.addEventListener('click', function() {
            var i, j;
            fishId = this.id;

            if (fishId !== "Custom") {
                document.getElementById("customParaTable").style.display = "none"
            } else {
                document.getElementById("customParaTable").style.display = "block"
            }
            
            input.value = "";
            output.innerHTML = "Awaiting value...";
            output.style.backgroundColor = "rgb(255,255,255,0.5)";
            desc.innerHTML = `${data.fish[fishId].description}`;
            addInfo.innerHTML = `${data.fish[fishId].addinfo}`;
            
            //Iterates through all buttons to change the background colour to grey and text to white
            for (i = 0; i < buttonFish.length; i++) {
                buttonFish[i].style.backgroundColor = "rgb(80,80,80)";
                buttonFish[i].style.color = "white";
            };
    
            //Selected button has a different style to indicate selection
            fish.style.backgroundColor = "white";
            fish.style.color = "black";

            inputMulti[0].value = "25"
            inputMulti[1].value = "7.0"
            inputMulti[2].value = "70"
            inputMulti[3].value = "0"
            inputMulti[4].value = "0"
            for (j = 0; j < inputMulti.length; j++) {
                inputMulti[j].style.backgroundColor = "white";
            }
        })
    });
});


//Checks all parameter selection buttons and runs the function based on which one is chosen
buttonPara.forEach(link => {
    link.addEventListener('click', function() {
        var i;
        paraId = this.id;

        if (paraId !== "All") {
            info.innerHTML = `<h1>${paraId}</h1>\
            ${data.parameter[paraId].description}<br><br>\
            ${data.parameter[paraId].effect}<br><br>`
            document.getElementById("singlePara").style.display = "block"
            document.getElementById("multiPara").style.display = "none"
        } else {
            document.getElementById("singlePara").style.display = "none"
            document.getElementById("multiPara").style.display = "block"
        }
        
        info.classList.remove("infoani");
        info.classList.add("infoani");

        //Reset input and output values
        input.value = "";
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"

        if (paraId == "Temperature") {
            addInfo.style.display = "block";
        } else {
            addInfo.style.display = "none";
        }
        input.style.display = "block";
        output.style.display = "block";
        enter.style.display = "block";

        //Iterates through all buttons to change the background colour to grey
        for (i = 0; i < buttonPara.length; i++) {
            buttonPara[i].style.backgroundColor = "rgb(80,80,80)";
        };

        //Repeat if statements check the id of the button to determine which button should change colour to indicate selection
        if (paraId == "Temperature") {
            enter.innerHTML = "Enter temperature (°C) below:<br><br>"
            content.style.backgroundColor = "rgb(128, 0, 0)";
            link.style.backgroundColor = "rgb(128, 0, 0)";
        } else if (paraId == "pH") {
            enter.innerHTML = "Enter pH below:<br><br>";
            content.style.backgroundColor = "rgb(128, 83, 0)";
            link.style.backgroundColor = "rgb(128, 83, 0)";
        } else if (paraId == "Nitrate") {
            enter.innerHTML = "Enter nitrate level (ppm or mg/L) below:<br><br>";
            content.style.backgroundColor = "rgb(128, 128, 0)";
            link.style.backgroundColor = "rgb(128, 128, 0)";
        } else if (paraId == "Nitrite") {
            enter.innerHTML = "Enter nitrite level (ppm) below:<br><br>";
            content.style.backgroundColor = "rgb(0, 128, 0)";
            link.style.backgroundColor = "rgb(0, 128, 0)";
        } else if (paraId == "Ammonia") {
            enter.innerHTML = "Enter ammonia level (ppm) below:<br><br>";
            content.style.backgroundColor = "rgb(0, 101, 135)";
            link.style.backgroundColor = "rgb(0, 101, 135)";
        } else if (paraId == "All") {
            content.style.backgroundColor = "rgb(108, 71, 163)";
            link.style.backgroundColor = "rgb(108, 71, 163)";
        };
    });
})

//Updates the output if the input is changed

input.oninput = function() {
    //A backup function is ran if there is no value
    if (input.value == "") {
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"
    } else if (fishId == undefined) {
        output.innerHTML = "You have not selected a fish yet!"
        output.style.backgroundColor = "rgb(255,100,100)";
    } else {
        /*Checks the id of the button and fish selected, and compares the input value to the corresponding values in the .json file
            Adjust style accordingly
            Note to account for ranges of values, such as temp and pH where there is an upper and lower bound, unlike ammonia and nitrite,
            an array with 0 at the 0th index is placed in the JSON file (all values should be positive, and negative temp = ice)
            the value at the 1st index will account for the maximum value. */   
        if (input.value > data.fish[fishId][paraId][1]) {
            output.innerHTML = `The ${paraId.toLowerCase()} is too high!<br><br>\
            Suggestion: ${data.parameter[paraId].decreasing}`;
            output.style.backgroundColor = "rgb(255,140,128)";
        } else if (input.value < data.fish[fishId][paraId][0]) {
            output.innerHTML = `The ${paraId.toLowerCase()} is too low!<br><br>\
            Suggestion: ${data.parameter[paraId].increasing}`
            output.style.backgroundColor = "rgb(161,211,255)"
        } else {
            output.innerHTML = `The ${paraId.toLowerCase()} is ideal for the ${fishId.toLowerCase()}.`
            output.style.backgroundColor = "rgb(138,252,136)"
        }
    }
}

inputMulti.forEach(inputMultiPara => {
    inputMultiPara.oninput = function() {
        var i;
        for (i = 0; i < inputMulti.length; i++) {
            if (inputMulti[i].value > data.fish[fishId][parameter[i]][1]) {
                inputMulti[i].style.backgroundColor = "rgb(255,140,128)";
            } else if (inputMulti[i].value < data.fish[fishId][parameter[i]][0]) {
                inputMulti[i].style.backgroundColor = "rgb(161,211,255)";
            } else {
                inputMulti[i].style.backgroundColor = "rgb(138,252,136)";
            }
        }
    }
})

