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

function imageUpdate(source){
    image.src = source
    console.log(source)
}
console.log(data)
//Checks all fish selection buttons and runs the function based on which one is chosen
document.addEventListener('DOMContentLoaded', function() {
    buttonFish.forEach(fish => {
        fish.addEventListener('click', function() {
            var i;
            fishId = this.id;
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

            var selectedFish = Object.keys(data.fish)[0];
            console.log(selectedFish)

            document.getElementById('fishImg').src = `${data.fish[fishId].image}`;
            console.log(`${data.fish[fishId]}`);
        })
    });
});


//Checks all parameter selection buttons and runs the function based on which one is chosen
buttonPara.forEach(link => {
    link.addEventListener('click', function() {
        var i;
        paraId = this.id;
        info.innerHTML = `<h1>${paraId}</h1>\
        ${data.parameter[paraId].description}<br><br>\
        ${data.parameter[paraId].effect}<br><br>`
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
        };
    });
})

//Updates the output if the input is changed
input.oninput = function() {
    //A backup function is ran if there is no value
    if (input.value == "") {
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"
    } else {
        /*  Checks the id of the button and fish selected, and compares the input value to the corresponding values in the .json file
            Adjust style accordingly
            Note to account for ranges of values, such as temp and pH where there is an upper and lower bound, unlike ammonia and nitrite,
            an array with 0 at the 0th index is placed in the JSON file (all values should be positive, and negative temp = ice)
            the value at the 1st index will account for the maximum value.   */
        if (input.value > data.fish[fishId][paraId][1]) {
            output.innerHTML = `The ${paraId.toLowerCase()} is too high!`
            output.style.backgroundColor = "rgb(255,100,100)"
        } else if (input.value < data.fish[fishId][paraId][0]) {
            output.innerHTML = `The ${paraId.toLowerCase()} is too low!`
            output.style.backgroundColor = "rgb(100,100,255)"
        } else {
            output.innerHTML = `The ${paraId.toLowerCase()} is ideal for the ${fishId.toLowerCase()}.`
            output.style.backgroundColor = "rgb(100,255,100)"
        }
        /*
        if (paraId == "Temperature") {
            if (input.value > data.fish[fishId].temperature[1]) {
                output.innerHTML = "The temperature is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else if (input.value < data.fish[fishId].temperature[0]) {
                output.innerHTML = "The temperature is too low!"
                output.style.backgroundColor = "rgb(100,100,255)"
            } else {
                output.innerHTML = `The temperature is ideal for the ${fishId.toLowerCase()}.`
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId == "pH") {
            if (input.value > data.fish[fishId].ph[1]) {
                output.innerHTML = "The water pH is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else if (input.value < data.fish[fishId].ph[0]) {
                output.innerHTML = "The water pH is too low!"
                output.style.backgroundColor = "rgb(100,100,255)"
            } else {
                output.innerHTML = `The water pH is ideal for the ${fishId.toLowerCase()}.`
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId == "Nitrate") {
            if (input.value > data.fish[fishId].nitrate[1]) {
                output.innerHTML = "The nitrate level is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else if (input.value < data.fish[fishId].nitrate[0]) {
                output.innerHTML = "The nitrate level is too low!"
                output.style.backgroundColor = "rgb(100,100,255)"
            } else {
                output.innerHTML = `The nitrate level is ideal for the ${fishId.toLowerCase()}.`
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId == "Nitrite") {
            if (input.value > data.fish[fishId].nitrite) {
                output.innerHTML = "The nitrite level is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else {
                output.innerHTML = `The nitrite level is ideal for the ${fishId.toLowerCase()}.`
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId = "Ammonia") {
            if (input.value > data.fish[fishId].ammonia) {
                output.innerHTML = "The ammonia level is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else {
                output.innerHTML = `The ammonia level is ideal for the ${fishId.toLowerCase()}.`
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        }*/
    }
}
