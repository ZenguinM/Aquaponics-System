import data from "./aquaponvalues.json" assert {type: "json"};
const info = document.getElementById("info");
const content = document.getElementById("content");
const enter = document.getElementById("valueEnter");
const input = document.getElementById("valueInput");
const output = document.getElementById("valueOutput");
var paraId;
const buttonPara = document.querySelectorAll('.paralink');


buttonPara.forEach(link => {
    link.addEventListener('click', function() {
        paraId = this.id;
        info.style.backgroundColor = (window.getComputedStyle(this)).backgroundColor;
        content.style.backgroundColor = (window.getComputedStyle(this)).backgroundColor;
        buttonPara.style.backgroundColor = "rgb(80,80,80)";
        this.style.backgroundColor = (window.getComputedStyle(this)).backgroundColor;
        info.innerHTML = `<h1>${paraId}</h1>\
        ${data.parameter[paraId].description}<br><br>\
        ${data.parameter[paraId].effect}<br><br>`
        input.value = "";
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"

        input.style.display = "block";
        output.style.display = "block";
        enter.style.display = "block";

        if (paraId == "Temperature") {
            enter.innerHTML = "Enter temperature (°C) below:<br><br>"
        } else if (paraId == "pH") {
            enter.innerHTML = "Enter pH below:<br><br>";
        } else if (paraId == "Nitrate") {
            enter.innerHTML = "Enter nitrate level (ppm or mg/L) below:<br><br>";
        } else if (paraId == "Nitrite") {
            enter.innerHTML = "Enter nitrite level (ppm) below:<br><br>";
        } else if (paraId == "Ammonia") {
            enter.innerHTML = "Enter ammonia level (ppm) below:<br><br>";
        }
    });
})

input.oninput = function() {
    if (input.value == "") {
        output.innerHTML = "Awaiting value..."
        output.style.backgroundColor = "rgb(255,255,255,0.5)"
    } else {
        if (paraId == "Temperature") {
            if (input.value > data.fish.Barramundi.temperature[1]) {
                output.innerHTML = "The temperature is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else if (input.value < data.fish.Barramundi.temperature[0]) {
                output.innerHTML = "The temperature is too low!"
                output.style.backgroundColor = "rgb(100,100,255)"
            } else {
                output.innerHTML = "The temperature is ideal for the barramundi. :)"
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId == "pH") {
            if (input.value > data.fish.Barramundi.ph[1]) {
                output.innerHTML = "The water pH is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else if (input.value < data.fish.Barramundi.ph[0]) {
                output.innerHTML = "The water pH is too low!"
                output.style.backgroundColor = "rgb(100,100,255)"
            } else {
                output.innerHTML = "The water pH is ideal for the barramundi. :)"
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId == "Nitrate") {
            if (input.value > data.fish.Barramundi.nitrate) {
                output.innerHTML = "The nitrate level is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else {
                output.innerHTML = "The nitrate level is ideal for the barramundi. :)"
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId == "Nitrite") {
            if (input.value > data.fish.Barramundi.nitrite) {
                output.innerHTML = "The nitrite level is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else {
                output.innerHTML = "The nitrite level is ideal for the barramundi. :)"
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        } else if (paraId = "Ammonia") {
            if (input.value > data.fish.Barramundi.ammonia) {
                output.innerHTML = "The ammonia level is too high!"
                output.style.backgroundColor = "rgb(255,100,100)"
            } else {
                output.innerHTML = "The ammonia level is ideal for the barramundi. :)"
                output.style.backgroundColor = "rgb(100,255,100)"
            }
        }
    }
    
}

function openPara() {

    /*var i, tabcontent, tablink;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].style.backgroundColor = "";
        tablink[i].style.borderBottomWidth = "2px";
    }
    //fetch("./aquaponvalues.json").then(response => response.json()).then((data) => document.getElementById(paraName).innerHTML = JSON.stringify(data.parameter))
    document.getElementById(paraName).style.display = "block";
    elmnt.style.backgroundColor = color;
    elmnt.style.borderBottomWidth = "0";
    console.log(paraName);*/
}