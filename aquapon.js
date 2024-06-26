import data from "./aquaponvalues.json" with {type: "json"};
const info = document.getElementById("info");
const addInfo = document.getElementById("addInfo");
const description = document.getElementById("fishIndividual");
const content = document.getElementById("content");
const enter = document.getElementById("valueEnter");
const input = document.getElementById("valueInput");
const output = document.getElementById("valueOutput");
var paraId, fishId;
const buttonPara = document.querySelectorAll('.paralink');
const buttonFish = document.querySelectorAll('.fishlink');
const inputMulti = document.querySelectorAll('.valueInputMulti');
const parameter = ["Temperature", "pH", "Nitrate", "Nitrite", "Ammonia"];
const fishCustom = document.getElementById("fishCustom");
const submitButton = document.getElementById("submitButton");
var customFishData = {};
const tableData = document.getElementById("customParaTable");
var selectedFish = document.getElementById("fishSelect");
var fishName = document.getElementById("fishName");
const warningError = document.getElementById("warningError");
const simulButton = document.getElementById("simulation");
let simulToggle = false;
let toggleInterval;
description.innerHTML = data.homepage

//Resets multiple input values to default
function defaultMultiInput() {
    inputMulti[0].value = "25"
    inputMulti[1].value = "7.0"
    inputMulti[2].value = "70"
    inputMulti[3].value = "0"
    inputMulti[4].value = "0"
    for (var i = 0; i < inputMulti.length; i++) {
        inputMulti[i].style.backgroundColor = "white";
    }
}

//Checks all fish selection buttons and runs the function based on which one is chosen
buttonFish.forEach(fish => {
    fish.addEventListener('click', function() {
        fishId = this.id;

        if (fishId !== "Custom") {
            fishCustom.style.display = "none";
        } else {
            fishCustom.style.display = "block";
            fishId = selectedFish.value; 
        }
        
        input.value = "";
        output.innerHTML = "Awaiting value...";
        output.style.backgroundColor = "rgb(255,255,255,0.5)";
        description.innerHTML = `${data.fish[fishId].description}`;
        addInfo.innerHTML = `${data.fish[fishId].addinfo}`;

        //additional information on temperature is given when pre-installed fish is selected
        if (paraId == "Temperature") {
            if (data.fish[fishId].addinfo) {
                addInfo.style.display = "block";
            } else {
                addInfo.style.display = "none";
            }
        } else {
            addInfo.style.display = "none";
        }
        
        //Iterates through all buttons to change the background colour to grey and text to white
        let i = 0;
        while (i < buttonFish.length) {
            buttonFish[i].style.backgroundColor = "rgb(80,80,80)";
            buttonFish[i].style.color = "white";
            i++;
        }

        //Selected button has a different style to indicate selection
        fish.style.backgroundColor = "white";
        fish.style.color = "black";

        defaultMultiInput()
    })
});

