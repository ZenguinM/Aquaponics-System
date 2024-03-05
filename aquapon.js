import data from "./aquaponvalues.json" assert {type: "json"};
const info = document.getElementById("info");
const desc = document.getElementById("descTab");
const content = document.getElementById("content");
const enter = document.getElementById("valueEnter");
const input = document.getElementById("valueInput");
const output = document.getElementById("valueOutput");
var paraId, fishId;
const buttonPara = document.querySelectorAll('.paralink');
const buttonFish = document.querySelectorAll('.fishlink');

buttonFish.forEach(fish => {
    fish.addEventListener('click', function() {
        fishId = this.id;
        input.value = "";
        output.innerHTML = "Awaiting value...";
        output.style.backgroundColor = "rgb(255,255,255,0.5)";
        desc.innerHTML = `${data.fish[fishId].description}`;

    })
});

buttonPara.forEach(link => {
    link.addEventListener('click', function() {
        var i, buttonParaNum;
        paraId = this.id;
        info.style.backgroundColor = (window.getComputedStyle(this)).backgroundColor;
        content.style.backgroundColor = (window.getComputedStyle(this)).backgroundColor;
        //buttonPara.style.backgroundColor = "rgb(80,80,80)";
        //this.style.backgroundColor = (window.getComputedStyle(this)).backgroundColor;
        info.innerHTML = `<h1>${paraId}</h1>\
        ${data.parameter[paraId].description}<br><br>\
        ${data.parameter[paraId].effect}<br><br>`
        input.value = "";
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"

        input.style.display = "block";
        output.style.display = "block";
        enter.style.display = "block";

        for (i = 0; i < buttonPara.length; i++) {
            buttonPara[i].style.backgroundColor = "rgb(80,80,80)";
        };


        if (paraId == "Temperature") {
            enter.innerHTML = "Enter temperature (°C) below:<br><br>"
            link.style.backgroundColor = "rgb(128, 0, 0)";
        } else if (paraId == "pH") {
            enter.innerHTML = "Enter pH below:<br><br>";
            link.style.backgroundColor = "rgb(128, 83, 0)";
        } else if (paraId == "Nitrate") {
            enter.innerHTML = "Enter nitrate level (ppm or mg/L) below:<br><br>";
            link.style.backgroundColor = "rgb(128, 128, 0)";
        } else if (paraId == "Nitrite") {
            enter.innerHTML = "Enter nitrite level (ppm) below:<br><br>";
            link.style.backgroundColor = "rgb(0, 128, 0)";
        } else if (paraId == "Ammonia") {
            enter.innerHTML = "Enter ammonia level (ppm) below:<br><br>";
            link.style.backgroundColor = "rgb(0, 101, 135)";
        }
    });
})

input.oninput = function() {

    if (input.value == "") {
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"
    } else {
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
        }
    }
}