//Checks all parameter selection buttons and runs the function based on which one is chosen
buttonPara.forEach(link => {
    link.addEventListener('click', function() {
        if (fishId == undefined) {
            return
        }

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
        
        //Reset input and output values
        input.value = "";
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"

        //Additional information on temperature is given when pre-installed fish is selected
        if (paraId == "Temperature") {
            if (data.fish[fishId].addinfo) {
                addInfo.style.display = "block";
            } else {
                addInfo.style.display = "none";
            }
        } else {
            addInfo.style.display = "none";
        }

        input.style.display = "block";
        output.style.display = "block";
        enter.style.display = "block";

        //Iterates through all buttons to change the background colour to grey
        let i = 0;
        while (i < buttonPara.length) {
            buttonPara[i].style.backgroundColor = "rgb(80,80,80)";
            i++;
        };

        //Repeated if statements check the id of the button to determine which button should change colour to indicate selection
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
            an array with 0 at the 0th index is placed in the JSON file (all values should be positive, and negative temp = ice)*/   
        if (input.value > data.fish[fishId][paraId][1]) {
            output.innerHTML = `The ${paraId.toLowerCase()} is too high!<br><br>\
            Suggestion: ${data.parameter[paraId].decreasing}`;
            output.style.backgroundColor = "rgb(255,140,128)";
        } else if (input.value < data.fish[fishId][paraId][0]) {
            output.innerHTML = `The ${paraId.toLowerCase()} is too low!<br><br>\
            Suggestion: ${data.parameter[paraId].increasing}`
            output.style.backgroundColor = "rgb(110, 165, 227)"
        } else {
            output.innerHTML = `The ${paraId.toLowerCase()} is ideal for ${fishId}.`
            output.style.backgroundColor = "rgb(138,252,136)"
        }
    }
}

//For 'All' tab: Runs function when any of the inputs are updated
inputMulti.forEach(inputMultiPara => {
    inputMultiPara.oninput = function() {
        //Checks input at index i, takes the parameter in the object at index i, and compares it to the values in the JSON file accordingly
        let i = 0;
        while (i < inputMulti.length) {
            if (inputMulti[i].value > data.fish[fishId][parameter[i]][1]) {
                inputMulti[i].style.backgroundColor = "rgb(255,140,128)";
            } else if (inputMulti[i].value < data.fish[fishId][parameter[i]][0]) {
                inputMulti[i].style.backgroundColor = "rgb(110, 165, 227)";
            } else {
                inputMulti[i].style.backgroundColor = "rgb(138,252,136)";
            }
            i++;
        }
    }
})

//Function will collect table data and organise it into an object for JSON
submitButton.addEventListener('click', function() {
    //Checks name input for empty value, returns if true
    if (fishName.value == "") {
        warningError.style.display = "block"
        warningError.innerHTML = "Error: No name entered!<br><br>Please enter a fish name in the input above the table!"
        return
    }

    //Checks parameter value pairs, returns if maximum is less than minimum
    for (var i = 1; i < 4; i++) {
        var min = parseFloat(tableData.rows[1].cells[i].children[0].value)
        var max = parseFloat(tableData.rows[2].cells[i].children[0].value)
        if (min > max) {
            warningError.style.display = "block"
            warningError.innerHTML = "Error: Maximum and minimum values not appropriate!<br><br>Please check that the maximum values are not less than the minimum values (only for temperature, pH, and nitrate)!"
            return
        }
    }

    //Checks pH is within range 0 to 14
    for (var i = 1; i < 3; i++) {
        if (parseFloat(tableData.rows[i].cells[2].children[0].value) > 14) {
            warningError.style.display = "block"
            warningError.innerHTML = "Error: pH values are not appropriate!<br><br>Please check that pH is within 0 to 14!"
            return
        }
    }

    var newOpt = document.createElement('option');

    //Resets the array for customFishData
    customFishData = {
        Temperature: [],
        pH: [],
        Nitrate: [],
        Nitrite: [],
        Ammonia: []
    };

    //Goes through each row, then each column (referred to as cells), and takes the value and pushes it into the customFishData array
    let j = 1;
    while (j < tableData.rows.length) {
        var tableRow = tableData.rows[j];
        //Seperate loop for first row as there are NA cells
        if (j == 1) {
            for (var k = 1; k < 4; k++) {
                //Checks for negative values, returns if present
                if (parseFloat(tableRow.cells[k].children[0].value) < 0) {
                    warningError.style.display = "block"
                    warningError.innerHTML = "Error: Negative value detected!<br><br>Please remove the negative sign from the corresponding cell in the table above!"
                    return
                } else {
                    customFishData[parameter[k-1]].push(parseFloat(tableRow.cells[k].children[0].value));
                }
            }
            //Minimum value for nitrite and ammonia is zero
            customFishData['Nitrite'].push(0);
            customFishData['Ammonia'].push(0);
        }
        if (j == 2) {
            for (var k = 1; k < 6; k++) {
                if (parseFloat(tableRow.cells[k].children[0].value) < 0) {
                    warningError.style.display = "block"
                    warningError.innerHTML = "Error: Negative value detected!<br><br>Please remove the negative sign from the corresponding cell in the table above!"
                    return
                } else {
                    customFishData[parameter[k-1]].push(parseFloat(tableRow.cells[k].children[0].value));
                }
            }
        }
        j++;
    }

    //Checks if the fish in the name input already exists
    if (!data.fish[fishName.value]) {
        newOpt.value = fishName.value;
        newOpt.innerHTML = fishName.value;
        //If "Custom" is not selected, edit currently selected fish's data
        if (selectedFish.value !== "Custom") {
            delete data.fish[selectedFish.value];
            for (var i = 0; i < selectedFish.length; i++) {
                if (selectedFish.options[i].value == selectedFish.value) {
                    selectedFish.remove(i);
                }
            }
        }
        selectedFish.appendChild(newOpt);
        selectedFish.value = newOpt.value;
    }
    
    //Checks if custom fish already exists
    if (selectedFish.value == "Custom" && data.fish[fishName.value]) {
        warningError.style.display = "block";
        warningError.innerHTML = "The fish already exists!";
        return
    }

    //Adds or updates data for new fish
    data.fish[fishName.value] = customFishData;
    fishId = selectedFish.value;
    warningError.style.display = "none"   
})

//Changes name input and table values when selected
selectedFish.addEventListener('change', function() {
    fishName.value = selectedFish.value;
    fishId = selectedFish.value;
    let i = 1;
    while (i < tableData.rows.length) {
        var tableRow = tableData.rows[i];
        //Seperate loop for first row as there are NA cells
        if (i == 1) {
            for (var j = 1; j < 4; j++) {
                tableRow.cells[j].children[0].value = data.fish[fishId][parameter[j-1]][0];
            }
        }
        if (i == 2) {
            for (var j = 1; j < 6; j++) {
                tableRow.cells[j].children[0].value = data.fish[fishId][parameter[j-1]][1];
            }
        }
        i++;
    } 
    defaultMultiInput()
})

simulButton.addEventListener('click', function() {
    //Toggles between 'On' and 'Off'
    simulToggle = !simulToggle;
    
    if (simulToggle) {
        toggleInterval = setInterval(simulationTester, 50);
        simulButton.innerHTML = "Stop simulation";
        simulButton.classList.add("active");
        simulButton.classList.remove("inactive");
    } else {
        clearInterval(toggleInterval);
        simulButton.innerHTML = "Start simulation";
        simulButton.classList.add("inactive");
        simulButton.classList.remove("active");
    }
})

function simulationTester() {
    var random, newValue;
    let i = 0;

    while (i < inputMulti.length) {
        //Generates a random number between 0 and 9 inclusive
        random = Math.floor(Math.random() * 10);
        //30% chance of increasing
        if (random <= 2) {
            //Nitrates have bigger ranges, thus the simulator adds or subtracts 1 instead of 0.1
            if (i == 2) {
                newValue = Math.round((parseFloat(inputMulti[i].value) + 1) * 100) / 100
            } 
            //Reduces the chances of nitrite, pH, and ammonia changing as these parameters have low ranges (10% change of changing)
            else if (i == 1 || i == 3 || i == 4) {
                if (random == 0) {
                    newValue = Math.round((parseFloat(inputMulti[i].value) + 0.1) * 100) / 100
                } else {
                    newValue = inputMulti[i].value
                }
            } else {
                newValue = Math.round((parseFloat(inputMulti[i].value) + 0.1) * 100) / 100
            }
            //Checks for negative values
            if (newValue < 0) {newValue = 0;}
            //Checks pH is not over 14
            if (i == 1 && newValue > 14) {newValue = 14;}
            inputMulti[i].value = newValue
        } 
        //30% chance of decreasing
        else if (random >= 7) {
            if (i == 2) {
                newValue = Math.round((parseFloat(inputMulti[i].value) - 1) * 100) / 100
            } else if (i == 1 || i == 3 || i == 4) {
                if (random == 7) {
                    newValue = Math.round((parseFloat(inputMulti[i].value) - 0.1) * 100) / 100
                } else {
                    newValue = inputMulti[i].value
                }
            } else {
                newValue = Math.round((parseFloat(inputMulti[i].value) - 0.1) * 100) / 100
            }
            if (newValue < 0) {newValue = 0;}
            if (i == 1 && newValue > 14) {newValue = 14;}
            inputMulti[i].value = newValue
        }

        if (inputMulti[i].value > data.fish[fishId][parameter[i]][1]) {
            inputMulti[i].style.backgroundColor = "rgb(255,140,128)";
        } else if (inputMulti[i].value < data.fish[fishId][parameter[i]][0]) {
            inputMulti[i].style.backgroundColor = "rgb(110, 165, 227)";
        } else {
            inputMulti[i].style.backgroundColor = "rgb(138,252,136)";
        }
        i++;
    }
}